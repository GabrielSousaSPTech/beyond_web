type Pais = {
  id: number;
  nome: string;
  fk_continente: number;
}

type Continente = {
  id: number;
  nome: string;
}

type Via = {
  id: number;
  tipo: string;
}

type FederacaoBrasil = {
  id: number;
  nome: string;
}

export type { Pais, Continente, Via, FederacaoBrasil }