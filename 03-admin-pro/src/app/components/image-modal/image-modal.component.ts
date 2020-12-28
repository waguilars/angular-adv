import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { FileUploadService } from '../../services/file-upload.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styles: [],
})
export class ImageModalComponent implements OnInit {
  private imgTag: any;
  public imageToUpload: File;
  @ViewChild('imgSelector') inputTag: ElementRef;

  constructor(
    public modalSv: ModalService,
    private fileUploadSv: FileUploadService
  ) {}

  ngOnInit(): void {
    this.imgTag = document.getElementById('modal-img');
  }

  closeModal(): void {
    this.modalSv.closeModal();
    // this.imgTag.src = this.modalSv.img;
    this.inputTag.nativeElement.value = '';
    this.imageToUpload = null;
  }

  uploadImage(): void {
    const type = this.modalSv.type;
    const id = this.modalSv.id;
    this.fileUploadSv
      .updatePhoto(this.imageToUpload, type, id)
      .then((img: string) => {
        img
          ? Swal.fire('Guardando', 'Imagen actualizada', 'success')
          : Swal.fire('Error', 'No se pudo subir la imagen', 'error');

        this.modalSv.newImage$.emit(img);
        this.closeModal();
      })
      .catch((err) => {
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      });
  }

  changeImage(file: File): void {
    this.imageToUpload = file;
    // console.log(file);

    if (!file) {
      this.imageToUpload = file;
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTag.src = reader.result;
    };
  }
}
