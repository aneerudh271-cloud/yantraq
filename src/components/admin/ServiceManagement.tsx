import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, X } from 'lucide-react';
import { services as initialServices } from '@/data/services';
import { toast } from 'sonner';

export const ServiceManagement = () => {
  const [services, setServices] = useState(initialServices.map(s => ({ ...s, isActive: true })));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });

  const handleEdit = (service: typeof services[0]) => {
    setEditingId(service.id);
    setEditForm({ title: service.title, description: service.description });
  };

  const handleSave = (id: string) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, title: editForm.title, description: editForm.description } : s
    ));
    setEditingId(null);
    toast.success('Service updated successfully!');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ title: '', description: '' });
  };

  const toggleActive = (id: string) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, isActive: !s.isActive } : s
    ));
    toast.success('Service status updated!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              {editingId === service.id ? (
                <div className="space-y-4">
                  <Input
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    placeholder="Service title"
                  />
                  <Textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    placeholder="Service description"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleSave(service.id)} className="gap-2">
                      <Save className="w-4 h-4" /> Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancel} className="gap-2">
                      <X className="w-4 h-4" /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <span className="text-3xl">{service.icon}</span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{service.title}</h4>
                        <Badge variant={service.isActive ? 'default' : 'secondary'}>
                          {service.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={service.isActive}
                      onCheckedChange={() => toggleActive(service.id)}
                    />
                    <Button size="icon" variant="ghost" onClick={() => handleEdit(service)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
