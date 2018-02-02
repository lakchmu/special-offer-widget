import offerElementClickEventHandler from './offerEvents';
import style from '../index.css';

class OffersView {
  constructor(rootElement, offersStorage, options) {
    // Assign internal variables
    this.rootElement = OffersView.getRootElement(rootElement);
    this.storage = offersStorage;
    this.options = options;

    // Action pipeline
    this.assignCSS();
    this.createList();
    this.assignEvents();
  }

  static getRootElement(selector) {
    const targetElement = document.querySelector(selector);
    if (!targetElement) {
      throw new Error(`Element "${selector}" not found`);
    }
    return targetElement;
  }

  createList() {
    this.rootElement.innerHTML = this.storage.list
      .map(offerModel => this.renderTemplate(offerModel))
      .join('\n');
  }

  renderTemplate(offerModel) {
    let template;
    if (this.options.renderTemplate) {
      if (typeof this.options.renderTemplate !== 'function') {
        throw new Error('options.renderTemplate is not a function');
      }
      if (this.options.renderTemplate.length !== 1) {
        throw new Error('options.renderTemplate must take one parameter');
      }
      template = this.options.renderTemplate(offerModel);
      if (typeof template !== 'string') {
        throw new Error('options.renderTemplate must return a string');
      }
    } else {
      const {
        title,
        shortDescription,
        dateFrom,
        dateTo,
        description,
        imageLink,
        discountValue,
        discountType,
        bookingLink,
      } = offerModel;

      template = `
        <div class="tbf-so-offer">
          <div class="tbf-so-offer__header">
            <div class="tbf-so-offer__title">${title}</div>
          </div>
          <div class="tbf-so-offer__content">
            <div class="tbf-so-offer__content-image">
              <img class="tbf-so-offer__image" src="${imageLink}" />
            </div>
            <div class="tbf-so-offer__content-text">
              <div class="tbf-so-offer__short-description">${shortDescription}</div>
              <div class="tbf-so-offer__description">${description}</div>
              <span class="tbf-so-offer__dates">
                <i class="fas fa-calendar-alt"></i>${dateFrom} - ${dateTo}
              </span>
            </div>
            <div class="tbf-so-offer__content-booking">
              <div class="tbf-so-offer__discount-description">From</div>
              <div class="tbf-so-offer__discount">${discountValue} ${discountType === 'percent' ? '%' : discountType}</div>
              <div class="tbf-so-offer__discount-description">per nigth</div>
              <a class="tbf-so-offer__booking-link" href="${bookingLink}">Book now</a>
            </div>
          </div>
        </div>
      `;
    }
    return template;
  }

  assignCSS() {
    if (this.options.defaultCSS !== false) {
      style.use();
    }
  }

  assignEvents() {
    if (this.options.defaultEvents !== false) {
      const offerElements = this.rootElement.querySelectorAll('.tbf-so-offer');
      offerElements.forEach((offerElement) => {
        offerElement.addEventListener('click', offerElementClickEventHandler);
        offerElement.removeEventListener('unload', offerElementClickEventHandler);
      });
    }
  }
}

export default OffersView;
