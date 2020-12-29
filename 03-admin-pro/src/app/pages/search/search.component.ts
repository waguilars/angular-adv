import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { User } from '../../models/user.model';
import { Doctor } from '../../models/doctor.model';
import { Hospital } from '../../models/hospital.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  public doctors: Doctor[] = [];
  public hospitals: Hospital[] = [];
  public users: User[] = [];

  constructor(private route: ActivatedRoute, private searchSv: SearchService) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ term }) => {
      this.search(term);
    });
  }

  search(term: string): void {
    this.searchSv.globalSearch(term).subscribe((resp) => {
      this.doctors = resp.doctors;
      this.hospitals = resp.hospitals;
      this.users = resp.users;
    });
  }

  openDoctor(doc: Doctor): void {}
}
