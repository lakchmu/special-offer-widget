const API_END_POINT = 'https://app.thebookingfactory.com/api/public/v1/';
const API_METHOD_SPECIAL_OFFERS = 'special_offers';
const MISSING_IMAGE_URL = 'https://tbf-libraries.s3.eu-west-1.amazonaws.com/missing_special_offer.svg';
const PROD_STYLE_URL = 'https://tbf-libraries.s3-eu-west-1.amazonaws.com/tbfSpecialOffers.latest.css';
const DEV_STYLE_URL = './tbfSpecialOffers.latest.css';
const GET_DEFAULT_TEAMPLATE = (localizedDateFrom, localizedDateTo, imageLink, offerModel) => `
  <div class="tbf-so-offer">
    <div class="tbf-so-offer__content">
      <div class="tbf-so-offer__content-image">
        <img class="tbf-so-offer__image ${imageLink === MISSING_IMAGE_URL ? 'tbf-so-offer__missing-image' : ''}" src="${imageLink}" />
      </div>
      <div class="tbf-so-offer__content-text">
        <div class="tbf-so-offer__title">${offerModel.title}</div>
        <div class="tbf-so-offer__wrapper-description">
          <div class="tbf-so-offer__short-description">${offerModel.shortDescription}</div>
          <div class="tbf-so-offer__description">${offerModel.description}</div>
        </div>
        <div class="tbf-so-offer__footer">
          <span class="tbf-so-offer__dates">
            <i class="tbf-so-offer__icon-calendar"></i>${localizedDateFrom} - ${localizedDateTo}
          </span>
          <span class="tbf-so-offer__control-links">
            <button class="tbf-so-offer__more-link">More</button>
            <a class="tbf-so-offer__booking-link" href="${offerModel.bookingLink}">Book now</a>
          </span>
        </div>
      </div>
    </div>
  </div>
`;

export {
  API_END_POINT,
  API_METHOD_SPECIAL_OFFERS,
  MISSING_IMAGE_URL, PROD_STYLE_URL,
  DEV_STYLE_URL,
  GET_DEFAULT_TEAMPLATE };
