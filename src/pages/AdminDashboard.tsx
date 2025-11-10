import { useState, useEffect } from 'react';
import { DashboardOverview } from '@/components/admin/DashboardOverview';
import { OrderKanban } from '@/components/admin/OrderKanban';
import { SecurityAlerts } from '@/components/admin/SecurityAlerts';
import { BlockedIPs } from '@/components/admin/BlockedIPs';
import { LogHistory } from '@/components/admin/LogHistory';
import { AdminSettings } from '@/components/admin/AdminSettings';
import { PinAuth } from '@/components/admin/PinAuth';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Shield } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isPinVerified, setIsPinVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if PIN was verified in this session
    const verified = sessionStorage.getItem('admin_pin_verified') === 'true';
    setIsPinVerified(verified);
    setLoading(false);
  }, []);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  // Show PIN authentication if not verified
  if (!isPinVerified) {
    return <PinAuth onSuccess={() => setIsPinVerified(true)} />;
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-muted/20 to-background">
        <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center px-6 sticky top-0 z-10">
            <SidebarTrigger />
            <div className="flex items-center gap-3 ml-4">
              <Shield className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <p className="text-xs text-muted-foreground">Manage your restaurant operations</p>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-auto">
            {activeTab === 'overview' && <DashboardOverview />}
            {activeTab === 'orders' && <OrderKanban />}
            {activeTab === 'alerts' && <SecurityAlerts />}
            {activeTab === 'blocked' && <BlockedIPs />}
            {activeTab === 'logs' && <LogHistory />}
            {activeTab === 'settings' && <AdminSettings />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
