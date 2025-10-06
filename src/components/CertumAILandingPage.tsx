'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, FileText, Search, ArrowRight, Sparkles } from 'lucide-react';

interface CertumAILandingPageProps {
  user?: boolean;
}

export default function CertumAILandingPage({ user = false }: CertumAILandingPageProps) {
  const features = [
    {
      icon: MessageSquare,
      title: 'AI Interview Practice',
      description: 'Practice with AI-powered mock interviews tailored to your target role and experience level.',
    },
    {
      icon: FileText,
      title: 'Tailored Resume Suggestions',
      description: 'Get personalized resume improvements based on job requirements and industry standards.',
    },
    {
      icon: Search,
      title: 'Job Description Deep Dive',
      description: 'Upload job postings to receive detailed insights and preparation strategies.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground">CertumAI</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant={user ? 'default' : 'ghost'} size="sm">
                {user ? 'Dashboard' : 'Sign In'}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 px-3 py-1.5">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Job Preparation
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Master your next job interview with{' '}
              <span className="text-primary">AI-powered</span> preparation
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              CertumAI helps you practice interviews, optimize your resume, and understand job requirements through intelligent AI analysis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="px-8 py-3 text-base font-semibold group">
                Get Started for Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 text-base">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything you need to land your dream job
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive suite of AI tools guides you through every step of the job search process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="relative group hover:shadow-lg transition-all duration-300 border-0 shadow-sm hover:shadow-primary/5 hover:-translate-y-1"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to ace your next interview?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of professionals who have successfully landed their dream jobs with CertumAI.
            </p>
            <Button size="lg" className="px-8 py-3 text-base font-semibold group">
              Start Your Free Trial
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <span className="text-lg font-semibold text-foreground">CertumAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 CertumAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}