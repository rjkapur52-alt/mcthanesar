'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Chairman\'s Desk', href: '/chairman' },
    { name: 'Officer Details', href: '/officers' },
    { name: 'Ward Councilors', href: '/councilors' },
    { name: 'RTI', href: '/rti' },
    { name: 'Employee Details', href: '/employees' },
    { name: 'Download Forms', href: '/forms' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Tender Notices', href: '/tenders' },
    { name: 'Budget', href: '/budget' },
    { name: 'Projects', href: '/projects' },
    { name: 'Certificates', href: '/certificates' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <i className="ri-government-line text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Municipal Council</h1>
              <p className="text-sm text-gray-600">Thanesar</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors whitespace-nowrap cursor-pointer"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              href="/admin"
              className="hidden md:flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-admin-line mr-2"></i>
              Admin Login
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-8 h-8 flex items-center justify-center"
            >
              <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-xl`}></i>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="grid grid-cols-2 gap-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Link
              href="/admin"
              className="flex items-center justify-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-admin-line mr-2"></i>
              Admin Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}