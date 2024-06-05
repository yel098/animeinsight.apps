const socket = io()


const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')

messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    sendMessage()
})


function sendMessage(){
    if (messageInput.value ==='') return
    // console.log(messageInput.value)
    const data = {
        message: messageInput.value,
        dateTime: new Date()
    }
    socket.emit('message', data)
    addMessageToUI(true, data)
    messageInput.value = ''
}

socket.on('chat-message', (data) => {
    // console.log(data)
    addMessageToUI(false, data)
    scrollToBottom()
})

function addMessageToUI(isOwnMessage, data) {
    clearFeedback()
    const element = `
      <li class="${isOwnMessage ? 'message-right' : 'message-left'}">
          <p class="message">
            ${data.message}
            <span> anonymous ● ${moment().format('LLL')}</span>
          </p>
        </li>
        `

    messageContainer.innerHTML += element
    scrollToBottom()
}

function scrollToBottom(){
    messageContainer.scrollTo(0, messageContainer.scrollHeight)
}

messageInput.addEventListener('blur', (e) => {
    socket.emit('feedback', {
        feedback: '',
    })
})

socket.on('feedback', (data) => {
    clearFeedback()
    const element = `
        <li class="message-feedback">
            <p class="feedback" id="feedback"> ${data.feedback} </p>
        </li>
    `
    messageContainer.innerHTML += element
})

function clearFeedback(){
    document.querySelectorAll('li.message-feedback').forEach(element => {
        element.parentNode.removeChild(element)
    })
}