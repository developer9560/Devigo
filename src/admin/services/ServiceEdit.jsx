// frontend/src/admin/services/ServiceEdit.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Box, Typography, Paper, TextField, Button, 
  Grid, FormControlLabel, Switch, Divider, IconButton,
  InputAdornment, Chip, Autocomplete, Card, CardContent,
  Alert, Tab, Tabs, FormHelperText, CircularProgress,
  MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import { 
  Save as SaveIcon, 
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  DragIndicator as DragIndicatorIcon,
  Image as ImageIcon,
  Remove as RemoveIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { servicesApi } from '../../utility/api';
import axios from 'axios';

// Rich text editor toolbar options
const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['link', 'image'],
    ['clean']
  ],
};

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

const DraggableItem = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  cursor: 'move',
}));

const ServiceEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [imagePreview, setImagePreview] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const isNewService = id === 'new';

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      title: '',
      slug: '',
      description: '',
      excerpt: '',
      icon: '',
      image: null,
      image_url: '',
      status: 'active',
      featured: false,
      order: 0,
      features: [],
      benefits: [],
      technologies: {}
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      slug: Yup.string().matches(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
      description: Yup.string().required('Description is required'),
      excerpt: Yup.string().max(255, 'Excerpt should not exceed 255 characters'),
      order: Yup.number().required('Order is required').min(0, 'Order must be a positive number')
    }),
    onSubmit: async (values) => {
      try {
        setSaving(true);
        setError(null);
        
        console.log('Service data to save:', values);
        
        // Prepare data for API
        const serviceData = {
          ...values,
          // Convert features and benefits arrays to JSON if they're not already
          features: Array.isArray(values.features) ? values.features : [],
          benefits: Array.isArray(values.benefits) ? values.benefits : [],
          technologies: typeof values.technologies === 'object' ? values.technologies : {}
        };
        
        // Remove image_url as it's a derived field
        delete serviceData.image_url;
        
        let response;
        if (isNewService) {
          response = await servicesApi.create(serviceData);
        } else {
          response = await servicesApi.update(id, serviceData);
        }
        
        console.log('Service saved:', response.data);
        navigate('/admin/services');
      } catch (error) {
        console.error('Error saving service:', error);
        setError(error.response?.data?.error || 'Failed to save service. Please try again.');
      } finally {
        setSaving(false);
      }
    }
  });

  // Load service data if editing an existing service
  useEffect(() => {
    if (!isNewService) {
      const fetchService = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const response = await servicesApi.getById(id);
          const service = response.data;
          
          console.log('Fetched service:', service);
          
          if (service) {
            // Set form values from service data
            formik.setValues({
              title: service.title || '',
              slug: service.slug || '',
              description: service.description || '',
              excerpt: service.excerpt || '',
              icon: service.icon || '',
              image: service.image || null,
              image_url: service.image_url || '',
              status: service.status || 'active',
              featured: service.featured || false,
              order: service.order || 0,
              features: service.features || [],
              benefits: service.benefits || [],
              technologies: service.technologies || {}
            });
            
            // Set image preview if available
            if (service.image_url) {
              setImagePreview(service.image_url);
            }
          }
        } catch (error) {
          console.error('Error fetching service:', error);
          setError('Failed to load service data. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      
      fetchService();
    } else {
      setLoading(false);
    }
  }, [id, isNewService]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Auto-generate slug from title
  const handleTitleChange = (e) => {
    const { value } = e.target;
    formik.setFieldValue('title', value);
    
    // Only auto-generate slug if the user hasn't manually edited it or for new services
    if (isNewService || !formik.touched.slug) {
      const slugValue = value
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      formik.setFieldValue('slug', slugValue);
    }
  };

  // Handle arrays operations
  const handleAddFeature = () => {
    const currentFeatures = Array.isArray(formik.values.features) 
      ? formik.values.features 
      : [];
    formik.setFieldValue('features', [...currentFeatures, '']);
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = [...formik.values.features];
    newFeatures.splice(index, 1);
    formik.setFieldValue('features', newFeatures);
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formik.values.features];
    newFeatures[index] = value;
    formik.setFieldValue('features', newFeatures);
  };

  const handleAddBenefit = () => {
    const currentBenefits = Array.isArray(formik.values.benefits) 
      ? formik.values.benefits 
      : [];
    formik.setFieldValue('benefits', [...currentBenefits, '']);
  };

  const handleRemoveBenefit = (index) => {
    const newBenefits = [...formik.values.benefits];
    newBenefits.splice(index, 1);
    formik.setFieldValue('benefits', newBenefits);
  };

  const handleBenefitChange = (index, value) => {
    const newBenefits = [...formik.values.benefits];
    newBenefits[index] = value;
    formik.setFieldValue('benefits', newBenefits);
  };

  // Technology categories handling
  const handleAddTechCategory = (category) => {
    if (!category) return;
    
    const newTechnologies = { ...formik.values.technologies };
    if (!newTechnologies[category]) {
      newTechnologies[category] = [];
    }
    formik.setFieldValue('technologies', newTechnologies);
  };

  const handleRemoveTechCategory = (category) => {
    const newTechnologies = { ...formik.values.technologies };
    delete newTechnologies[category];
    formik.setFieldValue('technologies', newTechnologies);
  };

  const handleAddTechItem = (category, item) => {
    if (!category || !item) return;
    
    const newTechnologies = { ...formik.values.technologies };
    if (!newTechnologies[category]) {
      newTechnologies[category] = [];
    }
    if (!newTechnologies[category].includes(item)) {
      newTechnologies[category] = [...newTechnologies[category], item];
    }
    formik.setFieldValue('technologies', newTechnologies);
  };

  const handleRemoveTechItem = (category, index) => {
    const newTechnologies = { ...formik.values.technologies };
    newTechnologies[category].splice(index, 1);
    // If category is empty, remove it
    if (newTechnologies[category].length === 0) {
      delete newTechnologies[category];
    }
    formik.setFieldValue('technologies', newTechnologies);
  };

  // Handle image upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, or WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB max
      setError('Image size should not exceed 5MB');
      return;
    }

    try {
      setUploadingImage(true);
      
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'devigo_services'); // Replace with your Cloudinary upload preset
      
      // Upload to Cloudinary
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/your-cloud-name/image/upload', // Replace with your cloud name
        formData
      );
      
      // Update form with Cloudinary URL
      formik.setFieldValue('image', response.data.public_id);
      formik.setFieldValue('image_url', response.data.secure_url);
      setImagePreview(response.data.secure_url);
      
      console.log('Image uploaded:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading service data...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/admin/services')}
        >
          Back to Services
        </Button>
        
        <Typography variant="h4" component="h1" fontWeight={600}>
          {isNewService ? 'Add New Service' : 'Edit Service'}
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={formik.handleSubmit}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Service'}
        </Button>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Basic Information" />
          <Tab label="Details" />
          <Tab label="Features & Benefits" />
          <Tab label="Technologies" />
        </Tabs>
        
        {/* Basic Information Tab */}
        <Box role="tabpanel" hidden={tabValue !== 0} sx={{ p: 3 }}>
          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Service Title"
                  name="title"
                  value={formik.values.title}
                  onChange={handleTitleChange}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Slug"
                  name="slug"
                  value={formik.values.slug}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.slug && Boolean(formik.errors.slug)}
                  helperText={
                    formik.touched.slug && formik.errors.slug ? 
                    formik.errors.slug : 
                    'Used in the URL: example.com/services/your-slug'
                  }
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Status"
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                    <MenuItem value="coming_soon">Coming Soon</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Display Order"
                  name="order"
                  type="number"
                  value={formik.values.order}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.order && Boolean(formik.errors.order)}
                  helperText={
                    formik.touched.order && formik.errors.order ? 
                    formik.errors.order : 
                    'Lower numbers appear first'
                  }
                  margin="normal"
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
              
              <Grid item xs={12} md={3}>
                <FormControlLabel
                  control={
                    <Switch
                      name="featured"
                      checked={formik.values.featured}
                      onChange={formik.handleChange}
                    />
                  }
                  label="Featured Service"
                  sx={{ mt: 3 }}
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Icon (Material Icon Name)"
                  name="icon"
                  value={formik.values.icon}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText="Enter a Material icon name (e.g., 'code', 'web', 'design')"
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box>
                  <input
                    type="file"
                    accept="image/*"
                    id="image-upload"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="image-upload">
                    <Button
                      component="span"
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      sx={{ mt: 2 }}
                      disabled={uploadingImage}
                    >
                      {uploadingImage ? 'Uploading...' : 'Upload Service Image'}
                    </Button>
                  </label>
                  {uploadingImage && <CircularProgress size={24} sx={{ ml: 2, mt: 2 }} />}
                  {imagePreview && (
                    <Box sx={{ mt: 2 }}>
                      <ImagePreview src={imagePreview} alt="Service preview" />
                      <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                        {formik.values.image}
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Excerpt"
                  name="excerpt"
                  value={formik.values.excerpt}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.excerpt && Boolean(formik.errors.excerpt)}
                  helperText={
                    formik.touched.excerpt && formik.errors.excerpt ? 
                    formik.errors.excerpt : 
                    'A short summary of the service (max 255 characters)'
                  }
                  margin="normal"
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
          )}
        </Box>
        
        {/* Details Tab */}
        <Box role="tabpanel" hidden={tabValue !== 1} sx={{ p: 3 }}>
          {tabValue === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Service Description
                </Typography>
                <ReactQuill
                  theme="snow"
                  value={formik.values.description}
                  onChange={(content) => formik.setFieldValue('description', content)}
                  modules={quillModules}
                  style={{ height: '300px', marginBottom: '60px' }}
                />
                {formik.touched.description && formik.errors.description && (
                  <FormHelperText error>{formik.errors.description}</FormHelperText>
                )}
              </Grid>
            </Grid>
          )}
        </Box>
        
        {/* Features & Benefits Tab */}
        <Box role="tabpanel" hidden={tabValue !== 2} sx={{ p: 3 }}>
          {tabValue === 2 && (
            <Grid container spacing={4}>
              {/* Key Features */}
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Key Features
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Add the main features of this service
                  </Typography>
                </Box>
                
                {formik.values.features && formik.values.features.map((feature, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      mb: 2 
                    }}
                  >
                    <TextField
                      fullWidth
                      label={`Feature ${index + 1}`}
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      margin="none"
                    />
                    <IconButton 
                      color="error" 
                      onClick={() => handleRemoveFeature(index)}
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                
                <Button
                  startIcon={<AddIcon />}
                  onClick={handleAddFeature}
                  sx={{ mt: 1 }}
                >
                  Add Feature
                </Button>
              </Grid>
              
              {/* Benefits */}
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Benefits
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Add the benefits of this service for clients
                  </Typography>
                </Box>
                
                {formik.values.benefits && formik.values.benefits.map((benefit, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      mb: 2 
                    }}
                  >
                    <TextField
                      fullWidth
                      label={`Benefit ${index + 1}`}
                      value={benefit}
                      onChange={(e) => handleBenefitChange(index, e.target.value)}
                      margin="none"
                    />
                    <IconButton 
                      color="error" 
                      onClick={() => handleRemoveBenefit(index)}
                      sx={{ ml: 1 }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ))}
                
                <Button
                  startIcon={<AddIcon />}
                  onClick={handleAddBenefit}
                  sx={{ mt: 1 }}
                >
                  Add Benefit
                </Button>
              </Grid>
            </Grid>
          )}
        </Box>
        
        {/* Technologies Tab */}
        <Box role="tabpanel" hidden={tabValue !== 3} sx={{ p: 3 }}>
          {tabValue === 3 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Technologies
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Group technologies used for this service by category
                  </Typography>
                </Box>
                
                {/* Add new technology category */}
                <Box sx={{ mb: 4 }}>
                  <TextField
                    label="Add New Category"
                    placeholder="e.g., Front-end, Back-end, Database, etc."
                    fullWidth
                    margin="normal"
                    inputRef={(input) => {
                      if (input) {
                        input.onkeydown = (e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTechCategory(e.target.value);
                            e.target.value = '';
                          }
                        };
                      }
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    Press Enter to add a new category
                  </Typography>
                </Box>
                
                <Divider sx={{ mb: 3 }} />
                
                {/* Technology categories */}
                {formik.values.technologies && Object.keys(formik.values.technologies).map((category) => (
                  <Box key={category} sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Typography variant="subtitle1" fontWeight={500}>
                        {category}
                      </Typography>
                      <IconButton 
                        size="small" 
                        color="error" 
                        onClick={() => handleRemoveTechCategory(category)}
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {formik.values.technologies[category].map((item, index) => (
                        <Chip
                          key={index}
                          label={item}
                          onDelete={() => handleRemoveTechItem(category, index)}
                        />
                      ))}
                    </Box>
                    
                    <TextField
                      label={`Add to ${category}`}
                      placeholder="e.g., React, Node.js, MySQL, etc."
                      size="small"
                      fullWidth
                      margin="normal"
                      inputRef={(input) => {
                        if (input) {
                          input.onkeydown = (e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddTechItem(category, e.target.value);
                              e.target.value = '';
                            }
                          };
                        }
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Press Enter to add a new technology
                    </Typography>
                  </Box>
                ))}
                
                {Object.keys(formik.values.technologies || {}).length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No technology categories added yet.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Add categories like "Front-end", "Back-end", "Database", etc.
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default ServiceEdit;