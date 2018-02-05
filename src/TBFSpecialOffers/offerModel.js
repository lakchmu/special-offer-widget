class OfferModel {
  constructor(offer) {
    const {
      title,
      short_description,
      description,
      date_from,
      date_to,
      image,
      discount_value,
      discount_type,
      link,
    } = offer;

    this.title = title;
    this.shortDescription = short_description;
    this.description = description;
    this.dateFrom = new Date(date_from);
    this.dateTo = new Date(date_to);
    this.imageLink = image;
    this.discountValue = discount_value;
    this.discountType = discount_type;
    this.bookingLink = link;
  }
}

export default OfferModel;
