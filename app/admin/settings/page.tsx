
'use client';

import { useState } from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';

interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  postName: string;
  status: 'active' | 'inactive';
  createdDate: string;
}

interface WebsiteComponent {
  id: string;
  name: string;
  type: 'header' | 'footer' | 'navbar' | 'page' | 'section';
  status: 'active' | 'inactive';
  lastModified: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'City Municipal Corporation',
    siteTagline: 'Serving Our Community with Excellence',
    siteDescription: 'Official website of the City Municipal Corporation providing civic services, news updates, and community information.',
    contactEmail: 'info@citymunicipal.gov',
    contactPhone: '+1 (555) 123-4567',
    address: '123 City Hall Street, Downtown City, State 12345',
    workingHours: 'Monday - Friday: 9:00 AM - 5:00 PM',
    socialMedia: {
      facebook: 'https://facebook.com/citymunicipal',
      twitter: 'https://twitter.com/citymunicipal',
      youtube: 'https://youtube.com/citymunicipal',
      instagram: 'https://instagram.com/citymunicipal'
    },
    notifications: {
      emailNotifications: true,
      smsAlerts: false,
      maintenanceMode: false,
      newsAutoPublish: true
    },
    appearance: {
      primaryColor: '#3B82F6',
      secondaryColor: '#1E40AF',
      logoUrl: '/logo.png',
      faviconUrl: '/favicon.ico'
    }
  });

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      username: 'admin',
      email: 'admin@citymunicipal.gov',
      role: 'admin',
      postName: 'System Administrator',
      status: 'active',
      createdDate: '2024-01-15'
    },
    {
      id: 2,
      username: 'manager',
      email: 'manager@citymunicipal.gov',
      role: 'user',
      postName: 'Municipal Manager',
      status: 'active',
      createdDate: '2024-01-10'
    }
  ]);

  const [websiteComponents, setWebsiteComponents] = useState<WebsiteComponent[]>([
    { id: 'header', name: 'Main Header', type: 'header', status: 'active', lastModified: '2024-01-15' },
    { id: 'footer', name: 'Main Footer', type: 'footer', status: 'active', lastModified: '2024-01-15' },
    { id: 'navbar', name: 'Navigation Bar', type: 'navbar', status: 'active', lastModified: '2024-01-14' },
    { id: 'home', name: 'Home Page', type: 'page', status: 'active', lastModified: '2024-01-13' },
    { id: 'about', name: 'About Us Page', type: 'page', status: 'active', lastModified: '2024-01-12' },
    { id: 'contact', name: 'Contact Page', type: 'page', status: 'active', lastModified: '2024-01-11' },
    { id: 'news-section', name: 'News Section', type: 'section', status: 'active', lastModified: '2024-01-10' }
  ]);

  const [activeTab, setActiveTab] = useState('general');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userFormData, setUserFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'user' as 'admin' | 'user',
    postName: '',
    status: 'active' as 'active' | 'inactive'
  });

  const handleInputChange = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: typeof prev[section as keyof typeof prev] === 'object' 
        ? { ...prev[section as keyof typeof prev], [field]: value }
        : value
    }));
  };

  const handleSave = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();  
    
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...userFormData, password: undefined }
          : user
      ));
      setEditingUser(null);
    } else {
      const newUser: User = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        username: userFormData.username,
        email: userFormData.email,
        role: userFormData.role,
        postName: userFormData.postName,
        status: userFormData.status,
        createdDate: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
    }
    
    setUserFormData({
      username: '',
      password: '',
      email: '',
      role: 'user',
      postName: '',
      status: 'active'
    });
    setShowUserForm(false);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setUserFormData({
      username: user.username,
      password: '',
      email: user.email,
      role: user.role,
      postName: user.postName,
      status: user.status
    });
    setShowUserForm(true);
  };

  const handleDeleteUser = (id: number) => {
    if (id === 1) {
      alert('Cannot delete the main admin account');
      return;
    }
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const toggleUserStatus = (id: number) => {
    if (id === 1) {
      alert('Cannot deactivate the main admin account');
      return;
    }
    setUsers(users.map(user => 
      user.id === id 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const toggleComponentStatus = (id: string) => {
    setWebsiteComponents(components => 
      components.map(comp => 
        comp.id === id 
          ? { ...comp, status: comp.status === 'active' ? 'inactive' : 'active' }
          : comp
      )
    );
  };

  const handleDeleteComponent = (id: string) => {
    if (['header', 'footer', 'navbar'].includes(id)) {
      if (!confirm('Warning: Deleting core components may break the website. Are you sure?')) {
        return;
      }
    }
    if (confirm('Are you sure you want to delete this component?')) {
      setWebsiteComponents(components => components.filter(comp => comp.id !== id));
    }
  };

  const tabs = [
    { id: 'general', name: 'General', icon: 'ri-settings-line' },
    { id: 'contact', name: 'Contact Info', icon: 'ri-contacts-line' },
    { id: 'social', name: 'Social Media', icon: 'ri-share-line' },
    { id: 'notifications', name: 'Notifications', icon: 'ri-notification-line' },
    { id: 'appearance', name: 'Appearance', icon: 'ri-palette-line' },
    { id: 'users', name: 'User Management', icon: 'ri-team-line' },
    { id: 'components', name: 'Website Components', icon: 'ri-layout-line' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Website Settings</h1>
            <p className="text-gray-600">Configure your website preferences and settings</p>
          </div>

          {showSuccessMessage && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center">
              <i className="ri-check-circle-line mr-2"></i>
              Settings saved successfully!
            </div>
          )}

          <div className="bg-white rounded-lg shadow-sm">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer flex items-center ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <i className={`${tab.icon} mr-2`}></i>
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => handleInputChange('siteName', '', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Tagline
                    </label>
                    <input
                      type="text"
                      value={settings.siteTagline}
                      onChange={(e) => handleInputChange('siteTagline', '', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Site Description
                    </label>
                    <textarea
                      value={settings.siteDescription}
                      onChange={(e) => handleInputChange('siteDescription', '', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => handleInputChange('contactEmail', '', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      value={settings.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', '', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Office Address
                    </label>
                    <textarea
                      value={settings.address}
                      onChange={(e) => handleInputChange('address', '', e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Working Hours
                    </label>
                    <input
                      type="text"
                      value={settings.workingHours}
                      onChange={(e) => handleInputChange('workingHours', '', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'social' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="ri-facebook-fill text-blue-600 mr-2"></i>
                      Facebook URL
                    </label>
                    <input
                      type="url"
                      value={settings.socialMedia.facebook}
                      onChange={(e) => handleInputChange('socialMedia', 'facebook', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="ri-twitter-fill text-blue-400 mr-2"></i>
                      Twitter URL
                    </label>
                    <input
                      type="url"
                      value={settings.socialMedia.twitter}
                      onChange={(e) => handleInputChange('socialMedia', 'twitter', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="ri-youtube-fill text-red-600 mr-2"></i>
                      YouTube URL
                    </label>
                    <input
                      type="url"
                      value={settings.socialMedia.youtube}
                      onChange={(e) => handleInputChange('socialMedia', 'youtube', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <i className="ri-instagram-fill text-pink-600 mr-2"></i>
                      Instagram URL
                    </label>
                    <input
                      type="url"
                      value={settings.socialMedia.instagram}
                      onChange={(e) => handleInputChange('socialMedia', 'instagram', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                      <p className="text-sm text-gray-500">Receive email alerts for important updates</p>
                    </div>
                    <button
                      onClick={() => handleInputChange('notifications', 'emailNotifications', !settings.notifications.emailNotifications)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${
                        settings.notifications.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.notifications.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">SMS Alerts</h3>
                      <p className="text-sm text-gray-500">Receive SMS notifications for urgent matters</p>
                    </div>
                    <button
                      onClick={() => handleInputChange('notifications', 'smsAlerts', !settings.notifications.smsAlerts)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${
                        settings.notifications.smsAlerts ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.notifications.smsAlerts ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Maintenance Mode</h3>
                      <p className="text-sm text-gray-500">Put website in maintenance mode</p>
                    </div>
                    <button
                      onClick={() => handleInputChange('notifications', 'maintenanceMode', !settings.notifications.maintenanceMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${
                        settings.notifications.maintenanceMode ? 'bg-red-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.notifications.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Auto-publish News</h3>
                      <p className="text-sm text-gray-500">Automatically publish approved news articles</p>
                    </div>
                    <button
                      onClick={() => handleInputChange('notifications', 'newsAutoPublish', !settings.notifications.newsAutoPublish)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${
                        settings.notifications.newsAutoPublish ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.notifications.newsAutoPublish ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Color
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={settings.appearance.primaryColor}
                        onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                        className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.appearance.primaryColor}
                        onChange={(e) => handleInputChange('appearance', 'primaryColor', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Secondary Color
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={settings.appearance.secondaryColor}
                        onChange={(e) => handleInputChange('appearance', 'secondaryColor', e.target.value)}
                        className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={settings.appearance.secondaryColor}
                        onChange={(e) => handleInputChange('appearance', 'secondaryColor', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Logo URL
                    </label>
                    <input
                      type="url"
                      value={settings.appearance.logoUrl}
                      onChange={(e) => handleInputChange('appearance', 'logoUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Favicon URL
                    </label>
                    <input
                      type="url"
                      value={settings.appearance.faviconUrl}
                      onChange={(e) => handleInputChange('appearance', 'faviconUrl', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                    <button
                      onClick={() => {
                        setShowUserForm(true);
                        setEditingUser(null);
                        setUserFormData({
                          username: '',
                          password: '',
                          email: '',
                          role: 'user',
                          postName: '',
                          status: 'active'
                        });
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap flex items-center"
                    >
                      <i className="ri-add-line mr-2"></i>
                      Add User
                    </button>
                  </div>

                  {showUserForm && (
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <h4 className="text-lg font-semibold mb-4">
                        {editingUser ? 'Edit User' : 'Add New User'}
                      </h4>
                      <form onSubmit={handleUserSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Username
                            </label>
                            <input
                              type="text"
                              required
                              value={userFormData.username}
                              onChange={(e) => setUserFormData({ ...userFormData, username: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter username"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Password {editingUser && '(Leave blank to keep current)'}
                            </label>
                            <input
                              type="password"
                              required={!editingUser}
                              value={userFormData.password}
                              onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter password"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email
                            </label>
                            <input
                              type="email"
                              required
                              value={userFormData.email}
                              onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter email"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Role
                            </label>
                            <div className="relative">
                              <select
                                value={userFormData.role}
                                onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value as 'admin' | 'user' })}
                                className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                              >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                              </select>
                              <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Post Name
                            </label>
                            <input
                              type="text"
                              required
                              value={userFormData.postName}
                              onChange={(e) => setUserFormData({ ...userFormData, postName: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="e.g., Municipal Manager, Clerk, etc."
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Status
                            </label>
                            <div className="relative">
                              <select
                                value={userFormData.status}
                                onChange={(e) => setUserFormData({ ...userFormData, status: e.target.value as 'active' | 'inactive' })}
                                className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                              >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                              </select>
                              <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-4">
                          <button
                            type="submit"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap"
                          >
                            {editingUser ? 'Update User' : 'Create User'}
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowUserForm(false)}
                            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors cursor-pointer whitespace-nowrap"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  <div className="bg-white border rounded-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h4 className="text-lg font-semibold">All Users ({users.length})</h4>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {users.map((user) => (
                        <div key={user.id} className="px-6 py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h5 className="font-semibold text-gray-900">{user.username}</h5>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  user.role === 'admin' 
                                    ? 'bg-red-100 text-red-800' 
                                    : 'bg-blue-100 text-blue-800'
                                }`}>
                                  {user.role.toUpperCase()}
                                </span>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  user.status === 'active' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {user.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{user.email}</p>
                              <p className="text-sm text-gray-600">{user.postName}</p>
                              <p className="text-xs text-gray-500">Created: {user.createdDate}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => toggleUserStatus(user.id)}
                                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                                  user.status === 'active'
                                    ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                    : 'bg-green-100 text-green-800 hover:bg-green-200'
                                }`}
                                disabled={user.id === 1}
                              >
                                {user.status === 'active' ? 'Deactivate' : 'Activate'}
                              </button>
                              <button
                                onClick={() => handleEditUser(user)}
                                className="px-3 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="px-3 py-1 bg-red-100 text-red-800 hover:bg-red-200 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                                disabled={user.id === 1}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'components' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Website Components Management</h3>
                    <p className="text-sm text-gray-600">Control website components and pages</p>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <i className="ri-warning-line text-yellow-600 mr-2"></i>
                      <p className="text-sm text-yellow-800">
                        <strong>Warning:</strong> Disabling or deleting core components (Header, Footer, Navigation) may break the website functionality.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {websiteComponents.map((component) => (
                      <div key={component.id} className="bg-white border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <i className={`${component.type === 'header' ? 'ri-layout-top-line' :
                              component.type === 'footer' ? 'ri-layout-bottom-line' :
                              component.type === 'navbar' ? 'ri-menu-line' :
                              component.type === 'page' ? 'ri-file-line' :
                              'ri-layout-line'} text-blue-600`}></i>
                            <h4 className="font-semibold text-gray-900">{component.name}</h4>
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            component.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {component.status}
                          </span>
                        </div>

                        <div className="text-sm text-gray-600 mb-3">
                          <p>Type: {component.type}</p>
                          <p>Last modified: {component.lastModified}</p>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => toggleComponentStatus(component.id)}
                            className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                              component.status === 'active'
                                ? 'bg-red-100 text-red-800 hover:bg-red-200'
                                : 'bg-green-100 text-green-800 hover:bg-green-200'
                            }`}
                          >
                            {component.status === 'active' ? 'Disable' : 'Enable'}
                          </button>
                          <button
                            onClick={() => handleDeleteComponent(component.id)}
                            className="flex-1 px-3 py-2 bg-red-100 text-red-800 hover:bg-red-200 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Component Types:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li><strong>Header:</strong> Top navigation and branding area</li>
                      <li><strong>Footer:</strong> Bottom section with links and information</li>
                      <li><strong>Navbar:</strong> Main navigation menu</li>
                      <li><strong>Page:</strong> Individual website pages</li>
                      <li><strong>Section:</strong> Page sections and modules</li>
                    </ul>
                  </div>
                </div>
              )}

              {['general', 'contact', 'social', 'notifications', 'appearance'].includes(activeTab) && (
                <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap flex items-center"
                  >
                    <i className="ri-save-line mr-2"></i>
                    Save Settings
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
