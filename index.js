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
  const collection = client.db("burjAlArab").collection("bookings");

  console.log("database connected");
  app.post('/addBooking',(req,res)=>{
      const newBooking = req.body;
      console.log(newBooking)
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
