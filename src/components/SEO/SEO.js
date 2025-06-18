import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEO component for managing all meta tags, titles, and other SEO-related tags
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} props.keywords - Meta keywords
 * @param {string} props.canonicalUrl - Canonical URL
 * @param {string} props.ogType - Open Graph type
 * @param {string} props.ogTitle - Open Graph title
 * @param {string} props.ogDescription - Open Graph description
 * @param {string} props.ogImage - Open Graph image URL
 * @param {string} props.twitterCard - Twitter card type
 * @param {string} props.twitterTitle - Twitter title
 * @param {string} props.twitterDescription - Twitter description
 * @param {string} props.twitterImage - Twitter image URL
 * @param {Object} props.structuredData - Structured data for rich snippets
 */
const SEO = ({
  title = "Devigo | Web & Mobile App Development ",
  description = "We build digital experiences that transform businesses. Explore our full-stack web and mobile app solutions.",
  keywords = "web development, web development company, full-stack development, web development services, web developer near me, website development, web application development, web app developer, web development agency, full stack development company, front end development, back end development, enterprise web development, outsource web development, custom web development services, hire web developer, professional web development, website development firm, full stack development services, responsive web development, website design and development, top web development companies, best web development company, web application development company, website development services, ecommerce web development, web development for startups, B2B web development, web development consultancy, digital marketing , WordPress website development, WordPress developer, WordPress design services, WordPress development company, WordPress development agency, hire WordPress developer, custom WordPress development, WordPress plugin development, WordPress theme development, WordPress e-commerce development, affordable WordPress development, WordPress web design, best WordPress developers, WordPress site development services, WordPress maintenance services, WordPress development services India,  custom software development, custom software development company, software development company, software development services, custom application development, enterprise software solutions, software engineering firm, software development agency, SaaS development company, software outsourcing company, offshore software development, software development firm, bespoke software development, software development consultant, custom application development company, top software companies, fintech software development, healthcare software development, custom financial software, custom healthcare software, custom ERP software solutions, custom CRM development, industrial software development. , Android app development, Android app developer, Android application development company, mobile app development company, mobile app developer, iOS and Android app development, cross-platform app development, React Native app development, Flutter app development, native Android app development, mobile application development services, enterprise mobile apps, Android app consulting, Android developer India, Android app development Delhi",
  
  canonicalUrl = "https://devigo.in/",
  ogType = "website",
  ogTitle,
  ogDescription,
  ogImage = "/logo512.png",
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage,
  structuredData,
}) => {
  // Set fallbacks for Open Graph and Twitter if not provided
  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;
  const finalTwitterTitle = twitterTitle || title;
  const finalTwitterDescription = twitterDescription || description;
  const finalTwitterImage = twitterImage || ogImage;
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Tags for social sharing */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Devigo" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={finalTwitterTitle} />
      <meta name="twitter:description" content={finalTwitterDescription} />
      <meta name="twitter:image" content={finalTwitterImage} />
      
      {/* Structured Data for Rich Snippets */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO; 