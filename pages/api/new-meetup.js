import { MongoClient } from 'mongodb';

const handler = async (req,res) => {
   if(req.method === "POST"){
    const data = req.body;
    const client = await MongoClient.connect('mongodb+srv://santiFP:xVxem28YNxbGZhmz@usersdb-movy.imjdj.mongodb.net/meetups?retryWrites=true&w=majority');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(data);
    client.close();
    res.status(201).json({message:'Meetup inserted!'});
    console.log(result);

   }
};
export default handler;