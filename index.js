const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();

const port = 5000;


// Midleware:
app.use(cors())
app.use(express.json());

const uri = "mongodb+srv://Explore-MongoDB:KZS1sJComGNSL34g@cluster0.7gqmj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// const name = Explore-MongoDB
// const password = KZS1sJComGNSL34g

async function run() {
        try {
                await client.connect();
                const dataBase = client.db('FoodCluster');
                const usersCollection = dataBase.collection('Users');

                // GET API:
                app.get('/users', async (req, res) => {
                        const cursor = usersCollection.find({});
                        const users = await cursor.toArray();
                        res.send(users)
                })
                // POST API:
                app.post('/users', async (req, res) => {

                        const newUser = req.body;
                        const result = await usersCollection.insertOne(newUser);

                        console.log('Got New User', req.body);
                        console.log("Added User", result);
                        res.json(result);
                })
        }
        finally {
                // await client.close();
        }

}

run().catch(console.dir)

app.get('/', (req, res) => {
        res.send('I am listening from Recap')
})

app.listen(port, (req, res) => {
        console.log('I am listening')
})