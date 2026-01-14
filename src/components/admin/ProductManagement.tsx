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
import { Package, Settings, Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { categories } from '@/data/products'; // Keep categories for now or fetch them if they were dynamic

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
    });

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: () => api.get('/products'),
    });

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

        const payload = { ...formData, features: [] }; // Handle features later if needed

        if (editingProduct) {
            updateMutation.mutate({ id: editingProduct._id, data: payload });
        } else {
            createMutation.mutate(payload);
        }
    };

    const toggleAvailability = (id: string, field: 'canBuy' | 'canRent' | 'canRepair', currentValue: boolean) => {
        updateStatusMutation.mutate({ id, data: { [field]: !currentValue } });
    };

    const filteredProducts = products.filter((p: Product) => p.name.toLowerCase().includes(search.toLowerCase()));

    if (isLoading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Products', value: products.length, icon: Package },
                    { label: 'Categories', value: categories.length, icon: Settings },
                    { label: 'For Sale', value: products.filter((p: Product) => p.canBuy).length, icon: Package },
                    { label: 'For Rent', value: products.filter((p: Product) => p.canRent).length, icon: Package },
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
                                        <Label>Image URL</Label>
                                        <Input value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} />
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
                                {filteredProducts.map((product: Product) => (
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
                                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteMutation.mutate(product._id)}><Trash2 className="w-4 h-4" /></Button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
