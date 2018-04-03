import Carousel from './carousel';
import expandSpecialOfferDescription from './offerEvents';
import { MISSING_IMAGE_URL, PROD_STYLE_URL, DEV_STYLE_URL, GET_DEFAULT_TEAMPLATE } from '../constants';
import '../index.css';

class OffersView {
  constructor(rootElement, offersStorage, options) {
    // Assign internal variables
    this.rootElement = OffersView.getRootElement(rootElement);
    this.storage = offersStorage;
    this.options = options;

    // Action pipeline
    this.assignCSS();
    this.createView();
    this.assignEvents();
  }

  static getRootElement(selector) {
    const targetElement = document.querySelector(selector);
    if (!targetElement) {
      throw new Error(`Element "${selector}" not found`);
    }
    return targetElement;
  }

  createView() {
    switch (this.options.view) {
      case 'carousel':
        this.createCarousel();
        break;
      default:
        this.createList();
        break;
    }
  }

  createCarousel() {
    this.carousel = new Carousel(this);
  }

  createList() {
    this.rootElement.innerHTML = this.storage.list
      .map(offerModel => this.renderTemplate(offerModel))
      .join('\n');
  }

  renderCustomTemplate(offerModel) {
    let template;
    if (typeof this.options.renderTemplate !== 'function') {
      throw new Error('options.renderTemplate is not a function');
    } else {
      template = this.options.renderTemplate(offerModel);
    }
    return template;
  }

  renderDefaultTemplate(offerModel) {
    const currentLocale = window.navigator.userLanguage || window.navigator.language;
    const dataOption = { month: 'short', day: 'numeric' };
    const localizedDateFrom = offerModel.dateFrom.toLocaleString(currentLocale, dataOption);
    const localizedDateTo = offerModel.dateTo.toLocaleString(currentLocale, dataOption);

    return GET_DEFAULT_TEAMPLATE(
      localizedDateFrom,
      localizedDateTo,
      this.getImageLink(offerModel.imageLink),
      offerModel,
    );
  }

  renderTemplate(offerModel) {
    return (this.options.renderTemplate) ?
      this.renderCustomTemplate(offerModel) :
      this.renderDefaultTemplate(offerModel);
  }

  getImageLink(imageLink) {
    const missingImageUrl = (this.options.missingImageUrl) ?
      this.options.missingImageUrl :
      MISSING_IMAGE_URL;
    return (imageLink === '/images/public/missing.png') ? missingImageUrl : imageLink;
  }

  static getLocationHostname() {
    return window.location.hostname;
  }

  assignCSS() {
    if (this.options.defaultCSS !== false) {
      this.rootElement.classList.add('tbf-so-special-offers');
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = (OffersView.getLocationHostname() === 'localhost') ? DEV_STYLE_URL : PROD_STYLE_URL;
      document.head.appendChild(link);
    } else {
      console.warn('Do not use default styles');
    }
  }

  assignEvents() {
    if (this.options.defaultEvents !== false) {
      const offerElements = this.rootElement.querySelectorAll('.tbf-so-offer__more-link');
      offerElements.forEach((offerElement) => {
        offerElement.addEventListener('click', expandSpecialOfferDescription);
      });
    } else {
      console.warn('Do not use default events');
    }
  }
}

export default OffersView;
