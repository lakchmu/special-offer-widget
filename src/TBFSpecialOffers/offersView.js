import {offerElementClickEventHandler} from './offerEvents'

class OffersView {
  constructor(rootElement, offersStorage, options) {
    this.rootElement = document.querySelector(rootElement);
    this.storage = offersStorage;
    this.options = options;
    if (this.options.defaultCSS === true) {
      this.rootElement.classList.add('default-css');
    }
    this.createList();
    if (this.options.defaultEvents === true) {
      this.initAndDestroyEvents();
    }
  }

  createList() {
    const renderFunction = this.options.renderTemplate ? this.options.renderTemplate : this.renderTemplate;
    const fullTemplate = this.storage.list.map(offerModel => {
      return renderFunction(offerModel);
    });
    this.rootElement.innerHTML = fullTemplate.join('\n');
  }

  renderTemplate(offerModel) {
    return `
      <div class="offer">
        <div class="offer__header">
          <div class="offer__title">${offerModel.title}</div>
          <div class="offer__short-description">${offerModel.shortDescription}</div>
        </div>
        <div class="offer__content">
          <span class="offer__dates">From ${offerModel.dateFrom} to ${offerModel.dateTo}</span>
          <div class="offer__description">${offerModel.description}</div>
          <img class="offer__image" src="${offerModel.imageLink}" />
          <span class="offer__discount">${offerModel.discountValue} ${offerModel.discountType}</span>
          <a class="offer__booking-link" href="${offerModel.bookingLink}">Book now</a>
        </div>
      </div>
    `;
  }

  initAndDestroyEvents() {
    const offerElements = document.querySelectorAll('.offer');
    offerElements.forEach(offerElement => {
      offerElement.addEventListener('click', offerElementClickEventHandler);
      offerElement.removeEventListener('onunload', offerElementClickEventHandler);
    });
  }
}

export default OffersView;