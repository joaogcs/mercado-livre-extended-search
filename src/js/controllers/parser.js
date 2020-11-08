class TratamentoDeDados {
  static tratar_dados_das_entregas(lista_de_anuncios, raw_dados_das_entregas) {
    let dados_das_entregas = [];
    $.each(raw_dados_das_entregas, function (index, dados) {
      let anuncio = lista_de_anuncios[index];

      $.each(dados.options, function (i, opcao) {
        anuncio.opcoes_de_entrega = [];
        let envio = {};

        // informações sobre cada envio
        envio.preco = opcao.cost;
        envio.metodo_de_entrega = opcao.name;

        anuncio.opcoes_de_entrega.push(envio);
      });
      dados_das_entregas.push(anuncio);
    });
    return dados_das_entregas;
  }

  static tratar_dados_dos_anuncios(lista_de_anuncios, raw_dados_dos_anuncios) {
    let dados_dos_anuncios = [];
    $.each(raw_dados_dos_anuncios, function (index, dados) {
      let anuncio = lista_de_anuncios.find(
        (anuncio) => anuncio.id === dados.id
      );

      // informações sobre cada anuncio
      anuncio.preco = dados.price;
      anuncio.titulo = dados.title;
      anuncio.quantidade_disponivel = dados.available_quantity;
      anuncio.vendedor_id = dados.seller_id;

      // console.log(raw_dados_dos_anuncios);
      dados_dos_anuncios.push(anuncio);
    });
    return dados_dos_anuncios;
  }

  static tratar_dados_dos_vendedores(
    lista_de_anuncios,
    raw_dados_dos_vendedores
  ) {
    let dados_dos_anuncios = [];
    $.each(raw_dados_dos_vendedores, function (index, dados) {
      let anuncio = lista_de_anuncios[index];

      // informações sobre cada anuncio
      anuncio.nome_do_vendedor = "";

      // console.log(raw_dados_dos_anuncios);
      dados_dos_anuncios.push(anuncio);
    });
    return dados_dos_anuncios;
  }
}