// frontend/src/admin/pages/leads/LeadsList.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Button, Paper, Table, TableBody, 
  TableCell, TableContainer, TableHead, TableRow, IconButton, 
  Chip, TextField, InputAdornment, Menu, MenuItem, Tooltip, Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle,
  Tabs, Tab, Divider, Badge, FormControl, InputLabel, Select, Stack
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
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
  OpenInNew as OpenInNewIcon
} from '@mui/icons-material';

// Demo leads data
const leadsData = [
  {
    id: 1,
    name: 'John Davis',
    email: 'john.davis@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Tech Solutions Inc.',
    serviceInterest: 'Web Development',
    message: 'We need a new website for our company that is modern and mobile-friendly. Our current site is outdated and not responsive on different devices.',
    status: 'new',
    priority: 'medium',
    createdAt: '2023-05-15T14:30:00Z',
    updatedAt: '2023-05-15T14:30:00Z',
    notes: []
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    email: 'sarah@wilsondesign.com',
    phone: '+1 (555) 987-6543',
    company: 'Wilson Design Studio',
    serviceInterest: 'UI/UX Design',
    message: 'I need help redesigning our product interface. Our users are struggling with the current design and we want to improve the user experience.',
    status: 'contacted',
    priority: 'high',
    createdAt: '2023-05-14T10:15:00Z',
    updatedAt: '2023-05-15T09:45:00Z',
    notes: [
      { id: 1, text: 'Contacted via email on May 15th', createdAt: '2023-05-15T09:45:00Z', createdBy: 'Admin User' }
    ]
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@brownenterprises.org',
    phone: '+1 (555) 765-4321',
    company: 'Brown Enterprises',
    serviceInterest: 'E-commerce Development',
    message: 'We are looking to build an online store for our retail business. We need inventory management, payment processing, and a customer portal.',
    status: 'qualified',
    priority: 'high',
    createdAt: '2023-05-13T16:20:00Z',
    updatedAt: '2023-05-14T11:30:00Z',
    notes: [
      { id: 1, text: 'Initial call scheduled for May 16th', createdAt: '2023-05-14T11:30:00Z', createdBy: 'Admin User' }
    ]
  },
  {
    id: 4,
    name: 'Emily Johnson',
    email: 'emily.johnson@gmail.com',
    phone: '+1 (555) 456-7890',
    company: '',
    serviceInterest: 'Mobile App Development',
    message: 'I have an idea for a mobile app and I\'m looking for a team that can help me develop it from concept to launch.',
    status: 'converted',
    priority: 'medium',
    createdAt: '2023-05-10T09:05:00Z',
    updatedAt: '2023-05-13T15:40:00Z',
    notes: [
      { id: 1, text: 'Had initial consultation on May 12th', createdAt: '2023-05-12T10:30:00Z', createdBy: 'Admin User' },
      { id: 2, text: 'Proposal accepted, project starting June 1st', createdAt: '2023-05-13T15:40:00Z', createdBy: 'Admin User' }
    ]
  },
  {
    id: 5,
    name: 'David Lee',
    email: 'david.lee@techinnovate.com',
    phone: '+1 (555) 234-5678',
    company: 'Tech Innovate LLC',
    serviceInterest: 'Custom Software Development',
    message: "We're looking for a partner to develop a custom CRM solution that integrates with our existing systems.",
    status: 'unqualified',
    priority: 'low',
    createdAt: '2023-05-08T14:50:00Z',
    updatedAt: '2023-05-09T11:20:00Z',
    notes: [
      { id: 1, text: 'Budget too small for requested features', createdAt: '2023-05-09T11:20:00Z', createdBy: 'Admin User' }
    ]
  }
];

// Status and priority mapping for visual representation
const statusColors = {
    new: 'info',
  contacted: 'primary',
  qualified: 'warning',
  converted: 'success',
  unqualified: 'error',
  archived: 'default'
};

const statusLabels = {
  new: 'New',
  contacted: 'Contacted',
  qualified: 'Qualified',
  converted: 'Converted',
  unqualified: 'Unqualified',
  archived: 'Archived'
};

const priorityColors = {
  high: 'error',
  medium: 'warning',
  low: 'success'
};

const priorityLabels = {
  high: 'High',
  medium: 'Medium',
  low: 'Low'
};

// Service options for filtering
const serviceOptions = [
  'Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'E-commerce Development',
  'Custom Software Development',
  'Digital Marketing',
  'SEO Services',
  'Content Creation',
  'Other'
];

const LeadsList = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusTab, setStatusTab] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [dateSort, setDateSort] = useState('desc');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Simulate data loading from API
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLeads(leadsData);
      } catch (error) {
        console.error('Error fetching leads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  // Filter and sort leads
  const filteredLeads = leads.filter(lead => {
    // Search term filter (name, email, company, message)
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      lead.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status tab filter
    const matchesStatus = 
      statusTab === 'all' ? true : 
      statusTab === 'active' ? 
        ['new', 'contacted', 'qualified'].includes(lead.status) : 
        lead.status === statusTab;
    
    // Service interest filter
    const matchesService = serviceFilter === '' || lead.serviceInterest === serviceFilter;
    
    // Priority filter
    const matchesPriority = priorityFilter === '' || lead.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesService && matchesPriority;
  }).sort((a, b) => {
    // Sort by creation date
    if (dateSort === 'asc') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  // Count leads by status for the tabs
  const leadCounts = {
    all: leads.length,
    active: leads.filter(lead => ['new', 'contacted', 'qualified'].includes(lead.status)).length,
    new: leads.filter(lead => lead.status === 'new').length,
    contacted: leads.filter(lead => lead.status === 'contacted').length,
    qualified: leads.filter(lead => lead.status === 'qualified').length,
    converted: leads.filter(lead => lead.status === 'converted').length,
    unqualified: leads.filter(lead => lead.status === 'unqualified').length,
    archived: leads.filter(lead => lead.status === 'archived').length
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setStatusTab(newValue);
  };

  // Handle date sort toggle
  const handleDateSortToggle = () => {
    setDateSort(dateSort === 'asc' ? 'desc' : 'asc');
  };

  // Action menu handlers
  const handleMenuOpen = (event, leadId) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedLeadId(leadId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleViewLead = () => {
    navigate(`/admin/leads/${selectedLeadId}`);
    handleMenuClose();
  };

  const handleUpdateStatus = (status) => {
    // In a real app, this would call an API
    setLeads(leads.map(lead => 
      lead.id === selectedLeadId ? 
      { ...lead, status, updatedAt: new Date().toISOString() } : 
      lead
    ));
    handleMenuClose();
  };

  const handleUpdatePriority = (priority) => {
    // In a real app, this would call an API
    setLeads(leads.map(lead => 
      lead.id === selectedLeadId ? 
      { ...lead, priority, updatedAt: new Date().toISOString() } : 
      lead
    ));
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // In a real app, this would call an API
    setLeads(leads.filter(lead => lead.id !== selectedLeadId));
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const getSelectedLead = () => {
    return leads.find(lead => lead.id === selectedLeadId);
  };

  // Export leads to CSV
  const handleExportCSV = () => {
    // This would typically call an API or generate a CSV file
    console.log('Exporting leads to CSV...');
    
    // In a real app, this would create a CSV file and trigger a download
    const csvContent = 
      "Name,Email,Phone,Company,Service Interest,Status,Priority,Created Date\n" + 
      filteredLeads.map(lead => 
        `"${lead.name}","${lead.email}","${lead.phone}","${lead.company}","${lead.serviceInterest}","${statusLabels[lead.status]}","${priorityLabels[lead.priority]}","${new Date(lead.createdAt).toLocaleDateString()}"`
      ).join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'leads.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" fontWeight={600}>
            Lead Management
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button 
              variant="outlined" 
              startIcon={<DownloadIcon />}
              onClick={handleExportCSV}
            >
              Export to CSV
            </Button>
          </Stack>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Tabs 
            value={statusTab} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab 
              label={
                <Badge badgeContent={leadCounts.all} color="primary">
                  <Box sx={{ pr: 1 }}>All Leads</Box>
                </Badge>
              } 
              value="all" 
            />
            <Tab 
              label={
                <Badge badgeContent={leadCounts.active} color="primary">
                  <Box sx={{ pr: 1 }}>Active</Box>
                </Badge>
              } 
              value="active" 
            />
            <Tab 
              label={
                <Badge badgeContent={leadCounts.new} color="info">
                  <Box sx={{ pr: 1 }}>New</Box>
                </Badge>
              } 
              value="new" 
            />
            <Tab 
              label={
                <Badge badgeContent={leadCounts.contacted} color="primary">
                  <Box sx={{ pr: 1 }}>Contacted</Box>
                </Badge>
              }
              value="contacted" 
            />
            <Tab 
              label={
                <Badge badgeContent={leadCounts.qualified} color="warning">
                  <Box sx={{ pr: 1 }}>Qualified</Box>
                </Badge>
              } 
              value="qualified" 
            />
            <Tab 
              label={
                <Badge badgeContent={leadCounts.converted} color="success">
                  <Box sx={{ pr: 1 }}>Converted</Box>
                </Badge>
              } 
              value="converted" 
            />
            <Tab 
              label={
                <Badge badgeContent={leadCounts.unqualified} color="error">
                  <Box sx={{ pr: 1 }}>Unqualified</Box>
                </Badge>
              } 
              value="unqualified" 
            />
            <Tab 
              label={
                <Badge badgeContent={leadCounts.archived} color="default">
                  <Box sx={{ pr: 1 }}>Archived</Box>
                </Badge>
              } 
              value="archived" 
            />
          </Tabs>
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
            placeholder="Search leads..."
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
          
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel id="service-filter-label">Service Interest</InputLabel>
            <Select
              labelId="service-filter-label"
              id="service-filter"
              value={serviceFilter}
              label="Service Interest"
              onChange={(e) => setServiceFilter(e.target.value)}
            >
              <MenuItem value="">All Services</MenuItem>
              {serviceOptions.map(service => (
                <MenuItem key={service} value={service}>{service}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="priority-filter-label">Priority</InputLabel>
            <Select
              labelId="priority-filter-label"
              id="priority-filter"
              value={priorityFilter}
              label="Priority"
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <MenuItem value="">All Priorities</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
          
          <Button 
            variant="outlined" 
            startIcon={dateSort === 'asc' ? <SortIcon /> : <SortIcon sx={{ transform: 'scaleY(-1)' }} />}
            onClick={handleDateSortToggle}
            size="small"
          >
            {dateSort === 'asc' ? 'Oldest First' : 'Newest First'}
          </Button>
        </Paper>
        
        <TableContainer 
          component={Paper} 
          elevation={0}
          sx={{ 
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Service Interest</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    Loading leads...
                  </TableCell>
                </TableRow>
              ) : filteredLeads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                    No leads found matching your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredLeads.map((lead) => (
                  <TableRow key={lead.id} hover sx={{ cursor: 'pointer' }} onClick={() => navigate(`/admin/leads/${lead.id}`)}>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="body2" fontWeight={600}>
                          {lead.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {lead.email}
                        </Typography>
                        {lead.company && (
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                            {lead.company}
                          </Typography>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>{lead.serviceInterest}</TableCell>
                    <TableCell>
                      <Chip 
                        label={statusLabels[lead.status]} 
                        color={statusColors[lead.status]}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={priorityLabels[lead.priority]} 
                        color={priorityColors[lead.priority]}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title={new Date(lead.createdAt).toLocaleString()}>
                        <Typography variant="body2">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      {lead.notes.length > 0 ? (
                        <Typography variant="body2">
                          {lead.notes.length} {lead.notes.length === 1 ? 'note' : 'notes'}
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No notes
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                      <IconButton 
                        size="small"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleMenuOpen(event, lead.id);
                        }}
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
        <MenuItem onClick={handleViewLead}>
          <ListItemIcon>
            <OpenInNewIcon fontSize="small" />
          </ListItemIcon>
          View Details
        </MenuItem>
        
        {/* Update status submenu */}
        <MenuItem
          onClick={(event) => {
            event.stopPropagation();
            const submenuAnchor = event.currentTarget;
            // This would typically open a submenu, but for simplicity we'll just ask directly
            // In a real app, you'd use a nested menu or dialog
            
            // For demo purposes, let's ask for the new status
            const lead = getSelectedLead();
            if (lead) {
              const newStatus = prompt(
                `Update status from ${statusLabels[lead.status]} to:
                 - new
                 - contacted
                 - qualified
                 - converted
                 - unqualified
                 - archived`,
                lead.status
              );
              
              if (newStatus && ['new', 'contacted', 'qualified', 'converted', 'unqualified', 'archived'].includes(newStatus)) {
                handleUpdateStatus(newStatus);
              }
            }
          }}
        >
          <ListItemIcon>
            <UpdateIcon fontSize="small" />
          </ListItemIcon>
          Update Status
        </MenuItem>
        
        {/* Update priority submenu */}
        <MenuItem
          onClick={(event) => {
            event.stopPropagation();
            
            // For demo purposes, let's ask for the new priority
            const lead = getSelectedLead();
            if (lead) {
              const newPriority = prompt(
                `Update priority from ${priorityLabels[lead.priority]} to:
                 - high
                 - medium
                 - low`,
                lead.priority
              );
              
              if (newPriority && ['high', 'medium', 'low'].includes(newPriority)) {
                handleUpdatePriority(newPriority);
              }
            }
          }}
        >
          <ListItemIcon>
            <FlagIcon fontSize="small" />
          </ListItemIcon>
          Update Priority
        </MenuItem>
        
        <MenuItem
          onClick={() => {
            const lead = getSelectedLead();
            if (lead) {
              window.location.href = `mailto:${lead.email}`;
              handleMenuClose();
            }
          }}
        >
          <ListItemIcon>
            <MailIcon fontSize="small" />
          </ListItemIcon>
          Send Email
        </MenuItem>
        
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
        <DialogTitle>Delete Lead</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the lead from {selectedLeadId && getSelectedLead()?.name}? 
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

export default LeadsList;