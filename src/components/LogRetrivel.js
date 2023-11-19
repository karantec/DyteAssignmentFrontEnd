import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const LogRetrivel = () => {
  //localhost
  const socket = io('http://localhost:8000');

  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    level: '',
    message: '',
    resourceId: '',
    timestamp: '',
    traceId: '',
    spanId: '',
    commit: '',
    parentResourceId: '',
  });
//calling the api 
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        //calling the api 
        const response = await axios.get('http://localhost:8000/api/getAll');
        let filteredLogs = response.data;

        // Apply client-side filtering based on the provided filters
        Object.keys(filters).forEach((filterKey) => {
          const filterValue = filters[filterKey];
          if (filterValue) {
            filteredLogs = filteredLogs.filter((log) =>
              log[filterKey].toLowerCase().includes(filterValue.toLowerCase())
            );
          }
        });

        setLogs(filteredLogs);
      } catch (error) {
        console.error('Error fetching logs', error);
      }
    };

    fetchLogs();

    socket.on('logIngested', (newLog) => {
      // Apply filters to the new log and check if it should be included
      const shouldInclude = Object.keys(filters).every(
        (filterKey) =>
          !filters[filterKey] || newLog[filterKey].toLowerCase().includes(filters[filterKey].toLowerCase())
      );

      if (shouldInclude) {
        setLogs((prevLogs) => [...prevLogs, newLog]);
      }
    });

    return () => {
      socket.off('logIngested');
    };
  }, [socket, filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div className='log'>
      <h2>Log Retrieval</h2>
      <form>
  {Object.entries(filters).map(([filterKey, filterValue]) => (
    <label key={filterKey}>
      {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}:
      <input
        type='text'
        name={filterKey}
        value={filterValue}
        onChange={handleFilterChange}
      />
    </label>
  ))}
  <button type='button' onClick={() => setFilters({})}>
    Clear Filters
  </button>
</form>
  
      <ul>
        {logs.map((log) => (
          <li key={log._id}>
          {/* get the data easily  */}
            <ul>
              <li>Level: {log.level}</li>
              <li>Message: {log.message}</li>
              <li>resourceId: {log.resourceId}</li>
              <li>Timestamp: {log.timestamp}</li>
              <li>TraceId: {log.traceId}</li>
              <li>Commit: {log.commit}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogRetrivel;
