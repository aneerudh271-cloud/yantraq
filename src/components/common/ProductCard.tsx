import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Clock, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="group overflow-hidden hover:shadow-glow transition-all duration-300">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {product.images && product.images.length > 1 ? (
            <Carousel
              plugins={[Autoplay({ delay: 3000 })]}
              opts={{ align: "start", loop: true, dragFree: false }}
              className="w-full h-full"
            >
              <CarouselContent>
                {product.images.map((img, i) => (
                  <CarouselItem key={i} className="basis-full">
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
        <CardContent className="p-4">
          <h3 className="font-display font-semibold text-lg mb-2 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {product.canBuy && (
              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                Buy {product.price}
              </span>
            )}
            {product.canRent && (
              <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                Rent {product.rentPrice}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            {product.canBuy && (
              <Link to={`/product/${product.id}?action=buy`} className="flex-1">
                <Button size="sm" className="w-full gap-1">
                  <ShoppingCart className="w-4 h-4" />
                  Buy
                </Button>
              </Link>
            )}
            {product.canRent && (
              <Link to={`/product/${product.id}?action=rent`} className="flex-1">
                <Button size="sm" variant="outline" className="w-full gap-1">
                  <Clock className="w-4 h-4" />
                  Rent
                </Button>
              </Link>
            )}
            {product.canRepair && (
              <Link to={`/product/${product.id}?action=repair`} aria-label={`Request repair service for ${product.name}`}>
                <Button size="sm" variant="ghost" className="gap-1" aria-label="Repair">
                  <Wrench className="w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
