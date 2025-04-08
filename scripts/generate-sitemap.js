const fs = require('fs');
const path = require('path');

// Base URL of the website
const BASE_URL = 'https://devigo.in';

// List of all the static and dynamic routes in your app
const routes = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/services', priority: 0.9, changefreq: 'weekly' },
  { path: '/portfolio', priority: 0.8, changefreq: 'weekly' },
  { path: '/contact', priority: 0.7, changefreq: 'monthly' },
  { path: '/faq', priority: 0.6, changefreq: 'monthly' },
];

// Services routes - these would typically come from your API or CMS
const services = [
  { slug: 'web-development', priority: 0.8, changefreq: 'monthly' },
  { slug: 'mobile-app-development', priority: 0.8, changefreq: 'monthly' },
  { slug: 'ui-ux-design', priority: 0.8, changefreq: 'monthly' },
  { slug: 'digital-marketing', priority: 0.7, changefreq: 'monthly' },
  { slug: 'seo-optimization', priority: 0.7, changefreq: 'monthly' },
];

// Portfolio routes - would come from your actual projects
const portfolioItems = [
  { slug: 'nexus-marketplace', priority: 0.7, changefreq: 'monthly' },
  { slug: 'mediconnect', priority: 0.7, changefreq: 'monthly' },
  { slug: 'urban-planner', priority: 0.7, changefreq: 'monthly' },
];

// Add service routes
services.forEach(service => {
  routes.push({
    path: `/services/${service.slug}`,
    priority: service.priority,
    changefreq: service.changefreq
  });
});

// Add portfolio routes
portfolioItems.forEach(item => {
  routes.push({
    path: `/portfolio/${item.slug}`,
    priority: item.priority,
    changefreq: item.changefreq
  });
});

// Get current date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

// Generate sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    route => `  <url>
    <loc>${BASE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

// Ensure the public directory exists
const publicPath = path.resolve(__dirname, '../public');
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath, { recursive: true });
}

// Write sitemap to file
fs.writeFileSync(path.resolve(publicPath, 'sitemap.xml'), sitemap);
console.log('Sitemap generated successfully at public/sitemap.xml');

// Generate robots.txt
const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
# Allow all web crawlers (like Googlebot) to access all content
User-agent: *
Allow: /

# Sitemap location
Sitemap: ${BASE_URL}/sitemap.xml

# Disallow crawling of admin or non-relevant pages
Disallow: /admin/
Disallow: /api/
Disallow: /login
Disallow: /logout
Disallow: */preview*
Disallow: */temp*
`;

// Write robots.txt to file
fs.writeFileSync(path.resolve(publicPath, 'robots.txt'), robotsTxt);
console.log('robots.txt generated successfully at public/robots.txt'); 