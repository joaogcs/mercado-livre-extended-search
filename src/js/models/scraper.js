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
      const id = $(this).find("input[name=itemId]").val();
      const anuncio = new Anuncio(id);
      lista_de_anuncios.push(anuncio);
    });
    return lista_de_anuncios;
  }

  static get_valor_total_parcelado_dos_resultados_da_busca(lista_de_anuncios) {
    // Para cada anuncio
    $("li.ui-search-layout__item").each(function () {
      // id do anuncio
      const id = $(this).find("input[name=itemId]").val();
      const anuncio = lista_de_anuncios.find((anuncio) => anuncio.id === id);
      // se parcelado com juros, calcula o total
      if (
        $(this).find(
          "span.ui-search-item__group__element.ui-search-installments.ui-search-color--BLACK"
        ).length
      ) {

        const el_inteiro = $(this)
        .find(
          ".ui-search-item__group__element.ui-search-installments.ui-search-color--BLACK"
        )
        .find("span.price-tag-fraction");

        const el_decimal = $(this)
        .find(
          ".ui-search-item__group__element.ui-search-installments.ui-search-color--BLACK"
        )
        .find("span.price-tag-cents");

        const valor_inteiro = $(el_inteiro).length > 0 ? parseInt($(el_inteiro).text()) : 0; 
        
        const valor_decimal = $(el_decimal).length > 0 ? parseFloat($(el_decimal).text()) : 0; 

        const valor_parcela = parseFloat( valor_inteiro + (valor_decimal / 100)).toFixed(2);

        const numero_parcelas = parseInt(
          $(this)
            .find('.ui-search-item__group__element.ui-search-installments.ui-search-color--BLACK')
              .text()
              .split(' ')[0]
              .replace(/\D/g, '')
        );

        const valor_total = (valor_parcela * numero_parcelas).toFixed(2);
        anuncio.valor_total_parcelado = valor_total;
      }
    });
    return lista_de_anuncios;
  }
}
