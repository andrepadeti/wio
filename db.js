/**
 * Connect to MongoDB 
 */
import { MongoClient } from 'mongodb'
var wio

  MongoClient.connect( 
    process.env.DB_URI, 
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then( client => {
      var dbo = client.db('elt')
      wio = dbo.collection('wio')
    })
    
export default wio
