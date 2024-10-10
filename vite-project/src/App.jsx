import React, { useState } from "react";

const initialData = [
  {
    lastName: "Guevarra",
    firstName: "Dennis Deevo",
    course: "IT",
    birthdate: "2003-01-16",
  },
  {
    lastName: "Holloway",
    firstName: "Marcus",
    course: "CS",
    birthdate: "1992-12-11",
  },
  {
    lastName: "Pearce",
    firstName: "Aiden",
    course: "IS",
    birthdate: "1974-05-02",
  },
  {
    lastName: "Alderson",
    firstName: "Elliot",
    course: "DS",
    birthdate: "1986-09-17",
  },
];

const calculateAge = (birthdate) => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

const DataTable = () => {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");

  const filteredData = data.filter((item) => {
    const birthdateWithinRange =
      (!minDate || new Date(item.birthdate) >= new Date(minDate)) &&
      (!maxDate || new Date(item.birthdate) <= new Date(maxDate));

    const matchesSearchTerm =
      item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calculateAge(item.birthdate).toString().includes(searchTerm);

    return birthdateWithinRange && matchesSearchTerm;
  });

  return (
    <div className="center-container">
      <h1>Student Management System: Data Table</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <input
          type="date"
          placeholder="Min Date"
          value={minDate}
          onChange={(e) => setMinDate(e.target.value)}
        />

        <input
          type="date"
          placeholder="Max Date"
          value={maxDate}
          onChange={(e) => setMaxDate(e.target.value)}
        />
      </div>

      <table
        className="table-margin"
        border="1"
        cellPadding="10"
        cellSpacing="0"
      >
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Course</th>
            <th>Birthdate</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.lastName}</td>
              <td>{item.firstName}</td>
              <td>{item.course}</td>
              <td>{item.birthdate}</td>
              <td>{calculateAge(item.birthdate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
