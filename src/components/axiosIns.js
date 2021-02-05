import axios from 'axios'
import React from 'react'

const axiosIns = axios.create({
    baseURL:'https://covid-19-data.p.rapidapi.com/',
    headers: {
        'x-rapidapi-key': 'd9df164fd7msh056130385103015p106ed5jsn988c0b750246',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
      }
})

export default axiosIns