const express = require('express');
const router = express.Router();

const holidayController = require('../controllers/Holiday');

router.get('/holidays', holidayController.getAllHolidays);
router.get('/holidays/:id', holidayController.getHolidayById);
router.post('/holidays', holidayController.addHoliday);
router.put('/holidays', holidayController.updateHoliday);
router.delete('/holidays/:id', holidayController.deleteHoliday);

module.exports = router;

