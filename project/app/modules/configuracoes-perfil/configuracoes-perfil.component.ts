import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderTitleService } from '../../core/services/header-title/header-title.service';
import { UserService } from '../../core/services/user/user.service';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';
import { ImageUploadResponse, userRegisteredApi } from '../../shared/models/users-registered';
@Component({
  selector: 'app-configuracoes-perfil',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './configuracoes-perfil.component.html',
  styleUrl: './configuracoes-perfil.component.css'
})
export class ConfiguracoesPerfilComponent implements OnInit {


selectedFile: File | null = null;
  previewUrl: string | null = null;


  estadoFormulario: WritableSignal<boolean> = signal(true);

  private userService = inject(UserService);
  userName = this.userService.userName();
  email = this.userService.email();
  nivelPermissao = this.userService.nivelPermissao();
  usuario: any;
  senha = this.userService.senha();
  public interacaoUsuario: WritableSignal<string> = signal('');
  userForm: FormGroup;
  formSenha: FormGroup

  foto: any = "";
  nome: any = "";
  tipo: any = "";

  constructor(public headerTitleService: HeaderTitleService, private fb: FormBuilder) {
    this.usuario = this.userService.usuario()
    console.log("user",this.usuario)
    this.userForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
       foto: [''],
      cpf: ['', [Validators.required]]
    })

    this.formSenha = fb.group({
      senhaAtual: ['', [Validators.required]],
      novaSenha: ['', [Validators.required]],
      confirmarSenha: ['', [Validators.required]]
    })

    this.userService.usuario$.subscribe(user => {
      this.userForm.patchValue({
        email: user.EMAIL,
        telefone: user.TEL,
        cpf: user.CPF,
      })
      this.foto = user.FOTO
      this.nome = user.NOME
      this.tipo = user.TIPO
    })


  }
  alterarForm() {
    if (this.estadoFormulario()) {
  
      this.estadoFormulario.set(false)
      this.interacaoUsuario.set('')
    } else {
      
      this.estadoFormulario.set(true)
      this.interacaoUsuario.set('')
    }
  }
submitForm() {
  console.log("ochi") 
  let user = this.usuario;     
  user.EMAIL = this.userForm.value.email;     
  user.TEL = this.userForm.value.telefone;     
  user.CPF = this.userForm.value.cpf;  

  this.userService.updateUsuario(user).subscribe({
    next: (response) => {
      if (response.sucesso) {
        sessionStorage.setItem('EMAIL_USUARIO', user.EMAIL);
        this.interacaoUsuario.set('Atualizado com sucesso!');
      } else {
        this.interacaoUsuario.set(response.message || 'Erro ao atualizar usuário');
      }
    },
    error: (error) => {
      if (error.status === 400) {
        this.interacaoUsuario.set('Dados inválidos. Verifique as informações.');
      } else if (error.status === 404) {
        this.interacaoUsuario.set('Usuário não encontrado');
      } else if (error.status === 500) {
        this.interacaoUsuario.set('Erro interno do servidor. Tente novamente.');
      } else {
        this.interacaoUsuario.set('Erro ao atualizar usuário. Tente novamente.');
      }
    }
  });
}





  submitFormSenha() {
    if ((this.formSenha.value.novaSenha != null && this.formSenha.value.confirmarSenha != null)) {
      if (this.formSenha.value.novaSenha != this.formSenha.value.senhaAtual) {
        if ((this.formSenha.value.novaSenha == this.formSenha.value.confirmarSenha)) {

          let senha = this.senha;
          senha.senhaAtual = this.formSenha.value.senhaAtual
          senha.senhaNova = this.formSenha.value.novaSenha
          let idUsuario = sessionStorage.getItem("ID_USUARIO")

          this.userService.updateSenha(idUsuario, senha).subscribe({
            next: (response) => {
              if (response.sucesso) {
                this.interacaoUsuario.set('Atualizado com sucesso!');
                this.formSenha.reset();
              } else {
                this.interacaoUsuario.set(response.message || 'Erro ao atualizar senha');
              }
            },
            error: (error) => {

              if (error.status === 400 && error.error?.message === 'Senha atual incorreta') {
                this.interacaoUsuario.set('Senha atual incorreta');
              } else if (error.status === 404) {
                this.interacaoUsuario.set('Usuário não encontrado');
              } else if (error.status === 500) {
                this.interacaoUsuario.set('Erro interno do servidor. Tente novamente.');
              } else {
                this.interacaoUsuario.set('Erro ao atualizar senha. Tente novamente.');
              }
            }
          });

        } else {
          this.interacaoUsuario.set('As senhas não coincidem')
        }
      } else {
        this.interacaoUsuario.set('As senhas são iguais')
      }
    } else {
      this.interacaoUsuario.set('Preencha os campos')
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      this.selectedFile = file;
      
     
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
        
        
        const imgElement = document.querySelector('.profile-picture img') as HTMLImageElement;
        if (imgElement) {
          imgElement.src = e.target.result;
        }
      };
      reader.readAsDataURL(file);
      
      this.uploadProfileImage(file);
    }
  }

 async uploadProfileImage(file: File): Promise<void> {
    const formData = new FormData();
    formData.append('foto', file, file.name);

    const idFuncionario = this.userService.usuario().ID_FUNC;


    try {
      const response: ImageUploadResponse = await lastValueFrom(this.userService.updateUserImage(idFuncionario, formData));
        
        const updatedUser: userRegisteredApi = { ...this.userService.usuario() };
        updatedUser.FOTO = response.path || '';
        this.interacaoUsuario.set('Foto de perfil atualizada com sucesso!');
    } catch (error: any) {
      
      this.interacaoUsuario.set('Erro ao enviar a foto. Verifique a conexão ou tente novamente mais tarde.');
      console.error('Erro ao fazer upload da imagem:', error);
    }
  }

  getFotoUsuario(): string {
  const foto = String(this.foto || '').trim();

  return foto !== ''
    ? `/assets/usuarios/${foto}`
    : 'assets/icons/misc/icon-user-template.svg';
}

  ngOnInit(): void {
    this.headerTitleService.setTitle('Configurações');
    this.estadoFormulario.set(true)
    this.getFotoUsuario();
  }
}
