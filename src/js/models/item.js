class Item {
  constructor(id) {
    /* constructor*/
    this.id = id;
    this.title = "";
    this.price = 0;
    this.totalPaymentValue = this.price;
    this.seller_id = 0;
    this.available_quantity = 0;
    this.delivery_options = [];
  }
}