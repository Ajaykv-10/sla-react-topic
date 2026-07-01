import React, { useState, useEffect, useRef } from 'react';

export default function InteractiveSandbox({ topic }) {
  const [logs, setLogs] = useState([]);
  const [demoType, setDemoType] = useState('demo1'); // Toggle sub-demos per hook
  
  // useState Demo 1 States
  const [count, setCount] = useState(0);

  // useState Demo 2 States
  const [name, setName] = useState('');
  const [role, setRole] = useState('Student');

  // useEffect Demo 1 States
  const [userId, setUserId] = useState(1);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  // useEffect Demo 2 States
  const [trackerActive, setTrackerActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Refs for tracking render numbers
  const renderCountRef = useRef(1);

  const addLog = (type, message) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + 
                 '.' + String(new Date().getMilliseconds()).padStart(3, '0');
    setLogs(prev => [{ time, type, message }, ...prev].slice(0, 30));
  };

  const clearLogs = () => {
    setLogs([]);
    renderCountRef.current = 1;
    addLog('system', 'Console cleared. Render counter reset.');
  };

  // Reset states and logs when topic or demo changes
  useEffect(() => {
    setLogs([]);
    renderCountRef.current = 1;
    
    if (topic === 'useState') {
      if (demoType === 'demo1') {
        setCount(0);
        addLog('render', `[Render #1] Counter Demo initialized. state = 0`);
      } else {
        setName('');
        setRole('Student');
        addLog('render', `[Render #1] Profile Form initialized. name = "", role = "Student"`);
      }
    } else {
      if (demoType === 'demo1') {
        setUserId(1);
        setUserData(null);
        setLoading(false);
        addLog('render', `[Render #1] Fetcher initialized. userId = 1`);
      } else {
        setTrackerActive(false);
        setMousePos({ x: 0, y: 0 });
        addLog('render', `[Render #1] Mouse Tracker initialized. active = false`);
      }
    }
  }, [topic, demoType]);

  // Log renders for useState Counter
  const isFirstCountRender = useRef(true);
  useEffect(() => {
    if (topic === 'useState' && demoType === 'demo1') {
      if (isFirstCountRender.current) {
        isFirstCountRender.current = false;
        return;
      }
      renderCountRef.current += 1;
      addLog('render', `[Render #${renderCountRef.current}] Component re-rendered. count = ${count}`);
    }
  }, [count]);

  // Log renders for useState Form
  const isFirstFormRender = useRef(true);
  useEffect(() => {
    if (topic === 'useState' && demoType === 'demo2') {
      if (isFirstFormRender.current) {
        isFirstFormRender.current = false;
        return;
      }
      renderCountRef.current += 1;
      addLog('render', `[Render #${renderCountRef.current}] Component re-rendered. name = "${name}", role = "${role}"`);
    }
  }, [name, role]);

  // useEffect Demo 1 (Fetch simulation) Effect
  useEffect(() => {
    if (topic === 'useEffect' && demoType === 'demo1') {
      renderCountRef.current += 1;
      addLog('effect', `[useEffect] Setup running: Dependencies changed! userId = ${userId}`);
      
      setLoading(true);
      setUserData(null);
      addLog('system', `Fetching details for User #${userId}...`);

      const timer = setTimeout(() => {
        const mockUsers = {
          1: { name: 'Alice Vance', email: 'alice@react.hub', joined: '2025' },
          2: { name: 'Bob Sterling', email: 'bob@react.hub', joined: '2024' },
          3: { name: 'Charlie Dean', email: 'charlie@react.hub', joined: '2026' }
        };
        setUserData(mockUsers[userId] || { name: 'Unknown User', email: 'n/a', joined: 'n/a' });
        setLoading(false);
        addLog('system', `Fetch complete: User details resolved`);
      }, 1200);

      // Cleanup logic
      return () => {
        clearTimeout(timer);
        addLog('cleanup', `[useEffect Cleanup] Cancelled pending fetch timer for userId = ${userId}`);
      };
    }
  }, [userId, topic, demoType]);

  // useEffect Demo 2 (Mouse tracker) Effect
  useEffect(() => {
    if (topic === 'useEffect' && demoType === 'demo2' && trackerActive) {
      addLog('effect', `[useEffect] Setup running: Event listener attached to window`);

      const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Cleanup logic
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        addLog('cleanup', `[useEffect Cleanup] Event listener removed from window`);
      };
    }
  }, [trackerActive, topic, demoType]);

  // Track rendering for useEffect demo components
  const isFirstEffectTrackerRender = useRef(true);
  useEffect(() => {
    if (topic === 'useEffect' && demoType === 'demo2') {
      if (isFirstEffectTrackerRender.current) {
        isFirstEffectTrackerRender.current = false;
        return;
      }
      renderCountRef.current += 1;
      addLog('render', `[Render #${renderCountRef.current}] Component re-rendered. Coordinates updated to: [${mousePos.x}, ${mousePos.y}]`);
    }
  }, [mousePos]);

  return (
    <div className="sandbox-container">
      <div className="sandbox-header">
        <div className="sandbox-tab-group">
          <button 
            className={`sandbox-tab ${demoType === 'demo1' ? 'active' : ''}`}
            onClick={() => { setDemoType('demo1'); }}
          >
            {topic === 'useState' ? 'Counter Demo' : 'Data Fetcher Demo'}
          </button>
          <button 
            className={`sandbox-tab ${demoType === 'demo2' ? 'active' : ''}`}
            onClick={() => { setDemoType('demo2'); }}
          >
            {topic === 'useState' ? 'Form Input Demo' : 'Mouse Listener Demo'}
          </button>
        </div>
        <button className="console-clear-btn" onClick={clearLogs}>Clear Log</button>
      </div>

      <div className="sandbox-grid">
        {/* Left Side: Live Interactive UI */}
        <div className="sandbox-pane sandbox-preview">
          <h4 className="pane-title">Interactive Preview</h4>
          
          {/* useState Counter Demo */}
          {topic === 'useState' && demoType === 'demo1' && (
            <div className="demo-content text-center">
              <div className="counter-display">{count}</div>
              <div className="btn-row">
                <button 
                  className="action-btn decrement"
                  onClick={() => {
                    addLog('action', 'Clicked decrement button');
                    setCount(prev => prev - 1);
                  }}
                >
                  - Decrement
                </button>
                <button 
                  className="action-btn reset"
                  onClick={() => {
                    addLog('action', 'Clicked reset button');
                    setCount(0);
                  }}
                >
                  Reset
                </button>
                <button 
                  className="action-btn increment"
                  onClick={() => {
                    addLog('action', 'Clicked increment button');
                    setCount(prev => prev + 1);
                  }}
                >
                  + Increment
                </button>
              </div>
              <p className="demo-tip">Clicking buttons schedules a update, changing the state and triggering a re-render.</p>
            </div>
          )}

          {/* useState Form Input Demo */}
          {topic === 'useState' && demoType === 'demo2' && (
            <div className="demo-content">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={name} 
                  onChange={(e) => {
                    addLog('action', `Typed: "${e.target.value}"`);
                    setName(e.target.value);
                  }}
                  placeholder="Enter name..."
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Role</label>
                <select 
                  className="form-select"
                  value={role}
                  onChange={(e) => {
                    addLog('action', `Selected role: ${e.target.value}`);
                    setRole(e.target.value);
                  }}
                >
                  <option value="Student">Student</option>
                  <option value="Developer">Developer</option>
                  <option value="Instructor">Instructor</option>
                </select>
              </div>

              <div className="profile-preview-card">
                <h5 className="preview-card-title">Live Card Output</h5>
                <p><strong>Name:</strong> {name || 'Not provided'}</p>
                <p><strong>Role:</strong> {role}</p>
              </div>
            </div>
          )}

          {/* useEffect Data Fetcher Demo */}
          {topic === 'useEffect' && demoType === 'demo1' && (
            <div className="demo-content">
              <div className="user-selector-row">
                <label className="form-label">Select User ID:</label>
                <div className="btn-row">
                  {[1, 2, 3].map(id => (
                    <button 
                      key={id}
                      className={`selector-btn ${userId === id ? 'active' : ''}`}
                      onClick={() => {
                        if (userId !== id) {
                          addLog('action', `Selected User ID #${id}`);
                          setUserId(id);
                        }
                      }}
                    >
                      User {id}
                    </button>
                  ))}
                </div>
              </div>

              <div className="fetch-results-pane">
                {loading ? (
                  <div className="loading-spinner-container">
                    <div className="spinner"></div>
                    <p>Simulating network request...</p>
                  </div>
                ) : userData ? (
                  <div className="user-details-card">
                    <h5>{userData.name}</h5>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Class:</strong> React Cohort {userData.joined}</p>
                  </div>
                ) : (
                  <p className="no-data-placeholder">No user data loaded.</p>
                )}
              </div>
              <p className="demo-tip">Selecting a new ID changes the dependency list, which automatically cancels the previous timer (cleanup) and starts a new simulated fetch (setup).</p>
            </div>
          )}

          {/* useEffect Mouse Tracker Demo */}
          {topic === 'useEffect' && demoType === 'demo2' && (
            <div className="demo-content">
              <div className="tracker-toggle-bar">
                <button
                  className={`tracker-toggle-btn ${trackerActive ? 'active' : ''}`}
                  onClick={() => {
                    addLog('action', `Toggled Mouse Tracker to: ${!trackerActive}`);
                    setTrackerActive(!trackerActive);
                  }}
                >
                  {trackerActive ? 'Disable Tracking (Unmount Effect)' : 'Enable Tracking (Mount Effect)'}
                </button>
              </div>

              <div className={`coordinates-display-box ${trackerActive ? 'active' : ''}`}>
                {trackerActive ? (
                  <div>
                    <p className="coords-title">Move mouse inside the window</p>
                    <div className="coords-values">
                      <span>X: <strong>{mousePos.x}px</strong></span>
                      <span>Y: <strong>{mousePos.y}px</strong></span>
                    </div>
                  </div>
                ) : (
                  <p className="inactive-placeholder">Effect is not mounted. Move mouse anywhere - state will not update.</p>
                )}
              </div>
              <p className="demo-tip">Disabling the tracker triggers the cleanup return function, removing the event listener from the window node. This prevents memory leaks!</p>
            </div>
          )}
        </div>

        {/* Right Side: State Inspector & Output logs */}
        <div className="sandbox-pane sandbox-console">
          <h4 className="pane-title">State Inspector & Logs</h4>
          
          <div className="state-inspector-section">
            <h5 className="inspector-subtitle">React Component State</h5>
            <pre className="state-json">
              {topic === 'useState' && demoType === 'demo1' && JSON.stringify({ count }, null, 2)}
              {topic === 'useState' && demoType === 'demo2' && JSON.stringify({ name, role }, null, 2)}
              {topic === 'useEffect' && demoType === 'demo1' && JSON.stringify({ userId, loading, userData }, null, 2)}
              {topic === 'useEffect' && demoType === 'demo2' && JSON.stringify({ trackerActive, mousePos }, null, 2)}
            </pre>
          </div>

          <div className="console-logs-section">
            <h5 className="inspector-subtitle">Lifecycle & Action logs</h5>
            <div className="logs-list">
              {logs.length === 0 ? (
                <div className="empty-log-msg">Logs will appear here when you interact with the preview panel...</div>
              ) : (
                logs.map((log, index) => (
                  <div key={index} className={`log-item log-type-${log.type}`}>
                    <span className="log-time">[{log.time}]</span>
                    <span className={`log-badge badge-${log.type}`}>{log.type.toUpperCase()}</span>
                    <span className="log-message">{log.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
