class Renderizar {
  static valor_total_parcelado(lista_de_anuncios) {
    // Para cada anuncio
    $(".ui-search-layout > .ui-search-layout__item").each(function () {
      let id = $(this).find("input[name=itemId]").val();
      let anuncio = lista_de_anuncios.find((anuncio) => anuncio.id === id);
      if (
        anuncio &&
        $(this).find(
          "span.ui-search-item__group__element.ui-search-installments.ui-search-color--BLACK"
        ).length
      ) {
        // renderiza o valor total da parcela na tela
        let valor_total_parcelado = document.createElement("span");
        valor_total_parcelado.className = "price-tag-symbol";
        valor_total_parcelado.innerHTML = " = " + anuncio.valor_total_parcelado;
        $(this)
          .find(
            ".ui-search-item__group__element.ui-search-installments.ui-search-color--BLACK"
          )
          .find(".price-tag.ui-search-price__part")
          .after(valor_total_parcelado);
      }
    });
  }
}