class OfferModel {
  constructor(offer) {
    const {
      title,
      shortDescription,
      description,
      dateFrom,
      dateTo,
      image,
      discountValue,
      discountType,
      link,
    } = offer;

    this.title = title;
    this.shortDescription = shortDescription;
    this.description = description;
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.imageLink = image;
    this.discountValue = discountValue;
    this.discountType = discountType;
    this.bookingLink = link;
  }
}

export default OfferModel;
