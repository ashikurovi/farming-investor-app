"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Eye,
  TrendingUp,
  Wallet,
  BadgeDollarSign,
  Landmark,
  X,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CalendarDays,
  Clock3,
  Hash,
  UserCircle2,
  FileText,
} from "lucide-react";
import { useMeQuery } from "@/features/auth/authApiSlice";
import { useGetMyInvestmentsQuery } from "@/features/investor/investments/investmentsApiSlice";
import { useGetDeedsQuery } from "@/features/admin/deed/deedApiSlice";

/* ─── helpers ─────────────────────────────────── */
const cleanUrl = (u) =>
  typeof u === "string" ? u.replace(/[`"'()]/g, "").trim() : "";

const fmtBDT = (n) =>
  Number(n ?? 0).toLocaleString("en-US", { maximumFractionDigits: 0 });

/* ─── STAT CARD ───────────────────────────────── */
const STAT_COLORS = {
  emerald: {
    bar: "from-[color:var(--brand-from)] to-[color:var(--brand-to)]",
    iconBg: "bg-secondary",
    iconRing: "ring-[color:rgba(77,140,30,0.14)]",
    iconColor: "text-primary",
    valueColor: "text-primary",
  },
  blue: {
    bar: "from-[color:var(--brand-from)] to-[color:var(--brand-to)]",
    iconBg: "bg-secondary",
    iconRing: "ring-[color:rgba(77,140,30,0.14)]",
    iconColor: "text-primary",
    valueColor: "text-primary",
  },
  violet: {
    bar: "from-[color:var(--brand-from)] to-[color:var(--brand-to)]",
    iconBg: "bg-secondary",
    iconRing: "ring-[color:rgba(77,140,30,0.14)]",
    iconColor: "text-primary",
    valueColor: "text-primary",
  },
  zinc: {
    bar: "from-[color:var(--brand-from)] to-[color:var(--brand-to)]",
    iconBg: "bg-zinc-100",
    iconRing: "ring-zinc-200",
    iconColor: "text-zinc-600",
    valueColor: "text-primary",
  },
};

const StatCard = ({ label, value, Icon, color = "zinc", currency = false, onClick }) => {
  const c = STAT_COLORS[color] ?? STAT_COLORS.zinc;
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm ring-1 ring-black/[0.03] transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-5 ${onClick ? "cursor-pointer active:scale-95" : ""}`}
    >
      <div
        className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${c.bar}`}
      />
      <div className="flex items-start justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400 leading-tight">
          {label}
        </p>
        <span
          className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-xl ${c.iconBg} ring-1 ${c.iconRing} sm:h-8 sm:w-8`}
        >
          <Icon className={`h-3.5 w-3.5 ${c.iconColor} sm:h-4 sm:w-4`} />
        </span>
      </div>
      <p
        className={`mt-2.5 text-xl font-bold tabular-nums tracking-tight ${c.valueColor} sm:text-2xl`}
      >
        {currency ? "৳" : ""}
        {fmtBDT(value)}
      </p>
    </div>
  );
};

/* ─── AVATAR ──────────────────────────────────── */
const Avatar = ({ user, size = "md" }) => {
  const dim =
    size === "lg"
      ? "h-14 w-14 text-lg sm:h-16 sm:w-16 sm:text-xl"
      : "h-9 w-9 text-xs sm:h-10 sm:w-10 sm:text-sm";
  const initials = (user?.name || user?.email || "U")
    .substring(0, 2)
    .toUpperCase();
  return cleanUrl(user?.photoUrl) ? (
    <div
      className={`${dim} relative shrink-0 overflow-hidden rounded-2xl ring-2 ring-white shadow`}
    >
      <Image
        src={cleanUrl(user.photoUrl)}
        alt={user.name ?? "Profile"}
        fill
        sizes="64px"
        className="object-cover"
        priority
      />
    </div>
  ) : (
    <div
      className={`${dim} inline-flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[color:var(--brand-from)] to-[color:var(--brand-to)] font-bold text-primary-foreground ring-2 ring-white shadow`}
    >
      {initials}
    </div>
  );
};

/* ─── SKELETON ────────────────────────────────── */
const Sk = ({ className = "" }) => (
  <div className={`animate-pulse rounded-lg bg-zinc-100 ${className}`} />
);

const SkeletonRow = () => (
  <tr className="border-b border-zinc-100">
    {[...Array(9)].map((_, i) => (
      <td key={i} className="px-3 py-3.5 sm:px-4">
        <Sk className={`h-4 ${i === 0 ? "w-6" : "w-full"}`} />
      </td>
    ))}
  </tr>
);

/* ─── AMOUNT BADGE ────────────────────────────── */
const AmountBadge = ({ amount }) => (
  <span className="inline-flex items-center gap-0.5 font-bold text-primary">
    <span className="text-[11px] font-bold text-[color:var(--brand-to)]">৳</span>
    {fmtBDT(amount)}
  </span>
);


/* ─── PAGINATION ──────────────────────────────── */
const TablePagination = ({
  page,
  pageCount,
  total,
  pageSize,
  onPageChange,
  onPageSizeChange,
}) => {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  return (
    <div className="flex flex-col gap-2.5 border-t border-zinc-100 bg-zinc-50/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
      <p className="text-[11px] text-zinc-400">
        Showing{" "}
        <span className="font-semibold text-zinc-700">
          {from}–{to}
        </span>{" "}
        of <span className="font-semibold text-zinc-700">{total}</span>{" "}
        investments
      </p>
      <div className="flex items-center gap-1.5">
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="h-8 rounded-lg border border-zinc-200 bg-white px-2 text-xs font-medium text-zinc-700 focus:outline-none focus:ring-2 focus:ring-[color:rgba(77,140,30,0.20)]"
        >
          {[5, 10, 20, 50].map((s) => (
            <option key={s} value={s}>
              {s} / page
            </option>
          ))}
        </select>
        {[
          { Icon: ChevronsLeft, label: "First", target: 1 },
          { Icon: ChevronLeft, label: "Prev", target: page - 1 },
          { Icon: ChevronRight, label: "Next", target: page + 1 },
          { Icon: ChevronsRight, label: "Last", target: pageCount },
        ].map(({ Icon, label, target }) => (
          <button
            key={label}
            onClick={() => onPageChange(target)}
            disabled={
              label === "First" || label === "Prev"
                ? page <= 1
                : page >= pageCount
            }
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 shadow-sm transition-colors hover:border-[color:rgba(77,140,30,0.24)] hover:bg-secondary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={label}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        ))}
      </div>
    </div>
  );
};

/* ─── PAGE ────────────────────────────────────── */
const PAGE_SIZE = 10;

export default function MyInvestmentsPage() {
  const router = useRouter();
  const { data: meResponse, isLoading, isError } = useMeQuery();
  const user = meResponse?.data ?? meResponse ?? null;

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [search, setSearch] = useState("");
  const [showActive, setShowActive] = useState(true);
  const [filterDeed, setFilterDeed] = useState("all");

  const {
    data: myInvestments,
    isLoading: isInvLoading,
    isFetching: isInvFetching,
    isError: isInvError,
  } = useGetMyInvestmentsQuery({ page, limit: pageSize });

  const { data: deedsData } = useGetDeedsQuery({ limit: 1000 });
  const deedsByInvestmentId = new Map(
    (deedsData?.data ?? deedsData?.items ?? deedsData ?? []).map((d) => [String(d.investmentId), d])
  );

  const investments = myInvestments?.items ?? [];
  const meta = myInvestments?.meta ?? {
    page,
    pageCount: 1,
    total: investments.length,
  };
  const isInvestmentsBusy = isInvLoading || isInvFetching;

  const filteredByStatus = investments.filter((inv) => {
    const isExpired = inv.endDate && new Date(inv.endDate) < new Date();
    const effectiveActive = inv.isActive && !isExpired;
    return effectiveActive === showActive;
  });

  const filtered = filteredByStatus.filter((r) => {
    const matchesSearch = !search.trim() || (
      (r.reference || "").toLowerCase().includes(search.toLowerCase()) ||
      (r.date || "").includes(search) ||
      String(r.amount || "").includes(search)
    );
    const hasDeed = deedsByInvestmentId.has(String(r.id));
    const matchesDeedFilter = filterDeed === "all" || (filterDeed === "pending" ? !hasDeed : hasDeed);
    return matchesSearch && matchesDeedFilter;
  });

  const pendingDeedsCount = investments.filter(
    (inv) => !deedsByInvestmentId.has(String(inv.id))
  ).length;

  return (
    <main className="min-h-screen space-y-4  p-3 sm:space-y-6 sm:p-6">
      {/* ── PAGE HEADER ── */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="h-[3px] w-full bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]" />
        <div className="flex items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-secondary ring-1 ring-[color:rgba(77,140,30,0.14)] sm:h-9 sm:w-9">
            <Wallet className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-zinc-900 sm:text-base">
              My Investments
            </h1>
            <p className="text-[11px] text-zinc-400 sm:text-xs">
              Your profile overview and investment history.
            </p>
          </div>
        </div>
      </div>

      {/* ── PROFILE + STATS ── */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-3">
        {/* Profile card — full width on mobile, spans on larger */}
        {/* <div className="relative col-span-2 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm ring-1 ring-black/[0.03] sm:p-5 lg:col-span-1">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]" />
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 sm:mb-4 sm:text-[11px]">
            Profile
          </p>

          {isLoading ? (
            <div className="flex items-center gap-3">
              <Sk className="h-14 w-14 shrink-0 rounded-2xl sm:h-16 sm:w-16" />
              <div className="flex-1 space-y-2">
                <Sk className="h-4 w-3/4" />
                <Sk className="h-3 w-full" />
                <Sk className="h-3 w-2/3" />
              </div>
            </div>
          ) : isError ? (
            <div className="flex items-center gap-2 text-sm text-red-500">
              <X className="h-4 w-4" /> Failed to load profile.
            </div>
          ) : user ? (
            <div className="flex items-center gap-3 sm:gap-4">
              <Avatar user={user} size="lg" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-zinc-900 sm:text-base">
                  {user.name || "—"}
                </p>
                <p className="truncate text-[11px] text-zinc-500 sm:text-xs">
                  {user.email || "—"}
                </p>
                <p className="truncate text-[11px] text-zinc-500 sm:text-xs">
                  {user.phone || "—"}
                </p>
                <p className="truncate text-[11px] text-zinc-400 sm:text-xs">
                  {user.location || "No location set"}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-4 text-zinc-400">
              <UserCircle2 className="h-8 w-8 text-zinc-300" />
              <p className="text-xs">No user data.</p>
            </div>
          )}
        </div> */}

        {/* 4 stat cards — always 2 cols */}
        <StatCard
          label="Total Investment"
          value={user?.totalInvestment}
          Icon={Wallet}
          color="emerald"
          currency
        />
        <StatCard
          label="Total Profit"
          value={user?.totalProfit}
          Icon={TrendingUp}
          color="blue"
          currency
        />
        <StatCard
          label="Balance"
          value={user?.balance}
          Icon={Landmark}
          color="violet"
          currency
        />
        <StatCard
          label="Total Cost"
          value={user?.totalCost}
          Icon={BadgeDollarSign}
          color="zinc"
          currency
        />
        <StatCard
          label="Investments Count"
          value={meta?.total ?? 0}
          Icon={Hash}
          color="blue"
        />
        <StatCard
          label="Pending Deeds"
          value={pendingDeedsCount}
          Icon={FileText}
          color="zinc"
          onClick={() => {
            setFilterDeed("pending");
            setPage(1);
          }}
        />
      </section>

      {/* ── INVESTMENTS TABLE ── */}
      <section>
        <div className="w-full overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <div className="h-[3px] w-full bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]" />

          {/* Toolbar */}
          <div className="flex flex-col gap-2.5 border-b border-zinc-100 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => { setShowActive(true); setFilterDeed("all"); setPage(1); }}
                className={`text-sm font-bold transition-colors ${showActive && filterDeed === "all" ? "text-primary underline underline-offset-4" : "text-zinc-400 hover:text-zinc-600"}`}
              >
                Active Investments
              </button>
              <button
                onClick={() => { setShowActive(false); setFilterDeed("all"); setPage(1); }}
                className={`text-sm font-bold transition-colors ${!showActive && filterDeed === "all" ? "text-primary underline underline-offset-4" : "text-zinc-400 hover:text-zinc-600"}`}
              >
                Previous Investments
              </button>
              {pendingDeedsCount > 0 && (
                <button
                  onClick={() => { setFilterDeed("pending"); setPage(1); }}
                  className={`text-sm font-bold transition-colors ${filterDeed === "pending" ? "text-primary underline underline-offset-4" : "text-zinc-400 hover:text-zinc-600"}`}
                >
                  Pending Deeds ({pendingDeedsCount})
                </button>
              )}
            </div>
            <div className="flex flex-col items-end">
              <p className="text-[11px] text-zinc-400">
                {filteredByStatus.length} records in this view
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 border-b border-zinc-100 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
            <div>
              <h2 className="text-sm font-bold text-zinc-900">
                {showActive ? "Current Active Investments" : "Past/Inactive Investments"}
              </h2>
              <p className="text-[11px] text-zinc-400">
                {filtered.length} total records
              </p>
            </div>
            <div className="relative w-full sm:w-56">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-8 pr-8 text-sm text-zinc-800 placeholder-zinc-400 transition focus:border-[color:rgba(77,140,30,0.32)] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[color:rgba(77,140,30,0.14)]"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-full table-fixed divide-y divide-zinc-100 text-sm">
              <colgroup>
                <col className="w-16" />
                <col className="min-w-[160px]" />
                <col className="min-w-[130px]" />
                <col className="min-w-[130px]" />
                <col className="min-w-[90px]" />
                <col className="min-w-[110px]" />
                <col className="min-w-[110px]" />
                <col className="min-w-[140px]" />
                <col className="w-16" />
              </colgroup>

              <thead>
                <tr className="bg-zinc-50">
                  {[
                    "#",
                    "AMOUNT (BDT)",
                    "START DATE",
                    "END DATE",
                    "DAYS",
                    "STATUS",
                    "DEED",
                    "REFERENCE",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400 sm:text-[11px]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-100 bg-white">
                {isInvestmentsBusy ? (
                  [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-14 text-center sm:py-16">
                      <div className="flex flex-col items-center gap-2.5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-50 ring-1 ring-zinc-200">
                          <Wallet className="h-5 w-5 text-zinc-300" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-zinc-500">
                            {isInvError
                              ? "Failed to load"
                              : search
                                ? "No results"
                                : "No investments"}
                          </p>
                          <p className="text-xs text-zinc-400">
                            {isInvError
                              ? "Could not load investments."
                              : search
                                ? `No results for "${search}"`
                                : "Your investments will appear here."}
                          </p>
                        </div>
                        {search && (
                          <button
                            onClick={() => setSearch("")}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-600 hover:border-[color:rgba(77,140,30,0.32)] hover:text-primary"
                          >
                            <X className="h-3 w-3" /> Clear
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((row, idx) => (
                    <tr
                      key={row.id}
                      className="group cursor-pointer transition-colors hover:bg-secondary"
                      onClick={() => router.push(`/investor/my-investments/${row.id}`)}
                    >
                      {/* SL */}
                      <td className="pl-6 pr-4 py-4 text-xs font-bold tabular-nums text-zinc-400">
                        {(page - 1) * pageSize + idx + 1}
                      </td>

                      {/* Amount */}
                      <td className="px-6 py-4">
                        <AmountBadge amount={row.amount} />
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10">
                          {row.startDate || row.date || "—"}
                        </span>
                      </td>

                      {/* End Date */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10">
                          {row.endDate || "—"}
                        </span>
                      </td>

                      {/* Days */}
                      <td className="px-6 py-4">
                        {row.startDate && row.endDate ? (
                          <span className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-1 text-xs font-bold text-zinc-700 ring-1 ring-inset ring-zinc-500/10">
                            {Math.ceil(
                              Math.abs(new Date(row.endDate) - new Date(row.startDate)) /
                              (1000 * 60 * 60 * 24)
                            )}d
                          </span>
                        ) : <span className="text-zinc-300 text-xs">—</span>}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        {(() => {
                          const isExpired = row.endDate && new Date(row.endDate) < new Date();
                          return (
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-1 text-[10px] font-bold ring-1 ring-inset ${isExpired
                                ? "bg-red-50 text-red-700 ring-red-600/10"
                                : "bg-secondary text-primary ring-[color:rgba(77,140,30,0.14)]"
                                }`}
                            >
                              {isExpired ? "Expired" : "Active"}
                            </span>
                          );
                        })()}
                      </td>

                      {/* Deed */}
                      <td className="px-6 py-4">
                        {(() => {
                          const hasDeed = deedsByInvestmentId.has(String(row.id));
                          return (
                            <span
                              className={`inline-flex items-center rounded-md px-2 py-1 text-[10px] font-bold ring-1 ring-inset ${hasDeed
                                ? "bg-zinc-50 text-zinc-700 ring-zinc-600/10"
                                : "bg-secondary text-primary ring-[color:rgba(77,140,30,0.14)]"
                                }`}
                            >
                              {hasDeed ? "Issued" : "Pending"}
                            </span>
                          );
                        })()}
                      </td>

                      {/* Reference */}
                      <td className="px-6 py-4">
                        {row.reference ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-zinc-50 px-2 py-1 font-mono text-[10px] text-zinc-600 ring-1 ring-inset ring-zinc-500/10">
                            <Hash className="h-2.5 w-2.5 text-zinc-400" />
                            {row.reference}
                          </span>
                        ) : (
                          <span className="text-zinc-300 text-xs">—</span>
                        )}
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/investor/my-investments/${row.id}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-50 hover:text-primary"
                          aria-label="View investment details"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <TablePagination
            page={meta.page ?? page}
            pageCount={meta.pageCount ?? 1}
            total={meta.total ?? investments.length}
            pageSize={pageSize}
            onPageChange={(newPage) =>
              setPage(Math.max(1, Math.min(meta.pageCount ?? 1, newPage)))
            }
            onPageSizeChange={(s) => {
              setPageSize(s);
              setPage(1);
            }}
          />
        </div>
      </section>

      {/* detail modal removed for detail page */}
    </main>
  );
}
