import './App.css';

import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import PlacementList from './Components/Placement/PlacementList';
import InterviewForm from './Components/Interview/InterviewForm';
import CreateStudentForm from './Components/Students/CreateStudentForm';
import Home from './Components/Home';
import InterviewPage from './Components/Interview/InterviewPage';

function App() {
  const [user, setLoginUser] = useState({})

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={user && user._id ? <PlacementList /> : <Login setLoginUser={setLoginUser} />}
          />
          <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-interview" element={<InterviewForm />} />
          <Route path="/interview/:id" element={<InterviewPage />} />
          <Route path="/create-student" element={<CreateStudentForm />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;