import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { format } from 'date-fns'

// Styles
import './View.css'

const View = () => {
  const [message, setMessage] = useState({})
  const { id } =useParams()
  // const [startDate, setStartDate] = useState()
  // const [endDate, setEndDate] = useState()


  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/${id}`)
    .then((resp) => {
    // setMessage({...resp.data[0]}))
      let startDate = resp.data[0].start_date ? format(new Date(resp.data[0].start_date), 'yyy-MM-dd') : ''
      let endDate = resp.data[0].end_date ? format(new Date(resp.data[0].end_date), 'yyy-MM-dd') : ''
        
      // console.log(startDate)
      setMessage({
        admin_title: resp.data[0].admin_title, 
        country_code: resp.data[0].country_code, 
        text_message: resp.data[0].text_message, 
        start_date: startDate,
        end_date: endDate
      })
    })
  }, [id])

  //startDate = format(new Date(message.start_date), 'yyy-MM-dd')
  // const endDate = message.end_date ? format(new Date(message.end_date), 'yyy-MM-dd') : ''

  return (
    <div style={{ marginTop: "150px"}}>
      <div className='card'>
        <div className='card-header'>
          <p>Message Detail</p>
        </div>
        <div className='container'>
        <strong>ID:</strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Administrator Title:</strong>
          <span>{message.admin_title}</span>
          <br />
          <br />
          <strong>Country Code:</strong>
          <span>{message.country_code}</span>
          <br />
          <br />
          <strong>Text Message:</strong>
          <span>{message.text_message}</span>
          <br />
          <br />
          <strong>Start Date:</strong>
          <span>{message.start_date}</span>
          <br />
          <br />
          <strong>End Date:</strong>
          <span>{message.end_date}</span>
          <br />
          <br />
          <Link to="/">
            <div className='btn btn-edit'>Go Back</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default View