export function DataTable({
  columns,
  data,
  isLoading,
  emptyMessage = "No records found.",
  getRowKey,
  renderActions,
  loadingLabel = "Loading...",
  onRowClick,
  minWidth = "min-w-[700px] md:min-w-full",
}) {
  const hasActions = typeof renderActions === "function";
  const totalColumns = columns.length + (hasActions ? 1 : 0);

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-300 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table
          className={`${minWidth} border-separate border-spacing-0 text-sm`}
        >
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.key}
                  className={`${
                    column.thClassName ??
                    [
                      "bg-zinc-50/90 px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 backdrop-blur",
                      index === 0 ? "rounded-tl-2xl" : "",
                      index === columns.length - 1 && !hasActions
                        ? "rounded-tr-2xl"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")
                  } ${column.className || ""}`}
                >
                  {column.header}
                </th>
              ))}

              {hasActions && (
                <th className="bg-zinc-50/90 px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 backdrop-blur rounded-tr-2xl">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <>
                {[0, 1, 2].map((rowIndex) => (
                  <tr
                    key={`skeleton-${rowIndex}`}
                    className="border-b border-zinc-100 last:border-b-0"
                  >
                    {columns.map((column, colIndex) => (
                      <td
                        key={column.key}
                        className={`${
                          [
                            "px-4 py-3",
                            rowIndex === 2 && colIndex === 0
                              ? "rounded-bl-2xl"
                              : "",
                          ]
                            .filter(Boolean)
                            .join(" ")
                        } ${column.className || ""}`}
                      >
                        <div className="h-3 w-[70%] animate-pulse rounded-full bg-zinc-200/70" />
                      </td>
                    ))}

                    {hasActions && (
                      <td
                        className={[
                          "px-4 py-3 text-right",
                          rowIndex === 2 ? "rounded-br-2xl" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        <div className="flex items-center justify-end gap-2">
                          {[0, 1, 2].map((i) => (
                            <span
                              key={i}
                              className="h-7 w-7 animate-pulse rounded-full bg-zinc-200/70"
                            />
                          ))}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}

                <tr>
                  <td
                    colSpan={totalColumns}
                    className="px-4 pb-4 pt-1 text-left text-xs text-zinc-400"
                  >
                    {loadingLabel}
                  </td>
                </tr>
              </>
            )}

            {!isLoading && data.length === 0 && (
              <tr>
                <td
                  colSpan={totalColumns}
                  className="px-4 py-10 text-center text-sm text-zinc-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}

            {!isLoading &&
              data.map((row, rowIndex) => {
                const key = getRowKey ? getRowKey(row) : row.id;

                return (
                  <tr
                    key={key}
                    onClick={(e) => onRowClick && onRowClick(row, e)}
                    className={`group border-b border-zinc-100 last:border-b-0 transition-colors hover:bg-zinc-50/80 ${
                      onRowClick ? "cursor-pointer" : ""
                    }`}
                  >
                    {columns.map((column, colIndex) => (
                      <td
                        key={column.key}
                        className={`${
                          column.tdClassName ??
                          [
                            "whitespace-nowrap px-4 py-3 text-sm text-zinc-700",
                            rowIndex === data.length - 1
                              ? colIndex === 0
                                ? "rounded-bl-2xl"
                                : ""
                              : "",
                          ]
                            .filter(Boolean)
                            .join(" ")
                        } ${column.className || ""}`}
                      >
                        {column.cell ? column.cell(row) : row[column.key]}
                      </td>
                    ))}

                    {hasActions && (
                      <td
                        className={[
                          "whitespace-nowrap px-4 py-3 text-right",
                          rowIndex === data.length - 1 ? "rounded-br-2xl" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {renderActions(row)}
                      </td>
                    )}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

