import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ProdutoModule } from './produto/produto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ClienteModule } from './cliente/cliente.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'generetion',
      password: '123',
      database: 'db_farmacia',
      autoLoadEntities: true,
      logging: true,
      synchronize: true,
    }),
    CategoriaModule,
    ProdutoModule,
    ClienteModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
