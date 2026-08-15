export interface Kpi {
  label: string;
  value: string;
  delta: string;
  up: boolean;
  sub: string;
}

export interface ForexPair {
  pair: string;
  bid: string;
  ask: string;
  change: string;
  up: boolean;
}

export interface CryptoAsset {
  name: string;
  symbol: string;
  price: string;
  change: string;
  up: boolean;
  vol: string;
}

export interface UserRow {
  name: string;
  email: string;
  plano: string;
  status: string;
  join: string;
}

export interface TransactionRow {
  id: string;
  user: string;
  tipo: string;
  valor: string;
  status: string;
  data: string;
}

export interface Report {
  name: string;
  size: string;
  type: string;
  date: string;
}

export interface ConfigField {
  label: string;
  val: string;
}

export interface ConfigToggle {
  label: string;
  on: boolean;
}

export const kpis: Kpi[] = [
  { label: "Receita Total", value: "R$ 2.847.390", delta: "+12,4%", up: true, sub: "vs. mês anterior" },
  { label: "Usuários Ativos", value: "8.241", delta: "+5,7%", up: true, sub: "últimos 30 dias" },
  { label: "Transações", value: "143.820", delta: "-2,1%", up: false, sub: "este mês" },
  { label: "Vol. Forex", value: "$18,3M", delta: "+28,9%", up: true, sub: "acumulado mês" },
];

export const forexData: ForexPair[] = [
  { pair: "EUR/USD", bid: "1.0842", ask: "1.0844", change: "+0.12%", up: true },
  { pair: "GBP/USD", bid: "1.2731", ask: "1.2733", change: "-0.08%", up: false },
  { pair: "USD/JPY", bid: "149.23", ask: "149.26", change: "+0.34%", up: true },
  { pair: "AUD/USD", bid: "0.6418", ask: "0.6420", change: "+0.05%", up: true },
  { pair: "USD/BRL", bid: "5.4810", ask: "5.4850", change: "-0.22%", up: false },
];

export const cryptoData: CryptoAsset[] = [
  { name: "Bitcoin", symbol: "BTC", price: "R$ 312.450", change: "+3.21%", up: true, vol: "R$ 42B" },
  { name: "Ethereum", symbol: "ETH", price: "R$ 16.820", change: "+1.87%", up: true, vol: "R$ 18B" },
  { name: "Solana", symbol: "SOL", price: "R$ 780", change: "-2.14%", up: false, vol: "R$ 4.2B" },
  { name: "Cardano", symbol: "ADA", price: "R$ 2.18", change: "+0.55%", up: true, vol: "R$ 1.1B" },
];

export const users: UserRow[] = [
  { name: "Lucas Ferreira", email: "lucas@email.com", plano: "Pro", status: "Ativo", join: "12/01/2025" },
  { name: "Amanda Costa", email: "amanda@email.com", plano: "Basic", status: "Ativo", join: "03/03/2025" },
  { name: "Rafael Souza", email: "rafael@email.com", plano: "Elite", status: "Suspenso", join: "28/11/2024" },
  { name: "Mariana Lima", email: "mariana@email.com", plano: "Pro", status: "Ativo", join: "15/06/2025" },
  { name: "Carlos Mendes", email: "carlos@email.com", plano: "Basic", status: "Inativo", join: "07/02/2025" },
  { name: "Fernanda Dias", email: "fernanda@email.com", plano: "Elite", status: "Ativo", join: "20/07/2025" },
];

export const transactions: TransactionRow[] = [
  { id: "#TXN-00821", user: "Lucas Ferreira", tipo: "Forex", valor: "R$ 12.400", status: "Concluída", data: "15/08/2026" },
  { id: "#TXN-00820", user: "Amanda Costa", tipo: "Cripto", valor: "R$ 3.200", status: "Pendente", data: "15/08/2026" },
  { id: "#TXN-00819", user: "Rafael Souza", tipo: "Forex", valor: "R$ 28.750", status: "Concluída", data: "14/08/2026" },
  { id: "#TXN-00818", user: "Mariana Lima", tipo: "Cripto", valor: "R$ 8.100", status: "Cancelada", data: "14/08/2026" },
  { id: "#TXN-00817", user: "Carlos Mendes", tipo: "Forex", valor: "R$ 5.500", status: "Concluída", data: "13/08/2026" },
];

export const reports: Report[] = [
  { name: "Relatório Mensal — Julho 2026", size: "2.4 MB", type: "PDF", date: "01/08/2026" },
  { name: "Extrato de Operações Q2 2026", size: "1.8 MB", type: "XLSX", date: "02/07/2026" },
  { name: "Análise de Performance Forex", size: "3.1 MB", type: "PDF", date: "15/06/2026" },
  { name: "Relatório Cripto — Maio 2026", size: "900 KB", type: "PDF", date: "01/06/2026" },
];

export const configFields: ConfigField[] = [
  { label: "Nome da Plataforma", val: "Neural Capital Admin" },
  { label: "Email de Suporte", val: "suporte@neuralcapital.com" },
  { label: "Timezone", val: "America/Sao_Paulo" },
  { label: "Moeda Base", val: "BRL" },
];

export const configToggles: ConfigToggle[] = [
  { label: "Notificações por email", on: true },
  { label: "Autenticação 2FA", on: true },
  { label: "Modo manutenção", on: false },
  { label: "Logs de acesso", on: true },
];

export function statusColor(s: string): string {
  if (s === "Ativo" || s === "Concluída") return "var(--accent)";
  if (s === "Pendente") return "var(--warning)";
  return "var(--danger)";
}

export function planoColor(p: string): string {
  if (p === "Elite") return "var(--accent)";
  if (p === "Pro") return "var(--accent-blue)";
  return "var(--text-faint)";
}