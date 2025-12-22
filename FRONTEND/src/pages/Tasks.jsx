import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  LogOut,
  CheckCircle,
  Clock,
  AlertCircle,
  ListTodo,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/TaskCard";
import { TaskModal } from "@/components/TaskModal";
import { useAuth } from "@/contexts/AuthContext";
import { useTasks } from "@/hooks/useTasks";
import { useToast } from "@/hooks/use-toast.jsx";

const Tasks = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isLoading: authLoading } = useAuth();
  const {
    tasks,
    isLoading: tasksLoading,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();
  const { toast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Signed out",
        description: "You have been successfully logged out.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCreateOrUpdate = async (formData, taskId) => {
    try {
      if (taskId) {
        await updateTask(taskId, formData);
        toast({
          title: "Task updated",
          description: "Your task has been updated successfully.",
        });
      } else {
        await createTask(formData);
        toast({
          title: "Task created",
          description: "Your new task has been added.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      toast({
        title: "Task deleted",
        description: "Your task has been removed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    return task.status === filter;
  });

  const stats = {
    total: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  if (authLoading) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <Loader2 className='h-8 w-8 animate-spin text-primary' />
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <header className='sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border'>
        <div className='container max-w-4xl mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-md'>
                <ListTodo className='w-5 h-5 text-primary-foreground' />
              </div>
              <div>
                <h1 className='text-lg font-bold text-foreground'>My Tasks</h1>
                <p className='text-xs text-muted-foreground'>
                  Welcome,{" "}
                  {user?.user_metadata?.name ||
                    user?.email?.split("@")[0] ||
                    "User"}
                </p>
              </div>
            </div>
            <Button variant='ghost' onClick={handleLogout} className='gap-2'>
              <LogOut className='w-4 h-4' />
              <span className='hidden sm:inline'>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className='container max-w-4xl mx-auto px-4 py-8'>
        {/* Stats */}
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8'>
          <div className='bg-card rounded-xl p-4 shadow-card border border-border/50'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-lg bg-muted flex items-center justify-center'>
                <ListTodo className='w-5 h-5 text-muted-foreground' />
              </div>
              <div>
                <p className='text-2xl font-bold text-foreground'>
                  {stats.total}
                </p>
                <p className='text-xs text-muted-foreground'>Total</p>
              </div>
            </div>
          </div>
          <div className='bg-card rounded-xl p-4 shadow-card border border-border/50'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center'>
                <Clock className='w-5 h-5 text-warning' />
              </div>
              <div>
                <p className='text-2xl font-bold text-foreground'>
                  {stats.pending}
                </p>
                <p className='text-xs text-muted-foreground'>Pending</p>
              </div>
            </div>
          </div>
          <div className='bg-card rounded-xl p-4 shadow-card border border-border/50'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center'>
                <AlertCircle className='w-5 h-5 text-primary' />
              </div>
              <div>
                <p className='text-2xl font-bold text-foreground'>
                  {stats.inProgress}
                </p>
                <p className='text-xs text-muted-foreground'>In Progress</p>
              </div>
            </div>
          </div>
          <div className='bg-card rounded-xl p-4 shadow-card border border-border/50'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center'>
                <CheckCircle className='w-5 h-5 text-success' />
              </div>
              <div>
                <p className='text-2xl font-bold text-foreground'>
                  {stats.completed}
                </p>
                <p className='text-xs text-muted-foreground'>Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Add */}
        <div className='flex flex-wrap items-center justify-between gap-4 mb-6'>
          <div className='flex gap-2'>
            {["all", "pending", "in-progress", "completed"].map((status) => (
              <Button
                key={status}
                variant={filter === status ? "default" : "secondary"}
                size='sm'
                onClick={() => setFilter(status)}
                className='capitalize'
              >
                {status === "in-progress" ? "In Progress" : status}
              </Button>
            ))}
          </div>
          <Button
            variant='gradient'
            onClick={() => setIsModalOpen(true)}
            className='gap-2'
          >
            <Plus className='w-4 h-4' />
            Add Task
          </Button>
        </div>

        {/* Task List */}
        <div className='space-y-4'>
          {tasksLoading ? (
            <div className='text-center py-16 animate-fade-in'>
              <Loader2 className='w-8 h-8 animate-spin mx-auto text-primary' />
              <p className='text-muted-foreground mt-4'>Loading tasks...</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className='text-center py-16 animate-fade-in'>
              <div className='w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4'>
                <ListTodo className='w-8 h-8 text-muted-foreground' />
              </div>
              <h3 className='text-lg font-semibold text-foreground mb-2'>
                No tasks found
              </h3>
              <p className='text-muted-foreground mb-4'>
                {filter === "all"
                  ? "Create your first task to get started!"
                  : `No ${filter} tasks at the moment.`}
              </p>
              {filter === "all" && (
                <Button
                  variant='gradient'
                  onClick={() => setIsModalOpen(true)}
                  className='gap-2'
                >
                  <Plus className='w-4 h-4' />
                  Create Task
                </Button>
              )}
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleCreateOrUpdate}
        task={editingTask}
      />
    </div>
  );
};

export default Tasks;
