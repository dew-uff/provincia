// Tipos de células suportadas
export type CellType = 'text' | 'status';

// Status possíveis para células do tipo status
export type StatusType = 'alerta' | 'ok';

// Configuração de uma coluna
export interface ColumnConfig {
    key: string;
    type: CellType;
}

// Tipo genérico para os dados de uma linha
export type RowData = Record<string, string | number | boolean>;
