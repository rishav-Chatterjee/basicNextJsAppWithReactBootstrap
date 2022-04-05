import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import styles from "../../styles/Users.module.css";
const recordingDetails = ({ resRecordingDetails }) => {
  return (
    <div className="container my-4">
      <Card className={styles.cardMargin}>
        <Card.Img variant="top" />
        <Card.Body>
          <Card.Title>{resRecordingDetails.meeting_file_url}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem className="text-center">
            <span className="px-2">File Size</span>
            <span>{resRecordingDetails.file_size}</span>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
};

export default recordingDetails;

export async function getStaticPaths() {
  const response = await fetch("http://localhost:8000/recordings");
  const data = await response.json();
  //console.log(data);
  const paths = data.map((recording) => {
    return {
      params: {
        recordingId: recording.id,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

/* export async function getStaticProps(context) {
  const { params } = context;
  //console.log(params);
  const res = await fetch(
    `http://localhost:3000/data.json?user_id=${params.userId}`
  );
  console.log(res);
  const data = await res.json();
  //const users = data.users;
  const userData = users.filter(function (users) {
    return users["user_id"] == params.userId;
  })[0];
  //console.log(userData);
  return {
    props: {
      resUsersDetails: userData,
    },
  };
} */

export async function getStaticProps(context) {
  const { params } = context;
  const response = await fetch(
    `http://localhost:8000/recordings/${params.recordingId}`
  );
  //console.log(response);
  const recordings = await response.json();
  //console.log(users);
  return {
    props: {
      resRecordingDetails: recordings,
    },
  };
}
