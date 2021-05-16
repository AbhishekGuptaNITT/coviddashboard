import React,{Component} from 'react'
import { Jumbotron,Row,Card,Spinner,Form,Button } from 'react-bootstrap'
import axiosIns from './axiosVaccineTracker'
import axios from 'axios'
import Slots from '../../components/slots'

import {Route} from 'react-router-dom'
class VaccineTracker extends Component{
    
   convertDate = (inputFormat) => {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-')
    }

    fetchSlots = () => {
        let id = this.state.district_id,date = this.state.date
        date = this.convertDate(date).toString()
        let g = id.toString()
        if(g.length<3)
            g = '0'+g
        id=g;
        console.log(date);
        let url = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id='+id+'&date='+date
    
        axios.get(url).then((response) => {
            this.setState({
                centers:response.data.centers
            })
        }).catch((error) => console.log(error))
    }
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
        district_id:null,
        date:null,
        disp:0,
        centers:null,
    }
    updateDistrict = () => {
        let x = document.getElementById('districtman').value;
        let i = 0,district_id=0;
        for(i=0;i<this.state.districts.length;i++){
            if(x==this.state.districts[i].district_name)
            {
                console.log(this.state.districts[i]);
                district_id=this.state.districts[i].district_id;
                break;
            }
        }
        this.setState({
            district_id:district_id
        })
    }
    updateDate = () => {
        this.setState({
            date:document.getElementById('date').value
        })
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
                // console.log(response)
                this.setState({
                    state_id:state_id,
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
    getSlots = () => {
        axiosIns.get('/v2/appointment/sessions/public/calendarByDistrict',{
            params:{
                district_id:this.state.district_id,
                date:this.state.date,
            }
        }).then((response) => {
            console.log(response)
        }).catch((error) => console.log(error))
    }
    render(){
        let myvar="primary"
        let msg = "Fill above Details to find slots"
        if(this.state.district_id && this.state.state_id && this.state.date && !this.state.disp){
            msg="Filled!"
            myvar="success"
            this.setState({disp:1})
        }
        if(this.state.district_id && this.state.state_id && this.state.date){
            msg="Filled! click me to search slots"
            myvar="success"
        }
        console.log(this.state);
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
                        <option disabled selected value> -- select an option -- </option>
                    </Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId="select">
                    <Form.Label>Select District</Form.Label>
                    <Form.Control as="select" id='districtman' onChange={this.updateDistrict}>
                        {this.districtoptions}
                        <option disabled selected value> -- select an option -- </option>
                    </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="select">
                    <Form.Label>Date</Form.Label><br></br>
                        <input type='date' name='date' id='date' onChange={this.updateDate}></input>
                    </Form.Group>
                    <Button variant={myvar} type="button" onClick={this.fetchSlots}>
                        {msg}
                    </Button>
                </Form>
            )
        }
        
        // console.log(this.state);
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
                {this.state.centers ? <Slots centers={this.state.centers}/> : null}
        </React.Fragment>
        )
    }
}

export default VaccineTracker