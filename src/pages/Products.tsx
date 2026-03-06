import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ProductCard } from '@/components/common/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { categories as staticCategories } from '@/data/products';
import { Search, X, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';
import { SEO } from '@/components/common/SEO';
import { pageKeywords } from '@/data/seo-keywords';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Define local interface for API response
interface ApiProduct {
  _id: string;
  name: string;
  category: string;
  description: string;
  fullDescription: string;
  features: string[];
  image: string;
  price: string;
  canBuy: boolean;
  canRent: boolean;
  canRepair: boolean;
}

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');

  // Sync page with URL
  const page = parseInt(searchParams.get('page') || '1');
  const selectedCategory = searchParams.get('category') || 'all';

  const { data, isLoading } = useQuery({
    queryKey: ['products', page, selectedCategory, searchQuery],
    queryFn: () => {
      const params = new URLSearchParams();
      params.set('page', page.toString());
      params.set('limit', '20');
      if (selectedCategory !== 'all') params.set('category', selectedCategory);
      if (searchQuery) params.set('search', searchQuery);

      return api.get(`/products?${params.toString()}`);
    },
  });

  const { data: fetchedCategories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get('/products/categories'),
  });

  const allCategories = useMemo(() => {
    const uniqueCategories = new Map();

    // Add static categories first to preserve icons and nice names
    staticCategories.forEach(c => {
      uniqueCategories.set(c.id, { id: c.id, name: c.name, icon: c.icon });
    });

    // Add fetched categories if not present
    if (Array.isArray(fetchedCategories)) {
      fetchedCategories.forEach((cat: string) => {
        if (!uniqueCategories.has(cat)) {
          // Capitalize first letter for display name if it's a simple string ID
          const name = cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ');
          // Provide a default icon for new categories
          uniqueCategories.set(cat, { id: cat, name: name, icon: '📦' });
        }
      });
    }

    return Array.from(uniqueCategories.values());
  }, [fetchedCategories]);

  const products: ApiProduct[] = data?.products || [];
  const pagination = data?.pagination;

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    searchParams.set('page', '1'); // Reset to page 1
    setSearchParams(searchParams);
  };

  const handlePageChange = (newPage: number) => {
    searchParams.set('page', newPage.toString());
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    searchParams.set('page', '1'); // Reset to page 1
    // If searching, maybe clear category? Or keep it to search within category. 
    // Usually search is global or within context. Let's keep category context if set.
    setSearchParams(searchParams);
  };

  return (
    <Layout>
      <SEO
        title="IT Hardware Products — Buy, Rent & Repair in Bhopal"
        description="Buy or rent laptops, desktops, servers, CCTV cameras, biometric devices, GPS trackers, printers, networking equipment at best prices in Bhopal. Genuine products, flexible rental plans, same-day delivery by YantraQ."
        keywords={pageKeywords.products}
        pageCategory="hardware"
        ogType="product"
        articleSection="IT Hardware"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "YantraQ IT Hardware Products — Buy, Rent & Repair in Bhopal",
          "description": "Browse and buy or rent IT hardware products including laptops, desktops, servers, CCTV cameras, biometric devices, printers, GPS trackers and networking equipment in Bhopal, Madhya Pradesh.",
          "url": "https://yantraq.com/products",
          "isPartOf": { "@type": "WebSite", "name": "YantraQ", "url": "https://yantraq.com" },
          "about": [
            { "@type": "Thing", "name": "IT Hardware" },
            { "@type": "Thing", "name": "Laptop Sales & Rental" },
            { "@type": "Thing", "name": "CCTV Surveillance Systems" },
            { "@type": "Thing", "name": "Biometric Attendance Systems" },
            { "@type": "Thing", "name": "Enterprise Servers" },
            { "@type": "Thing", "name": "Networking Equipment" },
            { "@type": "Thing", "name": "GPS Tracking Devices" }
          ],
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yantraq.com/" },
              { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://yantraq.com/products" }
            ]
          }
        }}
      />
      {/* Hero */}
      <section className="py-16 gradient-dark text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              IT Hardware Products in Bhopal
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Buy, rent, or repair enterprise-grade IT hardware — laptops, servers, CCTV cameras, biometric devices, networking equipment &amp; more. Best prices in Bhopal with same-day delivery by YantraQ.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SEO-rich content for hardware categories (visually hidden but crawlable) */}
      <section className="sr-only" aria-hidden="true">
        <h2>IT Hardware Solutions Available at YantraQ Bhopal</h2>
        <p>
          YantraQ offers a comprehensive range of IT hardware products for businesses, government offices, educational institutions, hospitals, and homes in Bhopal. Our hardware catalog includes HP, Dell, and Lenovo laptops and desktops for sale and rental; Hikvision, Dahua, and CP Plus CCTV cameras with professional installation; eSSL and ZKTeco biometric attendance machines; Cisco, TP-Link, and D-Link networking equipment including managed switches, enterprise routers, and access points; Canon, HP, and Epson printers; GPS vehicle tracking devices; LED monitors from Samsung and LG; and Intel Xeon-powered tower and rack servers. Whether you need a laptop on rent for exams, bulk computer lab setup for schools, factory CCTV installation, or enterprise server room infrastructure, YantraQ Bhopal delivers genuine products with warranty at the best prices in Madhya Pradesh.
        </p>
      </section>


      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange('all')}
            >
              All Products
            </Button>
            {allCategories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryChange(cat.id)}
                className="gap-1"
              >
                <span>{cat.icon}</span>
                {cat.name}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {products.map((product: ApiProduct, index: number) => (
                  <ProductCard
                    key={product._id}
                    product={{
                      ...product,
                      id: product._id,
                      fullDescription: product.fullDescription || product.description,
                      features: product.features || []
                    }}
                    index={index}
                  />
                ))}
              </div>

              {pagination && pagination.pages > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => { e.preventDefault(); if (page > 1) handlePageChange(page - 1); }}
                        className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>

                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                      <PaginationItem key={p}>
                        <PaginationLink
                          href="#"
                          isActive={page === p}
                          onClick={(e) => { e.preventDefault(); handlePageChange(p); }}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => { e.preventDefault(); if (page < pagination.pages) handlePageChange(page + 1); }}
                        className={page >= pagination.pages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-4">No products found</p>
              <Button onClick={() => { handleSearch(''); handleCategoryChange('all'); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;
