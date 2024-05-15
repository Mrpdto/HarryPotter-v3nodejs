const express = require('express');
const CardsController = require('../controllers/CardsController'); 
const { authenticateToken } = require('../middlewares/Auth');


const cardsRouter = express.Router();

cardsRouter.get('/user/cards', authenticateToken, CardsController.getUserCards)

module.exports = cardsRouter;