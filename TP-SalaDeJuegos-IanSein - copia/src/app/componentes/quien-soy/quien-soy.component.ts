import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.css']
})
export class QuienSoyComponent implements OnInit{
  perfil: any = null;

  constructor(
    private http: HttpClient,
  ) {}

  ngOnInit(): void {  
    this.http.get('https://api.github.com/users/iansein').subscribe((res: any) => {
      this.perfil = res;
    });
  }
}

