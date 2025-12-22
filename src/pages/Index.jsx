import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/tasks');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const features = [
    {
      icon: CheckCircle2,
      title: 'Task Management',
      description: 'Create, edit, and organize your tasks with ease',
    },
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'Your data is protected with secure authentication',
    },
    {
      icon: Zap,
      title: 'Fast & Responsive',
      description: 'Built with React for a smooth user experience',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-subtle" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        
        <div className="relative container max-w-5xl mx-auto px-4 py-20 sm:py-32">
          <div className="text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent border border-border mb-8">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-sm font-medium text-accent-foreground">Full-Stack Todo App</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Organize your tasks
              <br />
              <span className="text-primary">with ease</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              A full-stack todo application with secure authentication and real-time data persistence.
              Your tasks, always in sync.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="gradient"
                size="xl"
                onClick={() => navigate('/login')}
                className="gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Built with modern technologies
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Everything you need to manage your tasks efficiently
            </p>
          </div>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-background border border-border shadow-card hover:shadow-card-hover transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 shadow-md">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Tech Stack
          </h2>
          <p className="text-muted-foreground mb-10">
            Built with powerful technologies for optimal performance
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Authentication', 'Real-time Sync'].map((tech) => (
              <span
                key={tech}
                className="px-5 py-2.5 rounded-full bg-accent text-accent-foreground font-medium text-sm border border-border"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Todo App — Full-Stack Assignment
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
