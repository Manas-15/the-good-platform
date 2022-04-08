// import Config from 'react-native-config';
import Get from "./Get";
import Post from "./Post";
import Put from "./Put";
import Delete from "./Delete";

// GET
const categories = (token) => Get("api/close/admin/categories", false, token);

//POST
const signup = (data) => Post("api/register_user", false, data);
const login = (data) => Post("api/login", false, data);
const actions = (data, token) =>
  Post(`api/close/admin/actionlists`, false, data, token);
const addCorporate = (data) => Post(`api/corporate_register`, false, data);

// PUT
const actionsEdit = (data, token) =>
  Put(`api/close/admin/actions/${data.id}`, false, data, token);

// DELETE
const actionsDelete = (id, token) =>
  Delete(`api/close/admin/actions/${id}`, false, token);
const API = {
  signup,
  login,
  categories,
  actions,
  actionsEdit,
  actionsDelete,
  addCorporate,
};

export default API;
