import React from 'react';
import { Card, Cell, CardTitle } from 'react-mdl';

export const PaneCard = ({ children, title }) => (
  <Cell col={12} shadow={2}>
    <CardTitle>{title}</CardTitle>
    {children}
  </Cell>
);

PaneCard.propTypes = {
  children: React.PropTypes.object,
  title: React.PropTypes.string,
};
