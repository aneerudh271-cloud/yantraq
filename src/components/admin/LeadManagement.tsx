import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
// ... imports
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Phone, Mail, Calendar, Search, Loader2, Edit, Plus } from 'lucide-react';

import { api } from '@/lib/api';
import { toast } from 'sonner';

const statusColors: Record<string, string> = {
  'new': 'bg-blue-500',
  'in-progress': 'bg-yellow-500',
  'closed': 'bg-green-500',
};

const typeLabels: Record<string, string> = {
  buy: 'Buy',
  'buy-refurbished': 'Refurbished',
  rent: 'Rent',
  repair: 'Repair',
  amc: 'AMC',
  other: 'Other',
};

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  productService: string;
  enquiryType: 'buy' | 'buy-refurbished' | 'rent' | 'repair' | 'amc' | 'other';
  message: string;
  status: 'new' | 'in-progress' | 'closed';
  createdAt: string;
}

export const LeadManagement = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [formData, setFormData] = useState<Partial<Lead>>({
    name: '',
    email: '',
    phone: '',
    productService: '',
    enquiryType: 'buy',
    message: '',
    status: 'new',
  });

  const queryClient = useQueryClient();

  // Fetch leads
  const { data: leads = [], isLoading, error } = useQuery({
    queryKey: ['leads'],
    queryFn: () => api.get('/leads'),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => api.post('/leads', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead created successfully!');
      setIsDialogOpen(false);
      resetForm();
    },
    onError: () => toast.error('Failed to create lead'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.put(`/leads/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead updated successfully!');
      setIsDialogOpen(false);
      resetForm();
    },
    onError: () => toast.error('Failed to update lead'),
  });

  // Status update only
  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Lead['status'] }) =>
      api.put(`/leads/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead status updated!');
    },
    onError: () => {
      toast.error('Failed to update lead status');
    },
  });

  // Delete lead mutation
  const deleteLeadMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/leads/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead removed!');
    },
    onError: () => {
      toast.error('Failed to remove lead');
    },
  });

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      productService: '',
      enquiryType: 'buy',
      message: '',
      status: 'new',
    });
    setEditingLead(null);
  };

  const handleOpenDialog = (lead?: Lead) => {
    if (lead) {
      setEditingLead(lead);
      setFormData({ ...lead });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Name, Email and Phone are required');
      return;
    }

    if (editingLead) {
      updateMutation.mutate({ id: editingLead._id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      lead.productService.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (error) {
    return <div className="p-4 text-red-500">Error loading leads: {(error as Error).message}</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row items-center justify-between flex-wrap gap-4">
        <CardTitle>Lead Management</CardTitle>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search leads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-full md:w-64"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="gap-2 w-full md:w-auto">
                <Plus className="w-4 h-4" /> Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingLead ? 'Edit Lead' : 'Create Lead'}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name *</Label>
                    <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Phone *</Label>
                    <Input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label>Enquiry Type</Label>
                    <Select value={formData.enquiryType} onValueChange={v => setFormData({ ...formData, enquiryType: v as any })}>
                      <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                      <SelectContent>
                        {Object.entries(typeLabels).map(([key, label]) => (
                          <SelectItem key={key} value={key}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Product / Service</Label>
                  <Input value={formData.productService} onChange={e => setFormData({ ...formData, productService: e.target.value })} placeholder="e.g. CCTV Camera X100" />
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} rows={4} />
                </div>
                {!editingLead && (
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={formData.status} onValueChange={v => setFormData({ ...formData, status: v as any })}>
                      <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <Button onClick={handleSubmit}>{editingLead ? 'Update' : 'Create'}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Client</th>
                  <th className="text-left p-3 font-medium">Product/Service</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Date</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-right p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <motion.tr
                    key={lead._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b hover:bg-muted/50"
                  >
                    <td className="p-3">
                      <div>
                        <p className="font-medium">{lead.name}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {lead.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" /> {lead.phone}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <p className="text-sm">{lead.productService}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{lead.message}</p>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">{typeLabels[lead.enquiryType]}</Badge>
                    </td>
                    <td className="p-3">
                      <span className="text-sm flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(lead.createdAt)}
                      </span>
                    </td>
                    <td className="p-3">
                      <Select
                        value={lead.status}
                        onValueChange={(value: Lead['status']) =>
                          updateStatusMutation.mutate({ id: lead._id, status: value })
                        }
                        disabled={updateStatusMutation.isPending}
                      >
                        <SelectTrigger className="w-32">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${statusColors[lead.status]}`} />
                            <span className="capitalize">{lead.status.replace('-', ' ')}</span>
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-blue-500" />
                              New
                            </div>
                          </SelectItem>
                          <SelectItem value="in-progress">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-yellow-500" />
                              In Progress
                            </div>
                          </SelectItem>
                          <SelectItem value="closed">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-green-500" />
                              Closed
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="p-3 text-right">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleOpenDialog(lead)}
                        className="mr-2"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => {
                          toast("Delete lead?", {
                            description: "This action cannot be undone.",
                            action: {
                              label: "Delete",
                              onClick: () => deleteLeadMutation.mutate(lead._id)
                            },
                            cancel: { label: "Cancel", onClick: () => { } }
                          });
                        }}
                        disabled={deleteLeadMutation.isPending}
                      >
                        {deleteLeadMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {filteredLeads.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No leads found matching your criteria.
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
