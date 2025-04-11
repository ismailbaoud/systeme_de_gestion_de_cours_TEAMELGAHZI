const EnrollmentModel = require('../models/EnrollmentModel');
const UserModel = require('../models/UserModel');
const CourseModel = require('../models/CourseModel');

class EnrollmentController {
  async create(req, res) {
    try {
      const { user_id, course_id } = req.body;

      const existingEnrollment = await EnrollmentModel.findOne({
        where: { user_id, course_id }
      });

      if (existingEnrollment) {
        return res.status(400).json({ message: 'Utilisateur déjà inscrit à ce cours.' });
      }

      const enrollment = await EnrollmentModel.create({ user_id, course_id });

      res.status(201).json(enrollment);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la création de l\'inscription', error });
    }
  }

  async findAll(req, res) {
    try {
      const enrollments = await EnrollmentModel.findAll({
        include: [UserModel, CourseModel]
      });

      res.status(200).json(enrollments);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des inscriptions', error });
    }
  }

  async findOne(req, res) {
    try {
      const { id } = req.params;

      const enrollment = await EnrollmentModel.findByPk(id, {
        include: [UserModel, CourseModel]
      });

      if (!enrollment) {
        return res.status(404).json({ message: 'Inscription non trouvée.' });
      }

      res.status(200).json(enrollment);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération de l\'inscription', error });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { user_id, course_id } = req.body;

      const enrollment = await EnrollmentModel.findByPk(id);
      if (!enrollment) {
        return res.status(404).json({ message: 'Inscription non trouvée.' });
      }

      enrollment.user_id = user_id;
      enrollment.course_id = course_id;
      await enrollment.save();

      res.status(200).json(enrollment);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'inscription', error });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const enrollment = await EnrollmentModel.findByPk(id);
      if (!enrollment) {
        return res.status(404).json({ message: 'Inscription non trouvée.' });
      }

      await enrollment.destroy();

      res.status(200).json({ message: 'Inscription supprimée avec succès.' });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la suppression de l\'inscription', error });
    }
  }
}

module.exports = new EnrollmentController();
