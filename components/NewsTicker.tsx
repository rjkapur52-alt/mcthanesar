'use client';

export default function NewsTicker() {
  const newsItems = [
    "New waste management system launched in Ward 5 - Effective from January 15, 2024",
    "Budget 2024-25 approved - Focus on infrastructure development and citizen welfare",
    "Water supply improvement project completed in Sectors 3 and 7",
    "Online application system for birth/death certificates now available",
    "Municipal meeting scheduled for January 25, 2024 at 2:00 PM - All citizens welcome",
    "Road repair work in progress on Main Market Road - Expected completion by month end"
  ];

  return (
    <div className="bg-red-600 text-white py-2">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center">
          <div className="bg-red-700 px-4 py-1 rounded-md flex items-center mr-4 whitespace-nowrap">
            <i className="ri-notification-3-line mr-2"></i>
            <span className="font-semibold text-sm">Latest News</span>
          </div>
          <div className="ticker-container flex-1">
            <div className="ticker-content">
              {newsItems.map((news, index) => (
                <span key={index} className="text-sm mr-12">
                  • {news}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}