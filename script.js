const express = require('express');
const http = require('http');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 1. Serve Frontend Files
app.use(express.static('public'));

// 2. Real-time Chat
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

// 3. Basic Proxy (Advanced unblocking requires Scramjet or Ultraviolet)
app.use('/proxy-fetch', createProxyMiddleware({
    target: 'https://google.com',
    changeOrigin: true,
    pathRewrite: { '^/proxy-fetch': '' },
}));

server.listen(3000, () => console.log('Site running on http://localhost:3000'));
