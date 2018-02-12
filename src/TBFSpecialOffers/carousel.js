class Carousel {
  constructor(offerView) {
    this.offerView = offerView;
    this.createCarousel();
    this.offersCount = this.offerView.storage.list.length;
    this.offerList = this.offerView.rootElement.querySelector('.tbf-so-offer-list');
    this.activeIndicator = this.offerView.rootElement.querySelector('.tbf-so-carousel-indicator');
    this.activeIndicator.classList.add('active');
    this.assignEvents();
  }

  createCarousel() {
    this.offerView.rootElement.innerHTML = this.renderCarousel();
    this.offerView.rootElement.classList.add('tbf-so-carousel');
  }

  renderCarousel() {
    return `
    <div class="tbf-so-carousel-content">
      <div class="tbf-so-offer-list">
        ${this.renderOfferList()}
      </div>
    </div>
    <div class="tbf-so-carousel-indicators">
      <div class="tbf-so-arrow" data-direction="to-left"></div>
      ${this.renderIndicatorList()}
      <div class="tbf-so-arrow" data-direction="to-right"></div>
    </div>
    `;
  }

  renderOfferList() {
    return this.offerView.storage.list
      .map(offerModel => this.offerView.renderTemplate(offerModel))
      .join('\n');
  }

  renderIndicatorList() {
    return this.offerView.storage.list
      .map((offerModel, index) => `<div class="tbf-so-carousel-indicator" data-number-offer="${index}"></div>`)
      .join('\n');
  }

  assignEvents() {
    const carouselIndicators = this.offerView.rootElement.querySelectorAll('.tbf-so-carousel-indicator');
    carouselIndicators.forEach((indicator) => {
      indicator.addEventListener('click', () => {
        this.changeActiveIndicator(indicator);
        this.spin();
      });
    });
    const carouselArrows = this.offerView.rootElement.querySelectorAll('.tbf-so-arrow');
    carouselArrows.forEach((arrow) => {
      arrow.addEventListener('click', () => {
        this.changeActiveIndicator(this.getNextIndicator(arrow));
        this.spin();
      });
    });
  }

  getNextIndicator(arrow) {
    let numberOfferNextIndicator;
    switch (arrow.dataset.direction) {
      case 'to-left':
        numberOfferNextIndicator = JSON.parse(this.activeIndicator.dataset.numberOffer) - 1;
        if (numberOfferNextIndicator < 0) {
          numberOfferNextIndicator = this.offersCount - 1;
        }
        break;
      case 'to-right':
        numberOfferNextIndicator = JSON.parse(this.activeIndicator.dataset.numberOffer) + 1;
        if (numberOfferNextIndicator >= this.offersCount) {
          numberOfferNextIndicator = 0;
        }
        break;
      default:
        break;
    }
    return this.offerView.rootElement.querySelector(`[data-number-offer='${numberOfferNextIndicator}'`);
  }

  changeActiveIndicator(indicator) {
    this.activeIndicator.classList.remove('active');
    this.activeIndicator = indicator;
    this.activeIndicator.classList.add('active');
  }

  spin() {
    this.offerList.style.transition = 'all 700ms ease';
    this.offerList.style.transform = `translateX(${this.getShift()}px)`;
  }

  getShift() {
    const numberStep = this.activeIndicator.dataset.numberOffer;
    const step = this.offerList.offsetWidth / this.offersCount;
    return -(step * numberStep);
  }
}

export default Carousel;
