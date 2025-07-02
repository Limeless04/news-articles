// components/ModalRenderer.tsx
import { Dialog } from "@/components/ui/dialog";
import { useModal } from "@/providers/ModalProvider";
import CategoryForm from "./CategoryForm";
import DeleteCategoryModal from "./DeleteCategoryModal";

export default function CategoryModal() {
  const { modalType, closeModal, modalProps } = useModal();

  if (!modalType) return null;

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

      {modalType === "delete-category" && (
        <DeleteCategoryModal
          categoryName={modalProps?.name || "this category"}
          onDelete={() => {
            // TODO: call your delete function here
            console.log("Deleting category:", modalProps?.id);
            closeModal();
          }}
          onCancel={closeModal}
        />
      )}
    </Dialog>
  );
}
