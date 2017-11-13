const spicedPg = require('spiced-pg')
const db = spicedPg(process.env.DATABASE_URL || require('../secrets').db)


module.exports.getAllUsers = function(){
  const queryText = 'SELECT id, name, image, dinner, party, declined FROM users order by name'
  return db.query(queryText).then((result)=>{
    return result
  }).catch((err)=>{
    console.log(err)
  })
}


module.exports.updateUserStatus = function(userId, dinner, party, declinded){
  const queryText = `UPDATE users SET dinner=$2, party=$3, declined=$4 where id = $1`

  return db.query(queryText, [userId, dinner, party, declinded]).then(()=>{
    return {
      success: true
    }
  }).catch((err)=>{
    console.log(err)
    return {
      success: false
    }
  })
}
