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

    const this_class = this;

    const margin_bottom = parseInt($(".ui-search-layout__item").css("margin-bottom").slice(0,-2));

    // Para cada anuncio
    $(".ui-search-layout > .ui-search-layout__item").each(function () {

      let id = $(this).find("input[name=itemId]").val();
      let anuncio = lista_de_anuncios.find((anuncio) => anuncio.id === id);
      
      let linhas_adicionadas = 0;

      if (
        anuncio &&
        $(this).find(
          "div.ui-search-item__group__element.ui-search-item__group__element--shipping"
        ).length
      ) {

        let linhas_adicionadas = 0;

        for (let opcao_de_entrega of anuncio.opcoes_de_entrega) {

          console.log ("if", anuncio);

          // renderiza o valor total da parcela na tela
          let valor_do_frete = document.createElement("p");
          if (opcao_de_entrega.preco === 0) {
            valor_do_frete.className = "ui-search-item__shipping ui-search-item__shipping--free";
            valor_do_frete.innerHTML = "Frete grátis " + opcao_de_entrega.text;
          } else {
            valor_do_frete.className = "ui-search-item__group__element ui-search-installments ui-search-color--BLACK ui-search-item__shipping ui-search-item__shipping";
            valor_do_frete.innerHTML = "Frete " + "R$ " + opcao_de_entrega.preco + " " + opcao_de_entrega.text;
          }
          $(this)
          .find(
            "p.ui-search-item__shipping.ui-search-item__shipping--free:last"
            ).after(document.createElement("br"))
            .next()
            .after(valor_do_frete);

          linhas_adicionadas++;

          const new_margin_bottom = margin_bottom + linhas_adicionadas * 8;
            $(".ui-search-layout__item")
            .css("margin-bottom", new_margin_bottom + "px");

        }
        $(this)
          .find(
            "p.ui-search-item__shipping.ui-search-item__shipping--free:first"
          ).remove();
      } else {

        $(this)
      .find(
        "div.ui-search-item__group.ui-search-item__group--price"
        ).after(
          this_class._createElement("div",
          "ui-search-item__group ui-search-item__group--shipping",
          "")
        )
        .next()
        .append(
          this_class._createElement("div",
          "ui-search-item__group__element ui-search-item__group__element--shipping",
          "")
        )

        let linhas_adicionadas = 0;

        for (let opcao_de_entrega of anuncio.opcoes_de_entrega) {

          // renderiza o valor total da parcela na tela
          let valor_do_frete = document.createElement("p");
          valor_do_frete.className = "ui-search-item__group__element ui-search-installments ui-search-color--BLACK ui-search-item__shipping";
          valor_do_frete.innerHTML = "Frete " + "R$ " + opcao_de_entrega.preco + " " + opcao_de_entrega.text;
          
          if ($(this).find("p.ui-search-item__shipping").length) {
            
            $(this)
            .find(
              "p.ui-search-item__shipping:last"
              ).after(document.createElement("br"))
              .next()
              .after(valor_do_frete);
            
            linhas_adicionadas++;
            
            const new_margin_bottom = margin_bottom + linhas_adicionadas * 8;
            $(".ui-search-layout__item")
            .css("margin-bottom", new_margin_bottom + "px");
            
          } else {

            $(this)
            .find(
              "div.ui-search-item__group__element.ui-search-item__group__element--shipping"
              )
              .append(valor_do_frete);

              linhas_adicionadas++;
          }
        }
      }
    });
  }

  static _createElement(type, className, innerHTML) {
    var element = document.createElement(type);
    element.className = className;
    if (innerHTML != "undefined") {
      element.innerHTML = innerHTML;
    }

    return element;
}

  
}