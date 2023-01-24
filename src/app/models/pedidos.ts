

import { Endereco } from "./endereco";
import { Item } from "./item";
import { Usuario } from "./usuario";

export interface Pedidos {
    idPedido?: number
    valorTotal: number
    cliente: Usuario
    entrega: Endereco
    dataDaCompra?:Date 
    status?: string
    itens?:Item[]
}
