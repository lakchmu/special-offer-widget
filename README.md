# special-offer-widget
The Booking Factory special offer widgets
## For what
This widget allows you to display the special offer of your hotel on your site
## How to use
Put the code in the body tag:
### Default view
```html
<div class="special-offers"></div>
<script src="https://tbf-libraries.s3-eu-west-1.amazonaws.com/tbfSpecialOffers.latest.js"></script>
<script>
  var token = 'KO96pMbbIBTQPl7vnoJMXmIrEl2cYoUZS83QlL0Abu0';
  TBFSpecialOffer('.special-offers', token);
</script>
```
### Carousel view
```html
<div class="special-offers"></div>
<script src="https://tbf-libraries.s3-eu-west-1.amazonaws.com/tbfSpecialOffers.latest.js"></script>
<script>
  var token = 'KO96pMbbIBTQPl7vnoJMXmIrEl2cYoUZS83QlL0Abu0';
  var options = { view: 'carousel' };
  TBFSpecialOffer('.special-offers', token, options);
</script>
```
### Without default styles
```html
<div class="special-offers"></div>
<script src="https://tbf-libraries.s3-eu-west-1.amazonaws.com/tbfSpecialOffers.latest.js"></script>
<script>
  var token = 'KO96pMbbIBTQPl7vnoJMXmIrEl2cYoUZS83QlL0Abu0';
  var options = { defaultCSS: false };
  TBFSpecialOffer('.special-offers', token, options);
</script>
```
### Without default events
```html
<div class="special-offers"></div>
<script src="https://tbf-libraries.s3-eu-west-1.amazonaws.com/tbfSpecialOffers.latest.js"></script>
<script>
  var token = 'KO96pMbbIBTQPl7vnoJMXmIrEl2cYoUZS83QlL0Abu0';
  var options = { defaultEvents: false };
  TBFSpecialOffer('.special-offers', token, options);
</script>
```
### With your placeholder image
```html
<div class="special-offers"></div>
<script src="https://tbf-libraries.s3-eu-west-1.amazonaws.com/tbfSpecialOffers.latest.js"></script>
<script>
  var token = 'KO96pMbbIBTQPl7vnoJMXmIrEl2cYoUZS83QlL0Abu0';
  var options = { missingImageUrl: 'https://url-to-your-placeholder-image' };
  TBFSpecialOffer('.special-offers', token, options);
</script>
```