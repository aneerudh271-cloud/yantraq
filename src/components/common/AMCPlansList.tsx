import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface AMCPlan {
    _id: string;
    name: string;
    price: string;
    features: string[];
    popular: boolean;
}

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

    if (plans.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                No active AMC plans available at the moment.
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((plan: AMCPlan, index: number) => (
                <motion.div
                    key={plan._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                >
                    <Card className={`h-full ${plan.popular ? 'border-primary shadow-glow' : ''}`}>
                        <CardContent className="p-6">
                            {plan.popular && (
                                <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full mb-4">
                                    Most Popular
                                </span>
                            )}
                            <h3 className="font-display text-xl font-bold mb-2">{plan.name}</h3>
                            <p className="font-display text-3xl font-bold text-primary mb-6">{plan.price}</p>
                            <ul className="space-y-3 mb-6">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm">
                                        <CheckCircle className="w-4 h-4 text-success mt-0.5" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/contact">
                                <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                                    Get Quote
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};
