// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { Children, PropTypes } from 'react';
import classnames from 'classnames';
import RightLeftIcon from './icons/LinkRightLeft';
import iconsMap from '../index-icons';

const CLASS_ROOT = 'anchor';

const Anchor = props => {
  let icon;

  if (props.icon && !iconsMap.hasOwnProperty(props.icon)) {
    console.log('Warning: Anchor is unable to find the icon with props.icon:', props.icon);

    if (props.primary) {
      icon = <RightLeftIcon />;
    }
  }
  if (props.icon && iconsMap.hasOwnProperty(props.icon)) {
    let CustomIcon  = iconsMap[props.icon];
    icon = <CustomIcon />;

    if (!props.primary) {
      icon = (<span className={`${CLASS_ROOT}__icon`}>{icon}</span>);
    }
  }

  let classes = classnames(
    CLASS_ROOT,
    props.className,
    {
      [`${CLASS_ROOT}--primary`]: props.primary,
      [`${CLASS_ROOT}--disabled`]: props.disabled
    }
  );

  let children = Children.map(props.children, child => {
    if (child && child.type && child.type.icon) {
      child = <span className={`${CLASS_ROOT}__icon`}>{child}</span>;
    }

    return child;
  });

  return (
    <props.tag id={props.id} className={classes}
      href={props.href}
      target={props.target}
      onClick={props.onClick}>
      {icon}
      {children}
    </props.tag>
  );
};


Anchor.propTypes = {
  icon: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  primary: PropTypes.bool,
  tag: PropTypes.string,
  target: PropTypes.string
};

Anchor.defaultProps = {
  tag: 'a'
};

export default Anchor;
