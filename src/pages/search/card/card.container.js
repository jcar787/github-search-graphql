import React from 'react';
import PropTypes from 'prop-types';
import CardView from './card.view';

const CardContainer = props => {
  const { repo } = props;
  return <CardView repo={repo} />;
};

CardContainer.propTypes = {
  repo: PropTypes.object
};

export default CardContainer;
