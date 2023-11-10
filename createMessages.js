import { chat, messageInput, findedMessagesWrapper } from "./constants.js";

export function createMessage(message, senderName, time, method = 'prepend') {

  if (message.length === 0) return alert('Введите сообщение')
  const template = document.querySelector('#message__template');
  const cloneTemplate = template.cloneNode(true);
  const chatMessage = cloneTemplate.content.querySelector('.chat__message');

  const messageWrapper = document.createElement('div');
  if (message === messageInput.value || senderName === 'Я') {
    messageWrapper.className = 'chat__message-wrapper-my';
  } else {
    messageWrapper.className = 'chat__message-wrapper'
  }

  const messageContent = cloneTemplate.content.querySelector('.chat__message-content')

  messageContent.textContent = `${senderName}: ${message}`

  const spanTime = cloneTemplate.content.querySelector('.message__time')

  spanTime.textContent = time

  messageWrapper.append(chatMessage);
  if (method === 'append'
    || message === messageInput.value) {
    chat.append(messageWrapper)
  } else if (method === 'prepend') {
    chat.insertBefore(messageWrapper, chat.firstChild);
  } 
  chat.scrollTop = chat.scrollHeight
};

export function createFindedMessage(messageText, userName, time) {
  const divMessage = document.createElement('div')
  divMessage.className = 'finded__message'
  const textMessage = document.createElement('p')
  textMessage.textContent = `${userName}: ${messageText}`
  const timeMessage = document.createElement('span')
  timeMessage.textContent = time

  divMessage.append(textMessage)
  divMessage.append(timeMessage)
  findedMessagesWrapper.insertBefore(divMessage, findedMessagesWrapper.firstChild)
}