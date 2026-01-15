import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Settings, Plus, Edit, Trash2, Loader2, Upload, Search, X } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { categories } from '@/data/products';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

interface Product {
    _id: string;
    name: string;
    category: string;
    description: string;
    fullDescription: string;
    image: string;
    features: string[];
    canBuy: boolean;
    canRent: boolean;
    canRepair: boolean;
    price?: string;
    rentPrice?: string;
}

export const ProductManagement = () => {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Basic form data
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        category: 'cctv',
        description: '',
        fullDescription: '',
        image: '/placeholder.svg',
        canBuy: true,
        canRent: true,
        canRepair: true,
        price: '',
        rentPrice: '',
        features: [],
    });

    const { data, isLoading } = useQuery({
        queryKey: ['products', page, search],
        queryFn: () => {
            const params = new URLSearchParams();
            params.set('page', page.toString());
            params.set('limit', '20');
            if (search) params.set('search', search); // Server-side search
            return api.get(`/products?${params.toString()}`);
        },
    });

    const products: Product[] = data?.products || [];
    const pagination = data?.pagination;

    const createMutation = useMutation({
        mutationFn: (data: any) => api.post('/products', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Product added successfully!');
            setIsDialogOpen(false);
            resetForm();
        },
        onError: () => toast.error('Failed to add product'),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => api.put(`/products/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Product updated successfully!');
            setIsDialogOpen(false);
            resetForm();
        },
        onError: () => toast.error('Failed to update product'),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => api.delete(`/products/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Product deleted successfully!');
        },
        onError: () => toast.error('Failed to delete product'),
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => api.put(`/products/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            toast.success('Product status updated');
        },
        onError: () => toast.error('Failed to update status'),
    });

    const resetForm = () => {
        setFormData({
            name: '',
            category: 'cctv',
            description: '',
            fullDescription: '',
            image: '/placeholder.svg',
            canBuy: true,
            canRent: true,
            canRepair: true,
            price: '',
            rentPrice: '',
            features: [],
        });
        setEditingProduct(null);
    };

    const handleOpenDialog = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setFormData({ ...product });
        } else {
            resetForm();
        }
        setIsDialogOpen(true);
    };

    const handleSubmit = () => {
        // Basic validation
        if (!formData.name) {
            toast.error('Name is required');
            return;
        }

        const payload = { ...formData };

        if (editingProduct) {
            updateMutation.mutate({ id: editingProduct._id, data: payload });
        } else {
            createMutation.mutate(payload);
        }
    };

    const toggleAvailability = (id: string, field: 'canBuy' | 'canRent' | 'canRepair', currentValue: boolean) => {
        updateStatusMutation.mutate({ id, data: { [field]: !currentValue } });
    };

    const handleSearch = (s: string) => {
        setSearch(s);
        setPage(1);
    };

    if (isLoading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

    // Use pagination.total for correct count if available, else products.length (but products is partial)
    // For dashboard stats, we ideally need separate stats API or get total from pagination
    const totalProducts = pagination?.total || products.length;

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Products', value: totalProducts, icon: Package },
                    { label: 'Categories', value: categories.length, icon: Settings },
                    { label: 'Displaying', value: products.length, icon: Package }, // Showing current page count
                    // Stats for filter types might require separate API or be removed if incorrect
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
                <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <CardTitle>Products Management</CardTitle>
                    <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
                        <div className="relative w-full md:w-auto">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search products..."
                                className="w-full md:w-64 pl-9"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            {search && (
                                <button onClick={() => handleSearch('')} className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground">
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="gap-2" onClick={() => handleOpenDialog()}><Plus className="w-4 h-4" /> Add Product</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Name</Label>
                                            <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Category</Label>
                                            <Select value={formData.category} onValueChange={v => setFormData({ ...formData, category: v })}>
                                                <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                                                <SelectContent>
                                                    {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Description</Label>
                                        <Input value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Full Description</Label>
                                        <Input value={formData.fullDescription} onChange={e => setFormData({ ...formData, fullDescription: e.target.value })} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Price (Sale)</Label>
                                            <Input value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Price (Rent)</Label>
                                            <Input value={formData.rentPrice} onChange={e => setFormData({ ...formData, rentPrice: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Image</Label>
                                        <div className="flex gap-2 items-center">
                                            <Input
                                                value={formData.image}
                                                onChange={e => setFormData({ ...formData, image: e.target.value })}
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
                                                            setFormData(prev => ({ ...prev, image: data.url }));
                                                            return data;
                                                        });

                                                        toast.promise(promise, {
                                                            loading: 'Uploading image...',
                                                            success: 'Image uploaded!',
                                                            error: 'Upload failed. Check token.'
                                                        });
                                                    }}
                                                />
                                                <Button type="button" variant="outline" size="icon"><Upload className="w-4 h-4" /></Button>
                                            </div>
                                        </div>
                                        {formData.image && <img src={formData.image} alt="Preview" className="w-20 h-20 object-cover rounded mt-2 border" />}
                                    </div>

                                    <div className="space-y-4 border p-4 rounded-md bg-muted/10">
                                        <div className="flex items-center justify-between">
                                            <Label>Key Features (Special Bullet Points)</Label>
                                            <Button type="button" variant="outline" size="sm" onClick={() => setFormData(prev => ({ ...prev, features: [...(prev.features || []), ''] }))} className="gap-2">
                                                <Plus className="w-3 h-3" /> Add Feature
                                            </Button>
                                        </div>
                                        <div className="space-y-2">
                                            {(formData.features || []).map((feature, i) => (
                                                <div key={i} className="flex gap-2 items-center">
                                                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 ring-2 ring-primary ring-offset-2" /> {/* Special Dot */}
                                                    <Input
                                                        value={feature}
                                                        onChange={e => {
                                                            const newFeatures = [...(formData.features || [])];
                                                            newFeatures[i] = e.target.value;
                                                            setFormData({ ...formData, features: newFeatures });
                                                        }}
                                                        placeholder="Feature description"
                                                    />
                                                    <Button type="button" variant="ghost" size="icon" className="text-destructive h-8 w-8" onClick={() => {
                                                        const newFeatures = [...(formData.features || [])].filter((_, idx) => idx !== i);
                                                        setFormData({ ...formData, features: newFeatures });
                                                    }}>
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            ))}
                                            {(!formData.features || formData.features.length === 0) && <p className="text-sm text-muted-foreground italic">No features added yet.</p>}
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-2">
                                            <Switch checked={formData.canBuy} onCheckedChange={c => setFormData({ ...formData, canBuy: c })} />
                                            <Label>Can Buy</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Switch checked={formData.canRent} onCheckedChange={c => setFormData({ ...formData, canRent: c })} />
                                            <Label>Can Rent</Label>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Switch checked={formData.canRepair} onCheckedChange={c => setFormData({ ...formData, canRepair: c })} />
                                            <Label>Can Repair</Label>
                                        </div>
                                    </div>
                                    <Button onClick={handleSubmit}>{editingProduct ? 'Update' : 'Create'}</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto mb-4">
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
                                {products.map((product: Product) => (
                                    <motion.tr key={product._id} className="border-b hover:bg-muted/50" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <img src={product.image} alt="" className="w-12 h-12 rounded-lg object-cover" />
                                                <div><p className="font-medium">{product.name}</p><p className="text-xs text-muted-foreground">{product.price}</p></div>
                                            </div>
                                        </td>
                                        <td className="p-3"><Badge variant="secondary">{categories.find(c => c.id === product.category)?.name}</Badge></td>
                                        <td className="p-3 text-center"><Switch checked={product.canBuy} onCheckedChange={() => toggleAvailability(product._id, 'canBuy', product.canBuy)} /></td>
                                        <td className="p-3 text-center"><Switch checked={product.canRent} onCheckedChange={() => toggleAvailability(product._id, 'canRent', product.canRent)} /></td>
                                        <td className="p-3 text-center"><Switch checked={product.canRepair} onCheckedChange={() => toggleAvailability(product._id, 'canRepair', product.canRepair)} /></td>
                                        <td className="p-3 text-right">
                                            <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(product)}><Edit className="w-4 h-4" /></Button>
                                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => {
                                                toast("Delete product?", {
                                                    description: "This action cannot be undone.",
                                                    action: {
                                                        label: "Delete",
                                                        onClick: () => deleteMutation.mutate(product._id)
                                                    },
                                                    cancel: { label: "Cancel", onClick: () => { } }
                                                });
                                            }}><Trash2 className="w-4 h-4" /></Button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {pagination && pagination.pages > 1 && (
                        <div className="py-2">
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            href="#"
                                            onClick={(e) => { e.preventDefault(); if (page > 1) setPage(page - 1); }}
                                            className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>

                                    {/* Simple pagination logic for now - can be improved for many pages */}
                                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                                        <PaginationItem key={p}>
                                            <PaginationLink
                                                href="#"
                                                isActive={page === p}
                                                onClick={(e) => { e.preventDefault(); setPage(p); }}
                                            >
                                                {p}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem>
                                        <PaginationNext
                                            href="#"
                                            onClick={(e) => { e.preventDefault(); if (page < pagination.pages) setPage(page + 1); }}
                                            className={page >= pagination.pages ? "pointer-events-none opacity-50" : ""}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
