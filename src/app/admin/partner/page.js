"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetPartnersQuery,
  useGetPartnerByIdQuery,
  useAddPartnerMutation,
  useAddInvestmentMutation,
  useWithdrawPartnerProfitMutation,
  useGetPartnerPayoutsQuery,
  useGetAllPartnerPayoutsQuery,
} from "@/features/partner/partnerApiSlice";
import { useGetInvestmentsAdminQuery } from "@/features/investor/investments/investmentsApiSlice";
import { AdminSearchBar } from "@/app/admin/components/AdminSearchBar";
import { toast } from "sonner";
import {
  Loader2,
  Plus,
  Users,
  Landmark,
  Banknote,
  Shield,
  Briefcase,
  Activity,
  TrendingUp,
  RefreshCw,
  Download,
  FileText,
  History,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PartnerPage() {
  const user = useSelector((state) => state.auth?.user);

  if (!user) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[color:rgb(77,140,30)] dark:text-[color:rgb(124,194,46)]" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-2 font-sans">
      <div className="mx-auto max-w-[1600px]">
        <header className="flex flex-col gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:rgba(124,194,46,0.14)] text-[color:rgb(77,140,30)] ring-1 ring-[color:rgba(77,140,30,0.18)] dark:bg-[color:rgba(124,194,46,0.14)] dark:text-[color:rgb(124,194,46)] dark:ring-[color:rgba(124,194,46,0.22)]">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-2xl">
                Partner Hub
              </h1>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Manage investments, track performance, and view profit
                distribution.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-700 ring-1 ring-zinc-200 dark:bg-zinc-800/60 dark:text-zinc-200 dark:ring-zinc-700">
            <Shield className="h-5 w-5 text-[color:rgb(77,140,30)] dark:text-[color:rgb(124,194,46)]" />
            <span className="capitalize">{user?.role}</span>
          </div>
        </header>

        {user.role === "admin" ? (
          <AdminPartnerDashboard />
        ) : user.role === "partner" ? (
          <PartnerDashboard userId={user.id} />
        ) : (
          <div className="flex h-64 items-center justify-center rounded-2xl bg-white p-12 text-center shadow-xl shadow-red-500/10 ring-1 ring-gray-900/5 dark:bg-gray-900">
            <div>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                <Shield className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-zinc-100">
                Access Denied
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-zinc-400">
                You do not have permission to view this page.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PartnerDashboard({ userId }) {
  const {
    data: partnerInfo,
    isLoading,
    refetch,
    isFetching,
  } = useGetPartnerByIdQuery(userId);
  const { data: payouts, isLoading: isPayoutsLoading } =
    useGetPartnerPayoutsQuery(userId);
  const [printingInvoice, setPrintingInvoice] = useState(null);
  // jsdeefjkwenf
  const handlePrint = (payout) => {
    setPrintingInvoice(payout);
    setTimeout(() => {
      window.print();
      setTimeout(() => setPrintingInvoice(null), 500);
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-zinc-200 bg-white/70 backdrop-blur shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70">
        <Loader2 className="h-8 w-8 animate-spin text-[color:rgb(77,140,30)] dark:text-[color:rgb(124,194,46)]" />
      </div>
    );
  }

  if (!partnerInfo) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-[color:rgb(77,140,30)] dark:text-[color:rgb(124,194,46)]" />{" "}
          My Portfolio Overview
        </h2>
        <button
          onClick={refetch}
          className="p-2 text-zinc-500 hover:text-[color:rgb(77,140,30)] dark:text-zinc-400 dark:hover:text-[color:rgb(124,194,46)] transition-colors"
        >
          <RefreshCw
            className={`h-5 w-5 ${isFetching ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Investment"
          value={`৳${Number(partnerInfo.totalInvestment || 0).toLocaleString()}`}
          icon={
            <Landmark className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          }
          gradient="from-blue-500/20 to-cyan-500/20"
        />
        <StatCard
          title="Total Profit"
          value={`৳${Number(partnerInfo.totalProfit || 0).toLocaleString()}`}
          icon={
            <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          }
          gradient="from-emerald-500/20 to-teal-500/20"
        />
        <StatCard
          title="Total Share"
          value={`${partnerInfo.sharePercentage || 0}%`}
          icon={
            <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          }
          gradient="from-purple-500/20 to-pink-500/20"
        />
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/10 no-print">
        <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-4">
          Investment Guidelines
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
          Your profit distribution is automatically calculated based on your
          total investment relative to the total partner investment pool. All
          distributions happen dynamically as generated from system-wide
          commissions. If you wish to increase your investment and profit share,
          please contact the administrators.
        </p>
      </div>

      <div className="mt-8 rounded-2xl bg-white shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/10 overflow-hidden no-print">
        <div className="border-b border-zinc-100 dark:border-zinc-800 p-6">
          <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <FileText className="h-5 w-5 text-[color:rgb(77,140,30)] dark:text-[color:rgb(124,194,46)]" />{" "}
            Payout History
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
            <thead className="bg-zinc-50 text-zinc-900 dark:bg-zinc-800/50 dark:text-zinc-100">
              <tr>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Reference ID</th>
                <th className="px-6 py-3 font-medium text-right">
                  Amount Withdrawn
                </th>
                <th className="px-6 py-3 font-medium text-center">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {isPayoutsLoading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center">
                    <Loader2 className="h-5 w-5 animate-spin mx-auto text-[color:rgb(77,140,30)] dark:text-[color:rgb(124,194,46)]" />
                  </td>
                </tr>
              ) : payouts?.length > 0 ? (
                payouts.map((payout) => (
                  <tr
                    key={payout.id}
                    className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      {new Date(payout.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">
                      {payout.reference}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-emerald-600 dark:text-emerald-400">
                      ৳{Number(payout.amount).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() =>
                          handlePrint({
                            ...payout,
                            partnerName: partnerInfo.name,
                            partnerEmail: partnerInfo.email,
                          })
                        }
                        className="inline-flex items-center gap-1 rounded px-2 py-1.5 text-xs font-semibold transition-colors bg-[color:rgba(124,194,46,0.12)] text-[color:rgb(77,140,30)] hover:bg-[color:rgba(124,194,46,0.18)] dark:bg-[color:rgba(124,194,46,0.12)] dark:text-[color:rgb(124,194,46)] dark:hover:bg-[color:rgba(124,194,46,0.18)]"
                      >
                        <Download className="h-3 w-3" /> Download
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-8 text-center text-zinc-500 dark:text-zinc-400"
                  >
                    No payouts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {printingInvoice && (
        <div className="print-only hidden">
          <InvoiceTemplate payout={printingInvoice} />
        </div>
      )}
    </motion.div>
  );
}

function InvoiceTemplate({ payout }) {
  return (
    <div className="bg-white p-8 font-sans text-gray-900 w-full max-w-3xl mx-auto border border-gray-200">
      <div className="flex justify-between items-center border-b pb-6 mb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">
            Artman
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Partner Payout Invoice
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold text-gray-800">
            Invoice Ref: #{payout.reference}
          </p>
          <p className="text-sm text-gray-500">
            Date: {new Date(payout.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
          Paid To:
        </h3>
        <p className="text-lg font-bold">{payout.partnerName}</p>
        <p className="text-gray-600">{payout.partnerEmail}</p>
      </div>

      <table className="w-full text-left mb-8 border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-900">
            <th className="py-2 text-sm font-bold uppercase tracking-wider text-gray-600">
              Description
            </th>
            <th className="py-2 text-sm font-bold uppercase tracking-wider text-gray-600 text-right">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="py-4 text-gray-800 font-medium">
              Partner Profit Withdrawal
            </td>
            <td className="py-4 text-right text-gray-800 font-bold">
              ৳{Number(payout.amount).toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-end mb-12">
        <div className="text-right">
          <p className="text-sm text-gray-500 mb-1">Total Payout Amount</p>
          <p className="text-3xl font-black text-gray-900">
            ৳{Number(payout.amount).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="border-t pt-6 text-center text-sm text-gray-500">
        <p>
          This is an automatically generated receipt for partner profit
          withdrawals.
        </p>
        <p>Thank you for being a valued partner of Artman.</p>
      </div>
    </div>
  );
}

function AdminPartnerDashboard() {
  const { data: partners, isLoading, refetch } = useGetPartnersQuery();
  const { data: globalPayouts, isLoading: isPayoutsLoading } =
    useGetAllPartnerPayoutsQuery();
  const { data: allInvestments, isLoading: isInvestmentsLoading } =
    useGetInvestmentsAdminQuery();

  const [activePartnerId, setActivePartnerId] = useState(null);
  const [payoutPartnerId, setPayoutPartnerId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState("directory");
  const [printingInvoice, setPrintingInvoice] = useState(null);
  const [printingInvestment, setPrintingInvestment] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePrint = (payout) => {
    setPrintingInvoice(payout);
    setTimeout(() => {
      window.print();
      setTimeout(() => setPrintingInvoice(null), 500);
    }, 100);
  };

  const handlePrintInvestment = (investment, partnerName) => {
    setPrintingInvestment({ ...investment, partnerName });
    setTimeout(() => {
      window.print();
      setTimeout(() => setPrintingInvestment(null), 500);
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl bg-white/50 backdrop-blur shadow-sm ring-1 ring-gray-900/5 dark:bg-zinc-900/50 dark:ring-white/10">
        <Loader2 className="h-8 w-8 animate-spin text-[color:rgb(77,140,30)] dark:text-[color:rgb(124,194,46)]" />
      </div>
    );
  }

  const totalPool =
    partners?.reduce((acc, curr) => acc + Number(curr.totalInvestment), 0) || 0;
  const totalCurrentProfit =
    partners?.reduce((acc, curr) => acc + Number(curr.totalProfit), 0) || 0;
  const totalDistributed =
    globalPayouts?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;

  const partnersMap = new Map((partners || []).map((p) => [p.id, p]));

  const lowerSearch = searchQuery.toLowerCase();

  const filteredPartners = (partners || []).filter(
    (p) =>
      !lowerSearch ||
      p.name?.toLowerCase().includes(lowerSearch) ||
      p.email?.toLowerCase().includes(lowerSearch) ||
      p.phone?.includes(lowerSearch),
  );

  const filteredPayouts = (globalPayouts || []).filter((p) => {
    if (!lowerSearch) return true;
    return (
      p.reference?.toLowerCase().includes(lowerSearch) ||
      p.partner?.name?.toLowerCase().includes(lowerSearch) ||
      p.partner?.email?.toLowerCase().includes(lowerSearch)
    );
  });

  const allPartnerInv = (
    Array.isArray(allInvestments) ? allInvestments : []
  ).filter((inv) => partnersMap.has(inv.investorId));
  const filteredInvestments = allPartnerInv.filter((inv) => {
    if (!lowerSearch) return true;
    const p = partnersMap.get(inv.investorId);
    return (
      inv.reference?.toLowerCase().includes(lowerSearch) ||
      p?.name?.toLowerCase().includes(lowerSearch) ||
      p?.email?.toLowerCase().includes(lowerSearch)
    );
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 no-print">
        <div className="flex bg-white shadow-sm ring-1 ring-zinc-900/5 rounded-2xl p-1 w-fit dark:bg-zinc-900 dark:ring-white/10">
          <button
            onClick={() => setActiveTab("directory")}
            className={`flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl transition-all ${
              activeTab === "directory"
                ? "bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            <Users className="h-4 w-4" /> Partner Directory
          </button>
          <button
            onClick={() => setActiveTab("payouts")}
            className={`flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl transition-all ${
              activeTab === "payouts"
                ? "bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            <History className="h-4 w-4" /> Global Payouts
          </button>
          <button
            onClick={() => setActiveTab("investments")}
            className={`flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-xl transition-all ${
              activeTab === "investments"
                ? "bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))] text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            <Landmark className="h-4 w-4" /> Partner Investments
          </button>
        </div>
        <div className="w-full sm:w-64">
          <AdminSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search partners, emails..."
            className="w-full"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 mb-4 mt-8 no-print">
        <StatCard
          title="Total Partner Fund"
          value={`৳${totalPool.toLocaleString()}`}
          icon={
            <Landmark className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          }
          gradient="from-blue-500/20 to-cyan-500/20"
        />
        <StatCard
          title="Available Profit Balance"
          value={`৳${totalCurrentProfit.toLocaleString()}`}
          icon={
            <TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          }
          gradient="from-emerald-500/20 to-teal-500/20"
        />
        <StatCard
          title="Total Profit Distributed"
          value={`৳${totalDistributed.toLocaleString()}`}
          icon={
            <Banknote className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          }
          gradient="from-purple-500/20 to-pink-500/20"
        />
      </div>

      {activeTab === "directory" ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/10 no-print"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Users className="h-5 w-5 text-[color:rgb(77,140,30)] dark:text-[color:rgb(124,194,46)]" />{" "}
              Directed Management
            </h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-1.5 rounded-xl px-4 py-2 font-semibold text-white shadow-sm transition-all hover:brightness-[1.05] active:scale-95 bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]"
            >
              <Plus className="h-4 w-4" /> Add Partner
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
              <thead className="bg-zinc-50 text-zinc-900 dark:bg-zinc-800/50 dark:text-zinc-100">
                <tr>
                  <th className="rounded-tl-lg px-4 py-3 font-medium">
                    Name & Identity
                  </th>
                  <th className="px-4 py-3 font-medium text-right">
                    Investment
                  </th>
                  <th className="px-4 py-3 font-medium text-right">Share %</th>
                  <th className="px-4 py-3 font-medium text-right">Profit</th>
                  <th className="rounded-tr-lg px-4 py-3 font-medium text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {filteredPartners?.map((p) => {
                  const share =
                    totalPool > 0
                      ? ((Number(p.totalInvestment) / totalPool) * 100).toFixed(
                          2,
                        )
                      : 0;
                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <div className="font-medium text-zinc-900 dark:text-zinc-100">
                          {p.name}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          {p.email || p.phone}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right font-medium text-blue-600 dark:text-blue-400">
                        ৳{Number(p.totalInvestment).toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400">
                          {share}%
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right font-medium text-emerald-600 dark:text-emerald-400">
                        ৳{Number(p.totalProfit).toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setActivePartnerId(p.id)}
                            className="inline-flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold transition-colors bg-[color:rgba(124,194,46,0.12)] text-[color:rgb(77,140,30)] hover:bg-[color:rgba(124,194,46,0.18)] dark:bg-[color:rgba(124,194,46,0.12)] dark:text-[color:rgb(124,194,46)] dark:hover:bg-[color:rgba(124,194,46,0.18)]"
                          >
                            <Plus className="h-3 w-3" /> Add Fund
                          </button>
                          <button
                            onClick={() => setPayoutPartnerId(p.id)}
                            className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20 transition-colors"
                          >
                            <Banknote className="h-3 w-3" /> Payout
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {!filteredPartners?.length && (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-4 py-8 text-center text-zinc-500 dark:text-zinc-400"
                    >
                      No partners found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : activeTab === "payouts" ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/10 no-print"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <FileText className="h-5 w-5 text-[color:rgb(77,140,30)] dark:text-[color:rgb(124,194,46)]" />{" "}
              All Platform Payouts
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
              <thead className="bg-zinc-50 text-zinc-900 dark:bg-zinc-800/50 dark:text-zinc-100">
                <tr>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Partner</th>
                  <th className="px-4 py-3 font-medium">Ref ID</th>
                  <th className="px-4 py-3 font-medium text-right">Amount</th>
                  <th className="px-4 py-3 font-medium text-center">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {isPayoutsLoading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center">
                      <Loader2 className="h-5 w-5 animate-spin mx-auto text-[color:rgb(77,140,30)] dark:text-[color:rgb(124,194,46)]" />
                    </td>
                  </tr>
                ) : filteredPayouts?.length > 0 ? (
                  filteredPayouts.map((payout) => (
                    <tr
                      key={payout.id}
                      className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors"
                    >
                      <td className="px-4 py-4">
                        {new Date(payout.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4">
                        <div className="font-medium text-zinc-900 dark:text-zinc-100">
                          {payout.partner?.name || "Unknown"}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">
                          {payout.partner?.email}
                        </div>
                      </td>
                      <td className="px-4 py-4 font-mono text-xs">
                        {payout.reference}
                      </td>
                      <td className="px-4 py-4 text-right font-medium text-emerald-600 dark:text-emerald-400">
                        ৳{Number(payout.amount).toLocaleString()}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() =>
                            handlePrint({
                              ...payout,
                              partnerName: payout.partner?.name,
                              partnerEmail: payout.partner?.email,
                            })
                          }
                          className="inline-flex items-center gap-1 rounded px-2 py-1.5 text-xs font-semibold transition-colors bg-[color:rgba(124,194,46,0.12)] text-[color:rgb(77,140,30)] hover:bg-[color:rgba(124,194,46,0.18)] dark:bg-[color:rgba(124,194,46,0.12)] dark:text-[color:rgb(124,194,46)] dark:hover:bg-[color:rgba(124,194,46,0.18)]"
                        >
                          <Download className="h-3 w-3" /> Get PDF
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-zinc-500 dark:text-zinc-400"
                    >
                      No payouts recorded across the system yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : activeTab === "investments" ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/10 no-print"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Landmark className="h-5 w-5 text-[color:rgb(77,140,30)] dark:text-[color:rgb(124,194,46)]" />{" "}
              Partner Investments
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
              <thead className="bg-zinc-50 text-zinc-900 dark:bg-zinc-800/50 dark:text-zinc-100">
                <tr>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Ref ID</th>
                  <th className="px-4 py-3 font-medium">Partner</th>
                  <th className="px-4 py-3 font-medium text-right">Amount</th>
                  <th className="px-4 py-3 font-medium text-center">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {isInvestmentsLoading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center">
                      <Loader2 className="h-5 w-5 animate-spin mx-auto text-[color:rgb(77,140,30)] dark:text-[color:rgb(124,194,46)]" />
                    </td>
                  </tr>
                ) : filteredInvestments?.length > 0 ? (
                  filteredInvestments.map((inv) => {
                    const partner = partnersMap.get(inv.investorId);
                    return (
                      <tr
                        key={inv.id}
                        className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20 transition-colors"
                      >
                        <td className="px-4 py-4">
                          {new Date(
                            inv.startDate || inv.createdAt || inv.date,
                          ).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 font-mono text-xs">
                          {inv.reference || `INV-${inv.id || "NA"}`}
                        </td>
                        <td className="px-4 py-4">
                          <div className="font-medium text-zinc-900 dark:text-zinc-100">
                            {partner?.name || "Unknown"}
                          </div>
                          <div className="text-xs text-zinc-500 dark:text-zinc-400">
                            {partner?.email}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right font-medium text-blue-600 dark:text-blue-400">
                          ৳{Number(inv.amount).toLocaleString()}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button
                            onClick={() =>
                              handlePrintInvestment(inv, partner?.name)
                            }
                            className="inline-flex items-center gap-1 rounded px-2 py-1.5 text-xs font-semibold transition-colors bg-[color:rgba(124,194,46,0.12)] text-[color:rgb(77,140,30)] hover:bg-[color:rgba(124,194,46,0.18)] dark:bg-[color:rgba(124,194,46,0.12)] dark:text-[color:rgb(124,194,46)] dark:hover:bg-[color:rgba(124,194,46,0.18)]"
                          >
                            <FileText className="h-3 w-3" /> Get Receipt
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-zinc-500 dark:text-zinc-400"
                    >
                      No partner investments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      ) : null}

      {printingInvoice && (
        <div className="print-only hidden">
          <InvoiceTemplate payout={printingInvoice} />
        </div>
      )}

      {printingInvestment && (
        <div className="print-only hidden">
          <InvestmentReceiptTemplate investment={printingInvestment} />
        </div>
      )}

      <AnimatePresence>
        {activePartnerId && (
          <AddInvestmentModal
            partnerId={activePartnerId}
            onClose={() => setActivePartnerId(null)}
            onSuccess={refetch}
          />
        )}
        {payoutPartnerId && (
          <PayoutProfitModal
            partnerId={payoutPartnerId}
            onClose={() => setPayoutPartnerId(null)}
            onSuccess={refetch}
          />
        )}
        {showCreateModal && (
          <CreatePartnerModal
            onClose={() => setShowCreateModal(false)}
            onSuccess={refetch}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function InvestmentReceiptTemplate({ investment }) {
  return (
    <div className="bg-white p-8 font-sans text-gray-900 w-full max-w-3xl mx-auto border border-gray-200">
      <div className="flex justify-between items-center border-b pb-6 mb-6">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">
            Artman
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Partner Investment Receipt
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold text-gray-800">
            Ref: #{investment.reference || `INV-${investment.id || "NA"}`}
          </p>
          <p className="text-sm text-gray-500">
            Date:{" "}
            {new Date(
              investment.startDate || investment.createdAt || investment.date,
            ).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
          Investor:
        </h3>
        <p className="text-lg font-bold">{investment.partnerName}</p>
      </div>

      <table className="w-full text-left mb-8 border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-900">
            <th className="py-2 text-sm font-bold uppercase tracking-wider text-gray-600">
              Description
            </th>
            <th className="py-2 text-sm font-bold uppercase tracking-wider text-gray-600 text-right">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-200">
            <td className="py-4 text-gray-800 font-medium">
              Partner Capital Investment
            </td>
            <td className="py-4 text-right text-gray-800 font-bold">
              ৳{Number(investment.amount).toLocaleString()}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-end mb-12">
        <div className="text-right">
          <p className="text-sm text-gray-500 mb-1">Total Investment Amount</p>
          <p className="text-3xl font-black text-gray-900">
            ৳{Number(investment.amount).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="border-t pt-6 text-center text-sm text-gray-500">
        <p>
          This is an automatically generated receipt for partner capital
          investments.
        </p>
        <p>Thank you for being a valued partner of Artman.</p>
      </div>
    </div>
  );
}

function CreatePartnerModal({ onClose, onSuccess }) {
  const [addPartner, { isLoading }] = useAddPartnerMutation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPartner(formData).unwrap();
      toast.success("Partner added successfully!");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create partner");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900 dark:ring-1 dark:ring-white/10"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-zinc-100 mb-6">
          Add New Partner
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              required
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[color:rgba(124,194,46,0.35)] sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
            />
          </div>
          <div>
            <input
              required
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[color:rgba(124,194,46,0.35)] sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
            />
          </div>
          <div>
            <input
              required
              type="text"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[color:rgba(124,194,46,0.35)] sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
            />
          </div>
          <div>
            <input
              required
              type="password"
              placeholder="Password (Min 6 chars)"
              minLength={6}
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[color:rgba(124,194,46,0.35)] sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-gray-100 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="flex-1 flex items-center justify-center rounded-xl px-4 py-3 font-semibold text-white shadow-[0_18px_55px_-40px_rgba(77,140,30,0.7)] transition-all hover:brightness-[1.05] active:scale-95 disabled:opacity-70 bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function AddInvestmentModal({ partnerId, onClose, onSuccess }) {
  const [addInvest, { isLoading }] = useAddInvestmentMutation();
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0)
      return toast.error("Enter a valid investment amount");

    try {
      const reference = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      await addInvest({
        id: partnerId,
        data: { amount: Number(amount), reference },
      }).unwrap();
      toast.success("Investment added successfully!");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add investment");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900 dark:ring-1 dark:ring-white/10"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-zinc-100 mb-2">
          Increase Investment
        </h3>
        <p className="text-sm text-gray-500 dark:text-zinc-400 mb-6">
          Add additional funds to this partner's profile. Profit metrics will
          instantly adapt.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                ৳
              </span>
              <input
                type="number"
                required
                min="1"
                autoFocus
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full rounded-xl border-0 py-3 pl-8 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[color:rgba(124,194,46,0.35)] sm:text-lg sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-gray-100 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="flex-1 flex items-center justify-center rounded-xl px-4 py-3 font-semibold text-white shadow-[0_18px_55px_-40px_rgba(77,140,30,0.7)] transition-all hover:brightness-[1.05] active:scale-95 disabled:opacity-70 bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function StatCard({ title, value, icon, gradient }) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-900 dark:ring-white/10 transition-all hover:shadow-md">
      <div
        className={`absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br ${gradient} blur-2xl opacity-50 dark:opacity-30`}
      />
      <div className="relative">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-4 dark:border-gray-800">
          <div className="rounded-xl bg-gray-50 p-2 dark:bg-gray-800">
            {icon}
          </div>
          <h3 className="font-medium text-gray-500 dark:text-gray-400">
            {title}
          </h3>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {value}
          </span>
        </div>
      </div>
    </div>
  );
}

function PayoutProfitModal({ partnerId, onClose, onSuccess }) {
  const [withdrawProfit, { isLoading }] = useWithdrawPartnerProfitMutation();
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0)
      return toast.error("Enter a valid payout amount");

    try {
      await withdrawProfit({
        id: partnerId,
        data: { amount: Number(amount) },
      }).unwrap();
      toast.success("Profit paid out successfully!");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to withdraw profit");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900 dark:ring-1 dark:ring-white/10"
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-zinc-100 mb-2">
          Payout Profit
        </h3>
        <p className="text-sm text-gray-500 dark:text-zinc-400 mb-6">
          Withdraw profit for this partner. The amount will be deducted directly
          from their total profit balance.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                ৳
              </span>
              <input
                type="number"
                required
                min="1"
                autoFocus
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full rounded-xl border-0 py-3 pl-8 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[color:rgba(124,194,46,0.35)] sm:text-lg sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10"
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl bg-gray-100 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              type="submit"
              className="flex-1 flex items-center justify-center rounded-xl px-4 py-3 font-semibold text-white shadow-[0_18px_55px_-40px_rgba(77,140,30,0.7)] transition-all hover:brightness-[1.05] active:scale-95 disabled:opacity-70 bg-[linear-gradient(135deg,var(--brand-from),var(--brand-to))]"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
