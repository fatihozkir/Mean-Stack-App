import { Component, Inject, Input, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-error",
  templateUrl: "./error.component.html",
  styleUrls: ["./error.component.css"],
})
export class ErrorComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  ngOnInit() {}
}
