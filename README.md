# Mercado Livre Extended Search

![GitHub repo size](https://img.shields.io/github/repo-size/joaogcs/mercado-livre-extended-search)
![GitHub contributors](https://img.shields.io/github/contributors/joaogcs/mercado-livre-extended-search)

![GitHub stars](https://img.shields.io/github/stars/joaogcs/mercado-livre-extended-search)
![GitHub forks](https://img.shields.io/github/forks/joaogcs/mercado-livre-extended-search)

Mercado Livre Extended Search is a chrome extension that extend details about the product announce by adding a bunch of information at the search page.

The goal is not to enter on each product to view all delivery options and seller details / reputation. Also avoid you to open your calculator to sum installments value when a product has installments as payment options.

:arrow_forward: ​Preview

![preview_01](./assets/preview_01.gif)

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed the latest version of [Chrome Browser](https://www.google.com/intl/pt-BR/chrome/)

## Mercado Livre API

This repository is build with [Mercado Livre API](https://developers.mercadolivre.com.br/).

> :exclamation: :warning:  **DO NOT USE THIS REPOSITORY AS A PRODUCTION ENVIRONMENT**
>
> Mercado Livre provides free API for developers which avoid the needs of authentication. But be aware that **you should not use developers environment for production**.

## Installing mercado-livre-extended-search

To install mercado-livre-extended-search, follow these steps:

1. Open Chrome Browser and navigate `Settings > More tools > Extensions`;
2. Enable developers mode;
3. Click `Load unpacked` and select this repository folder;
4. Make sure extension is enabled;

:arrow_forward: Install

![preview_01](./assets/install.gif)

## Configuring mercado-livre-extended-search

#### Configuring other regions

This extension only work within Mercado Livre in Brazil by default. To configure other regions, follow these steps:

Open `manifest.json` and add or remove values of `content_scripts.matches`  property as you need.

> :bulb: Read the official document about [Chrome Match Patterns](https://developer.chrome.com/docs/extensions/mv3/match_patterns/) to learn how to use it.

```json
{
    "content_scripts": [
        {
          "matches": ["*://*.mercadolivre.com.br/*"]
        }
    ]
}
```

#### Configuring extension options

> :construction:  **IN DEVELOPMENT**
>
> This feature is being develop.

User needs to configure his address for this extension get delivery details on each item. To configure address follow these steps:

Navigate to `src > js > options > restore_options.js` and change the value of CEP property with your CEP address.

> :bulb: If you don't know the CEP of your address, you can use [Correios - Buscar CEP](https://buscacepinter.correios.com.br/app/endereco/index.php?t) website to find your CEP.

`restore_options.js`

```javascript
function restore_options() {
  return new Promise ( (resolve, reject) => {
    chrome.storage.sync.get(
      {
        CEP: "04094000",
        RUA: "...",
        BAIRRO: "...",
        CIDADE: "...",
        ESTADO: "...",
      },
...
```

## Contributing to mercado-livre-extended-search

To contribute to mercado-livre-extended-search, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b development`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin mercado-livre-extended-search/main`
5. Create the pull request.

Alternatively see the Github documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## Contributors

Thanks to the following people who have contributed to this project:

* [@joaogcs](https://github.com/joaogcs) 📖

## Contact

If you want to contact me you can reach me at <joaogcsoares1@gmail.com>.

## License![License](https://img.shields.io/github/license/joaogcs/mercado-livre-extended-search)
This project uses the following license: [MIT](https://opensource.org/licenses/MIT).