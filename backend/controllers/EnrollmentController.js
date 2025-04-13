const Enrollment = require('../models/EnrollmentModel');
const Course = require('../models/CourseModel');

class EnrollmentController {
  async create(req, res) {
    const { user_id, course_id } = req.body;
    try {
      const exists = await Enrollment.findOne({ where: { user_id, course_id } });
      if (exists) {
        return res.status(400).json({ message: 'User already enrolled in this course' });
      }

      const enrollment = await Enrollment.create({ user_id, course_id });
      res.status(201).json(enrollment);
    } catch (error) {
      res.status(500).json({ message: 'Error creating enrollment', error: error.message });
    }
  }

  async findByUser(req, res) {
    const { user_id } = req.params;
    try {
      const enrollments = await Enrollment.findAll({
        where: { user_id },
        include: [
          {
            model: Course,
            as: 'Course',
            attributes: ['id', 'title', 'description'] 
          }
        ],
        attributes: [] 
      });
  
      const courses = enrollments.map(enrollment => enrollment.Course);
  
      res.status(200).json(courses);
  
    } catch (error) {
      res.status(500).json({ message: 'Error fetching enrollments', error: error.message });
    }
  }

  async check(req, res) {
    const { user_id, course_id } = req.body;
    try {
      const exists = await Enrollment.findOne({ where: { user_id, course_id } });
      res.status(200).json({ enrolled: !!exists });
    } catch (error) {
      res.status(500).json({ message: 'Error checking enrollment', error: error.message });
    }
  }

  async delete(req, res) {
    const { user_id, course_id } = req.body;
    try {
      const deleted = await Enrollment.destroy({ where: { user_id, course_id } });
      if (deleted) {
        res.status(200).json({ message: 'Enrollment deleted successfully' });
      } else {
        res.status(404).json({ message: 'Enrollment not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error deleting enrollment', error: error.message });
    }
  }
}

module.exports = new EnrollmentController();
