export default function offerElementClickEventHandler() {
  let parentOffer = this.parentElement;
  while (!parentOffer.classList.contains('tbf-so-offer') &&
         !parentOffer.classList.contains('tbf-special-offers')) {
    parentOffer = parentOffer.parentElement;
  }
  if (parentOffer.classList.contains('tbf-so-offer')) {
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
