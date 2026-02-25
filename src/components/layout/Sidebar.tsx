import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Cloud,
  CalendarDays,
  History,
  Waves,
  LayoutDashboard,
  Settings,
  MapPin,
} from 'lucide-react';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { path: '/current', label: 'Current Weather', icon: <Cloud size={20} /> },
  { path: '/forecast', label: 'Forecast', icon: <CalendarDays size={20} /> },
  { path: '/historical', label: 'Historical', icon: <History size={20} /> },
  { path: '/marine', label: 'Marine', icon: <Waves size={20} /> },
];

export function Sidebar() {
  return (
    <aside className="w-64 h-screen fixed left-0 top-0 z-50">
      <div className="h-full bg-white/[0.05] backdrop-blur-[20px] border-r border-white/[0.1] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/[0.1]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-cyan to-accent-teal flex items-center justify-center">
              <Cloud className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">WeatherCast</h1>
              <p className="text-xs text-white/50">Pro</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-300
                ${isActive 
                  ? 'bg-gradient-to-r from-accent-cyan/20 to-accent-teal/20 border border-accent-cyan/30 text-white' 
                  : 'text-white/60 hover:bg-white/[0.08] hover:text-white'
                }
              `}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.1]">
          <div className="glass p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent-violet/20 flex items-center justify-center">
                <MapPin size={16} className="text-accent-violet" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Location</p>
                <p className="text-xs text-white/50 truncate">Global Coverage</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
