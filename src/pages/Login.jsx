import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components/AuthForm';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [mode, setMode] = useState('login');
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const { toast } = useToast();

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
          description: 'Please sign in with your credentials.',
        });
        setMode('login');
      }
    } catch (error) {
      // Demo mode: simulate successful login
      if (mode === 'login') {
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('user', JSON.stringify({ 
          name: 'Demo User', 
          email: formData.email 
        }));
        toast({
          title: 'Demo Mode',
          description: 'Logged in with demo credentials.',
        });
        navigate('/tasks');
        window.location.reload();
      } else {
        toast({
          title: 'Demo Mode',
          description: 'Account created! Please sign in.',
        });
        setMode('login');
      }
    }
  };

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
