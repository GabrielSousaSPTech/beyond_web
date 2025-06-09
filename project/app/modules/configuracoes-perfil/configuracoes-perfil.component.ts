import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderTitleService } from '../../core/services/header-title/header-title.service';
import { UserService } from '../../core/services/user/user.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-configuracoes-perfil',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './configuracoes-perfil.component.html',
  styleUrl: './configuracoes-perfil.component.css'
})
export class ConfiguracoesPerfilComponent implements OnInit {
  private userService = inject(UserService);
  userName = this.userService.userName();
  email = this.userService.email();
  nivelPermissao = this.userService.nivelPermissao();
  usuario = this.userService.usuario();
  senha = this.userService.senha();
  userForm: FormGroup;
  constructor(public headerTitleService: HeaderTitleService, private fb: FormBuilder ) {
    this.userForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      telefone: ['',[Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      // foto: ['',[Validators.required]],
      cpf:['',[Validators.required]]
    })

    this.userForm.patchValue({
      email: this.usuario.EMAIL,
      telefone: this.usuario.TEL,
      cpf: this.usuario.CPF
    })
   }

   submitForm() {
     let user = this.usuario;
     user.EMAIL = this.userForm.value.email
     user.TEL = this.userForm.value.telefone
     user.CPF = this.userForm.value.cpf
      this.userService.updateUsuario(user)
   }

  ngOnInit(): void {
    this.headerTitleService.setTitle('Configurações');
    console.log(this.senha)
  }
}
