import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderTitleService {
  private _headerTitle = signal<string>('Título Padrão');

  // Expor o Signal como somente leitura para que os componentes possam ler, mas não modificar diretamente
  headerTitle: Signal<string> = this._headerTitle.asReadonly();

  constructor() { }

  setTitle(newTitle: string): void {
    this._headerTitle.set(newTitle);
  }
  
}
