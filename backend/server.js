import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import chatRoutes from './src/routes/chat-routes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: '*'
    }
});

app.use(bodyParser.json());
app.use('/api/chat', chatRoutes);

app.set('io', io);

io.on('connection', (socket) => {
    console.log('Client connected');
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

export { io };
