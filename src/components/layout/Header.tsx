import React from 'react';
import { Search, Bell, Menu, User } from 'lucide-react';
import { GlassInput } from '../ui/GlassInput';

interface HeaderProps {
  onMenuClick?: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({ onMenuClick, searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="h-16 fixed top-0 right-0 left-64 z-40 bg-white/[0.03] backdrop-blur-[20px] border-b border-white/[0.1]">
      <div className="h-full px-6 flex items-center justify-between gap-4">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-white/[0.1] text-white/70"
        >
          <Menu size={20} />
        </button>

        {/* Search */}
        <div className="flex-1 max-w-xl">
          <GlassInput
            type="text"
            placeholder="Search for a city, region, or coordinates..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            icon={<Search size={18} />}
            className="w-full"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button className="relative p-2 rounded-xl hover:bg-white/[0.1] text-white/70 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent-cyan rounded-full"></span>
          </button>

          {/* User Profile */}
          <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/[0.1] transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-violet to-accent-cyan flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="text-sm font-medium text-white/80 hidden sm:block">User</span>
          </button>
        </div>
      </div>
    </header>
  );
}
