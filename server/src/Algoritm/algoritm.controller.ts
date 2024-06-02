import { CreateAlgoritmDto } from "./dto/create-algoritm.dto";
import { Algoritm } from "./algoritm.entity";
import { AlgoritmServace } from "./algoritm.service";
import { Controller, Get, Param, Put, Body, Post, Delete } from "@nestjs/common";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Алгоритм')
@Controller('todos') //Сущность контроллер отвечает за обработку входящих HTTP-запросов и формирование ответов (CRUD запросы)
export class AlgoritmsController {
    constructor(private readonly algoritmService: AlgoritmServace) {}

    @Get()
    findAll(){
        return this.algoritmService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: string) {                    //@Param - декоратор для извлечения параметров маршрута
        return this.algoritmService.findOne(+id);
    }
    @Put(':id')
    update(@Param('id') id: string, @Body() updateUsers: Algoritm) {   //@Body - декоратор для извлечения тела запроса  
        return this.algoritmService.update(+id, updateUsers);
    }
    @Post()
    create(@Body() createAlgoritm: CreateAlgoritmDto){
       return this.algoritmService.create(createAlgoritm); 
    }
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.algoritmService.remove(+id);
    }
}
