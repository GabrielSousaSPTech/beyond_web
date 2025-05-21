export type KpiVariacaoAno = {
    ano: number;
    total_chegadas: number;
    total_ano_anterior: number | null;
    variacao_percentual: number | null;
}