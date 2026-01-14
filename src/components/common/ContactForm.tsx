import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { api } from '@/lib/api';
import { company, getWhatsAppLink } from '@/data/company';

interface ContactFormProps {
  defaultService?: string;
  productName?: string;
}

export const ContactForm = ({ defaultService, productName }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: defaultService || '',
    message: productName ? `I am interested in: ${productName}` : '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await api.post('/leads', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        productService: formData.service,
        enquiryType: formData.service as 'buy' | 'rent' | 'repair' | 'amc' | 'other',
        message: formData.message,
      });

      toast.success('Thank you! We will contact you shortly.');
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (error) {
      toast.error('Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const message = `Hi! I am ${formData.name}.\n\nService: ${formData.service}\n\n${formData.message}`;
    window.open(getWhatsAppLink(message), '_blank');
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="service">Service Type *</Label>
          <Select
            value={formData.service}
            onValueChange={(value) => setFormData({ ...formData, service: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="buy">Buy New Product</SelectItem>
              <SelectItem value="buy-refurbished">Buy Refurbished</SelectItem>
              <SelectItem value="rent">Rent Equipment</SelectItem>
              <SelectItem value="repair">Repair Service</SelectItem>
              <SelectItem value="amc">AMC Service</SelectItem>
              <SelectItem value="other">Other Inquiry</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your requirements..."
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          type="submit"
          className="flex-1 gradient-primary gap-2"
          disabled={isSubmitting}
        >
          <Send className="w-4 h-4" />
          {isSubmitting ? 'Sending...' : 'Send Inquiry'}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1 border-green-500 text-green-600 hover:bg-green-50 gap-2"
          onClick={handleWhatsApp}
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </Button>
      </div>
    </motion.form>
  );
};
