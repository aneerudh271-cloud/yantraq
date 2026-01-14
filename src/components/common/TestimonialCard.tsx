import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '@/data/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-glow transition-all duration-300">
        <CardContent className="p-6">
          <Quote className="w-10 h-10 text-primary/20 mb-4" />
          
          <p className="text-muted-foreground mb-6 leading-relaxed">
            "{testimonial.message}"
          </p>
          
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < testimonial.rating
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-muted'
                }`}
              />
            ))}
          </div>
          
          <div className="border-t pt-4">
            <p className="font-display font-semibold">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">
              {testimonial.designation} • {testimonial.industry}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
