'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, Inbox } from 'lucide-react';
import clsx from 'clsx';

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
  hideOnMobile?: boolean;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  isLoading?: boolean;
  emptyMessage?: string;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  actions?: (row: T) => React.ReactNode;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyMessage = 'No records found',
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  actions,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="bg-haven-surface border border-haven-border rounded-haven-lg p-12 text-center">
        <div className="w-8 h-8 border-3 border-haven-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-haven-text-muted">Loading data records...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-haven-surface border border-haven-border rounded-haven-lg p-12 text-center space-y-2">
        <Inbox size={32} className="text-haven-text-muted/60 mx-auto" />
        <h4 className="text-sm font-semibold text-haven-primary">No Data Available</h4>
        <p className="text-xs text-haven-text-muted max-w-sm mx-auto">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-haven-surface border border-haven-border rounded-haven-lg overflow-hidden shadow-haven-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-haven-muted/70 border-b border-haven-border text-haven-primary font-bold uppercase tracking-wider text-[10px]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={clsx(
                    'py-3.5 px-4',
                    col.hideOnMobile && 'hidden md:table-cell',
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
              {actions && <th className="py-3.5 px-4 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-haven-border/70">
            {data.map((row) => (
              <tr
                key={keyExtractor(row)}
                className="hover:bg-haven-bg/70 transition-haven"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={clsx(
                      'py-3.5 px-4 text-haven-text align-middle',
                      col.hideOnMobile && 'hidden md:table-cell',
                      col.className
                    )}
                  >
                    {col.render ? col.render(row) : (row as Record<string, unknown>)[col.key] as React.ReactNode}
                  </td>
                ))}
                {actions && (
                  <td className="py-3.5 px-4 text-right align-middle whitespace-nowrap">
                    {actions(row)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-haven-border bg-haven-muted/30 flex items-center justify-between text-xs text-haven-text-muted">
          <span>
            Page <strong className="text-haven-primary">{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onPageChange && onPageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="p-1.5 rounded-haven-sm border border-haven-border hover:bg-haven-muted disabled:opacity-40 transition-haven"
              aria-label="Previous page"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => onPageChange && onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded-haven-sm border border-haven-border hover:bg-haven-muted disabled:opacity-40 transition-haven"
              aria-label="Next page"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
