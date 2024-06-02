import { Injectable } from "@nestjs/common";
import { Algoritm } from "src/Algoritm/algoritm.entity";

@Injectable() 
export class DatasourceService {
    private algopritm: Algoritm[] = [];

    getAlgoritm(): Algoritm[] {
        return this.algopritm;
    }

}   

