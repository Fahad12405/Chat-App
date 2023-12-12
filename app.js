const johnSelectorBtn = document.querySelector("#john-selector");
const janeSelectorBtn = document.querySelector("#jane-selector");
const chatHeader = document.querySelector(".chat-header");
const chatMessages = document.querySelector(".chat-messages");
const chatInputForm = document.querySelector(".chat-input-form");
const chatInput = document.querySelector(".chat-input");
const clearChatBtn = document.querySelector(".clear-chat-button");

const messages = JSON.parse(localStorage.getItem("messages")) || [];

const createChatMessageElement = (message) => `
  <div class="message ${message.sender === "Sharjeel" ? "blue-bg" : "gray-bg"}">
    <div class="message-sender">${message.sender}</div>
    <div class="message-text">${message.text}</div>
    <div class="message-timestamp">${message.timestamp}</div>
  </div>
`;

window.onload = () => {
  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message);
  });
};

let messageSender = "Sharjeel";

const updateMessageSender = (name) => {
  messageSender = name;
  chatHeader.innerText = `${messageSender} chatting...`;
  chatInput.placeholder = `Type here, ${messageSender}...`;

  if (name === "Sharjeel") {
    johnSelectorBtn.classList.add("active-person");
    janeSelectorBtn.classList.remove("active-person");
  }
  if (name === "Maaz") {
    janeSelectorBtn.classList.add("active-person");
    johnSelectorBtn.classList.remove("active-person");
  }

  chatInput.focus();
};

johnSelectorBtn.onclick = () => updateMessageSender("Sharjeel");
janeSelectorBtn.onclick = () => updateMessageSender("Maaz");

const sendMessage = (e) => {
  e.preventDefault();

  const timestamp = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const message = {
    sender: messageSender,
    text: chatInput.value,
    timestamp,
  };

  messages.push(message);
  localStorage.setItem("messages", JSON.stringify(messages));

  chatMessages.innerHTML += createChatMessageElement(message);

  chatInputForm.reset();

  chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatInputForm.addEventListener("submit", sendMessage);

clearChatBtn.addEventListener("click", () => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
      });
      localStorage.clear();
      chatMessages.innerHTML = "";
    } else {
      swal("Your imaginary file is safe!");
    }
  });
});
