import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Container, Typography, Box, Paper, Button, TextField, Grid,
  FormControlLabel, Switch, CardMedia, IconButton, CircularProgress,
  Divider, FormHelperText, FormControl, InputLabel, Card, CardContent
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  Email as EmailIcon,
  AddPhotoAlternate as AddPhotoIcon
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { api } from '../../../utility/api';
import teamApi from '../../services/teamService';

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  position: Yup.string().required('Position is required'),
  bio: Yup.string().required('Bio is required'),
  email: Yup.string().email('Enter a valid email').nullable(),
  linkedin: Yup.string().url('Enter a valid URL').nullable(),
  github: Yup.string().url('Enter a valid URL').nullable(),
  twitter: Yup.string().url('Enter a valid URL').nullable(),
  order: Yup.number().required('Order is required').min(0, 'Order must be a positive number')
});

const TeamMemberForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id) && id !== 'new';
  const [loading, setLoading] = useState(isEditMode);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // Create a memoized placeholder image URL
  const placeholderUrl = useMemo(() => {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
  }, []);

  // Initialize formik
  const formik = useFormik({
    initialValues: {
      name: '',
      position: '',
      bio: '',
      email: '',
      linkedin: '',
      github: '',
      twitter: '',
      order: 0,
      is_active: true,
      image: null,
      image_url: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const teamMemberData = { ...values };
        
        // Remove image_url as it's a derived field
        delete teamMemberData.image_url;
        
        if (isEditMode) {
          await teamApi.update(id, teamMemberData);
          toast.success('Team member updated successfully');
        } else {
          await teamApi.create(teamMemberData);
          toast.success('Team member created successfully');
        }
        
        // Navigate back to team list
        setTimeout(() => {
          navigate('/admin/team');
        }, 1500);
      } catch (error) {
        console.error('Error saving team member:', error);
        toast.error('Failed to save team member');
      }
    }
  });

  useEffect(() => {
    // If in edit mode, fetch team member data
    if (isEditMode) {
      fetchTeamMember();
    }
  }, [isEditMode, id]);

  const fetchTeamMember = async () => {
    try {
      setLoading(true);
      const response = await teamApi.getById(id);
      const member = response.data;
      
      // Set form values
      formik.setValues({
        name: member.name || '',
        position: member.position || '',
        bio: member.bio || '',
        email: member.email || '',
        linkedin: member.linkedin || '',
        github: member.github || '',
        twitter: member.twitter || '',
        order: member.order || 0,
        is_active: member.is_active || false,
        image: member.image || null,
        image_url: member.image_url || ''
      });
      
      // Set image preview
      if (member.image_url) {
        setImagePreview(member.image_url);
      }

      // Set editor state from HTML
      if (member.bio) {
        const contentBlock = htmlToDraft(member.bio);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
          setEditorState(EditorState.createWithContent(contentState));
        }
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching team member:', error);
      toast.error('Failed to load team member data');
      setLoading(false);
    }
  };

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
      
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('image', file);
      
      // Upload image through backend API
      const response = await api.post('/uploads/image/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update form with the image URL returned from our backend
      if (response.data && response.data.image_url) {
        // Store both the public_id and the full URL
        formik.setFieldValue('image', response.data.public_id);
        formik.setFieldValue('image_url', response.data.image_url);
        setImagePreview(response.data.image_url);
        
        console.log('Image uploaded successfully:', response.data);
        toast.success('Image uploaded successfully!');
      } else {
        throw new Error('Invalid response from server');
      }
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

  const handleEditorStateChange = (newState) => {
    setEditorState(newState);
    formik.setFieldValue('bio', draftToHtml(convertToRaw(newState.getCurrentContent())));
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading team member data...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button 
          startIcon={<ArrowBackIcon />}
          component={Link}
          to="/admin/team"
        >
          Back to Team
        </Button>
        
        <Typography variant="h4" component="h1" fontWeight={600}>
          {isEditMode ? 'Edit Team Member' : 'Add New Team Member'}
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Saving...' : 'Save Member'}
        </Button>
      </Box>
      
      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', p: 3 }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={4}>
            {/* Left Column - Basic Info */}
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    margin="normal"
                  />
                </Grid>
                
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    label="Position"
                    name="position"
                    value={formik.values.position}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.position && Boolean(formik.errors.position)}
                    helperText={formik.touched.position && formik.errors.position}
                    margin="normal"
                  />
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Display Order"
                    name="order"
                    type="number"
                    value={formik.values.order}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.order && Boolean(formik.errors.order)}
                    helperText={formik.touched.order && formik.errors.order}
                    margin="normal"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                    Biography
                  </Typography>
                  <Box sx={{ border: '1px solid #ddd', borderRadius: 1, mb: 2 }}>
                    <Editor
                      editorState={editorState}
                      onEditorStateChange={handleEditorStateChange}
                      wrapperClassName="wrapper-class"
                      editorClassName="editor-class"
                      toolbarClassName="toolbar-class"
                      toolbar={{
                        options: ['inline', 'blockType', 'list', 'textAlign', 'link', 'history'],
                        inline: {
                          options: ['bold', 'italic', 'underline'],
                        },
                      }}
                      editorStyle={{ height: '200px', padding: '0 15px', overflowY: 'auto' }}
                    />
                  </Box>
                  {formik.touched.bio && formik.errors.bio && (
                    <FormHelperText error>{formik.errors.bio}</FormHelperText>
                  )}
                </Grid>
              </Grid>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Contact Information
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    value={formik.values.email || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    margin="normal"
                    InputProps={{
                      startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />,
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="LinkedIn Profile"
                    name="linkedin"
                    value={formik.values.linkedin || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.linkedin && Boolean(formik.errors.linkedin)}
                    helperText={formik.touched.linkedin && formik.errors.linkedin}
                    margin="normal"
                    placeholder="https://linkedin.com/in/username"
                    InputProps={{
                      startAdornment: <LinkedInIcon color="action" sx={{ mr: 1 }} />,
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="GitHub Profile"
                    name="github"
                    value={formik.values.github || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.github && Boolean(formik.errors.github)}
                    helperText={formik.touched.github && formik.errors.github}
                    margin="normal"
                    placeholder="https://github.com/username"
                    InputProps={{
                      startAdornment: <GitHubIcon color="action" sx={{ mr: 1 }} />,
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Twitter Profile"
                    name="twitter"
                    value={formik.values.twitter || ''}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.twitter && Boolean(formik.errors.twitter)}
                    helperText={formik.touched.twitter && formik.errors.twitter}
                    margin="normal"
                    placeholder="https://twitter.com/username"
                    InputProps={{
                      startAdornment: <TwitterIcon color="action" sx={{ mr: 1 }} />,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            
            {/* Right Column - Image and Status */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Profile Image
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Upload a professional photo. Recommended size: 400x400px.
                  </Typography>
                  
                  {imagePreview ? (
                    <Box sx={{ position: 'relative', mb: 2 }}>
                      <CardMedia
                        component="img"
                        image={imagePreview}
                        alt="Profile image preview"
                        sx={{ 
                          borderRadius: '50%', 
                          height: 200,
                          width: 200,
                          margin: '0 auto',
                          objectFit: 'cover',
                          backgroundColor: 'rgba(0,0,0,0.03)'
                        }}
                        onError={(e) => {
                          // Prevent infinite error callbacks
                          if (e.target.src !== placeholderUrl) {
                            e.target.onerror = null;
                            e.target.src = placeholderUrl;
                          }
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
                        width: 200,
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
                      id="team-member-image-upload"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                    <label htmlFor="team-member-image-upload">
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
              
              <Card sx={{ mt: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Status
                  </Typography>
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={formik.values.is_active}
                        onChange={(e) => formik.setFieldValue('is_active', e.target.checked)}
                        name="is_active"
                        color="primary"
                      />
                    }
                    label={formik.values.is_active ? 'Active' : 'Inactive'}
                  />
                  <FormHelperText>
                    {formik.values.is_active 
                      ? 'This team member will be visible on the website.' 
                      : 'This team member will be hidden from the website.'}
                  </FormHelperText>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button
              variant="outlined"
              component={Link}
              to="/admin/team"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={formik.isSubmitting}
              startIcon={<SaveIcon />}
            >
              {formik.isSubmitting ? 'Saving...' : isEditMode ? 'Update Member' : 'Create Member'}
            </Button>
          </Box>
        </form>
      </Paper>
      
      <ToastContainer position="bottom-right" />
    </Container>
  );
};

export default TeamMemberForm; 