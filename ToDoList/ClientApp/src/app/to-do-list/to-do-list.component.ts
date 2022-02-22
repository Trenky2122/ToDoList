import {Component, OnInit, ViewChild} from '@angular/core';
import {DataAccessService} from "../data-access.service";
import {MatTableDataSource} from "@angular/material/table";
import {ToDoListItem} from "../models/models";
import {MatPaginator} from "@angular/material/paginator";
import {Subscription} from "rxjs";
import {ToDoListFacade} from "../to-do-list-facade";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {EditItemComponent} from "./edit-item/edit-item.component";

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit {
  dataSource: MatTableDataSource<ToDoListItem> = new MatTableDataSource();
  @ViewChild("paginator", {static: true}) paginator: MatPaginator | undefined;
  sub: Subscription = new Subscription();
  isLoading: boolean = false;
  displayedColumns = ["itemText", "isDone", "actions"];

  constructor(private facade: ToDoListFacade, private dialog: MatDialog) { }

  toggleItem(item: ToDoListItem){
    let itemNew = {...item}
    itemNew.isDone = !itemNew.isDone;
    this.facade.updateToDoListItem(itemNew);
  }

  createItem(){
    this.facade.selectedItem = {id: 0, isDone: false, itemText: ""};
    this.dialog.open(EditItemComponent, {width: "80%"});
  }

  updateItem(item: ToDoListItem){
    this.facade.selectedItem = item;
    this.dialog.open(EditItemComponent, {width: "60%"});
  }

  deleteItem(item_id: number){
    this.facade.deleteToDoListItem(item_id);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator!;
    this.sub.add(this.facade.ToDoListItems.subscribe(items => {
      this.dataSource.data = items;
    }));
    this.sub.add(this.facade.IsLoading.subscribe(loading => this.isLoading = loading));
  }

  ngOnDelete(): void{
    this.sub.unsubscribe();
  }

}
