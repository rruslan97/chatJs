import { chat } from './constants.js';
import { getData, getMyEmail } from "./httpRequest.js";
import { createMessage } from "./createMessages.js";
import { sendMessageWeb } from "./webSocket.js";
import { format } from "date-fns";

export function render(message) {
  createMessage(message.value, 'Я', format(new Date(), 'kk:mm'));
  sendMessageWeb(message.value);
  message.value = '';
  message.focus();
}

let messageCount = 0;

export function getMessages(data, count, email, name) {
  for (let i = messageCount; i < messageCount + count; i++) {

    if (i < data.messages.length) {
      const messageText = data.messages[i].text;
      const date = data.messages[i].createdAt;

      let userName;
      if (data.messages[i].user.email === email) {
        userName = 'Я';
      } else {
        userName = data.messages[i].user.name;
      }

      createMessage(messageText, userName, format(new Date(date), 'kk:mm'));

    } else return alert('История сообщений закончилась');
  }

  messageCount += count
}
async function checkMessage(data, count = 20) {
  const myEmail = await getMyEmail()
  getMessages(data, count, myEmail)

}
export function addMessages() {
  getData('https://edu.strada.one/api/messages/', localStorage.getItem('token'))
    .then(data => {
      checkMessage(data, 20);

      chat.addEventListener('scroll', () => {
        if (chat.scrollTop === 0) {
          checkMessage(data, 20);
        }
      });
    });
}