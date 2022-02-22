import {Injectable} from "@angular/core";
import {DataAccessService} from "./data-access.service";
import {ToDoListItem} from "./models/models";
import {BehaviorSubject, Observable} from "rxjs";
import {UtilsService} from "./utils.service";

@Injectable({
  providedIn: 'root'
})
export class ToDoListFacade{
  private _toDoListItemSubject: BehaviorSubject<ToDoListItem[]> = new BehaviorSubject<ToDoListItem[]>([])
  public ToDoListItems: Observable<ToDoListItem[]> = this._toDoListItemSubject.asObservable();
  private _isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public IsLoading: Observable<boolean> = this._isLoadingSubject.asObservable();
  public selectedItem: ToDoListItem = {id: 0, isDone: false, itemText: ""};
  constructor(private service: DataAccessService, private utils: UtilsService) {
    this.loadAllToDoListItems();
  }

  loadAllToDoListItems(){
    this._isLoadingSubject.next(true);
    this.service.getAllToDoListItems().subscribe({
      next: items =>{
        this._toDoListItemSubject.next([...items]);
      },
      error: err => {
        this.utils.showError("Something went wrong.");
      },
      complete: () => {
        this._isLoadingSubject.next(false);
      }
    });
  }

  createToDoListItem(item: ToDoListItem){
    this.service.createToDoListItem(item).subscribe({
      next: item => {
        let items = this._toDoListItemSubject.value;
        this._toDoListItemSubject.next([...items, item]);
        this.utils.showMessage("Successfully created.");
      },
      error: err => {
        this.utils.showError("Something went wrong.");
      }
    })
  }

  updateToDoListItem(item: ToDoListItem){
    this.service.updateToDoListItem(item).subscribe({
      next: item =>{
        let items = this._toDoListItemSubject.value;
        let index = items.findIndex(x => x.id == item.id);
        items[index] = item;
        this._toDoListItemSubject.next([...items]);
        this.utils.showMessage("Successfully updated.");
      },
      error: err => {
        this.utils.showError("Something went wrong.");
      }
    })
  }

  deleteToDoListItem(item_id: number){
    this.service.deleteToDoListItem(item_id).subscribe({
      next: item =>{
        let items = this._toDoListItemSubject.value;
        let index = items.findIndex(x => x.id == item.id);
        items.splice(index, 1);
        this._toDoListItemSubject.next([...items]);
        this.utils.showMessage("Successfully deleted.");
      },
      error: err => {
        this.utils.showError("Something went wrong.");
      }
    })
  }

}
