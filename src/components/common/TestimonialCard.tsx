import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';
import type { Testimonial } from '@/data/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const truncatedMessage = testimonial.message.length > 150
    ? testimonial.message.substring(0, 150) + '...'
    : testimonial.message;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full hover:shadow-glow transition-all duration-300 min-h-[320px] flex flex-col">
        <CardContent className="p-6 flex-1 flex flex-col">
          <Quote className="w-10 h-10 text-primary/20 mb-4" />

          <div className="flex-1">
            <p className="text-muted-foreground mb-4 leading-relaxed">
              "{truncatedMessage}"
            </p>
            {testimonial.message.length > 150 && (
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80">
                    Read More
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Testimonial from {testimonial.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Quote className="w-12 h-12 text-primary/20" />
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      "{testimonial.message}"
                    </p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < testimonial.rating
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-muted'
                            }`}
                        />
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-display font-semibold text-lg">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.designation} • {testimonial.industry}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < testimonial.rating
                  ? 'text-yellow-500 fill-yellow-500'
                  : 'text-muted'
                  }`}
              />
            ))}
          </div>

          <div className="border-t pt-4 mt-auto">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={testimonial.image} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-display font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.designation} • {testimonial.industry}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
