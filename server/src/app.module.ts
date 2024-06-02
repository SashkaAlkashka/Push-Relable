import { Module } from '@nestjs/common';
import { AlgoritmModule } from './Algoritm/algoritm.module';
import { DatasourceModule } from './datasource/datasource.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [AlgoritmModule, 
    TypeOrmModule.forRoot({
      type: 'postgres', //тип подключаемой БД
      port: 5432, //порт
      username: 'postgres', //имя пользователя
      password: 'password', //пароль
      host: 'localhost', //хост, в нашем случае БД развернута локально
      database: 'kursach',
      entities:  ['dist/**/*.entity.js'],
      synchronize: false, 
      logging: 'all', 
    }),
  ],  
  
  controllers: [],
  providers: []
})
export class AppModule {}
