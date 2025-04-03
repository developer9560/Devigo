// frontend/src/admin/services/ServicesList.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  IconButton, 
  Chip, 
  TextField, 
  InputAdornment, 
  Menu, 
  MenuItem,
  Divider,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  Avatar,
  CircularProgress,
  Alert,
  TablePagination,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Add as AddIcon, 
  Search as SearchIcon, 
  Edit as EditIcon,
  Delete as DeleteIcon, 
  MoreVert as MoreVertIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  FilterList as FilterListIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { servicesApi } from '../../utility/api';
import { toast } from 'react-toastify';

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('order');
  const [orderDirection, setOrderDirection] = useState('asc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterFeatured, setFilterFeatured] = useState('all');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  // Fetch services from API
  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Build query parameters
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (filterStatus !== 'all') params.append('status', filterStatus);
      if (filterFeatured !== 'all') params.append('featured', filterFeatured === 'featured' ? 'true' : 'false');
      params.append('page', page + 1); // API pagination is 1-indexed
      params.append('page_size', rowsPerPage);
      
      const response = await servicesApi.getAll({
        search: searchTerm || undefined,
        status: filterStatus !== 'all' ? filterStatus : undefined,
        featured: filterFeatured !== 'all' ? (filterFeatured === 'featured') : undefined,
        page: page + 1,
        page_size: rowsPerPage
      });
      
      // Check if response has results property (paginated response)
      if (response.data.results) {
        setServices(response.data.results);
        setTotalCount(response.data.count);
      } else {
        // If not paginated, use the whole array
        setServices(response.data);
        setTotalCount(response.data.length);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to load services. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchServices();
  }, [searchTerm, filterStatus, filterFeatured, page, rowsPerPage]);

  // Filtering and sorting logic
  const filteredServices = services.filter(service => {
    const matchesSearch = 
      (service.title && service.title.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (service.excerpt && service.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' ? 
                         true : 
                         service.status === filterStatus;
                            
    const matchesFeatured = filterFeatured === 'all' ? 
                           true : 
                           filterFeatured === 'featured' ? 
                           service.featured : 
                           !service.featured;
    
    return matchesSearch && matchesStatus && matchesFeatured;
  }).sort((a, b) => {
    if (orderBy === 'title') {
      return orderDirection === 'asc' ? 
        a.title.localeCompare(b.title) : 
        b.title.localeCompare(a.title);
    } else if (orderBy === 'updated') {
      return orderDirection === 'asc' ? 
        new Date(a.updated) - new Date(b.updated) : 
        new Date(b.updated) - new Date(a.updated);
    } else { // order
      return orderDirection === 'asc' ? 
        a.order - b.order : 
        b.order - a.order;
    }
  });

  const handleSort = (column) => {
    if (orderBy === column) {
      setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(column);
      setOrderDirection('asc');
    }
  };

  const handleMenuOpen = (event, serviceId) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedServiceId(serviceId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleEdit = () => {
    navigate(`/admin/services/${selectedServiceId}`);
    handleMenuClose();
  };

  const handleToggleStatus = async (newStatus) => {
    try {
      const selectedService = getSelectedService();
      if (!selectedService) return;

      await servicesApi.update(selectedServiceId, { 
        status: newStatus 
      });
      
      // Update local state
      setServices(services.map(service => 
        service.id === selectedServiceId ? 
        { ...service, status: newStatus } : 
        service
      ));
    } catch (err) {
      console.error('Error updating service status:', err);
    }
    
    handleMenuClose();
  };

  const handleToggleFeatured = async () => {
    try {
      const selectedService = getSelectedService();
      if (!selectedService) return;

      await servicesApi.update(selectedServiceId, { 
        featured: !selectedService.featured 
      });
      
      // Update local state
      setServices(services.map(service => 
        service.id === selectedServiceId ? 
        { ...service, featured: !service.featured } : 
        service
      ));
    } catch (err) {
      console.error('Error updating service featured status:', err);
    }
    
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await servicesApi.delete(selectedServiceId);
      
      // Update local state
      setServices(services.filter(service => service.id !== selectedServiceId));
      setDeleteDialogOpen(false);
    } catch (err) {
      console.error('Error deleting service:', err);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const getSelectedService = () => {
    return services.find(service => service.id === selectedServiceId);
  };

  const getStatusChip = (status) => {
    const statusConfig = {
      'active': { color: 'success', label: 'Active' },
      'inactive': { color: 'default', label: 'Inactive' },
      'coming_soon': { color: 'warning', label: 'Coming Soon' }
    };
    
    const config = statusConfig[status] || { color: 'default', label: status };
    
    return (
      <Chip 
        size="small" 
        color={config.color} 
        label={config.label}
        variant="outlined"
      />
    );
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (e) {
      return dateString || 'N/A';
    }
  };

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" fontWeight={600}>
            Services
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/admin/services/new"
            startIcon={<AddIcon />}
          >
            Add Service
          </Button>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <Paper 
          elevation={0} 
          sx={{ 
            p: 2, 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            border: '1px solid',
            borderColor: 'divider',
            mb: 3
          }}
        >
          <TextField
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            size="small"
            sx={{ minWidth: 250 }}
          />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ mr: 1 }}>Status:</Typography>
              <Button
                size="small"
                color={filterStatus === 'all' ? 'primary' : 'inherit'}
                onClick={() => setFilterStatus('all')}
              >
                All
              </Button>
              <Button
                size="small"
                color={filterStatus === 'active' ? 'primary' : 'inherit'}
                onClick={() => setFilterStatus('active')}
              >
                Active
              </Button>
              <Button
                size="small"
                color={filterStatus === 'inactive' ? 'primary' : 'inherit'}
                onClick={() => setFilterStatus('inactive')}
              >
                Inactive
              </Button>
              <Button
                size="small"
                color={filterStatus === 'coming_soon' ? 'primary' : 'inherit'}
                onClick={() => setFilterStatus('coming_soon')}
              >
                Coming Soon
              </Button>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ mr: 1 }}>Featured:</Typography>
              <Button
                size="small"
                color={filterFeatured === 'all' ? 'primary' : 'inherit'}
                onClick={() => setFilterFeatured('all')}
              >
                All
              </Button>
              <Button
                size="small"
                color={filterFeatured === 'featured' ? 'primary' : 'inherit'}
                onClick={() => setFilterFeatured('featured')}
              >
                Featured
              </Button>
              <Button
                size="small"
                color={filterFeatured === 'not_featured' ? 'primary' : 'inherit'}
                onClick={() => setFilterFeatured('not_featured')}
              >
                Not Featured
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
      
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Service</TableCell>
              <TableCell 
                align="center" 
                onClick={() => handleSort('order')}
                sx={{ cursor: 'pointer' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Order
                  {orderBy === 'order' && (
                    orderDirection === 'asc' ? 
                    <ArrowUpwardIcon fontSize="small" /> : 
                    <ArrowDownwardIcon fontSize="small" />
                  )}
                </Box>
              </TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Featured</TableCell>
              <TableCell 
                align="center"
                onClick={() => handleSort('updated')}
                sx={{ cursor: 'pointer' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Last Updated
                  {orderBy === 'updated' && (
                    orderDirection === 'asc' ? 
                    <ArrowUpwardIcon fontSize="small" /> : 
                    <ArrowDownwardIcon fontSize="small" />
                  )}
                </Box>
              </TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  <CircularProgress size={40} />
                  <Typography variant="body2" sx={{ mt: 2 }}>Loading services...</Typography>
                </TableCell>
              </TableRow>
            ) : filteredServices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1">No services found</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    {searchTerm ? 'Try a different search term' : 'Add a new service to get started'}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredServices.map((service) => (
                <TableRow key={service.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {service.image_url ? (
                        <Avatar 
                          src={service.image_url} 
                          alt={service.title}
                          variant="rounded"
                          sx={{ width: 40, height: 40, mr: 2 }}
                        />
                      ) : (
                        <Box 
                          sx={{ 
                            width: 40, 
                            height: 40, 
                            bgcolor: 'primary.main', 
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 1,
                            mr: 2
                          }}
                        >
                          {service.icon || service.title.charAt(0)}
                        </Box>
                      )}
                      <Box>
                        <Typography variant="body1" fontWeight={500}>
                          {service.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" sx={{ maxWidth: 350, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {service.excerpt || service.description?.substring(0, 100)}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="center">{service.order}</TableCell>
                  <TableCell align="center">{getStatusChip(service.status)}</TableCell>
                  <TableCell align="center">
                    {service.featured ? (
                      <StarIcon color="warning" />
                    ) : (
                      <StarBorderIcon color="action" />
                    )}
                  </TableCell>
                  <TableCell align="center">{formatDate(service.updated)}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      component={Link}
                      to={`/admin/services/${service.id}`}
                      size="small"
                      color="primary"
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, service.id)}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Actions Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        elevation={1}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleEdit}>
          <Box component="span" sx={{ mr: 2, display: 'inline-flex', color: 'text.secondary' }}>
            <EditIcon fontSize="small" />
          </Box>
          Edit Service
        </MenuItem>
        
        {getSelectedService()?.status !== 'active' && (
          <MenuItem onClick={() => handleToggleStatus('active')}>
            <Box component="span" sx={{ mr: 2, display: 'inline-flex', color: 'success.main' }}>
              <VisibilityIcon fontSize="small" />
            </Box>
            Mark as Active
          </MenuItem>
        )}
        
        {getSelectedService()?.status === 'active' && (
          <MenuItem onClick={() => handleToggleStatus('inactive')}>
            <Box component="span" sx={{ mr: 2, display: 'inline-flex', color: 'text.secondary' }}>
              <VisibilityOffIcon fontSize="small" />
            </Box>
            Mark as Inactive
          </MenuItem>
        )}
        
        {!getSelectedService()?.featured && (
          <MenuItem onClick={handleToggleFeatured}>
            <Box component="span" sx={{ mr: 2, display: 'inline-flex', color: 'warning.main' }}>
              <StarIcon fontSize="small" />
            </Box>
            Add to Featured
          </MenuItem>
        )}
        
        {getSelectedService()?.featured && (
          <MenuItem onClick={handleToggleFeatured}>
            <Box component="span" sx={{ mr: 2, display: 'inline-flex', color: 'text.secondary' }}>
              <StarBorderIcon fontSize="small" />
            </Box>
            Remove from Featured
          </MenuItem>
        )}
        
        <Divider />
        
        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          <Box component="span" sx={{ mr: 2, display: 'inline-flex', color: 'error.main' }}>
            <DeleteIcon fontSize="small" />
          </Box>
          Delete Service
        </MenuItem>
      </Menu>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Delete Service</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the service "<strong>{getSelectedService()?.title}</strong>"?
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ServicesList;