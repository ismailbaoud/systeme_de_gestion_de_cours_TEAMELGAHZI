const express = require('express');
const router = express.Router();
const EnrollmentController = require('../controllers/EnrollmentController');

router.post('/create', EnrollmentController.create);
router.get('/user/:user_id', EnrollmentController.findByUser);
router.get('/check/:user_id/:course_id', EnrollmentController.check);
router.delete('/delete', EnrollmentController.delete);

module.exports = router;
