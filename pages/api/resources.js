// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//import our firebase library so we get connected to the firestore db
import firebase from "../../lib/firebase";

//export our asynchronous default api function (async so we can use await inside)
export default async function handler(req, res){
  try{
    //ask the firestore database to get every document in the "resources collection" 
    const snapshot= await firebase.collection("resources").get();
    let output = [];
    snapshot.forEach(
      (doc) => {
        output.push(
          {
            id: doc.id,
            data: doc.data()
          }
        );
      }
    );
    console.log(output);

    //return newly constructed object value of all the firestore document data
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({output});
    
  } catch(err){
    console.error(err);
    res.status(500).end(err.message);
  }
}



