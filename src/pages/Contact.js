import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faEnvelope, 
  faPhone, 
  faWhatsapp 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faTwitter, 
  faLinkedinIn, 
  faFacebookF, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
    alert('Message sent successfully!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: ''
    });
  };

  return (
    <div className="w-full bg-gray-900 text-white">
      <div className="bg-gradient-to-r from-blue-700/90 to-black/80 py-12 text-center">
        <h1 className="text-4xl font-bold mb-2 text-white uppercase">Contact Us</h1>
        <p className="text-lg text-white/80">Get in touch with our team for inquiries and collaborations</p>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8">
        <div className="md:pr-8">
          <h2 className="text-3xl font-bold mb-6 text-white">Get in Touch</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            We're here to help with your digital needs. Feel free to reach out to us through any of the methods below, and our team will get back to you as soon as possible.
          </p>
          
          <div className="flex items-start mb-6 group">
            <div className="w-10 h-10 bg-blue-600/10 text-blue-500 flex items-center justify-center rounded-lg mr-4 group-hover:bg-blue-600 group-hover:text-white group-hover:-translate-y-1 transition-all duration-300">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-1 text-white">Address</h3>
              <p className="text-gray-400 leading-relaxed">123 Tech Street, Suite 456<br />San Francisco, CA 94107</p>
            </div>
          </div>
          
          <div className="flex items-start mb-6 group">
            <div className="w-10 h-10 bg-blue-600/10 text-blue-500 flex items-center justify-center rounded-lg mr-4 group-hover:bg-blue-600 group-hover:text-white group-hover:-translate-y-1 transition-all duration-300">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-1 text-white">Email</h3>
              <p className="text-gray-400">
                <a href="mailto:info@devigo.com" className="text-blue-500 hover:underline transition-colors duration-300">info@devigo.com</a>
              </p>
            </div>
          </div>
          
          <div className="flex items-start mb-6 group">
            <div className="w-10 h-10 bg-blue-600/10 text-blue-500 flex items-center justify-center rounded-lg mr-4 group-hover:bg-blue-600 group-hover:text-white group-hover:-translate-y-1 transition-all duration-300">
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <div>
              <h3 className="text-xl font-medium mb-1 text-white">Phone</h3>
              <p className="text-gray-400">
                <a href="tel:+14155552671" className="text-blue-500 hover:underline transition-colors duration-300">+1 (415) 555-2671</a>
              </p>
            </div>
          </div>
          
          <div className="mt-10">
            <h3 className="text-xl font-medium mb-4 text-white">Follow Us</h3>
            <div className="flex gap-4">
              <a 
                href="#" 
                aria-label="Twitter" 
                className="w-10 h-10 rounded-full bg-white/10 text-gray-400 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a 
                href="#" 
                aria-label="LinkedIn" 
                className="w-10 h-10 rounded-full bg-white/10 text-gray-400 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a 
                href="#" 
                aria-label="Facebook" 
                className="w-10 h-10 rounded-full bg-white/10 text-gray-400 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a 
                href="#" 
                aria-label="Instagram" 
                className="w-10 h-10 rounded-full bg-white/10 text-gray-400 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all duration-300"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg border border-white/5">
          <h2 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-2 text-gray-400 text-sm">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="py-3 px-4 bg-black/20 border border-white/10 rounded-md text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-2 text-gray-400 text-sm">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  required
                  className="py-3 px-4 bg-black/20 border border-white/10 rounded-md text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="phone" className="mb-2 text-gray-400 text-sm">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number (optional)"
                  className="py-3 px-4 bg-black/20 border border-white/10 rounded-md text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="company" className="mb-2 text-gray-400 text-sm">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name (optional)"
                  className="py-3 px-4 bg-black/20 border border-white/10 rounded-md text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                />
              </div>
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="service" className="mb-2 text-gray-400 text-sm">
                Service Interested In <span className="text-red-500">*</span>
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="py-3 px-4 bg-black/20 border border-white/10 rounded-md text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
              >
                <option value="" disabled>Select a service</option>
                <option value="web-development">Web Development</option>
                <option value="mobile-app">Mobile App Development</option>
                <option value="ui-ux">UI/UX Design</option>
                <option value="digital-marketing">Digital Marketing</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="flex flex-col">
              <label htmlFor="message" className="mb-2 text-gray-400 text-sm">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your project"
                rows="5"
                required
                className="py-3 px-4 bg-black/20 border border-white/10 rounded-md text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="bg-blue-600 text-white py-4 px-8 rounded-md font-semibold mt-2 hover:bg-blue-700 transition-colors duration-300 w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact; 