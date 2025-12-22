import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components/AuthForm';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [mode, setMode] = useState('login');
  const navigate = useNavigate();
  const { login, register, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/tasks');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSubmit = async (formData) => {
    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
        toast({
          title: 'Welcome back!',
          description: 'You have successfully signed in.',
        });
        navigate('/tasks');
      } else {
        await register(formData.name, formData.email, formData.password);
        toast({
          title: 'Account created!',
          description: 'You have been signed in automatically.',
        });
        navigate('/tasks');
      }
    } catch (error) {
      let message = error.message || 'Something went wrong.';
      
      if (message.includes('Invalid login credentials')) {
        message = 'Invalid email or password. Please try again.';
      } else if (message.includes('User already registered')) {
        message = 'An account with this email already exists. Please sign in.';
      } else if (message.includes('Password should be')) {
        message = 'Password must be at least 6 characters.';
      }
      
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <AuthForm
          mode={mode}
          onSubmit={handleSubmit}
          onToggleMode={() => setMode(mode === 'login' ? 'register' : 'login')}
        />
      </div>

      <footer className="py-4 text-center text-sm text-muted-foreground">
        <p>Todo App — MERN Stack Assignment</p>
      </footer>
    </div>
  );
};

export default Login;
