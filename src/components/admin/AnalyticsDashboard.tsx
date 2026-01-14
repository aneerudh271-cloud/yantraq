import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  ShoppingCart, 
  Clock, 
  Wrench, 
  TrendingUp,
  Eye,
  MessageSquare,
  CheckCircle
} from 'lucide-react';
import { leads, getLeadStats } from '@/data/leads';
import { products } from '@/data/products';

export const AnalyticsDashboard = () => {
  const stats = getLeadStats();
  
  // Mock analytics data (in production, this would come from actual tracking)
  const monthlyData = [
    { month: 'Oct', enquiries: 45 },
    { month: 'Nov', enquiries: 62 },
    { month: 'Dec', enquiries: 78 },
    { month: 'Jan', enquiries: 55 },
  ];

  const topProducts = [
    { name: '8-Channel NVR System', views: 342, enquiries: 28 },
    { name: 'Business Laptop i5', views: 289, enquiries: 24 },
    { name: 'Fingerprint Attendance System', views: 256, enquiries: 21 },
    { name: 'Vehicle GPS Tracker', views: 198, enquiries: 18 },
    { name: '4MP IP Bullet Camera', views: 176, enquiries: 15 },
  ];

  const topServices = [
    { name: 'New Product Sales', enquiries: 45 },
    { name: 'Rental Services', enquiries: 32 },
    { name: 'Repair & AMC', enquiries: 28 },
    { name: 'Refurbished Products', enquiries: 18 },
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { 
            label: 'Total Enquiries', 
            value: stats.total, 
            icon: MessageSquare, 
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
          },
          { 
            label: 'New Leads', 
            value: stats.new, 
            icon: Users, 
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
          },
          { 
            label: 'In Progress', 
            value: stats.inProgress, 
            icon: Clock, 
            color: 'text-yellow-500',
            bgColor: 'bg-yellow-500/10',
          },
          { 
            label: 'Closed Deals', 
            value: stats.closed, 
            icon: CheckCircle, 
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10',
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Enquiry Type Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Enquiry Breakdown by Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { type: 'Buy', count: stats.byType.buy, icon: ShoppingCart, color: 'bg-green-500' },
              { type: 'Rent', count: stats.byType.rent, icon: Clock, color: 'bg-blue-500' },
              { type: 'Repair', count: stats.byType.repair, icon: Wrench, color: 'bg-orange-500' },
              { type: 'AMC', count: stats.byType.amc, icon: CheckCircle, color: 'bg-purple-500' },
              { type: 'Other', count: stats.byType.other, icon: MessageSquare, color: 'bg-gray-500' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-muted/50 rounded-xl text-center">
                <div className={`w-10 h-10 mx-auto rounded-full ${item.color} flex items-center justify-center mb-2`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold">{item.count}</p>
                <p className="text-sm text-muted-foreground">{item.type}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Enquiry Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-4 h-48">
              {monthlyData.map((data, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.enquiries / 100) * 100}%` }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="w-full bg-primary rounded-t-lg relative group"
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      {data.enquiries}
                    </span>
                  </motion.div>
                  <span className="text-sm text-muted-foreground mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Services */}
        <Card>
          <CardHeader>
            <CardTitle>Most Enquired Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topServices.map((service, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-muted-foreground w-8">{i + 1}</span>
                  <div className="flex-1">
                    <p className="font-medium">{service.name}</p>
                    <div className="h-2 bg-muted rounded-full mt-1 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(service.enquiries / 50) * 100}%` }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{service.enquiries} enquiries</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Most Viewed Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Rank</th>
                  <th className="text-left p-3 font-medium">Product</th>
                  <th className="text-right p-3 font-medium">Views</th>
                  <th className="text-right p-3 font-medium">Enquiries</th>
                  <th className="text-right p-3 font-medium">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, i) => (
                  <tr key={i} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-bold text-muted-foreground">{i + 1}</td>
                    <td className="p-3 font-medium">{product.name}</td>
                    <td className="p-3 text-right">{product.views}</td>
                    <td className="p-3 text-right">{product.enquiries}</td>
                    <td className="p-3 text-right">
                      <span className="text-green-500 font-medium">
                        {((product.enquiries / product.views) * 100).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
