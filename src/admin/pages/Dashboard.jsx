// frontend/src/admin/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Container, Grid, Paper, Typography, Box, Divider, 
  Button, Card, CardContent, CardActions, Avatar, IconButton,
  Table, TableBody, TableCell, TableHead, TableRow, Chip,
  LinearProgress, Link, List, ListItem, ListItemText, ListItemIcon,
  ListItemAvatar, AvatarGroup, TableContainer, Skeleton
} from '@mui/material';
import { 
  TrendingUp as TrendingUpIcon, People as PeopleIcon, 
  Visibility as VisibilityIcon, Article as ArticleIcon,
  MoreVert as MoreVertIcon, ReadMore as ReadMoreIcon,
  OpenInNew as OpenInNewIcon, Schedule as ScheduleIcon,
  Home as HomeIcon, 
  PersonOutlined as PersonIcon,
  WebOutlined as WebIcon,
  AccountBalanceWalletOutlined as WalletIcon,
  Email as EmailIcon,
  Work as WorkIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  FlagOutlined as FlagOutlinedIcon,
  NotificationsNone as NotificationsNoneIcon,
  BarChart as BarChartIcon,
  DonutLarge as DonutLargeIcon,
  CalendarToday as CalendarTodayIcon
} from '@mui/icons-material';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, BarChart, Bar, Legend, LineChart, Line } from 'recharts';
import { useTheme } from '@mui/material/styles';

// Demo data - would come from API in real implementation
const statsData = [
  { id: 1, title: 'Total Visitors', value: '12,584', change: '+12.5%', icon: <VisibilityIcon />, color: '#0A66C2', subtitle: 'vs. previous month' },
  { id: 2, title: 'New Leads', value: '348', change: '+8.2%', icon: <PeopleIcon />, color: '#2E7D32', subtitle: 'vs. previous month' },
  { id: 3, title: 'Conversion Rate', value: '3.8%', change: '+0.7%', icon: <TrendingUpIcon />, color: '#ED6C02', subtitle: 'vs. previous month' },
  { id: 4, title: 'Published Content', value: '42', change: '+4', icon: <ArticleIcon />, color: '#9C27B0', subtitle: 'new items this month' },
];

const visitorData = [
  { name: 'Mon', value: 1800, mobile: 1100, desktop: 700 },
  { name: 'Tue', value: 2200, mobile: 1300, desktop: 900 },
  { name: 'Wed', value: 1900, mobile: 1200, desktop: 700 },
  { name: 'Thu', value: 2400, mobile: 1500, desktop: 900 },
  { name: 'Fri', value: 2800, mobile: 1700, desktop: 1100 },
  { name: 'Sat', value: 1700, mobile: 1000, desktop: 700 },
  { name: 'Sun', value: 1500, mobile: 900, desktop: 600 },
];

const sourceData = [
  { name: 'Direct', value: 35 },
  { name: 'Organic', value: 25 },
  { name: 'Referral', value: 20 },
  { name: 'Social', value: 15 },
  { name: 'Email', value: 5 },
];

const conversionData = [
  { name: 'Jan', rate: 2.8 },
  { name: 'Feb', rate: 2.5 },
  { name: 'Mar', rate: 2.9 },
  { name: 'Apr', rate: 3.2 },
  { name: 'May', rate: 3.8 },
  { name: 'Jun', rate: 3.5 },
  { name: 'Jul', rate: 3.7 },
];

const popularContentData = [
  { id: 1, title: 'The Complete Guide to SEO in 2023', views: 1245, conversions: 47 },
  { id: 2, title: 'How to Build a Responsive Website', views: 980, conversions: 35 },
  { id: 3, title: '10 UX Design Principles Every Developer Should Know', views: 876, conversions: 29 },
  { id: 4, title: 'Introduction to Web Accessibility', views: 765, conversions: 24 },
];

const sourceColors = ['#0A66C2', '#0E86D4', '#1AA7EC', '#5ABFEF', '#94D8F6'];

const recentLeads = [
  { 
    id: 1, 
    name: 'John Smith', 
    email: 'john@example.com', 
    service: 'Web Development', 
    date: '2023-05-15', 
    status: 'New',
    avatar: 'JS'
  },
  { 
    id: 2, 
    name: 'Emma Johnson', 
    email: 'emma@company.com', 
    service: 'SEO Services', 
    date: '2023-05-14', 
    status: 'Contacted',
    avatar: 'EJ'
  },
  { 
    id: 3, 
    name: 'Michael Brown', 
    email: 'mbrown@enterprise.org', 
    service: 'Mobile App', 
    date: '2023-05-13', 
    status: 'In Progress',
    avatar: 'MB'
  },
  { 
    id: 4, 
    name: 'Sarah Wilson', 
    email: 'swilson@gmail.com', 
    service: 'UI/UX Design', 
    date: '2023-05-12', 
    status: 'Converted',
    avatar: 'SW'
  },
];

const recentContent = [
  {
    id: 1,
    title: '10 Web Design Trends to Watch in 2023',
    type: 'Blog Post',
    author: 'Jessica Adams',
    date: '2023-05-10',
    status: 'Published',
    icon: <ArticleIcon />
  },
  {
    id: 2,
    title: 'E-commerce Platform Redesign',
    type: 'Project',
    author: 'David Chen',
    date: '2023-05-08',
    status: 'Published',
    icon: <WorkIcon />
  },
  {
    id: 3,
    title: 'SEO Optimization Service',
    type: 'Service',
    author: 'Mark Wilson',
    date: '2023-05-05',
    status: 'Updated',
    icon: <WebIcon />
  },
];

const upcomingTasks = [
  {
    id: 1,
    title: 'Publish June newsletter',
    due: 'Tomorrow at 10:00 AM',
    priority: 'High',
    icon: <NotificationsNoneIcon color="primary" />
  },
  {
    id: 2,
    title: 'Review new blog post draft',
    due: 'In 2 days',
    priority: 'Medium',
    icon: <ArticleIcon color="secondary" />
  },
  {
    id: 3,
    title: 'Follow up with potential clients',
    due: 'In 3 days',
    priority: 'High',
    icon: <PersonIcon sx={{ color: '#ED6C02' }} />
  },
  {
    id: 4,
    title: 'Update service pricing',
    due: 'In 5 days',
    priority: 'Medium',
    icon: <WalletIcon color="info" />
  },
];

const Dashboard = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const getStatusColor = (status) => {
    switch(status) {
      case 'New': return 'info';
      case 'Contacted': return 'primary';
      case 'In Progress': return 'warning';
      case 'Converted': return 'success';
      case 'Published': return 'success';
      case 'Updated': return 'secondary';
      default: return 'default';
    }
  };

  const renderSkeleton = () => (
    <Grid container spacing={3}>
      {Array.from(new Array(4)).map((_, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="text" sx={{ my: 1 }} width="60%" height={40} />
            <Skeleton variant="text" width="40%" />
          </Paper>
        </Grid>
      ))}
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3, height: 430 }}>
          <Skeleton variant="text" width="30%" height={40} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={350} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, height: 430 }}>
          <Skeleton variant="text" width="50%" height={40} sx={{ mb: 2 }} />
          <Skeleton variant="circular" width={300} height={300} sx={{ mx: 'auto' }} />
        </Paper>
      </Grid>
    </Grid>
  );

  if (loading) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ mb: 4 }}>
          <Skeleton variant="text" width="30%" height={60} />
          <Skeleton variant="text" width="40%" />
        </Box>
        {renderSkeleton()}
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>Dashboard</Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening with your website.
        </Typography>
      </Box>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map(stat => (
          <Grid item xs={12} sm={6} md={3} key={stat.id}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                border: '1px solid',
                borderColor: theme.palette.divider,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
                  borderColor: stat.color,
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: `${stat.color}15`,
                    color: stat.color,
                    width: 56,
                    height: 56,
                    borderRadius: 2
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography
                    variant="body2"
                    color={stat.change.startsWith('+') ? 'success.main' : 'error.main'}
                    fontWeight={600}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      justifyContent: 'flex-end'
                    }}
                  >
                    {stat.change.startsWith('+') ? <ArrowUpwardIcon fontSize="small" sx={{ mr: 0.5 }} /> : <ArrowDownwardIcon fontSize="small" sx={{ mr: 0.5 }} />}
                    {stat.change}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {stat.subtitle}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                {stat.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      {/* Top Row Charts */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              height: '100%',
              border: '1px solid',
              borderColor: theme.palette.divider,
              '&:hover': {
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h6" fontWeight={600}>Website Visitors</Typography>
                <Typography variant="body2" color="text.secondary">
                  Last 7 days • Total: 15,284 visitors
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                size="small"
                endIcon={<OpenInNewIcon />}
              >
                View Details
              </Button>
            </Box>
            <Box sx={{ height: 320, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitorData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0A66C2" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0A66C2" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2E7D32" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#2E7D32" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ED6C02" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ED6C02" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    name="Total Visitors"
                    stroke="#0A66C2" 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="mobile" 
                    name="Mobile"
                    stroke="#2E7D32" 
                    fillOpacity={1} 
                    fill="url(#colorMobile)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="desktop" 
                    name="Desktop"
                    stroke="#ED6C02" 
                    fillOpacity={1} 
                    fill="url(#colorDesktop)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              height: '100%',
              border: '1px solid',
              borderColor: theme.palette.divider,
              '&:hover': {
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h6" fontWeight={600}>Traffic Sources</Typography>
                <Typography variant="body2" color="text.secondary">
                  Where your visitors come from
                </Typography>
              </Box>
              <DonutLargeIcon color="action" />
            </Box>
            <Box sx={{ height: 320, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Box sx={{ height: 250, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={sourceColors[index % sourceColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Grid container spacing={1}>
                  {sourceData.map((source, index) => (
                    <Grid item xs={6} key={source.name}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            borderRadius: 6,
                            bgcolor: sourceColors[index % sourceColors.length],
                            mr: 1
                          }}
                        />
                        <Typography variant="caption" noWrap>
                          {source.name}: {source.value}%
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Middle Row - Conversions & Popular Content */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={5}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              height: '100%',
              border: '1px solid',
              borderColor: theme.palette.divider,
              '&:hover': {
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h6" fontWeight={600}>Conversion Trend</Typography>
                <Typography variant="body2" color="text.secondary">
                  Monthly conversion rate
                </Typography>
              </Box>
              <BarChartIcon color="action" />
            </Box>
            <Box sx={{ height: 250, width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={conversionData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Conversion Rate']} />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#9C27B0" 
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#9C27B0', strokeWidth: 0 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: 2,
              height: '100%',
              border: '1px solid',
              borderColor: theme.palette.divider,
              '&:hover': {
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>Popular Content</Typography>
              <Button 
                variant="text" 
                size="small"
                endIcon={<OpenInNewIcon />}
              >
                View All
              </Button>
            </Box>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Content Title</TableCell>
                    <TableCell align="right">Views</TableCell>
                    <TableCell align="right">Conversion Rate</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {popularContentData.map((item) => (
                    <TableRow key={item.id} hover>
                      <TableCell component="th" scope="row">
                        <Typography variant="body2" fontWeight={500}>{item.title}</Typography>
                      </TableCell>
                      <TableCell align="right">{item.views.toLocaleString()}</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                          <Typography variant="body2" sx={{ mr: 1 }}>
                            {((item.conversions / item.views) * 100).toFixed(1)}%
                          </Typography>
                          <Box sx={{ width: 50 }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={(item.conversions / item.views) * 100}
                              sx={{ height: 4, borderRadius: 2 }}
                            />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small">
                          <OpenInNewIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Bottom Row - Recent Data */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 3, 
              borderRadius: 2,
              height: '100%',
              border: '1px solid',
              borderColor: theme.palette.divider,
              '&:hover': {
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
              }
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" fontWeight={600}>Recent Leads</Typography>
              <Button 
                component={Link}
                href="/admin/leads"
                variant="text" 
                size="small"
                endIcon={<OpenInNewIcon />}
              >
                View All
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Service</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentLeads.map((lead) => (
                    <TableRow 
                      key={lead.id}
                      hover
                      sx={{ 
                        '&:last-child td, &:last-child th': { border: 0 },
                        transition: 'background-color 0.2s',
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar 
                            sx={{ 
                              width: 32, 
                              height: 32, 
                              mr: 1.5, 
                              bgcolor: theme.palette.primary.main, 
                              fontSize: '0.875rem' 
                            }}
                          >
                            {lead.avatar}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" fontWeight={500}>
                              {lead.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {lead.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{lead.service}</TableCell>
                      <TableCell>{new Date(lead.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Chip 
                          label={lead.status} 
                          size="small" 
                          color={getStatusColor(lead.status)} 
                          variant="outlined"
                          sx={{ fontWeight: 500 }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small">
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: theme.palette.divider,
                  '&:hover': {
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>Recent Content</Typography>
                  <Button 
                    component={Link}
                    href="/admin/content"
                    variant="text" 
                    size="small"
                    endIcon={<OpenInNewIcon />}
                  >
                    View All
                  </Button>
                </Box>
                <List disablePadding>
                  {recentContent.map((content) => (
                    <ListItem
                      key={content.id}
                      disablePadding
                      secondaryAction={
                        <IconButton edge="end" size="small">
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      }
                      sx={{ 
                        py: 1.5,
                        px: 0,
                        borderBottom: `1px solid ${theme.palette.divider}`, 
                        '&:last-child': { borderBottom: 0 } 
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 44 }}>
                        <Avatar 
                          sx={{ 
                            width: 36, 
                            height: 36, 
                            bgcolor: 'background.default', 
                            color: 'text.primary',
                            border: `1px solid ${theme.palette.divider}`
                          }}
                        >
                          {content.icon}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2" fontWeight={500}>
                            {content.title}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
                              {content.type}
                            </Typography>
                            <Chip 
                              label={content.status} 
                              size="small" 
                              color={getStatusColor(content.status)} 
                              sx={{ 
                                height: 20, 
                                '& .MuiChip-label': { 
                                  px: 1, 
                                  fontSize: '0.625rem', 
                                  fontWeight: 600 
                                } 
                              }} 
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: theme.palette.divider,
                  '&:hover': {
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
                  }
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight={600}>Upcoming Tasks</Typography>
                  <Button 
                    component={Link}
                    href="/admin/tasks"
                    variant="text" 
                    size="small"
                    endIcon={<OpenInNewIcon />}
                  >
                    View All Tasks
                  </Button>
                </Box>
                <List disablePadding>
                  {upcomingTasks.map((task) => (
                    <ListItem
                      key={task.id}
                      disablePadding
                      secondaryAction={
                        <Chip
                          label={task.priority}
                          size="small"
                          color={task.priority === 'High' ? 'error' : 'default'}
                          variant="outlined"
                          sx={{ 
                            height: 24, 
                            fontWeight: 500,
                            borderColor: task.priority === 'High' ? 'error.main' : 'inherit'
                          }}
                        />
                      }
                      sx={{ 
                        py: 1.5,
                        px: 0,
                        borderBottom: `1px solid ${theme.palette.divider}`, 
                        '&:last-child': { borderBottom: 0 } 
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 44 }}>
                        <Avatar 
                          sx={{ 
                            width: 32, 
                            height: 32, 
                            bgcolor: 'background.default', 
                            color: 'inherit'
                          }}
                        >
                          {task.icon}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2" fontWeight={500}>
                            {task.title}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <CalendarTodayIcon sx={{ fontSize: 12, mr: 0.5, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {task.due}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;