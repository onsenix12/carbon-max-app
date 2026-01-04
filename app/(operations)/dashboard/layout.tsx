// app/(operations)/dashboard/layout.tsx

import { Sidebar } from '@/components/operations/layout/Sidebar';
import { DemoBanner } from '@/components/operations/layout/DemoBanner';

export const metadata = {
  title: 'CAG Sustainability Dashboard',
  description: 'Operations dashboard for Changi Airport carbon emissions monitoring',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Demo Banner */}
          <DemoBanner />
          
          {/* Page Content */}
          {children}
        </div>
      </main>
    </div>
  );
}

