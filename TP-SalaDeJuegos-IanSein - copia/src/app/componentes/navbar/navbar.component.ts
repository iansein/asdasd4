import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: any = null;
  isLogged = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user: any) => {
      if (user) {
        this.user = user;
        this.isLogged = true;
      } else {
        this.user = null;
      }
    });
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }

  irALogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.notifyService.showInfo('La sesión fue cerrada', 'Fin Sesión');
    setTimeout(() => {
      this.isLogged = false;
      this.user = null;
      this.authService.userLogout();
    }, 1000);
  }
}
