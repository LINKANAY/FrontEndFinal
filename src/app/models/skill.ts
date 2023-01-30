export class Skill{
    id?: number;
    nombreSkill: String;
    porcentaje: number;
    logo: string;

    constructor(nombreSkill: String, porcentaje: number, logo: string) {
        this.nombreSkill = nombreSkill;
        this.porcentaje = porcentaje;
        this.logo = logo;
    }

}