import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * App shell: sticky Navbar (in normal flow, no offset bookkeeping needed),
 * routed content slot, Footer.
 */
export default function Layout() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-foam">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
