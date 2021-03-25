import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavbarUser from './NavbarUser'
import axios from '../axios'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/button'


const Users = () => {

    const [users, setUser] = useState([]);
    const [departments, setDepartments] = useState ([]);
    

    const [lastName, setLastname] = useState('');
    const [firstName, setFirstname] = useState('');
    const [jobTitle, setJobtitle] = useState('');
    const [department, setNewdepartment] = useState('');
    const [id, setId] = useState(0);

    const [show, setShow] = useState(false);
    const [edit,setEdit] =useState(false);

    const editClose = () => setEdit(false);
    const editShow = () => setEdit(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  

        useEffect ( () => {
            axios.get("/")
            .then ( (response) =>{
                console.log("success");
                setUser(response.data);
            });

        }, []);



        useEffect ( () => {
            axios.get("/Departments")
            .then ( (response) =>{
                console.log("success");
                setDepartments(response.data);
            });

        }, []);
       
        const adduser = () =>  {
            axios.post('/create', {
                lastName: lastName,
                firstName:firstName,
                jobTitle: jobTitle,
                department:department,

            }).then (() => {
                setUser( [...users, {
                 id:users.length+1,
                 lastName: lastName,
                 firstName:firstName,
                 jobTitle: jobTitle,
                 department:department,
                }])
            });

            setShow(false);
            
        };




        const takedata = (id) =>{
            editShow(true);
            for ( var i=0; i<users.length;i++){
                if (users[i].id == id){
               
                    setLastname (users[i].lastName);
                    setFirstname (users[i].firstName);
                    setJobtitle (users[i].jobTitle);
                    setNewdepartment(users[i].department);
                    setId(users[i].id);
                }
            }
            
        }

        const edituser = () =>{


            axios.put('/update', {
                lastName: lastName,
                firstName:firstName,
                jobTitle: jobTitle,
                department:department,
                id:id,

            }).then (() => {
                setUser(users.map ((user) => {
                    return user.id == id ? {
                        lastName: lastName,
                        firstName:firstName,
                        jobTitle: jobTitle,
                        department:department,
                        id:id,
                    } : user;
                }))
            });

            setEdit(false);
        }

    
   
  return (

    <div>

<NavbarUser handleShow = {handleShow} />
    <div className="container">

   
       
      <div className="py-4">
        <h1>Users</h1>
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Last Name</th>
              <th scope="col">First Name</th>
              <th scope="col">Job Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                  <th style = {{display:'none'}}scope="row">{user.id}</th>
                <td>{user.lastName}</td>
                <td>{user.firstName}</td>
                <td>{user.jobTitle}</td>
                <td>
                
                  <Button
                    className="btn btn-outline"
                    onClick = {() => takedata(user.id)}
                  >
                    Edit
                  </Button>



                
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>



    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ADD USER</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form.Group >
              <Form.Label>Last Name </Form.Label>
              <Form.Control  placeholder="Last Name" type="text"  onChange = {(event) => { setLastname(event.target.value)}}/>     

              </Form.Group>

              <Form.Group>
              <Form.Label>First Name </Form.Label>
              <Form.Control  type="text" placeholder="First Name" onChange = {(event) => { setFirstname(event.target.value)}}/>   

              </Form.Group>
        
                <Form.Group>

                <Form.Label>Job Title </Form.Label>
                <Form.Control  placeholder="Job Title" type="text" onChange = {(event) => { setJobtitle(event.target.value)}}/>   

                </Form.Group>

                <Form.Group>
                <Form.Label>Department </Form.Label>
                <Form.Control as="select" onChange = {(event) => { setNewdepartment(event.target.value)}}>
                   <option>Department</option>
                {departments.map ((department) => (
                    <option>{department.name}</option>
                ))}
                 </Form.Control>
                
                
                </Form.Group>
           
         


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={adduser}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>





      <Modal show={edit} onHide={editClose}>
        <Modal.Header closeButton>
          <Modal.Title>EDIT USER</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form.Group >
              <Form.Label>Last Name </Form.Label>
              <Form.Control  value = {lastName} type="text" placeholder="Last Name"  onChange = {(event) => { setLastname(event.target.value)}}/>     

              </Form.Group>

              <Form.Group>
              <Form.Label>First Name </Form.Label>
              <Form.Control  type="text" value = {firstName} placeholder="First Name" onChange = {(event) => { setFirstname(event.target.value)}}/>   

              </Form.Group>
        
                <Form.Group>

                <Form.Label>Job Title </Form.Label>
                <Form.Control  type="text" value = {jobTitle} placeholder="Job Title" onChange = {(event) => { setJobtitle(event.target.value)}}/>   

                </Form.Group>

                <Form.Group>
                <Form.Label>Department </Form.Label>
                <Form.Control as="select"   defaultValue = {department} onChange = {(event) => { setNewdepartment(event.target.value)}}>
                
                {departments.map ((department) => (
                    <option>{department.name}</option>
                ))}
                 </Form.Control>
                
                
                </Form.Group>
           
         


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={editClose}>
            Close
          </Button>
          <Button variant="primary" onClick={edituser}>
            Edit User
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  );
};

export default Users;