const express = require('express');
const HoroscopeController = require('../controllers/horoscopeController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/query', HoroscopeController.query);
router.get('/history', HoroscopeController.getHistory);

module.exports = router;
