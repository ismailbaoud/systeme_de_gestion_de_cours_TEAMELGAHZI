const express = require('express');
const router = express.Router();
const ModuleController = require('../controllers/ModuleController');

router.post('/create', ModuleController.create);
router.get('/findAll', ModuleController.findAll);
router.get('/findOne/:id', ModuleController.findOne);
router.put('/:id/update', ModuleController.update);
router.delete('/:id/delete', ModuleController.delete);

module.exports = router;