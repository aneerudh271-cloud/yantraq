import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Loader2, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Types
interface AMC {
    _id: string;
    name: string;
    contactPerson: string;
    email: string;
    phone: string;
    serviceType: string;
    startDate: string;
    endDate: string;
    status: 'active' | 'expired' | 'pending';
    amount?: number;
    notes?: string;
}

interface AMCPlan {
    _id: string;
    name: string;
    price: string;
    features: string[];
    popular: boolean;
    isActive: boolean;
}

export const AMCManagement = () => {
    return (
        <Tabs defaultValue="contracts" className="space-y-6">
            <TabsList>
                <TabsTrigger value="contracts">Client Contracts</TabsTrigger>
                <TabsTrigger value="plans">Service Plans (Public)</TabsTrigger>
            </TabsList>
            <TabsContent value="contracts">
                <ClientContracts />
            </TabsContent>
            <TabsContent value="plans">
                <PlanManagement />
            </TabsContent>
        </Tabs>
    );
};

// Sub-component for existing functionality
const ClientContracts = () => {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [editingAMC, setEditingAMC] = useState<AMC | null>(null);
    const queryClient = useQueryClient();

    const { data: amcs, isLoading } = useQuery({
        queryKey: ['amcs'],
        queryFn: () => api.get('/amc'),
    });

    const createMutation = useMutation({
        mutationFn: (data: Partial<AMC>) => api.post('/amc', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['amcs'] });
            setIsOpen(false);
            toast.success('AMC created successfully');
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<AMC> }) =>
            api.put(`/amc/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['amcs'] });
            setIsOpen(false);
            setEditingAMC(null);
            toast.success('AMC updated successfully');
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => api.delete(`/amc/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['amcs'] });
            toast.success('AMC deleted successfully');
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = {
            name: formData.get('name') as string,
            contactPerson: formData.get('contactPerson') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            serviceType: formData.get('serviceType') as string,
            startDate: formData.get('startDate') as string,
            endDate: formData.get('endDate') as string,
            status: formData.get('status') as 'active' | 'expired' | 'pending',
            amount: Number(formData.get('amount')) || undefined,
            notes: formData.get('notes') as string,
        };

        if (editingAMC) {
            updateMutation.mutate({ id: editingAMC._id, data });
        } else {
            createMutation.mutate(data);
        }
    };

    const handleEdit = (amc: AMC) => {
        setEditingAMC(amc);
        setIsOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this AMC record?')) {
            deleteMutation.mutate(id);
        }
    };

    const filteredAMCs = amcs?.filter((amc: AMC) =>
        amc.name.toLowerCase().includes(search.toLowerCase()) ||
        amc.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
        amc.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        placeholder="Search AMCs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <Dialog open={isOpen} onOpenChange={(open) => {
                    setIsOpen(open);
                    if (!open) setEditingAMC(null);
                }}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="w-4 h-4" />
                            Add Contract
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingAMC ? 'Edit Contract' : 'Add New Contract'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Contract Name/Company</Label>
                                    <Input id="name" name="name" defaultValue={editingAMC?.name} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="contactPerson">Contact Person</Label>
                                    <Input id="contactPerson" name="contactPerson" defaultValue={editingAMC?.contactPerson} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" name="email" type="email" defaultValue={editingAMC?.email} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input id="phone" name="phone" defaultValue={editingAMC?.phone} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="serviceType">Service Type</Label>
                                    <Input id="serviceType" name="serviceType" defaultValue={editingAMC?.serviceType} required placeholder="e.g. CCTV, Server, Network" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="amount">Amount (Optional)</Label>
                                    <Input id="amount" name="amount" type="number" defaultValue={editingAMC?.amount} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="startDate">Start Date</Label>
                                    <Input
                                        id="startDate"
                                        name="startDate"
                                        type="date"
                                        defaultValue={editingAMC?.startDate ? new Date(editingAMC.startDate).toISOString().split('T')[0] : ''}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="endDate">End Date</Label>
                                    <Input
                                        id="endDate"
                                        name="endDate"
                                        type="date"
                                        defaultValue={editingAMC?.endDate ? new Date(editingAMC.endDate).toISOString().split('T')[0] : ''}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <select
                                        id="status"
                                        name="status"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        defaultValue={editingAMC?.status || 'active'}
                                    >
                                        <option value="active">Active</option>
                                        <option value="pending">Pending</option>
                                        <option value="expired">Expired</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Input id="notes" name="notes" defaultValue={editingAMC?.notes} />
                            </div>
                            <Button type="submit" className="w-full" disabled={createMutation.isPending || updateMutation.isPending}>
                                {createMutation.isPending || updateMutation.isPending ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    editingAMC ? 'Update Contract' : 'Create Contract'
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">
                                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                                </TableCell>
                            </TableRow>
                        ) : filteredAMCs?.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                    No AMC records found
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredAMCs?.map((amc: AMC) => (
                                <TableRow key={amc._id}>
                                    <TableCell className="font-medium">
                                        {amc.name}
                                        <div className="text-xs text-muted-foreground">{amc.email}</div>
                                    </TableCell>
                                    <TableCell>
                                        {amc.contactPerson}
                                        <div className="text-xs text-muted-foreground">{amc.phone}</div>
                                    </TableCell>
                                    <TableCell>{amc.serviceType}</TableCell>
                                    <TableCell>
                                        <div className="text-sm">
                                            {format(new Date(amc.startDate), 'MMM d, yyyy')} -
                                            <br />
                                            {format(new Date(amc.endDate), 'MMM d, yyyy')}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            amc.status === 'active' ? 'default' :
                                                amc.status === 'expired' ? 'destructive' : 'secondary'
                                        }>
                                            {amc.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(amc)}>
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(amc._id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

// Sub-component for Plan Management
const PlanManagement = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState<AMCPlan | null>(null);
    const queryClient = useQueryClient();

    const { data: plans, isLoading } = useQuery({
        queryKey: ['amc-plans-admin'],
        queryFn: () => api.get('/amc-plans/all'),
    });

    const createMutation = useMutation({
        mutationFn: (data: Partial<AMCPlan>) => api.post('/amc-plans', data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['amc-plans-admin'] });
            setIsOpen(false);
            toast.success('Plan created successfully');
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<AMCPlan> }) =>
            api.put(`/amc-plans/${id}`, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['amc-plans-admin'] });
            setIsOpen(false);
            setEditingPlan(null);
            toast.success('Plan updated successfully');
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => api.delete(`/amc-plans/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['amc-plans-admin'] });
            toast.success('Plan deleted successfully');
        },
        onError: (error: any) => {
            toast.error(error.message);
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const data = {
            name: formData.get('name') as string,
            price: formData.get('price') as string,
            features: (formData.get('features') as string).split('\n').filter(Boolean),
            popular: formData.get('popular') === 'on',
            isActive: formData.get('isActive') === 'on',
        };

        if (editingPlan) {
            updateMutation.mutate({ id: editingPlan._id, data });
        } else {
            createMutation.mutate(data);
        }
    };

    const handleEdit = (plan: AMCPlan) => {
        setEditingPlan(plan);
        setIsOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this plan?')) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Dialog open={isOpen} onOpenChange={(open) => {
                    setIsOpen(open);
                    if (!open) setEditingPlan(null);
                }}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="w-4 h-4" />
                            Add Plan
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>{editingPlan ? 'Edit Plan' : 'Add New Plan'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Plan Name</Label>
                                <Input id="name" name="name" defaultValue={editingPlan?.name} required placeholder="e.g. Standard" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="price">Price Display</Label>
                                <Input id="price" name="price" defaultValue={editingPlan?.price} required placeholder="e.g. ₹12,000/year" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="features">Features (One per line)</Label>
                                <Textarea
                                    id="features"
                                    name="features"
                                    className="min-h-[100px]"
                                    defaultValue={editingPlan?.features.join('\n')}
                                    required
                                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="popular"
                                        name="popular"
                                        className="h-4 w-4 rounded border-gray-300"
                                        defaultChecked={editingPlan?.popular}
                                    />
                                    <Label htmlFor="popular">Mark as Popular</Label>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="isActive"
                                        name="isActive"
                                        className="h-4 w-4 rounded border-gray-300"
                                        defaultChecked={editingPlan?.isActive ?? true}
                                    />
                                    <Label htmlFor="isActive">Active</Label>
                                </div>
                            </div>
                            <Button type="submit" className="w-full" disabled={createMutation.isPending || updateMutation.isPending}>
                                {createMutation.isPending || updateMutation.isPending ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    editingPlan ? 'Update Plan' : 'Create Plan'
                                )}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-3 flex justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    plans?.map((plan: AMCPlan) => (
                        <div key={plan._id} className={`border rounded-xl p-6 relative bg-card ${!plan.isActive ? 'opacity-60' : ''}`}>
                            {plan.popular && (
                                <Badge className="absolute top-4 right-4">Popular</Badge>
                            )}
                            <div className="mb-4">
                                <h3 className="text-xl font-bold">{plan.name}</h3>
                                <p className="text-2xl font-bold text-primary">{plan.price}</p>
                            </div>
                            <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                                {plan.features.slice(0, 3).map((f, i) => (
                                    <li key={i}>• {f}</li>
                                ))}
                                {plan.features.length > 3 && <li>+ {plan.features.length - 3} more...</li>}
                            </ul>
                            <div className="flex gap-2">
                                <Button variant="outline" className="flex-1" onClick={() => handleEdit(plan)}>
                                    <Edit className="w-4 h-4 mr-2" /> Edit
                                </Button>
                                <Button variant="ghost" className="text-destructive" onClick={() => handleDelete(plan._id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
