const socket = io();
let username;
const colors = ["#e6194b", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#46f0f0", "#f032e6", "#bcf60c", "#fabebe", "#008080", "#e6beff", "#9a6324", "#800000", "#808000", "#000075", "#808080"];
const assignedColor = colors[Math.floor(Math.random() * colors.length)];

// Elemen HTML
const usernameContainer = document.getElementById("username-container");
const chatContainer = document.getElementById("chat-container");
const usernameInput = document.getElementById("username-input");
const enterChatButton = document.getElementById("enter-chat");
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

// Fungsi untuk mengirim pesan
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", { message: input.value, username, color: assignedColor });
    input.value = "";
  }
});

// Saat tombol "Masuk Chat" ditekan
enterChatButton.addEventListener("click", () => {
  username = usernameInput.value.trim();
  if (username) {
    usernameContainer.style.display = "none";
    chatContainer.style.display = "block";
    socket.emit("user joined", { username, color: assignedColor });
  } else {
    alert("Masukkan username untuk masuk ke chat");
  }
});

// Mendengarkan pesan dari server dan menampilkannya
socket.on("chat message", (data) => {
  const item = document.createElement("div");
  item.innerHTML = `<span style="color: ${data.color}; font-weight: bold;">${data.username}</span>: ${data.message}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
