import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {CreateCategoryComponent} from "../create-category/create-category.component";
import {TokenService} from "../../../../service/token.service";
import {Category} from "../../../../model/Category";
import {CategoryService} from "../../../../service/category.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UpdateCategoryComponent} from "../update-category/update-category.component";
import {DeleteCategoryComponent} from "../delete-category/delete-category.component";

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {
  checkUserLogin = false;
  listCategory: Category[] = [];
  displayedColumns: string[] = ['position', 'id', 'name', 'avatar', 'edit','delete'];
  dataSource: any;

  constructor(public dialog: MatDialog,
              private tokenService: TokenService,
              private categoryService: CategoryService,
  ) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateCategoryComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result || result == undefined) {
        this.categoryService.getListService().subscribe(data => {
          this.listCategory = data;
          this.dataSource = new MatTableDataSource<Category>(this.listCategory);
          this.dataSource.paginator = this.paginator;
        })
      }
    });
  }

  openDialogUpdate(id: any) {
    const dialogRef = this.dialog.open(UpdateCategoryComponent, {
      data: {
        dataKey: id
      }
    });
    console.log("id Dialog ----->", id)

    dialogRef.afterClosed().subscribe(result => {
      if (result || result == undefined) {
        this.categoryService.getListService().subscribe(data => {
          this.listCategory = data;
          this.dataSource = new MatTableDataSource<Category>(this.listCategory);
          this.dataSource.paginator = this.paginator;
        })
      }
    });
  }

  openDialogDelete(id: any) {
    const dialogRef = this.dialog.open(DeleteCategoryComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoryService.deleteCategoryById(id).subscribe(()=>{
          this.categoryService.getListService().subscribe(data => {
            this.listCategory = data;
            this.dataSource = new MatTableDataSource<Category>(this.listCategory);
            this.dataSource.paginator = this.paginator;
          })
        })
      }
    });
  }

  // phan trang
  @ViewChild(MatPaginator) paginator?: MatPaginator;

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.checkUserLogin = true;
    }
    this.categoryService.getListService().subscribe(data => {
      this.listCategory = data;
      this.dataSource = new MatTableDataSource<Category>(this.listCategory);
      this.dataSource.paginator = this.paginator;
    })
  }
}
