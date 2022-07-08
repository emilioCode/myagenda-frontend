import { Button, Table } from "reactstrap";
import axios from "axios";
import { useEffect, useState } from "react";

const Agenda = () => {
  const [data, setData] = useState([]);
  const getContacts = async () => {
    await axios
      .get("https://localhost:7291/api/Contact")
      .then((res) => {
        if (res.data.success) {
          setData(res.data.data);
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => console.log(error));
    // .finally((_) => {
    //   setTimeout(() => {
    //     setLoading(true);
    //   }, 1000);
    // });
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div>
      <h1>Contact module</h1>
      <br />
      <Button color="primary" size="sm" outline>
        Add new contact
      </Button>
      <br />
      <Table borderless hover responsive striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Contact Name</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, index) => (
            <tr key={index}>
              <th scope="row">{e.id}</th>
              <td>{e.nombre}</td>
              <td>{e.telefono}</td>
              <td>
                <Button color="info" size="sm" outline>
                  Details
                </Button>
                &nbsp;
                <Button color="success" size="sm" outline>
                  Edit
                </Button>
                &nbsp;
                <Button color="danger" size="sm" outline>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Agenda;
