import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Admin uses a completely custom layout (no shared header/footer)
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
