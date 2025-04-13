const ModuleModel = require('../models/ModuleModel');

class ModuleController {
    async create(req, res) {
      try {
        const {course_id , title, description , order} = req.body 

        const mudel = await ModuleModel.create({course_id , title , description, order});
console.log(mudel);

        res.status(200).json(mudel);
      } catch (error) {
        res.status(500).json({ message: 'Error creating module', error: error.message });
      }
    }
  
    async findAll(req, res) {
      try {
        const modules = await ModuleModel.findAll(); 
        res.status(200).json(modules);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving modules', error });
      }
    }
  
    async findOne(req, res) {
      try {
        const id = req.params.id;
        const module = await ModuleModel.findByPk(id); 
        res.status(200).json(module);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving module', error });
      }
    }

    async findByCourse(req, res) {
      try {
          const { course_id } = req.params;
  
          const modules = await ModuleModel.findAll({
              where: { course_id },
          });
  
          if (modules.length === 0) {
              return res.status(404).json({ message: 'No modules found for this course' });
          }
  
          res.status(200).json({ modules });
      } catch (error) {
          console.error('Error retrieving modules for course:', error);
          res.status(500).json({ message: 'Error retrieving modules for course', error: error.message });
      }
  }
  
  
    async update(req, res) {
      try {
        const id = req.params.id;
        const {course_id , title, description , order} = req.body 

        const module = await ModuleModel.findByPk(id);
        const moduleUpdate = await module.update({course_id , title, description , order});
        res.status(200).json(moduleUpdate);
      } catch (error) {
        res.status(500).json({ message: 'Error updating module', error });
      }
    }
  
    async delete(req, res) {
      try {
        const id = req.params.id;

        const module = await ModuleModel.findByPk(id);
        const moduleDelete = module.destroy();
        res.status(200).json(moduleDelete);
      } catch (error) {
        res.status(500).json({ message: 'Error deleting module', error });
      }
    }
  }
  
  module.exports = new ModuleController();
  