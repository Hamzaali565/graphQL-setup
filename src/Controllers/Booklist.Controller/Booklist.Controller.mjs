import { BooklistModel } from "../../Models/Booklist.Model/BookList.Model.mjs";
import { ApiError } from "../../utils/ApiError.mjs";
import { ApiResponse } from "../../utils/ApiResponse.mjs";
import { asyncHandler } from "../../utils/AsyncHandler.mjs";

const bookListCreation = async (input) => {
  try {
    const { title, author, description, publishedYear, active } = input;
    console.log({ title, author, description, publishedYear, active });
    if (![title, author, description].every(Boolean))
      throw new Error("All Parameters are required !!!");

    const response = await BooklistModel.create({
      title,
      author,
      description,
      publishedYear,
      active,
    });
    return response;
  } catch (error) {
    throw new Error({ message: error.message });
  }
};

const getfilteredBooks = async (title, author, description) => {
  try {
    console.log(title, author, description);

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
    console.log("response ", response);

    return response;
  } catch (error) {
    throw new Error("DATA NOT FOUND !!!");
  }
};

const getDataById = async (_id) => {
  try {
    const response = await BooklistModel.findById(_id);
    console.log("response", response);

    if (!response) {
      throw new ApiError(404, `DATA NOT FOUND AGAINST THIS _id ${_id}`);
    }
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error; // Re-throw ApiError if it's a known error
    }
    throw new ApiError(505, "Server Errosr");
  }
};

const updateDocumnet = async (input) => {
  try {
    const { title, author, description, publishedYear, active, _id } = input;
    console.log(title, author, description, publishedYear, active, _id);

    const oldData = await BooklistModel.findById(_id);
    console.log(oldData);

    if (!oldData) throw new Error("Data Not Found!!!");
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
    return response;
  } catch (error) {
    throw new Error({ message: error.message });
  }
};

const DeleteADoc = async (input) => {
  try {
    const { _id } = input;
    const response = await BooklistModel.findByIdAndDelete(_id);
    if (!response) throw new Error("Data Not Found!!!");
    return response;
  } catch (error) {
    throw new Error({ message: error.message });
  }
};

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
