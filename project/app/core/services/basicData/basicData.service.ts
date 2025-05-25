import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Via, Pais, Continente, FederacaoBrasil } from '../../../shared/models/basic-data.type';

@Injectable()
export class BasicDataService {
  private paises: Pais[] = [];
  private continentes: Continente[] = [];
  private vias: Via[] = [];
  private federacoesBrasil: FederacaoBrasil[] = [];

  constructor(private http: HttpClient) {
    this.loadAllData();
  }

  private async loadAllData() {
    try {
      this.paises = await firstValueFrom(this.http.get<Pais[]>('/baseDados/paises'));
      this.continentes = await firstValueFrom(this.http.get<Continente[]>('/baseDados/continentes'));
      this.vias = await firstValueFrom(this.http.get<Via[]>('/baseDados/vias'));
      this.federacoesBrasil = await firstValueFrom(this.http.get<FederacaoBrasil[]>('/baseDados/federacoes'));
    } catch (error) {
      console.error('Erro ao carregar dados básicos:', error);
    }
  }

  getPaisById(id: number): Pais | undefined {
    return this.paises.find(pais => pais.id === id);
  }

  getContinenteById(id: number): Continente | undefined {
    return this.continentes.find(continente => continente.id === id);
  }

  getViaById(id: number): Via | undefined {
    return this.vias.find(via => via.id === id);
  }

  getFederacaoBrasilById(id: number): FederacaoBrasil | undefined {
    return this.federacoesBrasil.find(federacao => federacao.id === id);
  }

  getAllPaises(): Pais[] {
    return [...this.paises];
  }

  getAllContinentes(): Continente[] {
    return [...this.continentes];
  }

  getAllVias(): Via[] {
    return [...this.vias];
  }

  getAllFederacoesBrasil(): FederacaoBrasil[] {
    return [...this.federacoesBrasil];
  }
}
