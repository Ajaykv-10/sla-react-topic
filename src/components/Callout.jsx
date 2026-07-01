import React from 'react';

export default function Callout({ type = 'info', title, children }) {
  const styles = {
    info: 'bg-blue-50 border-l-4 border-blue-500 text-blue-700',
    tip: 'bg-emerald-50 border-l-4 border-emerald-500 text-emerald-700',
    warning: 'bg-amber-50 border-l-4 border-amber-500 text-amber-700'
  };

  const titles = {
    info: title || 'Information',
    tip: title || 'Tip',
    warning: title || 'Warning'
  };

  return (
    <div className={`p-4 rounded-r-lg my-4 flex flex-col gap-1.5 ${styles[type]}`}>
      <span className="font-bold text-sm tracking-wide uppercase">{titles[type]}</span>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
