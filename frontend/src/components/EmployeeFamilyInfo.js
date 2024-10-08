import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeFamilyInfo = ({ onNext, onPrevious }) => {
  const [familyMembers, setFamilyMembers] = useState([
    { name: '', relation: '', dob: '', dependent: 'No', employed: 'No', sameDept: 'No', empCode: '', department: '', eSalaryCode: '' },
  ]);
  const [errors, setErrors] = useState([]);

  // Fetch family info from the backend on component mount
  useEffect(() => {
    fetch('/api/family-info')
      .then((response) => response.json())
      .then((data) => {
        setFamilyMembers(data);
      })
      .catch((error) => {
        console.error('Error fetching family info:', error);
      });
  }, []);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedMembers = [...familyMembers];
    updatedMembers[index][name] = value;
    setFamilyMembers(updatedMembers);
  };

  const addFamilyMember = () => {
    setFamilyMembers([
      ...familyMembers,
      { name: '', relation: '', dob: '', dependent: 'No', employed: 'No', sameDept: 'No', empCode: '', department: '', eSalaryCode: '' },
    ]);
  };

  const removeFamilyMember = (index) => {
    const memberId = familyMembers[index]._id; // Assuming the backend returns the MongoDB _id

    fetch(`/api/family-info/${memberId}`, {
      method: 'DELETE',
    })
      .then(() => {
        const updatedMembers = familyMembers.filter((_, i) => i !== index);
        setFamilyMembers(updatedMembers);
      })
      .catch((error) => console.error('Error deleting family member:', error));
  };

  const validateForm = () => {
    const newErrors = familyMembers.map((member) => {
      let error = {};
      if (!member.name) error.name = 'Name is required';
      if (!member.relation) error.relation = 'Relation is required';
      if (!member.dob) error.dob = 'Date of birth is required';
      return error;
    });

    setErrors(newErrors);
    return newErrors.every((err) => Object.keys(err).length === 0);
  };
/*
  // UPDATED handleSubmit: Single POST request for all family members
  const handleSubmit = () => {
  if (validateForm()) {
    const promises = familyMembers.map((member) => {
      return fetch('/api/family-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(member),
      });
    });

    Promise.all(promises)
      .then((responses) => Promise.all(responses.map((response) => response.json())))
      .then(() => {
        alert('Family information submitted successfully!');
        onNext(); // Redirect to the next step
      })
      .catch((error) => console.error('Error submitting family info:', error));
  }
};
*/
const handleSubmit = async () => {
  if (validateForm()) {
    try {
      const response = await axios.post('http://localhost:5000/api/familyInfo.js', familyMembers);
      console.log('Response from server:', response.data);
      alert('Family Details submitted successfully!');
      onNext();
    } catch (error) {
      console.error('Error submitting family details:', error);
      alert('Error submitting family details. Please try again.');
      // Log the error to the server or a logging service
    }
  }
};
  return (
    <div>
      <h2>FORM-5: EMPLOYEE FAMILY INFORMATION</h2>
      <table border="1" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Family Member Name</th>
            <th>Relation</th>
            <th>Date of Birth</th>
            <th>Dependent</th>
            <th>Employment Status</th>
            <th>In Same Department?</th>
            <th>Employee Code</th>
            <th>Department</th>
            <th>E-Salary Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {familyMembers.map((member, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  name="name"
                  value={member.name}
                  onChange={(e) => handleInputChange(index, e)}
                />
                {errors[index]?.name && <span style={{ color: 'red' }}>{errors[index].name}</span>}
              </td>
              <td>
                <input
                  type="text"
                  name="relation"
                  value={member.relation}
                  onChange={(e) => handleInputChange(index, e)}
                />
                {errors[index]?.relation && <span style={{ color: 'red' }}>{errors[index].relation}</span>}
              </td>
              <td>
                <input
                  type="date"
                  name="dob"
                  value={member.dob}
                  onChange={(e) => handleInputChange(index, e)}
                />
                {errors[index]?.dob && <span style={{ color: 'red' }}>{errors[index].dob}</span>}
              </td>
              <td>
                <select name="dependent" value={member.dependent} onChange={(e) => handleInputChange(index, e)}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </td>
              <td>
                <select name="employed" value={member.employed} onChange={(e) => handleInputChange(index, e)}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </td>
              <td>
                <select name="sameDept" value={member.sameDept} onChange={(e) => handleInputChange(index, e)}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  name="empCode"
                  value={member.empCode}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="department"
                  value={member.department}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="eSalaryCode"
                  value={member.eSalaryCode}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <button onClick={() => removeFamilyMember(index)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addFamilyMember} style={{ marginTop: '10px' }}>
        Add Family Member
      </button>
      <div style={{ marginTop: '20px' }}>
        <button onClick={onPrevious}>Previous</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default EmployeeFamilyInfo;
