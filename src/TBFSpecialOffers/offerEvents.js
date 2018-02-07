export default function offerElementClickEventHandler() {
  const parentOffer = this.closest('.tbf-so-offer');
  if (parentOffer) {
    parentOffer.classList.toggle('tbf-so-open');
    if (parentOffer.classList.contains('tbf-so-open')) {
      this.textContent = 'Less';
    } else {
      this.textContent = 'More';
    }
  } else {
    throw new Error('tbf-so-offer element not found');
  }
}
