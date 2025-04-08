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
  keywords = "web development, app development, full-stack, React, Django, Devigo , website design, website maker , website development , website templates , website development near me , webstie development company , web design company , web design services , web design agency , web design solutions , web design packages , web design pricing , web design quotes , web design services near me , web design companies near me , web design services in me",
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