import React from 'react'
import { CardDeck,Card, Col, Row,CardGroup, Form,Button,Badge,Spinner } from 'react-bootstrap'
import daily from '../../assets/daily.svg'
import total from '../../assets/total.svg'
import axios from '../axiosIns'
import origaxios from 'axios'
const Home = (props) => {
    if(!props.dailydata){
        props.dailyhandler();
        const to = setTimeout(props.countryList,2000)
    }
    else{
        const int = setInterval(props.dailyhandler,60*1000*5)
    }
    let dailyContent = props.dailydata ? (
        <div>
                <Button type='button' className='btn-block' variant='warning'>
                   Confirmed:  <Badge variant='light'> {props.dailydata.confirmed} </Badge>
                </Button>
                <Button type='button' className='btn-block' variant='danger'>
                    Critical: <Badge variant='light'>{props.dailydata.critical}</Badge>
                </Button>
                <Button type='button' className='btn-block' variant='dark'>
                    Deaths: <Badge variant='light'>{props.dailydata.deaths}</Badge>
                </Button>
                <Button type='button' className='btn-block' variant='success'>
                    Recovered: <Badge variant='light'>{props.dailydata.recovered}</Badge>
                </Button>
        </div>
    ) : (

        <Spinner animation="border" role="status" style={{width:'100',margin:'auto',display:'block'}}>
            <span className="sr-only">Loading...</span>
        </Spinner>
    )
    let countrycontent = <h1>hi</h1>
    const fetchcountrydata = () => {
        const cname = document.getElementById('fetchme').value
        props.countryDataHandler(cname)
        
    }
    countrycontent = props.countryrequested ? (
        <div style={{margin:'auto'}}>
                <Button type='button' className='btn-block' variant='warning'>
                   Confirmed:  <Badge variant='light'> {props.countryrequested.confirmed} </Badge>
                </Button>
                <Button type='button' className='btn-block' variant='danger'>
                    Critical: <Badge variant='light'>{props.countryrequested.critical}</Badge>
                </Button>
                <Button type='button' className='btn-block' variant='dark'>
                    Deaths: <Badge variant='light'>{props.countryrequested.deaths}</Badge>
                </Button>
                <Button type='button' className='btn-block' variant='success'>
                    Recovered: <Badge variant='light'>{props.countryrequested.recovered}</Badge>
                </Button>
        </div>
    ) : (

        <span className='text-muted'><b>no country selected!</b></span>
    )
    let countryform = (
        <Spinner animation="border" role="status" style={{width:'100',margin:'auto',display:'block'}}>
            <span className="sr-only">Loading...</span>
        </Spinner>
    )
    let options = null;
    if(props.countries){
        options = (
            props.countries.map((val,ind) => <option key={ind}>{val.name}</option>)
        )
    }
    if(options){
        countryform = (
                        <Form>
                            <Form.Group controlId="select">
                            <Form.Label>Select Country</Form.Label>
                            <Form.Control as="select" id='fetchme'>
                                {options}
                            </Form.Control>
                            </Form.Group>
                            <Button variant="primary" type="button" onClick={fetchcountrydata}>
                                Fetch
                            </Button>
                        </Form>
        )
    }
    const clickHandler = () => {
        const obj = {
            email:document.getElementById('uemail').value,
            rating:document.getElementById('urating').value,
            message:document.getElementById('umessage').value
        }
        origaxios.post('https://covid19-75af9-default-rtdb.firebaseio.com/feedback.json',obj).then(
            () => {
                document.getElementById('myfeedback').reset()
                alert('feedback sent!')
            }
        )
    }
    return(
            <CardGroup style={{margin:'10px auto',width:'90%'}}>
                <Card>
                    <Card.Header>World Update</Card.Header>
                    <Card.Img
                     variant="top"
                     src={total} 
                     style={{padding:'50px',maxWidth:'50%',margin:'auto'}} />
                    <Card.Body>
                    <Card.Title>Data:-</Card.Title>
                    <Card.Text>
                        {dailyContent}                        
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">data is updated every 5 minutes</small>
                    </Card.Footer>
                </Card>
                <Card>
                    <Card.Header>Countrywise Data</Card.Header>
                    <Card.Body>
                    <Card.Title>
                        {countryform}
                    </Card.Title>
                    <Card.Text>
                        {countrycontent}
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">data is updated every 5 minutes</small>
                    </Card.Footer>
                </Card>
                <Card bg='light' text='dark'>
                    <Card.Header>
                        Write Something to developer
                    </Card.Header>
                    <Card.Body>
                    <Card.Title>Hey develper, </Card.Title>
                    <Card.Text>
                        <Form id='myfeedback'>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>My Email address is</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" id='uemail' />
                                <Form.Text className="text-muted">
                                in case we would like to chat
                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicRange">
                                <Form.Label>I rate this project as</Form.Label>
                                <Form.Control type="range" id='urating' />
                            </Form.Group>
                            <Form.Group controlId="formBasicRange">
                                <Form.Label>I wanted to tell you...</Form.Label>
                                <Form.Control as='textarea' placeholder='message here' id='umessage' />
                            </Form.Group>
                            <Button variant="danger" type="button" onClick={clickHandler}>
                                Send
                            </Button>
                        </Form>
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-danger">thanks for visiting :)</small>
                    </Card.Footer>
                </Card>
            </CardGroup>
    )
}

export default Home
