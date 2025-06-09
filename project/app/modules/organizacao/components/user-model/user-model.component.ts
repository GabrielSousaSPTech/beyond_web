import { ChangeDetectionStrategy, Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { BaseModalComponent } from '../../../../shared/components/base-modal/base-modal.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CardUserService } from '../../services/card-user/card-user.service';
import { Subscription } from 'rxjs';
import { userRegisteredApi } from '../../../../shared/models/users-registered';
import { CustomSelectComponent } from "../../../../shared/components/custom-select/custom-select.component";
import { permissao } from '../../../../shared/models/permissao.type';

@Component({
  selector: 'app-user-model',
  imports: [CommonModule, BaseModalComponent, ReactiveFormsModule, CustomSelectComponent],
  templateUrl: './user-model.component.html',
  styleUrl: './user-model.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserModelComponent extends BaseModalComponent {
  protected cardUserService = inject(CardUserService);
  protected user: userRegisteredApi = {} as userRegisteredApi;
  protected alterUser: WritableSignal<Boolean> = signal(false);
  protected delUserConfirmation: WritableSignal<Boolean> = signal(false);
  private tempTitle = '';
  protected permissoes: WritableSignal<permissao[]> = signal([] as permissao[]);

  @Input() openModal: WritableSignal<boolean> = signal(false);
  
  userForm: FormGroup;
  constructor(private fb: FormBuilder){
    super();
    this.userForm = this.fb.group({
      perm: ['']
    })
    this.cardUserService.activeUser$.subscribe(data=>{
      this.user = data;
      console.log("user ativado:",this.user)
      if(Object.values(data).length > 0){
        console.log("dentro do for")
          this.userForm.patchValue({ 
          perm: this.user.FK_PERMISSAO
        })
      }
      this.userForm.markAsPristine();
      this.userForm.disable()
      this.alterUser.set(false);
      this.delUserConfirmation.set(false);
      this.title = this.tempTitle;
      this.tempTitle = '';
      this.cardUserService.getPermissions().subscribe(data=>{this.permissoes.set(data)})
    })
  }

  permissoesTransformadas(){
    return this.permissoes().map(x=> {
        return {
          value: x.ID_PERMISSAO,
          label: x.NOME
        }
      }
    )
  }

  submit(){
    const formValues = this.userForm.value;
    this.cardUserService.updateUserPermitions(this.user.ID_FUNC, formValues.perm);
  }

  updateUser(){
    this.alterUser.set(true);
    this.delUserConfirmation.set(false);
    this.userForm.enable()
  }

  confirmDeleteUser(){
    this.delUserConfirmation.set(true)
    this.tempTitle = this.title;
    this.title = `Você tem certeza quer deletar ${this.user.NOME}?`;
  }

  cancelDelete() {
    this.delUserConfirmation.set(false);
    this.title = this.tempTitle;
    this.tempTitle = '';
  }

  deleteUser(){
    this.cardUserService.deleteUser(this.user.ID_FUNC);
    this.delUserConfirmation.set(false);
    this.alterUser.set(false);
    this.onClose();
    this.cardUserService.getUsersRegistered();
  }

  override onClose(): void {
    this.tempTitle = this.user.NOME;
    this.delUserConfirmation.set(false);
    this.alterUser.set(false);
    this.closeModal.emit()
    this.openModal.set(false);
  }
 }
