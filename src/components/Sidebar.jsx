import React from 'react';

export default function Sidebar({ topics, activeTopic, setActiveTopic }) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col justify-between shrink-0 h-[calc(100vh-64px)] sticky top-16">
      <div className="flex flex-col gap-6">
        <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">HOOKS</span>
        <nav className="flex flex-col gap-2">
          {topics.map((topic) => {
            const isActive = activeTopic === topic;
            return (
              <button
                key={topic}
                className={`w-full text-left py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                    ? 'bg-indigo-50 text-indigo-600 border-l-4 border-indigo-600 pl-3'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                onClick={() => setActiveTopic(topic)}
              >
                {topic}
              </button>
            );
          })}
        </nav>
      </div>

    </aside>
  );
}
