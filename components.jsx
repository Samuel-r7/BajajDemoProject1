import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate JSON
      JSON.parse(jsonInput);
      setError('');

      // Make API request
      const { data } = await axios.post('http://localhost:8080/api/process_data', JSON.parse(jsonInput));

      // Set response
      setResponse(data);
    } catch (err) {
      setError('Invalid JSON input or API request failed');
      setResponse(null);
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const renderResponse = () => {
    if (!response) return null;

    const options = selectedOptions.map(option => option.value);
    const filteredResponse = {};

    if (options.includes('Alphabets') && response.alphabetArray) {
      filteredResponse.Alphabets = response.alphabetArray;
    }

    if (options.includes('Numbers') && response.numberArray) {
      filteredResponse.Numbers = response.numberArray;
    }

    if (options.includes('Highest lowercase alphabet') && response.highestLowercaseAlphabet) {
      filteredResponse['Highest lowercase alphabet'] = response.highestLowercaseAlphabet;
    }

    return (
      <div>
        {Object.keys(filteredResponse).map(key => (
          <div key={key}>
            <h3>{key}</h3>
            <pre>{JSON.stringify(filteredResponse[key], null, 2)}</pre>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Your Roll Number</h1>
      <form onSubmit={handleFormSubmit}>
        <textarea
          rows="4"
          cols="50"
          value={jsonInput}
          onChange={handleInputChange}
          placeholder='Enter JSON like { "data": ["A", "C", "z"] }'
        />
        <button type="submit">Submit</button>
      </form>

      {error && <div className="error">{error}</div>}

      {response && (
        <Select
          isMulti
          options={[
            { value: 'Alphabets', label: 'Alphabets' },
            { value: 'Numbers', label: 'Numbers' },
            { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' }
          ]}
          onChange={handleSelectChange}
        />
      )}

      {renderResponse()}
    </div>
  );
}

export default App;
