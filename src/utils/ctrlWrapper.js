export const ctrlWrapper = (controller) => {
  return async (res, req, next) => {
    try {
      await controller(res, req, next);
    } catch (error) {
      next(error);
    }
  };
};
