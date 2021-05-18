import React,{Component} from 'react'
import axios from 'axios'
import { Table,Button } from 'react-bootstrap';
import Modal from './modal'

const slots = (props) => {
    console.log(props);
    let centers = props.centers.map((val,ind) => {
        let amt = 0;
        amt = parseInt(amt + val.sessions.map((val,ind) => {
            return parseInt(val.available_capacity_dose1)+parseInt(val.available_capacity_dose2)
        }))
        let status = amt==0 ? 'Booked' : 'Available';

        let sts = status + ' ' + amt;
        let x = amt!=0 ? 'bg-success text-light' : null;
        return(
            <tr>
                <td className={x}>{sts}</td>
                <td>{val.name}</td>
                <td>{val.address}</td>
                <td>
                    <Modal heading={val.name} content={val.sessions} fun={props.fun} />
                </td>
            </tr>
        )
    })
    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col'>
                    <Table striped bordered hover variant="light" responsive id='tab'>
                        <thead>
                            <tr>
                                <td>Status</td>
                                <th>Center Name</th>
                                <th>Address</th>
                                <th>Select Center</th>
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