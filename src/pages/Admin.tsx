import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products as initialProducts, categories } from '@/data/products';
import { company } from '@/data/company';
import { ServiceManagement } from '@/components/admin/ServiceManagement';
import { TestimonialManagement } from '@/components/admin/TestimonialManagement';
import { LeadManagement } from '@/components/admin/LeadManagement';
import { AnalyticsDashboard } from '@/components/admin/AnalyticsDashboard';
import { Shield, Plus, Edit, Trash2, ArrowLeft, Package, Settings, MessageSquare, BarChart3, Star, Users } from 'lucide-react';

const Admin = () => {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  const toggleAvailability = (id: string, field: 'canBuy' | 'canRent' | 'canRepair') => {
    setProducts(products.map(p => p.id === id ? { ...p, [field]: !p[field] } : p));
  };

  return (
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
          <Link to="/"><Button variant="outline" size="sm" className="gap-2"><ArrowLeft className="w-4 h-4" /> Back to Site</Button></Link>
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

          <TabsContent value="products">
            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Products', value: products.length, icon: Package },
                { label: 'Categories', value: categories.length, icon: Settings },
                { label: 'For Sale', value: products.filter(p => p.canBuy).length, icon: Package },
                { label: 'For Rent', value: products.filter(p => p.canRent).length, icon: Package },
              ].map((stat, i) => (
                <Card key={i}>
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><stat.icon className="w-6 h-6 text-primary" /></div>
                    <div><p className="text-2xl font-bold">{stat.value}</p><p className="text-sm text-muted-foreground">{stat.label}</p></div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Products Management</CardTitle>
                <div className="flex gap-2">
                  <Input placeholder="Search products..." className="w-64" value={search} onChange={(e) => setSearch(e.target.value)} />
                  <Button className="gap-2"><Plus className="w-4 h-4" /> Add Product</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Product</th>
                        <th className="text-left p-3 font-medium">Category</th>
                        <th className="text-center p-3 font-medium">Buy</th>
                        <th className="text-center p-3 font-medium">Rent</th>
                        <th className="text-center p-3 font-medium">Repair</th>
                        <th className="text-right p-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => (
                        <motion.tr key={product.id} className="border-b hover:bg-muted/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <img src={product.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                              <div><p className="font-medium">{product.name}</p><p className="text-xs text-muted-foreground">{product.price}</p></div>
                            </div>
                          </td>
                          <td className="p-3"><Badge variant="secondary">{categories.find(c => c.id === product.category)?.name}</Badge></td>
                          <td className="p-3 text-center"><Switch checked={product.canBuy} onCheckedChange={() => toggleAvailability(product.id, 'canBuy')} /></td>
                          <td className="p-3 text-center"><Switch checked={product.canRent} onCheckedChange={() => toggleAvailability(product.id, 'canRent')} /></td>
                          <td className="p-3 text-center"><Switch checked={product.canRepair} onCheckedChange={() => toggleAvailability(product.id, 'canRepair')} /></td>
                          <td className="p-3 text-right">
                            <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services"><ServiceManagement /></TabsContent>
          <TabsContent value="testimonials"><TestimonialManagement /></TabsContent>
          <TabsContent value="leads"><LeadManagement /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
