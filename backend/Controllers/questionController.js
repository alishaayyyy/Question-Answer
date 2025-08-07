import Question from "../Models/Questions.js";

// ✅ Create Question
export const createQuestion = async (req, res) => {
  const { title, description, category } = req.body;

  try {
    const question = await Question.create({
      title,
      description,
      category,
      user: req.user._id
    });

    res.status(201).json({ success: true, message: "Question created", question });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating question", error });
  }
};

// ✅ Get All Questions (Homepage)


export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("user", "name email") // show user name and email
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, questions });
  } catch (error) {
    console.error("❌ Error in getAllQuestions:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// ✅ Get Single Question by ID
export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }
    res.status(200).json({ success: true, question });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching question" });
  }
};

// ✅ Update Question
export const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    // Only owner can update
    if (question.user.toString() !== req.user._id) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const updated = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, message: "Updated", question: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating question" });
  }
};

// ✅ Delete Question
export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    // Only owner can delete
    if (question.user.toString() !== req.user._id) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    await Question.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Question deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting question" });
  }
};

// ✅ Get Logged In User's Questions
export const getUserQuestions = async (req, res) => {
  try {
    const userId = req.user._id.toString(); // ✅ Convert to string
    const questions = await Question.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// *******************Answer by admin*************************
// Add this to your existing QuestionController.js
export const submitAnswer = async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id.trim(),
      {
        answer: req.body.answer,
        status: "answered",
      },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({
      message: "Answer submitted",
      question: updatedQuestion,
    });
  } catch (error) {
    console.error("Submit Answer Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
