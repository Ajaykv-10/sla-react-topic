import React, { useState } from 'react';

export default function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative group my-4 rounded-lg overflow-hidden border border-gray-200">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200 text-xs font-mono text-gray-500 uppercase tracking-wider">
        <span>Syntax</span>
        <button
          onClick={handleCopy}
          className={`px-2 py-1 rounded border text-xs transition-all duration-200 ${
            copied
              ? 'bg-emerald-50 text-emerald-600 border-emerald-300'
              : 'bg-white hover:bg-gray-100 border-gray-300 text-gray-600'
          }`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto leading-relaxed shadow-inner">
        <code>{code}</code>
      </pre>
    </div>
  );
}
