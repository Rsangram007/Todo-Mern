import { useState } from 'react';
import { Check, Trash2, Edit3, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const statusConfig = {
  pending: {
    label: 'Pending',
    icon: Clock,
    className: 'bg-warning/10 text-warning border-warning/20',
  },
  'in-progress': {
    label: 'In Progress',
    icon: AlertCircle,
    className: 'bg-primary/10 text-primary border-primary/20',
  },
  completed: {
    label: 'Completed',
    icon: CheckCircle2,
    className: 'bg-success/10 text-success border-success/20',
  },
};

export const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const status = statusConfig[task.status] || statusConfig.pending;
  const StatusIcon = status.icon;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(task.id);
    } catch (error) {
      setIsDeleting(false);
    }
  };

  const cycleStatus = () => {
    const statuses = ['pending', 'in-progress', 'completed'];
    const currentIndex = statuses.indexOf(task.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    onStatusChange(task.id, nextStatus);
  };

  return (
    <div
      className={cn(
        "group relative bg-card rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50 animate-slide-up",
        task.status === 'completed' && "opacity-75"
      )}
    >
      <div className="flex items-start gap-4">
        <button
          onClick={cycleStatus}
          className={cn(
            "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-0.5",
            task.status === 'completed'
              ? "bg-success border-success text-success-foreground"
              : "border-muted-foreground/30 hover:border-primary hover:bg-primary/10"
          )}
        >
          {task.status === 'completed' && <Check className="w-4 h-4" />}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3
              className={cn(
                "font-semibold text-card-foreground truncate",
                task.status === 'completed' && "line-through text-muted-foreground"
              )}
            >
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-2">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                status.className
              )}
            >
              <StatusIcon className="w-3 h-3" />
              {status.label}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => onEdit(task)}
          >
            <Edit3 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
