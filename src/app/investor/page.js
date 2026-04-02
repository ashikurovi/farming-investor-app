"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  TrendingUp,
  Users,
  Sprout,
  Wallet,
  DollarSign,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
  LayoutDashboard,
} from "lucide-react";
import { useMeQuery } from "@/features/auth/authApiSlice";
import { useGetProjectsStatsQuery } from "@/features/admin/projects/projectsApiSlice";
import {
  useGetMyInvestmentsQuery,
  useGetInvestmentsStatsQuery,
} from "@/features/investor/investments/investmentsApiSlice";
import { useGetUsersQuery } from "@/features/admin/users/usersApiSlice";
import { NoticeMarquee } from "./components/NoticeMarquee";

/* ══════════════════════════════════════════════════
   THEME TOKENS
══════════════════════════════════════════════════ */
const THEMES = {
  emerald: {
    bar: "from-emerald-400 to-teal-400",
    iconBg: "bg-emerald-50", iconRing: "ring-emerald-100",
    iconColor: "text-emerald-600", valueColor: "text-emerald-700",
    badgeBg: "bg-emerald-50", badgeText: "text-emerald-600", badgeRing: "ring-emerald-200",
  },
  teal: {
    bar: "from-teal-400 to-cyan-400",
    iconBg: "bg-teal-50", iconRing: "ring-teal-100",
    iconColor: "text-teal-600", valueColor: "text-teal-700",
    badgeBg: "bg-teal-50", badgeText: "text-teal-600", badgeRing: "ring-teal-200",
  },
  blue: {
    bar: "from-blue-400 to-indigo-400",
    iconBg: "bg-blue-50", iconRing: "ring-blue-100",
    iconColor: "text-blue-600", valueColor: "text-blue-700",
    badgeBg: "bg-blue-50", badgeText: "text-blue-600", badgeRing: "ring-blue-200",
  },
  violet: {
    bar: "from-violet-400 to-purple-400",
    iconBg: "bg-violet-50", iconRing: "ring-violet-100",
    iconColor: "text-violet-600", valueColor: "text-violet-700",
    badgeBg: "bg-violet-50", badgeText: "text-violet-600", badgeRing: "ring-violet-200",
  },
  amber: {
    bar: "from-amber-400 to-orange-400",
    iconBg: "bg-amber-50", iconRing: "ring-amber-100",
    iconColor: "text-amber-600", valueColor: "text-amber-700",
    badgeBg: "bg-amber-50", badgeText: "text-amber-600", badgeRing: "ring-amber-200",
  },
  zinc: {
    bar: "from-zinc-400 to-zinc-500",
    iconBg: "bg-zinc-100", iconRing: "ring-zinc-200",
    iconColor: "text-zinc-600", valueColor: "text-zinc-800",
    badgeBg: "bg-zinc-100", badgeText: "text-zinc-600", badgeRing: "ring-zinc-300",
  },
};

const fmt = (n) =>
  Number(n ?? 0).toLocaleString("en-US", { maximumFractionDigits: 0 });

/* ══════════════════════════════════════════════════
   KPI STAT CARD
══════════════════════════════════════════════════ */
const KPIStatCard = ({
  label, value, loading, Icon,
  theme = "emerald", secondary, currency = false,
}) => {
  const t = THEMES[theme] ?? THEMES.emerald;
  const isBusy = Boolean(loading) || value == null;
  const displayValue = isBusy ? null : `${currency ? "৳" : ""}${fmt(value)}`;

  const secondaryText = (() => {
    if (!secondary) return null;
    if (secondary.percentage && typeof secondary.value === "number")
      return `${Math.round(secondary.value)}%`;
    if (secondary.value == null) return "—";
    const raw = fmt(secondary.value);
    return secondary.currency ? `৳${raw}` : raw;
  })();

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm ring-1 ring-transparent transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:ring-zinc-300/60">
      <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${t.bar}`} />

      <div className="p-4 pt-5 lg:p-5 lg:pt-6">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
            {label}
          </p>
          <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${t.iconBg} ring-1 ${t.iconRing}`}>
            <Icon className={`h-4 w-4 ${t.iconColor}`} />
          </span>
        </div>

        {isBusy ? (
          <div className="mt-3 space-y-2">
            <div className="h-8 w-28 animate-pulse rounded-lg bg-zinc-100" />
            <div className="h-3 w-20 animate-pulse rounded bg-zinc-100" />
          </div>
        ) : (
          <>
            <p className={`mt-3 text-2xl font-bold tabular-nums tracking-tight ${t.valueColor} lg:text-3xl`}>
              {displayValue}
            </p>
            {secondary?.label && (
              <div className="mt-2 flex items-center gap-1.5">
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${t.badgeBg} ${t.badgeText} ring-1 ${t.badgeRing}`}>
                  {secondary.percentage && <TrendingUp className="h-2.5 w-2.5" />}
                  {secondaryText}
                </span>
                <span className="text-[10px] text-zinc-400">{secondary.label}</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   AVATAR
══════════════════════════════════════════════════ */
const Avatar = ({ user, size = "sm" }) => {
  const initials = (user?.name || user?.email || "?").substring(0, 2).toUpperCase();
  const dim =
    size === "xl" ? "h-16 w-16 text-base" :
      size === "lg" ? "h-12 w-12 text-sm" : "h-8 w-8 text-xs";
  const src =
    typeof user?.photoUrl === "string" ? user.photoUrl.replace(/`/g, "").trim() : "";

  return src ? (
    <img src={src} alt={user?.name || "Investor"}
      className={`${dim} rounded-full object-cover ring-2 ring-white shadow-sm`} />
  ) : (
    <div className={`${dim} inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 font-bold text-white ring-2 ring-white shadow-sm`}>
      {initials}
    </div>
  );
};

/* ══════════════════════════════════════════════════
   TYPE BADGE
══════════════════════════════════════════════════ */
const TypeBadge = ({ label }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 ring-1 ring-emerald-200">
    {label}
  </span>
);

/* ══════════════════════════════════════════════════
   SKELETON ROW
══════════════════════════════════════════════════ */
const SkeletonRow = () => (
  <tr className="border-b border-zinc-100">
    {[...Array(6)].map((_, i) => (
      <td key={i} className="px-4 py-4">
        <div className="h-4 animate-pulse rounded-lg bg-zinc-100" />
      </td>
    ))}
  </tr>
);

/* ══════════════════════════════════════════════════
   INVESTOR DETAIL MODAL
══════════════════════════════════════════════════ */
const InvestorDetailModal = ({ investor, onClose }) => {
  if (!investor) return null;

  const fields = [
    { label: "Full name", value: investor.name },
    { label: "Email address", value: investor.email },
    { label: "Phone", value: investor.phone },
    { label: "Location", value: investor.location },
    {
      label: "Investor type",
      value:
        investor.investorType?.type ||
        (investor.investorTypeId ? `Type #${investor.investorTypeId}` : null),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl ring-1 ring-black/5">
        <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500" />
        <div className="p-6">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar user={investor} size="xl" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-400 ring-2 ring-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-zinc-900">{investor.name || "Investor"}</h3>
                <p className="text-xs text-zinc-400">{investor.email || "—"}</p>
                {investor.investorType?.type && (
                  <div className="mt-1.5"><TypeBadge label={investor.investorType.type} /></div>
                )}
              </div>
            </div>
            <button onClick={onClose}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-400 transition-colors hover:bg-zinc-50 hover:text-zinc-600">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Fields */}
          <div className="overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50/60">
            {fields.map(({ label, value }, i) => (
              <div key={label}
                className={`flex items-center justify-between gap-4 px-4 py-3 ${i % 2 === 0 ? "bg-white shadow-sm" : ""}`}>
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400">{label}</span>
                <span className="text-right text-sm font-medium text-zinc-800">{value || "—"}</span>
              </div>
            ))}
          </div>

          <button onClick={onClose}
            className="mt-5 w-full rounded-xl border border-zinc-200 bg-white py-2.5 text-sm font-semibold text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   TABLE PAGINATION
══════════════════════════════════════════════════ */
const TablePagination = ({
  page, pageCount, total, pageSize, onPageChange, onPageSizeChange, entity = "records",
}) => {
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  return (
    <div className="flex flex-col gap-3 border-t border-zinc-100 bg-zinc-50/50 px-5 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[11px] text-zinc-400">
        Showing <span className="font-semibold text-zinc-700">{from}–{to}</span> of{" "}
        <span className="font-semibold text-zinc-700">{total}</span> {entity}
      </p>
      <div className="flex items-center gap-1.5">
        <select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="h-8 rounded-lg border border-zinc-200 bg-white px-2 text-xs font-medium text-zinc-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-300">
          {[5, 10, 20, 50].map((s) => <option key={s} value={s}>{s} / page</option>)}
        </select>
        {[
          { Icon: ChevronsLeft, label: "First", target: 1 },
          { Icon: ChevronLeft, label: "Prev", target: page - 1 },
          { Icon: ChevronRight, label: "Next", target: page + 1 },
          { Icon: ChevronsRight, label: "Last", target: pageCount },
        ].map(({ Icon, label, target }) => (
          <button key={label} onClick={() => onPageChange(target)}
            disabled={label === "First" || label === "Prev" ? page <= 1 : page >= pageCount}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 shadow-sm transition-colors hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={label}>
            <Icon className="h-3.5 w-3.5" />
          </button>
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════ */
const PAGE_SIZE = 10;

export default function InvestorDashboardPage() {
  const router = useRouter();
  const { data: meResponse } = useMeQuery();

  const [search, setSearch] = useState("");
  const [investorPage, setInvestorPage] = useState(1);
  const [investorPageSize, setInvestorPageSize] = useState(PAGE_SIZE);

  const { data: stats, isLoading: statsLoading } = useGetProjectsStatsQuery();
  const { data: invStats, isLoading: invStatsLoading } = useGetInvestmentsStatsQuery();
  const {
    data: usersData, isLoading: isUsersLoading, isFetching: isUsersFetching,
  } = useGetUsersQuery({ page: investorPage, limit: investorPageSize, search: "" });

  const allUsers = usersData?.items ?? [];
  const investors = allUsers.filter((u) => u.role === "investor");
  const filtered = search.trim()
    ? investors.filter(
      (u) =>
        (u.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (u.email || "").toLowerCase().includes(search.toLowerCase()) ||
        (u.phone || "").includes(search),
    )
    : investors;

  const investorsMeta = usersData?.meta ?? { page: investorPage, pageCount: 1, total: investors.length };
  const isInvestorsBusy = isUsersLoading || isUsersFetching;

  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const openDetail = (u) => { setSelectedInvestor(u); setDetailOpen(true); };
  const closeDetail = () => { setDetailOpen(false); setSelectedInvestor(null); };

  /* KPI config */
  const kpiCards = [
    {
      label: "Collected Investment", value: invStats?.totalInvestmentCollect,
      loading: invStatsLoading, Icon: Wallet, theme: "emerald", currency: true,
      secondary: {
        label: "avg / project",
        value: (stats?.totalProjects ?? 0) > 0 ? (stats?.totalInvestment ?? 0) / (stats?.totalProjects ?? 1) : null,
        currency: true,
      },
    },
    {
      label: "Total Investors", value: invStats?.totalInvestorCount,
      loading: invStatsLoading, Icon: Users, theme: "teal",
      secondary: { label: "registered", value: invStats?.totalInvestorCount },
    },
    {
      label: "New Investors", value: invStats?.newInvestorCount,
      loading: invStatsLoading, Icon: TrendingUp, theme: "blue",
      secondary: {
        label: "of total",
        value: (invStats?.totalInvestorCount ?? 0) > 0
          ? ((invStats?.newInvestorCount ?? 0) * 100) / (invStats?.totalInvestorCount ?? 1) : null,
        percentage: true,
      },
    },
    {
      label: "Total Projects", value: stats?.totalProjects,
      loading: statsLoading, Icon: Sprout, theme: "violet",
    },
    {
      label: "Project Investment", value: stats?.totalInvestment,
      loading: statsLoading, Icon: DollarSign, theme: "emerald", currency: true,
      secondary: {
        label: "per project",
        value: (stats?.totalProjects ?? 0) > 0 ? (stats?.totalInvestment ?? 0) / (stats?.totalProjects ?? 1) : null,
        currency: true,
      },
    },
    {
      label: "Total Cost", value: stats?.totalCost,
      loading: statsLoading, Icon: DollarSign, theme: "zinc", currency: true,
      secondary: {
        label: "per project",
        value: (stats?.totalProjects ?? 0) > 0 ? (stats?.totalCost ?? 0) / (stats?.totalProjects ?? 1) : null,
        currency: true,
      },
    },
    {
      label: "Total Sell", value: stats?.totalSell,
      loading: statsLoading, Icon: DollarSign, theme: "teal", currency: true,
      secondary: {
        label: "per project",
        value: (stats?.totalProjects ?? 0) > 0 ? (stats?.totalSell ?? 0) / (stats?.totalProjects ?? 1) : null,
        currency: true,
      },
    },
    {
      label: "Total Profit", value: stats?.totalProfit,
      loading: statsLoading, Icon: TrendingUp, theme: "amber", currency: true,
      secondary: {
        label: "per project",
        value: (stats?.totalProjects ?? 0) > 0 ? (stats?.totalProfit ?? 0) / (stats?.totalProjects ?? 1) : null,
        currency: true,
      },
    },
  ];

  return (
    <div className="space-y-8 mx-auto">
      <NoticeMarquee />

      {/* ── DASHBOARD HEADER ── */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="h-[3px] w-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500" />
        <div className="flex items-center gap-3 px-5 py-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
            <LayoutDashboard className="h-[18px] w-[18px] text-emerald-600" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-zinc-900">Investor Dashboard</h1>
            <p className="text-xs text-zinc-400">Overview of investments, projects & registered investors.</p>
          </div>
        </div>
      </div>

      {/* ── KPI GRID ── */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-3.5 w-[3px] rounded-full bg-emerald-500" />
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Key Metrics</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 lg:gap-4">
          {kpiCards.map((card) => <KPIStatCard key={card.label} {...card} />)}
        </div>
      </section>

      {/* ── INVESTORS TABLE ── */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <div className="h-3.5 w-[3px] rounded-full bg-teal-500" />
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Investor Registry</h2>
        </div>

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <div className="h-[3px] w-full bg-gradient-to-r from-teal-400 to-emerald-400" />

          {/* Toolbar */}
          <div className="flex flex-col gap-3 border-b border-zinc-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-50 ring-1 ring-teal-100">
                <Users className="h-4 w-4 text-teal-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-zinc-900">All Investors</h3>
                <p className="text-[11px] text-zinc-400">{investorsMeta.total ?? investors.length} registered</p>
              </div>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
              <input type="text" placeholder="Search by name, email, phone…" value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-9 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-9 pr-8 text-sm text-zinc-800 placeholder-zinc-400 transition focus:border-emerald-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-100"
              />
              {search && (
                <button onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="w-full overflow-x-auto">
            <table className="min-w-full table-fixed divide-y divide-zinc-100 text-sm">
              <colgroup>
                <col className="w-12" />
                <col className="w-52 min-w-[190px]" />
                <col className="w-56 min-w-[200px]" />
                <col className="w-36 min-w-[130px]" />
                <col className="w-32 min-w-[120px]" />
                <col className="w-16" />
              </colgroup>

              <thead>
                <tr className="bg-zinc-50">
                  {["#", "Investor", "Email", "Phone", "Type", ""].map((h) => (
                    <th key={h} scope="col"
                      className="px-4 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400 first:pl-5">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-100 bg-white">
                {isInvestorsBusy ? (
                  [...Array(5)].map((_, i) => <SkeletonRow key={i} />)
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-50 ring-1 ring-zinc-200">
                          <Users className="h-6 w-6 text-zinc-300" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-zinc-500">
                            {search ? "No results found" : "No investors yet"}
                          </p>
                          <p className="text-xs text-zinc-400">
                            {search ? `No investors match "${search}"` : "Registered investors will appear here."}
                          </p>
                        </div>
                        {search && (
                          <button onClick={() => setSearch("")}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-600 hover:border-emerald-300 hover:text-emerald-700">
                            <X className="h-3 w-3" /> Clear search
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((investor, idx) => {
                    const investorType =
                      investor.investorType?.type ||
                      (investor.investorTypeId ? `Type #${investor.investorTypeId}` : null);
                    return (
                      <tr key={investor.id} className="group transition-colors hover:bg-emerald-50/30">
                        <td className="pl-5 pr-4 py-4 text-xs font-semibold tabular-nums text-zinc-400">
                          {(investorPage - 1) * investorPageSize + idx + 1}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar user={investor} size="sm" />
                            <p className="truncate text-sm font-semibold text-zinc-900">
                              {investor.name || "—"}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="truncate text-xs text-zinc-500">{investor.email || "—"}</span>
                        </td>
                        <td className="px-4 py-4 text-xs text-zinc-500">{investor.phone || "—"}</td>
                        <td className="px-4 py-4">
                          {investorType ? <TypeBadge label={investorType} /> : <span className="text-zinc-300 text-xs">—</span>}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <button type="button" onClick={() => openDetail(investor)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-400 shadow-sm transition-all group-hover:border-emerald-300 group-hover:bg-emerald-50 group-hover:text-emerald-700 hover:scale-110"
                            aria-label="View investor">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <TablePagination
            page={investorsMeta.page ?? investorPage}
            pageCount={investorsMeta.pageCount ?? 1}
            total={investorsMeta.total ?? investors.length}
            pageSize={investorPageSize}
            entity="investors"
            onPageChange={(newPage) => {
              const max = investorsMeta.pageCount ?? 1;
              setInvestorPage(Math.max(1, Math.min(max, newPage)));
            }}
            onPageSizeChange={(s) => { setInvestorPageSize(s); setInvestorPage(1); }}
          />
        </div>
      </section>

      {/* MODAL */}
      {detailOpen && (
        <InvestorDetailModal investor={selectedInvestor} onClose={closeDetail} />
      )}
    </div>
  );
}