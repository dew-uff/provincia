import { type IDataflowRepository } from '../../../domain/repositories/IDataflowRepository';
import { type Dataflow } from '../../../shared/types/dashboard';

// ⬇️ DADOS MOCKADOS DOS DATAFLOWS
const MOCK_DATAFLOWS: Dataflow[] = [
    {
        id: '1',
        name: "Extração frames",
        user: "maria.falci",
        lastExecution: "06/10 09:15",
        status: "ok"
    },
    {
        id: '2',
        name: "Treinamento DNN",
        user: "maria.falci",
        lastExecution: "06/10 14:22",
        status: "ok"
    },
    {
        id: '3',
        name: "Coleta videos",
        user: "joao.silva",
        lastExecution: "05/10 18:45",
        status: "ok"
    },
    {
        id: '4',
        name: "Pre-processamento",
        user: "ana.souza",
        lastExecution: "05/10 20:10",
        status: "alerta"
    },
    {
        id: '5',
        name: "Análise de sentimentos",
        user: "carlos.mendes",
        lastExecution: "05/10 11:30",
        status: "ok"
    },
    {
        id: '6',
        name: "Classificação de imagens",
        user: "patricia.santos",
        lastExecution: "04/10 16:50",
        status: "erro"
    },
    {
        id: '7',
        name: "Detecção de anomalias",
        user: "roberto.lima",
        lastExecution: "04/10 08:20",
        status: "ok"
    },
    {
        id: '8',
        name: "Segmentação de clientes",
        user: "juliana.costa",
        lastExecution: "03/10 13:45",
        status: "alerta"
    },
    {
        id: '9',
        name: "Previsão de vendas",
        user: "fernando.alves",
        lastExecution: "03/10 10:15",
        status: "ok"
    },
    {
        id: '10',
        name: "Processamento de logs",
        user: "amanda.rocha",
        lastExecution: "02/10 15:30",
        status: "ok"
    },
    {
        id: '11',
        name: "ETL dados financeiros",
        user: "ricardo.pereira",
        lastExecution: "02/10 07:45",
        status: "ok"
    },
    {
        id: '12',
        name: "Agregação de métricas",
        user: "beatriz.martins",
        lastExecution: "01/10 19:20",
        status: "erro"
    },
    {
        id: '13',
        name: "Limpeza de dados",
        user: "gustavo.ferreira",
        lastExecution: "01/10 12:00",
        status: "ok"
    },
    {
        id: '14',
        name: "Sincronização CRM",
        user: "laura.barbosa",
        lastExecution: "30/09 14:30",
        status: "alerta"
    },
    {
        id: '15',
        name: "Validação de dados",
        user: "pedro.oliveira",
        lastExecution: "30/09 09:45",
        status: "ok"
    }
];

export class MockDataflowRepository implements IDataflowRepository {

    async getAllDataflows(): Promise<Dataflow[]> {
        // Simula delay de rede
        await this.simulateDelay(500);
        return MOCK_DATAFLOWS;
    }

    async getDataflowById(id: string): Promise<Dataflow | null> {
        await this.simulateDelay(300);
        const dataflow = MOCK_DATAFLOWS.find(df => df.id === id);
        return dataflow || null;
    }

    // ⬇️ HELPER PRIVADO
    private async simulateDelay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
