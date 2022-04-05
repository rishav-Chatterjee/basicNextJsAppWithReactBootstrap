import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import styles from "../../styles/Users.module.css";
const meetingDetails = ({ resMeetingDetails }) => {
  return (
    <div className="container my-4">
      <Card className={styles.cardMargin}>
        <Card.Img variant="top" />
        <Card.Body>
          <Card.Title>{resMeetingDetails.title}</Card.Title>
          <Card.Text>{resMeetingDetails.description}</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem className="text-center">
            <span className="px-2">Meeting date</span>
            <span>{resMeetingDetails.meeting_date}</span>
          </ListGroupItem>
          <ListGroupItem className="text-center">
            <span className="px-2">Meeting Status</span>
            <span>{resMeetingDetails.meeting_status}</span>
          </ListGroupItem>
          <ListGroupItem className="text-center">
            <span className="px-2">Recorded</span>
            <span>{resMeetingDetails.is_recorded}</span>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
};

export default meetingDetails;

export async function getStaticPaths() {
  const response = await fetch("http://localhost:8000/meetings");
  const data = await response.json();
  //console.log(data);
  const paths = data.map((meeting) => {
    return {
      params: {
        meetingId: meeting.id,
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
    `http://localhost:8000/meetings/${params.meetingId}`
  );
  //console.log(response);
  const meetings = await response.json();
  //console.log(users);
  return {
    props: {
      resMeetingDetails: meetings,
    },
  };
}
