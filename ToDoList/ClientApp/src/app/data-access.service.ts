import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from "rxjs";
import {ToDoListItem} from "./models/models";

@Injectable({
  providedIn: 'root'
})
export class DataAccessService {

  constructor(private http: HttpClient) { }

  public getAllToDoListItems(): Observable<ToDoListItem[]>{
    return this.http.get<ToDoListItem[]>("/api/ToDoListItem/GetToDoListItems");
  }

  public createToDoListItem(item: ToDoListItem): Observable<ToDoListItem>{
    return this.http.post<ToDoListItem>("/api/ToDoListItem/CreateToDoListItem", item);
  }

  public updateToDoListItem(item: ToDoListItem): Observable<ToDoListItem>{
    return this.http.put<ToDoListItem>("/api/ToDoListItem/EditToDoListItem", item);
  }

  public deleteToDoListItem(item_id: number): Observable<ToDoListItem>{
    return this.http.delete<ToDoListItem>("/api/ToDoListItem/DeleteToDoListItem/" + item_id);
  }
}
