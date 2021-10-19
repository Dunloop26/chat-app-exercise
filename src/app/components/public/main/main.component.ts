import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private profileSrv: ProfileService, private fb: FormBuilder) { }

  @ViewChild('photoInput') photoInput? : ElementRef;

  msgForm = this.fb.group({
    'user': ['', [Validators.required]],
    'msg' : ['', [Validators.required]]
  });

  ngOnInit(): void {
  }

  onMessageSubmit() {
    console.log(this.msgForm.value);
  }

  onProfileSubmit(): void {
    console.log('Submiting...');
    const fileUploader : HTMLInputElement = this.photoInput?.nativeElement;
    console.log(fileUploader.files);

    if (fileUploader.files != null && fileUploader.files.length > 0) {
      const formData = new FormData();
      formData.append('photo', fileUploader.files[0]);
      this.profileSrv.sendProfileData(formData);

    }
  }

}
