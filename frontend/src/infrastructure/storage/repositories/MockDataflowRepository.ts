import { type IDataflowRepository } from '../../../domain/repositories/IDataflowRepository';
import {
    type Dataflow,
    type DataflowDetails,
    type DataflowExecution,
    type DataflowDataset,
    type DataflowDependency,
    type StatusOption
} from '../../../shared/types/dashboard';

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

// ⬇️ FUNÇÕES AUXILIARES PARA GERAR DADOS MOCKADOS
const generateExecutions = (dataflowId: string, user: string, status: string): DataflowExecution[] => {
    const statuses: Array<'ok' | 'warning' | 'error'> = status === 'ok'
        ? ['ok', 'ok', 'ok', 'ok', 'warning']
        : status === 'alerta'
        ? ['ok', 'warning', 'ok', 'warning', 'ok']
        : ['error', 'ok', 'error', 'warning', 'ok'];

    return [
        { id: `${dataflowId}-exec-1`, timestamp: "06/10/2024 09:15:32", user, duration: "42min 18s", tasks: "12/12", status: statuses[0] },
        { id: `${dataflowId}-exec-2`, timestamp: "05/10/2024 09:15:28", user, duration: "45min 02s", tasks: "12/12", status: statuses[1] },
        { id: `${dataflowId}-exec-3`, timestamp: "04/10/2024 09:15:45", user, duration: "41min 55s", tasks: "12/12", status: statuses[2] },
        { id: `${dataflowId}-exec-4`, timestamp: "03/10/2024 09:16:01", user, duration: "44min 30s", tasks: "11/12", status: statuses[3] },
        { id: `${dataflowId}-exec-5`, timestamp: "02/10/2024 09:15:12", user, duration: "43min 45s", tasks: "12/12", status: statuses[4] },
    ];
};

const generateDatasets = (dataflowId: string, baseName: string): DataflowDataset[] => [
    { id: `${dataflowId}-ds-1`, name: `${baseName}_output_20241006`, records: 158432, size: "2.3 GB", created: "06/10/2024" },
    { id: `${dataflowId}-ds-2`, name: `${baseName}_output_20241005`, records: 156891, size: "2.2 GB", created: "05/10/2024" },
    { id: `${dataflowId}-ds-3`, name: `${baseName}_output_20241004`, records: 157234, size: "2.3 GB", created: "04/10/2024" },
    { id: `${dataflowId}-ds-4`, name: `${baseName}_metadata_20241006`, records: 45621, size: "156 MB", created: "06/10/2024" },
];

// ⬇️ DADOS MOCKADOS DE DETALHES DOS DATAFLOWS
const MOCK_DATAFLOW_DETAILS: Record<string, Omit<DataflowDetails, keyof Dataflow>> = {
    '1': {
        description: "Pipeline de extração de frames de vídeos para análise de ML. Processa vídeos em lote e extrai frames em intervalos configuráveis.",
        created: "15/03/2024",
        version: "2.1.0",
        schedule: "Diário às 09:00",
        inputSources: ["S3 Bucket - videos-raw", "Azure Blob - media-input"],
        outputDestinations: ["S3 Bucket - frames-processed", "PostgreSQL - frames_metadata"],
        avgDuration: "45 min",
        successRate: 98.5,
        lastModified: "05/10/2024",
        modifiedBy: "maria.falci",
        tags: ["video", "ml", "extração", "frames"],
        recentExecutions: generateExecutions('1', 'maria.falci', 'ok'),
        datasets: generateDatasets('1', 'frames_extracted'),
        upstreamDependencies: [
            { id: '3', name: 'Coleta vídeos', description: 'Fornece vídeos brutos para extração' }
        ],
        downstreamDependencies: [
            { id: '6', name: 'Classificação de imagens', description: 'Consome os frames extraídos' },
            { id: '2', name: 'Treinamento DNN', description: 'Utiliza frames para treinamento de modelos' }
        ]
    },
    '2': {
        description: "Treinamento de redes neurais profundas para classificação de imagens. Utiliza GPU para acelerar o processo de treinamento.",
        created: "20/02/2024",
        version: "3.0.1",
        schedule: "Sob demanda",
        inputSources: ["S3 Bucket - training-data", "MLflow - model-registry"],
        outputDestinations: ["MLflow - model-registry", "S3 Bucket - trained-models"],
        avgDuration: "4h 30min",
        successRate: 95.2,
        lastModified: "06/10/2024",
        modifiedBy: "maria.falci",
        tags: ["deep-learning", "treinamento", "gpu", "classificação"],
        recentExecutions: generateExecutions('2', 'maria.falci', 'ok'),
        datasets: generateDatasets('2', 'model_training'),
        upstreamDependencies: [
            { id: '1', name: 'Extração frames', description: 'Fornece frames processados para treinamento' },
            { id: '6', name: 'Classificação de imagens', description: 'Fornece labels para treinamento supervisionado' }
        ],
        downstreamDependencies: [
            { id: '20', name: 'Recomendação de produtos', description: 'Utiliza modelos treinados para recomendações visuais' }
        ]
    },
    '3': {
        description: "Coleta automatizada de vídeos de múltiplas fontes para alimentar pipelines de processamento de mídia.",
        created: "10/01/2024",
        version: "1.5.0",
        schedule: "A cada 6 horas",
        inputSources: ["API YouTube", "API Vimeo", "FTP Server"],
        outputDestinations: ["S3 Bucket - videos-raw", "MongoDB - video_catalog"],
        avgDuration: "1h 15min",
        successRate: 92.8,
        lastModified: "04/10/2024",
        modifiedBy: "joao.silva",
        tags: ["coleta", "vídeo", "api", "automação"],
        recentExecutions: generateExecutions('3', 'joao.silva', 'ok'),
        datasets: generateDatasets('3', 'videos_collected'),
        upstreamDependencies: [],
        downstreamDependencies: [
            { id: '1', name: 'Extração frames', description: 'Processa os vídeos coletados' }
        ]
    },
    '4': {
        description: "Pré-processamento de dados brutos incluindo limpeza, normalização e transformação para análise posterior.",
        created: "05/04/2024",
        version: "2.0.0",
        schedule: "Diário às 06:00",
        inputSources: ["PostgreSQL - raw_data", "CSV Files - data-lake"],
        outputDestinations: ["PostgreSQL - processed_data", "Parquet - data-warehouse"],
        avgDuration: "30 min",
        successRate: 88.5,
        lastModified: "05/10/2024",
        modifiedBy: "ana.souza",
        tags: ["etl", "limpeza", "transformação", "dados"],
        recentExecutions: generateExecutions('4', 'ana.souza', 'alerta'),
        datasets: generateDatasets('4', 'preprocessed_data'),
        upstreamDependencies: [
            { id: '13', name: 'Limpeza de dados', description: 'Fornece dados limpos iniciais' }
        ],
        downstreamDependencies: [
            { id: '5', name: 'Análise de sentimentos', description: 'Utiliza dados pré-processados' },
            { id: '9', name: 'Previsão de vendas', description: 'Consome dados normalizados' }
        ]
    },
    '5': {
        description: "Análise de sentimentos em textos de redes sociais e reviews utilizando modelos de NLP.",
        created: "12/05/2024",
        version: "1.2.0",
        schedule: "A cada 2 horas",
        inputSources: ["API Twitter", "MongoDB - reviews", "Kafka - social_stream"],
        outputDestinations: ["Elasticsearch - sentiments", "PostgreSQL - sentiment_scores"],
        avgDuration: "20 min",
        successRate: 96.7,
        lastModified: "05/10/2024",
        modifiedBy: "carlos.mendes",
        tags: ["nlp", "sentimento", "social", "análise"],
        recentExecutions: generateExecutions('5', 'carlos.mendes', 'ok'),
        datasets: generateDatasets('5', 'sentiment_analysis'),
        upstreamDependencies: [
            { id: '4', name: 'Pre-processamento', description: 'Fornece textos normalizados' }
        ],
        downstreamDependencies: [
            { id: '16', name: 'Análise de churn', description: 'Utiliza scores de sentimento para predição' }
        ]
    },
    '6': {
        description: "Classificação automática de imagens usando modelos CNN pré-treinados e fine-tuning customizado.",
        created: "28/03/2024",
        version: "2.3.0",
        schedule: "Sob demanda",
        inputSources: ["S3 Bucket - images-raw", "API - image-upload"],
        outputDestinations: ["S3 Bucket - images-classified", "PostgreSQL - classifications"],
        avgDuration: "1h 45min",
        successRate: 65.3,
        lastModified: "04/10/2024",
        modifiedBy: "patricia.santos",
        tags: ["imagem", "classificação", "cnn", "ml"],
        recentExecutions: generateExecutions('6', 'patricia.santos', 'erro'),
        datasets: generateDatasets('6', 'image_classifications'),
        upstreamDependencies: [
            { id: '1', name: 'Extração frames', description: 'Fornece frames para classificação' }
        ],
        downstreamDependencies: [
            { id: '2', name: 'Treinamento DNN', description: 'Utiliza classificações como labels' }
        ]
    },
    '7': {
        description: "Detecção de anomalias em séries temporais de métricas de infraestrutura e aplicações.",
        created: "18/06/2024",
        version: "1.0.5",
        schedule: "A cada 15 minutos",
        inputSources: ["Prometheus", "CloudWatch", "Datadog"],
        outputDestinations: ["PagerDuty", "Slack", "PostgreSQL - anomalies"],
        avgDuration: "5 min",
        successRate: 99.1,
        lastModified: "04/10/2024",
        modifiedBy: "roberto.lima",
        tags: ["monitoramento", "anomalia", "alertas", "infraestrutura"],
        recentExecutions: generateExecutions('7', 'roberto.lima', 'ok'),
        datasets: generateDatasets('7', 'anomaly_detection'),
        upstreamDependencies: [
            { id: '10', name: 'Processamento de logs', description: 'Fornece métricas de logs processados' }
        ],
        downstreamDependencies: [
            { id: '12', name: 'Agregação de métricas', description: 'Consolida alertas de anomalias' }
        ]
    },
    '8': {
        description: "Segmentação de clientes baseada em comportamento de compra e engajamento.",
        created: "22/04/2024",
        version: "1.8.0",
        schedule: "Semanal aos domingos",
        inputSources: ["PostgreSQL - customers", "BigQuery - transactions", "Mixpanel"],
        outputDestinations: ["PostgreSQL - customer_segments", "Salesforce - segments"],
        avgDuration: "2h 30min",
        successRate: 91.4,
        lastModified: "03/10/2024",
        modifiedBy: "juliana.costa",
        tags: ["segmentação", "clientes", "marketing", "comportamento"],
        recentExecutions: generateExecutions('8', 'juliana.costa', 'alerta'),
        datasets: generateDatasets('8', 'customer_segments'),
        upstreamDependencies: [
            { id: '13', name: 'Limpeza de dados', description: 'Fornece dados de clientes limpos' }
        ],
        downstreamDependencies: [
            { id: '16', name: 'Análise de churn', description: 'Utiliza segmentos para análise' },
            { id: '20', name: 'Recomendação de produtos', description: 'Personaliza por segmento' }
        ]
    },
    '9': {
        description: "Modelo preditivo de vendas usando séries temporais e variáveis exógenas.",
        created: "08/02/2024",
        version: "3.1.0",
        schedule: "Diário às 05:00",
        inputSources: ["PostgreSQL - sales_history", "API - weather", "API - economic_indicators"],
        outputDestinations: ["PostgreSQL - sales_forecast", "Tableau - dashboard"],
        avgDuration: "1h",
        successRate: 94.6,
        lastModified: "03/10/2024",
        modifiedBy: "fernando.alves",
        tags: ["previsão", "vendas", "time-series", "forecast"],
        recentExecutions: generateExecutions('9', 'fernando.alves', 'ok'),
        datasets: generateDatasets('9', 'sales_forecast'),
        upstreamDependencies: [
            { id: '4', name: 'Pre-processamento', description: 'Fornece dados históricos processados' },
            { id: '11', name: 'ETL dados financeiros', description: 'Fornece dados financeiros consolidados' }
        ],
        downstreamDependencies: [
            { id: '19', name: 'Dashboard executivo', description: 'Exibe previsões de vendas' }
        ]
    },
    '10': {
        description: "Processamento e análise de logs de aplicações para identificação de padrões e erros.",
        created: "14/07/2024",
        version: "1.3.0",
        schedule: "Contínuo (streaming)",
        inputSources: ["Kafka - app_logs", "Filebeat", "CloudWatch Logs"],
        outputDestinations: ["Elasticsearch - logs", "S3 - logs-archive"],
        avgDuration: "Contínuo",
        successRate: 99.8,
        lastModified: "02/10/2024",
        modifiedBy: "amanda.rocha",
        tags: ["logs", "observabilidade", "elk", "streaming"],
        recentExecutions: generateExecutions('10', 'amanda.rocha', 'ok'),
        datasets: generateDatasets('10', 'processed_logs'),
        upstreamDependencies: [],
        downstreamDependencies: [
            { id: '7', name: 'Detecção de anomalias', description: 'Analisa padrões nos logs' }
        ]
    },
    '11': {
        description: "ETL de dados financeiros consolidando informações de múltiplas fontes para reporting.",
        created: "03/01/2024",
        version: "4.0.0",
        schedule: "Diário às 02:00",
        inputSources: ["SAP", "Oracle Financials", "API - banking"],
        outputDestinations: ["Snowflake - finance_dw", "Power BI - datasets"],
        avgDuration: "3h",
        successRate: 97.3,
        lastModified: "02/10/2024",
        modifiedBy: "ricardo.pereira",
        tags: ["finanças", "etl", "reporting", "consolidação"],
        recentExecutions: generateExecutions('11', 'ricardo.pereira', 'ok'),
        datasets: generateDatasets('11', 'financial_data'),
        upstreamDependencies: [],
        downstreamDependencies: [
            { id: '9', name: 'Previsão de vendas', description: 'Utiliza dados financeiros históricos' },
            { id: '19', name: 'Dashboard executivo', description: 'Exibe KPIs financeiros' }
        ]
    },
    '12': {
        description: "Agregação de métricas de performance de múltiplos sistemas para dashboard executivo.",
        created: "25/05/2024",
        version: "1.6.0",
        schedule: "A cada hora",
        inputSources: ["Prometheus", "New Relic", "Custom APIs"],
        outputDestinations: ["InfluxDB - metrics", "Grafana - dashboards"],
        avgDuration: "10 min",
        successRate: 72.1,
        lastModified: "01/10/2024",
        modifiedBy: "beatriz.martins",
        tags: ["métricas", "agregação", "performance", "dashboard"],
        recentExecutions: generateExecutions('12', 'beatriz.martins', 'erro'),
        datasets: generateDatasets('12', 'aggregated_metrics'),
        upstreamDependencies: [
            { id: '7', name: 'Detecção de anomalias', description: 'Fornece alertas consolidados' },
            { id: '10', name: 'Processamento de logs', description: 'Fornece métricas de logs' }
        ],
        downstreamDependencies: [
            { id: '19', name: 'Dashboard executivo', description: 'Exibe métricas agregadas' }
        ]
    },
    '13': {
        description: "Pipeline de limpeza e padronização de dados cadastrais de clientes e produtos.",
        created: "11/03/2024",
        version: "2.2.0",
        schedule: "Diário às 04:00",
        inputSources: ["PostgreSQL - raw_customers", "CSV - product_catalog"],
        outputDestinations: ["PostgreSQL - clean_data", "Elasticsearch - search_index"],
        avgDuration: "45 min",
        successRate: 98.9,
        lastModified: "01/10/2024",
        modifiedBy: "gustavo.ferreira",
        tags: ["limpeza", "dados", "qualidade", "padronização"],
        recentExecutions: generateExecutions('13', 'gustavo.ferreira', 'ok'),
        datasets: generateDatasets('13', 'clean_data'),
        upstreamDependencies: [],
        downstreamDependencies: [
            { id: '4', name: 'Pre-processamento', description: 'Utiliza dados limpos' },
            { id: '8', name: 'Segmentação de clientes', description: 'Utiliza cadastros padronizados' },
            { id: '15', name: 'Validação de dados', description: 'Valida dados limpos' }
        ]
    },
    '14': {
        description: "Sincronização bidirecional de dados entre sistemas internos e CRM Salesforce.",
        created: "19/06/2024",
        version: "1.4.0",
        schedule: "A cada 30 minutos",
        inputSources: ["PostgreSQL - internal_crm", "Salesforce API"],
        outputDestinations: ["Salesforce", "PostgreSQL - sync_log"],
        avgDuration: "15 min",
        successRate: 89.2,
        lastModified: "30/09/2024",
        modifiedBy: "laura.barbosa",
        tags: ["crm", "sincronização", "salesforce", "integração"],
        recentExecutions: generateExecutions('14', 'laura.barbosa', 'alerta'),
        datasets: generateDatasets('14', 'crm_sync'),
        upstreamDependencies: [
            { id: '13', name: 'Limpeza de dados', description: 'Fornece dados padronizados' }
        ],
        downstreamDependencies: []
    },
    '15': {
        description: "Validação automática de qualidade de dados com regras de negócio configuráveis.",
        created: "07/04/2024",
        version: "2.0.1",
        schedule: "Diário às 07:00",
        inputSources: ["PostgreSQL - all_schemas", "S3 - data-lake"],
        outputDestinations: ["PostgreSQL - validation_results", "Slack - alerts"],
        avgDuration: "25 min",
        successRate: 99.5,
        lastModified: "30/09/2024",
        modifiedBy: "pedro.oliveira",
        tags: ["validação", "qualidade", "dados", "regras"],
        recentExecutions: generateExecutions('15', 'pedro.oliveira', 'ok'),
        datasets: generateDatasets('15', 'validation_results'),
        upstreamDependencies: [
            { id: '13', name: 'Limpeza de dados', description: 'Valida dados após limpeza' }
        ],
        downstreamDependencies: []
    },
    '16': {
        description: "Análise preditiva de churn de clientes usando modelos de machine learning.",
        created: "02/05/2024",
        version: "1.7.0",
        schedule: "Semanal às segundas",
        inputSources: ["PostgreSQL - customer_behavior", "Mixpanel - events"],
        outputDestinations: ["PostgreSQL - churn_predictions", "Salesforce - risk_scores"],
        avgDuration: "1h 30min",
        successRate: 93.8,
        lastModified: "29/09/2024",
        modifiedBy: "camila.dias",
        tags: ["churn", "previsão", "clientes", "ml"],
        recentExecutions: generateExecutions('16', 'camila.dias', 'ok'),
        datasets: generateDatasets('16', 'churn_predictions'),
        upstreamDependencies: [
            { id: '5', name: 'Análise de sentimentos', description: 'Fornece scores de sentimento' },
            { id: '8', name: 'Segmentação de clientes', description: 'Fornece segmentos' }
        ],
        downstreamDependencies: [
            { id: '19', name: 'Dashboard executivo', description: 'Exibe métricas de churn' }
        ]
    },
    '17': {
        description: "Processamento de linguagem natural para extração de entidades e classificação de textos.",
        created: "16/07/2024",
        version: "1.1.0",
        schedule: "Sob demanda",
        inputSources: ["S3 - documents", "API - text-upload", "Kafka - text_stream"],
        outputDestinations: ["Elasticsearch - entities", "PostgreSQL - classifications"],
        avgDuration: "35 min",
        successRate: 87.6,
        lastModified: "29/09/2024",
        modifiedBy: "marcos.teixeira",
        tags: ["nlp", "ner", "classificação", "texto"],
        recentExecutions: generateExecutions('17', 'marcos.teixeira', 'alerta'),
        datasets: generateDatasets('17', 'nlp_entities'),
        upstreamDependencies: [],
        downstreamDependencies: [
            { id: '5', name: 'Análise de sentimentos', description: 'Utiliza entidades extraídas' },
            { id: '18', name: 'Mineração de textos', description: 'Processa entidades para insights' }
        ]
    },
    '18': {
        description: "Mineração de textos para descoberta de padrões e insights em documentos não estruturados.",
        created: "23/08/2024",
        version: "1.0.2",
        schedule: "Diário às 22:00",
        inputSources: ["S3 - raw-documents", "SharePoint", "Google Drive"],
        outputDestinations: ["Elasticsearch - text_insights", "PostgreSQL - mined_data"],
        avgDuration: "2h",
        successRate: 95.4,
        lastModified: "28/09/2024",
        modifiedBy: "rafaela.cunha",
        tags: ["mineração", "texto", "insights", "documentos"],
        recentExecutions: generateExecutions('18', 'rafaela.cunha', 'ok'),
        datasets: generateDatasets('18', 'text_mining'),
        upstreamDependencies: [
            { id: '17', name: 'Processamento NLP', description: 'Fornece entidades e classificações' }
        ],
        downstreamDependencies: []
    },
    '19': {
        description: "Consolidação de KPIs executivos de todas as áreas da empresa em dashboard unificado.",
        created: "09/02/2024",
        version: "2.5.0",
        schedule: "Diário às 08:00",
        inputSources: ["Multiple DBs", "APIs internas", "Spreadsheets"],
        outputDestinations: ["Snowflake - executive_kpis", "Tableau - exec_dashboard"],
        avgDuration: "1h 15min",
        successRate: 68.9,
        lastModified: "28/09/2024",
        modifiedBy: "thiago.moraes",
        tags: ["kpi", "executivo", "dashboard", "consolidação"],
        recentExecutions: generateExecutions('19', 'thiago.moraes', 'erro'),
        datasets: generateDatasets('19', 'executive_kpis'),
        upstreamDependencies: [
            { id: '9', name: 'Previsão de vendas', description: 'Fornece forecast de vendas' },
            { id: '11', name: 'ETL dados financeiros', description: 'Fornece dados financeiros' },
            { id: '12', name: 'Agregação de métricas', description: 'Fornece métricas de performance' },
            { id: '16', name: 'Análise de churn', description: 'Fornece métricas de retenção' }
        ],
        downstreamDependencies: []
    },
    '20': {
        description: "Sistema de recomendação de produtos baseado em comportamento de navegação e compras.",
        created: "30/04/2024",
        version: "2.1.0",
        schedule: "A cada 4 horas",
        inputSources: ["PostgreSQL - user_behavior", "Redis - sessions", "Kafka - clickstream"],
        outputDestinations: ["Redis - recommendations", "API - recommendation_service"],
        avgDuration: "50 min",
        successRate: 96.2,
        lastModified: "27/09/2024",
        modifiedBy: "luciana.gomes",
        tags: ["recomendação", "produtos", "ml", "personalização"],
        recentExecutions: generateExecutions('20', 'luciana.gomes', 'ok'),
        datasets: generateDatasets('20', 'recommendations'),
        upstreamDependencies: [
            { id: '2', name: 'Treinamento DNN', description: 'Fornece modelos de similaridade visual' },
            { id: '8', name: 'Segmentação de clientes', description: 'Fornece perfis de clientes' }
        ],
        downstreamDependencies: []
    }
};

// Função para gerar detalhes default para dataflows sem mock específico
const generateDefaultDetails = (dataflow: Dataflow): DataflowDetails => ({
    ...dataflow,
    description: `Pipeline de processamento para ${dataflow.name}. Responsável por executar tarefas automatizadas de dados.`,
    created: "01/01/2024",
    version: "1.0.0",
    schedule: "Sob demanda",
    inputSources: ["Fonte de dados padrão"],
    outputDestinations: ["Destino padrão"],
    avgDuration: "30 min",
    successRate: dataflow.status === 'ok' ? 95.0 : dataflow.status === 'alerta' ? 85.0 : 70.0,
    lastModified: dataflow.lastExecution.split(' ')[0] + "/2024",
    modifiedBy: dataflow.user,
    tags: ["automação", "dados"],
    recentExecutions: generateExecutions(dataflow.id, dataflow.user, dataflow.status),
    datasets: generateDatasets(dataflow.id, dataflow.name.toLowerCase().replace(/\s+/g, '_')),
    upstreamDependencies: [],
    downstreamDependencies: []
});

export class MockDataflowRepository implements IDataflowRepository {

    async getAllDataflows(): Promise<Dataflow[]> {
        // Simula delay de rede
        await this.simulateDelay(500);
        return MOCK_DATAFLOWS;
    }

    async getDataflowById(id: string): Promise<DataflowDetails | null> {
        await this.simulateDelay(300);
        const dataflow = MOCK_DATAFLOWS.find(df => df.id === id);

        if (!dataflow) {
            return null;
        }

        // Verifica se existe mock específico para este dataflow
        const specificDetails = MOCK_DATAFLOW_DETAILS[id];

        if (specificDetails) {
            return {
                ...dataflow,
                ...specificDetails
            };
        }

        // Retorna detalhes gerados automaticamente
        return generateDefaultDetails(dataflow);
    }

    // ⬇️ HELPER PRIVADO
    private async simulateDelay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
