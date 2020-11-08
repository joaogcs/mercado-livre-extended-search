// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  return new Promise ( (resolve, reject) => {
    chrome.storage.sync.get(
      {
        CEP: "09530580",
        RUA: "...",
        BAIRRO: "...",
        CIDADE: "...",
        ESTADO: "...",
      },
      /* keep tracking element to know when to start main. (it waits for ads to exist)
      Note: 'load' method does not work with MercadoLivre.com.br, the page has scrips that change elements after loads */
      function (items) {
        let checkElementExist = setInterval(function () {
          if ($(".ui-search-bottom-ads__container").children().length) {
            clearInterval(checkElementExist);
          resolve(items.CEP);
        }
      }, 100);
    }
    );
  });
  }
