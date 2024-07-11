// src/App.tsx
import React from 'react';
import './App.css';
import SearchComponent from './components/SearchComponent/SearchComponent';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Customer Search</h1>
        <SearchComponent />
      </header>
    </div>
  );
}

export default App;
