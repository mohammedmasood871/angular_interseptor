import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private route: Router) {}

  ngOnInit(): void {
    var currentuser = localStorage.getItem('currentUser');
  }
  Logout() {
    localStorage.clear();
    this.route.navigate(['']);
  }
}
