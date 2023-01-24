import { Categoria } from "./categoria";
import { Empreendedor } from "./empreendedor";

export interface ProdutoAdmin {

    idProduto?: number;
    nome: string;
    valor: number;
    desconto: number;
    validadeDesconto?: Date;
    estoque: number;
    descricao:string
    categoria: Categoria;
    foto: string;
    empreendedor: Empreendedor
    idCategoria: number;
}  


