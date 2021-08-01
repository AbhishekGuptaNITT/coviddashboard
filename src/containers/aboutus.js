import React from 'react'
import { Jumbotron,Row } from 'react-bootstrap'
import logo from '../assets/logo.png'
const Aboutus = (props) => {
    return(
        
        <Jumbotron style={{margin:'50px 25px',background:'#ecf0f1',color:'#34495e'}}>
            <img src={logo} height='100px'></img>
            <h1 className='display-4'>Productify Me</h1>
            <p className='text-dark'>
                Created with care
                <br>
                </br>
                <h4><u><a href='https://www.linkedin.com/in/abhishek-gupta-6a1544191/' target='__blank'>developer on Linkedin</a></u> </h4>
            </p>
        </Jumbotron>
        
    )
}

export default Aboutus