import axios from 'axios'
import React from 'react'

const axiosIns2 = axios.create({
    baseURL:'https://api.demo.co-vin.in/api/',
})

export default axiosIns2