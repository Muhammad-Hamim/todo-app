import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import EditTodoDialog from "@/components/todo/EditTodoDialog";
import { TTasks } from "@/type/tasks";
import { useAppDispatch } from "@/redux/hooks";
import { deleteTaskModal } from "@/redux/features/todoSlice";

// Create a separate type for the edit data
type TodoEditData = {
  id: string;
  title: string;
  description?: string;
  category: string;
  priority: string;
  dueDate?: Date;
};

interface TodoCardProps {
  task: TTasks;
  onToggle: () => void;
  onEdit: (data: TodoEditData) => void;
}

const categoryColors = {
  work: "bg-blue-100 text-blue-800",
  personal: "bg-purple-100 text-purple-800",
  shopping: "bg-green-100 text-green-800",
  health: "bg-red-100 text-red-800",
  other: "bg-gray-100 text-gray-800",
};

const priorityColors = {
  low: "bg-gray-100 text-gray-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
};

const TodoCard = ({ task, onToggle, onEdit }: TodoCardProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const deleteTaskModalDispatch = useAppDispatch();
  return (
    <>
      <Card className="p-4 hover:shadow-md transition-shadow">
        <div className="space-y-4">
          {/* Header with title and actions */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <Checkbox
                checked={task.status === "completed"}
                onCheckedChange={onToggle}
              />
              <span
                className={`flex-1 font-medium ${
                  task.status === "completed"
                    ? "line-through text-gray-400"
                    : "text-gray-900 dark:text-gray-100"
                }`}
              >
                {task.title}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditOpen(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteTaskModalDispatch(deleteTaskModal(true))}
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 pl-7">
              {task.description}
            </p>
          )}

          {/* Tags and Metadata */}
          <div className="flex flex-wrap gap-2 pl-7">
            <Badge
              variant="secondary"
              className={categoryColors[task.category]}
            >
              {task.category}
            </Badge>
            <Badge
              variant="secondary"
              className={priorityColors[task.priority]}
            >
              {task.priority} priority
            </Badge>
            <Badge
              variant="secondary"
              className={categoryColors[task.category]}
            >
              {task.status}
            </Badge>
          </div>
        </div>
      </Card>

      <EditTodoDialog
        task={task}
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        onSave={onEdit}
      />
    </>
  );
};

export default TodoCard;
