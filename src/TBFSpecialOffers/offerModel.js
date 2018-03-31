class OfferModel {
  constructor(offer) {
    this.title = offer.title;
    this.shortDescription = offer.short_description;
    this.description = offer.description;
    this.dateFrom = new Date(offer.date_from);
    this.dateTo = new Date(offer.date_to);
    this.imageLink = offer.image;
    this.discountValue = offer.discount_value;
    this.discountType = offer.discount_type;
    this.bookingLink = offer.link;
  }
}

export default OfferModel;
