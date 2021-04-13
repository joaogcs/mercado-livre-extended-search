class Page {
  static hasItems() {
    if ($('.ui-search-layout > .ui-search-layout__item').length) {
      return true
    }
    return false
  }

  static searchIds() {
    let itemList = []

    // Colect ID for each item
    $('.ui-search-layout > .ui-search-layout__item').each(function () {
      const id = $(this).find('input[name=itemId]').val()
      const item = new Item(id)
      itemList.push(item)
    })

    return itemList
  }

  static searchPayment(itemList) {
    // For each item
    $('li.ui-search-layout__item').each(function () {
      const result = $(this).find(
        '.ui-search-item__group__element.ui-search-installments.ui-search-color--BLACK'
      )

      const id = $(this).find('input[name=itemId]').val()

      const item = itemList.find((item) => item.id === id)

      // Calculate the total value if installment payment
      if ($(result).length) {
        const elementInteger = $(result).find('span.price-tag-fraction')

        const elementDecimal = $(result).find('span.price-tag-cents')

        const integerValue =
          $(elementInteger).length > 0 ? parseInt($(elementInteger).text()) : 0

        const decimanlValue =
          $(elementDecimal).length > 0 ? parseFloat($(elementDecimal).text()) : 0

        const installmentValue = parseFloat(
          integerValue + decimanlValue / 100
        ).toFixed(2)

        const numberOfInstallments = parseInt(
          $(result).text().split(' ')[0].replace(/\D/g, '')
        )

        const totalValue = (installmentValue * numberOfInstallments).toFixed(2)
        item.totalPaymentValue = totalValue
      }
    })

    return itemList
  }
}