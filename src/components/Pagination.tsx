import { StepBack, StepForward } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null; // no pagination needed

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      // Show all if <= 5 pages
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);

      const start = Math.max(2, currentPage - 2);
      const end = Math.min(totalPages - 1, currentPage + 2);

      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-10 text-base">
        <li>
          <button
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className={`flex items-center justify-center px-4 h-10 leading-tight border rounded-s-lg ${
              currentPage === 1
                ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            <StepBack />
          </button>
        </li>

        {pageNumbers.map((page, idx) => (
          <li key={idx}>
            {page === "..." ? (
              <span className="px-4 h-10 flex items-center justify-center text-gray-400">
                ...
              </span>
            ) : (
              <button
                onClick={() => onPageChange(Number(page))}
                className={`flex items-center justify-center px-4 h-10 leading-tight border ${
                  page === currentPage
                    ? "z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100"
                    : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        <li>
          <button
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className={`flex items-center justify-center px-4 h-10 leading-tight border rounded-e-lg ${
              currentPage === totalPages
                ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
            }`}
          >
            <StepForward />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
