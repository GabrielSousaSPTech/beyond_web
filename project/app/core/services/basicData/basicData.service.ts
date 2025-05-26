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

  private paisCache = new Map<number, Pais>();
  private continenteCache = new Map<number, Continente>();
  private viaCache = new Map<number, Via>();
  private federacaoCache = new Map<number, FederacaoBrasil>();

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

      paises.forEach(pais => this.paisCache.set(pais.id, pais));
      continentes.forEach(continente => this.continenteCache.set(continente.id, continente));
      vias.forEach(via => this.viaCache.set(via.id, via));
      federacoes.forEach(federacao => this.federacaoCache.set(federacao.id, federacao));
      this.isLoaded = true;
    } catch (error) {
      console.error('Erro ao carregar dados básicos:', error);
    }
  }

  getPaisById(id: number): Pais | undefined {
    return this.paisCache.get(id) ?? this.paisesSubject.value.find(pais => pais.id === id);
  }

  getContinenteById(id: number): Continente | undefined {
    return this.continenteCache.get(id) ?? this.continentesSubject.value.find(continente => continente.id === id);
  }

  getViaById(id: number): Via | undefined {
    return this.viaCache.get(id) ?? this.viasSubject.value.find(via => via.id === id);
  }

  getFederacaoBrasilById(id: number): FederacaoBrasil | undefined {
    return this.federacaoCache.get(id) ?? this.federacoesBrasilSubject.value.find(federacao => federacao.id === id);
  }
}
