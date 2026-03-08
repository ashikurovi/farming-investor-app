import AdminChrome from "./AdminChrome";
// import GlobalApiLoader from "./components/GlobalApiLoader";

export const metadata = {
  title: "Admin Dashboard | Framing Investor App",
};

export default function AdminLayout({ children }) {
  return (
    <AdminChrome>{children}</AdminChrome>
  );
}
