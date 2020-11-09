const url_api_correios_entrega = "https://api.mercadolibre.com/items/";
const url_api_correios_cep = "/shipping_options?&zip_code=";
const url_api_correios_vendedor = "https://api.mercadolibre.com/users/";

(async () => {

  try {
    
    console.log ('init');

    const cep = await restore_options();

    
    //Verifica se o existe algum resultado na pagina, se não existir retorna
    if (!ColetarDaPagina.se_existe_anuncio()) {
      return false;
    }

    //Coletar informações de cada anúncio da pagina
    let lista_de_anuncios = ColetarDaPagina.get_ids_dos_resultados_da_busca();
    
    lista_de_anuncios = ColetarDaPagina.get_valor_total_parcelado_dos_resultados_da_busca(
      lista_de_anuncios
    );
    

    const raw_dados_dos_anuncios = await ConectarComAPI.get_dados_dos_anuncios(lista_de_anuncios);

    const raw_dados_das_entregas = await ConectarComAPI.get_dados_das_entregas(lista_de_anuncios, cep);
    
    const raw_dados_dos_vendedores = await ConectarComAPI.get_dados_dos_vendedores(lista_de_anuncios);


    console.log (
      {
        "raw_dados_dos_anuncios": raw_dados_dos_anuncios,
        "raw_dados_das_entregas": raw_dados_das_entregas,
        "raw_dados_dos_vendedores": raw_dados_dos_vendedores
      }
    );


    lista_de_anuncios = TratamentoDeDados.tratar_dados_dos_anuncios(
      lista_de_anuncios,
      raw_dados_dos_anuncios
    );


    lista_de_anuncios = TratamentoDeDados.tratar_dados_das_entregas(
      lista_de_anuncios,
      raw_dados_das_entregas
    );


    lista_de_anuncios = TratamentoDeDados.tratar_dados_dos_vendedores(
      lista_de_anuncios,
      raw_dados_dos_vendedores
    );

    
    console.log ({"lista_de_anuncios": lista_de_anuncios});

    
    //Renderizar tudo na tela12'1
    Renderizar.valor_total_parcelado(lista_de_anuncios);

    console.log ('end');

  } catch (error) {
    console.log (error);
  }
})();


