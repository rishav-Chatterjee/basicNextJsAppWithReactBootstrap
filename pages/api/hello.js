// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const response = fetch("http://localhost:8000/users");
const dataString = JSON.stringify(response);

export default function handler(req, res) {
  const data = res.status(200).json(dataString);
  console.log(data);
}
