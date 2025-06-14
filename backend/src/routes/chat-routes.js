import express from 'express';
import ChatController from '../controllers/chat-controller.js';

const router = express.Router();

router.post('/send', (req, res) => ChatController.sendMessage(req, res));
router.post('/agent', (req, res) => ChatController.createAgent(req, res));

export default router;
