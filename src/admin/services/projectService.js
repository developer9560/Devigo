import axios from 'axios';
import { api } from '../../utility/api';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://backend-django-pct4.onrender.com/api/v1' || 'http://localhost:8000/api/v1' || 'http://127.0.0.1:8000/api/v1';

console.log('Project Service API base URL:', API_BASE_URL);

/**
 * Format a Cloudinary URL based on the provided public ID
 * @param {string} imageId - The Cloudinary public ID or full URL
 * @returns {string|null} - The formatted Cloudinary URL or null if no valid imageId
 */
const formatCloudinaryUrl = (imageId) => {
  if (!imageId) return null;
  
  // If it's already a full URL, return it as is
  if (imageId.startsWith('http')) {
    return imageId;
  }
  
  // Default Cloudinary cloud name (should be configured in .env)
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'devigo';
  
  // Check if the imageId contains version info
  const hasVersion = /v\d+/.test(imageId);
  
  // Construct the URL
  if (hasVersion) {
    return `https://res.cloudinary.com/${cloudName}/image/upload/${imageId}`;
  } else {
    return `https://res.cloudinary.com/${cloudName}/image/upload/v1/${imageId}`;
  }
};

/**
 * Format a project object for frontend use
 * @param {Object} project - The project data from API
 * @returns {Object} - Formatted project object
 */
const formatProject = (project) => {
  if (!project) return null;
  
  // Deep copy to avoid mutations
  const formattedProject = JSON.parse(JSON.stringify(project));
  
  // Set image URLs
  if (project.image_url) {
    formattedProject.image_url = project.image_url;
  } else if (project.image) {
    formattedProject.image_url = formatCloudinaryUrl(project.image);
  }
  
  if (project.results_image_url) {
    formattedProject.results_image_url = project.results_image_url;
  } else if (project.results_image) {
    formattedProject.results_image_url = formatCloudinaryUrl(project.results_image);
  }
  
  if (project.testimonial_image_url) {
    formattedProject.testimonial_image_url = project.testimonial_image_url;
  } else if (project.testimonial_image) {
    formattedProject.testimonial_image_url = formatCloudinaryUrl(project.testimonial_image);
  }
  
  // Format gallery images
  if (project.gallery && Array.isArray(project.gallery)) {
    formattedProject.gallery = project.gallery.map(img => {
      const formattedImg = { ...img };
      
      if (img.image_url) {
        formattedImg.image_url = img.image_url;
      } else if (img.image) {
        formattedImg.image_url = formatCloudinaryUrl(img.image);
      }
      
      return formattedImg;
    });
  }
  
  // Ensure service_ids is always an array
  if (!formattedProject.service_ids) {
    formattedProject.service_ids = [];
  }
  
  // Convert technologies from array or object to appropriate format
  if (project.technologies) {
    if (Array.isArray(project.technologies)) {
      // Convert array of technology objects or strings to object format
      const techObj = {};
      project.technologies.forEach(tech => {
        const techName = typeof tech === 'object' ? tech.name : tech;
        techObj[techName] = true;
      });
      formattedProject.technologies = techObj;
    } else if (typeof project.technologies === 'object' && project.technologies !== null) {
      // Already in object format
      formattedProject.technologies = project.technologies;
    } else {
      // Initialize as empty object
      formattedProject.technologies = {};
    }
  } else {
    formattedProject.technologies = {};
  }
  
  return formattedProject;
};

/**
 * Prepares project data for API submission
 * @param {Object} projectData - Project data from the form
 * @returns {Object} - Formatted project data for API
 */
const prepareProjectDataForSubmission = (projectData) => {
  const formattedData = { ...projectData };
  
  // Ensure technologies is an object, not an array (the backend expects a JSONField)
  if (formattedData.technologies) {
    // If it's already an object with key-value pairs, keep it as is
    if (typeof formattedData.technologies === 'object' && !Array.isArray(formattedData.technologies)) {
      // No change needed
    } else if (Array.isArray(formattedData.technologies)) {
      // Convert array to object if needed
      const techObj = {};
      formattedData.technologies.forEach(tech => {
        if (typeof tech === 'string') {
          techObj[tech] = true;
        } else if (tech && tech.name) {
          techObj[tech.name] = true;
        }
      });
      formattedData.technologies = techObj;
    } else {
      // Default to empty object if not valid
      formattedData.technologies = {};
    }
  } else {
    // Default to empty object if not present
    formattedData.technologies = {};
  }
  
  console.log('Formatted project data for submission:', formattedData);
  return formattedData;
};

/**
 * Fetch all projects
 * @returns {Promise<Array>} - Array of projects
 */
const getAll = async (params = {}) => {
  try {
    // Use proper API URL format with trailing slash for consistency
    console.log('Making projects request with params:', params);
    
    // Use the api instance that has auth headers
    const response = await api.get('/projects/', { params });
    console.log('API response status:', response.status);
    console.log('Raw API response data:', response.data);
    
    // Safety check - make sure we have valid data
    if (!response.data) {
      console.warn('No data in response, returning empty array');
      return { data: [], count: 0 };
    }
    
    let projectsData = [];
    let projectsCount = 0;
    
    console.log('Response data type:', typeof response.data, 'Array?', Array.isArray(response.data));
    
    // Handle different response formats from API
    if (Array.isArray(response.data)) {
      // Direct array of projects
      console.log('Processing direct array response');
      projectsData = response.data.map(project => formatProject(project));
      projectsCount = projectsData.length;
    } else if (response.data && typeof response.data === 'object') {
      // Response is an object that might contain the projects array
      console.log('Processing object response with potential arrays');
      
      // Check for common response formats
      if (Array.isArray(response.data.results)) {
        console.log('Found results array with', response.data.results.length, 'items');
        projectsData = response.data.results.map(project => formatProject(project));
        projectsCount = response.data.count || projectsData.length;
      } else if (Array.isArray(response.data.projects)) {
        console.log('Found projects array with', response.data.projects.length, 'items');
        projectsData = response.data.projects.map(project => formatProject(project));
        projectsCount = response.data.count || projectsData.length;
      } else if (Array.isArray(response.data.data)) {
        console.log('Found data array with', response.data.data.length, 'items');
        projectsData = response.data.data.map(project => formatProject(project));
        projectsCount = response.data.count || projectsData.length;
      } else {
        // Check if there are any array properties in the response
        const arrayProps = Object.entries(response.data)
          .filter(([_, value]) => Array.isArray(value))
          .map(([key, value]) => ({ key, length: value.length }));
        
        console.log('Available array properties:', arrayProps);
        
        if (arrayProps.length > 0) {
          // Use the first array property found
          const firstArrayProp = arrayProps[0].key;
          console.log('Using first array property:', firstArrayProp, 'with', response.data[firstArrayProp].length, 'items');
          projectsData = response.data[firstArrayProp].map(project => formatProject(project));
          projectsCount = response.data.count || projectsData.length;
        } else {
          // If we can't find an array property, check if the response itself is a project object
          console.log('No arrays found, checking if response is a single project');
          if (response.data.id) {
            console.log('Response appears to be a single project');
            projectsData = [formatProject(response.data)];
            projectsCount = 1;
          } else {
            // Last resort: try to convert object properties to an array if they look like projects
            console.log('Attempting to extract projects from object properties');
            const possibleProjects = Object.values(response.data).filter(
              item => item && typeof item === 'object' && !Array.isArray(item) && item.id
            );
            
            if (possibleProjects.length > 0) {
              console.log('Found', possibleProjects.length, 'possible projects in object properties');
              projectsData = possibleProjects.map(project => formatProject(project));
              projectsCount = possibleProjects.length;
            } else {
              console.warn('Could not find any projects in the response');
            }
          }
        }
      }
    }
    
    console.log('Final formatted projects:', projectsData);
    console.log('Total project count:', projectsCount);
    
    return { 
      data: projectsData,
      count: projectsCount
    };
  } catch (error) {
    console.error('Error fetching projects:', error);
    console.error('Error details:', error.message);
    if (error.response) {
      console.error('Error response status:', error.response.status);
      console.error('Error response data:', error.response.data);
    }
    throw error;
  }
};

/**
 * Fetch a project by ID
 * @param {string} id - Project ID
 * @returns {Promise<Object>} - Project data
 */
const getById = async (id) => {
  try {
    console.log(`Fetching project by ID: ${id}`);
    
    // Use the api instance with auth headers
    const response = await api.get(`/projects/${id}/`);
    const formattedProject = formatProject(response.data);
    console.log('Formatted project:', formattedProject);
    return { data: formattedProject };
  } catch (error) {
    console.error(`Error fetching project with id ${id}:`, error);
    throw error;
  }
};

/**
 * Create a new project
 * @param {Object} projectData - Project data
 * @returns {Promise<Object>} - Created project
 */
const create = async (projectData) => {
  try {
    console.log('Creating project with data:', projectData);
    
    // Format the project data for submission
    const formattedData = prepareProjectDataForSubmission(projectData);
    
    // Use the api instance with auth headers
    const response = await api.post('/projects/', formattedData);
    
    console.log('Project creation API response:', response);
    
    if (!response.data) {
      throw new Error('No data returned from API');
    }
    
    return { data: formatProject(response.data) };
  } catch (error) {
    console.error('Error creating project:', error);
    
    // Add more detailed error information
    if (error.response) {
      console.error('API error response:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    }
    
    throw error;
  }
};

/**
 * Update an existing project
 * @param {string} id - Project ID
 * @param {Object} projectData - Project data
 * @returns {Promise<Object>} - Updated project
 */
const update = async (id, projectData) => {
  try {
    console.log(`Updating project ${id} with data:`, projectData);
    
    // Format the project data for submission
    const formattedData = prepareProjectDataForSubmission(projectData);
    
    // Use the api instance with auth headers
    const response = await api.put(`/projects/${id}/`, formattedData);
    return { data: formatProject(response.data) };
  } catch (error) {
    console.error(`Error updating project ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a project
 * @param {string} id - Project ID
 * @returns {Promise<void>}
 */
const remove = async (id) => {
  try {
    await api.delete(`/projects/${id}/`);
    return { success: true };
  } catch (error) {
    console.error(`Error deleting project with id ${id}:`, error);
    throw error;
  }
};

/**
 * Toggle featured status of a project
 * @param {string} id - Project ID
 * @returns {Promise<Object>} - Updated project
 */
const toggleFeatured = async (id) => {
  try {
    const response = await api.post(`/projects/${id}/toggle-featured/`);
    return { data: formatProject(response.data) };
  } catch (error) {
    console.error(`Error toggling featured status for project with id ${id}:`, error);
    throw error;
  }
};

/**
 * Upload an image for a project
 * @param {FormData} formData - Form data containing the image
 * @returns {Promise<Object>} - Upload response with image details
 */
const uploadImage = async (formData) => {
  try {
    const response = await api.post(`/uploads/image/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return { data: response.data };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

/**
 * Add a gallery image to a project
 * @param {string} projectId - Project ID
 * @param {Object} imageData - Image data (title and image)
 * @returns {Promise<Object>} - Updated project
 */
const addGalleryImage = async (projectId, imageData) => {
  try {
    const response = await api.post(
      `/projects/${projectId}/gallery/`, 
      imageData
    );
    return { data: formatProject(response.data) };
  } catch (error) {
    console.error('Error adding gallery image:', error);
    throw error;
  }
};

/**
 * Remove a gallery image from a project
 * @param {string} projectId - Project ID
 * @param {string} imageId - Image ID
 * @returns {Promise<Object>} - Updated project
 */
const removeGalleryImage = async (projectId, imageId) => {
  try {
    const response = await api.delete(
      `/projects/${projectId}/gallery/${imageId}/`
    );
    return { data: formatProject(response.data) };
  } catch (error) {
    console.error('Error removing gallery image:', error);
    throw error;
  }
};

/**
 * Get all services for project association
 * @returns {Promise<Array>} - Array of services
 */
const getAllServices = async () => {
  try {
    const response = await api.get(`/services/`);
    return { data: response.data };
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

const projectService = {
  getAll,
  getById,
  create,
  update,
  remove,
  toggleFeatured,
  uploadImage,
  addGalleryImage,
  removeGalleryImage,
  getAllServices
};

export default projectService; 