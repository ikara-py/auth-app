export const handleApiError = (error) => {
  if (!error.response) {
    return 'Cannot connect to server. Is Laravel running?';
  }
  const { status, data } = error.response;
  switch (status) {
    case 401:
      return data.message || 'You are not authorized. Please log in.';
    case 422:
      if (data.errors) {
        const firstField = Object.keys(data.errors)[0];
        return data.errors[firstField][0];
      }
      return data.message || 'Validation failed.';
    case 500:
      return 'Server error. Please try again later.';
    default:
      return data.message || 'An unexpected error occurred.';
  }
};
