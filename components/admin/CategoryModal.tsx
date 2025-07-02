// components/ModalRenderer.tsx
import { Dialog } from "@/components/ui/dialog";
import { useModal } from "@/providers/ModalProvider";
import CategoryForm from "./CategoryForm";
import DeleteModal from "./DeleteModal";
import { deleteCategory } from "@/lib/categoryHelper";

export default function CategoryModal() {
  const { modalType, closeModal, modalProps } = useModal();

  if (!modalType) return null;

  const handleDelete = async () => {
    try {
      if (!modalProps?.id) {
        throw new Error("Missing category ID.");
      }

      await deleteCategory(modalProps.id);
      console.log("Category deleted.");

      // Optionally refetch or update your UI here
      // refetchCategories?.();

      closeModal();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete category. Please try again.");
    }
  };
  return (
    <Dialog open={!!modalType} onOpenChange={closeModal}>
      {modalType === "create-category" && (
        <CategoryForm mode="create" onSuccess={closeModal} />
      )}

      {modalType === "edit-category" && (
        <CategoryForm
          mode="edit"
          categoryId={modalProps || { name: "Old Category" }}
          onSuccess={closeModal}
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
