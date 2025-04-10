const fs = require('fs');
const path = require('path');

// Load the basic HTML template from the build folder
function prerenderHomePage() {
  console.log('Prerendering home page for SEO...');
  
  try {
    // Path to the built index.html
    const indexPath = path.resolve(__dirname, '../build/index.html');
    
    // Read the current built index.html
    let htmlContent = fs.readFileSync(indexPath, 'utf8');
    
    // Add structured data for LocalBusiness
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Devigo",
      "image": "https://devigo.in/logo.png",
      "url": "https://devigo.in",
      "description": "Full-stack web and mobile app development agency providing digital solutions that transform businesses.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Your City", 
        "addressRegion": "Your State/Region",
        "addressCountry": "IN"
      },
      "areaServed": ["India", "United States", "United Kingdom", "Canada", "Australia"],
      "serviceType": [
        "Web Development", 
        "Mobile App Development", 
        "UI/UX Design", 
        "Digital Marketing", 
        "SEO Optimization"
      ]
    };
    
    // Add structured data as JSON-LD before the closing head tag
    const structuredDataScript = `<script type="application/ld+json">
      ${JSON.stringify(localBusinessSchema, null, 2)}
    </script>`;
    
    // Insert structured data before closing head tag
    htmlContent = htmlContent.replace('</head>', `${structuredDataScript}</head>`);
    
    // Add critical CSS for faster rendering
    const criticalCss = `<style>
      body { 
        margin: 0; 
        padding: 0; 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; 
      }
      .hero-section {
        min-height: 60vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: #f5f5f5;
        padding: 2rem;
      }
      .hero-title {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }
      .hero-description {
        font-size: 1.2rem;
        margin-bottom: 2rem;
      }
    </style>`;
    
    // Insert critical CSS before closing head tag
    htmlContent = htmlContent.replace('</head>', `${criticalCss}</head>`);
    
    // Add a prerendered content div that will show before JavaScript loads
    const prerenderedContent = `<div id="prerendered-content" style="display:block">
      <header>
        <nav style="padding: 1rem; display: flex; justify-content: space-between; align-items: center;">
          <div class="logo"><strong>Devigo</strong></div>
          <div>
            <ul style="display: flex; list-style: none; gap: 1rem;">
              <li>Home</li>
              <li>Services</li>
              <li>Portfolio</li>
              <li>About</li>
              <li>Contact</li>
            </ul>
          </div>
        </nav>
      </header>
      <main>
        <section class="hero-section">
          <h1 class="hero-title">Transform Your Ideas into Powerful Digital Products</h1>
          <p class="hero-description">We build digital experiences that transform businesses. Explore our full-stack web and mobile app solutions.</p>
          <div style="display: flex; gap: 1rem;">
            <a href="/contact" style="padding: 0.75rem 1.5rem; background-color: #4a6cf7; color: white; text-decoration: none; border-radius: 4px;">Let's Build Your Project</a>
            <a href="/portfolio" style="padding: 0.75rem 1.5rem; border: 1px solid #4a6cf7; color: #4a6cf7; text-decoration: none; border-radius: 4px;">View Our Portfolio</a>
          </div>
        </section>
        
        <section style="padding: 3rem 2rem; text-align: center;">
          <h2>Our Services</h2>
          <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; margin-top: 2rem;">
            <div style="max-width: 300px; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h3>Web Development</h3>
              <p>Custom websites and web applications using modern technologies like React and Node.js.</p>
            </div>
            <div style="max-width: 300px; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h3>Mobile App Development</h3>
              <p>Native and cross-platform mobile applications for iOS and Android.</p>
            </div>
            <div style="max-width: 300px; padding: 1.5rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h3>UI/UX Design</h3>
              <p>User-centered design approach to create beautiful and functional interfaces.</p>
            </div>
          </div>
        </section>
      </main>
      <footer style="padding: 2rem; background-color: #1d2144; color: white; text-align: center;">
        <p>© 2023 Devigo. All rights reserved.</p>
      </footer>
    </div>
    <script>
      // Hide prerendered content when the app loads
      window.onload = function() {
        document.getElementById('prerendered-content').style.display = 'none';
      }
    </script>`;
    
    // Insert prerendered content right after the root div
    htmlContent = htmlContent.replace('<div id="root"></div>', '<div id="root"></div>\n' + prerenderedContent);
    
    // Write the modified HTML back
    fs.writeFileSync(indexPath, htmlContent);
    
    console.log('✅ Successfully prerendered home page for SEO');
  } catch (error) {
    console.error('❌ Error prerendering home page:', error);
  }
}

prerenderHomePage(); 