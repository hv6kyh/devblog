import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss'],
})
export class WriteComponent implements OnInit {
  createPostForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder) {
    this.createPostForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  get f() { return this.createPostForm.controls; }

  onSubmit() {
    console.log(this.createPostForm.value);

  }

}
