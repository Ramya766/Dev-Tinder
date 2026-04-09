const {MongoClient} =require('mongodb')
const URL="mongodb+srv://ramya766_db_user:NYe62QPJzNJ2yu8i@devtinder-db.o9xfcp5.mongodb.net/";
const client =new MongoClient(URL);
const dbName='First_DB';
async function main(){
    await client.connect();
    console.log("Connected to MongoDB Successfully!!");
    const db=client.db(dbName);
    const collection =db.collection('User_db');

    const data={
        firstname:"Hari",
        lastname:"PriyaDharshan",
        city:"Banglore"

    }

    //to insert
    //const insertResult=await collection.insertOne(data);
    //console.log("Inserted Document =>",insertResult);

    //to find using filter
    //const filterResult=await collection.find({city :"Banglore"}).toArray();
    //console.log("Filtered Documents =>",filterResult);

    //to update
    const updateResult=await collection.updateOne({city:"Banglore"},{$set :{city:"Madurai"}});
    console.log("Updated Document =>",updateResult);

    //to find
    //const findResult=await collection.find({}).toArray();
    //console.log("Found Documents =>",findResult);

    return 'done';
}
main()
.then(console.log)
.catch(console.error)
.finally(()=>client.close());