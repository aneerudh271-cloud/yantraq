import { useParams, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { ContactForm } from '@/components/common/ContactForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getProductById, categories } from '@/data/products';
import { 
  ShoppingCart, 
  Clock, 
  Wrench, 
  ArrowLeft,
  CheckCircle,
  MessageCircle
} from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const action = searchParams.get('action') || 'buy';
  
  const product = getProductById(id || '');
  const category = categories.find(c => c.id === product?.category);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const actionLabels = {
    buy: 'Buy This Product',
    rent: 'Rent This Product',
    repair: 'Repair Service',
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/products" className="hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Products
          </Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-foreground">
            {category?.name}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-muted mb-6">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">
                {category?.icon} {category?.name}
              </Badge>
              {product.canBuy && <Badge className="bg-primary">Buy</Badge>}
              {product.canRent && <Badge className="bg-accent">Rent</Badge>}
              {product.canRepair && <Badge variant="outline">Repair</Badge>}
            </div>

            <h1 className="font-display text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-muted-foreground mb-6">{product.fullDescription}</p>

            <div className="flex flex-wrap gap-4 mb-6">
              {product.canBuy && (
                <div className="px-4 py-2 bg-primary/10 rounded-lg">
                  <span className="text-sm text-muted-foreground">Buy Price</span>
                  <p className="font-display font-bold text-lg text-primary">{product.price}</p>
                </div>
              )}
              {product.canRent && (
                <div className="px-4 py-2 bg-accent/10 rounded-lg">
                  <span className="text-sm text-muted-foreground">Rent Price</span>
                  <p className="font-display font-bold text-lg text-accent">{product.rentPrice}</p>
                </div>
              )}
            </div>

            <h3 className="font-display font-semibold text-lg mb-3">Key Features</h3>
            <ul className="space-y-2 mb-6">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle className="w-5 h-5 text-success" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex gap-3">
              {product.canBuy && (
                <Button className="gap-2" size="lg">
                  <ShoppingCart className="w-5 h-5" />
                  Buy Now
                </Button>
              )}
              {product.canRent && (
                <Button variant="outline" className="gap-2" size="lg">
                  <Clock className="w-5 h-5" />
                  Rent
                </Button>
              )}
              {product.canRepair && (
                <Button variant="outline" className="gap-2" size="lg">
                  <Wrench className="w-5 h-5" />
                  Repair
                </Button>
              )}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="font-display text-xl font-bold mb-2">
                  {actionLabels[action as keyof typeof actionLabels]}
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
                <ContactForm 
                  defaultService={action} 
                  productName={product.name} 
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
