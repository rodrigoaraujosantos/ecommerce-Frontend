import { Produto } from './produto';
export interface Item {
    idItem?:number
    quantidade:number
    email:string
    carrinho?:string
    produto:Produto
    valorParcial:number
    pedidoVinculado?:number

}
