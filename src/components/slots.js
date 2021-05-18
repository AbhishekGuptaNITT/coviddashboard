import React,{Component} from 'react'
import axios from 'axios'
import { Table,Button } from 'react-bootstrap';
import Modal from './modal'

const slots = (props) => {
    console.log(props);
    let centers = props.centers.map((val,ind) => {
        let amt = val.sessions.map((val2,ind) => {
            return parseInt(val2.available_capacity_dose1)+parseInt(val2.available_capacity_dose2)
        })
        let p  = 0;
        for(let i=0;i<amt.length;i++)
            p = p+parseInt(amt[i]);
        amt = p;
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
                                <th>Status</th>
                                <th>Center Name</th>
                                <th>Address</th>
                                <th>Select</th>
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