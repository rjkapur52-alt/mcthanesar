
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminHeader from '../../../components/admin/AdminHeader';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import Link from 'next/link';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const stats = [
    { title: 'Total News', count: '45', icon: 'ri-newspaper-line', color: 'bg-blue-500' },
    { title: 'Gallery Photos', count: '234', icon: 'ri-image-line', color: 'bg-green-500' },
    { title: 'Tender Notices', count: '12', icon: 'ri-notification-3-line', color: 'bg-yellow-500' },
    { title: 'Forms Available', count: '28', icon: 'ri-file-text-line', color: 'bg-purple-500' },
  ];

  const recentActivity = [
    { action: 'Added new tender notice', time: '2 hours ago', type: 'tender' },
    { action: 'Updated gallery with 5 new photos', time: '4 hours ago', type: 'gallery' },
    { action: 'Published news about waste management', time: '1 day ago', type: 'news' },
    { action: 'Modified chairman\'s desk content', time: '2 days ago', type: 'content' },
    { action: 'Uploaded new budget document', time: '3 days ago', type: 'document' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your website.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <i className={`${stat.icon} text-white text-xl`}></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                    <p className="text-gray-600 text-sm">{stat.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/admin/news" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <i className="ri-add-line text-2xl text-blue-600 mb-2"></i>
                    <span className="text-sm font-medium">Add News</span>
                  </Link>
                  <Link href="/admin/gallery" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <i className="ri-upload-line text-2xl text-green-600 mb-2"></i>
                    <span className="text-sm font-medium">Upload Photo</span>
                  </Link>
                  <Link href="/admin/tenders" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <i className="ri-notification-3-line text-2xl text-yellow-600 mb-2"></i>
                    <span className="text-sm font-medium">New Tender</span>
                  </Link>
                  <Link href="/admin/forms" className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <i className="ri-file-text-line text-2xl text-purple-600 mb-2"></i>
                    <span className="text-sm font-medium">Add Form</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
