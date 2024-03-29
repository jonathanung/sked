import { Routes, Route } from 'react-router-dom';
import HomePage from './screens/homePage';
import Logout from './screens/logout';
import Dashboard from './screens/dashboard';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
