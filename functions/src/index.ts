import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


let admin = require('firebase-admin');
let serviceAccount = require('../grfikapp-firebase-adminsdk-ud7ss-282eccaf2c.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "grfikapp.appspot.com/grafiki-public"
})
  

const db = admin.firestore();

exports.aggregate_konkursy_list = functions.region("europe-west3").firestore
  .document('test_upload_konkurs/{konkursId}',).onCreate(async(snapshot,context) => {
    
    const id = snapshot.id;
    const konkurs = snapshot.data();

    const aggRef = db.doc('test_proceed_konkurs/lista_konkursow')
    
    const aggDoc = await aggRef.get();
    const aggData = aggDoc.data();

    const next = {
      count: aggData.count +1,
      id_list: [id, ...aggData.id_list],
      lista: [konkurs, ...aggData.lista]      // nadac limit do 50? 
    }

    return aggRef.set(next)
  })

  exports.welcomeUser = functions.auth.user().onCreate((user) => {
    const email = user.email; // The email of the user.
    const displayName = user.displayName; // The display name of the user.
  });