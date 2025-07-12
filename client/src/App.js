

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AskQuestion from './pages/AskQuestion';
import QuestionDetails from './pages/QuestionDetails';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/questions/:id" element={<QuestionDetails />} />
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ask" element={<AskQuestion />} />
      </Routes>
    </Router>
  );
}

export default App;
