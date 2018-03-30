function checkParentElement(parentElement) {
  return parentElement.classList.contains('tbf-so-offer') ||
    parentElement.classList.contains('tbf-special-offers');
}

function getNewText(parentOffer) {
  return (parentOffer.classList.contains('tbf-so-open')) ?
    'Less' :
    'More';
}

export default function expandSpecialOfferDescription() {
  let parentOffer = this.parentElement;
  while (!checkParentElement(parentOffer)) {
    parentOffer = parentOffer.parentElement;
  }
  if (parentOffer.classList.contains('tbf-so-offer')) {
    parentOffer.classList.toggle('tbf-so-open');
    this.textContent = getNewText(parentOffer);
  } else {
    throw new Error('tbf-so-offer element not found');
  }
}

