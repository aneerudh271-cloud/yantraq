import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { company } from '@/data/company';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    schema?: any;
    noindex?: boolean;
}

export const SEO = ({
    title,
    description = company.description,
    image = '/logo.jpg',
    schema,
    noindex = false
}: SEOProps) => {
    const { pathname } = useLocation();
    const siteUrl = 'https://yantraq.com'; // TODO: Replace with actual domain
    const fullUrl = `${siteUrl}${pathname}`;

    // Truncate title to 60 chars
    const truncatedTitle = title ? `${title} | ${company.shortName}` : `${company.name} - IT Solutions`;
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

    // Organization schema
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": company.name,
        "url": siteUrl,
        "logo": `${siteUrl}/logo.jpg`,
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": company.contact.phone,
            "contactType": "sales",
            "email": company.contact.emails.sales
        },
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bhopal",
            "addressRegion": "Madhya Pradesh",
            "addressCountry": "India"
        },
        "sameAs": [
            // Add social media if available
        ]
    };

    // Website schema
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": company.name,
        "url": siteUrl,
        "description": company.description,
        "publisher": {
            "@type": "Organization",
            "name": company.name
        }
    };

    const schemas = [organizationSchema, websiteSchema, breadcrumbSchema];
    if (schema) {
        schemas.push(schema);
    }

    return (
        <Helmet>
            <title>{finalTitle}</title>
            <meta name="description" content={finalDescription} />
            <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />

            {/* Open Graph */}
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:image" content={image.startsWith('http') ? image : `${siteUrl}${image}`} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content="website" />

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
