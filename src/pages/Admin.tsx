import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { company } from '@/data/company';
import { ServiceManagement } from '@/components/admin/ServiceManagement';
import { TestimonialManagement } from '@/components/admin/TestimonialManagement';
import { LeadManagement } from '@/components/admin/LeadManagement';
import { ProductManagement } from '@/components/admin/ProductManagement';
import { AnalyticsDashboard } from '@/components/admin/AnalyticsDashboard';
import { Shield, ArrowLeft, Package, Settings, BarChart3, Star, Users } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
// ... other imports

const Admin = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-muted/30">
        <header className="bg-card border-b sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="font-display font-bold">{company.shortName} Admin</span>
              </Link>
            </div>
            <div className="flex gap-2">
              <Link to="/"><Button variant="ghost" size="sm" className="gap-2"><ArrowLeft className="w-4 h-4" /> Back to Site</Button></Link>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">Logout</Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="analytics" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="analytics" className="gap-2"><BarChart3 className="w-4 h-4" />Analytics</TabsTrigger>
              <TabsTrigger value="products" className="gap-2"><Package className="w-4 h-4" />Products</TabsTrigger>
              <TabsTrigger value="services" className="gap-2"><Settings className="w-4 h-4" />Services</TabsTrigger>
              <TabsTrigger value="testimonials" className="gap-2"><Star className="w-4 h-4" />Testimonials</TabsTrigger>
              <TabsTrigger value="leads" className="gap-2"><Users className="w-4 h-4" />Leads</TabsTrigger>
            </TabsList>

            <TabsContent value="analytics"><AnalyticsDashboard /></TabsContent>
            <TabsContent value="products"><ProductManagement /></TabsContent>
            <TabsContent value="services"><ServiceManagement /></TabsContent>
            <TabsContent value="testimonials"><TestimonialManagement /></TabsContent>
            <TabsContent value="leads"><LeadManagement /></TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Admin;
