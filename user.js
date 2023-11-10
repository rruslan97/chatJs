import { inputCode, chatNameInput } from './constants.js';
import { postData } from "./httpRequest.js";
import { connectWebSocket } from "./webSocket.js";
import { closeAuthorization, closeConfirm } from "./popaps.js";

export async function login() {
 
  const module = await import("./functions.js")

  if (inputCode.value.length > 10) localStorage.setItem('token', inputCode.value);
  else return alert('Введите код!')
  postData('https://edu.strada.one/api/user', { name: 'Champion777' }, 'PATCH', localStorage.getItem('token'))
    .then(data => {
      if (data === undefined) return alert('Нет пользователя с таким токеном');
      closeConfirm(),
      closeAuthorization(),
      module.addMessages(),
      connectWebSocket()
      inputCode.value = ''
    })
}
export function changeName() {
  const name = chatNameInput.value
  postData('https://edu.strada.one/api/user', { name: name }, 'PATCH', localStorage.getItem('token'))
    .then(data => console.log(data))
  alert(`Имя в чате успешно изменено на ${name}`)
  chatNameInput.value = ''
}