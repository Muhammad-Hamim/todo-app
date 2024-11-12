import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteTaskModal } from "@/redux/features/todoSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const DeleteConfirmDialog = () => {
  const open = useAppSelector((state) => state.todo.value);
  const deleteTaskModalDispatch = useAppDispatch();
  const handleTaskDelete = () => {};
  return (
    <AlertDialog
      open={open}
      onOpenChange={(isOpen) =>
        deleteTaskModalDispatch(deleteTaskModal(isOpen))
      }
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the task.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleTaskDelete}
            className="bg-red-500 hover:bg-red-600"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmDialog;
