import React from 'react';

export default function Header() {
  return (
    <header className="docs-header">
      <div className="header-logo">
        <svg className="react-logo-svg" viewBox="-11.5 -10.23174 23 20.46348" width="32" height="32">
          <circle cx="0" cy="0" r="2.05" fill="#6366f1" />
          <g stroke="#6366f1" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
        <span className="logo-text">React Learning Hub</span>
      </div>
      <div className="header-meta">
        <span className="badge">Interactive Docs</span>
        <a 
          href="https://react.dev" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="external-link"
        >
          Official React Docs
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 1H11V8.5M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </header>
  );
}
