const asyncHandler = (Function) => {
  return (req, res, next) => {
      Promise.resolve(Function(req, res, next)).catch((err) => next(err))
  }
}

export { asyncHandler };