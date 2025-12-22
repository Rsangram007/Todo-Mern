import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '../contexts/AuthContext';

export const useTasks = () => {
  const { user, isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setTasks([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError(err.message);
      setTasks([]);
    } finally {
      setIsLoading(false);
    }
  }, [user, isAuthenticated]);

  const createTask = async (taskData) => {
    if (!user) throw new Error('Must be logged in to create tasks');

    const { data, error } = await supabase
      .from('tasks')
      .insert({
        title: taskData.title,
        description: taskData.description || null,
        status: taskData.status || 'pending',
        user_id: user.id,
      })
      .select()
      .single();

    if (error) throw error;
    setTasks((prev) => [data, ...prev]);
    return data;
  };

  const updateTask = async (id, taskData) => {
    const { data, error } = await supabase
      .from('tasks')
      .update({
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? data : task))
    );
    return data;
  };

  const deleteTask = async (id) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) throw error;
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
};
