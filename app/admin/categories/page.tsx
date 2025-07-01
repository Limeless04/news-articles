import CategoryTable from "@/components/CategoryTable"

export default function CategoryPage(){
    return (
        <div>
              <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                Manage Category
              </h1>
              <CategoryTable />
            </div>
    )
}