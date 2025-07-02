// components/ModalRenderer.tsx
import { Dialog } from "@/components/ui/dialog";
import { useModal } from "@/providers/ModalProvider";
import CategoryForm from "./CategoryForm";
import DeleteModal from "./DeleteModal";
import { deleteCategory } from "@/lib/categoryService";
import { toast } from "sonner";
import { deleteArticle } from "@/lib/articleHelper";
import { useRouter } from "next/navigation";

export default function AdminModal() {
  const { modalType, closeModal, modalProps } = useModal();
  const router = useRouter();

  if (!modalType) return null;

  const handleDelete = async () => {
    try {
      if (!modalProps?.id || !modalProps?.type) {
        throw new Error("Missing ID or type.");
      }

      if (modalProps.type === "category") {
        await deleteCategory(modalProps.id);
        toast.success("Category deleted successfully");
      } else if (modalProps.type === "article") {
        await deleteArticle(modalProps.id);
        toast.success("Article deleted successfully");
      }
      router.refresh();
      closeModal();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error(
        `Failed to delete ${modalProps?.type || "item"}. Please try again.`
      );
    }
  };

  return (
    <Dialog open={!!modalType} onOpenChange={closeModal}>
      {modalType === "create-category" && (
        <CategoryForm
          mode="create"
          onSuccess={() => {
            closeModal();
          }}
        />
      )}

      {modalType === "edit-category" && (
        <CategoryForm
          mode="edit"
          categoryId={modalProps || { name: "Old Category" }}
          onSuccess={() => {
            closeModal();
          }}
        />
      )}

      {modalType === "delete" && (
        <DeleteModal
          type={modalProps?.type}
          name={modalProps?.name || "this category"}
          onDelete={handleDelete}
          onCancel={closeModal}
        />
      )}
    </Dialog>
  );
}
