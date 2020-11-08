class ColetarDaPagina {
  static se_existe_anuncio() {
    if ($(".ui-search-layout > .ui-search-layout__item").length) {
      return true;
    } else {
      return false;
    }
  }

  static get_ids_dos_resultados_da_busca() {
    let lista_de_anuncios = [];
    // Para cada anuncio, coleta o ID
    $(".ui-search-layout > .ui-search-layout__item").each(function () {
      let id = $(this).find("input[name=itemId]").val();
      let anuncio = new Anuncio(id);
      lista_de_anuncios.push(anuncio);
    });
    return lista_de_anuncios;
  }

  static get_valor_total_parcelado_dos_resultados_da_busca(lista_de_anuncios) {
    // Para cada anuncio
    $(".ui-search-layout > .ui-search-layout__item").each(function () {
      // id do anuncio
      let id = $(this).find("input[name=itemId]").val();
      let anuncio = lista_de_anuncios.find((anuncio) => anuncio.id === id);
      // se parcelado com juros, calcula o total
      if (
        $(this).find(
          "span.ui-search-item__group__element.ui-search-installments.ui-search-color--BLACK"
        ).length
      ) {
        //pega o valor da parcela mostrado na tela
        let valor_parcela = (
          parseFloat(
            $(this)
              .find(
                ".ui-search-item__group__element.ui-search-installments.ui-search-color--BLACK"
              )
              .find("span.price-tag-fraction")
              .text()
          ) +
          parseFloat(
            $(this)
              .find(
                ".ui-search-item__group__element.ui-search-installments.ui-search-color--BLACK"
              )
              .find("span.price-tag-cents")
              .text()
          ) /
            100
        ).toFixed(2);

        let numero_parcelas = parseInt(
          $(this)
            .find('div > div > div.ui-search-result__content-wrapper > div.ui-search-result__content-columns > div.ui-search-result__content-column.ui-search-result__content-column--left > div > span')
              .text()
              .split(' ')[0]
              .replace(/\D/g, '')
        );

        let valor_total = (valor_parcela * numero_parcelas).toFixed(2);
        anuncio.valor_total_parcelado = valor_total;
      }
    });
    return lista_de_anuncios;
  }
}
