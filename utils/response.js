
const baseResponse = (success, message, object = null, errors = null) => {
  const response = {
    success,
    message,
  };

  if (object !== null) {
    response.object = object;
  }

  if (errors !== null) {
    response.errors = errors;
  }

  return response;
};

const paginatedResponse = (success, message, objects = [], currentPage, pageSize, totalProducts, errors = null) => {
  const totalPages = Math.ceil(totalProducts / pageSize);
  
  const response = {
    success,
    message,
    currentPage,
    pageSize,
    totalPages,
    totalProducts,
    products: objects,
  };

  if (errors !== null) {
    response.errors = errors;
  }

  return response;
};

module.exports = {
  baseResponse,
  paginatedResponse,
};
