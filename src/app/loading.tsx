import React from 'react';

const Loading = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 animate-pulse space-y-8 bg-white min-h-screen">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center border-b pb-4">
        <div className="h-10 w-48 bg-gray-300 rounded"></div>
        <div className="flex space-x-3">
          <div className="h-8 w-16 bg-gray-200 rounded"></div>
          <div className="h-8 w-20 bg-gray-300 rounded"></div>
        </div>
      </div>

      {/* Breaking News Ticker Bar Skeleton */}
      <div className="h-10 bg-gray-200 rounded-md w-full"></div>

      {/* Main Top Section Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Big Main Featured News */}
        <div className="md:col-span-6 space-y-3">
          <div className="h-64 sm:h-80 bg-gray-300 rounded-lg w-full"></div>
          <div className="h-6 bg-gray-300 rounded w-11/12"></div>
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="space-y-2 pt-2">
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-4/5"></div>
          </div>
        </div>

        {/* Middle Sub-featured Cards */}
        <div className="md:col-span-3 space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="space-y-2 border-b pb-3">
              <div className="h-32 bg-gray-200 rounded-md w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))}
        </div>

        {/* Right Sidebar - Shorboshes List */}
        <div className="md:col-span-3 border p-4 rounded-md space-y-4 bg-gray-50">
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
              <div key={item} className="flex space-x-3 items-center border-b pb-2">
                <div className="h-4 w-4 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Section 1 Grid */}
      <div className="space-y-4 pt-6 border-t">
        <div className="h-6 bg-gray-300 rounded w-32"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="space-y-3 border p-3 rounded-md">
              <div className="h-44 bg-gray-200 rounded-md w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Media Links Section */}
      <div className="space-y-4 pt-6 border-t">
        <div className="h-6 bg-gray-300 rounded w-40"></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="h-20 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;