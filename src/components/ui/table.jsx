import React from "react";
import { Button } from "./button";

/**
 * columns: [{ accessor, header, cell?(row), align?, className? }]
 * rowActions: [{
 *   key?, label | label?(row),
 *   onClick(row),
 *   variant?, size?, showIf?(row)
 * }]
 */
export function Table({
  columns,
  data,
  getRowKey,
  rowActions,
  emptyMessage = "No data found",
  className = "",
}) {
  const hasActions = Array.isArray(rowActions) && rowActions.length > 0;

  const renderActions = (row) =>
    rowActions
      .filter((action) => !action.showIf || action.showIf(row))
      .map((action, i) => {
        const key = action.key ?? `${action.label ?? "action"}-${i}`;
        const label =
          typeof action.label === "function" ? action.label(row) : action.label;
        return (
          <Button
            key={key}
            size={action.size ?? "sm"}
            variant={action.variant ?? "secondary"}
            onClick={() => action.onClick(row)}
          >
            {label}
          </Button>
        );
      });

  return (
    <div className={`w-full ${className}`}>
      {/* ── Desktop table (hidden on small screens) ── */}
      <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500 ${
                    column.align === "right"
                      ? "text-right"
                      : column.align === "center"
                        ? "text-center"
                        : "text-left"
                  } ${column.className ?? ""}`}
                >
                  {column.header}
                </th>
              ))}
              {hasActions && (
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length + (hasActions ? 1 : 0)}
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
            {data.map((row, index) => (
              <tr
                key={getRowKey ? getRowKey(row) : index}
                className="odd:bg-white even:bg-gray-50 hover:bg-primary/5 transition-colors"
              >
                {columns.map((column) => (
                  <td
                    key={column.accessor}
                    className={`px-4 py-3 text-gray-900 ${
                      column.align === "right"
                        ? "text-right"
                        : column.align === "center"
                          ? "text-center"
                          : "text-left"
                    } ${column.className ?? ""}`}
                  >
                    {typeof column.cell === "function"
                      ? column.cell(row)
                      : row[column.accessor]}
                  </td>
                ))}
                {hasActions && (
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      {renderActions(row)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile card list (visible only on small screens) ── */}
      <div className="sm:hidden flex flex-col gap-3">
        {data.length === 0 && (
          <div className="rounded-xl border border-gray-200 bg-white px-4 py-6 text-center text-sm text-gray-500 shadow-sm">
            {emptyMessage}
          </div>
        )}
        {data.map((row, index) => (
          <div
            key={getRowKey ? getRowKey(row) : index}
            className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden"
          >
            {columns.map((column) => (
              <div
                key={column.accessor}
                className="flex items-start justify-between gap-3 px-4 py-2.5 odd:bg-white even:bg-gray-50 border-b border-gray-100 last:border-b-0"
              >
                {/* Column label */}
                <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-gray-400 pt-0.5 w-1/3">
                  {column.header}
                </span>

                {/* Cell value */}
                <span
                  className={`text-sm text-gray-900 flex-1 ${
                    column.align === "right"
                      ? "text-right"
                      : column.align === "center"
                        ? "text-center"
                        : "text-right"
                  } ${column.className ?? ""}`}
                >
                  {typeof column.cell === "function"
                    ? column.cell(row)
                    : row[column.accessor]}
                </span>
              </div>
            ))}

            {/* Actions row */}
            {hasActions && (
              <div className="flex flex-wrap justify-end gap-2 px-4 py-3 bg-gray-50 border-t border-gray-100">
                {renderActions(row)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
