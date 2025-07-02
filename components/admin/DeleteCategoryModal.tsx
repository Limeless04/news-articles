import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DeleteCategoryModalProps {
  categoryName: string;
  onDelete: () => void;
  onCancel: () => void;
}

export default function DeleteCategoryModal({
  categoryName,
  onDelete,
  onCancel,
}: DeleteCategoryModalProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Category</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete{" "}
          <strong className="text-red-600">{categoryName}</strong>? This action
          cannot be undone.
        </DialogDescription>
      </DialogHeader>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </DialogContent>
  );
}
