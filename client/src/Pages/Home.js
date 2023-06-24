import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { format } from 'date-fns'

// styles
import './Home.css'
import  { toast } from 'react-toastify'

const Home = () => {

  const [ data, setData ] = useState([])
  const RDS_default_time = '1899-11-30'

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/api/get")
    setData(response.data)
  }
  useEffect(() => {
    loadData()
  }, [])
  const deleteMessage = (id) => {
    if(window.confirm("Are you sure you want to delete this message?")){
      axios.delete(`http://localhost:5000/api/remove/${id}`)
      toast.success("The message is deleted successfully")
      setTimeout(() => loadData(), 500)
    }
  }

  return (
    <div>
      <div className='btn-create-container'>
        <div>
          <Link to="/create">
            <button className='btn btn-create'>+ Create New Message</button>
          </Link>
        </div>
        
      </div>

      <table className='style-table'>
        <thead>
          <tr>
            <th style={{textAlign: "center"}}>No</th>
            <th style={{textAlign: "center"}}>Administrator Title</th>
            <th style={{textAlign: "center"}}>Country Code</th>
            <th style={{textAlign: "center"}}>Text Messages</th>
            <th style={{textAlign: "center"}}>Start Date</th>
            <th style={{textAlign: "center"}}>End Date</th>
            <th style={{textAlign: "center"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const startDate = format(new Date(item.start_date), 'yyyy-MM-dd')
            let endDate = format(new Date(item.end_date), 'yyyy-MM-dd')
            // console.log(endDate)
            endDate = endDate === RDS_default_time ? null : endDate
            return (
              <tr key={item.id}>
                <th scope="row">{index+1}</th>
                <td>{item.admin_title}</td>
                <td>{item.country_code}</td>
                <td>{item.text_message}</td>
                <td>{startDate}</td>
                <td>{endDate}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className='btn btn-edit'>Edit</button>
                  </Link>

                  <button className='btn btn-delete' onClick={()=> deleteMessage(item.id)}>Delete</button>

                  <Link to={`/view/${item.id}`}>
                    <button className='btn btn-view'>View</button>
                  </Link>

                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Home
