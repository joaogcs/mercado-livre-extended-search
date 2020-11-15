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


  static frete_preco (lista_de_anuncios) {
    // Para cada anuncio
    $(".ui-search-layout > .ui-search-layout__item").each(function () {
      let id = $(this).find("input[name=itemId]").val();
      let anuncio = lista_de_anuncios.find((anuncio) => anuncio.id === id);
      
      if (
        anuncio &&
        $(this).find(
          "div.ui-search-item__group__element.ui-search-item__group__element--shipping"
        ).length
      ) {
        for (let opcao_de_entrega of anuncio.opcoes_de_entrega) {

          console.log ("if", anuncio);

          // renderiza o valor total da parcela na tela
          let valor_do_frete = document.createElement("p");
          valor_do_frete.className = "ui-search-item__shipping ui-search-item__shipping--free";
          valor_do_frete.innerHTML = "Frete grátis " + opcao_de_entrega.text;
          $(this)
          .find(
            "p.ui-search-item__shipping.ui-search-item__shipping--free:last"
            )
            .after(document.createElement("br"))
            .after(valor_do_frete);
        }
      } else {

        for (let opcao_de_entrega of anuncio.opcoes_de_entrega) {

          console.log ("else", anuncio);

          // renderiza o valor total da parcela na tela
          let valor_do_frete = document.createElement("p");
          valor_do_frete.className = "ui-search-item__group__element ui-search-installments ui-search-color--BLACK ui-search-item__shipping ui-search-item__shipping--free";
          valor_do_frete.innerHTML = "Frete " + opcao_de_entrega.text;
          $(this)
          .find(
            "span.ui-search-item__group__element.ui-search-installments.ui-search-color--BLACK:last"
            )
            .after(document.createElement("br"))
            .after(valor_do_frete);
        }
      }
    });
  }
  
}