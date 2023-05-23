import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../clases/user';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: any;
  isAdmin: boolean = false;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private notifyService: NotificationService,
    private router: Router
  ) {
    this.user$ = this.angularFireAuth.authState.pipe(
      switchMap((user: any) => {
        if (user) {
          return this.angularFirestore
            .doc<User>(`user/${user.uid}`)
            .valueChanges();
        } else {
          return of(null);
        }
      })
    );
  } // end of constructor

  registerNewUser(newUser: User) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((data) => {
        this.angularFirestore
          .collection('user')
          .doc(data.user?.uid)
          .set({
            userId: data.user?.uid,
            userName: newUser.name,
            userEmail: newUser.email,
            createdAt: Date.now(),
          })
          .then(() => {
            this.notifyService.showSuccess(
              'Redirigiendo...',
              'Registro exitoso'
            );
            setTimeout(() => {
              this.router.navigate(['']);
            }, 2000);
          })
          .catch((error) => {
            this.notifyService.showError(
              this.createMessage(error.code),
              'Error'
            );
          });
      })
      .catch((error) => {
        this.notifyService.showError(this.createMessage(error.code), 'Error');
      });
  } // end of registerNewUser

  async userLogin(email: string, password: string) {
    try {
      return await this.angularFireAuth.signInWithEmailAndPassword(
        email,
        password
      );
    } catch (error) {
      this.notifyService.showError(
        'Email y/o contraseña invalidos',
        'Inicio fallido'
      );
      return null;
    }
  } // end of userLogin

  userLogout() {
    this.isAdmin = false;
    this.angularFireAuth.signOut();
  } // end of logout

  createUserLog(collectionName: string, log: any) {
    return this.angularFirestore.collection(collectionName).add(log);
  } // end of createUserLog

  private createMessage(errorCode: string): string {
    let message: string = '';
    switch (errorCode) {
      case 'auth/internal-error':
        message = 'Los campos estan vacios';
        break;
      case 'auth/operation-not-allowed':
        message = 'La operación no está permitida.';
        break;
      case 'auth/email-already-in-use':
        message = 'El email ya está registrado.';
        break;
      case 'auth/invalid-email':
        message = 'El email no es valido.';
        break;
      case 'auth/weak-password':
        message = 'La contraseña debe tener al menos 6 caracteres';
        break;
      default:
        message = 'Error al crear el usuario.';
        break;
    }

    return message;
  } // end of createMessage

  getUserLogged() {
    return this.angularFireAuth.authState;
  } // end of getUserLogged

  sendUserResult(nombreJuego: string, resultado: any) {
    return this.angularFirestore.collection(nombreJuego).add(resultado);
  } // end of sendUserResult

  getCollection(collectionName: string) {
    const collection = this.angularFirestore.collection<any>(collectionName);
    return collection.valueChanges();
  } // end of getCollection
  
}