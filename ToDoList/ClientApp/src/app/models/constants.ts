import {ToDoListItem} from "./models";

export class Constants{
  public static get DefaultToDoListItem(): ToDoListItem{
    return {id: 0, itemText: "", isDone: false}
  }
}
