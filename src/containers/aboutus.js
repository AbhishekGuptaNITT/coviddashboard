import React from 'react'
import { Jumbotron,Row } from 'react-bootstrap'
const Aboutus = (props) => {
    return(
        
        <Jumbotron style={{margin:'50px 25px',background:'black',color:'skyblue'}}>
            <h1 className='display-4'>Covid dashboard</h1>
            <p className='h4 text-success'>
                <i>Created with care</i>
                <br>
                </br>
                <b>Contact <a href='https://www.linkedin.com/in/abhishek-gupta-6a1544191/' target='__blank'>Developer Linkedin</a> </b>
            </p>
        </Jumbotron>
        
    )
}

export default Aboutus