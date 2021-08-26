import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  show: any;
  role: any;
  constructor(private route: Router) {}
  ngOnInit(): void {
    var ls = localStorage.getItem('log');
    this.show = ls;
    var re = localStorage.getItem('role');
    console.log(re);
    this.role = re;
  }
}
