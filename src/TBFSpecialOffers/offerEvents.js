import { GET_PARENT_OFFER } from '../constants';

function getNewText(parentOffer) {
  return (parentOffer.classList.contains('tbf-so-open')) ?
    'Less' :
    'More';
}

export default function expandSpecialOfferDescription() {
  const parentOffer = GET_PARENT_OFFER(this);
  if (parentOffer.classList.contains('tbf-so-offer')) {
    parentOffer.classList.toggle('tbf-so-open');
    this.textContent = getNewText(parentOffer);
  } else {
    throw new Error('tbf-so-offer element not found');
  }
}

