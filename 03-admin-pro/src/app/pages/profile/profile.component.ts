import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { FileUploadService } from '../../services/file-upload.service';
import { User } from '../../models/user.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public user: User;
  public imageToUpload: File;

  public loadingUser: boolean;
  public loadingImg: boolean;

  @ViewChild('profileimg') imgTag: ElementRef;

  constructor(
    private fb: FormBuilder,
    private userSv: UserService,
    private fileUploadSv: FileUploadService
  ) {
    this.user = userSv.user;
    this.loadingUser = false;
    this.loadingImg = false;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  changeImage(file: File): void {
    this.imageToUpload = file;

    if (!file) {
      this.imgTag.nativeElement.src = this.user.imageUrl;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTag.nativeElement.src = reader.result;
    };
  }

  uploadImage(): void {
    this.loadingImg = true;
    this.fileUploadSv
      .updatePhoto(this.imageToUpload, 'users', this.user.uid)
      .then((img: string) => {
        this.user.img = img;
        this.loadingImg = false;
        img
          ? Swal.fire('Guardando', 'Imgagen actualizada', 'success')
          : Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })
      .catch((err) => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        this.loadingImg = false;
      });
  }

  updateProfile(): void {
    this.loadingUser = true;
    this.userSv.updateProfile(this.profileForm.value).subscribe(
      (resp) => {
        const { name, email } = this.profileForm.value;
        this.user.name = name;
        this.user.email = email;
        this.loadingUser = false;
        Swal.fire(
          'Guardando',
          'Cambios se guardaron correctamente!',
          'success'
        );
      },
      (err) => {
        console.log(err);
        if (err.error.errors) {
          Swal.fire('Error', err.error.errors.email.msg, 'error');
        } else {
          Swal.fire('Error', err.error.msg, 'error');
        }
        this.loadingUser = false;
      }
    );
  }
}
