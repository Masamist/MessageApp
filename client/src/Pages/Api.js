// Note:
// I was going to separate the api function from each page component,
// however, I could not complete it.



// import axios from 'axios'

// export const getAllMessagesAPI = () => {
//   return new Promise((resolve, reject) => {
//     axios.get("http://localhost:5000/api/messages").then((err, result) => {
//       if(err){
//         reject(err)
//       } else {
//         resolve(result)
//       }
//     })
//   }) 
// }


// export const getMessageByIdAPI = (id) => {
//   return axios.get(`http://localhost:5000/api/messages/${id}`).then((res) => {
//     if (res.status === 200) return res.json()
//     else throw new Error("Invalid response")
//   })
// }