import { ChangeDetectionStrategy, Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { BaseModalComponent } from '../../../../shared/components/base-modal/base-modal.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CardUserService } from '../../services/card-user/card-user.service';
import { Subscription } from 'rxjs';
import { userRegisteredApi } from '../../../../shared/models/users-registered';

@Component({
  selector: 'app-user-model',
  imports: [CommonModule, BaseModalComponent, ReactiveFormsModule],
  templateUrl: './user-model.component.html',
  styleUrl: './user-model.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserModelComponent extends BaseModalComponent {
  protected cardUserService = inject(CardUserService);
  protected user: userRegisteredApi = {} as userRegisteredApi;

  @Input() openModal: WritableSignal<boolean> = signal(false);
  
  userForm: FormGroup;
  constructor(private fb: FormBuilder){
    super();
    this.userForm = this.fb.group({
      email: [{value: ''}],
      telefone: [''],
      tipo: [''],
      perm: ['']
    })
    this.cardUserService.activeUser$.subscribe(data=>{
      if(Object.values(data).length > 0){
          this.userForm.patchValue({
          email: data.EMAIL,
          telefone: data.TEL,
          tipo: data.TIPO
          //perm: this.cardUserService.getPermissionNameById(data.fk_permissão)
        })
      }
    })
  }

  override onClose(): void {
    this.closeModal.emit()
    this.openModal.set(false);
  }
 }
