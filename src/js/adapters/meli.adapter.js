class MeliAdapter {

  static delivery(itemList, rawDelivery) {

    const monthNames = config.environment.monthNames

    let deliveries = [];
    $.each(rawDelivery, (index, dados) => {
      let item = itemList[index];

      $.each(dados.options, (i, opcao) => {
        let delivery = {};

        // Information about each delivery option
        delivery.cost = opcao.cost;
        delivery.name = opcao.name;
        
        delivery.data = new Date(opcao.estimated_delivery_time.date);
        delivery.data = this._parseNN(delivery.data.getDate()) + '/' + monthNames[delivery.data.getMonth()];


        if (opcao.hasOwnProperty("estimated_delivery_time")) {
          delivery.offset = new Date(opcao.estimated_delivery_time.offset.date);
          delivery.offset = this._parseNN(delivery.offset.getDate()) +
          '/' +
          monthNames[delivery.offset.getMonth()]
        } else {
          delivery.offset = "";
        }

        delivery.text = delivery.data + ' - ' + delivery.offset;

        item.delivery_options.push(delivery);
      });

      deliveries.push(item);
    });
    return deliveries;
  }

  static items(itemList, rawItems) {
    let items = [];
    $.each(rawItems, function (index, dados) {
      let item = itemList.find(
        (item) => item.id === dados.id
      );

      // Information about each item
      item.price = dados.price;
      item.title = dados.title;
      item.available_quantity = dados.available_quantity;
      item.seller_id = dados.seller_id;

      items.push(item);
    });
    return items;
  }

  static sellers(
    itemList,
    rawSellers
  ) {
    let items = [];
    $.each(rawSellers, function (index, dados) {
      let item = itemList[index];

      // Information about each seller
      item.seller = dados;

      items.push(item);
    });
    return items;
  }


  //parse text with '1' to text with '01'
  static _parseNN(str_num) {
    if (str_num < 10) {
      str_num = '0' + str_num;
    }
    return str_num;
  }
}
