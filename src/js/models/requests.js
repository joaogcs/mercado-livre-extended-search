class ConectarComAPI {
  static buscar_vendedor(id) {}

  static get_dados_das_entregas(lista_de_anuncios, cep) {
    return new Promise ( (resolve, reject) => {

      let ajax_requests = [];
      $.each(lista_de_anuncios, function (index, anuncio) {
        ajax_requests.push(
          ConectarComAPI.get_dado_de_uma_entrega(anuncio.id, cep)
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

  static get_dado_de_uma_entrega(id, cep) {
    return $.ajax({
      type: "GET",
      url: url_api_correios_entrega + id + url_api_correios_cep + cep,
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

  static get_dados_dos_anuncios(lista_de_anuncios) {
    return new Promise ( (resolve, reject ) => {
      
      let ajax_requests = [];
      $.each(lista_de_anuncios, function (index, anuncio) {
        ajax_requests.push(ConectarComAPI.get_dado_de_um_anuncio(anuncio.id));
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

  static get_dado_de_um_anuncio(id) {
    return $.ajax({
      type: "GET",
      url: url_api_correios_entrega + id,
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

  static get_dados_dos_vendedores(lista_de_anuncios) {
    return new Promise ( (resolve, reject ) => {
    
      let ajax_requests = [];
      $.each(lista_de_anuncios, function (index, anuncio) {
        ajax_requests.push(
          ConectarComAPI.get_dado_de_um_vendedor(anuncio.vendedor_id)
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

  static get_dado_de_um_vendedor(id) {
    return $.ajax({
      type: "GET",
      url: url_api_correios_vendedor + id,
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