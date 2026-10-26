import { DataSource, DataSourceOptions } from 'typeorm';
import { Beer } from './beers/beer.entity';
import { Brewery } from './breweries/brewery.entity';
import { Rating } from './ratings/rating.entity';

// Eine Beschreibung der Verbindung für den Server (AppModule) und die CLI
export const dataSourceOptions: DataSourceOptions = {
  type: 'better-sqlite3',
  database: 'beer.db',
  entities: [Brewery, Beer, Rating],
  // .ts für die CLI im Ordner src, .js für den Server im Ordner dist
  migrations: [__dirname + '/migrations/*.{ts,js}'],
};

// Die CLI liest die Verbindung aus dem Default-Export
export default new DataSource(dataSourceOptions);
