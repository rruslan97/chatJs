import { sendMessageButton, messageInput, optionButton, quitButton, sendMailButton, inputMail, enterCodeButton, loginButton, chatNameButton } from "./constants.js";
import { postData, render } from "./functions.js";
import { login, changeName } from "./user.js";
import { confirm, authorization, settings } from "./popaps.js";
import { postData } from "./httpRequest.js";



sendMessageButton.addEventListener('click', (e) => {
  e.preventDefault();
  render(messageInput);
});


sendMailButton.addEventListener('click', () => {
  const email = inputMail.value;
  if (email.length === 0) {
    return alert('Введите вашу почту');
  }
  postData('https://edu.strada.one/api/user', { email: email }, 'POST')
    .then(data => {
      if (data.email === undefined) return alert('Такая почта не найдена!');
      alert(`Код выслан на почту ${data.email}`);
    });
  inputMail.value = ''
});

optionButton.addEventListener('click', settings);
quitButton.addEventListener('click', authorization);
enterCodeButton.addEventListener('click', confirm);
loginButton.addEventListener('click', login);
chatNameButton.addEventListener('click', changeName);
addEventListener('DOMContentLoaded', authorization);