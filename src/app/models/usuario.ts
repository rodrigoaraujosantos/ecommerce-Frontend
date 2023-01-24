import { Endereco } from 'src/app/models/endereco';
export interface Usuario {
    id?: number;
    nome: string
    email:string
    cpf:string
    senha:string
    telefone:string
    sobrenome:string
    dataNascimento:string
    nomeNegocio:string
    ramo:string
    endereco:Endereco
    ativado:boolean
    foto?: string 
    idEndereco?:number
}
