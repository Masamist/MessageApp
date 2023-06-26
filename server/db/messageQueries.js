const pool = require('../db_config')

exports.sqlGetAllMessages = () => {
  return new Promise((resolve, reject) => {
    const getMessageQuery = 'SELECT * FROM messages'
    pool.query(getMessageQuery, (err, result) => {
      if(err){
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

exports.sqlGetMessage = (id) => {
  return new Promise((resolve, reject) => {
    const getMessageQuery = "SELECT * FROM messages WHERE id = ?"
    pool.query(getMessageQuery, id, (err, result) => {
      if(err){
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}
// not working
exports.sqlCreateMessage = (messages) => {
  return new Promise((resolve, reject) => {
    // console.log(messages)
    const createMessageQuery = "INSERT INTO messages SET ?"
    pool.query(createMessageQuery, messages, (err, result) => {
      if(err){
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

// not working 
exports.sqlUpdateMessage = (messages, id) => {
  // const { admin_title, country_code, text_message, start_date, end_date } = message
  return new Promise((resolve, reject) => {
    const updateMessageQuery = "UPDATE messages SET ?  WHERE id = ?"
    pool.query(updateMessageQuery, [messages, id], (err, result) => {
      if(err){
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}


exports.sqlDeleteMessage = (id) => {  
  const deleteMessageQuery = "DELETE FROM messages WHERE id = ?"
  pool.query(deleteMessageQuery, id, (error, result) => {
    if(error){
      console.log(error)
    }
  }) 
}
