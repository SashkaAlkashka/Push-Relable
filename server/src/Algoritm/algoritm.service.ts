import { HttpStatus, Injectable } from "@nestjs/common";
import { create } from "domain";
import { DatasourceService } from "src/datasource/datasource.service";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Algoritm } from "./algoritm.entity";
import { CreateAlgoritmDto } from "./dto/create-algoritm.dto";

@Injectable() //декоратор, который указывает,что класс является сервисом и может быть инжектирован в другие классы
//Сущность сервер реализует бизнес-логику приложения, выполняют операции с данными и предоставляют функциональность для контроллеров и других сервисов.


export class AlgoritmServace {
    constructor(
        @InjectRepository(Algoritm)
        private readonly algoritmRepository: Repository<Algoritm>, 
    ){}
    
    async create(algoritmrDto: CreateAlgoritmDto): Promise<Algoritm>
    {
       //получаем объект CreateAuthorDto
       const algoritm = this.algoritmRepository.create();
       algoritm.id = algoritmrDto.id; //создаем объект Author из репозитория
       algoritm.count = algoritmrDto.count;
       algoritm.istok = algoritmrDto.istok;
       algoritm.stok = algoritmrDto.stok;
       algoritm.vershin = algoritmrDto.vershin;
       await this.algoritmRepository.save(algoritm); //сохраняем объект Author в БД
       return algoritm; //возвращаем объект Author
     }

     findOne(id: number): Promise<Algoritm> {
        // Promise<Author> - указывает, что функция возвращает объект Author в виде Promise (c асинхронного потока)
        return this.algoritmRepository.findOne({
          where: { id }
        });
      }
    
    async findAll(): Promise<Algoritm[]> {
        const algoritm = await this.algoritmRepository.find({}); //получаем массив Author из БД
        return algoritm; //возвращаем массив Author
      }

      async update(id: number, updatedAlgoritm: Algoritm) {
        //получаем объект Author для обновления по id
        const algoritm = await this.algoritmRepository.findOne({ where: { id } }); //получаем объект Author по id из БД
        algoritm.count = updatedAlgoritm.count;
        algoritm.istok = updatedAlgoritm.istok;
        algoritm.stok = updatedAlgoritm.stok;
        algoritm.vershin = updatedAlgoritm.vershin;
        await this.algoritmRepository.save(algoritm); //сохраняем объект Author в БД
        return algoritm; //возвращаем объект Author
      }

      remove(id: number) {
        this.algoritmRepository.delete({ id }); //удаляем объект Author из БД
      }
    
}