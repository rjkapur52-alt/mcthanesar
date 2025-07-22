
'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import NewsTicker from '../components/NewsTicker';
import Link from 'next/link';

export default function Home() {
  const quickServices = [
    { icon: 'ri-file-text-line', title: 'Download Forms', desc: 'Access all municipal forms', href: '/forms' },
    { icon: 'ri-award-line', title: 'Birth/Death Certificate', desc: 'Apply for certificates online', href: '/certificates' },
    { icon: 'ri-notification-3-line', title: 'Tender Notices', desc: 'View latest tenders', href: '/tenders' },
    { icon: 'ri-money-dollar-circle-line', title: 'Budget', desc: 'Municipal budget details', href: '/budget' },
  ];

  const recentUpdates = [
    {
      date: 'Jan 15, 2024',
      title: 'New Waste Management System',
      desc: 'Advanced waste collection system launched in Ward 5 with door-to-door service',
      image: 'https://readdy.ai/api/search-image?query=modern%20waste%20management%20trucks%20collecting%20garbage%20from%20residential%20area%20with%20workers%20in%20uniform&width=400&height=250&seq=waste-mgmt&orientation=landscape'
    },
    {
      date: 'Jan 12, 2024',
      title: 'Water Supply Improvement',
      desc: 'Enhanced water distribution network completed in Sectors 3 and 7',
      image: 'https://readdy.ai/api/search-image?query=water%20supply%20pipeline%20construction%20workers%20installing%20new%20water%20pipes%20in%20urban%20area&width=400&height=250&seq=water-supply&orientation=landscape'
    },
    {
      date: 'Jan 10, 2024',
      title: 'Road Infrastructure Development',
      desc: 'Major road repair and beautification project underway on Main Market Road',
      image: 'https://readdy.ai/api/search-image?query=road%20construction%20and%20repair%20work%20with%20heavy%20machinery%20and%20workers%20building%20urban%20infrastructure&width=400&height=250&seq=road-repair&orientation=landscape'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <NewsTicker />
      
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://readdy.ai/api/search-image?query=beautiful%20municipal%20council%20building%20with%20Indian%20flag%20flying%2C%20government%20office%20architecture%20with%20clean%20modern%20design%2C%20blue%20sky%20background&width=1920&height=1080&seq=hero-bg&orientation=landscape')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center text-white w-full">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Municipal Council
            <span className="block text-4xl md:text-5xl text-blue-300 mt-2">Thanesar</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Serving our community with dedication, transparency, and commitment to sustainable development
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/about" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap">
              Learn About Us
            </Link>
            <Link href="/services" className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap">
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Quick Services</h2>
            <p className="text-xl text-gray-600">Access essential municipal services instantly</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickServices.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <i className={`${service.icon} text-2xl text-blue-600`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Updates */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recent Updates</h2>
            <p className="text-xl text-gray-600">Stay informed about our latest initiatives and developments</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentUpdates.map((update, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={update.image} 
                  alt={update.title}
                  className="w-full h-48 object-cover object-top"
                />
                <div className="p-6">
                  <div className="text-sm text-blue-600 font-semibold mb-2">{update.date}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{update.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{update.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">12</div>
              <div className="text-blue-200">Total Wards</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">85,000+</div>
              <div className="text-blue-200">Population Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-blue-200">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-200">Emergency Services</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Need Assistance?</h2>
          <p className="text-xl text-gray-300 mb-8">Our team is here to help you with all municipal services</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap">
              Contact Us
            </Link>
            <Link href="/emergency" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap">
              Emergency Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
