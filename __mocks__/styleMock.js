const styles = {};
styles.data = '.tbf-so-offer { border: 1px solid grey }';
styles.use = () => {
  const styleTag = document.createElement('style');
  styleTag.textContent = styles.data;
  document.head.appendChild(styleTag);
};

export default styles;
