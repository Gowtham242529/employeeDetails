import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const ViewEmployee = () => {
  const { id } = useParams();
  console.log("id", id);

  const [employee, setEmployee] = useState(null); // State to hold employee details
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch employee details using the id
    fetchEmployeeDetails(id);
  }, [id]);

  const fetchEmployeeDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}`);
      const data = await response.json();
      setEmployee(data); // Set employee details in state
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  if (!employee) {
    return <div>Loading...</div>; // Placeholder while loading employee details
  }
  return (
    <div className="container mx-auto mt-10">
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
        <div className="text-right">

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white text-right font-bold py-2 px-4 rounded"
          onClick={() => navigate('/')}
        >
          Back
        </button>
        </div>
        <h1 className="text-2xl font-bold mb-4">Employee Details</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name:</label>
          <p className="text-gray-900">{employee.name}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Position:
          </label>
          <p className="text-gray-900">{employee.position}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Department:
          </label>
          <p className="text-gray-900">{employee.department}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Salary:</label>
          <p className="text-gray-900">{employee.salary}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Date of Hire:
          </label>
          <p className="text-gray-900">{employee.dateOfHire}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
