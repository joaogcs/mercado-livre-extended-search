const main = async function () {

    console.debug('Initializing...')
    
    // Restore extension options    
    console.debug('Getting options')
    const cep = await restore_options();
    
    // Check if page has items
    console.debug('Check if page has items')
    if (!Page.hasItems()) {
      return false;
    }
    
    // Get items IDs
    console.debug('[Searching] Searching items IDs')
    let itemList = Page.searchIds();
    console.debug('[Searching] Items found: ', { itemList })

    
    // Get items payment options
    console.debug('[Searching] Searching items payment options')
    itemList = Page.searchPayment(itemList);
    console.debug('[Searching] Payments found: ', { itemList })
    
    // Get items details
    console.debug('[MeliAPI] Getting items')
    const rawItems = await MeliAPI.getItems(itemList);
    console.debug('[MeliAPI] Items found', { rawItems })
    
    // Get delivery details
    console.debug('[MeliAPI] Getting delivery')
    const rawDelivery = await MeliAPI.getDelivery(itemList, cep);
    console.debug('[MeliAPI] Deliveries found', { rawDelivery })
    
    // Get sellers details
    console.debug('[MeliAPI] Getting sellers')
    const rawSellers = await MeliAPI.getSellers(itemList);
    console.debug('[MeliAPI] Sellers found', { rawSellers })

    
    // Mapping items
    console.debug('[MeliAdapter] Mapping items')
    itemList = MeliAdapter.items(
      itemList,
      rawItems
    );
    console.debug('[MeliAdapter] Items mapped', { itemList }) 
      
    // Mapping deliveries
    console.debug('[MeliAdapter] Mapping deliveries')
    itemList = MeliAdapter.delivery(
        itemList,
        rawDelivery
    );
    console.debug('[MeliAdapter] Deliveries mapped', { itemList })    
    
    // Mapping sellers
    console.debug('[MeliAdapter] Mapping sellers')
    itemList = MeliAdapter.sellers(
        itemList,
        rawSellers
    );
    console.debug('[MeliAdapter] Sellers mapped', { itemList })
    
    
    // Render total payment value if has installment
    console.debug('[Render] Rendering total payment if has installments')
    Render.totalPaymentValue(itemList);
    console.debug('[Render] Rendered total payments with installments')
    
    console.debug('[Render] Rendering total payment if has installments')
    Render.deliveryPrice(itemList);
    console.debug('[Render] Rendered total payments with installments')

    console.debug ('end');

}

// Run main
try {
  main()
} catch (error) {
  console.error(error)
}


