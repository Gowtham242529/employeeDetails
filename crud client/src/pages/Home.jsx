import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Home() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/employees");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((employee) => {
    const { name, position, department } = employee;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      name.toLowerCase().includes(lowerCaseQuery) ||
      position.toLowerCase().includes(lowerCaseQuery) ||
      department.toLowerCase().includes(lowerCaseQuery)
    );
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <h1 className="text-white bg-blue-900 py-5 font-bold text-lg pl-6">
        Employee Management App
      </h1>
      <h1 className="text-black text-2xl font-bold py-2 text-center">
        Employees List
      </h1>
      <div className="lg:px-36 lg:py-8 px-2 py-2">
        <div className="sm:flex md:block">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8">
            <Link to={`/addEmployee`}>Add Employee</Link>
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by name, position, or department"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b border-gray-200 border-l">
                Name
              </th>
              <th className="py-2 px-4 border-b border-gray-200 border-l">
                Position
              </th>
              {/* <th className="py-2 px-4 border-b border-gray-200 border-l">
                Department
              </th>
              <th className="py-2 px-4 border-b border-gray-200 border-l">
                Salary
              </th>
              <th className="py-2 px-4 border-b border-gray-200 border-l">
                Date of Hire
              </th> */}
              <th className="py-2 px-4 border-b border-gray-200 border-l">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-2 px-4 border-b border-gray-200 border-l">
                  {employee.name}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 border-l">
                  {employee.position}
                </td>
                {/* <td className="py-2 px-4 border-b border-gray-200 border-l">
                  {employee.department}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 border-l">
                  {employee.salary}
                </td>
                <td className="py-2 px-4 border-b border-gray-200 border-l">
                  {employee.dateOfHire}
                </td> */}
                <td className="py-2 border-b border-gray-200 border-l text-center sm:flex sm:flex-col sm:justify-center md:flex-row sm:gap-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2 w-[120px]">
                    <Link to={`/updateEmployee/${employee._id}`}>Update</Link>
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2 w-[120px]"
                    onClick={async () => {
                      try {
                        await fetch(
                          `http://localhost:5000/api/employees/${employee._id}`,
                          {
                            method: "DELETE",
                          }
                        );
                        window.location.reload();
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    Delete
                  </button>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded w-[120px]">
                    <Link to={`/viewEmployee/${employee._id}`}>
                      View Details
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>{" "}
      </div>
    </div>
  );
}

export default Home;
