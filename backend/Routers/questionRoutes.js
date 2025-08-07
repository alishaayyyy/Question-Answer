import express from "express";
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  getUserQuestions,
 submitAnswer
} from "../Controllers/questionController.js";
import { verifyToken } from "../MiddleWares/verifyToken.js";
import isAdmin from '../MiddleWares/IsAdmin.js'

const router = express.Router();

router.get("/all", getAllQuestions);
router.get("/my-questions", verifyToken, getUserQuestions);
router.get("/:id", getQuestionById);
router.post("/", verifyToken, createQuestion);
router.put("/:id", verifyToken, updateQuestion);
router.delete("/:id", verifyToken, deleteQuestion);
//********************* */ Answerr **************************
router.put("/answer/:id", verifyToken, isAdmin, submitAnswer);

export default router;
