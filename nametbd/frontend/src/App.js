import './App.css';
import Homepage from './components/homepage';
import PostPage from './components/postPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
      <Router>
        <div>
          <Routes>
            <Route
              exact
              path="/"
              element={<Homepage />} // TODO change state
            />
            <Route
              exact
              path="/postPage"
              element={<PostPage />} // TODO change state
            />
          </Routes>
        </div>
      </Router>
  );
};

export default App;