import { type IDataflowRepository } from '../../../domain/repositories/IDataflowRepository';
import { type Dataflow, type StatusOption } from '../../../shared/types/dashboard';

// ⬇️ OPÇÕES DE STATUS PARA DROPDOWN
export const DATAFLOW_STATUS_OPTIONS: StatusOption[] = [
    { label: 'Todos os status', value: 'all' },
    { label: 'OK', value: 'ok' },
    { label: 'Alerta', value: 'alerta' },
    { label: 'Erro', value: 'erro' }
];

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
    },
    {
        id: '16',
        name: "Análise de churn",
        user: "camila.dias",
        lastExecution: "29/09 16:30",
        status: "ok"
    },
    {
        id: '17',
        name: "Processamento NLP",
        user: "marcos.teixeira",
        lastExecution: "29/09 11:15",
        status: "alerta"
    },
    {
        id: '18',
        name: "Mineração de textos",
        user: "rafaela.cunha",
        lastExecution: "28/09 21:00",
        status: "ok"
    },
    {
        id: '19',
        name: "Dashboard executivo",
        user: "thiago.moraes",
        lastExecution: "28/09 08:45",
        status: "erro"
    },
    {
        id: '20',
        name: "Recomendação de produtos",
        user: "luciana.gomes",
        lastExecution: "27/09 14:20",
        status: "ok"
    },
    {
        id: '21',
        name: "Análise preditiva",
        user: "diego.araujo",
        lastExecution: "27/09 10:00",
        status: "ok"
    },
    {
        id: '22',
        name: "Consolidação mensal",
        user: "isabela.rodrigues",
        lastExecution: "26/09 23:30",
        status: "alerta"
    },
    {
        id: '23',
        name: "Detecção de fraudes",
        user: "vinicius.cardoso",
        lastExecution: "26/09 17:15",
        status: "ok"
    },
    {
        id: '24',
        name: "Importação de dados externos",
        user: "natalia.pires",
        lastExecution: "25/09 13:40",
        status: "ok"
    },
    {
        id: '25',
        name: "Cálculo de KPIs",
        user: "alexandre.souza",
        lastExecution: "25/09 09:25",
        status: "erro"
    },
    {
        id: '26',
        name: "Extração de features",
        user: "bruna.medeiros",
        lastExecution: "24/09 19:50",
        status: "ok"
    },
    {
        id: '27',
        name: "Pipeline de transformação",
        user: "eduardo.lopes",
        lastExecution: "24/09 12:10",
        status: "alerta"
    },
    {
        id: '28',
        name: "Análise de correlação",
        user: "priscila.fernandes",
        lastExecution: "23/09 15:35",
        status: "ok"
    },
    {
        id: '29',
        name: "Enriquecimento de dados",
        user: "rodrigo.castro",
        lastExecution: "23/09 07:20",
        status: "ok"
    },
    {
        id: '30',
        name: "Auditoria de qualidade",
        user: "vanessa.xavier",
        lastExecution: "22/09 20:45",
        status: "erro"
    },
    {
        id: '31',
        name: "Clustering de usuários",
        user: "felipe.monteiro",
        lastExecution: "22/09 11:55",
        status: "ok"
    },
    {
        id: '32',
        name: "Geração de relatórios",
        user: "daniela.ramos",
        lastExecution: "21/09 16:10",
        status: "alerta"
    },
    {
        id: '33',
        name: "Backup incremental",
        user: "leandro.campos",
        lastExecution: "21/09 03:00",
        status: "ok"
    },
    {
        id: '34',
        name: "Análise de performance",
        user: "tatiana.melo",
        lastExecution: "20/09 14:25",
        status: "ok"
    },
    {
        id: '35',
        name: "Extração de métricas web",
        user: "gabriel.nogueira",
        lastExecution: "20/09 10:40",
        status: "erro"
    },
    {
        id: '36',
        name: "Processamento de streaming",
        user: "aline.santos",
        lastExecution: "19/09 22:15",
        status: "ok"
    },
    {
        id: '37',
        name: "Análise de A/B testing",
        user: "renato.vieira",
        lastExecution: "19/09 13:30",
        status: "alerta"
    },
    {
        id: '38',
        name: "Sincronização de inventário",
        user: "jessica.carvalho",
        lastExecution: "18/09 18:00",
        status: "ok"
    },
    {
        id: '39',
        name: "Modelagem de risco",
        user: "sergio.batista",
        lastExecution: "18/09 09:20",
        status: "ok"
    },
    {
        id: '40',
        name: "Processamento de pagamentos",
        user: "carolina.nunes",
        lastExecution: "17/09 15:45",
        status: "erro"
    },
    {
        id: '41',
        name: "Análise geoespacial",
        user: "andre.silva",
        lastExecution: "17/09 11:00",
        status: "ok"
    },
    {
        id: '42',
        name: "Extração de insights",
        user: "mariana.freitas",
        lastExecution: "16/09 20:30",
        status: "alerta"
    },
    {
        id: '43',
        name: "Consolidação de vendas",
        user: "lucas.rezende",
        lastExecution: "16/09 08:15",
        status: "ok"
    },
    {
        id: '44',
        name: "Análise de tendências",
        user: "patricia.moura",
        lastExecution: "15/09 17:40",
        status: "ok"
    },
    {
        id: '45',
        name: "Processamento de imagens médicas",
        user: "fabio.almeida",
        lastExecution: "15/09 12:55",
        status: "erro"
    },
    {
        id: '46',
        name: "Migração de dados legados",
        user: "andrea.ribeiro",
        lastExecution: "14/09 21:20",
        status: "ok"
    },
    {
        id: '47',
        name: "Análise de sentiment social",
        user: "henrique.porto",
        lastExecution: "14/09 10:30",
        status: "alerta"
    },
    {
        id: '48',
        name: "Extração de dados IoT",
        user: "bianca.azevedo",
        lastExecution: "13/09 19:05",
        status: "ok"
    },
    {
        id: '49',
        name: "Pipeline de ML training",
        user: "otavio.machado",
        lastExecution: "13/09 06:45",
        status: "ok"
    },
    {
        id: '50',
        name: "Análise de comportamento",
        user: "kelly.tavares",
        lastExecution: "12/09 14:50",
        status: "erro"
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
