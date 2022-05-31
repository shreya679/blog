import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Blog } from "../../../blog.model";
import { BlogService } from "../../../blog.service";
import { ApiService } from "src/app/igap/service/api.service";
import { MatSnackBar } from "@angular/material/snack-bar";
@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.sass"],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  blogForm: FormGroup;
  blog: Blog;
  cities:any;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public blogService: BlogService,
    private api:ApiService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    
    let formdata = {talukaid:0}
    this.api.post("shared/city/list", formdata).subscribe((result:any)=>{      
      console.log(result.data);
      this.cities = result.data.data;
    });
    
    // Set the defaults
    this.action = data.action;
    if (this.action === "edit") {
      this.dialogTitle = data.blog.name;
      this.blog = data.blog;
    } else {
      this.dialogTitle = "New Blog";
      this.blog = new Blog({});
    }
    this.blogForm = this.createContactForm();

  }

  formControl = new FormControl("", [Validators.required]);

  getErrorMessage() {
    return this.formControl.hasError("required")
      ? "Required field"
      : this.formControl.hasError("email")
      ? "Not a valid email"
      : "";
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [this.blog.id],
      businessid: [this.blog.businessid],
      categoryid: [this.blog.categoryid],
      title: [this.blog.title],
      urltitle: [this.blog.urltitle],
      createdon: [this.blog.createdon],
      author: [this.blog.author],
      picpath: [this.blog.picpath],
      body: [this.blog.body], 
      status: [this.blog.status],
    });
  }

  submit(formdata:Blog) {
    this.blogService.save(formdata).subscribe((result:any)=>{
      if(result.data.status == "success")
      {
        this.showNotification(
          "snackbar-success",
          "Successful",
          "bottom",
          "center"
        );
        this.dialogRef.close();
      }
      else{
        this.showNotification(
          "snackbar-error",
          "Failed - " + result.data.message,
          "bottom",
          "center"
        );
      }
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }  

  showNotification(colorName, text, placementFrom, placementAlign) {
    this.snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}