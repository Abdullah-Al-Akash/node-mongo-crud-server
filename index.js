const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();

const port = 5000;


const uri = "mongodb+srv://Explore-MongoDB:KZS1sJComGNSL34g@cluster0.7gqmj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// const name = Explore-MongoDB
// const password = KZS1sJComGNSL34g

async function run() {
        try {
                await client.connect();
                const dataBase = client.db('FoodCluster');
                const usersCollection = dataBase.collection('Users');

                // POST API:
                app.post('/users', async (req, res) => {
                        console.log('Hit the Post')
                        res.send('Hit The Post')
                })
        }
        finally {
                await client.close();
        }

}

run().catch(console.dir)

app.get('/', (req, res) => {
        res.send('I am listening from Recap')
})

app.listen(port, (req, res) => {
        console.log('I am listening')
})