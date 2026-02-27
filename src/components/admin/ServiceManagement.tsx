import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, X, Trash2, Plus, Loader2, Upload, GripVertical } from 'lucide-react';
import { api } from '@/lib/api';
import { getUploadUrl } from '@/lib/uploadUtils';
import { toast } from 'sonner';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Service {
  _id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  features?: string[];
  isActive?: boolean;
  order?: number;
}

const SortableServiceItem = ({
  service,
  editingId,
  form,
  setForm,
  handleEdit,
  handleSave,
  setEditingId,
  updateMutation,
  deleteMutation,
}: {
  service: Service;
  editingId: string | null;
  form: any;
  setForm: (f: any) => void;
  handleEdit: (s: Service) => void;
  handleSave: (id?: string) => void;
  setEditingId: (id: string | null) => void;
  updateMutation: any;
  deleteMutation: any;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: service._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 border rounded-lg hover:bg-muted/50 transition-colors ${isDragging ? 'shadow-lg ring-2 ring-primary' : ''}`}
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

                      const token = localStorage.getItem('token');
                      const headers: HeadersInit = {};
                      if (token) {
                        headers['Authorization'] = `Bearer ${token}`;
                      }

                      const promise = fetch(getUploadUrl(), {
                        method: 'POST',
                        headers,
                        body: uploadFormData,
                      }).then(async res => {
                        if (!res.ok) throw new Error('Upload failed');
                        const data = await res.json();
                        setForm((prev: any) => ({ ...prev, image: data.url }));
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
              <Button type="button" variant="outline" size="sm" onClick={() => setForm((prev: any) => ({ ...prev, features: [...(prev.features || []), ''] }))} className="gap-2">
                <Plus className="w-3 h-3" /> Add
              </Button>
            </div>
            <div className="space-y-2">
              {(form.features || []).map((feature: string, i: number) => (
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
                    const newFeatures = [...(form.features || [])].filter((_: any, idx: number) => idx !== i);
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
            <button
              className="mt-1 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground touch-none"
              {...attributes}
              {...listeners}
            >
              <GripVertical className="w-5 h-5" />
            </button>
            <span className="text-3xl">{service.icon}</span>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold">{service.title}</h4>
                <Badge variant="secondary" className="text-[10px]">#{(service.order ?? 0) + 1}</Badge>
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
    </div>
  );
};

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

  const reorderMutation = useMutation({
    mutationFn: (items: { id: string; order: number }[]) => api.put('/services/reorder', { items }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Order saved');
    },
    onError: () => toast.error('Failed to save order'),
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

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = services.findIndex((s: Service) => s._id === active.id);
    const newIndex = services.findIndex((s: Service) => s._id === over.id);

    const reordered = arrayMove(services, oldIndex, newIndex);
    const items = reordered.map((s: Service, i: number) => ({ id: s._id, order: i }));

    // Optimistic update via cache
    queryClient.setQueryData(['services'], reordered.map((s: Service, i: number) => ({ ...s, order: i })));
    reorderMutation.mutate(items);
  };

  if (isLoading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <CardTitle>Service Management</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Drag to reorder · Changes auto-save</p>
        </div>
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

                            const token = localStorage.getItem('token');
                            const headers: HeadersInit = {};
                            if (token) {
                              headers['Authorization'] = `Bearer ${token}`;
                            }

                            const promise = fetch(getUploadUrl(), {
                              method: 'POST',
                              headers,
                              body: uploadFormData,
                            }).then(async res => {
                              if (!res.ok) throw new Error('Upload failed');
                              const data = await res.json();
                              setForm((prev: any) => ({ ...prev, image: data.url }));
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
                    <Button type="button" variant="outline" size="sm" onClick={() => setForm((prev: any) => ({ ...prev, features: [...(prev.features || []), ''] }))} className="gap-2">
                      <Plus className="w-3 h-3" /> Add
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {(form.features || []).map((feature: string, i: number) => (
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
                          const newFeatures = [...(form.features || [])].filter((_: any, idx: number) => idx !== i);
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

          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={services.map((s: Service) => s._id)} strategy={verticalListSortingStrategy}>
              {services.map((service: Service) => (
                <SortableServiceItem
                  key={service._id}
                  service={service}
                  editingId={editingId}
                  form={form}
                  setForm={setForm}
                  handleEdit={handleEdit}
                  handleSave={handleSave}
                  setEditingId={setEditingId}
                  updateMutation={updateMutation}
                  deleteMutation={deleteMutation}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      </CardContent>
    </Card>
  );
};
