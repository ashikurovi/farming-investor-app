import { Button } from "@/components/ui/button";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

export function Pagination({
  page,
  pageCount,
  total,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
}) {
  const safePageCount = pageCount || 1;
  const safeTotal = typeof total === "number" ? total : 0;
  const isFirstPage = page <= 1;
  const isLastPage = page >= safePageCount;

  const from = safeTotal === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = safeTotal === 0 ? 0 : Math.min(safeTotal, page * pageSize);

  const handleFirst = () => {
    if (!isFirstPage) onPageChange(1);
  };

  const handlePrevious = () => {
    if (!isFirstPage) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (!isLastPage) onPageChange(page + 1);
  };

  const handleLast = () => {
    if (!isLastPage) onPageChange(safePageCount);
  };

  const handlePageSizeChange = (event) => {
    const value = Number(event.target.value);
    if (!Number.isNaN(value) && value > 0) {
      onPageSizeChange(value);
    }
  };

  return (
    <div className="flex flex-col gap-3 border-t border-zinc-100 px-4 py-3 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="text-[11px] text-zinc-500">Rows per page</span>
        <select
          value={pageSize}
          onChange={handlePageSizeChange}
          className="h-8 rounded-md border border-zinc-200 bg-white px-2 text-[11px] text-zinc-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-emerald-500"
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className="text-[11px] text-zinc-500">
          {from}-{to} of {safeTotal} rows
        </span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={isFirstPage}
          onClick={handleFirst}
          className="h-8 w-8 text-zinc-400 hover:text-emerald-600 disabled:opacity-40"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={isFirstPage}
          onClick={handlePrevious}
          className="h-8 w-8 text-zinc-400 hover:text-emerald-600 disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-1 text-[11px] text-zinc-600">
          <input
            type="number"
            value={page}
            readOnly
            className="h-8 w-10 rounded-md border border-zinc-200 bg-white text-center text-[11px] text-zinc-900 shadow-sm"
          />
          <span className="text-zinc-500">of {safePageCount}</span>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={isLastPage}
          onClick={handleNext}
          className="h-8 w-8 text-zinc-400 hover:text-emerald-600 disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          disabled={isLastPage}
          onClick={handleLast}
          className="h-8 w-8 text-zinc-400 hover:text-emerald-600 disabled:opacity-40"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

