import { createMessage } from "./createMessages.js";
import { getMyEmail } from "./httpRequest.js";
import { format } from "date-fns";

const url = 'wss://edu.strada.one/websockets?';
let socket;

export function connectWebSocket() {
  socket = new WebSocket(`${url}${localStorage.getItem('token')}`);

  socket.onopen = function () {
    console.log('WebSocket подключен');
  }

  socket.onmessage = async function (event) {
    const elem = JSON.parse(event.data)
    console.log(elem);
    const myEmail = await getMyEmail(localStorage.getItem('token'))
    if (elem.user.email !== myEmail) {
      createMessage(elem.text, elem.user.name, format(new Date(), 'kk:mm'), 'append')
    }
  };

  socket.onclose = function () {
    alert('WebSocket отключен')
    console.log('Происходит переподключение');
    let i = 3;
    const intervalId = setInterval(() => {
      console.log(i);
      i--;
      if (i === 0) {
        clearInterval(intervalId);
        
        connectWebSocket()
      }
    }, 1000);
  }

  socket.onerror = function (error) {
    console.log(error);
  } 
}

export function sendMessageWeb(message) {
  socket.send(JSON.stringify({ text: message }));
};