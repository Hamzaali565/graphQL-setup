const asyncHandler = (requestHandler) => {
  return async (req, res) => {
    try {
      await requestHandler(req, res);
    } catch (err) {
      throw new Error(err.message || "An error occurred");
    }
  };
};

export { asyncHandler };
