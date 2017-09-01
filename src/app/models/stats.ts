import isPlainObject from 'lodash/isPlainObject';
import reduce from 'lodash/reduce';

import { Model } from './abstract';

export class DatabaseTableStats extends Model {
  database: DatabaseStats;
  table: string;
  rows: number;
  size: number;
  totalSize: number;

  constructor(database: DatabaseStats, table: string, data?: any) {
    super();
    this.database = database;
    this.table = table;
    this.parseProperties(data, 'rows', 'size', 'totalSize');
  }

  get totalSizeRatio(): number {
    return this.totalSize / this.database.totalTableSize;
  }
}

export class DatabaseStats extends Model {
  size: number;
  tables: { [key: string]: DatabaseTableStats };

  private cachedValues: { [key: string]: number };
  private cachedTablesList: DatabaseTableStats[];

  constructor(data?: any) {
    super();

    this.cachedValues = {};
    this.parseProperties(data, 'size');

    const tablesData = data.tables || {};
    if (isPlainObject(tablesData)) {
      this.tables = reduce(tablesData, (memo: { [key: string]: DatabaseTableStats }, value: any, key: string) => {
        memo[key] = new DatabaseTableStats(this, key, value);
        return memo;
      }, {});
    } else {
      this.tables = {};
    }
  }

  get extraSize(): number {
    return this.cacheValue('extraSize', () => this.size - this.totalTableSize);
  }

  get tableRows(): number {
    return this.cacheValue('tableRows', () => {
      return reduce(this.tables, (memo: number, stats: DatabaseTableStats) => {
        return memo + stats.rows;
      }, 0);
    });
  }

  get tableSize(): number {
    return this.cacheValue('tableSize', () => {
      return reduce(this.tables, (memo: number, stats: DatabaseTableStats) => {
        return memo + stats.size;
      }, 0);
    });
  }

  get totalTableSize(): number {
    return this.cacheValue('totalTableSize', () => {
      return reduce(this.tables, (memo: number, stats: DatabaseTableStats) => {
        return memo + stats.totalSize;
      }, 0);
    });
  }

  get tablesList(): DatabaseTableStats[] {

    if (!this.cachedTablesList) {
      const stats = reduce(this.tables, (memo: DatabaseTableStats[], value: DatabaseTableStats, key: string): DatabaseTableStats[] => [ ...memo, value ], []);
      this.cachedTablesList = stats.sort((a, b) => b.totalSize - a.totalSize);
    }

    return this.cachedTablesList;
  }

  private cacheValue(key: string, provider: () => number): number {

    if (!this.cachedValues[key]) {
      this.cachedValues[key] = provider();
    }

    return this.cachedValues[key];
  }
}

export class Stats extends Model {
  database: DatabaseStats;

  constructor(data?: any) {
    super();
    this.parseRelationship('database', DatabaseStats, data);
  }
}
