import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-slate-900/60 border-b border-slate-700/40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="logo" className="w-8 h-8" />
          <div>
            <h1 className="text-white font-semibold leading-none">Hostel Hub</h1>
            <p className="text-xs text-slate-400">Laundry • Attendance • Menu • Issues</p>
          </div>
        </div>
        <button className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-800/60 transition">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}
