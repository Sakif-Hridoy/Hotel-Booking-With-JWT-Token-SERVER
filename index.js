const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mydbuser1:jmXHknmahHGBXCXq@cluster0.djg6r.mongodb.net/burjAlArab?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const bookings = client.db("burjAlArab").collection("bookings");

  console.log("database connected");
  app.post('/addBooking',(req,res)=>{
      const newBooking = req.body;
      bookings.insertOne(newBooking)
      .then(result=>{
        res.send(result.insertedCount > 0);
      })
      console.log(newBooking)
  })

  app.get('/bookings',(req,res)=>{
    // console.log(req.query.email);
    bookings.find({email: req.query.email})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })
  // perform actions on the collection object
//   client.close();
});



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
