import React, { useState } from 'react';
import axios from 'axios';

const LogIngestion = () => {
  const [logData, setLogData] = useState({
    level: '',
    message: '',
    resourceId: '',
    timestamp: '',
    traceId: '',
    spanId: '',
    commit: '',
    parentResourceId: '',
  });
//added a search filter in that
  const handleInputChange = (e) => {
    setLogData({ ...logData, [e.target.name]: e.target.value });
  };
  //posting the request of log controller in that

  const handleLogIngestion = async () => {
    try {
      await axios.post('http://localhost:8000/api/create', logData);
      console.log('Log ingested successfully');
      // Optionally, clear the form after successful ingestion
      setLogData({
        level: '',
        message: '',
        resourceId: '',
        timestamp: '',
        traceId: '',
        spanId: '',
        commit: '',
        parentResourceId: '',
      });
    } catch (error) {
      console.error('Error ingesting log', error);
      // Add code to handle and display the error
    }
  };

  return (
    <div className='log'>
      <h2>Log Ingestion</h2>
      <div className='log-ingestion'>
        {Object.keys(logData).map((fieldName) => (
          <label key={fieldName}>
            {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}:
            <input
              type='text'
              name={fieldName}
              value={logData[fieldName]}
              onChange={handleInputChange}
            />
          </label>
        ))}
        {/* button to inject logs  */}
        <button onClick={handleLogIngestion}>Ingest Log</button>
      </div>
    </div>
  );
};

export default LogIngestion;
