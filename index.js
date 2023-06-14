import express from 'express'
import bodyParser from 'body-parser'
import { MongoClient } from "mongodb";
const PORT = 8000
const app = express()
app.use(express.json())

let books = ['algo', 'abc', 'SQL']

app.listen(PORT, () =>
    console.log("Application has started at PORT ", PORT)
)

app.get('/', (req, resp) => {
    return resp.json({ booksList: books })
})


app.post('/books', async (req, resp) => {


    const result = await connectToMongoDB();
    console.log('*****************', result);
    const bookName = req.body.name;
    books.push(bookName);
    return resp.json(result);
});



async function connectToMongoDB() {

    const uri = "mongodb://0.0.0.0:27017/";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('library');
        const collection = db.collection('books');

        const documents = await collection.find().toArray();
        console.log('Documents:', documents);
        return documents;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    } finally {
        client.close();
    }

}