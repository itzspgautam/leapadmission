const admin = require("@/Config/firebaseAdmin");
const { default: DeviceToken } = require("@/models/DeviceToken");
const { default: Notification } = require("@/models/Notification");

// Send a push notification to a specific device
async function sendNotification({ receiverId, title, body, save }) {
  try {
    const deviceTokens = await DeviceToken.find({
      user: receiverId,
    }).distinct("deviceToken");

    const message = {
      notification: {
        title: title,
        body: body,
      },
      tokens: deviceTokens,
    };
    let sent = null;
    let saved = null;

    if (save) {
      saved = await saveNotification(receiverId, title, body);
    }
    if (deviceTokens.length > 0) {
      sent = await admin.messaging().sendMulticast(message);
    }
    return { sent, saved };
  } catch (err) {
    return err;
  }
}

async function saveNotification(receiverId, title, body) {
  try {
    const newNotification = new Notification({
      user: receiverId,
      title,
      body,
    });
    await newNotification.save();
    return { success: true, newNotification };
  } catch (error) {
    return { success: false, error };
  }
}

module.exports = {
  sendNotification,
  saveNotification,
};
