import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Demo tasks for UI preview (replace with API calls)
const demoTasks = [
  {
    _id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive README and API documentation for the Todo app',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '2',
    title: 'Review pull requests',
    description: 'Check and merge pending PRs from team members',
    status: 'in-progress',
    createdAt: new Date().toISOString(),
  },
  {
    _id: '3',
    title: 'Setup CI/CD pipeline',
    description: 'Configure GitHub Actions for automated testing and deployment',
    status: 'completed',
    createdAt: new Date().toISOString(),
  },
];

export const useTasks = () => {
  const { token, isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    if (!isAuthenticated) {
      // Use demo tasks when not authenticated (for UI preview)
      setTasks(demoTasks);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch tasks');

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
      // Fallback to demo tasks on error
      setTasks(demoTasks);
    } finally {
      setIsLoading(false);
    }
  }, [token, isAuthenticated]);

  const createTask = async (taskData) => {
    if (!isAuthenticated) {
      // Demo mode: add locally
      const newTask = {
        _id: Date.now().toString(),
        ...taskData,
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [newTask, ...prev]);
      return newTask;
    }

    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) throw new Error('Failed to create task');

    const newTask = await response.json();
    setTasks((prev) => [newTask, ...prev]);
    return newTask;
  };

  const updateTask = async (id, taskData) => {
    if (!isAuthenticated) {
      // Demo mode: update locally
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? { ...task, ...taskData } : task))
      );
      return;
    }

    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) throw new Error('Failed to update task');

    const updatedTask = await response.json();
    setTasks((prev) =>
      prev.map((task) => (task._id === id ? updatedTask : task))
    );
    return updatedTask;
  };

  const deleteTask = async (id) => {
    if (!isAuthenticated) {
      // Demo mode: delete locally
      setTasks((prev) => prev.filter((task) => task._id !== id));
      return;
    }

    const response = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to delete task');

    setTasks((prev) => prev.filter((task) => task._id !== id));
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
