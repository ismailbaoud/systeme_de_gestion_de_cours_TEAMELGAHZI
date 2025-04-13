const express = require('express');
const router = express.Router();
const CourseController = require('../controllers/CourseController');
const ModuleController = require('../controllers/ModuleController');
const LessonController = require('../controllers/LessonController');


router.get('/' , CourseController.findAll);
router.get('/:course_id/modules' , ModuleController.findByCourse);
router.get('/:module_id/lessons' , LessonController.findByModule);
router.post('/create' , CourseController.create);
router.get('/:id' , CourseController.findOne);
router.put('/:id/update' , CourseController.update);
router.delete('/:id/delete' , CourseController.delete);
router.get('/:course_id/progress/:user_id' , CourseController.getCourseProgress);


module.exports = router;
