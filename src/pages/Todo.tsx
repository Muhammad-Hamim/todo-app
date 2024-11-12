import { useState } from "react";
import TodoContainer from "@/components/todo/TodoContainer";
import TodoCard from "@/components/todo/TodoCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddTaskDialog from "@/components/todo/AddTaskDialog";
import DeleteConfirmDialog from "@/components/todo/DeleteConfirmDialog";
import { useGetTasksQuery } from "@/redux/api/tasksApi";
import { TTasks } from "@/type/tasks";
import { useAppDispatch } from "@/redux/hooks";
import { addTaskModal } from "@/redux/features/todoSlice";

type CategoryType = "all" | "work" | "personal" | "shopping" | "health";
type PriorityType = "all" | "high" | "medium" | "low";
type StatusType = "all" | "completed" | "pending";

interface FilterState {
  category: CategoryType;
  priority: PriorityType;
  status: StatusType;
}

const Todo = () => {
  const [filter, setFilter] = useState<FilterState>({
    category: "all",
    priority: "all",
    status: "all",
  });

  const { data: tasks, isLoading, isError } = useGetTasksQuery(undefined);
  const addTaskModalDispatch = useAppDispatch();

  if (isLoading) {
    return <p>loading...</p>;
  }
  if (isError) {
    return <p>Error...</p>;
  }
  console.log(tasks);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50">
            Tasks
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your tasks and stay organized
          </p>
        </div>

        {/* Add Task Input */}
        <div className="flex gap-4">
          <Input placeholder="search task..." className="h-11" />
          <Button
            className="gap-2"
            onClick={() => addTaskModalDispatch(addTaskModal(true))}
          >
            <PlusCircle className="h-5 w-5" />
            Add Task
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          <Select
            value={filter.category}
            onValueChange={(value: CategoryType) =>
              setFilter({ ...filter, category: value })
            }
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="shopping">Shopping</SelectItem>
              <SelectItem value="health">Health</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filter.priority}
            onValueChange={(value: PriorityType) =>
              setFilter({ ...filter, priority: value })
            }
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filter.status}
            onValueChange={(value: StatusType) =>
              setFilter({ ...filter, status: value })
            }
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Todo List */}
        <TodoContainer>
          {tasks.map((task: TTasks) => {
            return (
              <TodoCard
                key={task._id}
                task={task}
                onToggle={() => {}}
                onEdit={() => {}}
              />
            );
          })}
          {/* Repeat with different values for other cards */}
        </TodoContainer>

        <AddTaskDialog />

        <DeleteConfirmDialog />
      </div>
    </div>
  );
};

export default Todo;
