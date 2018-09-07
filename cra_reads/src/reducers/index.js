import { combineReducers } from "redux";
import Categories from "./Categories";
import StateChange from "./StateChange";
import Posts from "./Posts";
import Comments from "./Comments";

export default combineReducers({
  Categories,
  StateChange,
  Posts,
  Comments
});
