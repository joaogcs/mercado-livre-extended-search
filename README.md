# Preview

![](docs/preview_01.PNG)

# Introdução

Extensão que apresenta informações extras de cada anúncio no próprio campo de busca evitando entrar no anúncio. As informações apresentadas são nome do vendedor, reputação, valor do frete, data da entrega (para os tipos PAC e Sedex) e valor total da compra no caso de parcelamento com juros.

# Como ?

A extensão precisa ser configurada com o CEP que o usuário deseja receber o produto do anúncio. Quando uma busca é realizada no site do Mercado Livre Brasil a extensão utiliza a própria API do Mercado Livre e o CEP configurado para trazer informações de cada anúncio e apresentar em seu respectivo elemento na tela de busca. A API do mercado é utilizada como desenvolvedor.

# Status

Em manutenção.

# Funcionalidades disponíveis

* Visualização do total no caso de parcelamento com juros
* Visualização do frete com preço e prazo
  * Pode ocorrer de um produto possuir opções, por exemplo: Iphone 64gb, 128gb, 256gb. Para cada modelo existe um frete diferente.
