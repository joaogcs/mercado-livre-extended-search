class MeliAPI {
  static searchSellerById(id) {}

  static getDelivery(itemList, cep) {
    return new Promise ( (resolve, reject) => {

      let ajax_requests = [];
      $.each(itemList, function (index, item) {
        ajax_requests.push(
          MeliAPI.getDeliveryByItemId(item.id, cep)
        );
      });
        
      $.when.apply(this, ajax_requests).done(function (data) {
        const args = Array.from(arguments);
        args.forEach(function (data, index) {
          args[index] = data[0];
        });
        resolve(args);
      });
    })
  }

  static getDeliveryByItemId(id, cep) {
    const url = `${config.meliAPI.baseURL}${config.meliAPI.delivery}/${id}${config.meliAPI.address}${cep}`

    return $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      error: function (xhr) {
        switch (xhr.status) {
          case 400:
            console.log("Erro: " + xhr.status + " - frete não encontrado.");
            break;
          case 404:
            console.log("Erro: " + xhr.status + " - página não encontrada");
            break;
        }
      },
    });
  }

  static getItems(itemList) {
    return new Promise ( (resolve, reject ) => {
      
      let ajax_requests = [];
      $.each(itemList, function (index, item) {
        ajax_requests.push(MeliAPI.getItemById(item.id));
      });
      $.when.apply(this, ajax_requests).done(function (data) {
        const args = Array.from(arguments);
        args.forEach(function (data, index) {
          args[index] = data[0];
        });
        resolve(args);
      });
    });
  }

  static getItemById(id) {
    const url = `${config.meliAPI.baseURL}${config.meliAPI.delivery}/${id}`

    return $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      error: function (xhr) {
        switch (xhr.status) {
          case 400:
            console.log("Erro: " + xhr.status + " - frete não encontrado.");
            break;
          case 404:
            console.log("Erro: " + xhr.status + " - página não encontrada");
            break;
        }
      },
    });
  }

  static getSellers(itemList) {
    return new Promise ( (resolve, reject ) => {
    
      let ajax_requests = [];
      $.each(itemList, function (index, item) {
        ajax_requests.push(
          MeliAPI.getSellerById(item.seller_id)
        );
      });
      $.when.apply(this, ajax_requests).done(function (data) {
        const args = Array.from(arguments);
        args.forEach(function (data, index) {
          args[index] = data[0];
        });
        resolve(args);
      });
    });
  }

  static getSellerById(id) {
    const url = `${config.meliAPI.baseURL}${config.meliAPI.seller}/${id}`

    return $.ajax({
      type: "GET",
      url: url,
      dataType: "json",
      error: function (xhr) {
        switch (xhr.status) {
          case 400:
            console.log("Erro: " + xhr.status + " - frete não encontrado.");
            break;
          case 404:
            console.log("Erro: " + xhr.status + " - página não encontrada");
            break;
        }
      },
    });
  }
}