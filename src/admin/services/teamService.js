import { api } from '../../utility/api';

// Your Cloudinary cloud name
const CLOUDINARY_CLOUD_NAME = 'dofjr7o8l';

// Function to ensure image URL is properly formatted for Cloudinary
const getImageUrl = (imageId) => {
  if (!imageId) return null;
  
  // If it's already a full URL, return it
  if (typeof imageId === 'string' && imageId.startsWith('http')) {
    return imageId;
  }
  
  // If it's a Cloudinary public_id, construct the URL
  if (typeof imageId === 'string') {
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${imageId}`;
  }
  
  return null;
};

// Format team members with proper image URLs
const formatTeamMember = (member) => {
  if (!member) return member;
  
  return {
    ...member,
    image: getImageUrl(member.image),
    image_url: getImageUrl(member.image) || member.image_url
  };
};

const formatTeamMembersResponse = (response) => {
  if (!response || !response.data) return response;
  
  // If response.data is an array, map over it
  if (Array.isArray(response.data)) {
    return {
      ...response,
      data: response.data.map(formatTeamMember)
    };
  }
  
  // If response.data has results property (paginated response)
  if (response.data.results && Array.isArray(response.data.results)) {
    return {
      ...response,
      data: {
        ...response.data,
        results: response.data.results.map(formatTeamMember)
      }
    };
  }
  
  // Single team member response
  return {
    ...response,
    data: formatTeamMember(response.data)
  };
};

/**
 * Service for managing team members in the admin panel
 */
const teamApi = {
  /**
   * Get all team members with optional filters
   * @param {Object} params - Query parameters for filtering
   */
  getAll(params = {}) {
    return api.get('/team/', { params })
      .then(formatTeamMembersResponse);
  },

  /**
   * Get a team member by ID
   * @param {string|number} id - Team member ID
   */
  getById(id) {
    return api.get(`/team/${id}/`)
      .then(formatTeamMembersResponse);
  },

  /**
   * Create a new team member
   * @param {Object} data - Team member data
   */
  create(data) {
    // Use FormData to handle file uploads
    const formData = new FormData();
    
    // Add all text fields
    Object.keys(data).forEach(key => {
      if (key !== 'image_url' && data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    
    // Ensure the Cloudinary public_id is sent as the image field
    if (data.image) {
      formData.append('image', data.image);
    }
    
    return api.post('/team/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Update an existing team member
   * @param {string|number} id - Team member ID
   * @param {Object} data - Updated team member data
   */
  update(id, data) {
    // Use FormData to handle file uploads
    const formData = new FormData();
    
    // Add all text fields
    Object.keys(data).forEach(key => {
      if (key !== 'image_url' && data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    
    // Ensure the Cloudinary public_id is sent as the image field
    if (data.image) {
      formData.append('image', data.image);
    }
    
    return api.put(`/team/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  /**
   * Delete a team member
   * @param {string|number} id - Team member ID
   */
  delete(id) {
    return api.delete(`/team/${id}/`);
  },

  /**
   * Toggle a team member's active status
   * @param {string|number} id - Team member ID
   * @param {boolean} active - New active status
   */
  toggleActive(id, active) {
    return api.patch(`/team/${id}/`, { is_active: active });
  }
};

export default teamApi; 