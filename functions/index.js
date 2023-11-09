const functions = require("firebase-functions");
const axios = require('axios');

const admin = require("firebase-admin");



admin.initializeApp(); 

exports.customDomainFunction = functions.https.onRequest(async (req, res) => {
  
  try {
    const customDomain = req.headers.host; // Get the custom domain from the Host header

    const db = admin.firestore(); 

    const headers = {};

    for (const key in req.headers) {
      if (key.toLowerCase() !== 'host') {
        headers[key] = req.headers[key];
      }
    }

    const userQuerySnapshot = await db.collection('Users').where('customDomain', '==', customDomain).get();
    const folio = await userQuerySnapshot.docs[0].data().folio;

    const ssrFunctionURL = `https://artfolio-one.web.app${folio}`;

    if (!userQuerySnapshot.empty) {
      const ssrResponse = await axios({
        method: req.method,
        url:ssrFunctionURL,
        headers: {
          'Host': customDomain,
          ...headers,
        }
      })

      res.status(ssrResponse.status).send(ssrResponse.data);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Daar is Niks hier");
  }
});


exports.addAnalytics = functions.https.onCall(async (data, context) => {
  try {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    
    const db = admin.firestore();
    const usersRef = db.collection('Users');
    const userQuery = usersRef.where('folio', '==', data.folioid);
    const userSnap = await userQuery.get();
    
    if (!userSnap.empty) {
      const userDoc = userSnap.docs[0];
      const userAnalyticsRef = db.collection('Users').doc(userDoc.id).collection('Analytics');
      const analyticsQueryRef = userAnalyticsRef.where('Date', '==', formattedDate).where('Page', '==', data.page);
      const analyticsSnap = await analyticsQueryRef.get();
    
      if (!analyticsSnap.empty) {
        const analyticsDoc = userAnalyticsRef.doc(analyticsSnap.docs[0].ref.id);
        await analyticsDoc.update({
          pageviews: admin.firestore.FieldValue.increment(1)
        });
        return 'Analytics updated successfully.';
      } else {
        await userAnalyticsRef.add({
          Date: formattedDate,
          pageviews: 1,
          page: data.page
        });
        return 'New analytics data added successfully.';
      }
    } else {
      throw new functions.https.HttpsError('not-found', 'User not found for folioid: ' + data.folioid);
    } 
  } catch (error) {
    console.error('An error occurred:', error);
    throw new functions.https.HttpsError('internal', 'An error occurred.');
  }
});





