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
                    <td>{val.date}</td>
                    <td>{val.available_capacity_dose1}</td>
                    <td>{val.available_capacity_dose2}</td>
                    <td>{val.vaccine}</td>
                    <td>{val.min_age_limit}</td>
                </tr>
            )
        })
    )
    let table = (
      <React.Fragment>
        <Table striped hover variant="light" size='lg' responsive>
            <thead>
                <tr>
                    <td>Date</td>
                    <td>Slot</td>
                    <td>Slot</td>
                    <td>Vaccine</td>
                    <td>Age limit</td>
                </tr>
            </thead>
            <tbody>
                {body}
            </tbody>
        </Table>
        <a href='https://selfregistration.cowin.gov.in/' target='_blank' className='btn btn-success btn-block'>Book Slot</a>
      </React.Fragment>
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
          <Button variant='light' onClick={props.fun} className=''>Refresh</Button>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export default Example