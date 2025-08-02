import Home from "./home";
import Login from "./Login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ComplaintForm from "./complaintpage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/complaint" element={<ComplaintForm />} />
      </Routes>
    </Router>
    
  );
}
export default App;
