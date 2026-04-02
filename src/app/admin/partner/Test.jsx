"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetPartnersQuery,
  useGetPartnerByIdQuery,
  useAddPartnerMutation,
  useAddInvestmentMutation,
  useWithdrawPartnerProfitMutation,
} from "@/features/partner/partnerApiSlice";
import { toast } from "sonner";
import {
  Loader2,
  Plus,
  Users,
  Landmark,
  Banknote,
  Shield,
  TrendingUp,
  RefreshCw,
  X,
  ArrowUpRight,
  Wallet,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Global styles ─────────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

  .ph-root {
    font-family: 'DM Sans', sans-serif;
    --g1: #4d8c1e;
    --g2: #7cc22e;
    --grad: linear-gradient(135deg, #4d8c1e, #7cc22e);
    --green-glow: rgba(124,194,46,.25);
    --surface-0: #080A06;
    --surface-1: #0E1209;
    --surface-2: #141A0D;
    --border:    rgba(124,194,46,.12);
    --border-md: rgba(124,194,46,.28);
    --text-1: #EEF5E6;
    --text-2: #8DA876;
    --text-3: #4A5E38;
    --blue:   #60A5FA;
    --amber:  #FBBF24;
    --red:    #F87171;
  }
  .ph-root * { box-sizing: border-box; }
  .ph-root::before {
    content: '';
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
  }
  .serif { font-family: 'DM Serif Display', serif; }
  .green-rule { height:1px; border:none; margin:0; background:linear-gradient(90deg,transparent,var(--g2),transparent); opacity:.35; }
  .ph-stat { position:relative; overflow:hidden; background:var(--surface-1); border:1px solid var(--border); border-radius:16px; padding:26px 26px 22px; transition:border-color .3s,transform .3s,box-shadow .3s; }
  .ph-stat:hover { border-color:var(--border-md); transform:translateY(-2px); box-shadow:0 8px 32px rgba(124,194,46,.07); }
  .ph-stat::after { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(124,194,46,.4),transparent); }
  .ph-table { width:100%; border-collapse:separate; border-spacing:0; }
  .ph-table thead th { padding:11px 20px; font-size:10.5px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; color:var(--text-3); background:var(--surface-0); border-bottom:1px solid var(--border); }
  .ph-table thead th:first-child { border-radius:12px 0 0 0; }
  .ph-table thead th:last-child  { border-radius:0 12px 0 0; }
  .ph-table tbody td { padding:17px 20px; border-bottom:1px solid var(--border); font-size:14px; color:var(--text-2); transition:background .15s; }
  .ph-table tbody tr:last-child td { border-bottom:none; }
  .ph-table tbody tr:hover td { background:rgba(124,194,46,.04); }
  .ph-badge { display:inline-flex; align-items:center; padding:3px 10px; border-radius:999px; font-size:11px; font-weight:700; letter-spacing:.05em; background:rgba(124,194,46,.1); color:var(--g2); border:1px solid rgba(124,194,46,.22); }
  .ph-btn-fund { display:inline-flex; align-items:center; gap:4px; padding:5px 13px; border-radius:999px; font-size:12px; font-weight:600; background:rgba(96,165,250,.08); border:1px solid rgba(96,165,250,.25); color:var(--blue); cursor:pointer; transition:background .18s; }
  .ph-btn-fund:hover { background:rgba(96,165,250,.18); }
  .ph-btn-pay { display:inline-flex; align-items:center; gap:4px; padding:5px 13px; border-radius:999px; font-size:12px; font-weight:600; background:rgba(124,194,46,.08); border:1px solid rgba(124,194,46,.25); color:var(--g2); cursor:pointer; transition:background .18s; }
  .ph-btn-pay:hover { background:rgba(124,194,46,.18); }
  .ph-btn-primary { display:inline-flex; align-items:center; gap:6px; padding:10px 22px; border-radius:10px; background:var(--grad); color:#fff; font-weight:700; font-size:14px; border:none; cursor:pointer; transition:opacity .2s,transform .2s; letter-spacing:.01em; font-family:'DM Sans',sans-serif; box-shadow:0 4px 18px rgba(77,140,30,.35); }
  .ph-btn-primary:hover { opacity:.88; transform:translateY(-1px); }
  .ph-input { width:100%; background:var(--surface-0); border:1px solid var(--border); border-radius:10px; color:var(--text-1); outline:none; transition:border-color .2s; font-family:'DM Sans',sans-serif; }
  .ph-access { display:flex; align-items:center; justify-content:center; min-height:300px; background:var(--surface-1); border:1px solid rgba(248,113,113,.16); border-radius:20px; }
  .ph-guideline { background:var(--surface-1); border:1px solid var(--border); border-radius:16px; padding:30px 34px; position:relative; overflow:hidden; }
  .ph-guideline::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:var(--grad); opacity:.45; }
`;

/* ════════════════════════════════════════════════════════════════════════════════
   ROOT
═══════════════════════════════════════════════════════════════════════════════ */
export default function PartnerPage() {
  const user = useSelector((state) => state.auth?.user);

  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
          background: "#080A06",
        }}
      >
        <Loader2
          size={28}
          style={{ color: "#7cc22e", animation: "spin 1s linear infinite" }}
        />
      </div>
    );
  }

  return (
    <>
      <style>{CSS}</style>
      <div
        className="ph-root"
        style={{
          minHeight: "100vh",
          background: "var(--surface-0)",
          padding: "48px 32px 80px",
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <header
            style={{
              marginBottom: 52,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <div>
              <p
                style={{
                  fontSize: 10.5,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--text-3)",
                  marginBottom: 10,
                  fontWeight: 700,
                }}
              >
                INVESTMENT PLATFORM
              </p>
              <h1
                className="serif"
                style={{
                  fontSize: 44,
                  color: "var(--text-1)",
                  margin: 0,
                  lineHeight: 1,
                  fontWeight: 400,
                }}
              >
                Partner Hub
              </h1>
              <p
                style={{ marginTop: 11, fontSize: 14, color: "var(--text-3)" }}
              >
                Manage investments · Track performance · Profit distribution
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "9px 18px",
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                borderRadius: 999,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--grad)",
                  boxShadow: "0 0 8px var(--green-glow)",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  color: "var(--text-2)",
                  textTransform: "capitalize",
                }}
              >
                {user?.role}
              </span>
              <Shield size={13} style={{ color: "var(--text-3)" }} />
            </div>
          </header>

          <hr className="green-rule" style={{ marginBottom: 48 }} />

          {user.role === "admin" ? (
            <AdminPartnerDashboard />
          ) : user.role === "partner" ? (
            <PartnerDashboard userId={user.id} />
          ) : (
            <div className="ph-access">
              <div style={{ textAlign: "center" }}>
                <Shield
                  size={28}
                  style={{ color: "var(--red)", marginBottom: 12 }}
                />
                <p
                  className="serif"
                  style={{
                    fontSize: 22,
                    color: "var(--text-1)",
                    margin: "0 0 8px",
                  }}
                >
                  Access Denied
                </p>
                <p style={{ fontSize: 14, color: "var(--text-3)" }}>
                  You don't have permission to view this page.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════════════════
   PARTNER DASHBOARD
═══════════════════════════════════════════════════════════════════════════════ */
function PartnerDashboard({ userId }) {
  const {
    data: partnerInfo,
    isLoading,
    refetch,
    isFetching,
  } = useGetPartnerByIdQuery(userId);

  if (isLoading) return <LoadingPane />;
  if (!partnerInfo) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <p
          className="serif"
          style={{
            fontSize: 22,
            color: "var(--text-1)",
            margin: 0,
            fontWeight: 400,
          }}
        >
          Portfolio Overview
        </p>
        <button
          onClick={refetch}
          style={{
            background: "none",
            border: "1px solid var(--border)",
            cursor: "pointer",
            color: "var(--text-3)",
            padding: "6px 8px",
            borderRadius: 8,
            display: "flex",
            transition: "all .2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border-md)";
            e.currentTarget.style.color = "var(--g2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-3)";
          }}
        >
          <RefreshCw size={15} className={isFetching ? "animate-spin" : ""} />
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: 18,
          marginBottom: 36,
        }}
      >
        <StatCard
          title="Total Investment"
          value={`৳${Number(partnerInfo.totalInvestment || 0).toLocaleString()}`}
          icon={<Landmark size={17} style={{ color: "var(--blue)" }} />}
          accent="96,165,250"
          tag="Pool"
        />
        <StatCard
          title="Total Profit"
          value={`৳${Number(partnerInfo.totalProfit || 0).toLocaleString()}`}
          icon={<TrendingUp size={17} style={{ color: "var(--g2)" }} />}
          accent="124,194,46"
          tag="Cumulative"
          grad
        />
        <StatCard
          title="Available Balance"
          value={`৳${Number(partnerInfo.balance || 0).toLocaleString()}`}
          icon={<Wallet size={17} style={{ color: "var(--amber)" }} />}
          accent="251,191,36"
          tag="Withdrawable"
        />
      </div>

      <div className="ph-guideline">
        <p
          style={{
            fontSize: 10.5,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--text-3)",
            marginBottom: 14,
            fontWeight: 700,
          }}
        >
          Investment Guidelines
        </p>
        <p
          style={{
            fontSize: 14,
            color: "var(--text-2)",
            lineHeight: 1.78,
            maxWidth: 640,
            margin: 0,
          }}
        >
          Profit distribution is automatically calculated based on your total
          investment relative to the total partner investment pool. All
          distributions happen dynamically as generated from system-wide
          commissions. To increase your investment and profit share, please
          contact administrators.
        </p>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════════
   ADMIN DASHBOARD
═══════════════════════════════════════════════════════════════════════════════ */
function AdminPartnerDashboard() {
  const { data: partners, isLoading, refetch } = useGetPartnersQuery();
  const [activePartnerId, setActivePartnerId] = useState(null);
  const [payoutPartnerId, setPayoutPartnerId] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (isLoading) return <LoadingPane />;

  const totalPool =
    partners?.reduce((a, p) => a + Number(p.totalInvestment), 0) || 0;
  const totalProfit =
    partners?.reduce((a, p) => a + Number(p.totalProfit), 0) || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ display: "flex", flexDirection: "column", gap: 28 }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))",
          gap: 18,
        }}
      >
        <StatCard
          title="Total Partners"
          value={partners?.length || 0}
          icon={<Users size={17} style={{ color: "var(--g2)" }} />}
          accent="124,194,46"
          grad
        />
        <StatCard
          title="Investment Pool"
          value={`৳${totalPool.toLocaleString()}`}
          icon={<Landmark size={17} style={{ color: "var(--blue)" }} />}
          accent="96,165,250"
        />
        <StatCard
          title="Total Profits"
          value={`৳${totalProfit.toLocaleString()}`}
          icon={<TrendingUp size={17} style={{ color: "var(--amber)" }} />}
          accent="251,191,36"
        />
      </div>

      <div
        style={{
          background: "var(--surface-1)",
          border: "1px solid var(--border)",
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "22px 26px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Users size={15} style={{ color: "var(--g2)" }} />
            <span
              className="serif"
              style={{ fontSize: 20, color: "var(--text-1)", fontWeight: 400 }}
            >
              Partner Directory
            </span>
            {partners?.length > 0 && (
              <span
                className="ph-badge"
                style={{ padding: "2px 9px", fontSize: 11 }}
              >
                {partners.length}
              </span>
            )}
          </div>
          <button
            className="ph-btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={14} /> Add Partner
          </button>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="ph-table">
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Identifier</th>
                <th style={{ textAlign: "right" }}>Investment</th>
                <th style={{ textAlign: "right" }}>Share</th>
                <th style={{ textAlign: "right" }}>Profit</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {partners?.map((p, i) => {
                const share =
                  totalPool > 0
                    ? ((Number(p.totalInvestment) / totalPool) * 100).toFixed(2)
                    : "0.00";
                return (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <td>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 13,
                        }}
                      >
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            flexShrink: 0,
                            background:
                              "linear-gradient(135deg,#1C2412,#253016)",
                            border: "1px solid var(--border-md)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 13,
                            fontWeight: 700,
                            color: "var(--g2)",
                          }}
                        >
                          {p.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div
                            style={{
                              fontWeight: 600,
                              color: "var(--text-1)",
                              fontSize: 14,
                            }}
                          >
                            {p.name}
                          </div>
                          <div style={{ fontSize: 12, color: "var(--text-3)" }}>
                            {p.email || p.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        fontWeight: 600,
                        color: "var(--blue)",
                      }}
                    >
                      ৳{Number(p.totalInvestment).toLocaleString()}
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <span className="ph-badge">{share}%</span>
                    </td>
                    <td
                      style={{
                        textAlign: "right",
                        fontWeight: 600,
                        color: "var(--g2)",
                      }}
                    >
                      ৳{Number(p.totalProfit).toLocaleString()}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 8,
                        }}
                      >
                        <button
                          className="ph-btn-fund"
                          onClick={() => setActivePartnerId(p.id)}
                        >
                          <Plus size={11} /> Fund
                        </button>
                        <button
                          className="ph-btn-pay"
                          onClick={() => setPayoutPartnerId(p.id)}
                        >
                          <Banknote size={11} /> Payout
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
              {!partners?.length && (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      textAlign: "center",
                      padding: "56px 20px",
                      color: "var(--text-3)",
                      fontSize: 14,
                    }}
                  >
                    No partners registered yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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

/* ════════════════════════════════════════════════════════════════════════════════
   STAT CARD
═══════════════════════════════════════════════════════════════════════════════ */
function StatCard({ title, value, icon, accent, tag, grad }) {
  return (
    <div className="ph-stat">
      <div
        style={{
          position: "absolute",
          right: -20,
          top: -20,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: grad
            ? "radial-gradient(circle,rgba(124,194,46,.18) 0%,transparent 70%)"
            : `radial-gradient(circle,rgba(${accent},.14) 0%,transparent 70%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 18,
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: grad ? "rgba(124,194,46,.12)" : `rgba(${accent},.1)`,
            border: `1px solid ${grad ? "rgba(124,194,46,.22)" : `rgba(${accent},.2)`}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
        {tag && (
          <span
            style={{ fontSize: 11, color: "var(--text-3)", fontWeight: 500 }}
          >
            {tag}
          </span>
        )}
      </div>
      <p
        style={{
          fontSize: 11,
          color: "var(--text-3)",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          margin: "0 0 8px",
        }}
      >
        {title}
      </p>
      <p
        className="serif"
        style={{ fontSize: 28, color: "var(--text-1)", margin: 0 }}
      >
        {value}
      </p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════════
   MODAL SHELL
═══════════════════════════════════════════════════════════════════════════════ */
function ModalShell({ onClose, children }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(4,6,3,.82)",
          backdropFilter: "blur(10px)",
        }}
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 420,
          background: "var(--surface-1)",
          border: "1px solid var(--border-md)",
          borderRadius: 20,
          padding: "36px 34px 30px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "var(--grad)",
            opacity: 0.55,
          }}
        />
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "1px solid var(--border)",
            borderRadius: 8,
            color: "var(--text-3)",
            cursor: "pointer",
            padding: 5,
            display: "flex",
            transition: "all .2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--border-md)";
            e.currentTarget.style.color = "var(--g2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.color = "var(--text-3)";
          }}
        >
          <X size={13} />
        </button>
        {children}
      </motion.div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════════
   CREATE PARTNER MODAL
═══════════════════════════════════════════════════════════════════════════════ */
function CreatePartnerModal({ onClose, onSuccess }) {
  const [addPartner, { isLoading }] = useAddPartnerMutation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPartner(form).unwrap();
      toast.success("Partner registered successfully.");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create partner.");
    }
  };

  const inputBase = {
    width: "100%",
    padding: "12px 14px",
    background: "var(--surface-0)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    color: "var(--text-1)",
    fontSize: 14,
    outline: "none",
    fontFamily: "'DM Sans',sans-serif",
    transition: "border-color .2s",
  };

  const fields = [
    { key: "name", label: "Full Name", type: "text" },
    { key: "email", label: "Email Address", type: "email" },
    { key: "phone", label: "Phone Number", type: "text" },
    {
      key: "password",
      label: "Password (min. 6 chars)",
      type: "password",
      minLength: 6,
    },
  ];

  return (
    <ModalShell onClose={onClose}>
      <p
        style={{
          fontSize: 10.5,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--text-3)",
          marginBottom: 8,
          fontWeight: 700,
        }}
      >
        New Registration
      </p>
      <h3
        className="serif"
        style={{
          fontSize: 26,
          color: "var(--text-1)",
          margin: "0 0 26px",
          fontWeight: 400,
        }}
      >
        Add Partner
      </h3>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 12 }}
      >
        {fields.map(({ key, label, type, minLength }) => (
          <input
            key={key}
            required
            type={type}
            placeholder={label}
            minLength={minLength}
            value={form[key]}
            onChange={set(key)}
            style={inputBase}
            onFocus={(e) => {
              e.target.style.borderColor = "rgba(124,194,46,.35)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--border)";
            }}
          />
        ))}
        <ModalActions
          onClose={onClose}
          isLoading={isLoading}
          label="Register"
        />
      </form>
    </ModalShell>
  );
}

/* ════════════════════════════════════════════════════════════════════════════════
   ADD INVESTMENT MODAL
═══════════════════════════════════════════════════════════════════════════════ */
function AddInvestmentModal({ partnerId, onClose, onSuccess }) {
  const [addInvest, { isLoading }] = useAddInvestmentMutation();
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0)
      return toast.error("Enter a valid amount.");
    try {
      await addInvest({
        id: partnerId,
        data: { amount: Number(amount) },
      }).unwrap();
      toast.success("Investment added successfully.");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add investment.");
    }
  };

  return (
    <ModalShell onClose={onClose}>
      <p
        style={{
          fontSize: 10.5,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(96,165,250,.6)",
          marginBottom: 8,
          fontWeight: 700,
        }}
      >
        Capital Injection
      </p>
      <h3
        className="serif"
        style={{
          fontSize: 26,
          color: "var(--text-1)",
          margin: "0 0 6px",
          fontWeight: 400,
        }}
      >
        Increase Investment
      </h3>
      <p style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 26 }}>
        Profit share recalculates instantly upon confirmation.
      </p>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 14 }}
      >
        <AmountInput
          value={amount}
          onChange={setAmount}
          color="var(--blue)"
          focusColor="rgba(96,165,250,.35)"
        />
        <ModalActions
          onClose={onClose}
          isLoading={isLoading}
          label="Confirm"
          btnBg="linear-gradient(135deg,#3B82F6,#60A5FA)"
        />
      </form>
    </ModalShell>
  );
}

/* ════════════════════════════════════════════════════════════════════════════════
   PAYOUT MODAL
═══════════════════════════════════════════════════════════════════════════════ */
function PayoutProfitModal({ partnerId, onClose, onSuccess }) {
  const [withdrawProfit, { isLoading }] = useWithdrawPartnerProfitMutation();
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0)
      return toast.error("Enter a valid amount.");
    try {
      await withdrawProfit({
        id: partnerId,
        data: { amount: Number(amount) },
      }).unwrap();
      toast.success("Profit paid out successfully.");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to withdraw profit.");
    }
  };

  return (
    <ModalShell onClose={onClose}>
      <p
        style={{
          fontSize: 10.5,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(124,194,46,.6)",
          marginBottom: 8,
          fontWeight: 700,
        }}
      >
        Profit Withdrawal
      </p>
      <h3
        className="serif"
        style={{
          fontSize: 26,
          color: "var(--text-1)",
          margin: "0 0 6px",
          fontWeight: 400,
        }}
      >
        Payout Profit
      </h3>
      <p style={{ fontSize: 13, color: "var(--text-3)", marginBottom: 26 }}>
        Amount will be deducted from this partner's profit balance.
      </p>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 14 }}
      >
        <AmountInput
          value={amount}
          onChange={setAmount}
          color="var(--g2)"
          focusColor="rgba(124,194,46,.35)"
        />
        <ModalActions
          onClose={onClose}
          isLoading={isLoading}
          label="Confirm Payout"
          btnBg="var(--grad)"
        />
      </form>
    </ModalShell>
  );
}

/* ─── Shared primitives ──────────────────────────────────────────────────────── */
function AmountInput({ value, onChange, color, focusColor }) {
  return (
    <div style={{ position: "relative" }}>
      <span
        style={{
          position: "absolute",
          left: 14,
          top: "50%",
          transform: "translateY(-50%)",
          color,
          fontSize: 19,
          fontWeight: 600,
          pointerEvents: "none",
        }}
      >
        ৳
      </span>
      <input
        type="number"
        required
        min="1"
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0.00"
        style={{
          width: "100%",
          padding: "15px 14px 15px 36px",
          background: "var(--surface-0)",
          border: "1px solid var(--border)",
          borderRadius: 10,
          color: "var(--text-1)",
          fontSize: 22,
          fontWeight: 500,
          outline: "none",
          fontFamily: "'DM Sans',sans-serif",
          transition: "border-color .2s",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = focusColor;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--border)";
        }}
      />
    </div>
  );
}

function ModalActions({ onClose, isLoading, label, btnBg = "var(--grad)" }) {
  return (
    <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
      <button
        type="button"
        onClick={onClose}
        style={{
          flex: 1,
          padding: "12px",
          borderRadius: 10,
          background: "var(--surface-0)",
          border: "1px solid var(--border)",
          color: "var(--text-2)",
          fontWeight: 600,
          fontSize: 14,
          cursor: "pointer",
          fontFamily: "'DM Sans',sans-serif",
        }}
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isLoading}
        style={{
          flex: 1,
          padding: "12px",
          borderRadius: 10,
          background: btnBg,
          color: "#fff",
          fontWeight: 700,
          fontSize: 14,
          cursor: isLoading ? "not-allowed" : "pointer",
          border: "none",
          opacity: isLoading ? 0.7 : 1,
          fontFamily: "'DM Sans',sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          boxShadow: "0 4px 14px rgba(77,140,30,.3)",
          transition: "opacity .2s",
        }}
      >
        {isLoading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <>
            <ArrowUpRight size={14} /> {label}
          </>
        )}
      </button>
    </div>
  );
}

function LoadingPane() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 280,
        background: "var(--surface-1)",
        border: "1px solid var(--border)",
        borderRadius: 20,
      }}
    >
      <Loader2
        size={28}
        style={{ color: "var(--g2)", animation: "spin 1s linear infinite" }}
      />
    </div>
  );
}
