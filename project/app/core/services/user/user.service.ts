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
  public usuario : WritableSignal<userRegisteredApi> = signal({} as userRegisteredApi)
  public senha : WritableSignal<senhaUser> = signal({} as senhaUser)


getUsuario() {
  this.http.get<userRegisteredApi[]>('/usuarios/' + sessionStorage.getItem("ID_USUARIO")).subscribe({
    next: (response) => {
      const usuario = response?.[0] as userRegisteredApi;
       this.usuario.set(usuario)
    },
    error: (error) => {
      console.error('Erro ao carregar usuário:', error);

    }
  });
}

updateUsuario(user: any){
   this.http.put(`/usuarios/edit/${user.ID_FUNC}`, user).subscribe({
      next: (response) => {
        console.log("RESPONSE", response);
        sessionStorage.setItem('EMAIL_USUARIO',user.EMAIL)
      },
      error: (error) => {
        console.error(error)
      }
    })
}

// updateSenha() {
//   this.http.get<senhaUser>('/usuarios/editSenha/'+ sessionStorage.getItem("ID_USUARIO")).subscribe({
//     next: (response) => {
//       const senha = response as senhaUser;
//       console.log("ODEIO ANGULAR",senha)
//        this.senha.set(senha)
//     },
//     error: (error) => {
//       console.error('Erro ao carregar senha:', error);

//     }
//   });
// }
  constructor() {
    this.getUsuario();
    // this.updateSenha();
   }
}
