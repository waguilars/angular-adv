import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.model';

import Swal from 'sweetalert2';

import { UserService } from '../../../services/user.service';
import { SearchService } from '../../../services/search.service';
import { ModalService } from '../../../services/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit, OnDestroy {
  public totalUsers = 0;
  public page = 0;
  public users: User[];
  public usersTemp: User[];
  public loading = true;

  private image$: Subscription;

  constructor(
    private userSv: UserService,
    private searchSv: SearchService,
    private modalSV: ModalService
  ) {}

  ngOnDestroy(): void {
    this.image$.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsers();

    this.image$ = this.modalSV.newImage$.subscribe((img: any) =>
      this.loadUsers()
    );
  }

  loadUsers(): void {
    this.loading = true;
    this.userSv.loadUsers(this.page).subscribe(({ total, users }) => {
      this.totalUsers = total;
      this.users = users;
      this.usersTemp = users;
      this.loading = false;
    });
  }

  search(term: string): User[] {
    if (term.length === 0) {
      return (this.users = this.usersTemp);
    }
    this.searchSv.search('users', term).subscribe((results: User[]) => {
      this.users = results;
    });
  }

  deleteUser(user: User): Promise<any> {
    if (user.uid === this.userSv.uid) {
      return Swal.fire('Error', 'No puede eliminarse a usted mismo.', 'error');
    }

    Swal.fire({
      title: '¿Estas seguro?',
      text: `Estas a punto de eliminar a ${user.name} del sistema.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userSv.deleteUser(user).subscribe((resp) => {
          this.loadUsers();
          Swal.fire(
            'Usuario eliminado!',
            `${user.name} fue eliminado correctamente.`,
            'success'
          );
        });
      }
    });
  }

  changeRole(user: User): void {
    this.userSv.saveUser(user).subscribe((resp) => {
      console.log(resp);
    });
  }

  changePage(value: number): void {
    this.page += value;

    if (this.page < 0) {
      this.page = 0;
    } else if (this.page > this.totalUsers) {
      this.page -= value;
    }

    this.loadUsers();
  }

  showModal(user: User): void {
    this.modalSV.showModal('users', user.imageUrl, user.uid);
  }
}
