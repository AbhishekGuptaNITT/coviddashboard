import React,{Component} from 'react'
import axios from 'axios'

function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-')
  }
const fetchSlots = (id,date) => {
    date = convertDate(date).toString()
    let g = id.toString()
    if(g.length<3)
        g = '0'+g
    id=g;
    console.log(date);
    let url = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id='+id+'&date='+date

    axios.get(url).then((response) => {
        console.log(response)
    }).catch((error) => console.log(error))
}
const slots = (props) => {
    console.log(props);
    let slots = fetchSlots(props.id,props.date)
    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <h1 className='text-center bg-dark text-light'>Slots Available</h1>
                </div>
            </div>
        </div>
    )
}

export default slots