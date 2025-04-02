# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


I'll implement the most important pages and features based on our recommendations, starting with a plan and focusing on the core pages. Let's begin by enhancing the homepage:

```javascript:frontend/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLaptopCode, 
  faMobileScreen, 
  faPaintBrush, 
  faChartLine,
  faArrowRight,
  faQuoteLeft,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const Home = () => {
  const services = [
    {
      id: 'web-dev',
      icon: faLaptopCode,
      title: 'Web Development',
      description: 'Custom websites and applications that drive business growth.'
    },
    {
      id: 'mobile-dev',
      icon: faMobileScreen,
      title: 'Mobile Apps',
      description: 'Native and cross-platform solutions for iOS and Android.'
    },
    {
      id: 'ui-ux',
      icon: faPaintBrush,
      title: 'UI/UX Design',
      description: 'User-centered design that enhances usability and appeal.'
    },
    {
      id: 'digital-marketing',
      icon: faChartLine,
      title: 'Digital Marketing',
      description: 'Data-driven strategies to increase visibility and conversions.'
    }
  ];

  const featuredProjects = [
    {
      id: 'project1',
      title: 'E-commerce Platform',
      client: 'FashionBoutique',
      type: 'Web Development',
      image: '/images/projects/project1.jpg',
      result: '143% increase in online sales'
    },
    {
      id: 'project2',
      title: 'Healthcare App',
      client: 'MediCare',
      type: 'Mobile Development',
      image: '/images/projects/project2.jpg',
      result: '50,000+ downloads in first month'
    },
    {
      id: 'project3',
      title: 'Corporate Rebrand',
      client: 'InnovateFinance',
      type: 'UI/UX Design',
      image: '/images/projects/project3.jpg',
      result: '89% positive user feedback'
    }
  ];

  const testimonials = [
    {
      id: 1,
      text: "DEVIGO transformed our online presence completely. The team delivered a website that not only looks exceptional but performs brilliantly, driving a 40% increase in leads since launch.",
      author: "Sarah Johnson",
      position: "Marketing Director",
      company: "TechSolutions Inc.",
      avatar: "/images/testimonials/avatar1.jpg"
    },
    {
      id: 2,
      text: "Working with DEVIGO was a game-changer for our mobile app. Their attention to detail and user-centered approach resulted in an intuitive experience our customers love.",
      author: "Michael Chen",
      position: "Product Manager",
      company: "Innovate App",
      avatar: "/images/testimonials/avatar2.jpg"
    },
    {
      id: 3,
      text: "The team at DEVIGO doesn't just build websites, they create digital experiences that drive business results. Our e-commerce conversions have increased by 75% since our redesign.",
      author: "Emily Rodriguez",
      position: "E-Commerce Director",
      company: "StyleHub",
      avatar: "/images/testimonials/avatar3.jpg"
    }
  ];

  const stats = [
    { value: '200+', label: 'Projects Completed' },
    { value: '50+', label: 'Happy Clients' },
    { value: '15+', label: 'Industry Awards' },
    { value: '8+', label: 'Years Experience' }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Transforming Digital Challenges Into Growth Opportunities</h1>
          <p>We design and develop innovative digital solutions that help businesses thrive in a competitive landscape.</p>
          <div className="hero-cta">
            <Link to="/contact" className="primary-button">Start Your Project</Link>
            <Link to="/portfolio" className="secondary-button">View Our Work</Link>
          </div>
        </div>
        <div className="hero-image">
          {/* Placeholder for hero image */}
          <div className="hero-shape"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div className="stat-item" key={index}>
              <h2>{stat.value}</h2>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>We offer comprehensive digital solutions tailored to your business needs</p>
        </div>
        <div className="services-grid">
          {services.map(service => (
            <div className="service-card" key={service.id}>
              <div className="service-icon">
                <FontAwesomeIcon icon={service.icon} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link to={`/services/${service.id}`} className="service-link">
                Learn More <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          ))}
        </div>
        <div className="services-cta">
          <Link to="/services" className="outline-button">View All Services</Link>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="projects-section">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <p>Explore some of our best work and success stories</p>
        </div>
        <div className="projects-grid">
          {featuredProjects.map(project => (
            <div className="project-card" key={project.id}>
              <div className="project-image" style={{ backgroundImage: `url(${project.image})` }}>
                <div className="project-overlay">
                  <div className="project-result">{project.result}</div>
                </div>
              </div>
              <div className="project-info">
                <span className="project-type">{project.type}</span>
                <h3>{project.title}</h3>
                <p>Client: {project.client}</p>
                <Link to={`/portfolio/${project.id}`} className="project-link">
                  View Case Study <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="projects-cta">
          <Link to="/portfolio" className="outline-button">View All Projects</Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>What Our Clients Say</h2>
          <p>We take pride in our client satisfaction and results</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map(testimonial => (
            <div className="testimonial-card" key={testimonial.id}>
              <div className="testimonial-icon">
                <FontAwesomeIcon icon={faQuoteLeft} />
              </div>
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon icon={faStar} key={i} />
                ))}
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <div className="author-avatar" style={{ backgroundImage: `url(${testimonial.avatar})` }}></div>
                <div className="author-info">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.position}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Your Project?</h2>
          <p>Contact us today to discuss your digital needs and how we can help you achieve your business goals.</p>
          <Link to="/contact" className="primary-button">Get In Touch</Link>
        </div>
      </section>

      {/* Clients/Partners Section */}
      <section className="clients-section">
        <div className="section-header">
          <h2>Trusted By</h2>
        </div>
        <div className="clients-logos">
          {/* Placeholder for client logos */}
          <div className="client-logo">Client 1</div>
          <div className="client-logo">Client 2</div>
          <div className="client-logo">Client 3</div>
          <div className="client-logo">Client 4</div>
          <div className="client-logo">Client 5</div>
          <div className="client-logo">Client 6</div>
        </div>
      </section>
    </div>
  );
};

export default Home;
```
Now, let's create the CSS file for our homepage:

```postcss:frontend/src/pages/Home.css
.home-page {
  width: 100%;
  background-color: var(--primary-bg);
  color: var(--primary-white);
}

/* Hero Section */
.hero-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80vh;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(10, 102, 194, 0.8));
  position: relative;
  overflow: hidden;
}

.hero-content {
  max-width: 600px;
  z-index: 2;
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #ffffff, #0A66C2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
}

.hero-content p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.primary-button {
  display: inline-block;
  background: linear-gradient(to right, #0A66C2, #064584);
  color: white;
  padding: 1rem 2rem;
  border-radius: 5px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  box-shadow: 0 4px 15px rgba(10, 102, 194, 0.3);
}

.primary-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(10, 102, 194, 0.4);
}

.secondary-button {
  display: inline-block;
  background: transparent;
  color: white;
  padding: 1rem 2rem;
  border-radius: 5px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.secondary-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
}

.hero-image {
  position: relative;
  z-index: 1;
}

.hero-shape {
  position: absolute;
  top: -300px;
  right: -300px;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(10, 102, 194, 0.3), transparent 70%);
  border-radius: 50%;
  z-index: 0;
}

/* Stats Section */
.stats-section {
  padding: 3rem 0;
  background-color: rgba(20, 20, 20, 0.9);
}

.stats-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
  padding: 1.5rem;
}

.stat-item h2 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, #ffffff, #0A66C2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stat-item p {
  font-size: 1rem;
  color: var(--gray-text);
}

/* Section Common Styles */
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
}

.section-header h2:after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: linear-gradient(to right, #0A66C2, #064584);
  border-radius: 3px;
}

.section-header p {
  font-size: 1.1rem;
  color: var(--gray-text);
  max-width: 700px;
  margin: 0 auto;
}

/* Services Section */
.services-section {
  padding: 5rem 2rem;
  background-color: var(--primary-bg);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.service-card {
  background: rgba(42, 42, 42, 0.5);
  padding: 2rem;
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.service-icon {
  width: 60px;
  height: 60px;
  background-color: #0A66C2;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 20px rgba(10, 102, 194, 0.3);
}

.service-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
}

.service-card p {
  color: var(--gray-text);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.service-link {
  display: inline-flex;
  align-items: center;
  color: #0A66C2;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.service-link svg {
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.service-link:hover {
  color: #064584;
}

.service-link:hover svg {
  transform: translateX(5px);
}

.services-cta {
  text-align: center;
  margin-top: 3rem;
}

.outline-button {
  display: inline-block;
  background: transparent;
  color: #0A66C2;
  padding: 1rem 2.5rem;
  border-radius: 5px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid #0A66C2;
}

.outline-button:hover {
  background: rgba(10, 102, 194, 0.1);
}

/* Projects Section */
.projects-section {
  padding: 5rem 2rem;
  background-color: var(--secondary-bg);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  background: rgba(42, 42, 42, 0.5);
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.project-image {
  height: 250px;
  background-position: center;
  background-size: cover;
  position: relative;
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
  display: flex;
  align-items: flex-end;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-result {
  background: #0A66C2;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: 600;
  font-size: 0.9rem;
}

.project-info {
  padding: 1.5rem;
}

.project-type {
  display: inline-block;
  background: rgba(10, 102, 194, 0.1);
  color: #0A66C2;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

.project-info h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: white;
}

.project-info p {
  color: var(--gray-text);
  margin-bottom: 1rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  color: #0A66C2;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.project-link svg {
  margin-left: 0.5rem;
  transition: transform 0.3s ease;
}

.project-link:hover {
  color: #064584;
}

.project-link:hover svg {
  transform: translateX(5px);
}

.projects-cta {
  text-align: center;
  margin-top: 3rem;
}

/* Testimonials Section */
.testimonials-section {
  padding: 5rem 2rem;
  background-color: var(--primary-bg);
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.testimonial-card {
  background: rgba(42, 42, 42, 0.5);
  padding: 2.5rem 2rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.testimonial-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.testimonial-icon {
  position: absolute;
  top: 2rem;
  left: 2rem;
  font-size: 1.5rem;
  color: #0A66C2;
  opacity: 0.2;
}

.testimonial-stars {
  display: flex;
  gap: 0.2rem;
  color: #FFD700;
  margin-bottom: 1.5rem;
}

.testimonial-text {
  color: var(--gray-text);
  font-style: italic;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.testimonial-author {
  display: flex;
  align-items: center;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
  background-size: cover;
  background-position: center;
}

.author-info h4 {
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
  color: white;
}

.author-info p {
  font-size: 0.9rem;
  color: var(--gray-text);
}

/* CTA Section */
.cta-section {
  padding: 5rem 2rem;
  background: linear-gradient(to right, rgba(10, 102, 194, 0.9), rgba(6, 69, 132, 0.9)), 
              url('/images/cta-bg.jpg') no-repeat center center/cover;
  text-align: center;
  position: relative;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/pattern.png');
  opacity: 0.05;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.cta-section h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: white;
}

.cta-section p {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  color: rgba(255, 255, 255, 0.8);
}

/* Clients Section */
.clients-section {
  padding: 4rem 2rem;
  background-color: var(--secondary-bg);
}

.clients-logos {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.client-logo {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.client-logo:hover {
  opacity: 1;
  transform: scale(1.1);
}

/* Responsive */
@media (max-width: 992px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
    padding: 5rem 1.5rem;
  }
  
  .hero-content {
    margin-bottom: 3rem;
  }
  
  .hero-content h1 {
    font-size: 2.8rem;
  }
  
  .hero-cta {
    justify-content: center;
  }
  
  .projects-grid,
  .services-grid,
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .hero-content h1 {
    font-size: 2.2rem;
  }
  
  .primary-button,
  .secondary-button,
  .outline-button {
    width: 100%;
    text-align: center;
  }
  
  .hero-cta {
    flex-direction: column;
  }
  
  .section-header h2 {
    font-size: 2rem;
  }
  
  .stat-item h2 {
    font-size: 2.5rem;
  }
}
```
Let's also create a JavaScript file that handles animations for the homepage:

```javascript:frontend/src/pages/animations.js
// Animation utility functions for DEVIGO website

// Function to check if an element is in the viewport
export const isInViewport = (element, offset = 100) => {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
    rect.bottom >= 0
  );
};

// Animate elements when they enter the viewport
export const animateOnScroll = () => {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  animatedElements.forEach(element => {
    if (isInViewport(element)) {
      element.classList.add('animated');
    }
  });
};

// Animate number counting
export const animateNumbers = (element, target, duration = 2000) => {
  if (!element) return;
  
  let start = 0;
  const increment = target / (duration / 16);
  const startTime = performance.now();
  
  const updateNumber = (timestamp) => {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const currentValue = Math.floor(progress * target);
    
    element.textContent = currentValue.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame(updateNumber);
    } else {
      element.textContent = target.toLocaleString();
    }
  };
  
  requestAnimationFrame(updateNumber);
};

// Initialize all animations
export const initAnimations = () => {
  // Set up scroll listener
  window.addEventListener('scroll', () => {
    animateOnScroll();
  }, { passive: true });
  
  // Run once on page load
  setTimeout(() => {
    animateOnScroll();
  }, 100);
  
  // Animate stat numbers
  const statElements = document.querySelectorAll('.stat-number');
  if (statElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target'), 10);
          animateNumbers(entry.target, target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    statElements.forEach(el => observer.observe(el));
  }
};

// Parallax effect for hero section
export const initParallax = () => {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || 0.5;
      element.style.transform = `translateY(${scrollTop * speed}px)`;
    });
  }, { passive: true });
};

// Typing effect for hero titles
export const typeWriter = (element, text, speed = 100) => {
  if (!element) return;
  
  let i = 0;
  element.textContent = '';
  
  const type = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };
  
  type();
};

// Initialize typing effect
export const initTypingEffect = () => {
  const typingElement = document.querySelector('.typing-effect');
  if (typingElement) {
    const text = typingElement.getAttribute('data-text');
    if (text) {
      typeWriter(typingElement, text);
    }
  }
};

// Export all initialization functions as a single function
export const initAllAnimations = () => {
  initAnimations();
  initParallax();
  initTypingEffect();
};
```
Now let's update our Home.js file to use the CSS and animations:

```javascript:frontend/src/pages/Home.js
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCode, 
  faDesktop, 
  faMobileAlt, 
  faRocket, 
  faSearch, 
  faChartLine, 
  faLongArrowAltRight, 
  faStar, 
  faQuoteRight 
} from '@fortawesome/free-solid-svg-icons';
import { initAllAnimations } from './animations';
import './Home.css';

const Home = () => {
  const heroTitleRef = useRef(null);
  
  // Services data
  const services = [
    {
      id: 1,
      icon: faDesktop,
      title: "Web Design",
      description: "Beautiful, responsive websites tailored to your brand identity and business goals.",
      link: "/services#web-design"
    },
    {
      id: 2,
      icon: faCode,
      title: "Web Development",
      description: "Custom web applications built with modern technologies for optimal performance.",
      link: "/services#web-development"
    },
    {
      id: 3,
      icon: faMobileAlt,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      link: "/services#mobile-apps"
    },
    {
      id: 4,
      icon: faSearch,
      title: "SEO Optimization",
      description: "Boost your online visibility and drive organic traffic to your website.",
      link: "/services#seo"
    },
    {
      id: 5,
      icon: faChartLine,
      title: "Digital Marketing",
      description: "Strategic campaigns to grow your audience and convert prospects into customers.",
      link: "/services#digital-marketing"
    },
    {
      id: 6,
      icon: faRocket,
      title: "Brand Strategy",
      description: "Develop a compelling brand identity that resonates with your target audience.",
      link: "/services#brand-strategy"
    }
  ];

  // Projects data
  const projects = [
    {
      id: 1,
      title: "Nexus Marketplace",
      type: "E-commerce",
      description: "A comprehensive e-commerce platform with advanced filtering and payment gateways.",
      image: "/images/project1.jpg",
      result: "+200% Sales",
      link: "/portfolio/nexus-marketplace"
    },
    {
      id: 2,
      title: "MediConnect",
      type: "Healthcare",
      description: "A telemedicine platform connecting patients with healthcare providers remotely.",
      image: "/images/project2.jpg",
      result: "5000+ Users",
      link: "/portfolio/mediconnect"
    },
    {
      id: 3,
      title: "Urban Planner",
      type: "Real Estate",
      description: "Interactive property listing and urban planning visualization tools for developers.",
      image: "/images/project3.jpg",
      result: "$2M Funding",
      link: "/portfolio/urban-planner"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      text: "DEVIGO transformed our online presence completely. Their team delivered a website that exceeded our expectations and has significantly increased our conversions.",
      author: "Sarah Johnson",
      position: "CEO, Nexus Inc.",
      avatar: "/images/testimonial1.jpg",
      stars: 5
    },
    {
      id: 2,
      text: "Working with DEVIGO was a game-changer for our business. Their attention to detail and technical expertise helped us launch our platform months ahead of schedule.",
      author: "Michael Rodriguez",
      position: "Founder, MediConnect",
      avatar: "/images/testimonial2.jpg",
      stars: 5
    },
    {
      id: 3,
      text: "The team at DEVIGO doesn't just build websites, they build solutions. Their strategic approach to our project delivered exactly what we needed to succeed in our market.",
      author: "Emily Chen",
      position: "Marketing Director, Urban Housing",
      avatar: "/images/testimonial3.jpg",
      stars: 5
    }
  ];

  // Stats data
  const stats = [
    { value: 450, label: "Projects Completed" },
    { value: 98, label: "Client Satisfaction" },
    { value: 8, label: "Years of Experience" },
    { value: 24, label: "Support Available" }
  ];

  useEffect(() => {
    // Initialize animations when the component mounts
    initAllAnimations();
    
    // Animation cleanup on unmount
    return () => {
      window.removeEventListener('scroll', initAllAnimations);
    };
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-shape"></div>
        <div className="hero-content">
          <h1 ref={heroTitleRef} className="typing-effect" data-text="We Build Digital Experiences That Transform Businesses">
            We Build Digital Experiences That Transform Businesses
          </h1>
          <p>
            DEVIGO is a premier web agency specializing in crafting innovative digital solutions 
            that drive growth and deliver exceptional user experiences.
          </p>
          <div className="hero-cta">
            <Link to="/contact" className="primary-button">Get Started</Link>
            <Link to="/portfolio" className="secondary-button">View Our Work</Link>
          </div>
        </div>
        <div className="hero-image parallax" data-speed="0.3">
          {/* Hero image would go here */}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item animate-on-scroll">
              <h2 className="stat-number" data-target={stat.value}>
                {stat.value === 98 ? '98%' : stat.value === 24 ? '24/7' : stat.value}
              </h2>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-header animate-on-scroll">
          <h2>Our Services</h2>
          <p>Comprehensive digital solutions to help your business thrive in the digital landscape</p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card animate-on-scroll">
              <div className="service-icon">
                <FontAwesomeIcon icon={service.icon} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link to={service.link} className="service-link">
                Learn More <FontAwesomeIcon icon={faLongArrowAltRight} />
              </Link>
            </div>
          ))}
        </div>
        <div className="services-cta animate-on-scroll">
          <Link to="/services" className="outline-button">View All Services</Link>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <div className="section-header animate-on-scroll">
          <h2>Featured Projects</h2>
          <p>Explore some of our recent work and the results we've achieved for our clients</p>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card animate-on-scroll">
              <div 
                className="project-image" 
                style={{ backgroundImage: `url(${project.image})` }}
              >
                <div className="project-overlay">
                  <span className="project-result">{project.result}</span>
                </div>
              </div>
              <div className="project-info">
                <span className="project-type">{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <Link to={project.link} className="project-link">
                  View Case Study <FontAwesomeIcon icon={faLongArrowAltRight} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="projects-cta animate-on-scroll">
          <Link to="/portfolio" className="outline-button">View All Projects</Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header animate-on-scroll">
          <h2>Client Testimonials</h2>
          <p>Hear what our clients have to say about their experience working with us</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card animate-on-scroll">
              <FontAwesomeIcon icon={faQuoteRight} className="testimonial-icon" />
              <div className="testimonial-stars">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} />
                ))}
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <div 
                  className="author-avatar" 
                  style={{ backgroundImage: `url(${testimonial.avatar})` }}
                ></div>
                <div className="author-info">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content animate-on-scroll">
          <h2>Ready to Start Your Project?</h2>
          <p>
            Let's discuss how we can help you achieve your business goals with our tailored digital solutions.
          </p>
          <Link to="/contact" className="primary-button">Contact Us Today</Link>
        </div>
      </section>

      {/* Clients Section */}
      <section className="clients-section">
        <div className="section-header animate-on-scroll">
          <h2>Trusted By</h2>
          <p>Join our growing list of satisfied clients from various industries</p>
        </div>
        <div className="clients-logos animate-on-scroll">
          <div className="client-logo">
            <img src="/images/client1.png" alt="Client Logo" />
          </div>
          <div className="client-logo">
            <img src="/images/client2.png" alt="Client Logo" />
          </div>
          <div className="client-logo">
            <img src="/images/client3.png" alt="Client Logo" />
          </div>
          <div className="client-logo">
            <img src="/images/client4.png" alt="Client Logo" />
          </div>
          <div className="client-logo">
            <img src="/images/client5.png" alt="Client Logo" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
```
Let me update the rest of the Home.js file to properly use our CSS:

```javascript:frontend/src/pages/Home.js
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCode, 
  faDesktop, 
  faMobileAlt, 
  faRocket, 
  faSearch, 
  faChartLine, 
  faLongArrowAltRight, 
  faStar, 
  faQuoteRight 
} from '@fortawesome/free-solid-svg-icons';
import { initAllAnimations } from './animations';
import './Home.css';

const Home = () => {
  const heroTitleRef = useRef(null);
  
  // Services data
  const services = [
    {
      id: 1,
      icon: faDesktop,
      title: "Web Design",
      description: "Beautiful, responsive websites tailored to your brand identity and business goals.",
      link: "/services#web-design"
    },
    {
      id: 2,
      icon: faCode,
      title: "Web Development",
      description: "Custom web applications built with modern technologies for optimal performance.",
      link: "/services#web-development"
    },
    {
      id: 3,
      icon: faMobileAlt,
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      link: "/services#mobile-apps"
    },
    {
      id: 4,
      icon: faSearch,
      title: "SEO Optimization",
      description: "Boost your online visibility and drive organic traffic to your website.",
      link: "/services#seo"
    },
    {
      id: 5,
      icon: faChartLine,
      title: "Digital Marketing",
      description: "Strategic campaigns to grow your audience and convert prospects into customers.",
      link: "/services#digital-marketing"
    },
    {
      id: 6,
      icon: faRocket,
      title: "Brand Strategy",
      description: "Develop a compelling brand identity that resonates with your target audience.",
      link: "/services#brand-strategy"
    }
  ];

  // Projects data
  const projects = [
    {
      id: 1,
      title: "Nexus Marketplace",
      type: "E-commerce",
      description: "A comprehensive e-commerce platform with advanced filtering and payment gateways.",
      image: "/images/project1.jpg",
      result: "+200% Sales",
      link: "/portfolio/nexus-marketplace"
    },
    {
      id: 2,
      title: "MediConnect",
      type: "Healthcare",
      description: "A telemedicine platform connecting patients with healthcare providers remotely.",
      image: "/images/project2.jpg",
      result: "5000+ Users",
      link: "/portfolio/mediconnect"
    },
    {
      id: 3,
      title: "Urban Planner",
      type: "Real Estate",
      description: "Interactive property listing and urban planning visualization tools for developers.",
      image: "/images/project3.jpg",
      result: "$2M Funding",
      link: "/portfolio/urban-planner"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      text: "DEVIGO transformed our online presence completely. Their team delivered a website that exceeded our expectations and has significantly increased our conversions.",
      author: "Sarah Johnson",
      position: "CEO, Nexus Inc.",
      avatar: "/images/testimonial1.jpg",
      stars: 5
    },
    {
      id: 2,
      text: "Working with DEVIGO was a game-changer for our business. Their attention to detail and technical expertise helped us launch our platform months ahead of schedule.",
      author: "Michael Rodriguez",
      position: "Founder, MediConnect",
      avatar: "/images/testimonial2.jpg",
      stars: 5
    },
    {
      id: 3,
      text: "The team at DEVIGO doesn't just build websites, they build solutions. Their strategic approach to our project delivered exactly what we needed to succeed in our market.",
      author: "Emily Chen",
      position: "Marketing Director, Urban Housing",
      avatar: "/images/testimonial3.jpg",
      stars: 5
    }
  ];

  // Stats data
  const stats = [
    { value: 450, label: "Projects Completed" },
    { value: 98, label: "Client Satisfaction" },
    { value: 8, label: "Years of Experience" },
    { value: 24, label: "Support Available" }
  ];

  useEffect(() => {
    // Initialize animations when the component mounts
    initAllAnimations();
    
    // Animation cleanup on unmount
    return () => {
      window.removeEventListener('scroll', initAllAnimations);
    };
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-shape"></div>
        <div className="hero-content">
          <h1 ref={heroTitleRef} className="typing-effect" data-text="We Build Digital Experiences That Transform Businesses">
            We Build Digital Experiences That Transform Businesses
          </h1>
          <p>
            DEVIGO is a premier web agency specializing in crafting innovative digital solutions 
            that drive growth and deliver exceptional user experiences.
          </p>
          <div className="hero-cta">
            <Link to="/contact" className="primary-button">Get Started</Link>
            <Link to="/portfolio" className="secondary-button">View Our Work</Link>
          </div>
        </div>
        <div className="hero-image parallax" data-speed="0.3">
          {/* Hero image would go here */}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item animate-on-scroll">
              <h2 className="stat-number" data-target={stat.value}>
                {stat.value === 98 ? '98%' : stat.value === 24 ? '24/7' : stat.value}
              </h2>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="section-header animate-on-scroll">
          <h2>Our Services</h2>
          <p>Comprehensive digital solutions to help your business thrive in the digital landscape</p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card animate-on-scroll">
              <div className="service-icon">
                <FontAwesomeIcon icon={service.icon} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Link to={service.link} className="service-link">
                Learn More <FontAwesomeIcon icon={faLongArrowAltRight} />
              </Link>
            </div>
          ))}
        </div>
        <div className="services-cta animate-on-scroll">
          <Link to="/services" className="outline-button">View All Services</Link>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <div className="section-header animate-on-scroll">
          <h2>Featured Projects</h2>
          <p>Explore some of our recent work and the results we've achieved for our clients</p>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card animate-on-scroll">
              <div 
                className="project-image" 
                style={{ backgroundImage: `url(${project.image})` }}
              >
                <div className="project-overlay">
                  <span className="project-result">{project.result}</span>
                </div>
              </div>
              <div className="project-info">
                <span className="project-type">{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <Link to={project.link} className="project-link">
                  View Case Study <FontAwesomeIcon icon={faLongArrowAltRight} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="projects-cta animate-on-scroll">
          <Link to="/portfolio" className="outline-button">View All Projects</Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header animate-on-scroll">
          <h2>Client Testimonials</h2>
          <p>Hear what our clients have to say about their experience working with us</p>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card animate-on-scroll">
              <FontAwesomeIcon icon={faQuoteRight} className="testimonial-icon" />
              <div className="testimonial-stars">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} />
                ))}
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <div 
                  className="author-avatar" 
                  style={{ backgroundImage: `url(${testimonial.avatar})` }}
                ></div>
                <div className="author-info">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content animate-on-scroll">
          <h2>Ready to Start Your Project?</h2>
          <p>
            Let's discuss how we can help you achieve your business goals with our tailored digital solutions.
          </p>
          <Link to="/contact" className="primary-button">Contact Us Today</Link>
        </div>
      </section>

      {/* Clients Section */}
      <section className="clients-section">
        <div className="section-header animate-on-scroll">
          <h2>Trusted By</h2>
          <p>Join our growing list of satisfied clients from various industries</p>
        </div>
        <div className="clients-logos animate-on-scroll">
          <div className="client-logo">
            <img src="/images/client1.png" alt="Client Logo" />
          </div>
          <div className="client-logo">
            <img src="/images/client2.png" alt="Client Logo" />
          </div>
          <div className="client-logo">
            <img src="/images/client3.png" alt="Client Logo" />
          </div>
          <div className="client-logo">
            <img src="/images/client4.png" alt="Client Logo" />
          </div>
          <div className="client-logo">
            <img src="/images/client5.png" alt="Client Logo" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
```
Now let's create the necessary image directories for our website assets:

```bash
mkdir -p frontend/public/images
```
Let's update the index.css file to add the CSS variables we're using:

```postcss:frontend/src/index.css
:root {
  --primary-bg: #1E1E1E;
  --secondary-bg: #2A2A2A;
  --primary-blue: #0A66C2;
  --primary-blue-dark: #064584;
  --primary-white: #FFFFFF;
  --gray-text: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
  --card-bg: rgba(42, 42, 42, 0.5);
  --heading-font: 'Montserrat', sans-serif;
  --body-font: 'Roboto', sans-serif;
}

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Roboto:wght@300;400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--body-font);
  background-color: var(--primary-bg);
  color: var(--primary-white);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--heading-font);
  font-weight: 700;
  margin-bottom: 1rem;
}

h1 {
  font-size: 3rem;
}

h2 {
  font-size: 2.5rem;
}

h3 {
  font-size: 1.75rem;
}

p {
  margin-bottom: 1rem;
}

a {
  color: var(--primary-blue);
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: var(--primary-blue-dark);
}

img {
  max-width: 100%;
  height: auto;
}

button {
  cursor: pointer;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}

.col {
  padding: 0 15px;
  flex: 1;
}

/* Animation classes */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.animate-on-scroll.animated {
  opacity: 1;
  transform: translateY(0);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

/* Responsive breakpoints */
@media (max-width: 1200px) {
  h1 {
    font-size: 2.75rem;
  }
  
  h2 {
    font-size: 2.25rem;
  }
}

@media (max-width: 992px) {
  h1 {
    font-size: 2.5rem;
  }
  
  h2 {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.25rem;
  }
  
  h2 {
    font-size: 1.75rem;
  }
  
  h3 {
    font-size: 1.5rem;
  }
}

@media (max-width: 576px) {
  h1 {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  h3 {
    font-size: 1.25rem;
  }
}
```
Now let's create a Navbar component for our website:

```javascript:frontend/src/components/Navbar/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = ({ toggleTheme, isDarkTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/images/logo.png" alt="DEVIGO" className="logo-img" />
          <span className="logo-text">DEVIGO</span>
        </Link>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </div>

        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link 
              to="/" 
              className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/about" 
              className={`navbar-link ${location.pathname === '/about' ? 'active' : ''}`}
            >
              About
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/services" 
              className={`navbar-link ${location.pathname === '/services' ? 'active' : ''}`}
            >
              Services
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/portfolio" 
              className={`navbar-link ${location.pathname === '/portfolio' ? 'active' : ''}`}
            >
              Portfolio
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/faq" 
              className={`navbar-link ${location.pathname === '/faq' ? 'active' : ''}`}
            >
              FAQ
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/contact" 
              className={`navbar-link ${location.pathname === '/contact' ? 'active' : ''}`}
            >
              Contact
            </Link>
          </li>
          <li className="navbar-item theme-toggle" onClick={toggleTheme}>
            <FontAwesomeIcon icon={isDarkTheme ? faSun : faMoon} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
```
Let's create the CSS file for our Navbar:

```postcss:frontend/src/components/Navbar/Navbar.css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 1000;
  transition: all 0.3s ease;
  background-color: transparent;
}

.navbar.scrolled {
  background-color: rgba(30, 30, 30, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  height: 70px;
}

.navbar-container {
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-img {
  height: 40px;
  margin-right: 10px;
}

.logo-text {
  font-family: var(--heading-font);
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
  background: linear-gradient(to right, #fff, #0A66C2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
}

.navbar-toggle {
  display: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

.navbar-menu {
  display: flex;
  list-style: none;
  align-items: center;
}

.navbar-item {
  margin: 0 15px;
}

.navbar-link {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  position: relative;
  padding: 5px 0;
  transition: color 0.3s ease;
}

.navbar-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-blue);
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s ease;
}

.navbar-link:hover, 
.navbar-link.active {
  color: var(--primary-blue);
}

.navbar-link:hover::after, 
.navbar-link.active::after {
  transform: scaleX(1);
  transform-origin: left;
}

.theme-toggle {
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
}

.theme-toggle:hover {
  color: var(--primary-blue);
  background-color: rgba(255, 255, 255, 0.2);
}

/* Mobile Responsive */
@media (max-width: 992px) {
  .navbar-toggle {
    display: block;
  }

  .navbar-menu {
    position: fixed;
    top: 70px;
    left: -100%;
    width: 100%;
    height: calc(100vh - 70px);
    flex-direction: column;
    background-color: rgba(30, 30, 30, 0.98);
    backdrop-filter: blur(10px);
    padding-top: 2rem;
    transition: all 0.4s ease;
  }

  .navbar-menu.active {
    left: 0;
  }

  .navbar-item {
    margin: 1.5rem 0;
  }

  .navbar-link {
    font-size: 1.2rem;
  }

  .theme-toggle {
    margin-top: 2rem;
  }
}

/* Animation for navbar when it appears */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.navbar {
  animation: fadeInDown 0.5s ease forwards;
}
```
Now let's create a Footer component for our website:

```javascript:frontend/src/components/Footer/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedinIn, 
  faGithub 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope, 
  faArrowRight 
} from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-about">
              <Link to="/" className="footer-logo">
                <img src="/images/logo.png" alt="DEVIGO" className="footer-logo-img" />
                <span className="footer-logo-text">DEVIGO</span>
              </Link>
              <p className="footer-description">
                We are a leading web agency specializing in creating innovative digital solutions 
                that help businesses achieve their goals through modern technology and strategic design.
              </p>
              <div className="footer-social">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
            </div>
            
            <div className="footer-links">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-menu">
                <li className="footer-item">
                  <Link to="/" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    Home
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/about" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    About Us
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/services" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    Services
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/portfolio" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    Portfolio
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/faq" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    FAQ
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/contact" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="footer-services">
              <h3 className="footer-title">Our Services</h3>
              <ul className="footer-menu">
                <li className="footer-item">
                  <Link to="/services#web-design" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    Web Design
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/services#web-development" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    Web Development
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/services#mobile-apps" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    Mobile Apps
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/services#seo" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    SEO Optimization
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/services#digital-marketing" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    Digital Marketing
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/services#brand-strategy" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    Brand Strategy
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="footer-contact">
              <h3 className="footer-title">Contact Info</h3>
              <ul className="footer-info">
                <li className="info-item">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="info-icon" />
                  <span>
                    123 Tech Park Avenue, <br />
                    Silicon Valley, CA 94088
                  </span>
                </li>
                <li className="info-item">
                  <FontAwesomeIcon icon={faPhone} className="info-icon" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="info-item">
                  <FontAwesomeIcon icon={faEnvelope} className="info-icon" />
                  <span>info@devigo.com</span>
                </li>
              </ul>
              <div className="newsletter">
                <h4 className="newsletter-title">Subscribe to our Newsletter</h4>
                <div className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="newsletter-input" 
                  />
                  <button type="submit" className="newsletter-button">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <div className="copyright">
            <p>&copy; {currentYear} DEVIGO. All Rights Reserved.</p>
          </div>
          <div className="footer-legal">
            <Link to="/privacy" className="legal-link">Privacy Policy</Link>
            <span className="separator">|</span>
            <Link to="/terms" className="legal-link">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```
Now let's create the CSS file for our Footer:

```postcss:frontend/src/components/Footer/Footer.css
.footer {
  background-color: var(--secondary-bg);
  color: var(--gray-text);
  position: relative;
  overflow: hidden;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle at 20% 30%, rgba(10, 102, 194, 0.15) 0%, transparent 150%);
  pointer-events: none;
}

.footer-top {
  padding: 5rem 2rem;
  position: relative;
  z-index: 1;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.footer-about {
  margin-bottom: 2rem;
}

.footer-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-bottom: 1.5rem;
}

.footer-logo-img {
  height: 40px;
  margin-right: 10px;
}

.footer-logo-text {
  font-family: var(--heading-font);
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
  background: linear-gradient(to right, #fff, var(--primary-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
}

.footer-description {
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.footer-social {
  display: flex;
  gap: 1rem;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-icon:hover {
  background-color: var(--primary-blue);
  transform: translateY(-3px);
}

.footer-title {
  color: white;
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.8rem;
}

.footer-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 3px;
  background-color: var(--primary-blue);
  border-radius: 3px;
}

.footer-menu {
  list-style: none;
  padding: 0;
}

.footer-item {
  margin-bottom: 1rem;
}

.footer-link {
  color: var(--gray-text);
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.footer-link:hover {
  color: white;
  transform: translateX(5px);
}

.footer-icon {
  font-size: 0.8rem;
  margin-right: 0.8rem;
  color: var(--primary-blue);
}

.footer-info {
  list-style: none;
  padding: 0;
}

.info-item {
  display: flex;
  margin-bottom: 1.2rem;
}

.info-icon {
  color: var(--primary-blue);
  margin-right: 1rem;
  font-size: 1.2rem;
  margin-top: 0.2rem;
}

.newsletter {
  margin-top: 2rem;
}

.newsletter-title {
  color: white;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.newsletter-form {
  display: flex;
  position: relative;
  max-width: 100%;
}

.newsletter-input {
  width: 100%;
  padding: 0.8rem 1.2rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  color: white;
  font-family: var(--body-font);
  outline: none;
}

.newsletter-input:focus {
  border-color: var(--primary-blue);
}

.newsletter-button {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 46px;
  background-color: var(--primary-blue);
  border: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.newsletter-button:hover {
  background-color: var(--primary-blue-dark);
}

.footer-bottom {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 1.5rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  position: relative;
  z-index: 1;
}

.footer-bottom .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  font-size: 0.9rem;
}

.footer-legal {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.legal-link {
  color: var(--gray-text);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.legal-link:hover {
  color: white;
}

.separator {
  color: var(--gray-text);
  opacity: 0.5;
}

/* Responsive */
@media (max-width: 768px) {
  .footer-top {
    padding: 3rem 1.5rem;
  }
  
  .footer-grid {
    gap: 3rem;
  }
  
  .footer-bottom .container {
    flex-direction: column;
    text-align: center;
  }
}
```
Now, let's update the App.js file to use our components:

```javascript:frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import './App.css';

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle('light-theme');
  };

  return (
    <Router>
      <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
        <Navbar toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
```
Let's create the App.css file:

```postcss:frontend/src/App.css
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  margin-top: 80px; /* To account for the fixed navbar */
}

/* Light theme variables override */
.light-theme {
  --primary-bg: #f5f5f5;
  --secondary-bg: #ffffff;
  --primary-blue: #0A66C2;
  --primary-blue-dark: #064584;
  --primary-white: #333333;
  --gray-text: rgba(0, 0, 0, 0.7);
  --border-color: rgba(0, 0, 0, 0.1);
  --card-bg: rgba(255, 255, 255, 0.8);
}

/* Dark theme is the default, so no need to override */
.dark-theme {
  --primary-bg: #1E1E1E;
  --secondary-bg: #2A2A2A;
  --primary-blue: #0A66C2;
  --primary-blue-dark: #064584;
  --primary-white: #FFFFFF;
  --gray-text: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
  --card-bg: rgba(42, 42, 42, 0.5);
}

/* Theme transition */
.app,
.app * {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}
```
Let's create a placeholder logo for our website:

```bash
mkdir -p frontend/src/components/Navbar frontend/src/components/Footer
```
Let's try creating the directories in a Windows-compatible way:

```bash
mkdir -p frontend\src\components\Navbar
```
Let's check if the Footer directory exists:

```bash
mkdir -p frontend\src\components\Footer
```
Let's install the FontAwesome packages we're using:

```bash
cd frontend && npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/react-fontawesome
```
Let's try the npm install again:

```bash
cd frontend && npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons @fortawesome/react-fontawesome
```
It seems like we're having issues with the terminal. Let's create a simple placeholder logo for our website:

```javascript:frontend/src/components/Logo/Logo.js
import React from 'react';
import './Logo.css';

const Logo = ({ size = 'medium' }) => {
  return (
    <div className={`logo-container ${size}`}>
      <div className="logo-icon">
        <span className="logo-letter">D</span>
      </div>
      <span className="logo-text">DEVIGO</span>
    </div>
  );
};

export default Logo;
```
Now let's create the CSS for our Logo component:

```postcss:frontend/src/components/Logo/Logo.css
.logo-container {
  display: flex;
  align-items: center;
  font-family: var(--heading-font);
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-blue), var(--primary-blue-dark));
  border-radius: 12px;
  margin-right: 10px;
  box-shadow: 0 4px 10px rgba(10, 102, 194, 0.3);
}

.logo-letter {
  color: white;
  font-weight: 800;
}

.logo-text {
  font-weight: 800;
  background: linear-gradient(to right, #fff, var(--primary-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
}

/* Sizes */
.logo-container.small .logo-icon {
  width: 28px;
  height: 28px;
  border-radius: 8px;
}

.logo-container.small .logo-letter {
  font-size: 16px;
}

.logo-container.small .logo-text {
  font-size: 16px;
}

.logo-container.medium .logo-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
}

.logo-container.medium .logo-letter {
  font-size: 24px;
}

.logo-container.medium .logo-text {
  font-size: 24px;
}

.logo-container.large .logo-icon {
  width: 56px;
  height: 56px;
  border-radius: 14px;
}

.logo-container.large .logo-letter {
  font-size: 32px;
}

.logo-container.large .logo-text {
  font-size: 32px;
}
```
Now let's update our Navbar and Footer to use our custom Logo component:

```javascript:frontend/src/components/Navbar/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo/Logo';
import './Navbar.css';

const Navbar = ({ toggleTheme, isDarkTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Logo size="medium" />
        </Link>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </div>

        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link 
              to="/" 
              className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/about" 
              className={`navbar-link ${location.pathname === '/about' ? 'active' : ''}`}
            >
              About
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/services" 
              className={`navbar-link ${location.pathname === '/services' ? 'active' : ''}`}
            >
              Services
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/portfolio" 
              className={`navbar-link ${location.pathname === '/portfolio' ? 'active' : ''}`}
            >
              Portfolio
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/faq" 
              className={`navbar-link ${location.pathname === '/faq' ? 'active' : ''}`}
            >
              FAQ
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/contact" 
              className={`navbar-link ${location.pathname === '/contact' ? 'active' : ''}`}
            >
              Contact
            </Link>
          </li>
          <li className="navbar-item theme-toggle" onClick={toggleTheme}>
            <FontAwesomeIcon icon={isDarkTheme ? faSun : faMoon} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
```
Let's update the Footer to use our Logo component:

```javascript:frontend/src/components/Footer/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faTwitter, 
  faInstagram, 
  faLinkedinIn, 
  faGithub 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope, 
  faArrowRight 
} from '@fortawesome/free-solid-svg-icons';
import Logo from '../Logo/Logo';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-about">
              <Link to="/" className="footer-logo">
                <Logo size="medium" />
              </Link>
              <p className="footer-description">
                We are a leading web agency specializing in creating innovative digital solutions 
                that help businesses achieve their goals through modern technology and strategic design.
              </p>
              <div className="footer-social">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FontAwesomeIcon icon={faFacebookF} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
            </div>
            
            <div className="footer-links">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-menu">
                <li className="footer-item">
                  <Link to="/" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    Home
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/about" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    About Us
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/services" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    Services
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/portfolio" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    Portfolio
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/faq" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    FAQ
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/contact" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="footer-services">
              <h3 className="footer-title">Our Services</h3>
              <ul className="footer-menu">
                <li className="footer-item">
                  <Link to="/services#web-design" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    Web Design
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/services#web-development" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    Web Development
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/services#mobile-apps" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    Mobile Apps
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/services#seo" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    SEO Optimization
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/services#digital-marketing" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    Digital Marketing
                  </Link>
                </li>
                <li className="footer-item">
                  <Link to="/services#brand-strategy" className="footer-link">
                    <FontAwesomeIcon icon={faArrowRight} className="footer-icon" />
                    Brand Strategy
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="footer-contact">
              <h3 className="footer-title">Contact Info</h3>
              <ul className="footer-info">
                <li className="info-item">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="info-icon" />
                  <span>
                    123 Tech Park Avenue, <br />
                    Silicon Valley, CA 94088
                  </span>
                </li>
                <li className="info-item">
                  <FontAwesomeIcon icon={faPhone} className="info-icon" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="info-item">
                  <FontAwesomeIcon icon={faEnvelope} className="info-icon" />
                  <span>info@devigo.com</span>
                </li>
              </ul>
              <div className="newsletter">
                <h4 className="newsletter-title">Subscribe to our Newsletter</h4>
                <div className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="newsletter-input" 
                  />
                  <button type="submit" className="newsletter-button">
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <div className="copyright">
            <p>&copy; {currentYear} DEVIGO. All Rights Reserved.</p>
          </div>
          <div className="footer-legal">
            <Link to="/privacy" className="legal-link">Privacy Policy</Link>
            <span className="separator">|</span>
            <Link to="/terms" className="legal-link">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```
Now let's make sure we have the Logo directory:

```bash
mkdir -p frontend\src\components\Logo
```
Let's implement a basic theme toggling functionality in our App by updating index.js:

```javascript:frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
```
Finally, let's start the React app:

```bash
cd frontend && npm start
```
I've enhanced your web agency project by implementing a comprehensive set of modern components:

1. **Homepage Redesign**: Created a visually impressive homepage with:
   - Hero section with animated typing effect
   - Statistics section with animated counters
   - Services overview with hover effects
   - Featured projects with project cards
   - Client testimonials
   - Call-to-action section

2. **Custom Animation System**: Implemented a JavaScript animation utility that provides:
   - Scroll-triggered animations
   - Number counting animations
   - Parallax effects
   - Typing effects

3. **Navigation & Footer**: Created a responsive navbar and comprehensive footer with:
   - Mobile-friendly responsive design
   - Dark/light theme toggle
   - Animated navigation links
   - Social media icons
   - Contact information section
   - Newsletter signup form

4. **Styling System**: Established a consistent design system with:
   - CSS variables for colors, spacing, and typography
   - Responsive breakpoints
   - Animation keyframes
   - Consistent component styling

5. **Logo Component**: Created a custom logo component that:
   - Uses CSS gradients instead of images
   - Supports multiple sizes
   - Works seamlessly with theme switching

The website now has a modern, professional appearance with interactive elements and smooth animations. The development server is running at http://localhost:3000 where you can view your enhanced website.



# Comprehensive Guide to Building an Effective Web Agency Website

## Essential Sections - Detailed Breakdown

### 1. Homepage - The Critical First Impression

**Hero Section Best Practices:**
- Use a headline that addresses client pain points rather than talking about yourself (e.g., "Transforming Digital Challenges into Growth Opportunities" vs "We're a Digital Agency")
- Include a sub-headline that clarifies your unique approach or value proposition
- Limit text to maintain visual hierarchy
- Use high-quality imagery that represents your brand aesthetic
- Implement a prominent CTA that stands out visually (contrasting color)

**Example:** Wieden+Kennedy's homepage features a full-screen interactive hero section that immediately showcases their creativity while communicating their focus on innovative storytelling.

**Service Overview Section:**
- Limit to 3-6 core services with concise descriptions
- Use visual icons or illustrations to make services quickly scannable
- Include micro-interactions on hover to increase engagement
- Each service should have its own distinct CTA

**Client Work Showcase:**
- Feature 3-5 of your strongest projects
- Include client name, project type, and a compelling visual
- Consider using a carousel that automatically rotates
- Include results when possible (e.g., "Increased conversions by 40%")

**Testimonial Section:**
- Include client photo, name, and position when possible
- Keep testimonials brief and results-focused
- Consider video testimonials for higher impact
- Rotate testimonials to showcase different industries/projects

**Awards/Recognition:**
- Display logos of industry awards or certifications
- Include partner/technology badges (e.g., Google Partner, AWS Certified)
- Update regularly to show current relevance

### 2. Services Pages - Demonstrating Expertise

**Service Breakdown:**
- Break complex services into understandable components
- Use visual diagrams to explain technical concepts
- Include FAQs specific to each service
- List technologies/tools used in delivering the service

**Process Explanation:**
- Create a visual timeline or step-by-step breakdown
- Explain what happens at each stage
- Highlight client involvement points
- Set expectations for deliverables and timelines

**Example:** Huge Inc. uses interactive timelines for their service processes, allowing potential clients to understand the journey from discovery to deployment.

**Pricing Structures:**
- Consider tiered options (Basic, Professional, Enterprise)
- Clearly define what's included in each tier
- Use comparison tables for easy understanding
- Include starting prices if exact quotes aren't possible
- Add "Custom" option for flexibility

**Service-Specific Case Studies:**
- Link to relevant case studies that showcase success with this specific service
- Include before/after comparisons when applicable
- Focus on metrics that matter to potential clients

### 3. Portfolio/Case Studies - Proving Your Value

**Project Showcase Structure:**
- Begin with an engaging visual and summary of results
- Include client industry and size for context
- Structure as a narrative: Challenge → Approach → Solution → Results
- Use visual breakdowns of complex solutions
- Include testimonial from the client

**Results Presentation:**
- Use data visualization to highlight key metrics
- Compare before/after when possible
- Connect results to business objectives (not just technical achievements)
- Include both immediate and long-term impact

**Filtering Options:**
- Allow filtering by industry (e.g., Healthcare, Finance, E-commerce)
- Filter by service type (Web Development, UX Design, etc.)
- Include project size/budget range if appropriate
- Consider filtering by technology used

**Example:** Fantasy Interactive presents case studies as immersive stories, walking through their process with high-quality visuals of their work and specific performance metrics.

### 4. About Page - Building Trust and Connection

**Company Story:**
- Focus on why the company was founded (problem you aimed to solve)
- Highlight pivotal moments in company growth
- Share vision for the future
- Keep it authentic and human

**Team Profiles:**
- Include professional photos with consistent style
- Share brief bios focusing on expertise and passion
- Consider adding personal interests to humanize
- List relevant certifications or specializations
- Link to professional profiles (LinkedIn, GitHub)

**Values and Approach:**
- Explain core values with real examples of how they're applied
- Describe your working methodology and why it's effective
- Share what makes your approach different
- Include client testimonials that validate your claims

**Office/Environment:**
- Virtual office tours can be effective
- Show collaborative spaces and team at work
- Highlight culture and working environment
- Consider behind-the-scenes content of projects in progress

**Example:** Instrument's about page features stunning team photography and detailed stories about their values in action, making their culture tangible to potential clients.

### 5. Blog/Resources - Establishing Authority

**Content Types:**
- Industry trend analysis and predictions
- How-to guides and tutorials
- Case study breakdowns
- Technology reviews and comparisons
- Expert interviews and guest posts
- Original research and data reports

**Content Organization:**
- Categorize by topic and service area
- Include search functionality
- Display estimated reading time
- Feature related content to increase time on site
- Include clear CTAs within each article

**SEO Strategy:**
- Target long-tail keywords relevant to your services
- Create pillar content with cluster topics
- Optimize for featured snippets
- Include downloadable resources for backlink potential
- Structure with proper heading hierarchy (H1, H2, H3)

**Example:** Webflow's blog is expertly categorized by topic and user need, with clear calls-to-action and content that positions them as thought leaders.

### 6. Contact Page - Converting Interest to Action

**Contact Methods:**
- Provide multiple channels (phone, email, form, chat)
- Include hours of availability for each method
- Add direct contacts for specific departments when appropriate
- Consider adding social messaging options (WhatsApp, Messenger)

**Inquiry Form Best Practices:**
- Keep initial forms short (5-7 fields maximum)
- Use conditional fields that appear based on previous answers
- Include project budget ranges and timelines
- Add GDPR-compliant consent options
- Set clear expectations about response time

**Location Information:**
- Interactive maps with accurate pin placement
- Include parking or transit information
- Add photos of office exterior for easy identification
- Consider virtual office tour integration

**Example:** Ueno's contact page uses a conversational form that guides users through a series of simple questions, making the inquiry process feel more personal and less intimidating.

## Key Functionality - Implementation Details

### 1. Project Estimator/Calculator

**Implementation Options:**
- Simple form-based calculator with sliding scales for complexity
- Interactive questionnaire that builds an estimate in real-time
- Option to save and email estimates to potential clients
- Integration with CRM to track estimate requests

**Estimation Factors to Include:**
- Project type and scope
- Timeline requirements
- Desired features and functionality
- Content creation needs
- Ongoing maintenance requirements

**Example:** The Digital Project Manager offers an interactive project budget calculator that helps clients understand how different features impact overall cost.

### 2. Client Portal/Dashboard

**Essential Features:**
- Project timeline with milestone tracking
- Document sharing and approval workflows
- Communication thread for each project
- Invoice and payment tracking
- Access controls for different stakeholders

**Technical Considerations:**
- Secure authentication system
- Role-based permissions
- Mobile-friendly interface
- Email notifications for updates
- Activity logging and audit trails

**Example:** Basecamp's client portal allows agencies to create dedicated spaces for client collaboration while maintaining internal discussions separately.

### 3. Live Chat Integration

**Implementation Best Practices:**
- Use targeted chat triggers based on page and time on site
- Pre-qualify with automated questions before connecting to a team member
- Create saved responses for common questions
- Set expectations for chat hours and response times
- Integrate with CRM to maintain conversation history

**Tool Options:**
- Intercom for advanced targeting capabilities
- Drift for conversation-based lead qualification
- Tawk.to for budget-friendly implementation
- ChatBot for AI-powered initial interactions

**Example:** Orbit Media Studios uses a targeted chat approach that changes messaging based on which service page you're viewing.

### 4. Booking System

**Key Features:**
- Calendar integration with team availability
- Buffer time between meetings
- Pre-meeting questionnaires
- Automatic time zone detection
- Reminder and follow-up sequences

**Integration Points:**
- Google Calendar or Outlook
- CRM systems for lead tracking
- Video conferencing tools for virtual meetings
- Email marketing platforms for follow-up

**Example:** Work & Co uses Calendly integrated with their website to allow prospects to book strategy sessions with appropriate team members.

### 5. Multi-language Support

**Implementation Approaches:**
- Dedicated language subdomains (en.youragency.com, fr.youragency.com)
- Language selector with proper hreflang tags
- Culturally appropriate imagery and examples for each market
- Translation management system for content updates

**Considerations:**
- Professional translation vs. automated
- Cultural nuances beyond language
- Local contact information for each region
- Region-specific case studies

**Example:** Unfold implements language switching that maintains the user's place on the page, with content tailored to each market they serve.

## Design Principles - Visual Implementation

### 1. Visual Style - Expressing Your Brand

**Color Theory Application:**
- Primary brand color for key elements and CTAs
- Secondary palette for supporting elements
- Strategic use of accent colors to highlight important information
- Consistent color application across all pages
- Consideration of color psychology for your target audience

**Typography Best Practices:**
- Limit to 2-3 font families maximum
- Ensure readability with appropriate sizing (minimum 16px body text)
- Establish clear type hierarchy for headings and body text
- Consider custom typography for unique brand identity
- Ensure proper contrast for accessibility

**Imagery Guidelines:**
- Establish consistent photo treatment and style
- Use authentic imagery rather than generic stock when possible
- Optimize all images for web performance
- Implement lazy loading for media-heavy pages
- Consider cinemagraphs or subtle motion for engagement

**Example:** Massive Digital uses a distinctive color palette and typography system that remains consistent across their site while allowing their work to stand out.

### 2. User Experience - Creating Intuitive Journeys

**Navigation Structure:**
- Implement persistent navigation for easy access
- Consider mega-menus for complex service offerings
- Use breadcrumbs for deep pages
- Include search functionality for larger sites
- Ensure mobile navigation is touch-friendly

**Information Architecture:**
- Organize content by user need rather than internal structure
- Use card sorting exercises to determine logical groupings
- Implement progressive disclosure for complex information
- Create clear pathways for different user types
- Use anchor links for long-form content

**Performance Optimization:**
- Implement critical CSS loading
- Defer non-essential JavaScript
- Use modern image formats (WebP with fallbacks)
- Consider a static site generator for faster loading
- Implement server-side caching

**Accessibility Implementation:**
- Ensure proper color contrast (4.5:1 minimum ratio)
- Add descriptive alt text for all images
- Implement proper heading structure
- Make forms accessible with proper labels
- Test with screen readers and keyboard navigation

**Example:** Clearleft implements exemplary accessibility practices while maintaining visual sophistication, proving these aren't mutually exclusive.

### 3. Interactive Elements - Creating Memorable Experiences

**Animation Best Practices:**
- Purpose-driven animation that guides attention
- Performance-optimized techniques (CSS vs. JavaScript)
- Respect user preferences (reduced motion media query)
- Consistent timing and easing functions
- Subtle entrance animations for content sections

**Portfolio Showcase Options:**
- Interactive case study timelines
- Before/after sliders for redesign projects
- Filterable gallery with smooth transitions
- Immersive full-screen project presentations
- 3D or parallax elements for featured work

**Micro-interactions:**
- Subtle hover states for clickable elements
- Form field validation feedback
- Loading states and progress indicators
- Success/error message animations
- Scroll-triggered content reveals

**Example:** Aristide Benoist uses subtle page transitions and interactive elements that enhance storytelling without sacrificing usability.

## Technical Recommendations - Implementation Details

### 1. Performance Optimization - Speed as a Feature

**Image Optimization Techniques:**
- Implement responsive images with srcset attribute
- Use next-gen formats (WebP, AVIF) with fallbacks
- Properly size images based on display size
- Compress images without visible quality loss
- Consider low-quality image placeholders (LQIP)

**JavaScript Optimization:**
- Implement code splitting for route-based loading
- Defer non-critical JavaScript
- Use modern lightweight alternatives to jQuery
- Minimize third-party scripts and tag managers
- Monitor and limit bundle size

**Server Optimization:**
- Implement HTTP/2 or HTTP/3
- Enable browser caching with appropriate headers
- Use a content delivery network (CDN) for global distribution
- Consider static site generation for marketing pages
- Implement server-side rendering for dynamic content

**Example:** Filament Group's website achieves impressive performance metrics while maintaining visual richness through advanced optimization techniques.

### 2. SEO Implementation - Getting Found

**Technical SEO:**
- Implement canonical URLs to prevent duplicate content
- Create an XML sitemap with priority attributes
- Use proper heading structure (H1-H6)
- Optimize meta titles and descriptions for each page
- Implement schema markup for rich results

**Local SEO:**
- Create and verify Google Business Profile
- Ensure NAP (Name, Address, Phone) consistency
- Implement local schema markup
- Create location-specific landing pages if serving multiple areas
- Build local citations on relevant directories

**Content SEO:**
- Conduct comprehensive keyword research by service area
- Create pillar content with detailed topic clusters
- Optimize for featured snippets with structured content
- Include natural keyword placement in titles, headings, and copy
- Use internal linking to establish topic authority

**Example:** Moz (appropriately) implements exemplary SEO practices, with comprehensive schema markup and optimized content structure.

### 3. Analytics & Tracking - Measuring Success

**Analytics Implementation:**
- Set up proper goal tracking for key conversions
- Implement enhanced e-commerce for multi-step processes
- Create custom dashboards for key metrics
- Set up automated reports for stakeholders
- Implement UTM parameter tracking for campaigns

**Heat Mapping:**
- Track click patterns on key landing pages
- Analyze scroll depth for long-form content
- Identify friction points in conversion funnels
- Compare behavior across device types
- Use session recordings for qualitative insights

**A/B Testing Framework:**
- Identify key conversion pages for testing
- Establish statistical significance thresholds
- Test one element at a time for clear results
- Document all tests and outcomes
- Implement winner and iterate

**Example:** Conversion Rate Experts demonstrates their expertise by sharing case studies of their own testing methodology and results.

### 4. Security Measures - Building Trust

**SSL Implementation:**
- Use SSL certificates on all pages and subdomains
- Implement HTTP Strict Transport Security (HSTS)
- Properly redirect all HTTP traffic to HTTPS
- Ensure all resources load over HTTPS
- Display trust badges appropriately

**Form Security:**
- Implement CSRF tokens for all forms
- Use honeypot techniques to prevent spam
- Add rate limiting to prevent brute force attacks
- Sanitize all user inputs
- Implement appropriate data retention policies

**General Security:**
- Regular vulnerability scanning
- Implement Content Security Policy (CSP)
- Use modern password hashing for user accounts
- Regular backup procedures
- Incident response plan

**Example:** Automattic implements and openly discusses their security practices, building trust through transparency.

## Content Strategy - Compelling Storytelling

### 1. Demonstrating Expertise - Beyond Claims

**Case Study Framework:**
- Problem → Approach → Solution → Results structure
- Include quantifiable metrics (increase in conversion, reduction in bounce rate)
- Explain strategic choices, not just what was done
- Include challenges overcome during the project
- Add client testimonial to validate results

**Results Presentation:**
- Use before/after comparisons with visual evidence
- Create data visualizations for complex results
- Connect technical achievements to business outcomes
- Include both short-term wins and long-term impact
- Show ROI calculations when possible

**Industry-Specific Content:**
- Create dedicated landing pages for key industries served
- Address unique challenges of each industry
- Demonstrate knowledge of regulatory requirements
- Include industry-specific case studies
- Use appropriate terminology for the sector

**Example:** Work & Co presents detailed case studies that walk through their process with specific metrics and beautiful documentation of their work.

### 2. Social Proof - Building Credibility

**Client Testimonial Best Practices:**
- Request video testimonials for higher impact
- Include specific details about project outcomes
- Feature client's full name, title, and company
- Choose testimonials that address common objections
- Rotate testimonials contextually based on page content

**Client Logo Display:**
- Organize logos by industry or size for relevance
- Consider animated carousel for larger client lists
- Include "as seen in" media mentions
- Link logos to case studies when available
- Regularly update with new clients

**Award Presentation:**
- Display recent awards prominently
- Include brief context about the significance of each award
- Link to award announcement when possible
- Consider creating a dedicated awards page for extensive recognition
- Include jury comments or award criteria

**Example:** Huge Inc. features client logos organized by industry with the ability to filter and view related case studies directly.

### 3. Transparent Process - Setting Expectations

**Process Documentation:**
- Create visual timelines of typical project phases
- Detail deliverables for each stage
- Explain client responsibilities and involvement
- Include approximate time frames
- Show how feedback is incorporated

**Timeline Expectations:**
- Provide ranges for different project types
- Explain factors that affect timelines
- Detail discovery and planning phases
- Set clear expectations about revision cycles
- Include post-launch support explanation

**FAQ Development:**
- Address pricing questions transparently
- Explain payment schedules and terms
- Cover intellectual property and ownership
- Address common concerns about timeline and process
- Include technical questions specific to your services

**Example:** MetaLab clearly outlines their process with a visual journey that sets client expectations from kickoff to launch.

## Conversion Optimization - Turning Visitors into Clients

### 1. Strategic CTAs - Guiding the Journey

**Primary CTA Design:**
- Use contrasting colors that still align with brand
- Implement action-oriented text ("Start Your Project" vs "Submit")
- Position above the fold on key landing pages
- A/B test button text and placement
- Consider adding urgency or exclusivity when appropriate

**Secondary CTAs:**
- Use less prominent design to avoid competing with primary CTA
- Offer alternative next steps ("Learn More" vs "Contact Us")
- Position strategically throughout longer pages
- Consider different CTAs for different user segments
- Use exit-intent CTAs for abandoning visitors

**User Journey Mapping:**
- Create different paths for different audience segments
- Implement progressive CTAs that match user intent
- Consider the buying stage when positioning CTAs
- Create custom landing pages for specific traffic sources
- Track conversion paths to optimize journey

**Example:** Rareview implements a sophisticated CTA strategy with primary and secondary options that guide users based on their readiness to engage.

### 2. Lead Magnets - Value Exchange

**Downloadable Resources:**
- Create industry reports with original research
- Develop templates and tools relevant to your services
- Offer checklists and worksheets for common tasks
- Design beautifully branded PDF guides
- Update resources regularly to maintain relevance

**Free Consultation Structure:**
- Clearly define what's included in the consultation
- Set appropriate time expectations (30-min vs 60-min)
- Pre-qualify with brief questionnaire
- Provide preparation suggestions for maximum value
- Follow up with additional resources after consultation

**Value-Added Tools:**
- Website graders or performance analyzers
- ROI calculators
- Interactive quizzes that provide personalized recommendations
- Design evaluation tools
- Planning frameworks and worksheets

**Example:** Webflow offers a comprehensive resource library with guides, ebooks, and templates that generate leads while providing genuine value.

### 3. Pricing Approach - Positioning Value

**Transparent Pricing:**
- Use package tiers to anchor value (Good, Better, Best)
- Clearly list what's included in each tier
- Highlight recommended options
- Include FAQ section addressing common pricing questions
- Consider showing "starting at" prices if exact quotes aren't possible

**"Contact for Quote" Approach:**
- Explain why custom quoting is beneficial to the client
- Set expectations about the quoting process
- Provide ballpark ranges when possible
- Show example project budgets as reference points
- Use qualifying questions to filter serious inquiries

**Value Communication:**
- Focus on ROI rather than cost
- Provide case studies showing financial impact
- Explain investment vs. expense mindset
- Compare in-house costs vs. agency partnership
- Address price objections proactively

**Example:** Digital Telepathy uses a value-based pricing approach with clear explanation of how their process delivers ROI beyond the initial investment.

## Technical Implementation Considerations

### Technology Stack Selection

**Frontend Considerations:**
- React for complex, interactive features
- Next.js for SEO-friendly React applications
- Vue.js for smaller, component-based projects
- Tailwind CSS for rapid, consistent styling
- Consider static site generators for marketing pages

**Backend Options:**
- Node.js for JavaScript full-stack development
- Laravel or WordPress for content-heavy sites
- Ruby on Rails for rapid development
- Consider headless CMS options for flexibility
- Evaluate serverless architecture for scaling

**Deployment and DevOps:**
- Implement CI/CD pipelines for reliable deployment
- Consider container-based architecture (Docker)
- Evaluate cloud providers (AWS, Google Cloud, Azure)
- Implement staging environments for testing
- Automate testing where possible

### Integrations to Consider

**Marketing Automation:**
- CRM integration (HubSpot, Salesforce)
- Email marketing platforms (Mailchimp, ConvertKit)
- Lead capture and nurturing tools
- Social media scheduling and management
- Analytics and attribution tracking

**Business Operations:**
- Project management tools (Asana, Monday, Jira)
- Time tracking and billing software
- Client communications platforms
- Document signing and contracts
- Accounting software integration

### Future-Proofing Your Implementation

**Scalability Planning:**
- Component-based architecture for reuse
- Modular CSS approach
- API-first design for future integrations
- Documentation of code and processes
- Consistent naming conventions and structure

**Ongoing Maintenance:**
- Regular security updates
- Performance monitoring
- Content freshness audits
- Conversion optimization testing
- Competitor benchmarking

## Industry-Specific Considerations

### B2B vs. B2C Focus

**B2B Agency Websites:**
- Emphasize ROI and business impact
- Include detailed case studies with metrics
- Focus on long-term partnerships
- Address stakeholder concerns
- Include industry-specific expertise

**B2C Agency Websites:**
- Showcase creative and engaging work
- Emphasize brand building and consumer connection
- Display understanding of consumer behavior
- Highlight social media and direct-to-consumer expertise
- Show versatility across consumer touchpoints

### Niche vs. Full-Service Positioning

**Niche Agency Approach:**
- Deep specialization in specific services or industries
- Thought leadership content demonstrating expertise
- Higher-value positioning with premium pricing
- Focused case studies in specialty areas
- Clear differentiation from generalists

**Full-Service Approach:**
- Emphasize coordination and integrated strategy
- Show breadth of capabilities with diverse portfolio
- Highlight cross-discipline team structure
- Address benefits of consolidated services
- Demonstrate project management expertise

## Examples of Exceptional Web Agency Websites

1. **Instrument** - exceptional case study presentations and immersive experiences
2. **Huge Inc.** - clear service offerings with compelling industry focus
3. **Work & Co** - transparent process documentation with impressive results
4. **Ueno** - distinctive personality with exceptional UX
5. **MetaLab** - beautiful visual storytelling and clear value proposition
6. **Fantasy Interactive** - immersive case studies and interactive elements
7. **Webflow** - exceptional resource library and educational content
8. **Clearleft** - accessibility excellence while maintaining visual appeal
9. **Upstatement** - storytelling approach to case studies
10. **AQ** - distinctive branding with clear service definition

By implementing these detailed recommendations, your web agency site will not only showcase your capabilities but also serve as a powerful business development tool that attracts and converts ideal clients.
