import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  FileText,
  Search,
  ArrowRight,
  Sparkles,
  BrainCircuitIcon,
  Clock,
  Target,
  TrendingUp,
  Quote,
  Play,
  CheckCircle,
  BarChart,
} from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { PricingTable } from "@/services/clerk/components/PricingTable";
import NavButtonWrapper from "./NavButtonWrapper";

const features = [
  {
    icon: MessageSquare,
    title: "AI Interview Practice",
    description:
      "Practice with AI-powered mock interviews tailored to your target role and experience level.",
  },
  {
    icon: FileText,
    title: "Tailored Resume Suggestions",
    description:
      "Get personalized resume improvements based on job requirements and industry standards.",
  },
  {
    icon: Search,
    title: "Job Description Deep Dive",
    description:
      "Upload job postings to receive detailed insights and preparation strategies.",
  },
];

export default function CertumAILandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Detailed Features Section */}
      <DetailedFeaturesSection />

      {/* Statistics Section */}
      <StatisticsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <FooterSection />
    </div>
  );
}

function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <BrainCircuitIcon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">CertumAI</span>
          </div>

          <div className="flex items-center space-x-4">
            <NavButtonWrapper />
          </div>
        </div>
      </div>
    </nav>
  );
}


function HeroSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 px-3 py-1.5">
            <BrainCircuitIcon className="w-4 h-4 mr-2" />
            AI-Powered Job Preparation
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Master your next job interview with{" "}
            <span className="text-primary">AI-powered</span> preparation
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            CertumAI helps you practice interviews, optimize your resume, and
            understand job requirements through intelligent AI analysis.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SignInButton forceRedirectUrl="/app">
              <Button
                size="lg"
                className="px-8 py-3 text-base font-semibold group"
              >
                Get Started for Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </SignInButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything you need to land your dream job
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive suite of AI tools guides you through every step of
            the job search process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className="relative group hover:shadow-lg transition-all duration-300 border-1 shadow-sm hover:shadow-primary/5 hover:-translate-y-1"
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
  );
}

function DetailedFeaturesSection() {
  const detailedFeatures = [
    {
      icon: MessageSquare,
      title: "AI Interview Practice",
      description: "Experience realistic mock interviews with our advanced AI interviewer that adapts to your experience level and target role.",
      features: [
        "Real-time voice conversation with AI interviewer",
        "Personalized questions based on job requirements",
        "Instant feedback on communication clarity and confidence",
        "Practice common behavioral and technical scenarios"
      ],
      visual: {
        title: "Sample AI Interview Session",
        content: [
          {
            speaker: "AI Interviewer",
            message: "Tell me about a time you had to work with a difficult team member.",
            time: "00:32"
          },
          {
            speaker: "You",
            message: "In my previous role, I worked with a colleague who often missed deadlines...",
            time: "01:45",
            feedback: "Great use of STAR method! Your response was clear and structured."
          }
        ]
      }
    },
    {
      icon: FileText,
      title: "Tailored Resume Suggestions",
      description: "Upload your resume and job description to receive AI-powered optimization suggestions that highlight your most relevant experience.",
      features: [
        "ATS-friendly formatting recommendations",
        "Keyword optimization for specific job postings",
        "Skills gap analysis and improvement suggestions",
        "Achievement quantification and impact measurement"
      ],
      visual: {
        title: "Resume Analysis Results",
        content: [
          {
            section: "Skills Match",
            score: 87,
            suggestion: "Add 'React Native' to match job requirements"
          },
          {
            section: "Experience Relevance",
            score: 92,
            suggestion: "Quantify your impact: '20% performance improvement'"
          },
          {
            section: "ATS Compatibility",
            score: 95,
            suggestion: "Excellent formatting - no changes needed"
          }
        ]
      }
    },
    {
      icon: Search,
      title: "Job Description Deep Dive",
      description: "Upload any job posting and get comprehensive insights into what employers really want, plus tailored preparation strategies.",
      features: [
        "Key requirements and nice-to-have skills extraction",
        "Company culture and values analysis",
        "Salary range estimation and negotiation tips",
        "Custom interview questions likely to be asked"
      ],
      visual: {
        title: "Job Analysis Dashboard",
        content: [
          {
            category: "Must-Have Skills",
            items: ["JavaScript", "React", "Node.js", "SQL"]
          },
          {
            category: "Preferred Experience",
            items: ["5+ years", "Agile/Scrum", "Team Leadership"]
          },
          {
            category: "Company Values",
            items: ["Innovation", "Collaboration", "Customer Focus"]
          }
        ]
      }
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1.5">
            <Play className="w-4 h-4 mr-2" />
            See It In Action
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Powerful features designed for your success
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover how each feature works with real examples and see the impact on your job search.
          </p>
        </div>
        
        <div className="space-y-24 max-w-6xl mx-auto">
          {detailedFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            const isReverse = index % 2 === 1;
            
            return (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                isReverse ? 'lg:grid-flow-col-dense' : ''
              }`}>
                {/* Content Side */}
                <div className={isReverse ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mr-4">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {feature.title}
                    </h3>
                  </div>
                  
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="space-y-3">
                    {feature.features.map((item, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Visual Side */}
                <div className={isReverse ? 'lg:col-start-1' : ''}>
                  <Card className="p-6 bg-background border shadow-lg">
                    <div className="flex items-center mb-4">
                      <BarChart className="w-5 h-5 text-primary mr-2" />
                      <h4 className="font-semibold text-foreground">
                        {feature.visual.title}
                      </h4>
                    </div>
                    
                    {/* Render different visual types based on feature */}
                    {feature.icon === MessageSquare && (
                      <div className="space-y-4">
                        {(feature.visual.content as any[]).map((msg: { speaker: string; message: string; time: string; feedback?: string }, msgIndex: number) => (
                          <div key={msgIndex} className={`flex ${
                            msg.speaker === 'You' ? 'justify-end' : 'justify-start'
                          }`}>
                            <div className={`max-w-xs p-3 rounded-lg ${
                              msg.speaker === 'You' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-muted text-foreground'
                            }`}>
                              <div className="text-sm font-medium mb-1">
                                {msg.speaker} • {msg.time}
                              </div>
                              <div className="text-sm">{msg.message}</div>
                              {msg.feedback && (
                                <div className="mt-2 text-xs bg-green-100 text-green-800 p-2 rounded">
                                  💡 {msg.feedback}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {feature.icon === FileText && (
                      <div className="space-y-4">
                        {(feature.visual.content as any[]).map((item: { section: string; score: number; suggestion: string }, itemIndex: number) => (
                          <div key={itemIndex} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                            <div>
                              <div className="font-medium text-foreground">{item.section}</div>
                              <div className="text-sm text-muted-foreground">{item.suggestion}</div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className={`text-sm font-bold ${
                                item.score >= 90 ? 'text-green-600' : 
                                item.score >= 80 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {item.score}%
                              </div>
                              <div className={`w-2 h-2 rounded-full ${
                                item.score >= 90 ? 'bg-green-500' : 
                                item.score >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                              }`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {feature.icon === Search && (
                      <div className="space-y-4">
                        {(feature.visual.content as any[]).map((category: { category: string; items: string[] }, catIndex: number) => (
                          <div key={catIndex}>
                            <h5 className="font-medium text-foreground mb-2">{category.category}</h5>
                            <div className="flex flex-wrap gap-2">
                              {category.items.map((item: string, itemIndex: number) => (
                                <Badge key={itemIndex} variant="secondary" className="text-xs">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatisticsSection() {
  const stats = [
    {
      icon: Clock,
      value: "3x",
      label: "Faster Job Placement",
      description:
        "CertumAI users land jobs in 6 weeks on average vs 18 weeks industry standard",
    },
    {
      icon: Target,
      value: "78%",
      label: "First Interview Success Rate",
      description:
        "Users get job offers after their first interview 78% of the time vs 23% average",
    },
    {
      icon: TrendingUp,
      value: "2.4x",
      label: "Higher Salary Offers",
      description:
        "Users negotiate 2.4x higher salaries compared to unprepared candidates",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1.5">
            <TrendingUp className="w-4 h-4 mr-2" />
            Proven Results
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our users land jobs faster than average applicants
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Data from over 10,000 successful job placements shows CertumAI
            delivers measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="text-center group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {stat.label}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            * Based on internal data from CertumAI users compared to industry
            benchmarks from 2023-2024
          </p>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Google",
      avatar: "SC",
      content:
        "CertumAI's interview practice was incredible. The AI feedback helped me identify weak spots I never knew I had. Landed my dream job at Google after just 3 interviews!",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Manager",
      company: "Microsoft",
      avatar: "MR",
      content:
        "The resume optimization feature completely transformed my applications. I went from getting 1 interview per 20 applications to 1 in every 3. Worth every penny.",
      rating: 5,
    },
    {
      name: "Emily Thompson",
      role: "Data Scientist",
      company: "Netflix",
      avatar: "ET",
      content:
        "As someone who struggled with technical interviews, CertumAI's tailored practice sessions were game-changing. The AI understood exactly what I needed to work on.",
      rating: 5,
    },
    {
      name: "David Park",
      role: "UX Designer",
      company: "Airbnb",
      avatar: "DP",
      content:
        "I was skeptical about AI coaching, but CertumAI proved me wrong. The personalized feedback felt like having a career coach available 24/7. Got 3 offers in one month!",
      rating: 5,
    },
    {
      name: "Jennifer Wu",
      role: "DevOps Engineer",
      company: "Stripe",
      avatar: "JW",
      content:
        "The job description analysis feature helped me understand what employers really wanted. I could tailor my responses perfectly and showcase relevant experience.",
      rating: 5,
    },
    {
      name: "Alex Johnson",
      role: "Frontend Developer",
      company: "Shopify",
      avatar: "AJ",
      content:
        "CertumAI helped me transition from junior to senior level. The interview preparation was so thorough that I felt confident in every conversation.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-3 py-1.5">
            <Quote className="w-4 h-4 mr-2" />
            Success Stories
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Loved by thousands of job seekers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how CertumAI has helped professionals land jobs at top companies
            worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="relative group hover:shadow-lg transition-all duration-300 border-1 shadow-sm hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    >
                      ★
                    </div>
                  ))}
                </div>

                <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>

                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 font-semibold text-primary text-sm">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-6">
            Join over 50,000+ professionals who trust CertumAI for their career
            growth
          </p>
          <div className="flex justify-center items-center space-x-8 text-muted-foreground">
            <div className="text-sm font-medium">Featured in:</div>
            <div className="flex items-center space-x-6">
              <span className="text-sm font-semibold">TechCrunch</span>
              <span className="text-sm font-semibold">Forbes</span>
              <span className="text-sm font-semibold">
                Harvard Business Review
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-3 py-1.5">
            <TrendingUp className="w-4 h-4 mr-2" />
            Simple Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Choose the perfect plan for your career goals
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free and upgrade as you advance your career. All plans include our core AI features.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center mb-12">
            <div className="bg-background rounded-lg p-4 shadow-sm border">
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-muted-foreground">30-day money-back guarantee</span>
                <span className="text-muted-foreground mx-2">•</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-muted-foreground">Cancel anytime</span>
                <span className="text-muted-foreground mx-2">•</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-muted-foreground">24/7 support</span>
              </div>
            </div>
          </div>
          
          <div className="bg-background rounded-xl shadow-lg border p-8">
            <PricingTable />
          </div>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-4">
            All plans include unlimited AI interview practice, resume optimization, and job analysis.
          </p>
          <div className="flex justify-center space-x-8 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>Instant activation</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>Secure payments</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Ready to ace your next interview?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of professionals who have successfully landed their
            dream jobs with CertumAI.
          </p>
          <SignInButton forceRedirectUrl="/app">
            <Button size="lg" className="px-8 py-3 text-base font-semibold group">
              Start Your Free Trial
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </SignInButton>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="border-t bg-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="flex items-center justify-center w-6 h-6 rounded-md bg-primary/10">
              <Sparkles className="w-4 h-4 text-primary" />
            </div>
            <span className="text-lg font-semibold text-foreground">
              CertumAI
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 CertumAI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
