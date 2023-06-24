import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { format } from 'date-fns'

// Styles
import './CreateEdit.css'
import { toast } from "react-toastify"

const initialState = {
  admin_title: "",
  country_code: "",
  text_message: "",
  start_date: "", 
  end_date: ""
}

const CreateEdit = () => {

  const[state, setState] = useState(initialState)
  const { admin_title, country_code, text_message, start_date, end_date } = state

  const navigate = useNavigate()

  const {id} = useParams()
  
  // Original
  useEffect(() => {
    if(id){
      axios.get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => {
        // setState({...resp.data[0]})
        let startDate = resp.data[0].start_date ? format(new Date(resp.data[0].start_date), 'yyy-MM-dd') : ''
        let endDate = resp.data[0].end_date ? format(new Date(resp.data[0].end_date), 'yyy-MM-dd') : ''
        
        // console.log(startDate)
        setState({
          admin_title: resp.data[0].admin_title, 
          country_code: resp.data[0].country_code, 
          text_message: resp.data[0].text_message, 
          start_date: startDate,
          end_date: endDate
        })
      })
    }
  }, [id])


  const handleSubmit = (e) => {
    e.preventDefault()
    
    if(!admin_title || !country_code || !text_message || !start_date) {
      toast.error("Please provide value into each input field")
    }else{
      if(!id){
        axios.post("http://localhost:5000/api/post", {
          admin_title,
          country_code,
          text_message,
          start_date,
          end_date
        }).then(() => {
          setState({admin_title: "", country_code: "", text_message: "", start_date: "", end_date: ""})
        }).catch((err) => toast.error(err.response.data))
        toast.success("Message is created successfully")
        setTimeout(() => navigate("/"), 500)
      } else {
        axios.put(`http://localhost:5000/api/update/${id}`, {
          admin_title,
          country_code,
          text_message,
          start_date,
          end_date
        }).then(() => {
          setState({admin_title: "", country_code: "", text_message: "", start_date: "", end_date: ""})
        }).catch((err) => toast.error(err.response.data))
        toast.success("Message is updated successfully")
        setTimeout(() => navigate("/"), 500)
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setState({...state, [name]: value})
  }

  return (
    <div style={{marginTop: "50px"}}>
      <form 
        style={{margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center"}}
        onSubmit={handleSubmit}
      >
        <label htmlFor="admin_title">Administrator Title</label>
        <input 
          type="text" 
          id="admin_title" 
          name="admin_title"
          value={admin_title||""}
          onChange={handleInputChange} 
          // onChange={(e) => setAdmin_title(e.target.value)} 
        />

        <label htmlFor="country_code">Country Code</label>
        <input 
          type="text" 
          id="country_code" 
          name="country_code"
          value={country_code||""}
          onChange={handleInputChange} 
        />

        <label htmlFor="text_message">Text Message</label>
        <input 
          type="text" 
          id="text_message" 
          name="text_message"
          value={text_message||""}
          onChange={handleInputChange} 
        />

        <label htmlFor="start_date">Start Date</label>
        <input 
          type="date" 
          id="start_date" 
          name="start_date"
          value={start_date||""}
          onChange={handleInputChange} 
        />

        <label htmlFor="end_date">End Date</label>
        <input 
          type="date" 
          id="end_date" 
          name="end_date"
          value={end_date||""}
          onChange={handleInputChange} 
        />
        <input type="submit" value={id ? "Update" : "Save"} />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  )
}

export default CreateEdit