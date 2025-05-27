import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Via, Pais, Continente, FederacaoBrasil } from '../../../shared/models/basic-data.type';

@Injectable()
export class BasicDataService {
  private paisesSubject = new BehaviorSubject<Pais[]>([]);
  private continentesSubject = new BehaviorSubject<Continente[]>([]);
  private viasSubject = new BehaviorSubject<Via[]>([]);
  private federacoesBrasilSubject = new BehaviorSubject<FederacaoBrasil[]>([]);
  private anosSubject = new BehaviorSubject<Object[]>([])

  paises$ = this.paisesSubject.asObservable();
  continentes$ = this.continentesSubject.asObservable();
  vias$ = this.viasSubject.asObservable();
  federacoesBrasil$ = this.federacoesBrasilSubject.asObservable();
  anos$ = this.anosSubject.asObservable();

  public isLoaded = false;

  constructor(private http: HttpClient) {
    this.loadAllData();
  }

  private async loadAllData() {
    try {
      const [paises, continentes, vias, federacoes, anos] = await Promise.all([
        firstValueFrom(this.http.get<Pais[]>('/baseDados/paises')),
        firstValueFrom(this.http.get<Continente[]>('/baseDados/continentes')),
        firstValueFrom(this.http.get<Via[]>('/baseDados/vias')),
        firstValueFrom(this.http.get<FederacaoBrasil[]>('/baseDados/federacoes')),
        firstValueFrom(this.http.get<object[]>('/baseDados/anos')),
      ]);

      this.paisesSubject.next(paises);
      this.continentesSubject.next(continentes);
      this.viasSubject.next(vias);
      this.federacoesBrasilSubject.next(federacoes);
      this.anosSubject.next(anos);

      this.isLoaded = true;
    } catch (error) {
      console.error('Erro ao carregar dados básicos:', error);
    }
  }

  getPaisById(id: number): Pais | undefined {
    return this.paisesSubject.value.find(pais => pais.id === id);
  }

  getContinenteById(id: number): Continente | undefined {
    return this.continentesSubject.value.find(continente => continente.id === id);
  }

  getViaById(id: number): Via | undefined {
    return this.viasSubject.value.find(via => via.id === id);
  }

  getFederacaoBrasilById(id: number): FederacaoBrasil | undefined {
    return this.federacoesBrasilSubject.value.find(federacao => federacao.id === id);
  }

  getPaisByName(name: string): Pais | undefined {
    return this.paisesSubject.value.find(pais => pais.nome.toLowerCase() === name.toLowerCase());
  }

  getContinenteByName(name: string): Continente | undefined {
    return this.continentesSubject.value.find(continente => continente.nome.toLowerCase() === name.toLowerCase());
  }

  getViaByName(name: string): Via | undefined {
    return this.viasSubject.value.find(via => via.tipo.toLowerCase() === name.toLowerCase());
  }

  getFederacaoBrasilByName(name: string): FederacaoBrasil | undefined {
    return this.federacoesBrasilSubject.value.find(federacao => federacao.nome.toLowerCase() === name.toLowerCase());
  }
}
