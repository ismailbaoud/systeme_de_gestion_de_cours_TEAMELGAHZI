const CourseModel = require('../models/CourseModel');
const LessonModel = require('../models/LessonModel');
const ModuleModel = require('../models/ModuleModel');

class CourseController {

    async create(req, res) {
      try {
        const {title , description} = req.body;
        
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        const course = await CourseModel.create({title , description});
        
       res.status(201).json(course);
    } catch (error) {
      console.log({ message: 'Error creating course', error: error.message });
      
      res.status(500).json({ message: 'Error creating course', error: error.message });
    }
  }


  async findAll(req, res) {
    try {
        const courses = await CourseModel.findAll();
      res.status(200).json({message: 'Courses retrieved successfully', courses});
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving courses', error });
    }
  }



  async findOne(req, res) {
    try {
      const id = req.params.id;
      const course = await CourseModel.findByPk(id);
      res.status(200).json({ message: 'Course retrieved successfully', course });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving course', error });
    }
  }


  async update(req, res) {
    try {
        const {title , description} = req.body;
      const id = req.params.id;
      const course = await CourseModel.findByPk(id);
      const courseUpdate = await course.update({title , description});
      res.status(200).json({ message: 'Course updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating course', error: error.message });
    }
  }


  async getCourseProgress(req, res) {
    try {
      const { course_id, user_id } = req.params;
  
      const totalLessons = await LessonModel.count({
        include: {
          model: ModuleModel,
          where: {
            course_id: course_id,
          },
        },
      });
  
      const completedLessons = await LessonModel.count({
        include: {
          model: ModuleModel,
          where: {
            course_id: course_id,
          },
        },
        where: {
          done: true,
          user_id: user_id
        },
      });
  
      const progressPercentage = (totalLessons === 0) ? 0 : (completedLessons / totalLessons) * 100;
  
      res.status(200).json({
        totalLessons,
        completedLessons,
        progressPercentage: progressPercentage.toFixed(2),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving progress', error: error.message });
    }
  }
  
  



  async delete(req, res) {
    try {
      const id = req.params.id;
      
      const course = await CourseModel.findByPk(id);
      course.destroy();
      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting course', error });
    }
  }
}

module.exports = new CourseController();
