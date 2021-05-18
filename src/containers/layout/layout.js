import React,{ Component } from 'react'
import { Col, Navbar, NavbarBrand, Row,Alert } from 'react-bootstrap'
import { Route, Switch } from 'react-router-dom'
import Header from '../../components/header/header'
import Home from '../../components/home/home'
import axios from '../../components/axiosIns'
import Aboutus from '../aboutus'
import VaccineTracker from '../vaccineTracker/vaccineTracker'
import Push from 'push.js'
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
        // console.log(this.state);
        Push.create("Hello world!", {
            body: "How's it hangin'?",
            icon: '/icon.png',
            timeout: 4000,
            vibrate: [400,200],
            onClick: function () {
                window.focus();
                this.close();
            }
        });
        return(
            <div>
                <Header />
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
                        <VaccineTracker />
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