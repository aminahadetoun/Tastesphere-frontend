const signup = `/api/v1/auth/signup`;
const login = `/api/v1/auth/login`;
const getAllRecipe = (params: {}) =>  {
  let url = `/api/v1/recipe`;
  const queryParams = new URLSearchParams(params as Record<string, string>).toString();
  if (queryParams) {
    url += `?${queryParams}`;
  }
  return url;
};
const getAsingleRecipe = (id: string,) => `/api/v1/recipe/${id}`;
const addRecipe = `/api/v1/recipe`;


export {
  signup, 
  login,
  getAllRecipe,
  getAsingleRecipe,
  addRecipe
};
