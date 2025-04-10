const CourseModel    = require('../models/CourseModel');
const UserModel = require('../models/UserModel');

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

  
}

module.exports = new CourseController();
