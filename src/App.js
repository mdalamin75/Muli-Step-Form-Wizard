import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import StepperForm from './components/stepperForm';
import ResultsPage from './components/resultsPage';
import Profile from './components/profile';
import WelcomePage from './components/welcomePage';
import { UserContext } from './contexts/userContext';
import mockRobots from './data/mockRobots.json';
import Login from './components/login';
import "./styles/global.css"

const App = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [robotTypes, setRobotTypes] = useState([]);
  const [applicationTypes, setApplicationTypes] = useState([]);
  const [gripperTypes, setGripperTypes] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // State to store filtered robots
  const [robots, setRobots] = useState([]); // Store mockRobots globally

  useEffect(() => {
    const uniqueRobotTypes = [...new Set(mockRobots.map((robot) => robot.robotType))];
    const uniqueApplicationTypes = [...new Set(mockRobots.map((robot) => robot.applicationType))];
    const uniqueGripperTypes = [...new Set(mockRobots.map((robot) => robot.gripperType))];

    setRobotTypes(uniqueRobotTypes);
    setApplicationTypes(uniqueApplicationTypes);
    setGripperTypes(uniqueGripperTypes);
    setRobots(mockRobots); // Initialize robots globally

      // Debugging logs
    console.log("robots in App:", mockRobots);
    console.log("robotTypes:", uniqueRobotTypes);
    console.log("applicationTypes:", uniqueApplicationTypes);
    console.log("gripperTypes:", uniqueGripperTypes);

  }, []);

  const handleComplete = (filteredResults) => {
    setFilteredData(filteredResults); // Save filtered results
    navigate('/Search', { state: { filteredData: filteredResults } }); // Navigate to ResultsPage
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route
        path="/searchwizard"
        element={
          <StepperForm
            robots={robots}
            displayableOptions={robotTypes.slice(0, 3)} // Example: Use robotTypes for step 1
            dropdownOptions={robotTypes.length > 3 ? robotTypes.slice(3) : []}
            onComplete={handleComplete}
          />
        }
      />
      <Route
        path="/search"
        element={
          <ResultsPage
            robots={filteredData.length > 0 ? filteredData : robots} // Pass filtered or full robots list
            robotTypes={robotTypes}
            applicationTypes={applicationTypes}
            gripperTypes={gripperTypes}
          />
        }
      />
      <Route
        path="/profile"
        element={currentUser ? <Profile /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;
