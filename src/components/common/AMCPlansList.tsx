import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

interface AMCPlan {
    _id: string;
    name: string;
    price: string;
    features: string[];
    popular: boolean;
}

const fallbackPlans: AMCPlan[] = [
    {
        _id: 'basic-1',
        name: 'Basic Plan',
        price: '₹2,000/yr',
        features: [
            '2 Preventive Maintenance Visits per year',
            'Telephone & Remote Desktop Support',
            'Standard Response Time (24-48 hrs)',
            'Basic Hardware Health Check',
            'Anti-virus Updates & Scans',
            'OS Optimization & Cleanup',
        ],
        popular: false,
    },
    {
        _id: 'standard-2',
        name: 'Standard Plan',
        price: '₹4,500/yr',
        features: [
            '4 Preventive Maintenance Visits per year',
            'Priority Telephone & Remote Support',
            'Fast Response Time (12-24 hrs)',
            'Comprehensive Hardware Diagnostics',
            'Network & Wi-Fi Troubleshooting',
            'Data Backup Configuration',
            'Printer & Peripheral Support',
            'Discounted Spare Parts',
        ],
        popular: true,
    },
    {
        _id: 'premium-3',
        name: 'Premium Plan',
        price: '₹8,000/yr',
        features: [
            '12 Preventive Maintenance Visits (Monthly)',
            '24/7 Priority Support Line',
            'Rapid Response Time (4-8 hrs)',
            'Dedicated Account Manager',
            'Free Minor Spare Parts Replacement',
            'Standby Equipment during Repairs',
            'Complete Network Security Audit',
            'Disaster Recovery Planning',
            'Quarterly IT Strategy Review',
        ],
        popular: false,
    },
];

export const AMCPlansList = () => {
    const { data: plans = [], isLoading } = useQuery({
        queryKey: ['amc-plans-public'],
        queryFn: () => api.get('/amc-plans'),
    });

    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    const displayPlans = plans.length > 0 ? plans : fallbackPlans;

    return (
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {displayPlans.map((plan: AMCPlan, index: number) => (
                <motion.div
                    key={plan._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                >
                    <Card className={`h-full flex flex-col ${plan.popular ? 'border-primary shadow-glow' : ''}`}>
                        <CardContent className="p-6 flex flex-col flex-grow">
                            <div>
                                {plan.popular && (
                                    <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full mb-4">
                                        Most Popular
                                    </span>
                                )}
                                <h3 className="font-display text-xl font-bold mb-2">{plan.name}</h3>
                                <p className="font-display text-3xl font-bold text-primary mb-6">{plan.price}</p>
                            </div>
                            
                            <ul className="space-y-3 mb-6 flex-grow">
                                {plan.features.slice(0, 4).map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                        <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                                        <span className="flex-1">{feature}</span>
                                    </li>
                                ))}
                                
                                {plan.features.length > 4 && (
                                    <li className="pt-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1 text-left w-full outline-none">
                                                    + {plan.features.length - 4} more features included
                                                </button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-md w-[95vw]">
                                                <DialogHeader>
                                                    <DialogTitle>{plan.name} - Complete Plan Features</DialogTitle>
                                                </DialogHeader>
                                                <div className="max-h-[60vh] overflow-y-auto pr-2 mt-4 space-y-4">
                                                    <ul className="space-y-3">
                                                        {plan.features.map((feature, i) => (
                                                            <li key={i} className="flex items-start gap-2 text-sm">
                                                                <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                                                                <span>{feature}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    </li>
                                )}
                            </ul>
                            
                            <div className="mt-auto pt-4">
                                <Link to="/contact">
                                    <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                                        Get Quote
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};
