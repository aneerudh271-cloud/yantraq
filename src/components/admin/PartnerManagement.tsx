import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Edit, Save, X, Trash2, Plus, Loader2, Image as ImageIcon, ExternalLink, Eye, EyeOff, GripVertical } from 'lucide-react';
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

interface Partner {
    _id: string;
    name: string;
    logo: string;
    website?: string;
    isActive: boolean;
    order: number;
}

const SortablePartnerCard = ({
    partner,
    onEdit,
    onToggleActive,
    onDelete,
}: {
    partner: Partner;
    onEdit: (partner: Partner) => void;
    onToggleActive: (partner: Partner) => void;
    onDelete: (id: string) => void;
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: partner._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : undefined,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} style={style}>
            <Card className={`h-full transition-all duration-300 ${!partner.isActive ? 'opacity-50' : ''} ${isDragging ? 'shadow-lg ring-2 ring-primary' : ''}`}>
                <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <button
                                className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground touch-none"
                                {...attributes}
                                {...listeners}
                            >
                                <GripVertical className="w-5 h-5" />
                            </button>
                            <div className="w-12 h-12 rounded-lg bg-white border flex items-center justify-center p-2 shrink-0 overflow-hidden">
                                <img src={partner.logo} alt={partner.name} className="max-w-full max-h-full object-contain" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm">{partner.name}</h4>
                                {partner.website && (
                                    <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-[10px] text-muted-foreground hover:text-primary flex items-center gap-1">
                                        Website <ExternalLink className="w-2 h-2" />
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <Badge variant={partner.isActive ? 'default' : 'secondary'} className="text-[10px] h-4 px-1">
                                {partner.isActive ? 'Active' : 'Hidden'}
                            </Badge>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 pt-1 justify-end">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => onToggleActive(partner)} title={partner.isActive ? 'Hide' : 'Show'}>
                            {partner.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => onEdit(partner)}>
                            <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-destructive hover:text-destructive" onClick={() => onDelete(partner._id)}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export const PartnerManagement = () => {
    const queryClient = useQueryClient();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [website, setWebsite] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [order, setOrder] = useState(0);

    const { data: partners = [], isLoading } = useQuery({
        queryKey: ['partners-admin'],
        queryFn: () => api.get('/partners'),
        retry: false,
    });

    const createMutation = useMutation({
        mutationFn: (data: any) => api.post('/partners', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['partners-admin'] });
            queryClient.invalidateQueries({ queryKey: ['partners'] });
            toast.success('Partner added');
            resetForm();
        },
        onError: () => toast.error('Failed to add partner. Ensure backend route exists.'),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => api.put(`/partners/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['partners-admin'] });
            queryClient.invalidateQueries({ queryKey: ['partners'] });
            toast.success('Partner updated');
            resetForm();
        },
        onError: () => toast.error('Failed to update partner'),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => api.delete(`/partners/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['partners-admin'] });
            queryClient.invalidateQueries({ queryKey: ['partners'] });
            toast.success('Partner deleted');
        },
        onError: () => toast.error('Failed to delete partner'),
    });

    const reorderMutation = useMutation({
        mutationFn: (items: { id: string; order: number }[]) => api.put('/partners/reorder', { items }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['partners-admin'] });
            queryClient.invalidateQueries({ queryKey: ['partners'] });
            toast.success('Order saved');
        },
        onError: () => toast.error('Failed to save order'),
    });

    const resetForm = () => {
        setName(''); setLogo(''); setWebsite('');
        setIsActive(true); setOrder(0);
        setEditingId(null); setIsCreating(false);
    };

    const handleEdit = (partner: Partner) => {
        setEditingId(partner._id);
        setIsCreating(false);
        setName(partner.name);
        setLogo(partner.logo);
        setWebsite(partner.website || '');
        setIsActive(partner.isActive);
        setOrder(partner.order);
    };

    const handleSave = (id?: string) => {
        const data = { name, logo, website: website || undefined, isActive, order };
        if (id) {
            updateMutation.mutate({ id, data });
        } else {
            createMutation.mutate(data);
        }
    };

    const handleToggleActive = (partner: Partner) => {
        updateMutation.mutate({ id: partner._id, data: { ...partner, isActive: !partner.isActive } });
    };

    const handleDelete = (id: string) => {
        if (confirm('Delete this partner?')) deleteMutation.mutate(id);
    };

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = partners.findIndex((p: Partner) => p._id === active.id);
        const newIndex = partners.findIndex((p: Partner) => p._id === over.id);

        const reordered = arrayMove(partners, oldIndex, newIndex);
        const items = reordered.map((p: Partner, i: number) => ({ id: p._id, order: i }));

        // Optimistic update
        queryClient.setQueryData(['partners-admin'], reordered.map((p: Partner, i: number) => ({ ...p, order: i })));
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
                    <h2 className="text-2xl font-bold">Partner & Brand Logos</h2>
                    <p className="text-muted-foreground">Manage logos displayed in the scrolling marquee</p>
                </div>
                {!isCreating && !editingId && (
                    <Button onClick={() => { resetForm(); setIsCreating(true); }} className="gap-2">
                        <Plus className="w-4 h-4" /> Add Partner
                    </Button>
                )}
            </div>

            {/* Create / Edit Form */}
            {(isCreating || editingId) && (
                <Card className="border-primary/50">
                    <CardHeader>
                        <CardTitle className="text-lg">{editingId ? 'Edit Partner' : 'Add New Partner'}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Brand Name *</Label>
                                <Input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. HP" />
                            </div>
                            <div className="space-y-2">
                                <Label>Logo URL *</Label>
                                <Input value={logo} onChange={e => setLogo(e.target.value)} placeholder="https://logo.clearbit.com/hp.com" />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Website (optional)</Label>
                                <Input value={website} onChange={e => setWebsite(e.target.value)} placeholder="https://hp.com" />
                            </div>
                            <div className="space-y-2">
                                <Label>Display Order</Label>
                                <Input type="number" value={order} onChange={e => setOrder(parseInt(e.target.value) || 0)} />
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="isActive" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="rounded" />
                            <Label htmlFor="isActive">Active (visible in marquee)</Label>
                        </div>

                        <div className="flex gap-2">
                            <Button onClick={() => handleSave(editingId || undefined)} disabled={!name || !logo || isSaving} className="gap-2">
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
                <SortableContext items={partners.map((p: Partner) => p._id)} strategy={rectSortingStrategy}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {partners.map((partner: Partner) => (
                            <SortablePartnerCard
                                key={partner._id}
                                partner={partner}
                                onEdit={handleEdit}
                                onToggleActive={handleToggleActive}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {(partners.length === 0 || !Array.isArray(partners)) && !isCreating && (
                <Card>
                    <CardContent className="py-12 text-center text-muted-foreground">
                        <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p>No partners found in database. Please ensure backend is running or add manually.</p>
                        <Button variant="link" onClick={() => setIsCreating(true)} className="mt-2">Click here to add your first partner logo</Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
