import { Component, OnInit, signal, inject, WritableSignal, viewChild, ElementRef, ViewChild } from '@angular/core';
import { CampoCanalSlackService } from '../../services/campo-canal-slack/campo-canal-slack.service';
import { canalSlack } from '../../../../shared/models/canalSlack.type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-campo-canal-slack',
  templateUrl: './campo-canal-slack.component.html',
  styleUrl: './campo-canal-slack.component.css',
  imports: [CommonModule, ]
})
export class CampoCanalSlackComponent implements OnInit {
  
  protected canalSlack: WritableSignal<string> = signal("");
  private campoCanalSlackService = inject(CampoCanalSlackService);
  @ViewChild('inputCanal') inputCanal!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.campoCanalSlackService.getCanalSlack();

    this.campoCanalSlackService.slack$.subscribe(data => {
      let canal:any = data;
      this.canalSlack.set(canal[0] ? canal[0].ID_CANAL_SLACK : ""); 
    });
  }

    public salvarCanalSlack(): void {
    const canal = this.canalSlack();
    this.campoCanalSlackService.postCanalSlack(canal).subscribe({
      next: () => {
        console.log('Canal atualizado com sucesso.');
        this.campoCanalSlackService.getCanalSlack();
      },
      error: (error) => {
        console.error('Erro ao atualizar canal:', error);
      }
    });
  }

  public atualizarCanal(event:any): void{
    this.canalSlack.set(event.target.value)
  }

  public limpar(): void{
    this.canalSlack.set("")
    this.inputCanal.nativeElement.value = ""
  }
}
