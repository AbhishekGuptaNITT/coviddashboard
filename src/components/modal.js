import React,{Component,useState} from 'react'
import axios from 'axios'
import { Table,Button,Modal } from 'react-bootstrap';

const Example = (props) => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const body = (
        props.content.map((val,ind) => {
            return(
                <tr>
                    <td>{ind+1}</td>
                    <td>
                        {val.date}
                    </td>
                    <td>{val.available_capacity}</td>
                    <td>{val.min_age_limit}</td>
                </tr>
            )
        })
    )
    let table = (
        <Table>
            <thead>
                <tr>
                    <td>Session</td>
                    <td>Date</td>
                    <td>Availablity</td>
                    <td>Age limit</td>
                </tr>
            </thead>
            <tbody>
                {body}
            </tbody>
        </Table>
    )
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Scan center
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.heading}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{table}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export default Example