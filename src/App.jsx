import React, { useState } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Callout from './components/Callout.jsx';
import CodeBlock from './components/CodeBlock.jsx';


export default function App() {
  const [activeTopic, setActiveTopic] = useState('useState');

  const topicsData = {
    useState: {
      title: 'useState',
      tagline: 'Manage state in React functional components.',
      overview: {
        description: 'useState is a core React Hook that lets you add state variables to functional components. It preserves values between renders, allowing components to remember interactive data (like inputs, counters, or toggle switches). When state is modified, React triggers a component re-render to update the user interface.',
        whenToUse: [
          'Tracking text, checkbox inputs, or form selections.',
          'Managing visual UI switches, like dropdown expansions, modals, or dark-mode settings.',
          'Incrementing counters, paginating tabs, or updating game states.',
          'Storing responses, error logs, and loading flags during network requests.'
        ]
      },
      syntax: {
        code: 'const [state, setState] = useState(initialState);',
        explanation: [
          { name: 'state', desc: 'The current value of the state. On the first render, it equals the initial state you passed.' },
          { name: 'setState', desc: 'The updater function you call to set the state to a new value and trigger a component re-render.' },
          { name: 'initialState', desc: 'The starting value of the state. It can be a value of any type, or a function that returns a value (for lazy initialization).' }
        ],
        internal: 'React preserves hook states by storing them in a sequential linked list on the component\'s Fiber node. Because of this index-based ordering, hooks must always be executed in the exact same order on every render. Putting them inside conditionals or loops causes index mismatches and runtime errors.'
      },
      howItWorks: [
        { title: 'Initialization', desc: 'On mount (first render), React reads the initial value and sets up a state cell in memory.' },
        { title: 'UI Paint', desc: 'React returns [initialState, setState] and renders the DOM. The user sees the initial view.' },
        { title: 'State Change Event', desc: 'User performs an action calling setState(newValue). React queues the value and schedules a re-render.' },
        { title: 'Re-render Cycle', desc: 'React re-runs the component. useState looks up the state cell and returns the updated value.' },
        { title: 'DOM Update', desc: 'React diffs the changes and updates only the modified DOM nodes on screen.' }
      ]
    },
    useEffect: {
      title: 'useEffect',
      tagline: 'Synchronize components with external systems.',
      overview: {
        description: 'useEffect is a core React Hook that lets you execute side effects in functional components. A side effect is any operation that affects resources outside of React\'s rendering loop, such as direct DOM manipulations, setting up API subscriptions, handling browser timers, or fetching server data.',
        whenToUse: [
          'Fetching data from a REST endpoint when the component mounts or dependencies change.',
          'Setting up real-time WebSocket subscriptions or event listeners (like scroll/resize).',
          'Setting up timers (setTimeout, setInterval) that must be cleared when a component is destroyed.',
          'Syncing non-React widgets with React state attributes.'
        ]
      },
      syntax: {
        code: `useEffect(() => {
  // Setup logic goes here
  
  return () => {
    // Cleanup logic goes here
  };
}, [dependencies]);`,
        explanation: [
          { name: 'setup', desc: 'The function containing side effect logic. It can optionally return a cleanup function (which runs before re-running the effect and upon component unmount).' },
          { name: 'dependencies', desc: 'Optional array of reactive values (state/props). If dependencies change, the effect re-runs. If empty ([]), it runs once on mount. If omitted, it runs on every render.' },
          { name: 'cleanup', desc: 'The return function. Runs to release active subscriptions, intervals, or event handlers, preventing memory leaks.' }
        ],
        internal: 'React registers effect setup and cleanup functions during the rendering phase. After the browser has successfully updated the DOM and finished painting the screen, React executes the queued setups asynchronously. This prevents side effects from blocking the UI thread.'
      },
      howItWorks: [
        { title: 'Render & Paint', desc: 'React renders the JSX, updates the DOM tree, and the browser paints the pixels on screen.' },
        { title: 'Run Setup', desc: 'Immediately after paint, React runs the callback function inside useEffect.' },
        { title: 'State Change', desc: 'A dependency changes, triggering a re-render. React updates the screen view.' },
        { title: 'Run Cleanup & Rerun', desc: 'Before starting the updated setup, React runs the returned cleanup function to reset the previous state, then executes the new setup.' },
        { title: 'Unmount Cleanup', desc: 'When the component leaves the DOM, React triggers the cleanup callback one last time.' }
      ]
    }
  };

  const currentData = topicsData[activeTopic];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans antialiased text-gray-800">
      {/* Header bar */}
      <header className="bg-white border-b border-gray-200 h-16 px-8 flex items-center justify-between sticky top-0 z-50 shadow-sm shrink-0">
        <div className="flex items-center gap-3">
         
          <span className="font-bold text-lg text-gray-900 tracking-tight">React Topics</span>
        </div>
       
      </header>

      {/* Main split */}
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left Nav */}
        <Sidebar 
          topics={['useState', 'useEffect']}
          activeTopic={activeTopic}
          setActiveTopic={setActiveTopic}
        />

        {/* Content Box */}
        <main className="flex-1 p-6 md:p-10 max-w-4xl mx-auto w-full">
          <div className="flex flex-col gap-8">
            {/* Hook Headline */}
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">HOOK DOCUMENTATION</span>
              <h1 className="text-4xl font-extrabold text-gray-900 mt-1 tracking-tight">{currentData.title}</h1>
              <p className="text-lg text-gray-500 mt-2 font-normal leading-relaxed">{currentData.tagline}</p>
            </div>

            {/* Overview */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">Overview</h2>
              <p className="text-base text-gray-600 leading-relaxed mb-5">{currentData.overview.description}</p>
              
              <Callout type="tip" title={`When to use ${currentData.title}:`}>
                <ul className="list-disc pl-5 flex flex-col gap-1.5 mt-1.5 text-sm text-emerald-800">
                  {currentData.overview.whenToUse.map((useCase, idx) => (
                    <li key={idx}>{useCase}</li>
                  ))}
                </ul>
              </Callout>
            </section>

            {/* Syntax */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">Syntax</h2>
              <p className="text-sm text-gray-500 mb-2">Basic hooks declaration model:</p>
              <CodeBlock code={currentData.syntax.code} />
            </section>

            {/* Detailed Explanation */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">Detailed Explanation</h2>
              
              <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm mb-6 bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                      <th className="py-3 px-4">Syntax Term</th>
                      <th className="py-3 px-4">Role / Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-sm">
                    {currentData.syntax.explanation.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-3 px-4 font-mono font-bold text-indigo-600">{item.name}</td>
                        <td className="py-3 px-4 text-gray-600 leading-relaxed">{item.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>


            </section>

            {/* How It Works */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 border-b border-gray-200 pb-2 mb-4">How It Works</h2>
              <p className="text-base text-gray-600 leading-relaxed mb-6">Below is the step-by-step rendering flow executed by the React engine:</p>
              
              <div className="flex flex-col gap-4 mb-6">
                {currentData.howItWorks.map((step, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:translate-x-1 transition-transform duration-200">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-gray-800">{step.title}</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>


            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
