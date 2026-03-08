 "use client";
 
  import { useState } from "react";
 import Image from "next/image";
 import { Eye } from "lucide-react";
 import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
 import { DataTable } from "@/components/ui/data-table";
 import { Pagination } from "@/components/ui/pagination";
 import { Modal } from "@/components/ui/modal";
 import { Button } from "@/components/ui/button";
 import { useMeQuery } from "@/features/auth/authApiSlice";
 import { useGetMyInvestmentsQuery } from "@/features/investor/investments/investmentsApiSlice";
 
 const cleanUrl = (u) => {
   if (typeof u !== "string") return "";
   return u.replace(/[`"'()]/g, "").trim();
 };
 import { formatCurrencyBDT } from "@/lib/utils";
 
 const PAGE_SIZE = 10;
 
 export default function MyInvestmentsPage() {
   const { data: meResponse, isLoading, isError } = useMeQuery();
   const user = meResponse?.data ?? meResponse ?? null;
 
   const photo = cleanUrl(user?.photoUrl || "");
 
   const [page, setPage] = useState(1);
   const [pageSize, setPageSize] = useState(PAGE_SIZE);
   const {
     data: myInvestments,
     isLoading: isInvLoading,
     isFetching: isInvFetching,
     isError: isInvError,
   } = useGetMyInvestmentsQuery({ page, limit: pageSize });
 
   const investments = myInvestments?.items ?? [];
   const meta =
     myInvestments?.meta ?? {
       page,
       pageCount: 1,
       total: investments.length,
     };
   const isInvestmentsBusy = isInvLoading || isInvFetching;
 
   const [detailOpen, setDetailOpen] = useState(false);
   const [selectedInvestment, setSelectedInvestment] = useState(null);
   const openDetail = (row) => {
     setSelectedInvestment(row);
     setDetailOpen(true);
   };
   const closeDetail = () => {
     setDetailOpen(false);
     setSelectedInvestment(null);
   };
 
   return (
     <main className="min-h-screen space-y-6 bg-zinc-50/60 p-4 sm:p-6">
       <header>
         <h1 className="text-xl font-semibold tracking-tight text-zinc-900">My Investments</h1>
         <p className="text-sm text-zinc-500">Your profile and investment summary.</p>
       </header>
 
       <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
         <Card className="sm:col-span-2">
           <CardHeader>
             <CardTitle>Profile</CardTitle>
             <CardDescription>Your account overview from /users/me</CardDescription>
           </CardHeader>
           <CardContent>
             {isLoading ? (
               <div className="flex items-center gap-4">
                 <div className="h-16 w-16 animate-pulse rounded-full bg-zinc-200/80" />
                 <div className="space-y-2">
                   <div className="h-4 w-48 animate-pulse rounded bg-zinc-200/80" />
                   <div className="h-3 w-64 animate-pulse rounded bg-zinc-200/70" />
                 </div>
               </div>
             ) : isError ? (
               <p className="text-sm text-red-600">Failed to load profile.</p>
             ) : user ? (
               <div className="flex items-center gap-4">
                 <div className="relative h-16 w-16 overflow-hidden rounded-full border border-zinc-200 bg-white">
                   {photo ? (
                     <Image
                       src={photo}
                       alt={user.name ?? "Profile photo"}
                       fill
                       sizes="64px"
                       className="object-cover"
                       priority
                     />
                   ) : (
                     <div className="flex h-full w-full items-center justify-center bg-zinc-100 text-sm font-medium text-zinc-500">
                       {user?.name?.[0]?.toUpperCase() ?? "U"}
                     </div>
                   )}
                 </div>
 
                 <div className="min-w-0">
                   <div className="truncate text-base font-semibold text-zinc-900">
                     {user.name || "-"}
                   </div>
                   <div className="truncate text-sm text-zinc-600">{user.email || "-"}</div>
                   <div className="truncate text-sm text-zinc-600">{user.phone || "-"}</div>
                   <div className="truncate text-sm text-zinc-600">
                     {user.location || "No location set"}
                   </div>
                 </div>
               </div>
             ) : (
               <p className="text-sm text-zinc-500">No user data.</p>
             )}
           </CardContent>
         </Card>
 
         <Card>
           <CardHeader>
             <CardTitle className="text-sm">Totals</CardTitle>
             <CardDescription>Summary amounts (BDT)</CardDescription>
           </CardHeader>
           <CardContent>
             {isLoading ? (
               <div className="space-y-3">
                 <div className="h-4 w-40 animate-pulse rounded bg-zinc-200/80" />
                 <div className="h-4 w-32 animate-pulse rounded bg-zinc-200/80" />
                 <div className="h-4 w-36 animate-pulse rounded bg-zinc-200/80" />
                 <div className="h-4 w-28 animate-pulse rounded bg-zinc-200/80" />
               </div>
             ) : isError ? (
               <p className="text-sm text-red-600">Failed to load totals.</p>
             ) : (
               <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                 <dt className="text-zinc-500">Total Investment</dt>
                 <dd className="text-right font-medium text-zinc-900">
                   {formatCurrencyBDT(user?.totalInvestment)}
                 </dd>
                 <dt className="text-zinc-500">Total Profit</dt>
                 <dd className="text-right font-medium text-emerald-700">
                   {formatCurrencyBDT(user?.totalProfit)}
                 </dd>
                 <dt className="text-zinc-500">Balance</dt>
                 <dd className="text-right font-medium text-blue-700">
                   {formatCurrencyBDT(user?.balance)}
                 </dd>
                 <dt className="text-zinc-500">Total Cost</dt>
                 <dd className="text-right font-medium text-zinc-900">
                   {formatCurrencyBDT(user?.totalCost)}
                 </dd>
               </dl>
             )}
           </CardContent>
         </Card>
       </section>
 
       <section className="grid gap-4">
         <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
           <div className="mb-4 flex items-center justify-between">
             <h2 className="text-sm font-semibold text-zinc-900">All Investments</h2>
           </div>
 
           <DataTable
             columns={[
               {
                 key: "sl",
                 header: "SL",
                 tdClassName:
                   "whitespace-nowrap px-4 py-3 text-sm text-zinc-500",
                 cell: (row) =>
                   investments.findIndex((i) => i.id === row.id) + 1,
               },
               {
                 key: "amount",
                 header: "Amount (BDT)",
                 tdClassName:
                   "whitespace-nowrap px-4 py-3 text-sm text-zinc-700",
                cell: (row) => formatCurrencyBDT(row?.amount),
               },
               {
                 key: "date",
                 header: "Date",
                 tdClassName:
                   "whitespace-nowrap px-4 py-3 text-xs text-zinc-600",
                 cell: (row) => row?.date ?? "-",
               },
               {
                 key: "time",
                 header: "Time",
                 tdClassName:
                   "whitespace-nowrap px-4 py-3 text-xs text-zinc-600",
                 cell: (row) => row?.time ?? "-",
               },
               {
                 key: "reference",
                 header: "Reference",
                 tdClassName:
                   "whitespace-nowrap px-4 py-3 text-xs text-zinc-600",
                 cell: (row) => row?.reference ?? "-",
               },
             ]}
             data={investments}
             isLoading={isInvestmentsBusy}
             emptyMessage={isInvError ? "Investments load korte parini." : "Kono investment nai."}
             loadingLabel="Investments load hocche..."
             getRowKey={(row) => row.id}
             renderActions={(row) => (
               <button
                 type="button"
                 onClick={() => openDetail(row)}
                 className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
               >
                 <Eye className="h-3.5 w-3.5" />
               </button>
             )}
           />
 
           <div className="mt-3">
             <Pagination
               page={meta.page}
               pageCount={meta.pageCount}
               total={meta.total}
               pageSize={pageSize}
               onPageChange={(newPage) =>
                 setPage((current) =>
                   newPage < 1
                     ? 1
                     : meta.pageCount
                     ? Math.min(meta.pageCount, newPage)
                     : newPage,
                 )
               }
               onPageSizeChange={(newSize) => {
                 setPageSize(newSize);
                 setPage(1);
               }}
             />
           </div>
         </div>
       </section>
 
       <Modal
         isOpen={detailOpen}
         onClose={closeDetail}
         title="Investment details"
         size="md"
         footer={
           <div className="flex items-center justify-end">
             <Button
               type="button"
               variant="outline"
               onClick={closeDetail}
               className="h-8 rounded-full text-xs"
             >
               Close
             </Button>
           </div>
         }
       >
         {selectedInvestment ? (
           <>
             <div className="mb-4 flex items-center gap-3">
               <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-emerald-50 ring-1 ring-emerald-100">
                 {cleanUrl(selectedInvestment.photoUrl) ? (
                   <Image
                     src={cleanUrl(selectedInvestment.photoUrl)}
                     alt="Investment photo"
                     fill
                     sizes="64px"
                     className="object-cover"
                   />
                 ) : (
                   <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-emerald-700">
                     INV
                   </div>
                 )}
               </div>
               <div>
                <h3 className="text-base font-semibold text-zinc-900">
                  {formatCurrencyBDT(selectedInvestment.amount)}
                </h3>
                 <p className="text-xs text-zinc-500">
                   {selectedInvestment.date || "-"} {selectedInvestment.time || ""}
                 </p>
               </div>
             </div>
 
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-zinc-900">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Amount
                </p>
                <p>{formatCurrencyBDT(selectedInvestment.amount)}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Reference
                </p>
                <p>{selectedInvestment.reference || "-"}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Date
                </p>
                <p>{selectedInvestment.date || "-"}</p>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Time
                </p>
                <p>{selectedInvestment.time || "-"}</p>
              </div>
            </div>
           </>
         ) : (
           <div className="flex h-24 items-center justify-center text-sm text-zinc-500">
             Kono investment select kora hoyni.
           </div>
         )}
       </Modal>
     </main>
   );
 }
 
