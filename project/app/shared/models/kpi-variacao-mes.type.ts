export type KpiVariacaoMes = {
    ano: number;
    mes: number;
    total_chegadas: number;
    total_mes_ano_anterior: number | null;
    variacao_percentual: number | null;
}