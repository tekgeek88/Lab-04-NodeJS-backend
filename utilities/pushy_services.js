var Pushy = require('pushy');

// Plug in your Secret API Key 
var pushyAPI = new Pushy(process.env.PUSHY_API_KEY);

//use to send message to all clients registered to a Topic
function sendToTopic(topic, msg, from) {
    //build the message for FCM to send
    var data = {
        "type": "topic_msg",
        "sender": from,
        "message": msg,
    };

    console.log(data);

    let to = '/topics/' + topic;

    // Send push notification via the Send Notifications API 
    // https://pushy.me/docs/api/send-notifications 
    pushyAPI.sendPushNotification(data, to, {}, function (err, id) {
        // Log errors to console 
        if (err) {
            return console.log('Fatal Error', err);
        }

        // Log success 
        console.log('Push sent successfully! (ID: ' + id + ')');
    });
}

//use to send message to a specific client by the token
function sendToIndividual(token, msg, from) {

    //build the message for FCM to send
    var data = {
        "type": "msg",
        "sender": from,
        "message": msg,
    };

    // Send push notification via the Send Notifications API 
    // https://pushy.me/docs/api/send-notifications 
    pushyAPI.sendPushNotification(data, token, {}, function (err, id) {
        // Log errors to console 
        if (err) {
            return console.log('Fatal Error', err);
        }

        // Log success 
        console.log('Push sent successfully! (ID: ' + id + ')');
    });
}

module.exports = {
    sendToTopic, sendToIndividual
};