const LessonModel = require('../models/LessonModel');


class LessonController {
    async create(req, res) {
      try {
        const { module_id, title, description, order } = req.body;
        console.log(req.body);
        
        const file = req.file;
        console.log(req);
    
        if (!file) {
          return res.status(400).json({ message: 'Video file is required' });
        }
    
        const videoPath = `/uploads/${file.filename}`;
    
        const lesson = await LessonModel.create({module_id, title ,description , content: videoPath , order});

        res.status(200).json(lesson);
      } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Error creating lesson', error: error.message });
      }
      
    }
  
    async findAll(req, res) {
      try {
        const lessons = await LessonModel.findAll();
        res.status(200).json(lessons);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving lessons', error });
      }
    }
  
    async findOne(req, res) {
      try {
        const id = req.params.id;

        const lesson = await LessonModel.findByPk(id)
        res.status(200).json(lesson);
      } catch (error) {
        res.status(500).json({ message: 'Error retrieving lesson', error });
      }
    }

    async findByModule(req, res) {
      try {
        const { module_id } = req.params; // Extract module_id from the URL parameters
    
        // Query to find lessons that match the module_id
        const lessons = await LessonModel.findAll({
          where: {
            module_id: module_id // Filter lessons by module_id only
          }
        });
    
        if (lessons.length === 0) {
          return res.status(404).json({ message: 'Aucune leçon trouvée pour ce module' });
        }
    
        res.status(200).json({ lessons }); // Return lessons as response
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des leçons' });
      }
    }
    
  
    async update(req, res) {
      try {
        const id = req.params.id;

        const { module_id, title, description, order } = req.body;
        const lesson = await LessonModel.findByPk(id);
        const lessonUpdate = lesson.update({ module_id, title, description, order });
        res.status(200).json(lessonUpdate);
      } catch (error) {
        res.status(500).json({ message: 'Error updating lesson', error });
      }
    }
  
    async delete(req, res) {
      try {
        const id = req.params.id;

        const lesson = await LessonModel.findByPk(id);
        const lessonDestroy = lesson.destroy();
        res.status(200).json(lessonDestroy);
      } catch (error) {
        res.status(500).json({ message: 'Error deleting lesson', error });
      }
    }
  }
  
  module.exports = new LessonController();
  