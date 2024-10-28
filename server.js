const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Menyajikan file statis dari folder "public"
app.use(express.static("public"));

// Saat ada koneksi baru
io.on("connection", (socket) => {
  console.log("User connected");

  // Menerima pesan dari klien dan menyiarkan kembali ke semua klien
  socket.on("chat message", (data) => {
    io.emit("chat message", data);
  });

  // Saat pengguna terputus
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Menjalankan server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
