import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, Typography, TextField, Button, Paper, Grid, MenuItem,
  FormControl, InputLabel, Select, FormHelperText, Chip,
  Card, CardContent, CardMedia, IconButton, Divider,
  Switch, FormControlLabel, FormGroup, Tab, Tabs, List,
  ListItem, ListItemText, ListItemSecondaryAction, OutlinedInput,
  ListItemAvatar, Avatar, FormLabel, CircularProgress
} from '@mui/material';
import { 
  Save as SaveIcon, 
  ArrowBack as ArrowBackIcon,
  AddPhotoAlternate as AddPhotoIcon,
  Delete as DeleteIcon,
  AddCircle as AddCircleIcon,
  Cancel as CancelIcon,
  CloudUpload as CloudUploadIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { format } from 'date-fns';
import projectService from '../../services/projectService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../../utility/api';
import { styled } from '@mui/material/styles';

// Try to import ServicesContext from different possible locations
let useServicesState;
try {
  const servicesContext = require('../../contexts/ServicesContext');
  useServicesState = servicesContext.useServicesState;
} catch (e) {
  // Fallback implementation if import fails
  useServicesState = () => ({ services: [], loading: false });
  console.error('Failed to import ServicesContext:', e);
}

// Styled components
const ImageUploadBox = styled(Box)(({ theme }) => ({
  border: `1px dashed ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: theme.palette.background.default,
  '&:hover': {
    borderColor: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

const ImagePreview = styled('img')({
  maxWidth: '100%',
  maxHeight: '200px',
  objectFit: 'contain',
  marginTop: 16,
});

// Material Icon suggestions organized by category
const materialIconSuggestions = {
  "Web Development": ["code", "web", "integration_instructions", "developer_mode", "html"],
  "Design": ["design_services", "palette", "brush", "format_paint", "style"],
  "Mobile": ["smartphone", "android", "ios_share", "phonelink", "app_shortcut"],
  "Marketing": ["trending_up", "campaign", "search", "public", "ads_click"],
  "Infrastructure": ["cloud", "storage", "dns", "security", "memory"],
  "Business": ["shopping_cart", "store", "payments", "business", "analytics"]
};


// Utility functions for Cloudinary images
const formatCloudinaryUrl = (imageId) => {
  if (!imageId) return null;
  const cloudName = 'dofjr7o8l';
  
  // If it's already a full URL, return it
  if (typeof imageId === 'string' && imageId.startsWith('http')) {
    return imageId;
  }
  
  // If it's a Cloudinary public_id, construct the URL
  if (typeof imageId === 'string') {
    // Check if the imageId contains version info
    if (imageId.includes('/v')) {
      return `https://res.cloudinary.com/${cloudName}/image/upload/${imageId}`;
    } else {
      // Add a default version parameter ('v1') if none exists
      return `https://res.cloudinary.com/${cloudName}/image/upload/v1/${imageId}`;
    }
  }
  
  return null;
};

const debugImageUrl = (label, imageId) => {
  console.log(`${label}:`, imageId);
  console.log(`${label} URL:`, formatCloudinaryUrl(imageId));
  return formatCloudinaryUrl(imageId);
};

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  client: Yup.string().required('Client name is required'),
  category: Yup.string().required('Category is required'),
  industry: Yup.string().required('Industry is required'),
  status: Yup.string().required('Status is required'),
  start_date: Yup.date().nullable(),
  completion_date: Yup.date().nullable().min(
    Yup.ref('start_date'),
    'Completion date must be after start date'
  )
});

const statuses = [
  { value: 'planning', label: 'Planning' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'archived', label: 'Archived' }
];

const categories = [
  { value: 'web', label: 'Web Development' },
  { value: 'mobile', label: 'Mobile Development' },
  { value: 'design', label: 'UI/UX Design' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'other', label: 'Other' }
];

// TabPanel component for tab content
const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`project-tabpanel-${index}`}
      aria-labelledby={`project-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const ProjectForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [currentTab, setCurrentTab] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [newGalleryImage, setNewGalleryImage] = useState(null);
  const [newGalleryImageTitle, setNewGalleryImageTitle] = useState('');
  const [loading, setLoading] = useState(isEditMode);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingGalleryImage, setUploadingGalleryImage] = useState(false);
  const [availableServices, setAvailableServices] = useState([]);
  const [newTechInput, setNewTechInput] = useState('');
  
  // New state variables for results and testimonials
  const [results, setResults] = useState([]);
  const [newResult, setNewResult] = useState({ title: '', description: '', value: '' });
  const [testimonialImagePreview, setTestimonialImagePreview] = useState(null);
  const [uploadingTestimonialImage, setUploadingTestimonialImage] = useState(false);
  
  // Fetch services for selection
  const { services, loading: servicesLoading } = useServicesState();

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      title: '',
      slug: '',
      description: '',
      client: '',
      category: '',
      industry: 'technology',
      services: [],
      technologies: {},
      featured: false,
      status: 'planning',
      start_date: '',
      completion_date: '',
      website_url: '',
      image: null,
      image_url: '',
      team_size: '',
      challenge_description: '',
      solution_description: '',
      testimonial_quote: '',
      testimonial_author: '',
      testimonial_role: '',
      testimonial_image: null
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Log technologies for debugging
        console.log('Technologies before submission:', values.technologies);
        console.log('Technologies count:', Object.keys(values.technologies).length);
        
        // If slug is empty, it will be auto-generated on the backend
        const projectData = { 
          ...values,
          results: results, // Add results to the submitted data
          gallery: galleryImages.map(img => ({
            id: img.id && !img.id.startsWith('temp_') ? img.id : undefined,
            title: img.title,
            image: img.public_id || img.image
          }))
        };
        
        console.log('FORM SUBMISSION - Project data to be submitted:', projectData);
        
        let response;
        if (isEditMode) {
          console.log(`Updating existing project with ID: ${id}`);
          response = await projectService.update(id, projectData);
          console.log('Update response:', response);
          toast.success('Project updated successfully');
        } else {
          console.log('Creating new project...');
          response = await projectService.create(projectData);
          console.log('Create response:', response);
          toast.success('Project created successfully');
        }
        
        // Only navigate after successful response
        console.log('Project saved successfully, navigating back to projects list');
        setTimeout(() => {
          navigate('/admin/projects');
        }, 1500);
      } catch (error) {
        // Enhanced error handling
        console.error('Error saving project:', error);
        
        let errorMessage = 'Failed to save project';
        
        // Check for specific error types
        if (error.response) {
          // The request was made and the server responded with an error status
          console.error('Server response error:', error.response.data);
          errorMessage = error.response.data.message || error.response.data.error || `Server error: ${error.response.status}`;
          
          // Log specific field errors
          if (error.response.data.technologies) {
            console.error('Technologies error:', error.response.data.technologies);
          }
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
          errorMessage = 'No response from server. Please check your connection and try again.';
        } else {
          // Something happened in setting up the request
          console.error('Request setup error:', error.message);
          errorMessage = `Error: ${error.message}`;
        }
        
        toast.error(errorMessage);
      }
    }
  });

  // Set available services from context
  useEffect(() => {
    if (services && services.length > 0) {
      setAvailableServices(services);
    }
  }, [services]);

  // Function to debug technologies data
  const debugTechnologies = (technologies, label = "Technologies") => {
    console.log(`${label}:`, technologies);
    
    if (!technologies) {
      console.log(`${label}: Empty or null`);
      return;
    }
    
    if (typeof technologies === 'object' && !Array.isArray(technologies)) {
      console.log(`${label} is an object with ${Object.keys(technologies).length} keys`);
      console.log(`${label} keys:`, Object.keys(technologies));
    } else if (Array.isArray(technologies)) {
      console.log(`${label} is an array with ${technologies.length} items`);
    } else {
      console.log(`${label} is type:`, typeof technologies);
    }
  };

  // Fetch project data when in edit mode
  useEffect(() => {
    // Only fetch once when in edit mode
    if (isEditMode && id) {
      let isMounted = true;
      const loadProject = async () => {
        try {
          setLoading(true);
          console.log('Fetching project with ID:', id);
          const response = await projectService.getById(id);

          // Ensure component is still mounted before updating state
          if (!isMounted) return;
          
          const project = response.data;
          console.log('Fetched project data:', project);
          
          // Debug technologies data
          debugTechnologies(project.technologies, "Fetched technologies");
          
          // Ensure technologies is an object
          let technologiesObj = {};
          try {
            if (project.technologies) {
              if (typeof project.technologies === 'object' && !Array.isArray(project.technologies)) {
                technologiesObj = project.technologies;
              } else if (Array.isArray(project.technologies)) {
                // Convert array to object
                project.technologies.forEach(tech => {
                  const techName = typeof tech === 'object' ? tech.name : tech;
                  technologiesObj[techName] = true;
                });
              } else {
                console.warn("Technologies has an unexpected format:", project.technologies);
              }
            }
          } catch (techError) {
            console.error("Error processing technologies:", techError);
            // Default to empty object if there's an error
            technologiesObj = {};
          }
          
          // Set form values
          formik.setValues({
            title: project.title || '',
            slug: project.slug || '',
            description: project.description || '',
            client: project.client || '',
            category: project.category || '',
            industry: project.industry || 'technology',
            services: project.service_ids || project.services?.map(s => s.id) || [],
            technologies: technologiesObj,
            featured: project.featured || false,
            status: project.status || 'planning',
            start_date: project.start_date || '',
            completion_date: project.completion_date || '',
            website_url: project.website_url || '',
            image: project.image || null,
            image_url: project.image_url || project.image || '',
            team_size: project.team_size || '',
            challenge_description: project.challenge_description || '',
            solution_description: project.solution_description || '',
            testimonial_quote: project.testimonial_quote || '',
            testimonial_author: project.testimonial_author || '',
            testimonial_role: project.testimonial_role || '',
            testimonial_image: project.testimonial_image || null
          });
          
          // Debug the technologies that were set
          debugTechnologies(technologiesObj, "Technologies set in form");
          
          // Set image preview
          if (project.image_url || project.image) {
            setImagePreview(project.image_url || formatCloudinaryUrl(project.image));
          }
          
          // Set gallery images
          if (project.gallery && Array.isArray(project.gallery)) {
            const formattedGallery = project.gallery.map(img => ({
              id: img.id || `temp_${Date.now()}`,
              title: img.title || 'Untitled Image',
              image: img.image_url || formatCloudinaryUrl(img.image)
            }));
            setGalleryImages(formattedGallery);
          }
          
          // Set results
          if (project.results && Array.isArray(project.results)) {
            setResults(project.results);
          }
          
          // Set testimonial image
          if (project.testimonial_image_url || project.testimonial_image) {
            setTestimonialImagePreview(project.testimonial_image_url || formatCloudinaryUrl(project.testimonial_image));
          }
        } catch (error) {
          console.error('Error fetching project:', error);
          toast.error('Failed to load project data');
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };
      
      loadProject();
      
      // Cleanup function
      return () => {
        isMounted = false;
      };
    }
  }, [id, isEditMode]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB max
      toast.error('Image size should not exceed 5MB');
      return;
    }

    try {
      setUploadingImage(true);
      
      const uploadResult = await uploadImageToCloudinary(file);
      
      // Store both the public_id and the full URL
      formik.setFieldValue('image', uploadResult.public_id);
      formik.setFieldValue('image_url', uploadResult.image_url);
      setImagePreview(uploadResult.image_url);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to upload image. Please try again.';
      toast.error(errorMessage);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleRemoveImage = () => {
    formik.setFieldValue('image', null);
    formik.setFieldValue('image_url', '');
    setImagePreview(null);
  };

  const handleNewGalleryImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB max
      toast.error('Image size should not exceed 5MB');
      return;
    }

    try {
      setUploadingGalleryImage(true);
      
      const uploadResult = await uploadImageToCloudinary(file);
      
      // Update gallery preview
      setNewGalleryImage({
        file: null,
        public_id: uploadResult.public_id,
        preview: uploadResult.image_url
      });
    } catch (error) {
      console.error('Error uploading gallery image:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to upload image. Please try again.';
      toast.error(errorMessage);
    } finally {
      setUploadingGalleryImage(false);
    }
  };

  const handleAddGalleryImage = async () => {
    if (!newGalleryImage) return;
    
    // Always add to local state first
    const newImage = {
      id: `temp_${Date.now()}`,
      title: newGalleryImageTitle || `Image ${galleryImages.length + 1}`,
      image: newGalleryImage.preview,
      public_id: newGalleryImage.public_id
    };
    
    console.log('Adding new gallery image:', newImage);
    setGalleryImages([...galleryImages, newImage]);
    setNewGalleryImage(null);
    setNewGalleryImageTitle('');
    
    // If in edit mode, also update on server
    if (isEditMode) {
      try {
        // Create a new project image with the uploaded Cloudinary image
        const imageData = {
          title: newGalleryImageTitle || `Image ${galleryImages.length + 1}`,
          image: newGalleryImage.public_id
        };
        
        console.log('Sending gallery image to server:', imageData);
        await projectService.addGalleryImage(id, imageData);
        toast.success('Gallery image added successfully');
      } catch (error) {
        console.error('Error adding gallery image:', error);
        toast.error('Failed to add gallery image');
      }
    }
  };

  const handleRemoveGalleryImage = async (imageId) => {
    if (!isEditMode) {
      // For new projects, just remove from local state
      setGalleryImages(galleryImages.filter(img => img.id !== imageId));
      return;
    }
    
    // For existing projects, make API call
    try {
      await projectService.removeGalleryImage(id, imageId);
      
      // Update local state
      setGalleryImages(galleryImages.filter(img => img.id !== imageId));
      
      toast.success('Gallery image removed successfully');
    } catch (error) {
      console.error('Error removing gallery image:', error);
      toast.error('Failed to remove gallery image');
    }
  };

  const handleCancelNewGalleryImage = () => {
    setNewGalleryImage(null);
    setNewGalleryImageTitle('');
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleAddTechnology = () => {
    if (!newTechInput.trim()) return;
    
    const tech = newTechInput.trim();
    // Check if technology already exists in object
    if (formik.values.technologies[tech]) {
      toast.info(`"${tech}" is already in the list of technologies`);
      return;
    }
    
    // Add the technology to the object with a value of true
    console.log(`Adding technology: ${tech}`);
    const updatedTechnologies = {
      ...formik.values.technologies,
      [tech]: true
    };
    
    console.log('Updated technologies:', updatedTechnologies);
    formik.setFieldValue('technologies', updatedTechnologies);
    setNewTechInput('');
    toast.success(`Added "${tech}" to technologies`);
  };

  const handleRemoveTechnology = (tech) => {
    console.log(`Removing technology: ${tech}`);
    const updatedTechnologies = { ...formik.values.technologies };
    delete updatedTechnologies[tech];
    formik.setFieldValue('technologies', updatedTechnologies);
    toast.info(`Removed "${tech}" from technologies`);
  };

  // Log image info for debugging
  useEffect(() => {
    if (imagePreview) {
      console.log('Image preview set to:', imagePreview);
    }
  }, [imagePreview]);

  // Add new functions to handle results and testimonials
  const handleAddResult = () => {
    if (!newResult.title) return;
    
    const resultToAdd = {
      id: `temp_${Date.now()}`,
      ...newResult
    };
    
    setResults([...results, resultToAdd]);
    setNewResult({ title: '', description: '', value: '' });
  };
  
  const handleRemoveResult = (resultId) => {
    setResults(results.filter(result => result.id !== resultId));
  };
  
  const handleTestimonialImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, or WebP)');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB max
      toast.error('Image size should not exceed 5MB');
      return;
    }
    
    try {
      setUploadingTestimonialImage(true);
      
      const uploadResult = await uploadImageToCloudinary(file);
      
      // Store both the public_id and the full URL
      formik.setFieldValue('testimonial_image', uploadResult.public_id);
      setTestimonialImagePreview(uploadResult.image_url);
      toast.success('Testimonial image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading testimonial image:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to upload image. Please try again.';
      toast.error(errorMessage);
    } finally {
      setUploadingTestimonialImage(false);
    }
  };
  
  const handleRemoveTestimonialImage = () => {
    formik.setFieldValue('testimonial_image', null);
    setTestimonialImagePreview(null);
  };

  /**
   * Upload image through backend API
   * @param {File} file - The image file to upload
   * @returns {Promise<Object>} - The upload response
   */
  const uploadImageToCloudinary = async (file) => {
    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('image', file);
    
    // Upload image through backend API
    const response = await api.post('/uploads/image/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    if (!response.data || !response.data.image_url) {
      throw new Error('Invalid response from server');
    }
    
    console.log('Upload response:', response.data);
    return response.data;
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          {isEditMode ? 'Edit Project' : 'Add New Project'}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/admin/projects')}
        >
          Back to Projects
        </Button>
      </Box>
      
      {loading ? (
        <Box sx={{ textAlign: 'center', p: 4 }}>
          <CircularProgress />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Loading project data...
          </Typography>
        </Box>
      ) : (
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Tabs value={currentTab} onChange={handleTabChange} sx={{ mb: 3 }}>
              <Tab label="Basic Information" />
              <Tab label="Gallery Images" />
              <Tab label="Challenge & Solution" />
              <Tab label="Results & Testimonial" />
              <Tab label="Services & Details" />
            </Tabs>
            
            {/* Basic Information Tab */}
            {currentTab === 0 && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="title"
                        name="title"
                        label="Project Title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="slug"
                        name="slug"
                        label="URL Slug (leave empty for auto-generation)"
                        value={formik.values.slug}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.slug && Boolean(formik.errors.slug)}
                        helperText={formik.touched.slug && formik.errors.slug}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        id="description"
                        name="description"
                        label="Project Description"
                        multiline
                        rows={6}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        id="client"
                        name="client"
                        label="Client Name"
                        value={formik.values.client}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.client && Boolean(formik.errors.client)}
                        helperText={formik.touched.client && formik.errors.client}
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        id="category"
                        name="category"
                        label="Project Category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.category && Boolean(formik.errors.category)}
                        helperText={
                          (formik.touched.category && formik.errors.category) || 
                          "E.g., Web Development, Mobile App, UI/UX Design"
                        }
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="industry-label">Industry</InputLabel>
                        <Select
                          labelId="industry-label"
                          id="industry"
                          name="industry"
                          value={formik.values.industry}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.industry && Boolean(formik.errors.industry)}
                          label="Industry"
                        >
                          <MenuItem value="technology">Technology</MenuItem>
                          <MenuItem value="healthcare">Healthcare</MenuItem>
                          <MenuItem value="finance">Finance</MenuItem>
                          <MenuItem value="education">Education</MenuItem>
                          <MenuItem value="retail">Retail</MenuItem>
                          <MenuItem value="hospitality">Hospitality</MenuItem>
                          <MenuItem value="manufacturing">Manufacturing</MenuItem>
                          <MenuItem value="real_estate">Real Estate</MenuItem>
                          <MenuItem value="food_beverage">Food & Beverage</MenuItem>
                          <MenuItem value="automotive">Automotive</MenuItem>
                          <MenuItem value="media">Media & Entertainment</MenuItem>
                          <MenuItem value="transportation">Transportation</MenuItem>
                          <MenuItem value="professional_services">Professional Services</MenuItem>
                          <MenuItem value="non_profit">Non-Profit</MenuItem>
                          <MenuItem value="government">Government</MenuItem>
                          <MenuItem value="other">Other</MenuItem>
                        </Select>
                        {formik.touched.industry && formik.errors.industry && (
                          <FormHelperText error>{formik.errors.industry}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        id="team_size"
                        name="team_size"
                        label="Team Size"
                        placeholder="E.g., 5 Developers, 2 Designers"
                        value={formik.values.team_size}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText="Describe the team composition for this project"
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        id="website_url"
                        name="website_url"
                        label="Website URL (if applicable)"
                        value={formik.values.website_url}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.website_url && Boolean(formik.errors.website_url)}
                        helperText={formik.touched.website_url && formik.errors.website_url}
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel id="status-label">Project Status</InputLabel>
                        <Select
                          labelId="status-label"
                          id="status"
                          name="status"
                          value={formik.values.status}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.status && Boolean(formik.errors.status)}
                          label="Project Status"
                        >
                          {statuses.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                        {formik.touched.status && formik.errors.status && (
                          <FormHelperText error>{formik.errors.status}</FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        id="start_date"
                        name="start_date"
                        label="Start Date"
                        type="date"
                        value={formik.values.start_date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                        helperText={formik.touched.start_date && formik.errors.start_date}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        id="completion_date"
                        name="completion_date"
                        label="Completion Date"
                        type="date"
                        value={formik.values.completion_date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.completion_date && Boolean(formik.errors.completion_date)}
                        helperText={formik.touched.completion_date && formik.errors.completion_date}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              id="featured"
                              name="featured"
                              checked={formik.values.featured}
                              onChange={formik.handleChange}
                            />
                          }
                          label="Feature this project on homepage and portfolio"
                        />
                      </FormGroup>
                    </Grid>
                  </Grid>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Project Featured Image
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        Add a high-quality image that represents the project. Recommended size: 1200x800px.
                      </Typography>
                      
                      {imagePreview ? (
                        <Box sx={{ position: 'relative', mb: 2 }}>
                          <CardMedia
                            component="img"
                            image={imagePreview}
                            alt="Project image preview"
                            sx={{ 
                              borderRadius: 1, 
                              height: 200,
                              objectFit: 'cover',
                              backgroundColor: 'rgba(0,0,0,0.03)'
                            }}
                          />
                          <IconButton
                            sx={{
                              position: 'absolute',
                              top: 8,
                              right: 8,
                              backgroundColor: 'rgba(0, 0, 0, 0.5)',
                              '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                              },
                            }}
                            onClick={handleRemoveImage}
                          >
                            <DeleteIcon sx={{ color: 'white' }} />
                          </IconButton>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            height: 200,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px dashed grey.300',
                            borderRadius: 1,
                            mb: 2,
                            p: 2,
                          }}
                        >
                          <AddPhotoIcon fontSize="large" color="disabled" />
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            No image selected
                          </Typography>
                        </Box>
                      )}
                      
                      <Box>
                        <input
                          type="file"
                          accept="image/*"
                          id="project-image-upload"
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                        />
                        <label htmlFor="project-image-upload">
                          <Button
                            component="span"
                            variant="outlined"
                            startIcon={<CloudUploadIcon />}
                            fullWidth
                            disabled={uploadingImage}
                          >
                            {uploadingImage ? 'Uploading...' : imagePreview ? 'Change Image' : 'Upload Image'}
                          </Button>
                        </label>
                        {uploadingImage && <CircularProgress size={24} sx={{ ml: 2, mt: 2 }} />}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
            
            {/* Gallery Images Tab */}
            {currentTab === 1 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Project Gallery Images
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Add multiple images to showcase different aspects of your project.
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Card sx={{ mb: 3 }}>
                      <CardContent>
                        <Typography variant="subtitle1" gutterBottom>
                          Add New Gallery Image
                        </Typography>
                        
                        {newGalleryImage ? (
                          <Box sx={{ position: 'relative', mb: 2 }}>
                            <CardMedia
                              component="img"
                              image={newGalleryImage.preview}
                              alt="New gallery image preview"
                              sx={{ 
                                borderRadius: 1, 
                                height: 160,
                                objectFit: 'cover'
                              }}
                            />
                            <IconButton
                              sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                '&:hover': {
                                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                },
                              }}
                              onClick={handleCancelNewGalleryImage}
                            >
                              <CancelIcon sx={{ color: 'white' }} />
                            </IconButton>
                          </Box>
                        ) : (
                          <Box>
                            <input
                              type="file"
                              accept="image/*"
                              id="gallery-image-upload"
                              onChange={handleNewGalleryImageChange}
                              style={{ display: 'none' }}
                            />
                            <label htmlFor="gallery-image-upload">
                              <Button
                                component="span"
                                variant="outlined"
                                startIcon={<CloudUploadIcon />}
                                fullWidth
                                sx={{ mb: 2, height: 160, flexDirection: 'column' }}
                                disabled={uploadingGalleryImage}
                              >
                                {uploadingGalleryImage ? 'Uploading...' : 'Upload Image'}
                              </Button>
                            </label>
                            {uploadingGalleryImage && <CircularProgress size={24} sx={{ ml: 2 }} />}
                          </Box>
                        )}
                        
                        <TextField
                          fullWidth
                          label="Image Title (Optional)"
                          value={newGalleryImageTitle}
                          onChange={(e) => setNewGalleryImageTitle(e.target.value)}
                          sx={{ mb: 2 }}
                        />
                        
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<AddCircleIcon />}
                          fullWidth
                          onClick={handleAddGalleryImage}
                          disabled={!newGalleryImage}
                        >
                          Add to Gallery
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={8}>
                    <Typography variant="subtitle1" gutterBottom>
                      Gallery Images ({galleryImages.length})
                    </Typography>
                    
                    {galleryImages.length === 0 ? (
                      <Card sx={{ p: 3, textAlign: 'center' }}>
                        <Typography color="text.secondary">
                          No gallery images added yet
                        </Typography>
                      </Card>
                    ) : (
                      <Grid container spacing={2}>
                        {galleryImages.map((image) => (
                          <Grid item xs={12} sm={6} md={4} key={image.id}>
                            <Card sx={{ position: 'relative' }}>
                              <CardMedia
                                component="img"
                                height="140"
                                image={image.image}
                                alt={image.title || 'Gallery image'}
                                sx={{ objectFit: 'cover' }}
                                onError={(e) => {
                                  console.error('Error loading gallery image:', image);
                                  e.target.src = 'https://via.placeholder.com/140x140?text=Image+Error';
                                }}
                              />
                              <IconButton
                                sx={{
                                  position: 'absolute',
                                  top: 8,
                                  right: 8,
                                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                  '&:hover': {
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                  },
                                }}
                                onClick={() => handleRemoveGalleryImage(image.id)}
                              >
                                <DeleteIcon sx={{ color: 'white' }} />
                              </IconButton>
                              <CardContent sx={{ p: 2 }}>
                                <Typography variant="body2" noWrap>
                                  {image.title || 'Untitled Image'}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Box>
            )}
            
            {/* Challenge & Solution Tab */}
            {currentTab === 2 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Project Challenge & Solution
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Describe the challenge that this project addressed and how your solution resolved it.
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="challenge_description"
                      name="challenge_description"
                      label="Challenge Description"
                      multiline
                      rows={4}
                      value={formik.values.challenge_description}
                      onChange={formik.handleChange}
                      placeholder="Describe the challenge or problem that this project addressed..."
                      helperText="Explain the client's challenge or business problem in detail"
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="solution_description"
                      name="solution_description"
                      label="Solution Description"
                      multiline
                      rows={4}
                      value={formik.values.solution_description}
                      onChange={formik.handleChange}
                      placeholder="Describe the solution you provided..."
                      helperText="Explain how your solution addressed the challenge and provided value"
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
            
            {/* Results & Testimonial Tab */}
            {currentTab === 3 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Project Results & Testimonial
                </Typography>
                
                <Grid container spacing={3}>
                  {/* Results Section */}
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Key Results & Metrics
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Add measurable results and achievements from this project.
                    </Typography>
                    
                    <Card sx={{ p: 3, mb: 3 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            label="Result Title"
                            value={newResult.title}
                            onChange={(e) => setNewResult({...newResult, title: e.target.value})}
                            placeholder="E.g., Increased Conversion Rate"
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <TextField
                            fullWidth
                            label="Value/Metric"
                            value={newResult.value}
                            onChange={(e) => setNewResult({...newResult, value: e.target.value})}
                            placeholder="E.g., 50% increase"
                          />
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            label="Description"
                            value={newResult.description}
                            onChange={(e) => setNewResult({...newResult, description: e.target.value})}
                            placeholder="Brief explanation of this result"
                          />
                        </Grid>
                        <Grid item xs={12} md={1}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddResult}
                            disabled={!newResult.title}
                            sx={{ height: '100%', minWidth: '100%' }}
                          >
                            Add
                          </Button>
                        </Grid>
                      </Grid>
                    </Card>
                    
                    {results.length > 0 ? (
                      <List>
                        {results.map((result) => (
                          <ListItem 
                            key={result.id}
                            secondaryAction={
                              <IconButton 
                                edge="end" 
                                aria-label="delete"
                                onClick={() => handleRemoveResult(result.id)}
                                color="error"
                              >
                                <DeleteIcon />
                              </IconButton>
                            }
                            sx={{ 
                              bgcolor: 'rgba(0,0,0,0.05)', 
                              borderRadius: 1, 
                              mb: 1 
                            }}
                          >
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                  <Typography variant="subtitle1">
                                    {result.title}
                                  </Typography>
                                  {result.value && (
                                    <Chip 
                                      label={result.value} 
                                      color="primary" 
                                      size="small" 
                                      sx={{ ml: 2 }}
                                    />
                                  )}
                                </Box>
                              }
                              secondary={result.description || 'No description provided'}
                            />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Box sx={{ textAlign: 'center', p: 3, bgcolor: 'rgba(0,0,0,0.03)', borderRadius: 1 }}>
                        <Typography color="text.secondary">
                          No results added yet. Add some key metrics or achievements.
                        </Typography>
                      </Box>
                    )}
                  </Grid>
                  
                  {/* Testimonial Section */}
                  <Grid item xs={12} sx={{ mt: 3 }}>
                    <Divider sx={{ mb: 3 }} />
                    <Typography variant="subtitle1" gutterBottom>
                      Client Testimonial
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Add a testimonial from the client about this project.
                    </Typography>
                    
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={8}>
                        <TextField
                          fullWidth
                          id="testimonial_quote"
                          name="testimonial_quote"
                          label="Testimonial Quote"
                          multiline
                          rows={4}
                          value={formik.values.testimonial_quote}
                          onChange={formik.handleChange}
                          placeholder="The client's feedback about the project..."
                          sx={{ mb: 2 }}
                        />
                        
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              id="testimonial_author"
                              name="testimonial_author"
                              label="Client Name"
                              value={formik.values.testimonial_author}
                              onChange={formik.handleChange}
                              placeholder="E.g., John Smith"
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              fullWidth
                              id="testimonial_role"
                              name="testimonial_role"
                              label="Client Role/Position"
                              value={formik.values.testimonial_role}
                              onChange={formik.handleChange}
                              placeholder="E.g., CEO, Project Manager"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <Card>
                          <CardContent>
                            <Typography variant="subtitle2" gutterBottom>
                              Client Photo (Optional)
                            </Typography>
                            
                            {testimonialImagePreview ? (
                              <Box sx={{ position: 'relative', mb: 2 }}>
                                <CardMedia
                                  component="img"
                                  image={testimonialImagePreview}
                                  alt="Testimonial author"
                                  sx={{ 
                                    borderRadius: '50%', 
                                    height: 120,
                                    width: 120,
                                    margin: '0 auto',
                                    objectFit: 'cover',
                                    backgroundColor: 'rgba(0,0,0,0.03)'
                                  }}
                                />
                                <IconButton
                                  sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    '&:hover': {
                                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    },
                                  }}
                                  onClick={handleRemoveTestimonialImage}
                                >
                                  <DeleteIcon sx={{ color: 'white' }} />
                                </IconButton>
                              </Box>
                            ) : (
                              <Box
                                sx={{
                                  height: 120,
                                  width: 120,
                                  margin: '0 auto',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  border: '2px dashed grey.300',
                                  borderRadius: '50%',
                                  mb: 2,
                                }}
                              >
                                <AddPhotoIcon fontSize="medium" color="disabled" />
                              </Box>
                            )}
                            
                            <Box sx={{ textAlign: 'center' }}>
                              <input
                                type="file"
                                accept="image/*"
                                id="testimonial-image-upload"
                                onChange={handleTestimonialImageUpload}
                                style={{ display: 'none' }}
                              />
                              <label htmlFor="testimonial-image-upload">
                                <Button
                                  component="span"
                                  variant="outlined"
                                  startIcon={<CloudUploadIcon />}
                                  disabled={uploadingTestimonialImage}
                                  size="small"
                                >
                                  {uploadingTestimonialImage 
                                    ? 'Uploading...' 
                                    : testimonialImagePreview 
                                      ? 'Change Photo' 
                                      : 'Upload Photo'}
                                </Button>
                              </label>
                              {uploadingTestimonialImage && <CircularProgress size={24} sx={{ ml: 2, mt: 2 }} />}
                            </Box>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            )}
            
            {/* Services & Details Tab */}
            {currentTab === 4 && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <FormLabel sx={{ mb: 1 }}>Related Services</FormLabel>
                    {servicesLoading ? (
                      <Box sx={{ textAlign: 'center', py: 2 }}>
                        <CircularProgress size={24} />
                        <Typography variant="body2" sx={{ mt: 1 }}>Loading services...</Typography>
                      </Box>
                    ) : availableServices.length === 0 ? (
                      <Typography color="error">
                        No services available. Please create services first.
                      </Typography>
                    ) : (
                      <>
                        <Select
                          multiple
                          value={formik.values.services}
                          onChange={(e) => {
                            console.log('Selected services:', e.target.value);
                            formik.setFieldValue('services', e.target.value);
                          }}
                          input={<OutlinedInput />}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => {
                                const service = availableServices.find(s => s.id === value);
                                return (
                                  <Chip key={value} label={service ? service.title : value} />
                                );
                              })}
                            </Box>
                          )}
                          MenuProps={{
                            PaperProps: {
                              style: { maxHeight: 250 }
                            }
                          }}
                        >
                          {availableServices.map((service) => (
                            <MenuItem key={service.id} value={service.id}>
                              {service.title}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>
                          Select services that were used in this project
                        </FormHelperText>
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" color="primary">
                            Available services: {availableServices.length}
                          </Typography>
                          <Typography variant="body2">
                            Selected services: {formik.values.services.length}
                          </Typography>
                        </Box>
                      </>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <FormLabel sx={{ mb: 1 }}>Technologies Used</FormLabel>
                    <Box sx={{ mb: 2, display: 'flex' }}>
                      <TextField 
                        value={newTechInput}
                        onChange={(e) => setNewTechInput(e.target.value)}
                        placeholder="e.g., React"
                        fullWidth
                        size="small"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTechnology();
                          }
                        }}
                        helperText="Press Enter or click Add to add a technology"
                      />
                      <Button 
                        variant="contained" 
                        onClick={handleAddTechnology}
                        disabled={!newTechInput.trim()}
                        sx={{ ml: 1 }}
                      >
                        Add
                      </Button>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, minHeight: '100px' }}>
                      {formik.values.technologies && Object.keys(formik.values.technologies).length > 0 ? (
                        Object.keys(formik.values.technologies).map((tech) => (
                          <Chip 
                            key={tech}
                            label={tech}
                            onDelete={() => handleRemoveTechnology(tech)}
                            color="primary"
                            variant="outlined"
                            sx={{ m: 0.5 }}
                          />
                        ))
                      ) : (
                        <Typography color="text.secondary" sx={{ p: 2, fontStyle: 'italic' }}>
                          No technologies added yet. Add technologies that were used in this project.
                        </Typography>
                      )}
                    </Box>
                    <FormHelperText>
                      {formik.values.technologies && Object.keys(formik.values.technologies).length > 0 ? 
                        `${Object.keys(formik.values.technologies).length} technologies added` : 
                        'Add technologies that were used in this project'}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            )}
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/admin/projects')}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                type="submit"
                disabled={formik.isSubmitting}
                onClick={() => {
                  console.log('Save button clicked');
                  console.log('Form values:', formik.values);
                  console.log('Form errors:', formik.errors);
                  console.log('Form touched:', formik.touched);
                  
                  // Debug technologies
                  debugTechnologies(formik.values.technologies, "Technologies before submit");
                  
                  // Check technologies format
                  const techKeys = Object.keys(formik.values.technologies || {});
                  console.log('Number of technologies:', techKeys.length);
                  console.log('Technology keys:', techKeys);
                  
                  // If there are validation errors, show them
                  if (Object.keys(formik.errors).length > 0) {
                    console.error('Validation errors:', formik.errors);
                    toast.error('Please fix the form errors before submitting');
                  }
                }}
              >
                {isEditMode ? 'Update Project' : 'Create Project'}
              </Button>
            </Box>
          </Paper>
        </Box>
      )}
      
      <ToastContainer position="bottom-right" />
    </Box>
  );
};

export default ProjectForm; 