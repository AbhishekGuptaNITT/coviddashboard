import React,{ Component } from 'react'
import { Col, Navbar, NavbarBrand, Row,Alert, Spinner } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import Header from '../../components/header/header'
import Home from '../../components/home/home'
import axios from '../../components/axiosIns'
import firebase from 'firebase'
import Aboutus from '../aboutus'
import VaccineTracker from '../vaccineTracker/vaccineTracker'
class layout extends Component{
    state = {
        latestTotal:null,
        countryrequested:null,
    }
    homeDataFetch = () => {
        axios.get('/totals').then((response) => {
            this.setState({
               latestTotal: {...response.data[0]},
            })
        }).catch((error) => console.log(error))
    }
    countryDataFetch = (countryName) => {
        axios.get('/country',{
            params: {name: countryName},
        }).then(
            (response) => {
                this.setState({
                    countryrequested: {...response.data[0]},
                 })
            }
        )
    }
    countryListFetch = () => {
        axios.get('/help/countries').then(
            (response) => {
                const counlist = [
                    ...response.data
                ]
                this.setState({
                    countries:counlist,
                })
            }
        ).catch((error) => console.log(error))
    }
    render(){
        return(
            <div>
                <Header />
                {console.log(firebase.auth().currentUser)}
                {this.props.status ? <h1>Logged in</h1>: null}
                <Switch>
                    <Route path='/' exact>
                        <Home
                        dailydata={this.state.latestTotal} 
                        dailyhandler={this.homeDataFetch}
                        countryList={this.countryListFetch}
                        countries={this.state.countries}
                        countryDataHandler = {this.countryDataFetch}
                        countryrequested={this.state.countryrequested}
                        />
                    </Route>
                    <Route path='/about-us' exact>
                        <Aboutus />
                    </Route>
                    <Route path='/vaccine-tracker/' exact>
                        {/* <VaccineTracker /> */}
                        <div style={{textAlign:'center',margin:'25px',padding:'15px',boxShadow:'2px 2px 4px grey'}}>
                            <h2>hey, On the spot vaccination is allowed now!</h2>
                        </div>
                    </Route>
                    <Route>
                        <Alert variant='warning'>
                            <Alert.Heading>
                                404 error
                            </Alert.Heading>
                            <p>
                                Page not found
                            </p>
                        </Alert>
                    </Route>
                </Switch>
                

            </div>
        )
    }
}

export default layout