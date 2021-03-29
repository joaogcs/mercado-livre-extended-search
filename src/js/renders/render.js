class Render {
  static totalPaymentValue(itemList) {
    // Para cada item
    $('.ui-search-layout > .ui-search-layout__item').each(function () {
      let id = $(this).find('input[name=itemId]').val()
      let item = itemList.find((item) => item.id === id)
      if (
        item &&
        $(this).find(
          'span.ui-search-item__group__element.ui-search-installments.ui-search-color--BLACK'
        ).length
      ) {
        // renderiza o valor total da parcela na tela
        let totalPaymentValue = document.createElement('span')
        totalPaymentValue.className = 'price-tag-symbol'
        totalPaymentValue.innerHTML = ' = ' + item.totalPaymentValue
        $(this)
          .find(
            '.ui-search-item__group__element.ui-search-installments.ui-search-color--BLACK'
          )
          .find('.price-tag.ui-search-price__part')
          .after(totalPaymentValue)
      }
    })
  }

  static deliveryPrice(itemList) {
    const this_class = this

    const margin_bottom = parseInt(
      $('.ui-search-layout__item').css('margin-bottom').slice(0, -2)
    )

    // Para cada item
    $('.ui-search-layout > .ui-search-layout__item').each(function () {
      let id = $(this).find('input[name=itemId]').val()
      let item = itemList.find((item) => item.id === id)

      let addedRows = 0

      if (
        item &&
        $(this).find(
          'div.ui-search-item__group__element.ui-search-item__group__element--shipping'
        ).length
      ) {
        let addedRows = 0

        for (let deliveryOption of item.delivery_options) {
          // renderiza o valor total da parcela na tela
          let deliveryCost = document.createElement('p')
          if (deliveryOption.cost === 0) {
            deliveryCost.className =
              'ui-search-item__shipping ui-search-item__shipping--free'
            deliveryCost.innerHTML = 'Frete grátis ' + deliveryOption.text
          } else {
            deliveryCost.className =
              'ui-search-item__group__element ui-search-installments ui-search-color--BLACK ui-search-item__shipping ui-search-item__shipping'
            deliveryCost.innerHTML =
              'Frete ' +
              'R$ ' +
              deliveryOption.cost +
              ' ' +
              deliveryOption.text
          }
          $(this)
            .find(
              'p.ui-search-item__shipping.ui-search-item__shipping--free:last'
            )
            .after(document.createElement('br'))
            .next()
            .after(deliveryCost)

          addedRows++

          const new_margin_bottom = margin_bottom + addedRows * 8
          $('.ui-search-layout__item').css(
            'margin-bottom',
            new_margin_bottom + 'px'
          )
        }
        $(this)
          .find(
            'p.ui-search-item__shipping.ui-search-item__shipping--free:first'
          )
          .remove()
      } else {
        $(this)
          .find('div.ui-search-item__group.ui-search-item__group--price')
          .after(
            this_class._createElement(
              'div',
              'ui-search-item__group ui-search-item__group--shipping',
              ''
            )
          )
          .next()
          .append(
            this_class._createElement(
              'div',
              'ui-search-item__group__element ui-search-item__group__element--shipping',
              ''
            )
          )

        let addedRows = 0

        for (let deliveryOption of item.delivery_options) {
          // renderiza o valor total da parcela na tela
          let deliveryCost = document.createElement('p')
          deliveryCost.className =
            'ui-search-item__group__element ui-search-installments ui-search-color--BLACK ui-search-item__shipping'
          deliveryCost.innerHTML =
            'Frete ' +
            'R$ ' +
            deliveryOption.cost +
            ' ' +
            deliveryOption.text

          if ($(this).find('p.ui-search-item__shipping').length) {
            $(this)
              .find('p.ui-search-item__shipping:last')
              .after(document.createElement('br'))
              .next()
              .after(deliveryCost)

            addedRows++

            const new_margin_bottom = margin_bottom + addedRows * 8
            $('.ui-search-layout__item').css(
              'margin-bottom',
              new_margin_bottom + 'px'
            )
          } else {
            $(this)
              .find(
                'div.ui-search-item__group__element.ui-search-item__group__element--shipping'
              )
              .append(deliveryCost)

            addedRows++
          }
        }
      }
    })
  }

  static _createElement(type, className, innerHTML) {
    var element = document.createElement(type)
    element.className = className
    if (innerHTML != 'undefined') {
      element.innerHTML = innerHTML
    }

    return element
  }
}
