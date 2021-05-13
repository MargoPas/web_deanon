const { SnakeNamingStrategy } = require('typeorm-naming-strategies');

module.exports = {
  type: 'postgres',
  host: '127.0.0.1',//'fucking_shit',
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/**/entities/migrations/*.ts'],
  namingStrategy: new SnakeNamingStrategy(),
};
