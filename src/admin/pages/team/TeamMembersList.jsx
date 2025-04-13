import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container, Typography, Box, Paper, Button, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, Menu, MenuItem, Chip,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  TextField, InputAdornment, TablePagination, Avatar, Switch, FormControlLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import teamApi from '../../services/teamService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeamMembersList = () => {
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInactive, setShowInactive] = useState(false);
  const [orderBy, setOrderBy] = useState('order');
  const [orderDirection, setOrderDirection] = useState('asc');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Create a memoized placeholder image for avatar fallback
  const placeholderUrl = useMemo(() => {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
  }, []);

  useEffect(() => {
    fetchTeamMembers();
  }, [orderBy, orderDirection, showInactive]);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await teamApi.getAll({ 
        ordering: `${orderDirection === 'desc' ? '-' : ''}${orderBy}`
      });
      let members = response.data;
      
      // If array is within a results property, extract it (pagination)
      if (response.data.results) {
        members = response.data.results;
      }
      
      console.log('Loaded team members:', members);
      setTeamMembers(members);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching team members:', err);
      setError('Failed to load team members. Please try again later.');
      setLoading(false);
    }
  };

  const handleSort = (column) => {
    if (orderBy === column) {
      setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(column);
      setOrderDirection('asc');
    }
  };

  const handleMenuOpen = (event, memberId) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedMemberId(memberId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleEdit = () => {
    navigate(`/admin/team/${selectedMemberId}`);
    handleMenuClose();
  };

  const handleToggleActive = async () => {
    try {
      const selectedMember = getSelectedMember();
      if (!selectedMember) return;

      await teamApi.toggleActive(selectedMemberId, !selectedMember.is_active);
      
      // Update local state
      setTeamMembers(teamMembers.map(member => 
        member.id === selectedMemberId ? 
        { ...member, is_active: !member.is_active } : 
        member
      ));
      
      toast.success(`Member ${selectedMember.is_active ? 'deactivated' : 'activated'} successfully`);
    } catch (err) {
      console.error('Error toggling member status:', err);
      toast.error('Failed to update member status');
    }
    
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await teamApi.delete(selectedMemberId);
      
      // Update local state
      setTeamMembers(teamMembers.filter(member => member.id !== selectedMemberId));
      toast.success('Team member deleted successfully');
      setDeleteDialogOpen(false);
    } catch (err) {
      console.error('Error deleting team member:', err);
      toast.error('Failed to delete team member');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const getSelectedMember = () => {
    return teamMembers.find(member => member.id === selectedMemberId);
  };

  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter team members based on search term and active status
  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = (
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.position.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (showInactive) {
      return matchesSearch;
    } else {
      return matchesSearch && member.is_active;
    }
  });

  // Apply pagination
  const paginatedMembers = filteredMembers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" fontWeight={600}>
            Team Members
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/admin/team/new"
            startIcon={<AddIcon />}
          >
            Add Team Member
          </Button>
        </Box>
        
        {error && (
          <Paper sx={{ p: 2, bgcolor: 'error.light', color: 'error.contrastText', mb: 3 }}>
            {error}
          </Paper>
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
            placeholder="Search members..."
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
          
          <FormControlLabel
            control={
              <Switch 
                checked={showInactive}
                onChange={(e) => setShowInactive(e.target.checked)}
                color="primary"
              />
            }
            label="Show inactive members"
          />
        </Paper>
        
        <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'action.hover' }}>
                <TableCell>Image</TableCell>
                <TableCell 
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleSort('name')}
                >
                  Name
                  {orderBy === 'name' && (
                    <span style={{ marginLeft: 5 }}>
                      {orderDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </TableCell>
                <TableCell>Position</TableCell>
                <TableCell 
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleSort('order')}
                >
                  Order
                  {orderBy === 'order' && (
                    <span style={{ marginLeft: 5 }}>
                      {orderDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    Loading team members...
                  </TableCell>
                </TableRow>
              ) : paginatedMembers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    {searchTerm 
                      ? 'No team members match your search criteria' 
                      : 'No team members found. Add your first team member!'}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedMembers.map(member => (
                  <TableRow key={member.id} sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
                    <TableCell>
                      {member.image_url ? (
                        <Avatar
                          src={member.image_url}
                          alt={member.name}
                          sx={{ width: 40, height: 40 }}
                          onError={(e) => {
                            console.error('Image failed to load:', member.image_url);
                            // Prevent infinite error callbacks
                            if (e.target.src !== placeholderUrl) {
                              e.target.onerror = null;
                              e.target.src = placeholderUrl;
                            }
                          }}
                        />
                      ) : (
                        <Avatar sx={{ width: 40, height: 40 }}>
                          <PersonIcon />
                        </Avatar>
                      )}
                    </TableCell>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.position}</TableCell>
                    <TableCell>{member.order}</TableCell>
                    <TableCell>
                      <Chip 
                        size="small" 
                        color={member.is_active ? 'success' : 'default'} 
                        label={member.is_active ? 'Active' : 'Inactive'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={(e) => handleMenuOpen(e, member.id)}
                        size="small"
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredMembers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
      
      {/* Actions Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleToggleActive}>
          <Switch 
            size="small" 
            checked={getSelectedMember()?.is_active || false}
            sx={{ mr: 1 }}
          />
          {getSelectedMember()?.is_active ? 'Deactivate' : 'Activate'}
        </MenuItem>
        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Delete Team Member</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this team member? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
      
      <ToastContainer position="bottom-right" />
    </Container>
  );
};

export default TeamMembersList; 