import React from 'react';
import PropTypes from 'prop-types';

import logoGrayImg from './assets/logoGray.png';

function Logo({ src, alt, ...attributes }) {
  return (
    <img src={logoGrayImg} alt={alt} {...attributes} />
  );
}

Logo.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

function LinkedLogo({
  href,
  src,
  alt,
  ...attributes
}) {
  return (
    <a href={href} {...attributes}>
      <img className="d-block" src={logoGrayImg} alt={alt} />
    </a>
  );
}

LinkedLogo.propTypes = {
  href: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export { LinkedLogo, Logo };
export default Logo;
