import React from 'react';
import './App.css';
import './index.js';
import './Components/Dashboard/Dashboard.component';
import './Components/Onboarding/Onboarding.component';
import Dashboard from './Components/Dashboard/Dashboard.component';
import TopNavigation from './Components/navigation/TopNavigation.component';

function App() {
  return (
    <div className="App">
      <TopNavigation />
      <header className="App-header">
        <Dashboard />
      </header>
    </div>
  );
}

export default App;
