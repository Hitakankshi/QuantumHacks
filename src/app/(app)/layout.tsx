'use client';

import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell, CreditCard, Home, LineChart, LogOut, Mail, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type React from 'react';
import { useUser, useAuth, useCollection, useMemoFirebase, useFirestore } from '@/firebase';
import { signOut } from 'firebase/auth';
import type { Report } from '@/lib/types';
import { collection, query, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();

  const reportsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(
      collection(firestore, 'users', user.uid, 'websiteReports'),
      orderBy('scanDate', 'desc')
    );
  }, [firestore, user]);

  const { data: reports, isLoading: areReportsLoading } = useCollection<Report>(reportsQuery);

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/profile', icon: User, label: 'Profile' },
    { href: '/billing', icon: CreditCard, label: 'Billing' },
    { href: '/contact', icon: Mail, label: 'Contact Us' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    router.push('/');
  };

  return (
    <div className="flex min-h-screen w-full">
      <aside className="hidden w-64 flex-col border-r bg-card p-4 sm:flex">
        <div className="mb-8 flex items-center gap-2">
          <Icons.Logo className="h-8 w-8 text-primary" />
          <h2 className="text-xl font-bold">SiteSleuth</h2>
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                className="w-full justify-start"
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-2">
          <h3 className="px-4 text-sm font-semibold text-muted-foreground">Reports</h3>
          <div className="flex flex-col gap-1">
            {areReportsLoading && (
              <>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </>
            )}
            {reports?.map((report) => (
              <Link key={report.id} href={`/report/${report.id}`}>
                <Button
                  variant={pathname === `/report/${report.id}` ? 'secondary' : 'ghost'}
                  className="w-full justify-start font-normal"
                  title={report.url}
                >
                  <LineChart className="mr-2 h-4 w-4" />
                  <span className="truncate">{new URL(report.url).hostname}</span>
                </Button>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-card px-6">
          <div>
            {/* Can add breadcrumbs or page title here */}
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.photoURL || ''} />
                    <AvatarFallback>{user?.displayName?.charAt(0) || user?.email?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user?.displayName || user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/billing">Billing</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-background p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
