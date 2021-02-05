import React from 'react'
import { Jumbotron,Row } from 'react-bootstrap'
const Aboutus = (props) => {
    return(
        
        <Jumbotron style={{margin:'50px 25px',background:'black',color:'skyblue'}}>
            <h1 className='display-4'>Covid dashboard</h1>
            <p className='h4 text-success'>
                <u><i>Created with care by an NIT-Trichyian</i></u>
            </p>
        </Jumbotron>
        
    )
}

export default Aboutus