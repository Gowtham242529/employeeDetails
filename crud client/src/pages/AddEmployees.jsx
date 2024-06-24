import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const AddEmployees = () => {
  const [employee, setEmployee] = useState({
    name: "",
    position: "",
    department: "",
    salary: "",
    dateOfHire: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      navigate('/')
    } catch (error) {
      console.error("Error adding employee:", error);
    }
    setEmployee({
      name: "",
      position: "",
      department: "",
      salary: "",
      dateOfHire: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto my-8 p-4 border rounded bg-gray-50"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Employee</h2>
      {Object.keys(employee).map((key) => (
        <div className="mb-4" key={key}>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor={key}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
          <input
            type={key === "dateOfHire" ? "date" : "text"}
            id={key}
            name={key}
            value={employee[key]}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
      ))}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Employee
        </button>
      </div>
    </form>
  );
};

export default AddEmployees;
