"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetPartnersQuery, useGetPartnerByIdQuery, useDistributeCommissionMutation, useAddPartnerMutation, useAddInvestmentMutation } from "@/features/partner/partnerApiSlice";
import { toast } from "sonner";
import { Loader2, Plus, Users, Landmark, Banknote, Shield, Briefcase, Activity, TrendingUp, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PartnerPage() {
  const user = useSelector((state) => state.auth?.user);

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 lg:p-10 dark:bg-gray-950 font-sans">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Partner Hub
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Manage investments, track performance, and view profit distribution.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-900 dark:ring-white/10">
            <Shield className="h-5 w-5 text-indigo-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{user?.role}</span>
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
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">Access Denied</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
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
  const { data: partnerInfo, isLoading, refetch, isFetching } = useGetPartnerByIdQuery(userId);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl bg-white/50 backdrop-blur shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-900/50">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
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
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-indigo-500" /> My Portfolio Overview
        </h2>
        <button 
          onClick={refetch}
          className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
        >
          <RefreshCw className={`h-5 w-5 ${isFetching ? "animate-spin" : ""}`} />
        </button>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Investment"
          value={`৳${Number(partnerInfo.totalInvestment || 0).toLocaleString()}`}
          icon={<Landmark className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
          gradient="from-blue-500/20 to-cyan-500/20"
        />
        <StatCard
          title="Total Profit"
          value={`৳${Number(partnerInfo.totalProfit || 0).toLocaleString()}`}
          icon={<TrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />}
          gradient="from-emerald-500/20 to-teal-500/20"
        />
        <StatCard
          title="Available Balance"
          value={`৳${Number(partnerInfo.balance || 0).toLocaleString()}`}
          icon={<Banknote className="h-6 w-6 text-amber-600 dark:text-amber-400" />}
          gradient="from-amber-500/20 to-orange-500/20"
        />
      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-900 dark:ring-white/10">
         <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Investment Guidelines</h3>
         <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
           Your profit distribution is automatically calculated based on your total investment relative to the total partner investment pool. All distributions happen dynamically as generated from system-wide commissions. If you wish to increase your investment and profit share, please contact the administrators.
         </p>
      </div>
    </motion.div>
  );
}

function AdminPartnerDashboard() {
  const { data: partners, isLoading, refetch } = useGetPartnersQuery();
  const [distributeTask, { isLoading: isDistributing }] = useDistributeCommissionMutation();
  const [distAmount, setDistAmount] = useState("");

  const [activePartnerId, setActivePartnerId] = useState(null);

  const handleDistribute = async (e) => {
    e.preventDefault();
    if (!distAmount || Number(distAmount) <= 0) return toast.error("Enter a valid amount");

    try {
      await distributeTask({ amount: Number(distAmount) }).unwrap();
      toast.success("Commission distributed successfully!");
      setDistAmount("");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to distribute commission");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl bg-white/50 backdrop-blur shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-900/50">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  const totalPool = partners?.reduce((acc, curr) => acc + Number(curr.totalInvestment), 0) || 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="grid gap-6 lg:grid-cols-3">
         <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-900 dark:ring-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-500" /> Partner Directory
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
                <thead className="bg-gray-50 text-gray-900 dark:bg-gray-800/50 dark:text-white">
                  <tr>
                    <th className="rounded-tl-lg px-4 py-3 font-medium">Name & Identity</th>
                    <th className="px-4 py-3 font-medium text-right">Investment</th>
                    <th className="px-4 py-3 font-medium text-right">Share %</th>
                    <th className="px-4 py-3 font-medium text-right">Profit</th>
                    <th className="rounded-tr-lg px-4 py-3 font-medium text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {partners?.map((p) => {
                    const share = totalPool > 0 ? ((Number(p.totalInvestment) / totalPool) * 100).toFixed(2) : 0;
                    return (
                      <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors">
                        <td className="px-4 py-4">
                          <div className="font-medium text-gray-900 dark:text-white">{p.name}</div>
                          <div className="text-xs text-gray-500">{p.email || p.phone}</div>
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
                          <button
                            onClick={() => setActivePartnerId(p.id)}
                            className="inline-flex items-center gap-1 rounded bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20 transition-colors"
                          >
                            <Plus className="h-3 w-3" /> Add Fund
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {!partners?.length && (
                    <tr>
                      <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                        No partners found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
         </div>

         <div className="space-y-6">
            <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white shadow-lg shadow-indigo-500/20">
               <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                 <Activity className="h-5 w-5 text-indigo-100" /> Distribute Commission
               </h3>
               <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                 Generate commission relative to individual investment portions dynamically. Total Pool: ৳{totalPool.toLocaleString()}
               </p>

               <form onSubmit={handleDistribute} className="space-y-4">
                 <div>
                   <label className="sr-only">Amount to distribute</label>
                   <div className="relative">
                     <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-200">৳</span>
                     <input
                       type="number"
                       min="0.01"
                       step="0.01"
                       value={distAmount}
                       onChange={(e) => setDistAmount(e.target.value)}
                       className="block w-full rounded-xl border-0 bg-white/10 py-3 pl-8 pr-4 text-white placeholder:text-indigo-200 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm sm:text-sm"
                       placeholder="Enter amount..."
                     />
                   </div>
                 </div>
                 <button
                   disabled={isDistributing}
                   type="submit"
                   className="w-full flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all disabled:opacity-70"
                 >
                   {isDistributing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Distribute Profit"}
                 </button>
               </form>
            </div>

            <CreatePartnerForm onCreated={refetch} />
         </div>
      </div>

      <AnimatePresence>
        {activePartnerId && (
          <AddInvestmentModal 
            partnerId={activePartnerId} 
            onClose={() => setActivePartnerId(null)} 
            onSuccess={refetch}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CreatePartnerForm({ onCreated }) {
  const [addPartner, { isLoading }] = useAddPartnerMutation();
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPartner(formData).unwrap();
      toast.success("Partner added successfully!");
      setFormData({ name: "", email: "", phone: "", password: "" });
      onCreated();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create partner");
    }
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 dark:bg-gray-900 dark:ring-white/10">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Add New Partner</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input required type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10" />
        </div>
        <div>
          <input required type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10" />
        </div>
        <div>
          <input required type="text" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10" />
        </div>
        <div>
          <input required type="password" placeholder="Password (Min 6 chars)" minLength={6} value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10" />
        </div>
        <button disabled={isLoading} type="submit" className="w-full flex items-center justify-center rounded-lg bg-gray-900 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 disabled:opacity-70 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Register Partner"}
        </button>
      </form>
    </div>
  );
}

function AddInvestmentModal({ partnerId, onClose, onSuccess }) {
  const [addInvest, { isLoading }] = useAddInvestmentMutation();
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return toast.error("Enter a valid investment amount");

    try {
      await addInvest({ id: partnerId, data: { amount: Number(amount) } }).unwrap();
      toast.success("Investment added successfully!");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add investment");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900 dark:ring-1 dark:ring-white/10">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Increase Investment</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Add additional funds to this partner's profile. Profit metrics will instantly adapt.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">৳</span>
              <input type="number" required min="1" autoFocus value={amount} onChange={(e) => setAmount(e.target.value)} className="block w-full rounded-xl border-0 py-3 pl-8 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6 dark:bg-white/5 dark:text-white dark:ring-white/10" placeholder="0.00" />
            </div>
          </div>
          <div className="flex gap-3">
             <button type="button" onClick={onClose} className="flex-1 rounded-xl bg-gray-100 px-4 py-3 font-semibold text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">Cancel</button>
             <button disabled={isLoading} type="submit" className="flex-1 flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-70 transition-colors">
               {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Confirm"}
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
      <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br ${gradient} blur-2xl opacity-50 dark:opacity-30`} />
      <div className="relative">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-4 dark:border-gray-800">
          <div className="rounded-xl bg-gray-50 p-2 dark:bg-gray-800">
            {icon}
          </div>
          <h3 className="font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        </div>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{value}</span>
        </div>
      </div>
    </div>
  );
}
