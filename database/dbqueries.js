const spicedPg = require('spiced-pg')
const db = spicedPg(process.env.DATABASE_URL || require('../secrets').db)


module.exports.getAllUsers = function(){
  const queryText = 'SELECT id, name, image, dinner, party, declined FROM users order by name'
  return db.query(queryText)
    .then((result)=>{
      return result.rows.map(user=>{
        const {id: userId, name, image, dinner, party, declined} = user
        return {
          userId, name, image, dinner, party, declined
        }
      })
    }).catch((err)=>{
      console.log(err)
    })
}


module.exports.updateUserStatus = function(userId, confirmationCode, dinner, party, declinded){

  const queryTextCode = `SELECT confirmation_code FROM users where id = $1`

  return db.query(queryTextCode, [userId]).then((dbCodeResult)=>{

    if (dbCodeResult.rows[0].confirmation_code !== confirmationCode) {
      throw {message: 'wrong confirmationCode'}
    }

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
  })
}
