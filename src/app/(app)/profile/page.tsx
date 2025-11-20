'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { updateProfile } from 'firebase/auth';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const [displayName, setDisplayName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (user?.displayName) {
      setDisplayName(user.displayName);
    }
  }, [user]);

  const handleSaveChanges = async () => {
    if (user && user.displayName !== displayName) {
      try {
        await updateProfile(user, { displayName });
        toast({
          title: 'Profile Updated',
          description: 'Your name has been successfully updated.',
        });
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Update Failed',
          description: error.message,
        });
      }
    }
  };

  if (isUserLoading) {
    return (
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <Skeleton className="h-24 w-24 rounded-full mb-4" />
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-40" />
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Skeleton className="h-10 w-full" />
                </div>
                <Button disabled>Save Changes</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">My Profile</h1>
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={user?.photoURL || ''} />
                <AvatarFallback>{user?.displayName?.charAt(0) || user?.email?.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{user?.displayName || 'User'}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
              <Button variant="outline" size="sm" className="mt-4">
                Change Picture
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={user?.email || ''} disabled />
              </div>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your password and security settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Password management is not available for users signed in with a social provider.
              </p>
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <Button>Update Password</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
