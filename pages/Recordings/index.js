import { Container, ListGroup, Button } from "react-bootstrap";
import styles from "../../styles/Users.module.css";
import Link from "next/link";
import { useState } from "react";
const index = ({ resRecordings }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [meetingdate, setMeetingDate] = useState("");
  const [Meetingstatus, setMeetingstatus] = useState("");
  const [isrecorded, setIsrecorded] = useState("");

  return (
    <>
      <Container>
        <h4 className="text-center my-5">List of Recordings</h4>
        {resRecordings.map((userRecordings) => {
          return (
            <ListGroup>
              <ListGroup.Item key={userRecordings.id} className="py-2 my-2">
                <div className="row">
                  <div className="col-md-6 pt-2">
                    {userRecordings.meeting_file_url}
                  </div>
                  <div className="col-md-4 pt-2">
                    {userRecordings.file_size}
                  </div>
                  <div className="col-md-2">
                    <div className="row">
                      <div className="col-md my-2 text-end">
                        <Link href={`recordings/${userRecordings.id}`}>
                          <a className={styles.linkBtn}>View</a>
                        </Link>
                      </div>
                      {/* <div className="col-md">
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
  const res = await fetch("http://localhost:8000/recordings");
  const data = await res.json();
  //console.log(data.users);

  return {
    props: {
      resRecordings: data,
    },
  };
}
