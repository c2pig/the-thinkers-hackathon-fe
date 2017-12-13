import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

const IconWithDescription = ({ description, icon, ...props }) => (
  <div {...props}>
    <Icon name={icon} />
    <span>{description}</span>
  </div>
);

IconWithDescription.propTypes = {
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}

export default IconWithDescription;
