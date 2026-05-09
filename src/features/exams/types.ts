export type ExamStatus = "pending" | "in_progress" | "processing" | "completed";

export type Exam = {
  id: string;
  title: string;
  description: string;
  duration: number;
  status: ExamStatus;
  createdAt: string;
};
