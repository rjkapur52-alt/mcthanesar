'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: 'ri-dashboard-line' },
    { name: 'News & Updates', href: '/admin/news', icon: 'ri-newspaper-line' },
    { name: 'Gallery Management', href: '/admin/gallery', icon: 'ri-image-line' },
    { name: 'Tender Notices', href: '/admin/tenders', icon: 'ri-notification-3-line' },
    { name: 'Forms Management', href: '/admin/forms', icon: 'ri-file-text-line' },
    { name: 'Budget Documents', href: '/admin/budget', icon: 'ri-money-dollar-circle-line' },
    { name: 'Page Content', href: '/admin/pages', icon: 'ri-pages-line' },
    { name: 'Officers & Staff', href: '/admin/staff', icon: 'ri-team-line' },
    { name: 'Ward Councilors', href: '/admin/councilors', icon: 'ri-user-star-line' },
    { name: 'Projects', href: '/admin/projects', icon: 'ri-building-line' },
    { name: 'Contact Info', href: '/admin/contact', icon: 'ri-contacts-line' },
    { name: 'Website Settings', href: '/admin/settings', icon: 'ri-settings-line' },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm min-h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <i className={`${item.icon} mr-3 text-lg`}></i>
                  <span className="font-medium text-sm">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}