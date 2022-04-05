import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

import styles from "../../../styles/Users.module.css";
const userDetails = ({ resUsersDetails }) => {
  console.log(resUsersDetails);
  const userImg = resUsersDetails.photo;
  //console.log(userImg);
  return (
    <div className="container my-4">
      <Card className={styles.cardMargin}>
        <div
          style={{ backgroundImage: `url(${userImg})` }}
          className={styles.backgroundImg}
        ></div>
        <Card.Body>
          <Card.Title>{resUsersDetails.name}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem className="text-center">
            <span className="px-2">Email</span>
            <span>{resUsersDetails.email}</span>
          </ListGroupItem>
          <ListGroupItem className="text-center">
            <span className="px-2">Mobile</span>
            <span>{resUsersDetails.mobile}</span>
          </ListGroupItem>
          <ListGroupItem className="text-center">
            <span className="px-2">Address</span>
            <span>{resUsersDetails.address}</span>
          </ListGroupItem>
          <ListGroupItem className="text-center">
            <span className="px-2">Date of Birth</span>
            <span>{resUsersDetails.dob}</span>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </div>
  );
};

export default userDetails;

export async function getStaticPaths() {
  const response = await fetch("http://localhost:8000/users");
  const data = await response.json();
  //console.log(data);
  const paths = data.map((user) => {
    return {
      params: {
        userId: user.id,
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
  const response = await fetch(`http://localhost:8000/users/${params.userId}`);
  console.log(response);
  const users = await response.json();
  //console.log(users);
  return {
    props: {
      resUsersDetails: users,
    },
  };
}
