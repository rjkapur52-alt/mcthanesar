'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    router.push('/admin');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <i className="ri-admin-line text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-600">Municipal Council Thanesar</p>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              target="_blank"
              className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-external-link-line mr-2"></i>
              View Website
            </Link>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="ri-user-line text-blue-600"></i>
              </div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-logout-box-line mr-2"></i>
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}