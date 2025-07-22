'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '../../../components/admin/AdminHeader';
import AdminSidebar from '../../../components/admin/AdminSidebar';

interface PageContent {
  id: string;
  title: string;
  content: string;
  lastModified: string;
}

export default function PageContentManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [pages, setPages] = useState<PageContent[]>([]);
  const [editingPage, setEditingPage] = useState<PageContent | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin');
    } else {
      // Load sample page content
      setPages([
        {
          id: 'about',
          title: 'About Us',
          content: 'Municipal Council Thanesar is committed to serving the citizens with dedication and transparency. We work towards creating a cleaner, safer, and more prosperous community for all residents. Our council comprises elected representatives who work tirelessly to address civic issues and implement development projects.',
          lastModified: '2024-01-15'
        },
        {
          id: 'chairman',
          title: "Chairman's Desk",
          content: 'Welcome to Municipal Council Thanesar. As the Chairman, I am committed to ensuring transparent governance and sustainable development for our city. Our focus remains on improving infrastructure, maintaining cleanliness, and providing quality services to all citizens. Together, we are building a better tomorrow for Thanesar.',
          lastModified: '2024-01-12'
        },
        {
          id: 'rti',
          title: 'Right to Information (RTI)',
          content: 'The Right to Information Act, 2005 empowers citizens to seek information from public authorities. Municipal Council Thanesar is committed to transparency and provides all necessary information as per RTI guidelines. Citizens can submit RTI applications during office hours. Processing time is 30 days for normal applications.',
          lastModified: '2024-01-10'
        },
        {
          id: 'contact',
          title: 'Contact Information',
          content: 'Municipal Council Office\nThanesar, Kurukshetra\nHaryana, India - 136118\n\nPhone: +91-1744-123456\nEmail: info@mcthanesar.gov.in\n\nOffice Hours:\nMonday - Friday: 9:00 AM - 5:00 PM\nSaturday: 9:00 AM - 1:00 PM\nSunday: Closed',
          lastModified: '2024-01-08'
        }
      ]);
      setIsLoading(false);
    }
  }, [router]);

  const handleEdit = (page: PageContent) => {
    setEditingPage(page);
    setFormData({
      title: page.title,
      content: page.content
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPage) {
      setPages(pages.map(page => 
        page.id === editingPage.id 
          ? { 
              ...page, 
              title: formData.title,
              content: formData.content,
              lastModified: new Date().toISOString().split('T')[0]
            }
          : page
      ));
      setEditingPage(null);
      setFormData({ title: '', content: '' });
    }
  };

  const handleCancel = () => {
    setEditingPage(null);
    setFormData({ title: '', content: '' });
  };

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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Page Content Management</h1>
            <p className="text-gray-600 mt-2">Edit content for website pages</p>
          </div>

          {/* Edit Form */}
          {editingPage && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Edit Page Content</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Title
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter page title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Content
                  </label>
                  <textarea
                    required
                    rows={8}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    placeholder="Enter page content"
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.content.length}/500 characters</p>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Update Content
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Pages List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pages.map((page) => (
              <div key={page.id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{page.title}</h3>
                    <p className="text-sm text-gray-500">Last modified: {page.lastModified}</p>
                  </div>
                  <button
                    onClick={() => handleEdit(page)}
                    className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-edit-line mr-1"></i>
                    Edit
                  </button>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                    {page.content.length > 200 
                      ? `${page.content.substring(0, 200)}...` 
                      : page.content
                    }
                  </p>
                </div>

                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <i className="ri-file-text-line mr-2"></i>
                  <span>{page.content.length} characters</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}