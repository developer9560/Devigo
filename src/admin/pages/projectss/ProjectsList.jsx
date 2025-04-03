// frontend/src/admin/pages/projects/ProjectsList.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Button, Paper, Grid, Card, CardContent, 
  CardMedia, CardActions, TextField, InputAdornment, Chip, IconButton,
  Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, 
  DialogTitle, Divider, FormControl, InputLabel, Select, Skeleton
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  OpenInNew as OpenInNewIcon
} from '@mui/icons-material';

// Demo projects data for display
const projectsData = [
  {
    id: 1,
    title: 'E-commerce Website Redesign',
    slug: 'ecommerce-website-redesign',
    client: 'Fashion Boutique',
    description: 'Complete redesign of an e-commerce platform with improved UX and conversion optimization.',
    featuredImage: '/images/projects/project1.jpg',
    categories: ['Web Development', 'E-commerce', 'UI/UX Design'],
    technologies: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    isPublished: true,
    isFeatured: true,
    completionDate: '2023-03-15',
    updatedAt: '2023-04-02T14:35:00Z'
  },
  {
    id: 2,
    title: 'Mobile Banking App',
    slug: 'mobile-banking-app',
    client: 'FinTech Solutions',
    description: 'Secure and user-friendly mobile banking application with advanced features.',
    featuredImage: '/images/projects/project2.jpg',
    categories: ['Mobile Development', 'FinTech'],
    technologies: ['React Native', 'Firebase', 'Redux'],
    isPublished: true,
    isFeatured: true,
    completionDate: '2023-02-10',
    updatedAt: '2023-03-20T09:15:00Z'
  },
  {
    id: 3,
    title: 'Healthcare Patient Portal',
    slug: 'healthcare-patient-portal',
    client: 'MediCare Group',
    description: 'Patient management system with appointment scheduling and medical records access.',
    featuredImage: '/images/projects/project3.jpg',
    categories: ['Web Development', 'Healthcare'],
    technologies: ['Angular', 'Express', 'PostgreSQL'],
    isPublished: true,
    isFeatured: false,
    completionDate: '2022-12-05',
    updatedAt: '2023-02-15T11:40:00Z'
  },
  {
    id: 4,
    title: 'Real Estate Listing Platform',
    slug: 'real-estate-listing-platform',
    client: 'HomeFind Realty',
    description: 'Property listing and management platform with advanced search features.',
    featuredImage: '/images/projects/project4.jpg',
    categories: ['Web Development', 'Real Estate'],
    technologies: ['Vue.js', 'Laravel', 'MySQL'],
    isPublished: false,
    isFeatured: false,
    completionDate: '2022-10-20',
    updatedAt: '2023-01-30T16:20:00Z'
  }
];

// Demo categories for filtering
const availableCategories = [
  'Web Development', 'Mobile Development', 'UI/UX Design', 
  'E-commerce', 'FinTech', 'Healthcare', 'Real Estate', 'Education'
];

const ProjectsList = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [featuredFilter, setFeaturedFilter] = useState('all');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Simulate data loading from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Filtered projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === '' || 
                            project.categories.includes(categoryFilter);

    const matchesStatus = statusFilter === 'all' ? 
                          true : 
                          statusFilter === 'published' ? 
                          project.isPublished : 
                          !project.isPublished;

    const matchesFeatured = featuredFilter === 'all' ? 
                           true : 
                           featuredFilter === 'featured' ? 
                           project.isFeatured : 
                           !project.isFeatured;

    return matchesSearch && matchesCategory && matchesStatus && matchesFeatured;
  });

  // Action menu handlers
  const handleMenuOpen = (event, projectId) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedProjectId(projectId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleEditProject = () => {
    navigate(`/admin/projects/${selectedProjectId}`);
    handleMenuClose();
  };

  const handleTogglePublish = () => {
    // In a real app, this would call an API
    setProjects(projects.map(project => 
      project.id === selectedProjectId ? 
      { ...project, isPublished: !project.isPublished } : 
      project
    ));
    handleMenuClose();
  };

  const handleToggleFeatured = () => {
    // In a real app, this would call an API
    setProjects(projects.map(project => 
      project.id === selectedProjectId ? 
      { ...project, isFeatured: !project.isFeatured } : 
      project
    ));
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // In a real app, this would call an API
    setProjects(projects.filter(project => project.id !== selectedProjectId));
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const getSelectedProject = () => {
    return projects.find(project => project.id === selectedProjectId);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" fontWeight={600}>
            Projects
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/admin/projects/new"
            startIcon={<AddIcon />}
          >
            Add Project
          </Button>
        </Box>
        
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2, 
            display: 'flex', 
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            mb: 3
          }}
        >
          <TextField
            placeholder="Search projects..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flexGrow: 1, minWidth: 200 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="category-filter-label">Category</InputLabel>
            <Select
              labelId="category-filter-label"
              id="category-filter"
              value={categoryFilter}
              label="Category"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>
              {availableCategories.map(category => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="status-filter-label">Status</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="published">Published</MenuItem>
              <MenuItem value="draft">Draft</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="featured-filter-label">Featured</InputLabel>
            <Select
              labelId="featured-filter-label"
              id="featured-filter"
              value={featuredFilter}
              label="Featured"
              onChange={(e) => setFeaturedFilter(e.target.value)}
            >
              <MenuItem value="all">All Projects</MenuItem>
              <MenuItem value="featured">Featured</MenuItem>
              <MenuItem value="not-featured">Not Featured</MenuItem>
            </Select>
          </FormControl>
        </Paper>
        
        {loading ? (
          <Grid container spacing={3}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
                <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
                  <Skeleton variant="rectangular" height={160} />
                  <CardContent>
                    <Skeleton variant="text" sx={{ fontSize: '1.2rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '60%' }} />
                  </CardContent>
                  <CardActions>
                    <Skeleton variant="rectangular" width={70} height={30} sx={{ borderRadius: 1 }} />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : filteredProjects.length === 0 ? (
          <Paper 
            elevation={0}
            sx={{ 
              p: 4, 
              textAlign: 'center',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No projects found
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              No projects match your current filters. Try adjusting your search or filter criteria.
            </Typography>
            <Button 
              variant="outlined" 
              startIcon={<AddIcon />}
              component={Link}
              to="/admin/projects/new"
            >
              Add New Project
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredProjects.map((project) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
                <Card 
                  elevation={0} 
                  sx={{ 
                    border: '1px solid', 
                    borderColor: 'divider',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="160"
                      image={project.featuredImage || '/images/placeholder-project.jpg'}
                      alt={project.title}
                    />
                    <Box 
                      sx={{ 
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        display: 'flex',
                        gap: 0.5
                      }}
                    >
                      {project.isFeatured && (
                        <Chip 
                          label="Featured" 
                          size="small"
                          color="primary"
                          icon={<StarIcon fontSize="small" />}
                          sx={{ 
                            bgcolor: 'rgba(10, 102, 194, 0.9)',
                            backdropFilter: 'blur(4px)',
                          }}
                        />
                      )}
                      {!project.isPublished && (
                        <Chip 
                          label="Draft" 
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(0, 0, 0, 0.7)',
                            backdropFilter: 'blur(4px)',
                            color: 'white'
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2" noWrap>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {project.client}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph sx={{ 
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    }}>
                      {project.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                      {project.categories.slice(0, 2).map((category, index) => (
                        <Chip 
                          key={index}
                          label={category}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: '0.7rem' }}
                        />
                      ))}
                      {project.categories.length > 2 && (
                        <Chip 
                          label={`+${project.categories.length - 2}`}
                          size="small"
                          sx={{ fontSize: '0.7rem' }}
                        />
                      )}
                    </Box>
                  </CardContent>
                  
                  <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button 
                      size="small" 
                      startIcon={<EditIcon />}
                      component={Link}
                      to={`/admin/projects/${project.id}`}
                    >
                      Edit
                    </Button>
                    <IconButton 
                      size="small"
                      onClick={(event) => handleMenuOpen(event, project.id)}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      
      {/* Actions Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleEditProject}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
        
        <MenuItem onClick={() => window.open('/projects/' + (getSelectedProject()?.slug || ''), '_blank')}>
          <ListItemIcon>
            <OpenInNewIcon fontSize="small" />
          </ListItemIcon>
          View
        </MenuItem>
        
        {selectedProjectId && getSelectedProject()?.isPublished ? (
          <MenuItem onClick={handleTogglePublish}>
            <ListItemIcon>
              <VisibilityOffIcon fontSize="small" />
            </ListItemIcon>
            Unpublish
          </MenuItem>
        ) : (
          <MenuItem onClick={handleTogglePublish}>
            <ListItemIcon>
              <VisibilityIcon fontSize="small" />
            </ListItemIcon>
            Publish
          </MenuItem>
        )}
        
        {selectedProjectId && getSelectedProject()?.isFeatured ? (
          <MenuItem onClick={handleToggleFeatured}>
            <ListItemIcon>
              <StarBorderIcon fontSize="small" />
            </ListItemIcon>
            Remove from Featured
          </MenuItem>
        ) : (
          <MenuItem onClick={handleToggleFeatured}>
            <ListItemIcon>
              <StarIcon fontSize="small" />
            </ListItemIcon>
            Add to Featured
          </MenuItem>
        )}
        
        <Divider />
        
        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Delete Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the project "{selectedProjectId && getSelectedProject()?.title}"? 
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProjectsList;