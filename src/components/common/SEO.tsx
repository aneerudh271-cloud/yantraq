import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { company } from '@/data/company';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
}

export const SEO = ({
    title,
    description = company.description,
    image = '/logo.jpg'
}: SEOProps) => {
    const { pathname } = useLocation();
    const siteUrl = 'https://yantraq.com'; // TODO: Replace with actual domain
    const fullUrl = `${siteUrl}${pathname}`;
    const fullTitle = title ? `${title} | ${company.shortName}` : `${company.name} - IT Solutions`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content="website" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            <link rel="canonical" href={fullUrl} />
        </Helmet>
    );
};
