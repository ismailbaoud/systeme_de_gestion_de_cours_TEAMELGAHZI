const LessonModel = require('../models/LessonModel');
const EnrollmentModel = require('../models/EnrollmentModel');
const ModuleModel = require('../models/ModuleModel');


class LessonController {
  
    async create(req, res) {
      try {
        const { module_id, title, description, order, user_id } = req.body;
        console.log(req.body);
        
        const file = req.file;
        console.log(req);
    
        if (!file) {
          return res.status(400).json({ message: 'Video file is required' });
        }
    
        const videoPath = `/uploads/${file.filename}`;
        const lesson = await LessonModel.create({module_id,user_id, title ,description , content: videoPath , order});

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
        const { module_id } = req.params;
        const lessons = await LessonModel.findAll({
          where: {
            module_id: module_id 
          }
        });
    
        if (lessons.length === 0) {
          return res.status(404).json({ message: 'Aucune leçon trouvée pour ce module' });
        }
    
        res.status(200).json({ lessons }); 
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

    async markLessonComplete(req, res) {
      try {
        const { lesson_id } = req.params;
        const { user_id, completed } = req.body;
    
        if (typeof completed !== 'boolean') {
          return res.status(400).json({
            success: false,
            message: 'Le statut de complétion doit être un booléen',
          });
        }
    
        const lesson = await LessonModel.findByPk(lesson_id, {
          include: {
            model: ModuleModel,
            attributes: ['course_id'],
          },
        });
    
        if (!lesson) {
          return res.status(404).json({
            success: false,
            message: 'Leçon introuvable',
          });
        }
    
        const enrollment = await EnrollmentModel.findOne({
          where: {
            user_id: user_id,
            course_id: lesson.Module.course_id,
          },
        });
    
        if (!enrollment) {
          return res.status(403).json({
            success: false,
            message: 'L\'utilisateur n\'est pas inscrit à ce cours',
          });
        }
    
        await lesson.update({ done: completed ? 1 : 0 });
    
        return res.status(200).json({
          success: true,
          message: 'Statut de complétion de la leçon mis à jour',
          data: lesson,
        });
      } catch (error) {
        console.error('Erreur lors de la mise à jour du statut de la leçon :', error);
        return res.status(500).json({
          success: false,
          message: 'Erreur serveur interne',
          error: error.message,
        });
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
  