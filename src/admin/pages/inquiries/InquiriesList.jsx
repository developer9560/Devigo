import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Button, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, IconButton, 
  Chip, TextField, InputAdornment, Menu, MenuItem, Tooltip, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle,
  Tabs, Tab, Divider, Badge, FormControl, InputLabel, Select, Stack,
  Collapse, Grid, Card, CardContent, FormGroup, FormControlLabel, Alert, Checkbox
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
  Mail as MailIcon,
  CheckCircle as CheckCircleIcon,
  MarkEmailRead as MarkEmailReadIcon,
  Flag as FlagIcon,
  Download as DownloadIcon,
  Update as UpdateIcon,
  Sort as SortIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  MessageOutlined as MessageOutlinedIcon,
  BusinessOutlined as BusinessOutlinedIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { inquiriesApi, api } from '../../../utility/api';
import axios from 'axios';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress } from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

// Status mapping for visual representation
const statusColors = {
  new: 'info',
  read: 'primary',
  in_progress: 'warning',
  responded: 'success',
  closed: 'default'
};

const statusLabels = {
  new: 'New',
  read: 'Read',
  in_progress: 'In Progress',
  responded: 'Responded',
  closed: 'Closed'
};

// Demo data for initial development - will be replaced with API data
const demoInquiries = [
  {
    id: 1,
    name: 'John Davis',
    email: 'john.davis@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Tech Solutions Inc.',
    subject: 'Web Development Services Inquiry',
    message: 'We need a new website for our company that is modern and mobile-friendly. Our current site is outdated and not responsive on different devices.',
    service_interest: { id: 1, name: 'Web Development' },
    status: 'new',
    created: '2023-05-15T14:30:00Z',
    updated: '2023-05-15T14:30:00Z',
    assigned_to: null,
    is_responded: false,
    response_date: null
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    email: 'sarah@wilsondesign.com',
    phone: '+1 (555) 987-6543',
    company: 'Wilson Design Studio',
    subject: 'UI/UX Redesign Project',
    message: 'I need help redesigning our product interface. Our users are struggling with the current design and we want to improve the user experience.',
    service_interest: { id: 3, name: 'UI/UX Design' },
    status: 'read',
    created: '2023-05-14T10:15:00Z',
    updated: '2023-05-15T09:45:00Z',
    assigned_to: { id: 1, username: 'admin', name: 'Admin User' },
    is_responded: false,
    response_date: null
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@brownenterprises.org',
    phone: '+1 (555) 765-4321',
    company: 'Brown Enterprises',
    subject: 'E-commerce Store Development',
    message: 'We are looking to build an online store for our retail business. We need inventory management, payment processing, and a customer portal.',
    service_interest: { id: 4, name: 'E-commerce Development' },
    status: 'in_progress',
    created: '2023-05-13T16:20:00Z',
    updated: '2023-05-14T11:30:00Z',
    assigned_to: { id: 2, username: 'jane', name: 'Jane Smith' },
    is_responded: false,
    response_date: null
  },
  {
    id: 4,
    name: 'Emily Johnson',
    email: 'emily.johnson@gmail.com',
    phone: '+1 (555) 456-7890',
    company: '',
    subject: 'Mobile App Development Idea',
    message: "I have an idea for a mobile app and I'm looking for a team that can help me develop it from concept to launch.",
    service_interest: { id: 2, name: 'Mobile App Development' },
    status: 'responded',
    created: '2023-05-10T09:05:00Z',
    updated: '2023-05-13T15:40:00Z',
    assigned_to: { id: 1, username: 'admin', name: 'Admin User' },
    is_responded: true,
    response_date: '2023-05-13T15:40:00Z'
  },
  {
    id: 5,
    name: 'David Lee',
    email: 'david.lee@techinnovate.com',
    phone: '+1 (555) 234-5678',
    company: 'Tech Innovate LLC',
    subject: 'Custom CRM Development',
    message: "We're looking for a partner to develop a custom CRM solution that integrates with our existing systems.",
    service_interest: { id: 5, name: 'Custom Software Development' },
    status: 'closed',
    created: '2023-05-08T14:50:00Z',
    updated: '2023-05-09T11:20:00Z',
    assigned_to: { id: 3, username: 'robert', name: 'Robert Johnson' },
    is_responded: true,
    response_date: '2023-05-09T11:20:00Z'
  }
];

// Service options for filtering - will be dynamically loaded from API in real implementation
const serviceOptions = [
  { id: 1, name: 'Web Development' },
  { id: 2, name: 'Mobile App Development' },
  { id: 3, name: 'UI/UX Design' },
  { id: 4, name: 'E-commerce Development' },
  { id: 5, name: 'Custom Software Development' },
  { id: 6, name: 'WordPress Development' },
  { id: 7, name: 'SEO Optimization' },
  { id: 8, name: 'Website Maintenance' }
];

const InquiriesList = () => {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusTab, setStatusTab] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('');
  const [dateSort, setDateSort] = useState('desc');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedInquiryId, setSelectedInquiryId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [expandedInquiry, setExpandedInquiry] = useState(null);
  const [responseDialogOpen, setResponseDialogOpen] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  // Fetch inquiries from API
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        setLoading(true);
        // Use real API data instead of demo data
        const response = await inquiriesApi.getAll();
        console.log('Inquiries API response:', response);
        
        // Handle different API response formats to ensure we always have an array
        let inquiriesData = [];
        
        if (Array.isArray(response.data)) {
          inquiriesData = response.data;
        } else if (response.data && response.data.results && Array.isArray(response.data.results)) {
          inquiriesData = response.data.results;
        } else if (response.data && typeof response.data === 'object') {
          // If it's an object with data properties, convert to array
          inquiriesData = Object.values(response.data).filter(item => typeof item === 'object');
        }
        
        console.log('Processed inquiries data:', inquiriesData);
        setInquiries(inquiriesData.length > 0 ? inquiriesData : demoInquiries);
      } catch (error) {
        console.error('Error fetching inquiries:', error);
        // Fallback to demo data if API fails
        setInquiries(demoInquiries);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  // Filter and sort inquiries
  const filteredInquiries = Array.isArray(inquiries) ? 
    inquiries.filter(inquiry => {
      // Search term filter
      const matchesSearch = 
        inquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (inquiry.company && inquiry.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
        inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inquiry.message.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Status tab filter
      const matchesStatus = 
        statusTab === 'all' ? true : 
        statusTab === 'active' ? 
          ['new', 'read', 'in_progress'].includes(inquiry.status) : 
          inquiry.status === statusTab;
      
      // Service interest filter
      const matchesService = 
        serviceFilter === '' ? true : 
        inquiry.service_interest && inquiry.service_interest.id.toString() === serviceFilter;
      
      return matchesSearch && matchesStatus && matchesService;
    }).sort((a, b) => {
      // Sort by date
      const dateA = new Date(a.created);
      const dateB = new Date(b.created);
      return dateSort === 'desc' ? dateB - dateA : dateA - dateB;
    }) : [];
    
  // Unread count for badge
  const unreadCount = Array.isArray(inquiries) ? 
    inquiries.filter(inquiry => inquiry.status === 'new').length : 0;

  // Handlers
  const handleTabChange = (event, newValue) => {
    setStatusTab(newValue);
  };

  const handleDateSortToggle = () => {
    setDateSort(dateSort === 'desc' ? 'asc' : 'desc');
  };

  const handleMenuOpen = (event, inquiryId) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedInquiryId(inquiryId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleExpandInquiry = (inquiryId) => {
    setExpandedInquiry(expandedInquiry === inquiryId ? null : inquiryId);
  };

  const handleUpdateStatus = async (status) => {
    handleMenuClose();
    
    if (!selectedInquiryId) return;
    
    try {
      const selectedInquiry = getSelectedInquiry();
      if (!selectedInquiry) {
        console.error('Selected inquiry not found');
        return;
      }
      
      // Include all required fields in the update
      const updateData = {
        name: selectedInquiry.name,
        email: selectedInquiry.email,
        subject: selectedInquiry.subject,
        message: selectedInquiry.message,
        status: status,
        // Include other fields that might be required
        phone: selectedInquiry.phone || '',
        company: selectedInquiry.company || '',
        service_interest: selectedInquiry.service_interest?.id
      };
      
      console.log('Updating inquiry with data:', updateData);
      
      // Call the API to update the status
      await inquiriesApi.update(selectedInquiryId, updateData);
      
      // Update the state after successful API call
      if (Array.isArray(inquiries)) {
        setInquiries(inquiries.map(inquiry => 
          inquiry.id === selectedInquiryId 
            ? { ...inquiry, status, updated: new Date().toISOString() } 
            : inquiry
        ));
      }
    } catch (error) {
      console.error('Error updating inquiry status:', error);
      console.error('Response:', error.response?.data);
    }
  };

  const handleMarkAsRead = async () => {
    handleMenuClose();
    
    if (!selectedInquiryId) return;
    
    try {
      console.log('Marking inquiry as read:', selectedInquiryId);
      
      // Use the dedicated markAsRead method
      const response = await inquiriesApi.markAsRead(selectedInquiryId);
      console.log('Mark as read response:', response.data);
      
      // Update the state after successful API call
      if (Array.isArray(inquiries)) {
        setInquiries(inquiries.map(inquiry => 
          inquiry.id === selectedInquiryId 
            ? { ...inquiry, status: 'read', updated: new Date().toISOString() } 
            : inquiry
        ));
      }
    } catch (error) {
      console.error('Error marking inquiry as read:', error);
      console.error('Response:', error.response?.data);
    }
  };

  const handleMarkAsInProgress = async () => {
    handleMenuClose();
    
    if (!selectedInquiryId) return;
    
    try {
      const selectedInquiry = getSelectedInquiry();
      if (!selectedInquiry) {
        console.error('Selected inquiry not found');
        return;
      }
      
      console.log('Marking inquiry as in progress:', selectedInquiryId);
      
      // Use the dedicated markInProgress method
      const response = await inquiriesApi.markInProgress(selectedInquiryId);
      console.log('Mark as in progress response:', response.data);
      
      // Update the state after successful API call
      if (Array.isArray(inquiries)) {
        setInquiries(inquiries.map(inquiry => 
          inquiry.id === selectedInquiryId 
            ? { ...inquiry, status: 'in_progress', updated: new Date().toISOString() } 
            : inquiry
        ));
      }
    } catch (error) {
      console.error('Error marking inquiry as in progress:', error);
      console.error('Response:', error.response?.data);
    }
  };

  const handleMarkAsResponded = async () => {
    setResponseDialogOpen(true);
  };

  const handleMarkAsClosed = async () => {
    handleMenuClose();
    
    if (!selectedInquiryId) return;
    
    try {
      const selectedInquiry = getSelectedInquiry();
      if (!selectedInquiry) {
        console.error('Selected inquiry not found');
        return;
      }
      
      console.log('Marking inquiry as closed:', selectedInquiryId);
      
      // Use the dedicated markAsClosed method
      const response = await inquiriesApi.markAsClosed(selectedInquiryId);
      console.log('Mark as closed response:', response.data);
      
      // Update the state after successful API call
      if (Array.isArray(inquiries)) {
        setInquiries(inquiries.map(inquiry => 
          inquiry.id === selectedInquiryId 
            ? { ...inquiry, status: 'closed', updated: new Date().toISOString() } 
            : inquiry
        ));
      }
    } catch (error) {
      console.error('Error marking inquiry as closed:', error);
      console.error('Response:', error.response?.data);
    }
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // Call the API to delete the inquiry
      await inquiriesApi.delete(selectedInquiryId);
      
      // Update the state after successful API call
      if (Array.isArray(inquiries)) {
        setInquiries(inquiries.filter(inquiry => inquiry.id !== selectedInquiryId));
      }
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error('Error deleting inquiry:', error);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  // New function to send email response
  const sendEmailResponse = async (email, subject, message, inquiryId) => {
    try {
      // Use the authenticated api instance
      const response = await api.post(`/inquiries/respond_email/`, {
        email,
        subject: `Re: ${subject}`,
        message,
        inquiry_id: inquiryId
      });
      
      return response.data;
    } catch (error) {
      console.error('Error sending email response:', error);
      throw error;
    }
  };

  // New function to send WhatsApp message
  const sendWhatsAppMessage = async (phone, message) => {
    try {
      // Format phone number (remove non-digits and ensure it has country code)
      const formattedPhone = phone.replace(/\D/g, '');
      const phoneWithCountryCode = formattedPhone.startsWith('1') ? formattedPhone : `1${formattedPhone}`;
      
      // Open WhatsApp in a new window
      window.open(`https://wa.me/${phoneWithCountryCode}?text=${encodeURIComponent(message)}`, '_blank');
      
      return true;
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      throw error;
    }
  };

  // Update the response dialog to include communication options
  const handleResponseSubmit = async () => {
    if (!responseText.trim()) return;
    
    try {
      setSubmitStatus({
        loading: true,
        success: false,
        error: null
      });
      
      const selectedInquiry = getSelectedInquiry();
      if (!selectedInquiry) {
        throw new Error('Selected inquiry not found');
      }
      
      console.log('Sending response for inquiry:', selectedInquiryId);
      
      // Send email response first
      await sendEmailResponse(
        selectedInquiry.email,
        selectedInquiry.subject,
        responseText,
        selectedInquiryId
      );
      
      // Use the dedicated markAsResponded method
      const response = await inquiriesApi.markAsResponded(selectedInquiryId, responseText);
      console.log('Mark as responded response:', response.data);
      
      // Update local state
      if (Array.isArray(inquiries)) {
        setInquiries(inquiries.map(inquiry => 
          inquiry.id === selectedInquiryId 
            ? { 
                ...inquiry, 
                status: 'responded', 
                is_responded: true,
                response_date: new Date().toISOString(),
                updated: new Date().toISOString(),
                response_text: responseText
              } 
            : inquiry
        ));
      }
      
      setSubmitStatus({
        loading: false,
        success: true,
        error: null
      });
      
      setResponseDialogOpen(false);
      setResponseText('');
    } catch (error) {
      console.error('Error sending response:', error);
      console.error('Response:', error.response?.data);
      setSubmitStatus({
        loading: false,
        success: false,
        error: error.response?.data?.message || 'Failed to send response. Please try again.'
      });
    }
  };

  const getSelectedInquiry = () => {
    if (!Array.isArray(inquiries)) return null;
    return inquiries.find(inquiry => inquiry.id === selectedInquiryId);
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy h:mm a');
    } catch (e) {
      return dateString;
    }
  };

  // Expanded response history view
  const ResponseHistory = ({ inquiry }) => {
    const [responseHistory, setResponseHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchResponseHistory = async () => {
        try {
          setLoading(true);
          const response = await inquiriesApi.getDetail(`${inquiry.id}/get_response_history/`);
          setResponseHistory(response.data.responses || []);
        } catch (error) {
          console.error('Error fetching response history:', error);
          setResponseHistory([]);
        } finally {
          setLoading(false);
        }
      };

      if (inquiry.is_responded) {
        fetchResponseHistory();
      } else {
        setResponseHistory([]);
        setLoading(false);
      }
    }, [inquiry]);

    if (loading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
          <CircularProgress size={30} />
        </Box>
      );
    }

    if (!inquiry.is_responded) {
      return (
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80%' }}>
          <MailIcon color="action" sx={{ fontSize: 40, mb: 2, opacity: 0.3 }} />
          <Typography variant="body2" color="text.secondary" gutterBottom>
            No response has been sent yet
          </Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ mt: 2 }}>
        {responseHistory.length > 0 ? (
          responseHistory.map((response, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="body2">
                  Responded on {formatDate(response.date)} by {response.user}
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary" sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                {response.text}
              </Typography>
            </Box>
          ))
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Response information not available
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  // Function to open default email client
  const openDefaultEmailClient = (email, subject, body) => {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    window.open(`mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`, '_blank');
  };

  // Function to open Gmail compose
  const openGmailCompose = (email, subject, body) => {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodedSubject}&body=${encodedBody}`, '_blank');
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Contact Inquiries Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and respond to customer inquiries from your website's contact form
        </Typography>
      </Box>
      
      {/* Filters and Search */}
      <Paper elevation={0} sx={{ mb: 3, p: 2, border: '1px solid', borderColor: 'divider' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Search inquiries..."
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
            />
          </Grid>
          
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel id="service-filter-label">Service Interest</InputLabel>
              <Select
                labelId="service-filter-label"
                value={serviceFilter}
                label="Service Interest"
                onChange={(e) => setServiceFilter(e.target.value)}
              >
                <MenuItem value="">All Services</MenuItem>
                {serviceOptions.map((service) => (
                  <MenuItem key={service.id} value={service.id.toString()}>
                    {service.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Button
              color="inherit"
              startIcon={<SortIcon />}
              onClick={handleDateSortToggle}
              sx={{ textTransform: 'none' }}
            >
              Date: {dateSort === 'desc' ? 'Newest first' : 'Oldest first'}
            </Button>
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<DownloadIcon />}
              fullWidth
            >
              Export CSV
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Tabs for filtering by status */}
      <Paper elevation={0} sx={{ mb: 3, border: '1px solid', borderColor: 'divider' }}>
        <Tabs
          value={statusTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab 
            value="all" 
            label="All Inquiries" 
          />
          <Tab 
            value="active" 
            label={
              <Badge badgeContent={unreadCount} color="error" max={99}>
                Active
              </Badge>
            } 
          />
          <Tab value="new" label="New" />
          <Tab value="read" label="Read" />
          <Tab value="in_progress" label="In Progress" />
          <Tab value="responded" label="Responded" />
          <Tab value="closed" label="Closed" />
        </Tabs>
      </Paper>
      
      {/* Inquiries Table */}
      <Paper elevation={0} sx={{ overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="40%">Inquiry Details</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {loading ? (
                // Loading state
                Array.from(new Array(5)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={5} sx={{ py: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ width: '100%' }}>
                          <Typography variant="caption" sx={{ opacity: 0.5 }}>
                            Loading inquiries...
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredInquiries.length === 0 ? (
                // Empty state
                <TableRow>
                  <TableCell colSpan={5} sx={{ py: 5, textAlign: 'center' }}>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      No inquiries found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Try adjusting your filters or search term
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                // Inquiries data
                filteredInquiries.map((inquiry) => (
                  <React.Fragment key={inquiry.id}>
                    <TableRow 
                      hover
                      sx={{ 
                        '&:last-child td, &:last-child th': { border: 0 },
                        cursor: 'pointer',
                        bgcolor: inquiry.status === 'new' ? 'rgba(33, 150, 243, 0.04)' : 'inherit'
                      }}
                      onClick={() => handleExpandInquiry(inquiry.id)}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <IconButton
                            size="small"
                            sx={{ mr: 1 }}
                            aria-label={expandedInquiry === inquiry.id ? "Collapse" : "Expand"}
                          >
                            {expandedInquiry === inquiry.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </IconButton>
                          <Box>
                            <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
                              {inquiry.subject}
                              {inquiry.status === 'new' && (
                                <Chip 
                                  label="New" 
                                  size="small" 
                                  color="info" 
                                  sx={{ ml: 1, height: 20, fontSize: '0.625rem' }} 
                                />
                              )}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Typography variant="caption" color="text.secondary" sx={{ mr: 2 }}>
                                {inquiry.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                                <MailIcon fontSize="inherit" sx={{ mr: 0.5, fontSize: '0.8rem' }} />
                                {inquiry.email}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {inquiry.service_interest ? inquiry.service_interest.name : 'N/A'}
                      </TableCell>
                      <TableCell>
                        <Tooltip title={formatDate(inquiry.created)}>
                          <Typography variant="body2">
                            {format(new Date(inquiry.created), 'MMM dd, yyyy')}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={statusLabels[inquiry.status]} 
                          color={statusColors[inquiry.status]} 
                          size="small"
                          variant="outlined"
                          sx={{ minWidth: 85, fontWeight: 500 }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMenuOpen(e, inquiry.id);
                          }}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    
                    {/* Expanded view */}
                    <TableRow>
                      <TableCell colSpan={5} sx={{ py: 0, border: 0 }}>
                        <Collapse in={expandedInquiry === inquiry.id} timeout="auto" unmountOnExit>
                          <Box sx={{ py: 3, px: 2 }}>
                            <Grid container spacing={3}>
                              <Grid item xs={12} md={6}>
                                <Card variant="outlined" sx={{ mb: 2, height: '100%' }}>
                                  <CardContent>
                                    <Typography variant="h6" fontWeight={600} gutterBottom>
                                      Inquiry Details
                                    </Typography>
                                    
                                    <Box sx={{ mt: 2 }}>
                                      <Typography variant="body2" gutterBottom>
                                        <strong>Subject:</strong> {inquiry.subject}
                                      </Typography>
                                      
                                      <Typography variant="body2" color="text.secondary" sx={{ mt: 2, mb: 2, whiteSpace: 'pre-line' }}>
                                        {inquiry.message}
                                      </Typography>
                                      
                                      <Divider sx={{ mb: 2 }} />
                                      
                                      <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <MessageOutlinedIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                            {inquiry.email}
                                          </Typography>
                                          
                                          {inquiry.phone && (
                                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                              <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                              {inquiry.phone}
                                            </Typography>
                                          )}
                                          
                                          {inquiry.company && (
                                            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                              <BusinessOutlinedIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                                              {inquiry.company}
                                            </Typography>
                                          )}
                                        </Grid>
                                        
                                        <Grid item xs={12} sm={6}>
                                          <Typography variant="body2" sx={{ mb: 1 }}>
                                            <strong>Received:</strong> {formatDate(inquiry.created)}
                                          </Typography>
                                          
                                          <Typography variant="body2" sx={{ mb: 1 }}>
                                            <strong>Service:</strong> {inquiry.service_interest ? inquiry.service_interest.name : 'N/A'}
                                          </Typography>
                                          
                                          <Typography variant="body2">
                                            <strong>Assigned to:</strong> {inquiry.assigned_to ? inquiry.assigned_to.name : 'Unassigned'}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </Box>
                                  </CardContent>
                                </Card>
                              </Grid>
                              
                              <Grid item xs={12} md={6}>
                                <Card variant="outlined" sx={{ mb: 2, height: '100%' }}>
                                  <CardContent>
                                    <Typography variant="h6" fontWeight={600} gutterBottom>
                                      Response History
                                    </Typography>
                                    
                                    <ResponseHistory inquiry={inquiry} />
                                    
                                    {!inquiry.is_responded && (
                                      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedInquiryId(inquiry.id);
                                            setResponseDialogOpen(true);
                                          }}
                                        >
                                          Send Response
                                        </Button>
                                      </Box>
                                    )}
                                  </CardContent>
                                </Card>
                              </Grid>
                            </Grid>
                            
                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                              <Button
                                variant="outlined"
                                color="primary"
                                sx={{ mr: 1 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedInquiryId(inquiry.id);
                                  
                                  if (inquiry.status === 'new') {
                                    handleMarkAsRead();
                                  } else if (inquiry.status === 'read') {
                                    handleMarkAsInProgress();
                                  }
                                }}
                                disabled={inquiry.status === 'responded' || inquiry.status === 'closed' || inquiry.status === 'in_progress'}
                              >
                                {inquiry.status === 'new' ? 'Mark as Read' : inquiry.status === 'read' ? 'Mark In Progress' : 'Update Status'}
                              </Button>
                              
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedInquiryId(inquiry.id);
                                  setResponseDialogOpen(true);
                                }}
                                disabled={inquiry.status === 'closed'}
                              >
                                {inquiry.is_responded ? 'Send Another Response' : 'Respond to Inquiry'}
                              </Button>
                            </Box>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      {/* Action Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 1,
          sx: { width: 200 }
        }}
      >
        <MenuItem onClick={handleMarkAsRead} disabled={getSelectedInquiry()?.status !== 'new'}>
          <Box component="span" sx={{ mr: 2, display: 'inline-flex', color: 'text.secondary' }}>
            <MarkEmailReadIcon fontSize="small" />
          </Box>
          Mark as Read
        </MenuItem>
        
        <MenuItem onClick={handleMarkAsInProgress} disabled={getSelectedInquiry()?.status !== 'read'}>
          <Box component="span" sx={{ mr: 2, display: 'inline-flex', color: 'text.secondary' }}>
            <FlagIcon fontSize="small" />
          </Box>
          Mark In Progress
        </MenuItem>
        
        <MenuItem onClick={handleMarkAsResponded} disabled={getSelectedInquiry()?.status === 'closed'}>
          <Box component="span" sx={{ mr: 2, display: 'inline-flex', color: 'text.secondary' }}>
            <MailIcon fontSize="small" />
          </Box>
          Send Response
        </MenuItem>
        
        <MenuItem onClick={handleMarkAsClosed} disabled={getSelectedInquiry()?.status === 'closed'}>
          <Box component="span" sx={{ mr: 2, display: 'inline-flex', color: 'text.secondary' }}>
            <CheckCircleIcon fontSize="small" />
          </Box>
          Mark as Closed
        </MenuItem>
        
        <Divider />
        
        <MenuItem onClick={handleDeleteClick}>
          <Box component="span" sx={{ mr: 2, display: 'inline-flex', color: 'error.main' }}>
            <DeleteIcon fontSize="small" />
          </Box>
          <Typography color="error">Delete</Typography>
        </MenuItem>
      </Menu>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Delete Inquiry</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this inquiry? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Response Dialog */}
      <Dialog
        open={responseDialogOpen}
        onClose={() => setResponseDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Respond to Inquiry</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              <strong>To:</strong> {getSelectedInquiry()?.name} ({getSelectedInquiry()?.email})
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Subject:</strong> {getSelectedInquiry()?.subject}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <strong>Original Message:</strong>
            </Typography>
            <Typography variant="body2" sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1, mb: 2 }}>
              {getSelectedInquiry()?.message}
            </Typography>
          </Box>
          
          <TextField
            autoFocus
            label="Your Response"
            multiline
            rows={8}
            fullWidth
            variant="outlined"
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            placeholder="Type your response here..."
          />
          
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Communication Options:
            </Typography>
            <FormGroup row>
              <FormControlLabel 
                control={<Checkbox defaultChecked />} 
                label="Send Email Response" 
              />
              {getSelectedInquiry()?.phone && (
                <FormControlLabel 
                  control={<Checkbox />} 
                  label="Open in WhatsApp" 
                />
              )}
            </FormGroup>
          </Box>
          
          {submitStatus.error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {submitStatus.error}
            </Alert>
          )}
          
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            This response will be sent to the customer's email address and will mark the inquiry as responded.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResponseDialogOpen(false)}>Cancel</Button>
          
          {/* Email client options */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                const inquiry = getSelectedInquiry();
                if (inquiry?.email) {
                  openDefaultEmailClient(
                    inquiry.email,
                    `Re: ${inquiry.subject}`,
                    responseText
                  );
                }
              }}
              startIcon={<MailIcon />}
              sx={{ mr: 1 }}
            >
              Local Email
            </Button>
            
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                const inquiry = getSelectedInquiry();
                if (inquiry?.email) {
                  openGmailCompose(
                    inquiry.email,
                    `Re: ${inquiry.subject}`,
                    responseText
                  );
                }
              }}
              startIcon={<img src="https://www.gstatic.com/images/branding/product/1x/gmail_2020q4_16dp.png" alt="Gmail" style={{ width: 16, height: 16 }} />}
              sx={{ mr: 1 }}
            >
              Gmail
            </Button>
          </Box>
          
          {/* WhatsApp button */}
          <Button
            variant="outlined"
            color="primary"
            disabled={!getSelectedInquiry()?.phone}
            onClick={() => {
              const inquiry = getSelectedInquiry();
              if (inquiry?.phone) {
                sendWhatsAppMessage(inquiry.phone, responseText);
              }
            }}
            startIcon={<FontAwesomeIcon icon={faWhatsapp} />}
            sx={{ mr: 1 }}
          >
            WhatsApp
          </Button>
          
          {/* Send via backend button */}
          <Button 
            onClick={handleResponseSubmit} 
            variant="contained" 
            color="primary"
            disabled={!responseText.trim() || submitStatus.loading}
            startIcon={submitStatus.loading ? <CircularProgress size={20} /> : <SendIcon />}
          >
            {submitStatus.loading ? 'Sending...' : 'Send & Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default InquiriesList; 