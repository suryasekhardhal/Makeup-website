import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="bg-white text-charcoal">
      <Navbar />
      <main className="pt-24">{children}</main>
    </div>
  );
}
