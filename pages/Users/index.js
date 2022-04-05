import Link from "next/link";
import {
  Container,
  ListGroup,
  Button,
  Modal,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import styles from "styles/Users.module.css";
import axios from "axios";
import uuid from "react-uuid";
import { useState, useEffect } from "react";

const index = () => {
  //getting user list
  const [resUserData, setResUserData] = useState([]);

  //form all states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [dob, setDOB] = useState("");
  const [editId, setEditid] = useState(null);

  //for modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    getData();
    setShow(false);
    setName("");
    setEmail("");
    setMobile("");
    setAddress("");
    setPhoto("");
    setDOB("");
    setShow(false);
  };
  const handleNewUser = () => {
    setShow(true);
    setCheckEditClick(false);
  };

  // getting data
  const getData = () => {
    axios.get("http://localhost:8000/users").then((res) => {
      setResUserData(res.data);
      setFilteredData(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  //adding data
  const handelPostData = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/users", {
        id: uuid(),
        name,
        email,
        mobile,
        address,
        photo,
        dob,
      })
      .then(() => {
        getData();
        setShow(false);
        setName("");
        setEmail("");
        setMobile("");
        setAddress("");
        setPhoto("");
        setDOB("");
      });
  };

  //for delete
  const handelDelete = (id) => {
    console.log(id);
    try {
      axios.delete(`http://localhost:8000/users/${id}`).then((res) => {
        getData();
      });
    } catch (error) {
      console.log(error);
    }
  };

  //for update
  const [userId, setUserId] = useState(null);
  const [checkEditClick, setCheckEditClick] = useState(false);
  const handelEditModal = (id) => {
    try {
      axios.get(`http://localhost:8000/users/${id}`).then((allusers) => {
        setName(allusers.data.name);
        setEmail(allusers.data.email);
        setMobile(allusers.data.mobile);
        setAddress(allusers.data.address);
        setPhoto(allusers.data.photo);
        setDOB(allusers.data.dob);
        setUserId(allusers.data.id);
      });
      setCheckEditClick(true);
      setShow(true);
    } catch (error) {
      console.log(error);
    }
  };
  //console.log(editName, "editedname");
  //console.log(userId);

  //to submit editted data
  const handeEditedData = (id, e) => {
    e.preventDefault();
    //alert("Hii");
    try {
      const editedUser = {
        name: name,
        email: email,
        address: address,
        mobile: mobile,
        photo: photo,
        dob: dob,
      };
      axios.put(`http://localhost:8000/users/${id}`, editedUser).then((res) => {
        getData();
        setShow(false);
      });
      //alert(id);
    } catch (error) {
      console.log(error);
    }
  };

  //console.log(resUseerData);

  //for filter
  const [filteredData, setFilteredData] = useState(resUserData);
  // console.log(resUserData[0]);
  const handelFilter = (e) => {
    let value = e.target.value.toLowerCase();
    let result = [];
    // console.log(value);
    //console.log(resUserData);
    result = resUserData.filter((data) => {
      return data.name.search(value) != -1;
    });
    setFilteredData(result);
    //console.log(result);
  };
  //console.log(filteredData.data);

  return (
    <>
      <Container>
        <div className="row my-5">
          <div className="col-md-4 text-left">
            <h4 className="text-center">List of users</h4>
          </div>
          <div className="col-md-6">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search by Name"
                onChange={(e) => handelFilter(e)}
              />
            </InputGroup>
          </div>
          <div className="col-md-2 text-end">
            <Button variant="primary" onClick={handleNewUser}>
              Add User
            </Button>
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            {checkEditClick !== true ? (
              <Modal.Title>Add User</Modal.Title>
            ) : (
              <Modal.Title>Edit User</Modal.Title>
            )}
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Image url</Form.Label>
                <Form.Control
                  type="url"
                  defaultValue={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>D.O.B</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={dob}
                  onChange={(e) => setDOB(e.target.value)}
                />
              </Form.Group>
              {checkEditClick !== true ? (
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handelPostData}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  variant="primary"
                  type="submit"
                  onClick={(e) => handeEditedData(userId, e)}
                >
                  Save Changes
                </Button>
              )}
            </Form>
          </Modal.Body>
        </Modal>
        {filteredData.length == 0 ? (
          <h5 className="text-center"> No Users</h5>
        ) : (
          <div>
            {filteredData.map((user) => {
              return (
                <ListGroup>
                  <ListGroup.Item key={user.id} className="py-2 my-2">
                    <div className="row">
                      <div className="col-md-4 pt-2">{user.name}</div>
                      <div className="col-md-5 text-center pt-2">
                        {user.email}
                      </div>
                      <div className="col-md-3">
                        <div className="row">
                          <div className="col-md my-3 text-center">
                            <Link href={`users/${user.id}`}>
                              <a className={styles.linkBtn}>View</a>
                            </Link>
                          </div>
                          <div className="col-md my-2 text-center">
                            <Button
                              className={styles.linkEditBtn}
                              onClick={() => handelEditModal(user.id)}
                            >
                              Edit
                            </Button>
                          </div>
                          <div className="col-md my-2 text-end">
                            <Button
                              variant="danger"
                              onClick={() => handelDelete(user.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              );
            })}
          </div>
        )}
      </Container>
    </>
  );
};

export default index;

/* export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/data.json");
  //console.log(res);
  const data = await res.json();
  // console.log(data.users);

  return {
    props: {
      resUsers: data.users,
    },
  };
} */

/* export async function getServerSideProps() {
  const response = await fetch("http://localhost:8000/users");
  const userData = await response.json();

  return {
    props: {
      resUseerData: userData,
    },
  };
} */
