import {
  Container,
  ListGroup,
  Button,
  Modal,
  Form,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";

import styles from "../../styles/Users.module.css";
import Link from "next/link";
import { useState } from "react";
const index = ({ resMeetings }) => {
  //states for meeting
  const [title, setMeetingFile] = useState("");
  const [description, setDescription] = useState("");
  const [meetingdate, setMeetingdate] = useState("");
  const [meetingstatus, setMeetingstatus] = useState("");
  const [isrecorded, setIsrecorded] = useState(false);

  //for modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleNewUser = () => {
    setShow(true);
  };

  return (
    <>
      <Container>
        <div className="row my-5">
          <div className="col-md-10">
            <h4 className="text-center">List of Meetings</h4>
          </div>
          <div className="col-md-2 text-end">
            <Button variant="primary" onClick={handleNewUser}>
              Add Meeting
            </Button>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Meeting</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Meeting date</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group controlId="formGridState" className="mb-3">
                <Form.Label>Meeting Status</Form.Label>
                <Form.Select defaultValue="Ongoing">
                  <option>Ongoing</option>
                  <option>Completed</option>
                  <option>Scheduled</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Is Recording Y/N" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        {resMeetings.map((userMeetings) => {
          return (
            <ListGroup>
              <ListGroup.Item key={userMeetings.id} className="py-2 my-2">
                <div className="row">
                  <div className="col-md-3 pt-2">{userMeetings.title}</div>
                  <div className="col-md-4 pt-2">
                    {userMeetings.meeting_date}
                  </div>
                  <div className="col-md-3 pt-2">
                    {userMeetings.meeting_status}
                  </div>
                  <div className="col-md-2">
                    <div className="row ">
                      <div className="col-md my-2 text-end">
                        <Link href={`meetings/${userMeetings.id}`} passHref>
                          <a className={styles.linkBtn}>View</a>
                        </Link>
                      </div>
                      {/*  <div className="col-md text-center">
                        <Button variant="danger">Delete</Button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
            </ListGroup>
          );
        })}
      </Container>
    </>
  );
};

export default index;

export async function getStaticProps() {
  const res = await fetch("http://localhost:8000/meetings");
  const data = await res.json();
  //console.log(data.users);

  return {
    props: {
      resMeetings: data,
    },
  };
}
