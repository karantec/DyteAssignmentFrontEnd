import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const LogRetrivel = () => {
    const socket = io('http://localhost:8000');


  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getAll');
        setLogs(response.data);
      } catch (error) {
        console.error('Error fetching logs', error);
      }
    };

    fetchLogs();

    // Listen for real-time updates
    socket.on('logIngested', (newLog) => {
        setLogs((prevLogs) => [...prevLogs, newLog]);
      });
  
      // Clean up event listener when the component unmounts
      return () => {
        socket.off('logIngested');
      };
    }, [socket]);

  return (
    <div>
      <h2>Log Retrieval</h2>
      <ul>
        {logs.map((log) => (
          <li key={log._id}>
            <ul>
              <li>Level: {log.level}</li>
              <li>Message: {log.message}</li>
              <li>resourceId: {log.resourceId}</li> {/* Fix the property name */}
              <li>Timestamp: {log.timestamp}</li>
              <li>TraceId: {log.traceId}</li>
              <li>Commit: {log.commit}</li>
              {/* Display other log fields as needed */}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogRetrivel;
