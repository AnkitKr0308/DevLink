import React from "react";

function HomeComponent() {
  return (
    <div className="max-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to <span className="text-blue-600">DevLink</span>
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Your personal developer bookmarking hub — save, organize, and manage
          links to docs, tools, repos, videos, and more.
        </p>
      </div>

      <div className="mt-24 max-w-5xl mx-auto grid gap-12 md:grid-cols-3 text-center">
        <div>
          <h3 className="text-xl font-semibold mb-2">📌 Save Your Links</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Bookmark useful dev resources like documentation, tools, articles,
            and videos.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">🏷️ Tag & Categorize</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Organize your bookmarks using custom tags and categories for quick
            access.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">📝 Add Notes</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Leave short notes or context about why a link is useful or how to
            use it.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
