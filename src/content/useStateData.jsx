export const useStateData = {
  title: 'useState',
  tagline: 'Preserve state across component renders',
  overview: {
    description: 'useState is a React Hook that lets you add a state variable to your functional component. Unlike regular variables, state variables are preserved by React between renders. When you update a state variable, React automatically schedules a re-render of the component to update the UI.',
    whenToUse: [
      'Staging user input in form fields, textareas, and selection boxes.',
      'Tracking UI toggle states, such as sidebar visibility, dark mode, or modal popups.',
      'Keeping track of counters, game scores, or active page indexes in pagination.',
      'Storing fetched data or loading/error statuses during network operations.'
    ]
  },
  syntax: {
    code: `const [state, setState] = useState(initialState);`,
    parameters: [
      {
        name: 'initialState',
        type: 'any | () => any',
        description: 'The value you want the state to have initially. It can be a value of any type, or a function that returns a value (for lazy initialization of expensive values). This argument is ignored after the initial mount render.'
      }
    ],
    returns: [
      {
        name: 'state',
        type: 'any',
        description: 'The current state value. On the first render, it matches the initialState you passed. On subsequent renders, it is the most up-to-date state.'
      },
      {
        name: 'setState',
        type: 'Function (dispatch)',
        description: 'An updater function that allows you to change the state to a new value and trigger a component re-render. It accepts the new state directly, or a function that computes the next state from the previous state (e.g., setState(prev => prev + 1)).'
      }
    ],
    internalDetails: 'React tracks hooks internally using a linked list on the component\'s Fiber node. Every time a hook is called, React moves to the next node in the list. This is why hooks MUST be called in the exact same order on every render. If hooks are placed inside conditionals or loops, the order gets disrupted, causing React to mismatch states and throw errors.'
  },
  example: {
    code: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default Counter;`,
    output: `On Initial Render:
----------------------------
You clicked 0 times
[ Click me (Button) ]

After User Clicks "Click me" button:
----------------------------
You clicked 1 times
[ Click me (Button) ]`
  },
  howItWorks: {
    steps: [
      {
        title: 'Initial Mount (Render 1)',
        desc: 'React executes the component. It encounters useState(initialState). Since it\'s the first run, React creates a cell in a linked list for this component, stores the initial state, and returns it along with the updater function.'
      },
      {
        title: 'Painting the UI',
        desc: 'React compiles the JSX returned by the component and updates the DOM. The user sees the initial state in the interface.'
      },
      {
        title: 'State Update Triggered',
        desc: 'The user triggers an action (like a button click) that calls the updater function: setState(newValue). React receives this request and schedules a re-render.'
      },
      {
        title: 'Re-rendering the Component',
        desc: 'React runs the component function again. When it encounters the same useState line, React looks at the existing memory cell, reads the updated value, and returns the new value along with the same updater function.'
      },
      {
        title: 'DOM Update (Re-paint)',
        desc: 'React calculates the difference (diffing) between the previous JSX and the new JSX, then applies only the necessary changes to the real browser DOM, ensuring fast updates.'
      }
    ]
  }
};
