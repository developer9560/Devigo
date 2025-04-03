// frontend/src/admin/pages/team/TeamList.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Button, Paper, Grid, Card, CardContent, 
  CardMedia, CardActions, TextField, InputAdornment, Chip, IconButton,
  Menu, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, 
  DialogTitle, Divider, FormControl, InputLabel, Select, Skeleton, Avatar
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  VisibilityOff as VisibilityOffIcon,
  Visibility as VisibilityIcon,
  OpenInNew as OpenInNewIcon,
  LinkedIn as LinkedInIcon,
  Twitter as TwitterIcon,
  GitHub as GitHubIcon,
  Facebook as FacebookIcon,
  DragIndicator as DragIndicatorIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon
} from '@mui/icons-material';

// Demo team members data
const teamData = [
  {
    id: 1,
    name: 'John Smith',
    position: 'CEO & Founder',
    department: 'Leadership',
    bio: 'John has over 15 years of experience in web development and digital strategy. He founded the company in 2010 with a mission to help businesses succeed online.',
    photo: '/images/team/john-smith.jpg',
    email: 'john@devigo.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/johnsmith',
      twitter: 'https://twitter.com/johnsmith',
      github: 'https://github.com/johnsmith'
    },
    displayOrder: 1,
    isVisible: true,
    updatedAt: '2023-04-10T15:30:00Z'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    position: 'Creative Director',
    department: 'Design',
    bio: 'Sarah leads our design team with her exceptional creativity and eye for detail. She specializes in creating engaging user experiences and beautiful interfaces.',
    photo: '/images/team/sarah-johnson.jpg',
    email: 'sarah@devigo.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      twitter: 'https://twitter.com/sarahjohnson',
      dribbble: 'https://dribbble.com/sarahjohnson'
    },
    displayOrder: 2,
    isVisible: true,
    updatedAt: '2023-04-05T11:45:00Z'
  },
  {
    id: 3,
    name: 'Michael Chen',
    position: 'Lead Developer',
    department: 'Development',
    bio: 'Michael is a full-stack developer with expertise in React, Node.js, and cloud technologies. He leads our development team in building scalable web applications.',
    photo: '/images/team/michael-chen.jpg',
    email: 'michael@devigo.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/michaelchen',
      github: 'https://github.com/michaelchen',
      stackoverflow: 'https://stackoverflow.com/users/12345/michaelchen'
    },
    displayOrder: 3,
    isVisible: true,
    updatedAt: '2023-03-28T09:20:00Z'
  },
  {
    id: 4,
    name: 'Emily Rodriguez',
    position: 'Marketing Manager',
    department: 'Marketing',
    bio: 'Emily heads our digital marketing efforts, specializing in SEO, content strategy, and digital advertising campaigns that drive results for our clients.',
    photo: '/images/team/emily-rodriguez.jpg',
    email: 'emily@devigo.com',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/emilyrodriguez',
      twitter: 'https://twitter.com/emilyrodriguez'
    },
    displayOrder: 4,
    isVisible: false,
    updatedAt: '2023-03-15T14:10:00Z'
  }
];

// Department options for filtering
const departments = ['Leadership', 'Design', 'Development', 'Marketing', 'Sales', 'Support'];

const TeamList = () => {
  const navigate = useNavigate();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [visibilityFilter, setVisibilityFilter] = useState('all');
  const [orderBy, setOrderBy] = useState('displayOrder');
  const [orderDirection, setOrderDirection] = useState('asc');
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Simulate data loading from API
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTeam(teamData);
      } catch (error) {
        console.error('Error fetching team data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  // Filtering and sorting logic
  const filteredTeam = team.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === '' || member.department === departmentFilter;
    
    const matchesVisibility = 
      visibilityFilter === 'all' ? true : 
      visibilityFilter === 'visible' ? member.isVisible : !member.isVisible;
    
    return matchesSearch && matchesDepartment && matchesVisibility;
  }).sort((a, b) => {
    if (orderBy === 'name') {
      return orderDirection === 'asc' ? 
        a.name.localeCompare(b.name) : 
        b.name.localeCompare(a.name);
    } else if (orderBy === 'updatedAt') {
      return orderDirection === 'asc' ? 
        new Date(a.updatedAt) - new Date(b.updatedAt) : 
        new Date(b.updatedAt) - new Date(a.updatedAt);
    } else {
      return orderDirection === 'asc' ? 
        a.displayOrder - b.displayOrder : 
        b.displayOrder - a.displayOrder;
    }
  });

  const handleSort = (field) => {
    if (orderBy === field) {
      setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(field);
      setOrderDirection('asc');
    }
  };

  // Action menu handlers
  const handleMenuOpen = (event, memberId) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedMemberId(memberId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleEditMember = () => {
    navigate(`/admin/team/${selectedMemberId}`);
    handleMenuClose();
  };

  const handleToggleVisibility = () => {
    // In a real app, this would call an API
    setTeam(team.map(member => 
      member.id === selectedMemberId ? 
      { ...member, isVisible: !member.isVisible } : 
      member
    ));
    handleMenuClose();
  };

  const handleMoveUp = () => {
    // Find the current member and the one above it
    const currentMember = team.find(m => m.id === selectedMemberId);
    const memberAbove = team.find(m => m.displayOrder === currentMember.displayOrder - 1);
    
    if (currentMember && memberAbove) {
      // Swap their display orders
      setTeam(team.map(member => {
        if (member.id === currentMember.id) {
          return { ...member, displayOrder: member.displayOrder - 1 };
        } else if (member.id === memberAbove.id) {
          return { ...member, displayOrder: member.displayOrder + 1 };
        }
        return member;
      }));
    }
    
    handleMenuClose();
  };

  const handleMoveDown = () => {
    // Find the current member and the one below it
    const currentMember = team.find(m => m.id === selectedMemberId);
    const memberBelow = team.find(m => m.displayOrder === currentMember.displayOrder + 1);
    
    if (currentMember && memberBelow) {
      // Swap their display orders
      setTeam(team.map(member => {
        if (member.id === currentMember.id) {
          return { ...member, displayOrder: member.displayOrder + 1 };
        } else if (member.id === memberBelow.id) {
          return { ...member, displayOrder: member.displayOrder - 1 };
        }
        return member;
      }));
    }
    
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // In a real app, this would call an API
    setTeam(team.filter(member => member.id !== selectedMemberId));
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const getSelectedMember = () => {
    return team.find(member => member.id === selectedMemberId);
  };

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
            placeholder="Search team members..."
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
            <InputLabel id="department-filter-label">Department</InputLabel>
            <Select
              labelId="department-filter-label"
              id="department-filter"
              value={departmentFilter}
              label="Department"
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <MenuItem value="">All Departments</MenuItem>
              {departments.map(department => (
                <MenuItem key={department} value={department}>{department}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel id="visibility-filter-label">Visibility</InputLabel>
            <Select
              labelId="visibility-filter-label"
              id="visibility-filter"
              value={visibilityFilter}
              label="Visibility"
              onChange={(e) => setVisibilityFilter(e.target.value)}
            >
              <MenuItem value="all">All Members</MenuItem>
              <MenuItem value="visible">Visible</MenuItem>
              <MenuItem value="hidden">Hidden</MenuItem>
            </Select>
          </FormControl>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">Sort by:</Typography>
            <Button 
              size="small" 
              color={orderBy === 'displayOrder' ? 'primary' : 'inherit'}
              variant={orderBy === 'displayOrder' ? 'outlined' : 'text'}
              onClick={() => handleSort('displayOrder')}
              endIcon={orderBy === 'displayOrder' && (
                orderDirection === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
              )}
            >
              Order
            </Button>
            <Button 
              size="small" 
              color={orderBy === 'name' ? 'primary' : 'inherit'}
              variant={orderBy === 'name' ? 'outlined' : 'text'}
              onClick={() => handleSort('name')}
              endIcon={orderBy === 'name' && (
                orderDirection === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />
              )}
            >
              Name
            </Button>
          </Box>
        </Paper>
        
        {loading ? (
          <Grid container spacing={3}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item}>
                <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
                  <Box sx={{ textAlign: 'center', pt: 3 }}>
                    <Skeleton variant="circular" width={120} height={120} sx={{ mx: 'auto' }} />
                  </Box>
                  <CardContent>
                    <Skeleton variant="text" sx={{ fontSize: '1.2rem', textAlign: 'center' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem', textAlign: 'center' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem', width: '60%', mx: 'auto' }} />
                  </CardContent>
                  <CardActions>
                    <Skeleton variant="rectangular" width={70} height={30} sx={{ borderRadius: 1 }} />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : filteredTeam.length === 0 ? (
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
              No team members found
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              No team members match your current filters. Try adjusting your search or filter criteria.
            </Typography>
            <Button 
              // Continuing TeamList.jsx component...
              variant="outlined" 
              startIcon={<AddIcon />}
              component={Link}
              to="/admin/team/new"
            >
              Add New Team Member
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredTeam.map((member) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={member.id}>
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
                    },
                    opacity: member.isVisible ? 1 : 0.7
                  }}
                >
                  <Box sx={{ position: 'relative', textAlign: 'center', pt: 3, pb: 1 }}>
                    {!member.isVisible && (
                      <Chip 
                        label="Hidden" 
                        size="small"
                        sx={{ 
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          bgcolor: 'rgba(0, 0, 0, 0.7)',
                          color: 'white'
                        }}
                      />
                    )}
                    <Box sx={{ position: 'relative', display: 'inline-block' }}>
                      <Avatar
                        src={member.photo}
                        alt={member.name}
                        sx={{ 
                          width: 120, 
                          height: 120, 
                          mx: 'auto',
                          border: '4px solid',
                          borderColor: 'background.paper',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Chip 
                        label={`#${member.displayOrder}`} 
                        size="small"
                        color="primary"
                        sx={{ 
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          transform: 'translateY(50%)'
                        }}
                      />
                    </Box>
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography gutterBottom variant="h6" component="h2">
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="primary.main" gutterBottom>
                      {member.position}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                      {member.department}
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ 
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      textAlign: 'left',
                      mt: 1.5
                    }}>
                      {member.bio}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
                      {member.socialLinks.linkedin && (
                        <IconButton size="small" color="primary" href={member.socialLinks.linkedin} target="_blank" rel="noopener">
                          <LinkedInIcon fontSize="small" />
                        </IconButton>
                      )}
                      {member.socialLinks.twitter && (
                        <IconButton size="small" color="primary" href={member.socialLinks.twitter} target="_blank" rel="noopener">
                          <TwitterIcon fontSize="small" />
                        </IconButton>
                      )}
                      {member.socialLinks.github && (
                        <IconButton size="small" color="primary" href={member.socialLinks.github} target="_blank" rel="noopener">
                          <GitHubIcon fontSize="small" />
                        </IconButton>
                      )}
                      {member.socialLinks.facebook && (
                        <IconButton size="small" color="primary" href={member.socialLinks.facebook} target="_blank" rel="noopener">
                          <FacebookIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </CardContent>
                  
                  <CardActions sx={{ justifyContent: 'space-between', borderTop: '1px solid', borderColor: 'divider', px: 2 }}>
                    <Button 
                      size="small" 
                      startIcon={<EditIcon />}
                      component={Link}
                      to={`/admin/team/${member.id}`}
                    >
                      Edit
                    </Button>
                    <IconButton 
                      size="small"
                      onClick={(event) => handleMenuOpen(event, member.id)}
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
        <MenuItem onClick={handleEditMember}>
          <Box sx={{ mr: 2, display: 'inline-flex', color: 'text.secondary' }}>
            <EditIcon fontSize="small" />
          </Box>
          Edit
        </MenuItem>
        
        {selectedMemberId && getSelectedMember()?.isVisible ? (
          <MenuItem onClick={handleToggleVisibility}>
            <Box sx={{ mr: 2, display: 'inline-flex', color: 'text.secondary' }}>
              <VisibilityOffIcon fontSize="small" />
            </Box>
            Hide from Website
          </MenuItem>
        ) : (
          <MenuItem onClick={handleToggleVisibility}>
            <Box sx={{ mr: 2, display: 'inline-flex', color: 'text.secondary' }}>
              <VisibilityIcon fontSize="small" />
            </Box>
            Show on Website
          </MenuItem>
        )}
        
        <MenuItem onClick={handleMoveUp} disabled={selectedMemberId && getSelectedMember()?.displayOrder === 1}>
          <Box sx={{ mr: 2, display: 'inline-flex', color: 'text.secondary' }}>
            <ArrowUpwardIcon fontSize="small" />
          </Box>
          Move Up
        </MenuItem>
        
        <MenuItem onClick={handleMoveDown} disabled={selectedMemberId && getSelectedMember()?.displayOrder === team.length}>
          <Box sx={{ mr: 2, display: 'inline-flex', color: 'text.secondary' }}>
            <ArrowDownwardIcon fontSize="small" />
          </Box>
          Move Down
        </MenuItem>
        
        <Divider />
        
        <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
          <Box sx={{ mr: 2, display: 'inline-flex', color: 'error.main' }}>
            <DeleteIcon fontSize="small" />
          </Box>
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
            Are you sure you want to delete {selectedMemberId && getSelectedMember()?.name} from the team? 
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

export default TeamList;