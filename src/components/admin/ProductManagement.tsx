import { useState, useMemo, useEffect } from 'react';
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
import { Package, Settings, Plus, Edit, Trash2, Loader2, Upload, Search, X, Check, ChevronsUpDown } from 'lucide-react';
import { api } from '@/lib/api';
import { getUploadUrl } from '@/lib/uploadUtils';
import { toast } from 'sonner';
import { categories as staticCategories } from '@/data/products';
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Product {
    _id: string;
    name: string;
    category: string;
    description: string;
    fullDescription: string;
    image: string;
    images?: string[];
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
    const [filterCategory, setFilterCategory] = useState("all");
    const [page, setPage] = useState(1);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [openCategory, setOpenCategory] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    // Basic form data
    const [formData, setFormData] = useState<Partial<Product>>({
        name: '',
        category: 'cctv',
        description: '',
        fullDescription: '',
        image: '/placeholder.svg',
        images: [],
        canBuy: true,
        canRent: true,
        canRepair: true,
        price: '',
        rentPrice: '',
        features: [],
    });

    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['products', page, debouncedSearch, filterCategory],
        queryFn: () => {
            const params = new URLSearchParams();
            params.set('page', page.toString());
            params.set('limit', '20');
            if (debouncedSearch) params.set('search', debouncedSearch); // Server-side search
            if (filterCategory && filterCategory !== 'all') params.set('category', filterCategory);
            return api.get(`/products?${params.toString()}`);
        },
    });

    const { data: fetchedCategories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: () => api.get('/products/categories'),
    });

    const allCategories = useMemo(() => {
        const uniqueCategories = new Map();

        // Add static categories first
        staticCategories.forEach(c => {
            uniqueCategories.set(c.id, { id: c.id, name: c.name });
        });

        // Add fetched categories if not present
        if (Array.isArray(fetchedCategories)) {
            fetchedCategories.forEach((cat: string) => {
                if (!uniqueCategories.has(cat)) {
                    // Capitalize first letter for display name if it's a simple string ID
                    const name = cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ');
                    uniqueCategories.set(cat, { id: cat, name: name });
                }
            });
        }

        // Also add the current form category if it's new/custom
        if (formData.category && !uniqueCategories.has(formData.category)) {
            const name = formData.category.charAt(0).toUpperCase() + formData.category.slice(1).replace(/-/g, ' ');
            uniqueCategories.set(formData.category, { id: formData.category, name: name });
        }

        return Array.from(uniqueCategories.values());
    }, [fetchedCategories, formData.category]);


    const products: Product[] = data?.products || [];
    const pagination = data?.pagination;

    const createMutation = useMutation({
        mutationFn: (data: any) => api.post('/products', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['categories'] });
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
            queryClient.invalidateQueries({ queryKey: ['categories'] });
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
            queryClient.invalidateQueries({ queryKey: ['categories'] });
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
            images: [],
            canBuy: true,
            canRent: true,
            canRepair: true,
            price: '',
            rentPrice: '',
            features: [],
        });
        setEditingProduct(null);
        setSearchValue("");
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

    if (isLoading && !data) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

    const totalProducts = pagination?.total || products.length;

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Products', value: totalProducts, icon: Package },
                    { label: 'Categories', value: allCategories.length, icon: Settings },
                    { label: 'Displaying', value: products.length, icon: Package }, // Showing current page count
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
                                className="w-full md:w-64 pl-9 pr-10"
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                            {isFetching ? (
                                <Loader2 className="absolute right-3 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
                            ) : search ? (
                                <button onClick={() => handleSearch('')} className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground">
                                    <X className="w-4 h-4" />
                                </button>
                            ) : null}
                        </div>
                        <div className="w-[180px]">
                            <Select
                                value={filterCategory}
                                onValueChange={(val) => {
                                    setFilterCategory(val);
                                    setPage(1);
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="All Categories" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {allCategories.map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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
                                        <div className="space-y-2 flex flex-col">
                                            <Label>Category</Label>
                                            <Popover open={openCategory} onOpenChange={setOpenCategory}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        aria-expanded={openCategory}
                                                        className="justify-between"
                                                    >
                                                        {formData.category
                                                            ? allCategories.find((category) => category.id === formData.category)?.name || formData.category
                                                            : "Select category..."}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                                    <Command>
                                                        <CommandInput
                                                            placeholder="Search category..."
                                                            onValueChange={setSearchValue}
                                                        />
                                                        <CommandList>
                                                            <CommandEmpty>
                                                                <div className="flex flex-col items-center gap-2 p-2">
                                                                    <p className="text-sm text-muted-foreground">No category found.</p>
                                                                    <Button
                                                                        variant="secondary"
                                                                        size="sm"
                                                                        className="w-full"
                                                                        onClick={() => {
                                                                            // Create new category logic: just set the value
                                                                            const newCat = searchValue.toLowerCase().replace(/\s+/g, '-');
                                                                            setFormData({ ...formData, category: newCat });
                                                                            setOpenCategory(false);
                                                                            toast.info(`New category "${searchValue}" selected. Save product to persist.`);
                                                                        }}
                                                                    >
                                                                        Create "{searchValue}"
                                                                    </Button>
                                                                </div>
                                                            </CommandEmpty>
                                                            <CommandGroup>
                                                                {allCategories.map((category) => (
                                                                    <CommandItem
                                                                        key={category.id}
                                                                        value={category.name} // Search by name
                                                                        onSelect={() => {
                                                                            setFormData({ ...formData, category: category.id });
                                                                            setOpenCategory(false);
                                                                        }}
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
                                                                                formData.category === category.id ? "opacity-100" : "opacity-0"
                                                                            )}
                                                                        />
                                                                        {category.name}
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
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
                                    <div className="space-y-4 border p-4 rounded-md bg-muted/10">
                                        <Label className="font-semibold">Product Images</Label>

                                        {/* Primary Image */}
                                        <div className="space-y-2">
                                            <Label>Primary Image</Label>
                                            <div className="flex gap-2 items-center">
                                                <Input
                                                    value={formData.image}
                                                    onChange={e => setFormData({ ...formData, image: e.target.value })}
                                                    placeholder="Primary Image URL"
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
                                                            const headers: HeadersInit = token ? { 'Authorization': `Bearer ${token}` } : {};

                                                            try {
                                                                toast.loading('Uploading...', { id: 'upload-primary' });
                                                                const res = await fetch(getUploadUrl(), { method: 'POST', headers, body: uploadFormData });
                                                                if (!res.ok) throw new Error('Upload failed');
                                                                const data = await res.json();
                                                                setFormData(prev => ({ ...prev, image: data.url }));
                                                                toast.success('Uploaded!', { id: 'upload-primary' });
                                                            } catch (err) {
                                                                toast.error('Upload failed', { id: 'upload-primary' });
                                                            }
                                                        }}
                                                    />
                                                    <Button type="button" variant="outline" size="icon"><Upload className="w-4 h-4" /></Button>
                                                </div>
                                            </div>
                                            {formData.image && <img src={formData.image} alt="Primary" className="w-20 h-20 object-cover rounded mt-2 border" />}
                                        </div>

                                        {/* Additional Images */}
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <Label>Additional Images (Carousel)</Label>
                                            </div>

                                            {/* Add Image Controls */}
                                            <div className="flex flex-col gap-3 p-3 border rounded-md bg-muted/20">
                                                <Label className="text-xs text-muted-foreground uppercase font-semibold">Add New Image</Label>

                                                {/* Option 1: URL */}
                                                <div className="flex gap-2">
                                                    <Input
                                                        placeholder="Enter image URL..."
                                                        id="url-input-images"
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault();
                                                                const val = e.currentTarget.value;
                                                                if (val.trim()) {
                                                                    setFormData(prev => ({ ...prev, images: [...(prev.images || []), val.trim()] }));
                                                                    e.currentTarget.value = '';
                                                                }
                                                            }
                                                        }}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="secondary"
                                                        onClick={() => {
                                                            const input = document.getElementById('url-input-images') as HTMLInputElement;
                                                            if (input && input.value.trim()) {
                                                                setFormData(prev => ({ ...prev, images: [...(prev.images || []), input.value.trim()] }));
                                                                input.value = '';
                                                            }
                                                        }}
                                                    >
                                                        Add URL
                                                    </Button>
                                                </div>

                                                <div className="relative flex items-center gap-2">
                                                    <div className="h-px bg-border flex-1" />
                                                    <span className="text-xs text-muted-foreground">OR</span>
                                                    <div className="h-px bg-border flex-1" />
                                                </div>

                                                {/* Option 2: Upload */}
                                                <div className="relative">
                                                    <Button type="button" variant="outline" className="w-full gap-2 dashed-border">
                                                        <Upload className="w-4 h-4" /> Upload from Computer
                                                    </Button>
                                                    <Input
                                                        type="file"
                                                        multiple
                                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                                        onChange={async (e) => {
                                                            const files = e.target.files;
                                                            if (!files || files.length === 0) return;

                                                            const token = localStorage.getItem('token');
                                                            const headers: HeadersInit = token ? { 'Authorization': `Bearer ${token}` } : {};

                                                            const newImages = [...(formData.images || [])];

                                                            for (let i = 0; i < files.length; i++) {
                                                                const file = files[i];
                                                                const uploadFormData = new FormData();
                                                                uploadFormData.append('file', file);

                                                                try {
                                                                    toast.loading(`Uploading ${i + 1}/${files.length}...`, { id: 'upload-multi' });
                                                                    const res = await fetch(getUploadUrl(), { method: 'POST', headers, body: uploadFormData });
                                                                    if (!res.ok) throw new Error('Upload failed');
                                                                    const data = await res.json();
                                                                    newImages.push(data.url);
                                                                } catch (err) {
                                                                    console.error(err);
                                                                    toast.error(`Failed to upload ${file.name}`);
                                                                }
                                                            }

                                                            setFormData(prev => ({ ...prev, images: newImages }));
                                                            toast.success('Finished uploading', { id: 'upload-multi' });
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            {/* Images Grid */}
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                                                {(formData.images || []).map((img, i) => (
                                                    <div key={i} className="relative group border rounded-md overflow-hidden bg-background aspect-square">
                                                        <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                const newImages = [...(formData.images || [])];
                                                                newImages.splice(i, 1);
                                                                setFormData({ ...formData, images: newImages });
                                                            }}
                                                            className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/90"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                            {(!formData.images || formData.images.length === 0) && (
                                                <p className="text-sm text-muted-foreground italic text-center py-2">No additional images added.</p>
                                            )}
                                        </div>
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
                                        <td className="p-3">
                                            <Badge variant="secondary">
                                                {allCategories.find(c => c.id === product.category)?.name || product.category}
                                            </Badge>
                                        </td>
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
