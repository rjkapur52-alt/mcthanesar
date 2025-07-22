'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '../../../components/admin/AdminHeader';
import AdminSidebar from '../../../components/admin/AdminSidebar';

interface FormItem {
  id: number;
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  fileSize: string;
  downloads: number;
  status: 'active' | 'inactive';
  uploadDate: string;
}

export default function FormsManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [forms, setForms] = useState<FormItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingForm, setEditingForm] = useState<FormItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'certificates',
    fileUrl: '',
    fileSize: '',
    status: 'active' as 'active' | 'inactive'
  });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const router = useRouter();

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'certificates', label: 'Certificates' },
    { value: 'licenses', label: 'Licenses & Permits' },
    { value: 'applications', label: 'Applications' },
    { value: 'tax', label: 'Tax Forms' },
    { value: 'property', label: 'Property Related' },
    { value: 'complaints', label: 'Complaints' }
  ];

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin');
    } else {
      // Load sample forms data
      setForms([
        {
          id: 1,
          title: 'Birth Certificate Application',
          description: 'Form to apply for birth certificate from municipal records',
          category: 'certificates',
          fileUrl: 'birth-certificate-form.pdf',
          fileSize: '245 KB',
          downloads: 156,
          status: 'active',
          uploadDate: '2024-01-15'
        },
        {
          id: 2,
          title: 'Death Certificate Application',
          description: 'Form to apply for death certificate from municipal records',
          category: 'certificates',
          fileUrl: 'death-certificate-form.pdf',
          fileSize: '238 KB',
          downloads: 89,
          status: 'active',
          uploadDate: '2024-01-15'
        },
        {
          id: 3,
          title: 'Shop License Application',
          description: 'Application form for new shop/business license',
          category: 'licenses',
          fileUrl: 'shop-license-form.pdf',
          fileSize: '312 KB',
          downloads: 234,
          status: 'active',
          uploadDate: '2024-01-12'
        },
        {
          id: 4,
          title: 'Property Tax Assessment',
          description: 'Form for property tax assessment and payment',
          category: 'tax',
          fileUrl: 'property-tax-form.pdf',
          fileSize: '289 KB',
          downloads: 445,
          status: 'active',
          uploadDate: '2024-01-10'
        },
        {
          id: 5,
          title: 'Water Connection Application',
          description: 'Form to apply for new water connection',
          category: 'applications',
          fileUrl: 'water-connection-form.pdf',
          fileSize: '267 KB',
          downloads: 178,
          status: 'active',
          uploadDate: '2024-01-08'
        },
        {
          id: 6,
          title: 'Public Grievance Form',
          description: 'Form to register public complaints and grievances',
          category: 'complaints',
          fileUrl: 'grievance-form.pdf',
          fileSize: '198 KB',
          downloads: 67,
          status: 'active',
          uploadDate: '2024-01-05'
        }
      ]);
      setIsLoading(false);
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingForm) {
      // Update existing form
      setForms(forms.map(form => 
        form.id === editingForm.id 
          ? { 
              ...form, 
              ...formData, 
              uploadDate: new Date().toISOString().split('T')[0],
              downloads: form.downloads // Keep existing download count
            }
          : form
      ));
      setEditingForm(null);
    } else {
      // Add new form
      const newForm: FormItem = {
        id: Math.max(...forms.map(f => f.id), 0) + 1,
        ...formData,
        downloads: 0,
        uploadDate: new Date().toISOString().split('T')[0]
      };
      setForms([newForm, ...forms]);
    }

    setFormData({
      title: '',
      description: '',
      category: 'certificates',
      fileUrl: '',
      fileSize: '',
      status: 'active'
    });
    setShowAddForm(false);
  };

  const handleEdit = (form: FormItem) => {
    setEditingForm(form);
    setFormData({
      title: form.title,
      description: form.description,
      category: form.category,
      fileUrl: form.fileUrl,
      fileSize: form.fileSize,
      status: form.status
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this form?')) {
      setForms(forms.filter(form => form.id !== id));
    }
  };

  const toggleStatus = (id: number) => {
    setForms(forms.map(form => 
      form.id === id 
        ? { ...form, status: form.status === 'active' ? 'inactive' : 'active' }
        : form
    ));
  };

  const filteredForms = selectedCategory === 'all' 
    ? forms 
    : forms.filter(form => form.category === selectedCategory);

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
              <h1 className="text-3xl font-bold text-gray-900">Forms Management</h1>
              <p className="text-gray-600 mt-2">Manage downloadable forms and documents</p>
            </div>
            <button
              onClick={() => {
                setShowAddForm(true);
                setEditingForm(null);
                setFormData({
                  title: '',
                  description: '',
                  category: 'certificates',
                  fileUrl: '',
                  fileSize: '',
                  status: 'active'
                });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center cursor-pointer whitespace-nowrap"
            >
              <i className="ri-add-line mr-2"></i>
              Add Form
            </button>
          </div>

          {/* Add/Edit Form */}
          {showAddForm && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {editingForm ? 'Edit Form' : 'Add New Form'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Form Title
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Enter form title"
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
                    placeholder="Enter form description"
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      File URL/Name
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={formData.fileUrl}
                      onChange={(e) => setFormData({...formData, fileUrl: e.target.value})}
                      placeholder="form-document.pdf"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      File Size
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={formData.fileSize}
                      onChange={(e) => setFormData({...formData, fileSize: e.target.value})}
                      placeholder="e.g., 245 KB"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <div className="relative">
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})}
                        className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none"
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
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {editingForm ? 'Update Form' : 'Add Form'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingForm(null);
                      setFormData({
                        title: '',
                        description: '',
                        category: 'certificates',
                        fileUrl: '',
                        fileSize: '',
                        status: 'active'
                      });
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
                  {cat.label} {cat.value !== 'all' && `(${forms.filter(form => form.category === cat.value).length})`}
                </button>
              ))}
            </div>
          </div>

          {/* Forms List */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">All Forms ({filteredForms.length})</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredForms.map((form) => (
                <div key={form.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{form.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          form.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {form.status}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                          {categories.find(cat => cat.value === form.category)?.label}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{form.description}</p>
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center">
                          <i className="ri-file-text-line mr-1"></i>
                          <span>{form.fileUrl}</span>
                        </div>
                        <div className="flex items-center">
                          <i className="ri-file-line mr-1"></i>
                          <span>{form.fileSize}</span>
                        </div>
                        <div className="flex items-center">
                          <i className="ri-download-line mr-1"></i>
                          <span>{form.downloads} downloads</span>
                        </div>
                        <div className="flex items-center">
                          <i className="ri-calendar-line mr-1"></i>
                          <span>Uploaded: {form.uploadDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => toggleStatus(form.id)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                          form.status === 'active'
                            ? 'bg-red-100 text-red-800 hover:bg-red-200'
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                        }`}
                      >
                        {form.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleEdit(form)}
                        className="px-3 py-2 bg-blue-100 text-blue-800 hover:bg-blue-200 text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(form.id)}
                        className="px-3 py-2 bg-red-100 text-red-800 hover:bg-red-200 text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filteredForms.length === 0 && (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <i className="ri-file-text-line text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No forms found</h3>
              <p className="text-gray-600">Add some forms to get started with document management.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
