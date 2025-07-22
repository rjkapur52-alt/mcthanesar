'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '../../../components/admin/AdminHeader';
import AdminSidebar from '../../../components/admin/AdminSidebar';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  status: 'published' | 'draft';
  image?: string;
}

export default function NewsManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    status: 'published' as 'published' | 'draft'
  });
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin');
    } else {
      // Load sample news data
      setNewsList([
        {
          id: 1,
          title: 'New Waste Management System Launched',
          content: 'Advanced waste collection system launched in Ward 5 with door-to-door service for better cleanliness and hygiene.',
          date: '2024-01-15',
          status: 'published',
          image: 'https://readdy.ai/api/search-image?query=waste%20management%20trucks%20collecting%20garbage%20from%20residential%20area%20with%20workers%20in%20uniform&width=400&height=250&seq=news-1&orientation=landscape'
        },
        {
          id: 2,
          title: 'Water Supply Improvement Project',
          content: 'Enhanced water distribution network completed in Sectors 3 and 7, ensuring 24/7 water supply to residents.',
          date: '2024-01-12',
          status: 'published',
          image: 'https://readdy.ai/api/search-image?query=water%20supply%20pipeline%20construction%20workers%20installing%20new%20water%20pipes%20in%20urban%20area&width=400&height=250&seq=news-2&orientation=landscape'
        },
        {
          id: 3,
          title: 'Municipal Budget Meeting',
          content: 'Annual budget meeting scheduled for January 25, 2024. All ward representatives and citizens are invited to participate.',
          date: '2024-01-10',
          status: 'draft'
        }
      ]);
      setIsLoading(false);
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingNews) {
      // Update existing news
      setNewsList(newsList.map(news => 
        news.id === editingNews.id 
          ? { ...news, ...formData, date: new Date().toISOString().split('T')[0] }
          : news
      ));
      setEditingNews(null);
    } else {
      // Add new news
      const newNews: NewsItem = {
        id: Math.max(...newsList.map(n => n.id), 0) + 1,
        ...formData,
        date: new Date().toISOString().split('T')[0]
      };
      setNewsList([newNews, ...newsList]);
    }
    
    setFormData({ title: '', content: '', image: '', status: 'published' });
    setShowAddForm(false);
  };

  const handleEdit = (news: NewsItem) => {
    setEditingNews(news);
    setFormData({
      title: news.title,
      content: news.content,
      image: news.image || '',
      status: news.status
    });
    setShowAddForm(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this news item?')) {
      setNewsList(newsList.filter(news => news.id !== id));
    }
  };

  const toggleStatus = (id: number) => {
    setNewsList(newsList.map(news => 
      news.id === id 
        ? { ...news, status: news.status === 'published' ? 'draft' : 'published' }
        : news
    ));
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
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">News & Updates</h1>
              <p className="text-gray-600 mt-2">Manage news articles and announcements</p>
            </div>
            <button
              onClick={() => {
                setShowAddForm(true);
                setEditingNews(null);
                setFormData({ title: '', content: '', image: '', status: 'published' });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center cursor-pointer whitespace-nowrap"
            >
              <i className="ri-add-line mr-2"></i>
              Add News
            </button>
          </div>

          {/* Add/Edit Form */}
          {showAddForm && (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">
                {editingNews ? 'Edit News' : 'Add New News'}
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
                    placeholder="Enter news title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    required
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    placeholder="Enter news content"
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.content.length}/500 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    placeholder="Enter image URL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="published"
                        checked={formData.status === 'published'}
                        onChange={(e) => setFormData({...formData, status: e.target.value as 'published' | 'draft'})}
                        className="mr-2"
                      />
                      Published
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="draft"
                        checked={formData.status === 'draft'}
                        onChange={(e) => setFormData({...formData, status: e.target.value as 'published' | 'draft'})}
                        className="mr-2"
                      />
                      Draft
                    </label>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {editingNews ? 'Update News' : 'Add News'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingNews(null);
                      setFormData({ title: '', content: '', image: '', status: 'published' });
                    }}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* News List */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">All News ({newsList.length})</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {newsList.map((news) => (
                <div key={news.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{news.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          news.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {news.status}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{news.content}</p>
                      <p className="text-sm text-gray-500">Published: {news.date}</p>
                      {news.image && (
                        <img 
                          src={news.image} 
                          alt={news.title}
                          className="mt-3 w-32 h-20 object-cover object-top rounded-lg"
                        />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => toggleStatus(news.id)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                          news.status === 'published'
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                        }`}
                      >
                        {news.status === 'published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        onClick={() => handleEdit(news)}
                        className="px-3 py-2 bg-blue-100 text-blue-800 hover:bg-blue-200 text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(news.id)}
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
        </main>
      </div>
    </div>
  );
}