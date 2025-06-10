import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { CardUserService } from '../../services/card-user/card-user.service';
import { AsyncPipe } from '@angular/common';
import { userSolicitacao } from '../../../../shared/models/user-solicitacao.type';

@Component({
  selector: 'app-solicitacoes-popup',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './solicitacoes-popup.component.html',
  styleUrl: './solicitacoes-popup.component.css',
})
export class SolicitacoesPopupComponent { 
  protected userService = inject(CardUserService);

  protected users: WritableSignal<userSolicitacao[]> = signal([] as userSolicitacao[]);
  constructor() {
  this.userService.getUsersSolicitacao();
  this.userService.getUsersSolicitacao$.subscribe(data => {
      this.users.set(data);
  });
}

  acceptUserSolicitacao(userId: number) {
    this.userService.updateUserPermitions(userId, 1).subscribe({
      error: (error) => console.error('Error accepting user solicitation:', error)
    });
  }

 refuseUserSolicitacao(userID: number) {
  this.userService.deleteUser(userID).subscribe({
    next: () => {
      const currentUsers = this.users();
      this.users.set(currentUsers.filter(user => user.ID_FUNC !== userID));
    },
    error: (error) => console.error('Error refusing user:', error)
  });
}

}
