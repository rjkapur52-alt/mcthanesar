'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '../../../components/admin/AdminHeader';
import AdminSidebar from '../../../components/admin/AdminSidebar';

interface TenderItem {
  id: number;
  title: string;
  description: string;
  publishDate: string;
  lastDate: string;
  status: 'active' | 'closed' | 'draft';
  tenderValue: string;
  department: string;
  documentUrl?: string;
}

export default function TenderManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [tenders, setTenders] = useState<TenderItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTender, setEditingTender] = useState<TenderItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lastDate: '',
    tenderValue: '',
    department: 'PWD',
    documentUrl: '',
    status: 'active' as 'active' | 'closed' | 'draft'
  });
  const [selectedStatus, setSelectedStatus] = useState('all');
  const router = useRouter();

  const departments = [
    { value: 'PWD', label: 'Public Works Department' },
    { value: 'Health', label: 'Health Department' },
    { value: 'Education', label: 'Education Department' },
    { value: 'Water', label: 'Water Supply Department' },
    { value: 'Sanitation', label: 'Sanitation Department' },
    { value: 'IT', label: 'IT Department' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'closed', label: 'Closed' },
    { value: 'draft', label: 'Draft' }
  ];

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin');
    } else {
      // Load sample tender data
      setTenders([
        {
          id: 1,
          title: 'Road Construction - Main Market Street',
          description: 'Construction and repair of Main Market Street including drainage system and street lights installation.',
          publishDate: '2024-01-15',
          lastDate: '2024-02-15',
          status: 'active',
          tenderValue: '₹25,00,000',
          department: 'PWD',
          documentUrl: 'tender-doc-001.pdf'
        },
        {
          id: 2,
          title: 'Water Supply Pipeline Extension',
          description: 'Extension of water supply pipeline to Ward 8 and 9 covering 200 households.',
          publishDate: '2024-01-12',
          lastDate: '2024-02-12',
          status: 'active',
          tenderValue: '₹18,50,000',
          department: 'Water',
          documentUrl: 'tender-doc-002.pdf'
        },
        {
          id: 3,
          title: 'Solid Waste Management System',
          description: 'Supply and installation of waste collection vehicles and equipment for municipal area.',
          publishDate: '2024-01-10',
          lastDate: '2024-01-25',
          status: 'closed',
          tenderValue: '₹45,00,000',
          department: 'Sanitation'
        },
        {
          id: 4,
          title: 'Municipal Building Renovation',
          description: 'Complete renovation of municipal council building including electrical and plumbing work.',
          publishDate: '2024-01-08',
          lastDate: '2024-02-08',
          status: 'draft',
          tenderValue: '₹12,75,000',
          department: 'PWD'
        }
      ]);
      setIsLoading(false);
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTender) {
      // Update existing tender
      setTenders(tenders.map(tender => 
        tender.id === editingTender.id 
          ? { 
              ...tender, 
              ...formData, 
              publishDate: new Date().toISOString().split('T')[0]
            }
          : tender
      ));
      setEditingTender(null);
    } else {
      // Add new tender
      const newTender: TenderItem = {
        id: Math.max(...tenders.map(t => t.id), 0) + 1,
        ...formData,
        publishDate: new Date().toISOString().split('T')[0]
      };
      setTenders([newTender, ...tenders]);
    }
    
    setFormData({
      title: '',
      description: '',
      lastDate: '',
      tenderValue: '',
      department: 'PWD',
      documentUrl: '',
      status: 'active'
    });
    setShowAddForm(false);
  };

  const handleEdit = (tender: TenderItem) => {
    setEditingTender(tender);
    setFormData({
      title: tender.title,
      description: tender.description,
      lastDate: tender.lastDate,
      tenderValue: tender.tenderValue,
      department: tender.department,
      documentUrl: tender.documentUrl || '',
      status: tender.status
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this tender?')) {
      setTenders(tenders.filter(tender => tender.id !== id));
    }
  };

  const toggleStatus = (id: number, newStatus: 'active' | 'closed' | 'draft') => {
    setTenders(tenders.map(tender => 
      tender.id === id ? { ...tender, status: newStatus } : tender
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-red-100 text-red-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTenders = selectedStatus === 'all' 
    ? tenders 
    : tenders.filter(tender => tender.status === selectedStatus);

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
              <h1 className="text-3xl font-bold text-gray-900">Tender Management</h1>
              <p className="text-gray-600 mt-2">Manage tender notices and procurement</p>
            </div>
            <button
              onClick={() => {
                setShowAddForm(true);
                setEditingTender(null);
                setFormData({
                  title: '',
                  description: '',
                  lastDate: '',
                  tenderValue: '',
                  department: 'PWD',
                  documentUrl: '',
                  status: 'active'
                });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center cursor-pointer whitespace-nowrap"
            >
              <i className="ri-add-line mr-2"></i>
              Add Tender
            </button>
          </div>

          {/* Add/Edit Form */}
          {showAddForm && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {editingTender ? 'Edit Tender' : 'Add New Tender'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tender Title
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="Enter tender title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <div className="relative">
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none"
                      >
                        {departments.map(dept => (
                          <option key={dept.value} value={dept.value}>{dept.label}</option>
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
                    placeholder="Enter tender description"
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.description.length}/500 characters</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Date
                    </label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={formData.lastDate}
                      onChange={(e) => setFormData({...formData, lastDate: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tender Value
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={formData.tenderValue}
                      onChange={(e) => setFormData({...formData, tenderValue: e.target.value})}
                      placeholder="e.g., ₹25,00,000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <div className="relative">
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'closed' | 'draft'})}
                        className="w-full px-4 py-3 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none"
                      >
                        <option value="active">Active</option>
                        <option value="draft">Draft</option>
                        <option value="closed">Closed</option>
                      </select>
                      <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document URL (Optional)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    value={formData.documentUrl}
                    onChange={(e) => setFormData({...formData, documentUrl: e.target.value})}
                    placeholder="Enter document URL or filename"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {editingTender ? 'Update Tender' : 'Add Tender'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingTender(null);
                      setFormData({
                        title: '',
                        description: '',
                        lastDate: '',
                        tenderValue: '',
                        department: 'PWD',
                        documentUrl: '',
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

          {/* Status Filter */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {statusOptions.map(status => (
                <button
                  key={status.value}
                  onClick={() => setSelectedStatus(status.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    selectedStatus === status.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {status.label} {status.value !== 'all' && `(${tenders.filter(t => t.status === status.value).length})`}
                </button>
              ))}
            </div>
          </div>

          {/* Tenders List */}
          <div className="space-y-4">
            {filteredTenders.map((tender) => (
              <div key={tender.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{tender.title}</h3>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(tender.status)}`}>
                        {tender.status.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Department</p>
                        <p className="font-medium text-gray-900">{departments.find(d => d.value === tender.department)?.label}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Tender Value</p>
                        <p className="font-medium text-gray-900">{tender.tenderValue}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Published Date</p>
                        <p className="font-medium text-gray-900">{tender.publishDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Last Date</p>
                        <p className="font-medium text-gray-900">{tender.lastDate}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{tender.description}</p>
                    
                    {tender.documentUrl && (
                      <div className="flex items-center text-blue-600 mb-4">
                        <i className="ri-file-text-line mr-2"></i>
                        <span className="text-sm">{tender.documentUrl}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <div className="relative">
                      <button
                        onClick={() => {
                          const newStatus = tender.status === 'active' ? 'closed' : 'active';
                          toggleStatus(tender.id, newStatus);
                        }}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                          tender.status === 'active'
                            ? 'bg-red-100 text-red-800 hover:bg-red-200'
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                        }`}
                      >
                        {tender.status === 'active' ? 'Close' : 'Activate'}
                      </button>
                    </div>
                    <button
                      onClick={() => handleEdit(tender)}
                      className="px-3 py-2 bg-blue-100 text-blue-800 hover:bg-blue-200 text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(tender.id)}
                      className="px-3 py-2 bg-red-100 text-red-800 hover:bg-red-200 text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTenders.length === 0 && (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <i className="ri-notification-3-line text-4xl text-gray-400 mb-4"></i>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No tenders found</h3>
              <p className="text-gray-600">Add some tender notices to get started.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}