import {Component, OnInit} from '@angular/core';
import {CreateStoryComponent} from "../../story/create-story/create-story.component";
import {MatTableDataSource} from "@angular/material/table";
import {Story} from "../../../../model/Story";
import {MatDialog} from "@angular/material/dialog";
import {TokenService} from "../../../../service/token.service";
import {CreateChapterImageComponent} from "../create-chapter-image/create-chapter-image.component";

@Component({
  selector: 'app-list-chapter-image',
  templateUrl: './list-chapter-image.component.html',
  styleUrls: ['./list-chapter-image.component.scss']
})
export class ListChapterImageComponent implements OnInit{


constructor(public dialog: MatDialog,
            private tokenService: TokenService) {
}
  openDialogCreate() {
    const dialogRef = this.dialog.open(CreateChapterImageComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result || result == undefined) {

      }
    });
  }

  ngOnInit(): void {

  }
}
