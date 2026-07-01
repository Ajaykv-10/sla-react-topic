import React from 'react';

export default function FlowDiagram({ topic }) {
  const useStateNodes = [
    { label: 'Mount', desc: 'Initialize state' },
    { label: 'Paint UI', desc: 'Render view' },
    { label: 'Trigger setState', desc: 'User click/action' },
    { label: 'Re-render', desc: 'React component re-runs' },
    { label: 'Update DOM', desc: 'Browser repaints' }
  ];

  const useEffectNodes = [
    { label: 'Render', desc: 'JSX processed' },
    { label: 'Paint UI', desc: 'DOM updated on screen' },
    { label: 'Run Effect', desc: 'Execute side effects' },
    { label: 'Deps Change', desc: 'Re-render component' },
    { label: 'Run Cleanup', desc: 'Clear old resources' },
    { label: 'Rerun Effect', desc: 'Execute updated setup' }
  ];

  const nodes = topic === 'useState' ? useStateNodes : useEffectNodes;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-6 shadow-sm">
      <h4 className="text-xs font-bold text-gray-400 tracking-wider uppercase mb-4">Lifecycle Execution Flow</h4>
      <div className="flex flex-col md:flex-row md:flex-wrap items-stretch md:items-center justify-start gap-4">
        {nodes.map((node, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && (
              <div className="hidden md:flex items-center text-gray-300 font-bold text-lg select-none">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
            {idx > 0 && (
              <div className="flex md:hidden justify-center text-gray-300 select-none py-1">
                <svg className="w-5 h-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
            <div className="flex-1 min-w-[140px] bg-white border border-gray-200 pl-3 pr-4 py-3 rounded-lg shadow-sm border-l-4 border-l-indigo-500">
              <span className="text-xs font-bold text-indigo-500 uppercase">Step {idx + 1}</span>
              <div className="text-sm font-semibold text-gray-800 leading-tight mt-0.5">{node.label}</div>
              <div className="text-xs text-gray-500 mt-1">{node.desc}</div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
