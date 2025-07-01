import React from 'react';

const CategoryTableLoading = () => {
  const rows = Array.from({ length: 5 }); // Example: 5 rows of skeleton

  return (
    <div className="animate-pulse">
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-md overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((_, i) => (
              <tr key={i} className="border-t dark:border-gray-600">
                <td className="px-4 py-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                </td>
                <td className="px-4 py-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
                </td>
                <td className="px-4 py-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                </td>
                <td className="px-4 py-2 text-right">
                  <div className="flex justify-end gap-2">
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                    <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
      </div>
    </div>
  );
};

export default CategoryTableLoading;