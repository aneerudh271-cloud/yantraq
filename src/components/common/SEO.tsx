import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { company } from '@/data/company';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    schema?: any;
    noindex?: boolean;
    keywords?: string;
}

export const SEO = ({
    title,
    description = "YantraQ is Bhopal's leading IT hardware sales and rental company, providing enterprise-grade IT products, flexible rental solutions, and complete IT infrastructure support for businesses, startups, and enterprises.",
    image = '/logo.jpg',
    schema,
    noindex = false,
    keywords = "yantraq, yantra q, yantraq.com, yantarq, yantra-q, yantraq bhopal, yantra q bhopal, IT hardware sales bhopal, IT hardware rental bhopal, laptop rental bhopal, server rental bhopal, desktop rental bhopal, computer hardware shop bhopal, IT equipment rent near me, networking hardware supplier bhopal, enterprise IT hardware bhopal, best IT company bhopal, laptop shop bhopal, server dealer bhopal, IT solutions bhopal"
}: SEOProps) => {
    const { pathname } = useLocation();
    const siteUrl = 'https://yantraq.com';
    const fullUrl = `${siteUrl}${pathname}`;

    // SEO-optimized title with location
    const truncatedTitle = title
        ? `${title} | YantraQ - IT Hardware Sales & Rental Bhopal`
        : "YantraQ - Best IT Hardware Sales & Rental Company in Bhopal | Laptops, Servers, Networking";
    const finalTitle = truncatedTitle.length > 60 ? truncatedTitle.substring(0, 57) + '...' : truncatedTitle;

    // Truncate description to 160 chars
    const finalDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;

    // Generate breadcrumb schema
    const breadcrumbList = [];
    const pathSegments = pathname.split('/').filter(Boolean);
    let currentPath = '';
    breadcrumbList.push({
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
    });
    pathSegments.forEach((segment, index) => {
        currentPath += `/${segment}`;
        breadcrumbList.push({
            "@type": "ListItem",
            "position": index + 2,
            "name": segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
            "item": `${siteUrl}${currentPath}`
        });
    });

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbList
    };

    // Enhanced LocalBusiness schema for Bhopal location authority
    const localBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "YantraQ",
        "alternateName": ["Yantra Q", "yantraq.com", "YantraQ Bhopal", "Yantra-Q", "yantarq", "yantraq bhopal"],
        "description": "Leading IT hardware sales and rental company in Bhopal providing laptops, servers, desktops, networking equipment for businesses and enterprises",
        "url": siteUrl,
        "logo": `${siteUrl}/logo.jpg`,
        "image": `${siteUrl}/logo.jpg`,
        "priceRange": "₹₹",
        "telephone": company.contact.phone,
        "email": company.contact.emails.sales,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bhopal",
            "addressRegion": "Madhya Pradesh",
            "addressCountry": "IN",
            "streetAddress": "Bhopal, MP"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 23.2599,
            "longitude": 77.4126
        },
        "areaServed": [
            {
                "@type": "City",
                "name": "Bhopal"
            },
            {
                "@type": "State",
                "name": "Madhya Pradesh"
            },
            {
                "@type": "Country",
                "name": "India"
            }
        ],
        "serviceArea": {
            "@type": "GeoCircle",
            "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": 23.2599,
                "longitude": 77.4126
            },
            "geoRadius": "50000"
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "10:00",
                "closes": "19:00"
            }
        ],
        "contactPoint": [
            {
                "@type": "ContactPoint",
                "telephone": company.contact.phone,
                "contactType": "sales",
                "email": company.contact.emails.sales,
                "areaServed": "IN",
                "availableLanguage": ["English", "Hindi"]
            },
            {
                "@type": "ContactPoint",
                "telephone": company.contact.phone,
                "contactType": "customer support",
                "email": company.contact.emails.sales,
                "areaServed": "IN",
                "availableLanguage": ["English", "Hindi"]
            }
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "IT Hardware Sales and Rental Services",
            "itemListElement": [
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "IT Hardware Sales",
                        "description": "New and refurbished IT hardware including laptops, desktops, servers, and networking equipment"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "IT Hardware Rental",
                        "description": "Short-term and long-term rental of laptops, servers, workstations, and networking devices"
                    }
                },
                {
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": "IT Repair Services",
                        "description": "Professional IT hardware repair and maintenance services"
                    }
                }
            ]
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "reviewCount": "150"
        }
    };

    // Organization schema
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "YantraQ",
        "alternateName": "Yantra Q",
        "url": siteUrl,
        "logo": `${siteUrl}/logo.jpg`,
        "sameAs": [],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": company.contact.phone,
            "contactType": "sales",
            "email": company.contact.emails.sales,
            "areaServed": "IN",
            "availableLanguage": ["English", "Hindi"]
        }
    };

    // Website schema with search action
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "YantraQ - IT Hardware Sales & Rental Bhopal",
        "url": siteUrl,
        "description": "Best IT hardware sales and rental company in Bhopal offering laptops, servers, networking equipment for businesses",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${siteUrl}/products?search={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        }
    };

    const schemas = [localBusinessSchema, organizationSchema, websiteSchema, breadcrumbSchema];
    if (schema) {
        schemas.push(schema);
    }

    return (
        <Helmet>
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />

            {/* Geographic targeting */}
            <meta name="geo.region" content="IN-MP" />
            <meta name="geo.placename" content="Bhopal" />
            <meta name="geo.position" content="23.2599;77.4126" />
            <meta name="ICBM" content="23.2599, 77.4126" />

            {/* Open Graph */}
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={image.startsWith('http') ? image : `${siteUrl}${image}`} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="en_IN" />
            <meta property="og:site_name" content="YantraQ" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={image.startsWith('http') ? image : `${siteUrl}${image}`} />

            <link rel="canonical" href={fullUrl} />

            {/* JSON-LD Schemas */}
            {schemas.map((sch, index) => (
                <script key={index} type="application/ld+json">
                    {JSON.stringify(sch)}
                </script>
            ))}
        </Helmet>
    );
};
