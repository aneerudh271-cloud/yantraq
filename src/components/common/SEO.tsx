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
    /** og:type — default "website", use "product" for product pages, "article" for blog-like pages */
    ogType?: 'website' | 'product' | 'article' | 'service';
    /** article:section — e.g. "IT Hardware" or "Software Development" */
    articleSection?: string;
    /** Page category hint for richer structured-data selection */
    pageCategory?: 'hardware' | 'software' | 'general';
}

export const SEO = ({
    title,
    description = "YantraQ is Bhopal's leading IT hardware sales and rental company, providing enterprise-grade IT products, flexible rental solutions, and complete IT infrastructure support for businesses, startups, and enterprises.",
    image = '/logo.jpg',
    schema,
    noindex = false,
    keywords = "yantraq, yantra q, yantraq.com, yantarq, yantra-q, yantraq bhopal, yantra q bhopal, IT hardware sales bhopal, IT hardware rental bhopal, laptop rental bhopal, server rental bhopal, desktop rental bhopal, computer hardware shop bhopal, IT equipment rent near me, networking hardware supplier bhopal, enterprise IT hardware bhopal, best IT company bhopal, laptop shop bhopal, server dealer bhopal, IT solutions bhopal",
    ogType = 'website',
    articleSection,
    pageCategory = 'general',
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
            "name": "IT Hardware & Software Solutions",
            "itemListElement": [
                {
                    "@type": "OfferCatalog",
                    "name": "IT Hardware Products",
                    "itemListElement": [
                        { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Laptops & Desktops", "description": "HP, Dell, Lenovo laptops and business desktops — new, refurbished, and rental" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Servers & Server Racks", "description": "Enterprise tower servers, rack servers, and complete server room solutions" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "CCTV & Surveillance", "description": "Hikvision, Dahua, CP Plus cameras — HD, IP, PTZ, dome, bullet cameras with DVR/NVR" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Biometric Devices", "description": "Fingerprint scanners, face recognition terminals, attendance systems" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Networking Equipment", "description": "Cisco, TP-Link, D-Link routers, switches, access points, structured cabling" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Printers & Scanners", "description": "Laser, inkjet, multifunction printers — Canon, HP, Epson, Brother" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "GPS Trackers", "description": "Vehicle and asset GPS tracking with real-time monitoring" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "LED Monitors", "description": "Full HD and 4K UHD monitors for professionals" } }
                    ]
                },
                {
                    "@type": "OfferCatalog",
                    "name": "IT Services",
                    "itemListElement": [
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IT Hardware Sales", "description": "New and refurbished IT hardware including laptops, desktops, servers, printers, CCTV, biometric devices" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IT Hardware Rental", "description": "Short-term and long-term rental of laptops, servers, workstations, printers, projectors" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IT Repair & AMC", "description": "Professional IT hardware repair, AMC services, on-site support, preventive maintenance" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "CCTV Installation", "description": "Complete CCTV surveillance system design, installation, and maintenance" } }
                    ]
                },
                {
                    "@type": "OfferCatalog",
                    "name": "Software & Digital Solutions",
                    "itemListElement": [
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Website Development", "description": "Custom responsive websites, e-commerce platforms, Progressive Web Apps using React, Next.js" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile App Development", "description": "Android & iOS apps using React Native, Flutter — native and cross-platform" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom Software Development", "description": "CRM, ERP, billing, inventory, hospital and school management software" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO, AEO & GEO Services", "description": "Search Engine Optimization, Answer Engine Optimization, Generative Engine Optimization" } },
                        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Marketing", "description": "Google Ads, social media marketing, content marketing, local SEO" } }
                    ]
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
        "alternateName": ["Yantra Q", "YANTRAQ", "yantraq.com", "Y.A.N.T.R.A.Q. Pvt. Ltd."],
        "url": siteUrl,
        "logo": `${siteUrl}/logo.jpg`,
        "sameAs": [],
        "knowsAbout": [
            "IT Hardware Sales", "IT Hardware Rental", "Laptop Repair",
            "CCTV Installation", "Biometric Systems", "GPS Tracking",
            "Website Development", "Mobile App Development",
            "Custom Software Development", "CRM Development", "ERP Development",
            "SEO Services", "Answer Engine Optimization", "Generative Engine Optimization",
            "Digital Marketing", "Cloud Solutions"
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
        ]
    };

    // Website schema with search action
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "YantraQ — IT Hardware, Software Development & Digital Solutions in Bhopal",
        "alternateName": "YantraQ Bhopal",
        "url": siteUrl,
        "description": "Bhopal's #1 IT hardware sales & rental, custom software development, website & mobile app development, and SEO/AEO/GEO digital marketing company",
        "inLanguage": "en-IN",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${siteUrl}/products?search={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        }
    };

    // ProfessionalService schema for software/digital services
    const softwareServiceSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "YantraQ Software & Digital Solutions",
        "description": "Custom website development, mobile app development, CRM/ERP software, and SEO/AEO/GEO digital marketing services in Bhopal",
        "url": `${siteUrl}/services`,
        "provider": {
            "@type": "Organization",
            "name": "YantraQ",
            "url": siteUrl
        },
        "areaServed": [
            { "@type": "City", "name": "Bhopal" },
            { "@type": "State", "name": "Madhya Pradesh" },
            { "@type": "Country", "name": "India" }
        ],
        "serviceType": [
            "Website Development",
            "Mobile App Development",
            "Custom Software Development",
            "SEO Services",
            "Digital Marketing"
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Software Development Services",
            "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "React & Next.js Website Development", "description": "Modern, responsive, SEO-optimized websites" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "React Native & Flutter App Development", "description": "Cross-platform mobile apps for Android & iOS" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom CRM/ERP Development", "description": "Business management software tailored to your needs" } },
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO, AEO & GEO Optimization", "description": "360° digital visibility across search engines and AI platforms" } }
            ]
        }
    };

    // Hardware ItemList schema for product catalog pages
    const hardwareItemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "IT Hardware Products — Buy, Rent, or Repair in Bhopal",
        "description": "Browse laptops, desktops, servers, CCTV cameras, biometric devices, printers, networking equipment at YantraQ Bhopal",
        "url": `${siteUrl}/products`,
        "numberOfItems": 9,
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "CCTV & Surveillance Systems", "url": `${siteUrl}/products?category=cctv` },
            { "@type": "ListItem", "position": 2, "name": "Laptops & Desktops", "url": `${siteUrl}/products?category=laptop-desktop` },
            { "@type": "ListItem", "position": 3, "name": "Servers & Server Racks", "url": `${siteUrl}/products?category=servers` },
            { "@type": "ListItem", "position": 4, "name": "Biometric Devices", "url": `${siteUrl}/products?category=biometric` },
            { "@type": "ListItem", "position": 5, "name": "Printers & Scanners", "url": `${siteUrl}/products?category=printers` },
            { "@type": "ListItem", "position": 6, "name": "IP Cameras", "url": `${siteUrl}/products?category=ip-cameras` },
            { "@type": "ListItem", "position": 7, "name": "LED Monitors", "url": `${siteUrl}/products?category=led-monitors` },
            { "@type": "ListItem", "position": 8, "name": "GPS Trackers", "url": `${siteUrl}/products?category=gps` },
            { "@type": "ListItem", "position": 9, "name": "Network Switch & Router", "url": `${siteUrl}/products?category=network` }
        ]
    };

    const schemas: any[] = [localBusinessSchema, organizationSchema, websiteSchema, breadcrumbSchema];

    // Add category-specific schemas
    if (pageCategory === 'hardware') {
        schemas.push(hardwareItemListSchema);
    }
    if (pageCategory === 'software') {
        schemas.push(softwareServiceSchema);
    }

    if (schema) {
        schemas.push(schema);
    }

    // Map ogType to valid Open Graph types
    const resolvedOgType = ogType === 'service' ? 'website' : ogType;

    return (
        <Helmet>
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
            <meta name="author" content="YantraQ" />
            <meta name="publisher" content="YantraQ" />
            <meta name="revisit-after" content="3 days" />
            <meta name="rating" content="general" />
            <meta name="distribution" content="global" />
            <meta name="language" content="en-IN" />
            <meta name="coverage" content="Worldwide" />

            {/* Geographic targeting */}
            <meta name="geo.region" content="IN-MP" />
            <meta name="geo.placename" content="Bhopal" />
            <meta name="geo.position" content="23.2599;77.4126" />
            <meta name="ICBM" content="23.2599, 77.4126" />

            {/* Language alternatives */}
            <link rel="alternate" hrefLang="en-in" href={fullUrl} />
            <link rel="alternate" hrefLang="en" href={fullUrl} />
            <link rel="alternate" hrefLang="x-default" href={fullUrl} />

            {/* Open Graph */}
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={image.startsWith('http') ? image : `${siteUrl}${image}`} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={title || 'YantraQ IT Solutions Bhopal'} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content={resolvedOgType} />
            <meta property="og:locale" content="en_IN" />
            <meta property="og:site_name" content="YantraQ" />
            {articleSection && <meta property="article:section" content={articleSection} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={finalDescription} />
            <meta name="twitter:image" content={image.startsWith('http') ? image : `${siteUrl}${image}`} />
            <meta name="twitter:image:alt" content={title || 'YantraQ IT Solutions Bhopal'} />

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
