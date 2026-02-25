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

  return (
    <div
      className={`w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm ${className}`}
    >
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
              className="odd:bg-white even:bg-gray-50 hover:bg-blue-50/40 transition-colors"
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
                    {rowActions.map((action, i) => {
                      if (action.showIf && !action.showIf(row)) return null;

                      const key = action.key ?? `${action.label ?? "action"}-${i}`;
                      const label =
                        typeof action.label === "function"
                          ? action.label(row)
                          : action.label;

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
                    })}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

