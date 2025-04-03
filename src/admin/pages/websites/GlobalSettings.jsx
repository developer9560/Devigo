// frontend/src/admin/pages/website/GlobalSettings.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Button, Paper, Grid, TextField, 
  Divider, FormControlLabel, Switch, IconButton, Chip, Avatar,
  List, ListItem, ListItemText, ListItemSecondaryAction, Alert,
  CircularProgress, Tabs, Tab, Card, CardMedia, CardContent,
  Accordion, AccordionSummary, AccordionDetails, Tooltip
} from '@mui/material';
import { 
  Save as SaveIcon, 
  Add as AddIcon,
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon,
  ExpandMore as ExpandMoreIcon,
  ColorLens as ColorLensIcon,
  ImageOutlined as ImageOutlinedIcon,
  Link as LinkIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  YouTube as YouTubeIcon,
  GitHub as GitHubIcon
} from '@mui/icons-material';
import { CompactPicker } from 'react-color';

// Demo settings data
const settingsData = {
  general: {
    siteName: 'DEVIGO',
    tagline: 'Building Digital Experiences That Transform',
    contactEmail: 'info@devigo.com',
    contactPhone: '+1 (555) 123-4567',
    contactAddress: '123 Tech Street, Suite 456, San Francisco, CA 94107',
    businessHours: 'Monday-Friday: 9am-6pm, Saturday: 10am-2pm, Sunday: Closed'
  },
  branding: {
    logoLight: '/images/logo-light.png',
    logoDark: '/images/logo-dark.png',
    favicon: '/favicon.ico',
    primaryColor: '#0A66C2',
    secondaryColor: '#5E35B1',
    accentColor: '#00C853'
  },
  footer: {
    copyrightText: '© 2023 DEVIGO. All rights reserved.',
    showSocialLinks: true,
    showQuickLinks: true,
    showContactInfo: true,
    showNewsletter: true,
    quickLinks: [
      { id: 1, text: 'About Us', url: '/about' },
      { id: 2, text: 'Services', url: '/services' },
      { id: 3, text: 'Portfolio', url: '/portfolio' },
      { id: 4, text: 'Blog', url: '/blog' },
      { id: 5, text: 'Contact', url: '/contact' },
      { id: 6, text: 'Privacy Policy', url: '/privacy-policy' }
    ]
  },
  socialMedia: [
    { id: 1, platform: 'twitter', url: 'https://twitter.com/devigo', icon: TwitterIcon },
    { id: 2, platform: 'facebook', url: 'https://facebook.com/devigo', icon: FacebookIcon },
    { id: 3, platform: 'instagram', url: 'https://instagram.com/devigo', icon: InstagramIcon },
    { id: 4, platform: 'linkedin', url: 'https://linkedin.com/company/devigo', icon: LinkedInIcon },
    { id: 5, platform: 'youtube', url: 'https://youtube.com/c/devigo', icon: YouTubeIcon },
    { id: 6, platform: 'github', url: 'https://github.com/devigo', icon: GitHubIcon }
  ],
  cookieConsent: {
    enabled: true,
    message: 'We use cookies to enhance your experience on our website. By continuing to use our site, you consent to our use of cookies.',
    buttonText: 'Accept Cookies',
    privacyLinkText: 'Learn More',
    privacyLinkUrl: '/privacy-policy'
  }
};

const GlobalSettings = () => {
  const [settings, setSettings] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [colorPickerOpen, setColorPickerOpen] = useState({
    primary: false,
    secondary: false,
    accent: false
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [newQuickLink, setNewQuickLink] = useState({ text: '', url: '' });
  const [newSocialLink, setNewSocialLink] = useState({ platform: '', url: '' });
  
  // Load settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSettings(settingsData);
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, []);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  const handleSettingChange = (section, field, value) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: value
      }
    });
  };
  
  const handleColorChange = (section, field, color) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [field]: color.hex
      }
    });
  };
  
  const toggleColorPicker = (field) => {
    setColorPickerOpen({
      ...colorPickerOpen,
      [field]: !colorPickerOpen[field]
    });
  };
  
  const handleAddQuickLink = () => {
    if (newQuickLink.text && newQuickLink.url) {
      const newId = Math.max(0, ...settings.footer.quickLinks.map(link => link.id)) + 1;
      
      setSettings({
        ...settings,
        footer: {
          ...settings.footer,
          quickLinks: [
            ...settings.footer.quickLinks,
            { id: newId, ...newQuickLink }
          ]
        }
      });
      
      setNewQuickLink({ text: '', url: '' });
    }
  };
  
  const handleRemoveQuickLink = (id) => {
    setSettings({
      ...settings,
      footer: {
        ...settings.footer,
        quickLinks: settings.footer.quickLinks.filter(link => link.id !== id)
      }
    });
  };
  
  const handleAddSocialLink = () => {
    if (newSocialLink.platform && newSocialLink.url) {
      const newId = Math.max(0, ...settings.socialMedia.map(link => link.id)) + 1;
      
      // Determine icon based on platform
      let icon;
      switch (newSocialLink.platform.toLowerCase()) {
        case 'twitter': icon = TwitterIcon; break;
        case 'facebook': icon = FacebookIcon; break;
        case 'instagram': icon = InstagramIcon; break;
        case 'linkedin': icon = LinkedInIcon; break;
        case 'youtube': icon = YouTubeIcon; break;
        case 'github': icon = GitHubIcon; break;
        default: icon = LinkIcon;
      }
      
      setSettings({
        ...settings,
        socialMedia: [
          ...settings.socialMedia,
          { id: newId, ...newSocialLink, icon }
        ]
      });
      
      setNewSocialLink({ platform: '', url: '' });
    }
  };
  
  const handleRemoveSocialLink = (id) => {
    setSettings({
      ...settings,
      socialMedia: settings.socialMedia.filter(link => link.id !== id)
    });
  };
  
  const handleImageUpload = (section, field) => {
    // In a real app, this would trigger a file upload dialog
    // and upload the image to a server or CDN
    alert(`Image upload for ${section}.${field} would be handled here`);
  };
  
  const handleSaveSettings = async () => {
    setSaving(true);
    
    try {
      // Simulate API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Settings saved:', settings);
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading settings...</Typography>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
            Website Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Configure global settings for your website appearance and behavior
          </Typography>
        </Box>
        
        <Button
          variant="contained"
          color="primary"
          startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
          onClick={handleSaveSettings}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </Box>
      
      {saveSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings saved successfully!
        </Alert>
      )}
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange} aria-label="settings tabs">
          <Tab label="General Information" />
          <Tab label="Branding & Colors" />
          <Tab label="Footer Configuration" />
          <Tab label="Social Media" />
          <Tab label="Cookie Consent" />
        </Tabs>
      </Box>
      
      {/* General Information Tab */}
      {activeTab === 0 && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2
          }}
        >
          <Typography variant="h6" gutterBottom>
            General Website Information
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Basic information about your business that appears throughout the website
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Site Name"
                fullWidth
                value={settings.general.siteName}
                onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
                helperText="Your website or business name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Tagline"
                fullWidth
                value={settings.general.tagline}
                onChange={(e) => handleSettingChange('general', 'tagline', e.target.value)}
                helperText="A short slogan that appears in various places"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Contact Email"
                fullWidth
                type="email"
                value={settings.general.contactEmail}
                onChange={(e) => handleSettingChange('general', 'contactEmail', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Contact Phone"
                fullWidth
                value={settings.general.contactPhone}
                onChange={(e) => handleSettingChange('general', 'contactPhone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Business Address"
                fullWidth
                multiline
                rows={2}
                value={settings.general.contactAddress}
                onChange={(e) => handleSettingChange('general', 'contactAddress', e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Business Hours"
                fullWidth
                multiline
                rows={2}
                value={settings.general.businessHours}
                onChange={(e) => handleSettingChange('general', 'businessHours', e.target.value)}
                helperText="Your operating hours (displayed in the contact section)"
              />
            </Grid>
          </Grid>
        </Paper>
      )}
      
      {/* Branding & Colors Tab */}
      {activeTab === 1 && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2
          }}
        >
          <Typography variant="h6" gutterBottom>
            Branding & Visual Identity
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Customize your website's look and feel with logos and brand colors
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 1 }}>
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom>
                Logo (Light Version)
              </Typography>
              <Card
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  height: 150,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 1,
                  p: 2,
                  bgcolor: 'grey.900'
                }}
              >
                {settings.branding.logoLight ? (
                  <CardMedia
                    component="img"
                    image={settings.branding.logoLight}
                    alt="Logo Light"
                    sx={{ maxHeight: '100%', width: 'auto', maxWidth: '100%' }}
                  />
                ) : (
                  <Box sx={{ textAlign: 'center', color: 'grey.500' }}>
                    <ImageOutlinedIcon fontSize="large" />
                    <Typography variant="caption" display="block">
                      No logo uploaded
                    </Typography>
                  </Box>
                )}
              </Card>
              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                fullWidth
                onClick={() => handleImageUpload('branding', 'logoLight')}
              >
                Upload Logo
              </Button>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom>
                Logo (Dark Version)
              </Typography>
              <Card
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  height: 150,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 1,
                  p: 2,
                  bgcolor: 'grey.100'
                }}
              >
                {settings.branding.logoDark ? (
                  <CardMedia
                    component="img"
                    image={settings.branding.logoDark}
                    alt="Logo Dark"
                    sx={{ maxHeight: '100%', width: 'auto', maxWidth: '100%' }}
                  />
                ) : (
                  <Box sx={{ textAlign: 'center', color: 'grey.500' }}>
                    <ImageOutlinedIcon fontSize="large" />
                    <Typography variant="caption" display="block">
                      No logo uploaded
                    </Typography>
                  </Box>
                )}
              </Card>
              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                fullWidth
                onClick={() => handleImageUpload('branding', 'logoDark')}
              >
                Upload Logo
              </Button>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" gutterBottom>
                Favicon
              </Typography>
              <Card
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  height: 150,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 1,
                  p: 2
                }}
              >
                {settings.branding.favicon ? (
                  <CardMedia
                    component="img"
                    image={settings.branding.favicon}
                    alt="Favicon"
                    sx={{ maxHeight: '100%', width: 'auto', maxWidth: '100%' }}
                  />
                ) : (
                  <Box sx={{ textAlign: 'center', color: 'grey.500' }}>
                    <ImageOutlinedIcon fontSize="large" />
                    <Typography variant="caption" display="block">
                      No favicon uploaded
                    </Typography>
                  </Box>
                )}
              </Card>
              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                fullWidth
                onClick={() => handleImageUpload('branding', 'favicon')}
              >
                Upload Favicon
              </Button>
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h6" gutterBottom>
            Brand Colors
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Define your website's color scheme
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Primary Color
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      bgcolor: settings.branding.primaryColor,
                      mr: 2,
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                    onClick={() => toggleColorPicker('primary')}
                  />
                  <TextField
                    value={settings.branding.primaryColor}
                    size="small"
                    sx={{ flexGrow: 1 }}
                    InputProps={{
                      endAdornment: (
                        <IconButton size="small" onClick={() => toggleColorPicker('primary')}>
                          <ColorLensIcon fontSize="small" />
                        </IconButton>
                      )
                    }}
                  />
                </Box>
                {colorPickerOpen.primary && (
                  <Box sx={{ mt: 2, mb: 3 }}>
                    <CompactPicker
                      color={settings.branding.primaryColor}
                      onChange={(color) => handleColorChange('branding', 'primaryColor', color)}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Secondary Color
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      bgcolor: settings.branding.secondaryColor,
                      mr: 2,
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                    onClick={() => toggleColorPicker('secondary')}
                  />
                  <TextField
                    value={settings.branding.secondaryColor}
                    size="small"
                    sx={{ flexGrow: 1 }}
                    InputProps={{
                      endAdornment: (
                        <IconButton size="small" onClick={() => toggleColorPicker('secondary')}>
                          <ColorLensIcon fontSize="small" />
                        </IconButton>
                      )
                    }}
                  />
                </Box>
                {colorPickerOpen.secondary && (
                  <Box sx={{ mt: 2, mb: 3 }}>
                    <CompactPicker
                      color={settings.branding.secondaryColor}
                      onChange={(color) => handleColorChange('branding', 'secondaryColor', color)}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Accent Color
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 1,
                      bgcolor: settings.branding.accentColor,
                      mr: 2,
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                    onClick={() => toggleColorPicker('accent')}
                  />
                  <TextField
                    value={settings.branding.accentColor}
                    size="small"
                    sx={{ flexGrow: 1 }}
                    InputProps={{
                      endAdornment: (
                        <IconButton size="small" onClick={() => toggleColorPicker('accent')}>
                          <ColorLensIcon fontSize="small" />
                        </IconButton>
                      )
                    }}
                  />
                </Box>
                {colorPickerOpen.accent && (
                  <Box sx={{ mt: 2, mb: 3 }}>
                    <CompactPicker
                      color={settings.branding.accentColor}
                      onChange={(color) => handleColorChange('branding', 'accentColor', color)}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              These colors will be used throughout your website for buttons, links, backgrounds, and other UI elements.
            </Typography>
          </Box>
        </Paper>
      )}
      
      {/* Footer Configuration Tab */}
      {activeTab === 2 && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2
          }}
        >
          <Typography variant="h6" gutterBottom>
            Footer Configuration
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Customize the content and appearance of your website footer
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Copyright Text"
                fullWidth
                value={settings.footer.copyrightText}
                onChange={(e) => handleSettingChange('footer', 'copyrightText', e.target.value)}
                helperText="Text displayed at the bottom of the footer"
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.footer.showSocialLinks}
                    onChange={(e) => handleSettingChange('footer', 'showSocialLinks', e.target.checked)}
                  />
                }
                label="Show Social Links"
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.footer.showQuickLinks}
                    onChange={(e) => handleSettingChange('footer', 'showQuickLinks', e.target.checked)}
                  />
                }
                label="Show Quick Links"
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.footer.showContactInfo}
                    onChange={(e) => handleSettingChange('footer', 'showContactInfo', e.target.checked)}
                  />
                }
                label="Show Contact Info"
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.footer.showNewsletter}
                    onChange={(e) => handleSettingChange('footer', 'showNewsletter', e.target.checked)}
                  />
                }
                label="Show Newsletter"
              />
            </Grid>
          </Grid>
          
          <Divider sx={{ my: 4 }} />
          
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Links displayed in the footer for easy navigation
          </Typography>
          
          <List
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              mb: 3,
              '& .MuiListItem-root': {
                borderBottom: '1px solid',
                borderColor: 'divider',
                '&:last-child': {
                  borderBottom: 'none'
                }
              }
            }}
          >
            {settings.footer.quickLinks.map((link) => (
              <ListItem key={link.id}>
                <ListItemText
                  primary={link.text}
                  secondary={link.url}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveQuickLink(link.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              label="Link Text"
              value={newQuickLink.text}
              onChange={(e) => setNewQuickLink({ ...newQuickLink, text: e.target.value })}
              sx={{ flexGrow: 1 }}
            />
            <TextField
              label="URL"
              value={newQuickLink.url}
              onChange={(e) => setNewQuickLink({ ...newQuickLink, url: e.target.value })}
              sx={{ flexGrow: 1 }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddQuickLink}
              disabled={!newQuickLink.text || !newQuickLink.url}
            >
              Add
            </Button>
          </Box>
        </Paper>
      )}
      
      {/* Social Media Tab */}
      {activeTab === 3 && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2
          }}
        >
          <Typography variant="h6" gutterBottom>
            Social Media Links
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Connect your website to your social media profiles
          </Typography>
          
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {settings.socialMedia.map((social) => {
              const Icon = social.icon;
              
              return (
                <Grid item key={social.id} xs={12} sm={6} md={4}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        mr: 2
                      }}
                    >
                      <Icon />
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
                        {social.platform}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {social.url}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveSocialLink(social.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              label="Platform"
              placeholder="e.g. Twitter, Instagram"
              value={newSocialLink.platform}
              onChange={(e) => setNewSocialLink({ ...newSocialLink, platform: e.target.value })}
              sx={{ flexGrow: 1 }}
            />
            <TextField
              label="URL"
              placeholder="https://..."
              value={newSocialLink.url}
              onChange={(e) => setNewSocialLink({ ...newSocialLink, url: e.target.value })}
              sx={{ flexGrow: 2 }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddSocialLink}
              disabled={!newSocialLink.platform || !newSocialLink.url}
            >
              Add
            </Button>
          </Box>
          
          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Your social media profiles will be displayed in the website footer and on relevant pages.
              Make sure to use complete URLs including the https:// prefix.
            </Typography>
          </Box>
        </Paper>
      )}
      
      {/* Cookie Consent Tab */}
      {activeTab === 4 && (
        <Paper
          elevation={0}
          sx={{
            p: 3,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2
          }}
        >
          <Typography variant="h6" gutterBottom>
            Cookie Consent Configuration
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Customize the cookie consent banner shown to new visitors
          </Typography>
          
          <FormControlLabel
            control={
              <Switch
                checked={settings.cookieConsent.enabled}
                onChange={(e) => handleSettingChange('cookieConsent', 'enabled', e.target.checked)}
              />
            }
            label="Enable Cookie Consent Banner"
            sx={{ mb: 3 }}
          />
          
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                label="Consent Message"
                fullWidth
                multiline
                rows={3}
                value={settings.cookieConsent.message}
                onChange={(e) => handleSettingChange('cookieConsent', 'message', e.target.value)}
                disabled={!settings.cookieConsent.enabled}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Button Text"
                fullWidth
                value={settings.cookieConsent.buttonText}
                onChange={(e) => handleSettingChange('cookieConsent', 'buttonText', e.target.value)}
                disabled={!settings.cookieConsent.enabled}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Privacy Link Text"
                fullWidth
                value={settings.cookieConsent.privacyLinkText}
                onChange={(e) => handleSettingChange('cookieConsent', 'privacyLinkText', e.target.value)}
                disabled={!settings.cookieConsent.enabled}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Privacy Policy URL"
                fullWidth
                value={settings.cookieConsent.privacyLinkUrl}
                onChange={(e) => handleSettingChange('cookieConsent', 'privacyLinkUrl', e.target.value)}
                disabled={!settings.cookieConsent.enabled}
              />
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4, p: 3, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="subtitle1" gutterBottom>
              Cookie Consent Preview
            </Typography>
            
            <Paper
              elevation={3}
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'stretch', sm: 'center' },
                justifyContent: 'space-between',
                gap: 2,
                opacity: settings.cookieConsent.enabled ? 1 : 0.5
              }}
            >
              <Typography variant="body2">
                {settings.cookieConsent.message}
                {' '}
                <Link 
                  href={settings.cookieConsent.privacyLinkUrl} 
                  sx={{ color: 'primary.main' }}
                >
                  {settings.cookieConsent.privacyLinkText}
                </Link>
              </Typography>
              
              <Button variant="contained" size="small" sx={{ whiteSpace: 'nowrap' }}>
                {settings.cookieConsent.buttonText}
              </Button>
            </Paper>
          </Box>
        </Paper>
      )}
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
          onClick={handleSaveSettings}
          disabled={saving}
          size="large"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </Box>
    </Container>
  );
};

export default GlobalSettings;
