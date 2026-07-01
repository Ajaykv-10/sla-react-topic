export const useEffectData = {
  title: 'useEffect',
  tagline: 'Synchronize components with external systems',
  overview: {
    description: 'useEffect is a React Hook that lets you perform side effects in functional components. A "side effect" is any action that affects something outside the scope of the React rendering cycle. Examples include data fetching, manual DOM manipulations, setting up subscriptions, timers, and logging.',
    whenToUse: [
      'Fetching data from a REST API or GraphQL server when the component mounts or when specific props/state change.',
      'Setting up a WebSocket connection, server-sent events, or chat room subscription.',
      'Registering browser window events (like scroll, resize, click) or keyboard event listeners.',
      'Managing browser timers like setTimeout and setInterval, and ensuring they get cleaned up properly.'
    ]
  },
  syntax: {
    code: `useEffect(() => {
  // 1. Setup Phase: Runs after render/paint
  const connection = createConnection();
  connection.connect();

  // 2. Cleanup Phase: Runs before setup runs again, and on unmount
  return () => {
    connection.disconnect();
  };
}, [dependencies]); // 3. Dependency Array: Controls when the effect re-runs`,
    parameters: [
      {
        name: 'setup',
        type: '() => void | (() => void)',
        description: 'The function with your effect logic. It runs when the component mounts, and when any dependency changes. React will call the cleanup function (if returned) before running this setup function again, and when the component is unmounted.'
      },
      {
        name: 'dependencies',
        type: 'Array<any> (optional)',
        description: 'An array of reactive values (state, props, and functions) that the effect depends on. React compares each dependency using Object.is. If any dependency changes, the effect runs again. If omitted, the effect runs on every single render. If empty [], the effect runs only once on mount.'
      }
    ],
    returns: [
      {
        name: 'undefined',
        type: 'void',
        description: 'useEffect does not return any value. Returning anything other than undefined or a cleanup function will result in a React console warning.'
      }
    ],
    internalDetails: 'React stores your effect hook on the Fiber node linked list. During render, React just records the effect and its dependencies. After the browser has finished painting the screen, React processes the updates in a separate, non-blocking phase. It compares current dependencies with previous ones, and if there are differences (or if no dependency array was provided), it executes the queued cleanup and then the setup.'
  },
  example: {
    code: `import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // 1. Setup Phase: Start interval timer
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // 2. Cleanup Phase: Clear timer on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty array: effect runs ONLY on component mount

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <p>Seconds elapsed: {seconds}</p>
    </div>
  );
}

export default Timer;`,
    output: `On Mount (First paint):
----------------------------
- DOM elements are drawn: "Seconds elapsed: 0"
- useEffect runs: sets up a new interval (setInterval #1)

At 1 Second Elapsed:
----------------------------
- Interval updates state to 1
- Component re-renders
- DOM updates: "Seconds elapsed: 1"
- useEffect dependencies [] compared. No change. Effect setup NOT re-run.

On Unmount (Component is removed):
----------------------------
- Component is destroyed
- React runs the cleanup function: clearInterval(intervalId)
- Timer is stopped, preventing memory leaks.`
  },
  howItWorks: {
    steps: [
      {
        title: 'Component Renders & Paints',
        desc: 'React runs the component, returns the JSX, and updates the DOM. The browser paints this UI to the screen so the user can see it immediately. Crucially, useEffect is delayed until after painting to keep the UI responsive.'
      },
      {
        title: 'Effect Setup Runs',
        desc: 'Once the paint is complete, React runs the setup function inside useEffect. In our example, a websocket connection is made or a window event listener is attached.'
      },
      {
        title: 'Component Re-renders (Update)',
        desc: 'The component state or props change, causing a re-render. React re-runs the JSX and paints the screen. React then checks the dependency array: it compares each item. If they are identical, React does nothing.'
      },
      {
        title: 'Cleanup -> Setup Cycle',
        desc: 'If dependencies have changed, React first runs the cleanup function returned from the previous effect call (e.g. removes the window listener), then executes the new effect setup function with the new state values.'
      },
      {
        title: 'Unmount Cleanup',
        desc: 'When the component is finally removed from the page (unmounted), React executes the cleanup function one last time to prevent memory leaks and clean up resources.'
      }
    ]
  }
};
