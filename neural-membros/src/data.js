export const CYAN = '#00d4d4';
export const DIM_CYAN = 'rgba(0,212,212,.4)';

export const NAV_ITEMS = [
  { key: 'dashboard', label: 'DASHBOARD', icon: '◈', badge: null },
  { key: 'projects', label: 'PROJETOS', icon: '◉', badge: '14' },
  { key: 'videos', label: 'VÍDEOS', icon: '▶', badge: null },
  { key: 'forex', label: 'FOREX', icon: '◆', badge: null },
  { key: 'crypto', label: 'CRIPTOATIVOS', icon: '◇', badge: null },
  { key: 'community', label: 'COMUNIDADE', icon: '○', badge: '3' },
  { key: 'support', label: 'SUPORTE', icon: '◎', badge: null },
];

export const QUICK_LINKS = [
  { label: 'TradingView', url: '#' },
  { label: 'MetaTrader 5', url: '#' },
  { label: 'Binance', url: '#' },
  { label: 'Comunidade Discord', url: '#' },
];

export const STATS = [
  { label: 'MERCADOS', value: '02', sub: 'Forex & Cripto', pct: '60%' },
  { label: 'PROJETOS', value: '14', sub: 'Ativos este mês', pct: '80%' },
  { label: 'ECOSSISTEMA', value: '01', sub: 'Plataforma unificada', pct: '100%' },
  { label: 'AULAS', value: '38', sub: 'Horas de conteúdo', pct: '45%' },
];

export const FEATURED_VIDEO = {
  category: 'MÓDULO 3 · FOREX AVANÇADO',
  title: 'PRICE ACTION E ESTRUTURA DE MERCADO',
  desc: 'Aprenda a ler o mercado através de estruturas de preço e zonas de liquidez institucionais.',
  progress: 67,
  duration: '1:32:45',
};

export const PLAYLIST = [
  { num: '01', title: 'Introdução ao Price Action', duration: '18:24', titleColor: DIM_CYAN, dotColor: CYAN },
  { num: '02', title: 'Zonas de Liquidez', duration: '22:10', titleColor: '#e0f0f0', dotColor: CYAN },
  { num: '03', title: 'Order Flow Institucional', duration: '31:05', titleColor: '#e0f0f0', dotColor: 'rgba(224,240,240,.2)' },
  { num: '04', title: 'Entrada e Gerenciamento', duration: '27:48', titleColor: '#e0f0f0', dotColor: 'rgba(224,240,240,.2)' },
  { num: '05', title: 'Backtest ao Vivo', duration: '45:00', titleColor: '#e0f0f0', dotColor: 'rgba(224,240,240,.2)' },
  { num: '06', title: 'Q&A e Revisão', duration: '14:30', titleColor: '#e0f0f0', dotColor: 'rgba(224,240,240,.2)' },
];

export const PROJECTS = [
  {
    category: 'FOREX',
    name: 'NEURAL ALGO V3',
    status: 'ATIVO',
    desc: 'Sistema algorítmico quantitativo para pares de moedas principais com gestão de risco adaptativa.',
    pct: 78,
    accent: CYAN,
    tags: ['MQL5', 'EA', 'H4'],
  },
  {
    category: 'CRIPTOATIVOS',
    name: 'CRYPTO SCANNER',
    status: 'BETA',
    desc: 'Scanner de oportunidades em tempo real para os principais pares de criptomoedas na Binance.',
    pct: 45,
    accent: '#00a0a0',
    tags: ['Python', 'API', 'SPOT'],
  },
  {
    category: 'EDUCAÇÃO',
    name: 'MASTERCLASS 2025',
    status: 'NOVO',
    desc: 'Programa completo de formação em trading quantitativo e análise fundamentalista de mercados.',
    pct: 20,
    accent: '#007070',
    tags: ['12 Módulos', 'AO VIVO'],
  },
];

export const RESOURCES = [
  { label: 'Planilha de Gestão', type: 'GOOGLE SHEETS', icon: '📊', url: '#' },
  { label: 'Script Pine', type: 'TRADINGVIEW', icon: '📈', url: '#' },
  { label: 'Manual do Trader', type: 'PDF · 48 PÁG', icon: '📄', url: '#' },
  { label: 'Robô MT5', type: 'DOWNLOAD EA', icon: '🤖', url: '#' },
  { label: 'Grupo VIP', type: 'TELEGRAM', icon: '✈', url: '#' },
  { label: 'Calendário Econômico', type: 'LINK EXTERNO', icon: '📅', url: '#' },
  { label: 'Análises Semanais', type: 'YOUTUBE PRIVADO', icon: '🎬', url: '#' },
  { label: 'Suporte Direto', type: 'WHATSAPP', icon: '💬', url: '#' },
];
