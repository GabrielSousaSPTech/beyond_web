import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { userRegisteredApi, senhaUser } from '../../../shared/models/users-registered';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient)
  public userName: WritableSignal<string> = signal(sessionStorage.getItem('NOME_USUARIO') || 'Usuário');
  public email: WritableSignal<string> = signal(sessionStorage.getItem('EMAIL_USUARIO') ||'email');
  public nivelPermissao: WritableSignal<string> = signal(sessionStorage.getItem('TIPO_USUARIO') ||'permissao');
  public telefone: WritableSignal<string> = signal('(00) 0000-0000');
  public senha: string | any;

getUsuario() {
  this.http.get<userRegisteredApi[]>('/usuarios/' + sessionStorage.getItem("ID_USUARIO")).subscribe({
    next: (response) => {
      const usuario = response?.[0];
      if (usuario) {
        this.userName.set(usuario.NOME ?? 'Usuário');
        this.email.set(usuario.EMAIL ?? 'email');
        this.nivelPermissao.set(usuario.TIPO ?? 'permissao');
        this.telefone.set(usuario.TEL ?? '(00) 0000-0000');
      }
    },
    error: (error) => {
      console.error('Erro ao carregar usuário:', error);

    }
  });
}

getSenha() {
  this.http.get<senhaUser>('/usuarios/getSenha/' + sessionStorage.getItem("ID_USUARIO")).subscribe({
    next: (response) => {
      this.senha.set(response.SENHA ?? '');
    },
    error: (error) => {
      console.error('Erro ao buscar senha:', error);
    }
  });
}
  constructor() { }
}
