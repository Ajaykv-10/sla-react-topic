import React from 'react';

export default function CodeBlock({ code }) {
  return (
    <div className="relative group my-4 rounded-lg overflow-hidden border border-gray-200">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs font-mono text-gray-500 uppercase tracking-wider">
        <span>Syntax</span>
      </div>
      <pre className="p-4 bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto leading-relaxed shadow-inner">
        <code>{code}</code>
      </pre>
    </div>
  );
}
