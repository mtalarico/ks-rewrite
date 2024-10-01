import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "./Layout";
import "./App.css";

function App() {
  const API_ENDPOINT = "http://localhost:8080";

  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: "", email: "", phoneNumber: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get("/rest/members");
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      await axios.post("/rest/members", newMember);
      setErrors("Registration successful");
      setNewMember({ name: "", email: "", phoneNumber: "" });
      setErrors({});
      fetchMembers();
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const hasFieldErrors = () => {
    return Object.keys(errors).some((key) => key !== "error");
  };

  return (
    <Layout>
      <div>
        <h1>Welcome to JBoss!</h1>
        <div>
          <p>You have successfully deployed a Jakarta EE Enterprise Application.</p>
        </div>
        <form id="reg" onSubmit={handleSubmit}>
          <h2>Member Registration</h2>
          <p>Enforces annotation-based constraints defined on the model class.</p>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <div className="input-container">
              <input id="name" name="name" value={newMember.name} onChange={handleInputChange} />
              {errors.name && <span className="validationError"> {errors.name}</span>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <div className="input-container">
              <input id="email" name="email" value={newMember.email} onChange={handleInputChange} />
              {errors.email && <span className="validationError"> {errors.email}</span>}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone #:</label>
            <div className="input-container">
              <input id="phoneNumber" name="phoneNumber" value={newMember.phoneNumber} onChange={handleInputChange} />
              {errors.phoneNumber && <span className="validationError"> {errors.phoneNumber}</span>}
            </div>
          </div>
          <div className="form-group">
            <button type="submit" id="registerButton">
              Register
            </button>
            {submitted &&
              !hasFieldErrors() &&
              (errors.error ? <p> Registration unsuccessful: {errors.error}</p> : <li> Registration successful</li>)}
          </div>
        </form>

        <h2>Members</h2>
        <div>
          {members.length === 0 ? (
            <em>No registered members.</em>
          ) : (
            <table className="simpletablestyle">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone #</th>
                  <th>REST URL</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id}>
                    <td>{member.id}</td>
                    <td>{member.name}</td>
                    <td>{member.email}</td>
                    <td>{member.phoneNumber}</td>
                    <td>
                      <a href={`${API_ENDPOINT}/rest/members/${member.id}`} target="_blank" rel="noopener noreferrer">
                        /rest/members/{member.id}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="5">
                    REST URL for all members:
                    <a href={`${API_ENDPOINT}/rest/members`} target="_blank" rel="noopener noreferrer">
                      /rest/members
                    </a>
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default App;
