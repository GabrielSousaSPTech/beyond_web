import { ChangeDetectionStrategy, Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { BaseModalComponent } from '../../../../shared/components/base-modal/base-modal.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CardUserService } from '../../services/card-user/card-user.service';
import { Subscription } from 'rxjs';
import { userRegisteredApi } from '../../../../shared/models/users-registered';
import { CustomSelectComponent } from "../../../../shared/custom-select/custom-select.component";

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

  // coleque todas as permissões aqui puxando do back
  permissoes = [
    //{ value: 'insira o valor (fk)', label: 'insira como deve aparecer (tipo)' }
    { value: 1, label: 'oi gabriel' } // retire isso
  ]

  @Input() openModal: WritableSignal<boolean> = signal(false);
  
  userForm: FormGroup;
  constructor(private fb: FormBuilder){
    super();
    this.userForm = this.fb.group({
      perm: ['']
    })
    this.cardUserService.activeUser$.subscribe(data=>{
      this.user = data;
      if(Object.values(data).length > 0){
          this.userForm.patchValue({ 
          perm: this.user.FK_PERMISSAO
        })
      }
      this.userForm.markAsPristine();
      this.userForm.disable()
      this.alterUser.set(false)
    })
  }

  submit(){
    const formValues = this.userForm.value;
    this.cardUserService.updateUserPermitions(this.user.ID_FUNC, formValues.perm);
  }

  updateUser(){
    this.alterUser.set(true);
    this.userForm.enable()
  }

  deleteUser(){
    this.delUserConfirmation.set(true)
    // mostrar modal de delete
  }

  override onClose(): void {
    this.closeModal.emit()
    this.openModal.set(false);
  }
 }
