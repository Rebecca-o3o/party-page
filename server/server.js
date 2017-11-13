const express = require('express'),
  path = require('path'),
  app = express()

const db = require('../database/dbqueries')

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
      users: result.rows
    })
  })
    .catch(function(err){
      console.log(err)
      res.json({
        success: false
      })
    })
})


app.post('/api/confirmation', function(req,res){

  const userId = req.body.userId
  const dinner = req.body.dinner
  const party = req.body.party
  const declined = req.body.declined


  db.updateUserStatus(userId, dinner, party, declined).then(function(result){

    res.json({
      success: true
    })
  }).catch(function(err){
    console.log(err)
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
