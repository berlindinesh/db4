import React, { useState, useEffect } from 'react';

const EmployeeServiceHistory = ({ onNext, onPrevious }) => {
  const [serviceHistory, setServiceHistory] = useState([
    { transactionType: '', office: '', post: '', orderNumber: '', orderDate: '', incrementDate: '', payScale: '', otherDept: '', areaType: '' },
  ]);
  const [errors, setErrors] = useState([]);

  // Fetch service history from the backend on component mount
  useEffect(() => {
    fetch('/api/service-history')
      .then((response) => response.json())
      .then((data) => {
        setServiceHistory(data);
      })
      .catch((error) => {
        console.error('Error fetching service history:', error);
      });
  }, []);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedHistory = [...serviceHistory];
    updatedHistory[index][name] = value;
    setServiceHistory(updatedHistory);
  };

  const addServiceEntry = () => {
    setServiceHistory([
      ...serviceHistory,
      { transactionType: '', office: '', post: '', orderNumber: '', orderDate: '', incrementDate: '', payScale: '', otherDept: '', areaType: '' },
    ]);
  };

  const removeServiceEntry = (index) => {
    const entryId = serviceHistory[index]._id;

    fetch(`/api/service-history/${entryId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedHistory = serviceHistory.filter((_, i) => i !== index);
        setServiceHistory(updatedHistory);
      })
      .catch((error) => console.error('Error deleting service entry:', error));
  };

  const validateForm = () => {
    const newErrors = serviceHistory.map((entry) => {
      let error = {};
      if (!entry.transactionType) error.transactionType = 'Transaction Type is required';
      if (!entry.office) error.office = 'Office is required';
      return error;
    });

    setErrors(newErrors);
    return newErrors.every((err) => Object.keys(err).length === 0);
  };

  const handleSubmit = () => {
    if (validateForm()) {
      serviceHistory.forEach((entry) => {
        fetch('/api/service-history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entry),
        })
          .then((response) => response.json())
          .then(() => {
            alert('Service history submitted successfully!');
            onNext(); // Proceed to the next step
          })
          .catch((error) => console.error('Error submitting service history:', error));
      });
    }
  };

  return (
    <div>
      <h2>FORM-6: EMPLOYEE SERVICE HISTORY</h2>
      <table border="1" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Transaction Type</th>
            <th>To Office</th>
            <th>To Which Post</th>
            <th>Order Number</th>
            <th>Order Date</th>
            <th>Date of Increment</th>
            <th>Pay Scale</th>
            <th>Other Department (if Deputation)</th>
            <th>Area Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {serviceHistory.map((entry, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  name="transactionType"
                  value={entry.transactionType}
                  onChange={(e) => handleInputChange(index, e)}
                />
                {errors[index]?.transactionType && <span style={{ color: 'red' }}>{errors[index].transactionType}</span>}
              </td>
              <td>
                <input
                  type="text"
                  name="office"
                  value={entry.office}
                  onChange={(e) => handleInputChange(index, e)}
                />
                {errors[index]?.office && <span style={{ color: 'red' }}>{errors[index].office}</span>}
              </td>
              <td>
                <input type="text" name="post" value={entry.post} onChange={(e) => handleInputChange(index, e)} />
              </td>
              <td>
                <input type="text" name="orderNumber" value={entry.orderNumber} onChange={(e) => handleInputChange(index, e)} />
              </td>
              <td>
                <input type="date" name="orderDate" value={entry.orderDate} onChange={(e) => handleInputChange(index, e)} />
              </td>
              <td>
                <input type="date" name="incrementDate" value={entry.incrementDate} onChange={(e) => handleInputChange(index, e)} />
              </td>
              <td>
                <input type="text" name="payScale" value={entry.payScale} onChange={(e) => handleInputChange(index, e)} />
              </td>
              <td>
                <input type="text" name="otherDept" value={entry.otherDept} onChange={(e) => handleInputChange(index, e)} />
              </td>
              <td>
                <input type="text" name="areaType" value={entry.areaType} onChange={(e) => handleInputChange(index, e)} />
              </td>
              <td>
                <button onClick={() => removeServiceEntry(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addServiceEntry} style={{ marginTop: '10px' }}>
        Add Service Entry
      </button>
      <div style={{ marginTop: '20px' }}>
        <button onClick={onPrevious}>Previous</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default EmployeeServiceHistory;
