import { Button, Table } from "reactstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
const Agenda = (props) => {
  const apiUrl = "https://localhost:7291/api/Contact";
  const { setLoading } = props;
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState({
    Id: "",
    Nombre: "",
    Telefono: "",
  });
  const [modal, setModal] = useState(false);
  const handleModal = () => {
    setModal(!modal);
  };
  const getContacts = async () => {
    setLoading(false);
    await axios
      .get(apiUrl)
      .then((res) => {
        if (res.data.success) {
          setContacts(res.data.data);
        } else {
          alert(res.data.message);
          setContacts([]);
        }
      })
      .catch((error) => {
        console.log(error);
        setContacts([]);
      })
      .finally((_) => {
        setTimeout(() => {
          setLoading(true);
        }, 1000);
      });
  };
  const [disableField, setDisableField] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [operation, setOperation] = useState("");
  const realizeOperation = (operation, object) => {
    switch (operation) {
      case "create":
        setOperation(operation);
        setDisableField(false);
        setDisableButton(false);
        setContact({
          Id: "",
          Nombre: "",
          Telefono: "",
        });
        break;

      case "edit":
        setOperation(operation);
        setDisableField(false);
        setContact(object);
        setDisableButton(false);
        break;
      case "delete":
        setOperation(operation);
        setDisableField(true);
        setContact(object);
        setDisableButton(false);
        break;

      default:
        setOperation("");
        setDisableField(true);
        setContact(object);
        setDisableButton(true);
        break;
    }
    handleModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  useEffect(() => {
    getContacts();
  }, []);

  const submitPost = async () => {
    if (contact.Id === "" || contact.Id === undefined || contact.Id == null)
      delete contact.Id;

    const request = {
      operation: operation,
      stringify: JSON.stringify(contact),
    };
    axios
      .post(apiUrl, request)
      .then((res) => {
        console.log(res);
        handleModal();
        getContacts();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div>
        <h1>Contact module</h1>
        <br />
        <Button
          block
          color="primary"
          size="sm"
          outline
          onClick={() => realizeOperation("create")}
        >
          Add new contact
        </Button>
        <br />
        <br />
        <Table borderless hover responsive striped bordered>
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Contact Name</th>
              <th className="text-center">Phone Number</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((e) => (
              <tr key={e.Id}>
                <th className="text-center" scope="row">
                  {e.Id}
                </th>
                <td className="text-center">{e.Nombre}</td>
                <td className="text-center">{e.Telefono}</td>
                <td className="text-center">
                  <Button
                    color="info"
                    size="sm"
                    outline
                    onClick={() => realizeOperation("details", e)}
                  >
                    Details
                  </Button>
                  &nbsp;
                  <Button
                    color="success"
                    size="sm"
                    outline
                    onClick={() => realizeOperation("edit", e)}
                  >
                    Edit
                  </Button>
                  &nbsp;
                  <Button
                    color="danger"
                    size="sm"
                    outline
                    onClick={() => realizeOperation("delete", e)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal isOpen={modal}>
        <ModalHeader toggle={handleModal}>Contact Form</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label>Contact Name:</label>
            <input
              type="text"
              className="form-control"
              name="Nombre"
              onChange={handleChange}
              disabled={disableField}
              value={contact && contact.Nombre}
            />
            <label>Phone Number:</label>
            <input
              type="text"
              className="form-control"
              name="Telefono"
              onChange={handleChange}
              disabled={disableField}
              value={contact && contact.Telefono}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submitPost} hidden={disableButton}>
            Save Changes
          </Button>{" "}
          <Button color="danger" onClick={handleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Agenda;
