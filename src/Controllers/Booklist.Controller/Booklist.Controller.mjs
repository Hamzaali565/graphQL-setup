import { BooklistModel } from "../../Models/Booklist.Model/BookList.Model.mjs";
import { ApiError } from "../../utils/ApiError.mjs";
import { ApiResponse } from "../../utils/ApiResponse.mjs";
import { asyncHandler } from "../../utils/AsyncHandler.mjs";

const bookListCreation = asyncHandler(async (req, res) => {
  console.log("req.body", req.body);
  const { title, author, description, publishedYear, active } = req.body;
  if (![title, author, description].every(Boolean))
    throw new ApiError(400, "All Parameters are required !!!");
  const response = await BooklistModel.create({
    title,
    author,
    description,
    publishedYear,
    active,
  });
  if (!response)
    throw new ApiError(500, "Internal Server Error please try later");
  res
    .status(200)
    .json(new ApiResponse(200, { data: response }, "Data Crated Successfully"));
});

const getfilteredBooks = async (title, author, description) => {
  let response;

  response = await BooklistModel.find({
    $or: [
      { title: title ? title : "" },
      { author: author ? author : "" },
      { description: description ? description : "" },
    ],
  });

  if (response.length <= 0) {
    response = await BooklistModel.find({});
  }

  return response;
};

const getDataById = async (_id) => {
  try {
    const response = await BooklistModel.findById(_id);
    console.log("response", response);

    if (!response) {
      throw new ApiError(404, `DATA NOT FOUND AGAINST THIS _id ${_id}`); // Custom error with status code
    }
    return response;
  } catch (error) {
    throw new ApiError(404, "Serversss Error"); // Default to server error
  }
};

const updateDocumnet = asyncHandler(async (req, res) => {
  const { title, author, description, publishedYear, active, _id } = req.body;
  console.log(req.body);

  if (!_id) throw new ApiError(400, "_id Parameter is Required!!!");
  const oldData = await BooklistModel.findById(_id);
  console.log(oldData);

  if (!oldData) throw new ApiError(404, "Data Not Found!!!");
  const response = await BooklistModel.findOneAndUpdate(
    { _id },
    {
      $set: {
        title: title || oldData?.title,
        author: (author && author) || oldData?.author,
        active: active !== undefined ? active : oldData?.active,
        description: (description && description) || oldData?.description,
        publishedYear:
          (publishedYear && publishedYear) || oldData?.publishedYear,
      },
    },
    { new: true }
  );
  res
    .status(202)
    .json(
      new ApiResponse(202, { data: response }, "data Updated Successfully")
    );
});

const DeleteADoc = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) throw new ApiError(400, "_id Parameter is Required!!!");
  const response = await BooklistModel.findByIdAndDelete(_id);
  if (!response) throw new ApiError(404, "Data Not Found!!!");
  res
    .status(200)
    .json(
      new ApiResponse(200, { data: response }, "Data Deleted Successfully!!!")
    );
});

const limitedData = asyncHandler(async (req, res) => {
  const { skippedAmount } = req.query;
  const response = await BooklistModel.find({})
    .skip(skippedAmount || 0)
    .limit(2);
  res
    .status(200)
    .json(new ApiResponse(200, { data: response }, "Data Found Successfully"));
});

export {
  bookListCreation,
  getfilteredBooks,
  getDataById,
  updateDocumnet,
  DeleteADoc,
  limitedData,
};
