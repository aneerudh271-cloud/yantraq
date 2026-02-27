import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, X, Trash2, Plus, Loader2, Globe, ExternalLink, Eye, EyeOff, GripVertical } from 'lucide-react';
import { api } from '@/lib/api';
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
    rectSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface PortfolioItem {
    _id: string;
    name: string;
    url: string;
    description: string;
    color: string;
    image?: string;
    isActive: boolean;
    order: number;
}

const SortablePortfolioCard = ({
    item,
    onEdit,
    onToggleActive,
    onDelete,
    updateMutation,
}: {
    item: PortfolioItem;
    onEdit: (item: PortfolioItem) => void;
    onToggleActive: (item: PortfolioItem) => void;
    onDelete: (id: string) => void;
    updateMutation: any;
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : undefined,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <Card className={`h-full transition-all duration-300 ${!item.isActive ? 'opacity-50' : ''} ${isDragging ? 'shadow-lg ring-2 ring-primary' : ''}`}>
                <CardContent className="p-5 space-y-3">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground touch-none"
                                {...attributes}
                                {...listeners}
                            >
                                <GripVertical className="w-5 h-5" />
                            </button>
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                                style={{ background: `hsl(${item.color} / 0.12)` }}
                            >
                                <Globe className="w-5 h-5" style={{ color: `hsl(${item.color})` }} />
                            </div>
                            <div>
                                <h4 className="font-semibold">{item.name}</h4>
                                <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                                    {item.url.replace('https://', '')} <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <Badge variant={item.isActive ? 'default' : 'secondary'}>
                                {item.isActive ? 'Active' : 'Hidden'}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground">#{item.order + 1}</span>
                        </div>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>

                    <div className="flex items-center gap-1 pt-1">
                        <Button size="sm" variant="ghost" onClick={() => onToggleActive(item)} title={item.isActive ? 'Hide' : 'Show'}>
                            {item.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => onEdit(item)}>
                            <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => onDelete(item._id)}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export const PortfolioManagement = () => {
    const queryClient = useQueryClient();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('200 90% 50%');
    const [image, setImage] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [order, setOrder] = useState(0);

    const { data: portfolio = [], isLoading } = useQuery({
        queryKey: ['portfolio-admin'],
        queryFn: () => api.get('/portfolio/all'),
    });

    const createMutation = useMutation({
        mutationFn: (data: any) => api.post('/portfolio', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portfolio-admin'] });
            queryClient.invalidateQueries({ queryKey: ['portfolio'] });
            toast.success('Portfolio item created');
            resetForm();
        },
        onError: () => toast.error('Failed to create portfolio item'),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => api.put(`/portfolio/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portfolio-admin'] });
            queryClient.invalidateQueries({ queryKey: ['portfolio'] });
            toast.success('Portfolio item updated');
            resetForm();
        },
        onError: () => toast.error('Failed to update portfolio item'),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => api.delete(`/portfolio/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portfolio-admin'] });
            queryClient.invalidateQueries({ queryKey: ['portfolio'] });
            toast.success('Portfolio item deleted');
        },
        onError: () => toast.error('Failed to delete portfolio item'),
    });

    const reorderMutation = useMutation({
        mutationFn: (items: { id: string; order: number }[]) => api.put('/portfolio/reorder', { items }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['portfolio-admin'] });
            queryClient.invalidateQueries({ queryKey: ['portfolio'] });
            toast.success('Order saved');
        },
        onError: () => toast.error('Failed to save order'),
    });

    const resetForm = () => {
        setName(''); setUrl(''); setDescription(''); setColor('200 90% 50%');
        setImage(''); setIsActive(true); setOrder(0);
        setEditingId(null); setIsCreating(false);
    };

    const handleEdit = (item: PortfolioItem) => {
        setEditingId(item._id);
        setIsCreating(false);
        setName(item.name);
        setUrl(item.url);
        setDescription(item.description);
        setColor(item.color);
        setImage(item.image || '');
        setIsActive(item.isActive);
        setOrder(item.order);
    };

    const handleSave = (id?: string) => {
        const data = { name, url, description, color, image: image || undefined, isActive, order };
        if (id) {
            updateMutation.mutate({ id, data });
        } else {
            createMutation.mutate(data);
        }
    };

    const handleToggleActive = (item: PortfolioItem) => {
        updateMutation.mutate({ id: item._id, data: { ...item, isActive: !item.isActive } });
    };

    const handleDelete = (id: string) => {
        if (confirm('Delete this project?')) deleteMutation.mutate(id);
    };

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = portfolio.findIndex((p: PortfolioItem) => p._id === active.id);
        const newIndex = portfolio.findIndex((p: PortfolioItem) => p._id === over.id);

        const reordered = arrayMove(portfolio, oldIndex, newIndex);
        const items = reordered.map((p: PortfolioItem, i: number) => ({ id: p._id, order: i }));

        // Optimistic update
        queryClient.setQueryData(['portfolio-admin'], reordered.map((p: PortfolioItem, i: number) => ({ ...p, order: i })));
        reorderMutation.mutate(items);
    };

    const isSaving = createMutation.isPending || updateMutation.isPending;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Portfolio / Software Works</h2>
                    <p className="text-muted-foreground">Drag to reorder · Changes auto-save</p>
                </div>
                {!isCreating && !editingId && (
                    <Button onClick={() => { resetForm(); setIsCreating(true); }} className="gap-2">
                        <Plus className="w-4 h-4" /> Add Project
                    </Button>
                )}
            </div>

            {/* Create / Edit Form */}
            {(isCreating || editingId) && (
                <Card className="border-primary/50">
                    <CardHeader>
                        <CardTitle className="text-lg">{editingId ? 'Edit Project' : 'Add New Project'}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Project Name *</Label>
                                <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. AgniqTech" />
                            </div>
                            <div className="space-y-2">
                                <Label>URL *</Label>
                                <Input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://example.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Description *</Label>
                            <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Brief description of the project" rows={2} />
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>HSL Color</Label>
                                <div className="flex gap-2 items-center">
                                    <Input value={color} onChange={e => setColor(e.target.value)} placeholder="200 90% 50%" />
                                    <div className="w-10 h-10 rounded-lg shrink-0 border" style={{ background: `hsl(${color})` }} />
                                </div>
                                <p className="text-xs text-muted-foreground">Format: H S% L% (e.g. 200 90% 50%)</p>
                            </div>
                            <div className="space-y-2">
                                <Label>Image URL (optional)</Label>
                                <Input value={image} onChange={e => setImage(e.target.value)} placeholder="https://..." />
                            </div>
                            <div className="space-y-2">
                                <Label>Display Order</Label>
                                <Input type="number" value={order} onChange={e => setOrder(parseInt(e.target.value) || 0)} />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="isActive" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="rounded" />
                            <Label htmlFor="isActive">Active (visible on website)</Label>
                        </div>

                        <div className="flex gap-2">
                            <Button onClick={() => handleSave(editingId || undefined)} disabled={!name || !url || !description || isSaving} className="gap-2">
                                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {editingId ? 'Update' : 'Create'}
                            </Button>
                            <Button variant="outline" onClick={resetForm} className="gap-2">
                                <X className="w-4 h-4" /> Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Drag & Drop Grid */}
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={portfolio.map((p: PortfolioItem) => p._id)} strategy={rectSortingStrategy}>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {portfolio.map((item: PortfolioItem) => (
                            <SortablePortfolioCard
                                key={item._id}
                                item={item}
                                onEdit={handleEdit}
                                onToggleActive={handleToggleActive}
                                onDelete={handleDelete}
                                updateMutation={updateMutation}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {portfolio.length === 0 && !isCreating && (
                <Card>
                    <CardContent className="py-12 text-center text-muted-foreground">
                        <Globe className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p>No portfolio items yet. Click "Add Project" to get started.</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
