
export const ContainerIdentifiers = {
  ResulotionMode: Symbol("ResulotionMode"),
  ContainerManager: Symbol("ContainerManager"),
  DatabaseName: Symbol("DatabaseName"),
  Database: Symbol("Database"),
  TransactionExecutor: Symbol("TransactionExecutor"),
  PriceChecker: Symbol("PriceChecker"),
  BalanceChecker: Symbol("BalanceChecker"),
  CsvIngestor: Symbol("CsvIngestor"),
  TradingAlgorithm: Symbol("TradingAlgorithm"),
  TradingAlgorithmName: Symbol("TradingAlgorithmName"),
  TradingAlgorithmConfigProviders: Symbol("TradingAlgorithmConfigProviders"),
} as const;
