const admin = require("firebase-admin");

try {
  admin.initializeApp({
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_JSON)
    ),
  });
} catch (err) {
  //console.log(err);
}

module.exports = admin;
