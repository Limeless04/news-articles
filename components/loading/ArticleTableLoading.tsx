// components/loading/ArticleTableLoading.tsx
import React from 'react';

const ArticleTableLoading = () => {
  return (
    <div className="overflow-x-auto rounded-md border dark:border-gray-700 animate-pulse">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Author</th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {Array.from({ length: 5 }).map((_, i) => ( // Show 5 skeleton rows
            <tr key={i}>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              </td>
              <td className="px-4 py-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              </td>
              <td className="px-4 py-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </td>
              <td className="px-4 py-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
              </td>
              <td className="px-4 py-4 flex justify-end gap-2">
                <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleTableLoading;