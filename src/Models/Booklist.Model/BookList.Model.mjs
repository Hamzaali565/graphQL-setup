import { Schema, model } from "mongoose";

const Booklist = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    publishedYear: { type: Number },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const BooklistModel = model("myBookList", Booklist);

export { BooklistModel };
