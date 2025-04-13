import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Button, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Chip, IconButton,
  Dialog, DialogActions, DialogContent, DialogContentText, 
  DialogTitle, Card, CardMedia, Grid, TextField, MenuItem,
  Select, FormControl, InputLabel, InputAdornment, Avatar
} from '@mui/material';
import { 
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import projectService from '../../services/projectService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const STATUS_COLORS = {
  planning: 'warning',
  in_progress: 'info',
  completed: 'success',
  archived: 'default'
};

const STATUS_LABELS = {
  planning: 'Planning',
  in_progress: 'In Progress',
  completed: 'Completed',
  archived: 'Archived'
};

// Simple date formatting function to replace date-fns
const formatDate = (dateString) => {
  if (!dateString) return 'Not set';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [featuredFilter, setFeaturedFilter] = useState('all');
  const [totalCount, setTotalCount] = useState(0);
  const [shouldRefresh, setShouldRefresh] = useState(true);
  
  const navigate = useNavigate();

  // Debounce search term to prevent excessive filtering
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Add refreshOnMount effect to ensure data is always fresh
  useEffect(() => {
    console.log("Component mounted - forcing initial data refresh");
    setShouldRefresh(true);
  }, []); // Empty dependency array means this runs once on mount

  // Only fetch when explicitly needed via shouldRefresh flag
  useEffect(() => {
    console.log("shouldRefresh effect running, shouldRefresh:", shouldRefresh);
    if (shouldRefresh) {
      console.log("Calling fetchProjects()");
      fetchProjects();
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  // Update refresh flag when filters change
  useEffect(() => {
    setShouldRefresh(true);
  }, [statusFilter, featuredFilter]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      // Clear any previous projects while loading
      setProjects([]);
      
      const params = {};
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }
      if (featuredFilter !== 'all') {
        params.featured = featuredFilter === 'featured';
      }
      
      console.log("Fetching projects with params:", params);
      const response = await projectService.getAll(params);
      console.log("Projects API response:", response);
      
      if (!response || !response.data) {
        toast.error('Received invalid data from server');
        setProjects([]);
        setTotalCount(0);
      } else {
        // Log the exact data received and set
        console.log("Projects data received:", response.data);
        console.log("Number of projects received:", response.data.length);
        
        // Ensure we have an array
        const projectsArray = Array.isArray(response.data) ? response.data : [];
        
        // Filter out any null/undefined values that might cause rendering issues
        const validProjects = projectsArray.filter(p => p && p.id);
        
        console.log("Valid projects to display:", validProjects.length);
        setProjects(validProjects);
        setTotalCount(response.count || validProjects.length || 0);
        
        // Display a warning if we filtered out any invalid projects
        if (validProjects.length < projectsArray.length) {
          console.warn(
            "Filtered out", 
            projectsArray.length - validProjects.length, 
            "invalid projects"
          );
        }
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
      setProjects([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (id) => {
    navigate(`/admin/projects/edit/${id}`);
  };

  const handleViewProject = (slug) => {
    window.open(`/portfolio/${slug}`, '_blank');
  };

  const handleDeleteClick = (project) => {
    setProjectToDelete(project);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;
    
    try {
      await projectService.remove(projectToDelete.id);
      toast.success('Project deleted successfully');
      setDeleteDialogOpen(false);
      setProjectToDelete(null);
      
      // Force a refresh to get the updated list
      setShouldRefresh(true);
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleToggleFeatured = async (project) => {
    try {
      const updatedProject = { ...project, featured: !project.featured };
      await projectService.update(project.id, updatedProject);
      
      setProjects(prevProjects => 
        prevProjects.map(p => p.id === project.id ? { ...p, featured: !p.featured } : p)
      );
      
      toast.success(`Project ${updatedProject.featured ? 'marked as featured' : 'removed from featured'}`);
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    }
  };

  const filteredProjects = projects.filter(project => {
    if (!project) return false;
    
    return (project.title && project.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
           (project.description && project.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
           (project.client && project.client.toLowerCase().includes(debouncedSearchTerm.toLowerCase())) ||
           (project.category && project.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
  });

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Projects & Portfolio
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={RouterLink}
          to="/admin/projects/create"
        >
          Add New Project
        </Button>
      </Box>

      <Card sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search Projects"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="planning">Planning</MenuItem>
                <MenuItem value="in_progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="archived">Archived</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Featured</InputLabel>
              <Select
                value={featuredFilter}
                onChange={(e) => setFeaturedFilter(e.target.value)}
                label="Featured"
              >
                <MenuItem value="all">All Projects</MenuItem>
                <MenuItem value="featured">Featured Only</MenuItem>
                <MenuItem value="non-featured">Non-Featured Only</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="subtitle2" color="text.secondary" align="right">
              {filteredProjects.length} of {totalCount} projects
            </Typography>
          </Grid>
        </Grid>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Completion Date</TableCell>
              <TableCell>Featured</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography>Loading projects...</Typography>
                </TableCell>
              </TableRow>
            ) : filteredProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography>No projects found</Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    {project.image_url || project.image ? (
                      <Avatar
                        src={project.image_url || project.image}
                        alt={project.title}
                        variant="rounded"
                        sx={{ 
                          width: 60, 
                          height: 60, 
                          borderRadius: 1
                        }}
                      />
                    ) : (
                      <Box 
                        sx={{ 
                          width: 60, 
                          height: 60, 
                          borderRadius: 1, 
                          backgroundColor: 'grey.200', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center' 
                        }}
                      >
                        <ImageIcon color="disabled" />
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" fontWeight="medium">
                      {project.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {project.slug}
                    </Typography>
                  </TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>{project.category}</TableCell>
                  <TableCell>
                    <Chip 
                      label={STATUS_LABELS[project.status] || project.status}
                      color={STATUS_COLORS[project.status] || "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {formatDate(project.completion_date)}
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => handleToggleFeatured(project)}
                      color={project.featured ? "warning" : "default"}
                      size="small"
                    >
                      {project.featured ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <IconButton 
                        color="info" 
                        size="small"
                        onClick={() => handleViewProject(project.slug)}
                        title="View Project"
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton 
                        color="primary" 
                        size="small"
                        onClick={() => handleEditProject(project.id)}
                        title="Edit Project"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        color="error" 
                        size="small"
                        onClick={() => handleDeleteClick(project)}
                        title="Delete Project"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Delete Project</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the project "{projectToDelete?.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer position="bottom-right" />
    </Box>
  );
};

export default ProjectsList; 