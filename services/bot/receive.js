const send = require('./send');

exports.message = (event) => {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfMessage = event.timestamp;
  const message = event.message;

  console.log("Received message for user %d and page %d at %d with message:",
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  const messageId = message.mid;

  const messageText = message.text;
  const messageAttachments = message.attachments;

  if (messageText) {

    // If we receive a text message, check to see if it matches a keyword
    // and send back the example. Otherwise, just echo the text we received.
    switch (messageText) {
      case 'generic':
        send.genericMessage(senderID);
        break;
      case 'I need coffee':
        send.textMessage(senderID, 'Sure sir, which flavour?');
        break;
      case 'cappuccino':
        send.textMessage(senderID,
          'Sorry, we do not serve that, would you like to try some other flavour?');
        break;
      case 'black coffee':
        send.textMessage(senderID,
          'Here you go sir, take this fresh cup of coffee');
        break;
      default:
        send.textMessage(senderID, messageText);
    }
  } else if (messageAttachments) {
    send.textMessage(senderID, "Message with attachment received");
  }

};

exports.postBack = (event) => {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback
  // button for Structured Messages.
  const payload = event.postback.payload;

  console.log("Received postback for user %d and page %d with payload '%s' " +
    "at %d", senderID, recipientID, payload, timeOfPostback);

  // When a postback is called, we'll send a message back to the sender to
  // let them know it was successful
  send.textMessage(senderID, "PostBack called");
};
