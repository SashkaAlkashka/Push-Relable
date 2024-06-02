import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity('algoritm')                            //Модель, в ней пропсаны свойства
export class Algoritm {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @PrimaryGeneratedColumn({name: 'id'})
    id: number;

    @ApiProperty({ example: '1', description: 'Количество вершин' })
    @Column({name: 'count'}) 
    count: number;

    @ApiProperty({ example: '3', description: 'Сток' })
    @Column({name: 'stok'})
    stok: number;
    
    @ApiProperty({ example: '5', description: 'Исток' })
    @Column({name: 'istok'})
    istok: number;

    @ApiProperty({ example: '1, 2, 3', description: 'Информация о вершинах' })
    @Column({name: 'vershin'})
    vershin: string;

    
}