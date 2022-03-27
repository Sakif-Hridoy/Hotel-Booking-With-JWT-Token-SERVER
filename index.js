const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require('firebase-admin');
const port = 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

var serviceAccount = require("burj-al-arab-8f7bc-firebase-adminsdk-sh6ky-3b2572969c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

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
    console.log(req.headers.authorization);

    // idToken comes from the client app

admin.auth().verifyIdToken(idToken)
.then((decodedToken) => {
  const uid = decodedToken.uid;
  // ...
})
.catch((error) => {
  // Handle error
});



    // bookings.find({email: req.query.email})
    // .toArray((err,documents)=>{
    //   res.send(documents)
    // })
  })
  // perform actions on the collection object
  // install firebase-admin and check pkg.json
//   client.close();
});



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
