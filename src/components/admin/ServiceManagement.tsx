import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, X, Trash2, Plus, Loader2, Upload } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from 'sonner';

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  features?: string[];
  isActive?: boolean;
}

export const ServiceManagement = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', icon: '🔧', image: '/placeholder.svg', features: [] as string[] });

  const { data: services = [], isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: () => api.get('/services'),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.post('/services', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service created successfully');
      setIsAdding(false);
      resetForm();
    },
    onError: () => toast.error('Failed to create service'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.put(`/services/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service updated successfully');
      setEditingId(null);
    },
    onError: () => toast.error('Failed to update service'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/services/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service deleted successfully');
    },
    onError: () => toast.error('Failed to delete service'),
  });

  const resetForm = () => setForm({ title: '', description: '', icon: '🔧', image: '/placeholder.svg', features: [] });

  const handleEdit = (service: Service) => {
    setEditingId(service._id);
    setForm({
      title: service.title,
      description: service.description,
      icon: service.icon,
      image: service.image,
      features: service.features || []
    });
    setIsAdding(false);
  };

  const handleSave = async (id?: string) => {
    if (id) {
      updateMutation.mutate({ id, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  if (isLoading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4">
        <CardTitle>Service Management</CardTitle>
        {!isAdding && !editingId && (
          <Button onClick={() => { setIsAdding(true); resetForm(); }} className="gap-2">
            <Plus className="w-4 h-4" /> Add Service
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isAdding && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 border rounded-lg bg-muted/30">
              <div className="space-y-4">
                <h4 className="font-semibold">Add New Service</h4>
                <Input
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="Service Title"
                />
                <Textarea
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="Description"
                />
                <div className="flex gap-4">
                  <Input
                    value={form.icon}
                    onChange={e => setForm({ ...form, icon: e.target.value })}
                    placeholder="Icon (Emoji)"
                    className="w-32"
                  />
                  <div className="flex-1 min-w-[200px]">
                    <div className="flex gap-2 items-center">
                      <Input
                        value={form.image}
                        onChange={e => setForm({ ...form, image: e.target.value })}
                        placeholder="Image URL"
                        className="flex-1"
                      />
                      <div className="relative">
                        <Input
                          type="file"
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            const uploadFormData = new FormData();
                            uploadFormData.append('file', file);

                            const promise = fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/upload`, {
                              method: 'POST',
                              body: uploadFormData,
                            }).then(async res => {
                              if (!res.ok) throw new Error('Upload failed');
                              const data = await res.json();
                              setForm(prev => ({ ...prev, image: data.url }));
                              return data;
                            });

                            toast.promise(promise, {
                              loading: 'Uploading image...',
                              success: 'Image uploaded!',
                              error: 'Upload failed'
                            });
                          }}
                        />
                        <Button type="button" variant="outline" size="icon"><Upload className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 border p-4 rounded-md bg-background">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-medium">Key Features</h5>
                    <Button type="button" variant="outline" size="sm" onClick={() => setForm(prev => ({ ...prev, features: [...(prev.features || []), ''] }))} className="gap-2">
                      <Plus className="w-3 h-3" /> Add
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {(form.features || []).map((feature, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 ring-2 ring-primary ring-offset-2" />
                        <Input
                          value={feature}
                          onChange={e => {
                            const newFeatures = [...(form.features || [])];
                            newFeatures[i] = e.target.value;
                            setForm({ ...form, features: newFeatures });
                          }}
                          placeholder="Feature description"
                        />
                        <Button type="button" variant="ghost" size="icon" className="text-destructive h-8 w-8" onClick={() => {
                          const newFeatures = [...(form.features || [])].filter((_, idx) => idx !== i);
                          setForm({ ...form, features: newFeatures });
                        }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleSave()} disabled={createMutation.isPending}>Save</Button>
                  <Button size="sm" variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
                </div>
              </div>
            </motion.div>
          )}

          {services.map((service: Service) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              {editingId === service._id ? (
                <div className="space-y-4">
                  <Input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Service title"
                  />
                  <Textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Service description"
                    rows={3}
                  />
                  <div className="flex gap-4">
                    <Input
                      value={form.icon}
                      onChange={e => setForm({ ...form, icon: e.target.value })}
                      placeholder="Icon (Emoji)"
                      className="w-32"
                    />
                    <div className="flex-1 min-w-[200px]">
                      <div className="flex gap-2 items-center">
                        <Input
                          value={form.image}
                          onChange={e => setForm({ ...form, image: e.target.value })}
                          placeholder="Image URL"
                          className="flex-1"
                        />
                        <div className="relative">
                          <Input
                            type="file"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;

                              const uploadFormData = new FormData();
                              uploadFormData.append('file', file);

                              const promise = fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/upload`, {
                                method: 'POST',
                                body: uploadFormData,
                              }).then(async res => {
                                if (!res.ok) throw new Error('Upload failed');
                                const data = await res.json();
                                setForm(prev => ({ ...prev, image: data.url }));
                                return data;
                              });

                              toast.promise(promise, {
                                loading: 'Uploading image...',
                                success: 'Image uploaded!',
                                error: 'Upload failed'
                              });
                            }}
                          />
                          <Button type="button" variant="outline" size="icon"><Upload className="w-4 h-4" /></Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border p-4 rounded-md">
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-medium">Key Features</h5>
                      <Button type="button" variant="outline" size="sm" onClick={() => setForm(prev => ({ ...prev, features: [...(prev.features || []), ''] }))} className="gap-2">
                        <Plus className="w-3 h-3" /> Add
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {(form.features || []).map((feature, i) => (
                        <div key={i} className="flex gap-2 items-center">
                          <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 ring-2 ring-primary ring-offset-2" />
                          <Input
                            value={feature}
                            onChange={e => {
                              const newFeatures = [...(form.features || [])];
                              newFeatures[i] = e.target.value;
                              setForm({ ...form, features: newFeatures });
                            }}
                            placeholder="Feature description"
                          />
                          <Button type="button" variant="ghost" size="icon" className="text-destructive h-8 w-8" onClick={() => {
                            const newFeatures = [...(form.features || [])].filter((_, idx) => idx !== i);
                            setForm({ ...form, features: newFeatures });
                          }}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleSave(service._id)} className="gap-2" disabled={updateMutation.isPending}>
                      <Save className="w-4 h-4" /> Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingId(null)} className="gap-2">
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
                      </div>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="ghost" onClick={() => handleEdit(service)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => {
                      toast("Delete service?", {
                        description: "This action cannot be undone.",
                        action: {
                          label: "Delete",
                          onClick: () => deleteMutation.mutate(service._id)
                        },
                        cancel: { label: "Cancel", onClick: () => { } }
                      });
                    }}>
                      <Trash2 className="w-4 h-4" />
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
