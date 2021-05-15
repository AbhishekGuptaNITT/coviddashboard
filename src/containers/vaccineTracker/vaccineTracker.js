import React,{Component} from 'react'
import { Jumbotron,Row,Card,Spinner,Form,Button } from 'react-bootstrap'
import axiosIns from './axiosVaccineTracker'

import {Route} from 'react-router-dom'
class VaccineTracker extends Component{

    componentDidMount(){
        console.log('mounted')
        if(!this.state.states)
            this.fetchstate();
    }
    fetchstate = () => {
        axiosIns.get('/v2/admin/location/states').then(
            (response) => {
                // console.log(response)
                this.setState({
                    states:response.data.states
                })
            }
        ).catch(
            (error) => console.log(error)
        )
    }
    state = {
        states:null,
        districts:null,
        state_id:null,
    }
    fetchdistricts = () => {
        var statename = document.getElementById('stateman').value
        let state_id=0;
        for(let i=0;i<this.state.states.length;i++){
            if(this.state.states[i].state_name==statename){
                state_id = this.state.states[i].state_id;
                break;
            }
        }
        let path = '/v2/admin/location/districts/'+state_id;

        axiosIns.get(path).then(
            (response) => {
                console.log(response)
                this.setState({
                    districts:response.data.districts
                })
            }
        ).catch(
            (error) => console.log(error)
        )
    }
    stateoptions = null
    districtoptions = null
    
    locform = (
        <Spinner animation="border" role="status" style={{width:'100',margin:'auto',display:'block'}}>
            <span className="sr-only">Loading...</span>
        </Spinner>
    )

    render(){
        if(this.state.districts){
            this.districtoptions = this.state.districts.map((val,ind) => <option key={val.district_id}>{val.district_name}</option>)
        }
        if(this.state.states){
            this.stateoptions = this.state.states.map((val,ind) => <option key={val.state_id}>{val.state_name}</option>)
            this.locform =  (
                <Form>
                    <Form.Group controlId="select">
                    <Form.Label>Select State</Form.Label>
                    <Form.Control as="select" id='fetchme' onChange={this.fetchdistricts} id='stateman'>
                        {this.stateoptions}
                    </Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId="select">
                    <Form.Label>Select District</Form.Label>
                    <Form.Control as="select" id='fetchme2' id='districtman'>
                        {this.districtoptions}
                    </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={this.clicked}>
                        Fetch
                    </Button>
                </Form>
            )
        }
        console.log(this.state);
        return(
        <React.Fragment>
                <Jumbotron style={{margin:'25px'}}>
                    <div className='h1' style={{textAlign:'center'}}>Vaccine Tracker</div>
                    <Card>
                    <Card.Header>Data is updated after every 30 mins from govt servers</Card.Header>
                    <Card.Body>
                    <Card.Title>
                        
                    </Card.Title>
                    <Card.Text>
                        {this.locform}
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">Always wear a mask</small>
                    </Card.Footer>
                    </Card>
                </Jumbotron>
        </React.Fragment>
        )
    }
}

export default VaccineTracker