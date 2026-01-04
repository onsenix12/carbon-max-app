// components/operations/layout/Sidebar.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  Plane, 
  Store, 
  Leaf, 
  Brain, 
  Settings,
  ExternalLink
} from 'lucide-react';
import { NAV_ITEMS, DASHBOARD_ROUTES } from '@/lib/emissions/constants';
import { ROUTES } from '@/lib/routes';

const iconMap = {
  LayoutDashboard,
  Plane,
  Store,
  Leaf,
  Brain,
  Settings,
};

export function Sidebar() {
  const pathname = usePathname();
  
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-slate-200">
        <Link href={DASHBOARD_ROUTES.overview} className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-slate-900">CAG Sustainability</h1>
            <p className="text-xs text-slate-500">Operations Dashboard</p>
          </div>
        </Link>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap];
          const isActive = pathname === item.href || 
            (item.href !== DASHBOARD_ROUTES.overview && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      {/* Consumer App Link */}
      <div className="p-4 border-t border-slate-200">
        <Link
          href={ROUTES.CARBONMAX}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
        >
          <ExternalLink className="w-5 h-5" />
          <span className="text-sm">View Consumer App</span>
        </Link>
      </div>
      
      {/* Version */}
      <div className="p-4 border-t border-slate-200">
        <p className="text-xs text-slate-400 text-center">
          v1.0.0 • Demo Mode
        </p>
      </div>
    </aside>
  );
}

