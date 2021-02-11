import React,{ Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Layout from './layout/layout'
class App extends Component{
  render(){
    return(
      <BrowserRouter>
        {alert('Unnfortunately this webapp is no longer maintained!')}
        <Layout>
        </Layout>
      </BrowserRouter>
    )
  }
}

export default App