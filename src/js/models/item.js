class Anuncio {
  constructor(id) {
    /* constructor*/
    this.id = id;
    this.titulo = "";
    this.preco = 0;
    this.valor_total_parcelado = this.preco;
    this.vendedor_id = 0;
    this.quantidade_disponivel = 0;
    this.opcoes_de_entrega = [];
  }
}