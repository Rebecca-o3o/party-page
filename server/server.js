const express = require('express'),
      path    = require('path'),
      app     = express()

const db = require('../database/dbqueries')

app.use(require('body-parser').json())

//SERVE STATIC FILES
app.use(express.static(path.resolve(__dirname, '../react-ui/build')))

//SERVE API
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to the API'
  })
})

app.get('/api/users', (req, res) => {
  db.getAllUsers().then(function(result){

    res.json({
      users: result
    })
  })
    .catch(function(err){
      res
        .status(500)
        .json({success: false})
      console.log(err)
    })
})


app.post('/api/confirmation', function(req,res){

  //TODO: check if all true
  const {userId, confirmationCode, dinner, party, declined} = req.body

  db.updateUserStatus(userId, confirmationCode, dinner, party, declined)
    .then(function(){
      res.json({
        success: true
      })
    })
    .catch(function(err){
      res
        .status(500)
        .json({success: false})
      console.log(err.message)
    })
})

//All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'))
})

//START SERVER
const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
