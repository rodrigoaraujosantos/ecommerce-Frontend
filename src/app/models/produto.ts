
import { Categoria } from "./categoria";


export interface Produto {
  idProduto?: number;
  nome: string;
  valor: number;
  desconto: number;
  validadeDesconto?: Date;
  estoque: number;
  descricao:string
  categoria: Categoria;
  foto: string;
  idEmpreendedor?: number;
  idCategoria: number;
 nomeNegocio?:string
  
}
