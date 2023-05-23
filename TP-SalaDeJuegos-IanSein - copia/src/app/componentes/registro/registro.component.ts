import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/clases/user';
import { NotificationService } from 'src/app/services/notification.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  titleLogin = 'REGISTRO';
  newUser: User = new User();
  confirmPassword = '';

  typePass1 = true;
  typePass2 = true;

  constructor(
    private notifyService: NotificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  registerUser(event: Event) {
    event.preventDefault();
    if (
      this.newUser.name === '' ||
      this.newUser.email === '' ||
      this.newUser.password === '' ||
      this.confirmPassword === ''
    ) {
      this.notifyService.showWarning(
        'Complete todos los campos!',
        'Atención'
      );
    } else if (this.newUser.password !== this.confirmPassword) {
      this.notifyService.showWarning(
        'Las contraseñas deben ser iguales',
        'Error contraseña'
      );
    } else {
      this.authService.registerNewUser(this.newUser);
    }
  } // end of registerUser

  toggleTypePass1() {
    this.typePass1 = !this.typePass1;
  }

  toggleTypePass2() {
    this.typePass2 = !this.typePass2;
  }
}