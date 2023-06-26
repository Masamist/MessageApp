import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { format } from 'date-fns'

// Styles
import './View.css'

const View = () => {
  const [message, setMessage] = useState({})
  const { id } =useParams()
  
  const RDS_default_time = '1899-11-30'

  useEffect(() => {
    axios.get(`http://localhost:5000/api/messages/${id}`)
    .then((resp) => {
    // setMessage({...resp.data[0]}))
      let startDate = resp.data[0].start_date ? format(new Date(resp.data[0].start_date), 'yyy-MM-dd') : ''
      let endDate = resp.data[0].end_date ? format(new Date(resp.data[0].end_date), 'yyy-MM-dd') : ''
      endDate = endDate === RDS_default_time ? null : endDate
      // console.log(endDate)

      setMessage({
        admin_title: resp.data[0].admin_title, 
        country_code: resp.data[0].country_code, 
        text_message: resp.data[0].text_message, 
        start_date: startDate,
        end_date: endDate
      })
    })
  }, [id])

  return (
    <div>
      <div className='card card-view'>
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
            <div className='btn btn-goback'>Go Back</div>
          </Link>
          <br />
        </div>
      </div>
    </div>
  )
}

export default View