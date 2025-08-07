import mongoose from 'mongoose';
const schema = mongoose.Schema;

const QuestionSchema = new schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "waiting for answer"
  },
  answer: {
    type: String,
    default: ""
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

const QuestionModel = mongoose.model('Question', QuestionSchema);
export default QuestionModel;
