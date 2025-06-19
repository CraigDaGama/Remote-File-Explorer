import Sidebar from './components/Sidebar';
import Breadcrumb from './components/Breadcrumb';
import FileList from './components/FileList';
import { useState } from 'react';
import './index.css';

function App() {
  const [currentPath, setCurrentPath] = useState('');

  return (
    <div className="app-container">
      <Sidebar setPath={setCurrentPath} />
      <div className="main-view">
        <Breadcrumb path={currentPath} setPath={setCurrentPath} />
        <FileList path={currentPath} setPath={setCurrentPath} />
      </div>
    </div>
  );
}

export default App;
