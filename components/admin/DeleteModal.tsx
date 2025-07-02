import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
type DeleteType = "category" | "article";

interface DeleteModalProps {
  type: DeleteType;
  name: string;
  onDelete: () => void;
  onCancel: () => void;
}

export default function DeleteModal({
  type,
  name,
  onDelete,
  onCancel,
}: DeleteModalProps) {
  const label = type === "category" ? "Category" : "Article";
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete {label}</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete{" "}
          <strong className="text-red-600">{name}</strong>? This action cannot
          be undone.
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
