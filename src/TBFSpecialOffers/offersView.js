import { offerElementClickEventHandler } from './offerEvents';

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
      template = this.options.renderTemplate();
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
            <div class="tbf-so-offer__short-description">${shortDescription}</div>
          </div>
          <div class="tbf-so-offer__content">
            <span class="tbf-so-offer__dates">From ${dateFrom} to ${dateTo}</span>
            <div class="tbf-so-offer__description">${description}</div>
            <img class="tbf-so-offer__image" src="${imageLink}" />
            <span class="tbf-so-offer__discount">${discountValue} ${discountType}</span>
            <a class="tbf-so-offer__booking-link" href="${bookingLink}">Book now</a>
          </div>
        </div>
      `;
    }
    return template;
  }

  assignCSS() {
    if (this.options.defaultCSS === true) {
      this.rootElement.classList.add('default-css');
    }
  }

  assignEvents() {
    if (this.options.defaultEvents === true) {
      const offerElements = this.rootElement.querySelectorAll('.tbf-so-offer');
      offerElements.forEach((offerElement) => {
        offerElement.addEventListener('click', offerElementClickEventHandler);
        offerElement.removeEventListener('onunload', offerElementClickEventHandler);
      });
    }
  }
}

export default OffersView;
