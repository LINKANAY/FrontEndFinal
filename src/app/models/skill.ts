export class Skill{
    id?: number;
    nombreSkill: String;
    porcentaje: number;

    constructor(nombreSkill: String, porcentaje: number) {
        this.nombreSkill = nombreSkill;
        this.porcentaje = porcentaje;
    }

}