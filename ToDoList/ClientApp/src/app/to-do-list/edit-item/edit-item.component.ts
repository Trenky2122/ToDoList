import { Component, OnInit } from '@angular/core';
import {ToDoListItem} from "../../models/models";
import {ToDoListFacade} from "../../to-do-list-facade";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  item: ToDoListItem = {...this.facade.selectedItem};
  create: boolean = this.item.id == 0;
  formGroup: FormGroup = new FormGroup({});

  constructor(private facade: ToDoListFacade, private formBuilder: FormBuilder, private dialog: MatDialog) { }

  createForm(){
    this.formGroup = this.formBuilder.group({
      "itemText":[this.item.itemText]
    })
  }

  ngOnInit(): void {
    this.createForm();
  }

  submit(){
    let newItem = Object.assign(this.item, this.formGroup.value);
    if(this.create){
      this.facade.createToDoListItem(newItem);
    }
    else{
      this.facade.updateToDoListItem(newItem);
    }
    this.dialog.closeAll();
  }

}
