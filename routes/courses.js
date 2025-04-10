const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/CourseController');

/* courses */
router.get('/' , CourseController.findAll);
router.post('/create' , CourseController.create);
router.get('/:id' , CourseController.findOne);
router.put('/:id/update' , CourseController.update);
router.delete('/:id/delete' , CourseController.delete);


module.exports = router;
