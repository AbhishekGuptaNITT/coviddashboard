import React,{Component} from 'react'
import axios from 'axios'
import { Table } from 'react-bootstrap';

const slots = (props) => {
    console.log(props);
    let centers = props.centers.map((val,ind) => {
        return(
            <tr>
                <td>{val.name}</td>
                <td>{val.address}</td>
                <td>{val.sessions[0].date}</td>
                <td>{val.sessions[0].min_age_limit}</td>
                <td>{val.sessions[0].vaccine}</td>
            </tr>
        )
    })
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col'>
                    <Table striped bordered hover variant="light" responsive>
                        <thead>
                            <tr>
                                <th>Center Name</th>
                                <th>Address</th>
                                <th>Date</th>
                                <th>Min Age</th>
                                <th>Vaccine</th>
                            </tr>
                        </thead>
                        <tbody>
                            {centers}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default slots