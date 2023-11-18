import React,{useState} from 'react'
import axios from 'axios'
const LogIngestion = () => {
    const [logData, setLogData] = useState({
        level: '',
        message: '',
        // Add other fields as needed
      });
      const handleInputChange = (e) => {
        setLogData({ ...logData, [e.target.name]: e.target.value });
      };
      const handleLogIngestion = async () => {
        try {
          await axios.post('http://localhost:8000/api/create', logData);
          console.log('Log ingested successfully');
        } catch (error) {
          console.error('Error ingesting log', error);
        }
      };

  return (
    <div>
    
    <h2>Log Ingestion</h2>
    <label>
      Level:
      <input type="text" name="level" onChange={handleInputChange} />
    </label>
    <label>
      Message:
      <input type="text" name="message" onChange={handleInputChange} />
    </label>
    {/* Add other input fields as needed */}
    <button onClick={handleLogIngestion}>Ingest Log</button></div>
  )
}

export default LogIngestion