import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userName: WritableSignal<string> = signal(sessionStorage.getItem('NOME_USUARIO') || 'Usuário');
  public email: WritableSignal<string> = signal(sessionStorage.getItem('EMAIL_USUARIO') ||'email');
  constructor() { }

}
