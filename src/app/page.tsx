import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, BarChart, Bug, Search, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '@/components/icons';

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-dashboard');

  const features = [
    {
      icon: <Search className="h-8 w-8 text-primary" />,
      title: 'Comprehensive Scanning',
      description: 'Our platform scans your website for broken links, performance bottlenecks, and SEO errors.',
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: 'Detailed Reports',
      description: 'Receive in-depth reports that categorize issues by type and severity for easy understanding.',
    },
    {
      icon: <Bug className="h-8 w-8 text-primary" />,
      title: 'Actionable AI Solutions',
      description: 'Get clear, step-by-step, AI-powered solutions to resolve every identified issue effectively.',
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: 'Performance Dashboards',
      description: 'Manage and track the health of multiple websites from a single, intuitive dashboard.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icons.Logo className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">SiteSleuth</h1>
        </div>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/dashboard">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tighter">
              Diagnose Your Website. <br />
              Deploy Solutions Instantly.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto">
              SiteSleuth is your AI-powered partner for identifying website issues and providing actionable fixes. Turn bugs into improvements, effortlessly.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Start Your Free Scan
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {heroImage && (
          <section className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative aspect-[12/6] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                data-ai-hint={heroImage.imageHint}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </section>
        )}

        <section className="py-24 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">Everything you need, nothing you don&apos;t.</h3>
              <p className="mt-4 text-lg text-muted-foreground">The tools to make your website faster, stronger, and better.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <Card key={feature.title} className="bg-card/50 border-border/50 backdrop-blur-sm transform hover:-translate-y-2 transition-transform duration-300">
                  <CardHeader>
                    {feature.icon}
                    <CardTitle className="mt-4 text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center gap-2">
            <Icons.Logo className="h-6 w-6 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} SiteSleuth. All rights reserved.</p>
          </div>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
