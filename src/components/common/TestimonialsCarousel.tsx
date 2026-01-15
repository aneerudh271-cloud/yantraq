import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { TestimonialCard } from './TestimonialCard';
import type { Testimonial } from '@/data/testimonials';

interface TestimonialsCarouselProps {
    testimonials: Testimonial[];
}

export const TestimonialsCarousel = ({ testimonials }: TestimonialsCarouselProps) => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    return (
        <div className="relative">
            <Carousel
                setApi={setApi}
                className="w-full"
                opts={{
                    align: 'start',
                    loop: true,
                }}
                plugins={[plugin.current]}
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {testimonials.map((testimonial, index) => (
                        <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                            <TestimonialCard testimonial={testimonial} index={index} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex" />
                <CarouselNext className="hidden md:flex" />
            </Carousel>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: count }, (_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${index === current - 1 ? 'bg-primary' : 'bg-muted'
                            }`}
                        onClick={() => api?.scrollTo(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};