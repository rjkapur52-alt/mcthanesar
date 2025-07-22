'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '../../../components/admin/AdminHeader';
import AdminSidebar from '../../../components/admin/AdminSidebar';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
}

export default function GalleryManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: 'projects'
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const router = useRouter();

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'projects', label: 'Projects' },
    { value: 'events', label: 'Events' },
    { value: 'meetings', label: 'Meetings' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'community', label: 'Community' }
  ];

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin');
    } else {
      // Load sample gallery data
      setGalleryItems([
        {
          id: 1,
          title: 'Waste Management System Launch',
          description: 'New waste collection vehicles deployed in Ward 5',
          imageUrl: 'https://readdy.ai/api/search-image?query=modern%20waste%20management%20trucks%20with%20workers%20in%20municipal%20uniform%20launching%20new%20service&width=400&height=300&seq=gallery-1&orientation=landscape',
          category: 'projects',
          date: '2024-01-15'
        },
        {
          id: 2,
          title: 'Water Pipeline Installation',
          description: 'New water supply lines being installed in residential areas',
          imageUrl: 'https://readdy.ai/api/search-image?query=municipal%20workers%20installing%20water%20pipeline%20underground%20with%20heavy%20machinery%20in%20urban%20setting&width=400&height=300&seq=gallery-2&orientation=landscape',
          category: 'infrastructure',
          date: '2024-01-12'
        },
        {
          id: 3,
          title: 'Community Health Camp',
          description: 'Free health checkup camp organized for senior citizens',
          imageUrl: 'https://readdy.ai/api/search-image?query=community%20health%20camp%20with%20doctors%20examining%20elderly%20patients%20in%20municipal%20hall%20setting&width=400&height=300&seq=gallery-3&orientation=landscape',
          category: 'community',
          date: '2024-01-10'
        },
        {
          id: 4,
          title: 'Municipal Council Meeting',
          description: 'Monthly council meeting discussing development projects',
          imageUrl: 'https://readdy.ai/api/search-image?query=municipal%20council%20meeting%20with%20officials%20sitting%20around%20conference%20table%20in%20government%20office&width=400&height=300&seq=gallery-4&orientation=landscape',
          category: 'meetings',
          date: '2024-01-08'
        },
        {
          id: 5,
          title: 'Road Construction Progress',
          description: 'Main Market Road reconstruction showing significant progress',
          imageUrl: 'https://readdy.ai/api/search-image?query=road%20construction%20work%20in%20progress%20with%20heavy%20machinery%20and%20workers%20building%20urban%20street%20infrastructure&width=400&height=300&seq=gallery-5&orientation=landscape',
          category: 'infrastructure',
          date: '2024-01-05'
        },
        {
          id: 6,
          title: 'Annual Festival Celebration',
          description: 'Municipal organized cultural festival at community center',
          imageUrl: 'https://readdy.ai/api/search-image?query=colorful%20municipal%20festival%20celebration%20with%20people%20dancing%20and%20cultural%20programs%20in%20community%20center&width=400&height=300&seq=gallery-6&orientation=landscape',
          category: 'events',
          date: '2024-01-01'
        }
      ]);
      setIsLoading(false);
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      // Update existing item
      setGalleryItems(galleryItems.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData, date: new Date().toISOString().split('T')[0] }
          : item
      ));
      setEditingItem(null);
    } else {
      // Add new item
      const newItem: GalleryItem = {
        id: Math.max(...galleryItems.map(i => i.id), 0) + 1,
        ...formData,
        date: new Date().toISOString().split('T')[0]
      };
      setGalleryItems([newItem, ...galleryItems]);
    }
    
    setFormData({ title: '', description: '', imageUrl: '', category: 'projects' });
    setShowAddForm(false);
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      category: item.category
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this gallery item?')) {
      setGalleryItems(galleryItems.filter(item => item.id !== id));
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
              <p className="text-gray-600 mt-2">Manage photos and media content</p>
            </div>
            <button
              onClick={() => {
                setShowAddForm(true);
                setEditingItem(null);
                setFormData({ title: '', description: '', imageUrl: '', category: 'projects' });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center cursor-pointer whitespace-nowrap"
            >
              <i className="ri-add-line mr-2"></i>
              Add Photo
            </button>
          </div>

          {/* Add/Edit Form */}
          {showAddForm && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {editingItem ? 'Edit Photo' : 'Add New Photo'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter photo title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    required
                    rows={3}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Enter photo description"
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    placeholder="Enter image URL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <div className="relative">
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none"
                    >
                      {categories.slice(1).map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                    <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {editingItem ? 'Update Photo' : 'Add Photo'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingItem(null);
                      setFormData({ title: '', description: '', imageUrl: '', category: 'projects' });
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {cat.label} {cat.value !== 'all' && `(${galleryItems.filter(item => item.category === cat.value).length})`}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-48 object-cover object-top"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {categories.find(cat => cat.value === item.category)?.label}
                    </span>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 bg-red-100 text-red-800 hover:bg-red-200 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <i className="ri-image-line text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No photos found</h3>
              <p className="text-gray-600">Add some photos to get started with your gallery.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}