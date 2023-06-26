const messageQueries = require('../db/messageQueries')

// test
  exports.getAllMessages = async(req, res) => {
    try {
      await messageQueries.sqlGetAllMessages().then(result => {
        res.json(result)
      })
    } catch(err) {
      console.log(err)
    }
  }

  exports.getMessage = async(req, res) => {
    try {
      await messageQueries.sqlGetMessage(req.params.id).then(result => {
        res.json(result)
      })
    } catch(err) {
      console.log(err)
    }
  }

exports.createMessage = async(req, res) => {
    try {
      await messageQueries.sqlCreateMessage(req.body).then(result => {
        res.json(result)
      })
    } catch(err) {
      console.log(err)
    }
  }

exports.updateMessage = async(req, res) => {
  try {
    await messageQueries.sqlUpdateMessage(req.body, req.params.id).then(result => {
      res.json(result)
    })
  } catch(err) {
    console.log(err)
  }
}

exports.deleteMessage = async(req, res) => {
  try {
    await messageQueries.sqlDeleteMessage(req.params.id)
    res.status(200).json({
      status:'deleted',
      data: null
    })
  } catch (err) {
    res.status(404).json({
      status:'fail',
      message: err
    })
  }
}
