'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <i className="ri-government-line text-white text-xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold">Municipal Council</h3>
                <p className="text-gray-400 text-sm">Thanesar</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Serving the citizens of Thanesar with dedication and transparency. Working towards a cleaner, safer, and more prosperous community.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors cursor-pointer">About Us</Link></li>
              <li><Link href="/chairman" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Chairman's Desk</Link></li>
              <li><Link href="/officers" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Officer Details</Link></li>
              <li><Link href="/councilors" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Ward Councilors</Link></li>
              <li><Link href="/rti" className="text-gray-400 hover:text-white transition-colors cursor-pointer">RTI</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/forms" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Download Forms</Link></li>
              <li><Link href="/certificates" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Birth/Death Certificate</Link></li>
              <li><Link href="/tenders" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Tender Notices</Link></li>
              <li><Link href="/budget" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Budget</Link></li>
              <li><Link href="/projects" className="text-gray-400 hover:text-white transition-colors cursor-pointer">Projects</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <i className="ri-map-pin-line text-blue-400 mt-1"></i>
                <div>
                  <p className="text-gray-400 text-sm">Municipal Council Office</p>
                  <p className="text-gray-400 text-sm">Thanesar, Kurukshetra</p>
                  <p className="text-gray-400 text-sm">Haryana, India</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <i className="ri-phone-line text-blue-400"></i>
                <p className="text-gray-400 text-sm">+91-1744-123456</p>
              </div>
              <div className="flex items-center space-x-3">
                <i className="ri-mail-line text-blue-400"></i>
                <p className="text-gray-400 text-sm">info@mcthanesar.gov.in</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Municipal Council Thanesar. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm cursor-pointer">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm cursor-pointer">Terms of Service</Link>
            <Link href="/sitemap" className="text-gray-400 hover:text-white text-sm cursor-pointer">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}