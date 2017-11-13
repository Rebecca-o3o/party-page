const express = require('express'),
      path = require('path'),
      app = express()

//SERVE STATIC FILES
app.use(express.static(path.resolve(__dirname, '../react-ui/build')))

//SERVE API
app.get('/api', function (req, res){
  res.json({
    message: 'Welcome to the API'
  })
})

//All remaining requests return the React app, so it can handle routing.
app.get('*', (request, response) => {
  res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'))
})

//START SERVER
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})