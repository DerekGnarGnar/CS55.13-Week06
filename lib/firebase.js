//we have to load the firebase admin package in order to interact with our firebase project

import admin from "firebase-admin";

//to get ready to send an authentification request to firebase, we load the json
//we load the json string and convert to an actual JSON object (instead of loading the file)- why? because it's more secure tha  saving our credentials in a JSON file in our project 

const serviceAccount = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_DATABASE_PRIVATEKEY
);

try{
 admin.initializeApp(
   {
     credential: admin.credential.cert(serviceAccount),
     databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
   }
 ); 
} catch(err){
  //this will run if an error happens
  console.log("firebase error", err.stack);
}

export default admin.firestore();