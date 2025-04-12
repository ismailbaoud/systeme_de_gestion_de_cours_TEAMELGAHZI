const express = require('express');
const router = express.Router();
const LessonController = require('../controllers/LessonController');
const upload = require('../middlewares/upload');


router.post('/create', upload.single('file') , LessonController.create);
router.get('/findAll', LessonController.findAll);
router.get('/findOne/:id', LessonController.findOne);
router.put('/:id/update', LessonController.update);
router.delete('/:id/delete', LessonController.delete);

module.exports = router