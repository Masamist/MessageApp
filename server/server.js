const app = require('./app')

// Start server
const port = 5000
app.listen(port, () => {
  console.log(`Server is runnning on port ${port}...`)
})
