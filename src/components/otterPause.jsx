import React from 'react';
import { Cell, CardTitle, CardText, ProgressBar } from 'react-mdl';

export const OtterPause = () => (
  <Cell col={12} shadow={2} style={{ width: '100%', margin: 'auto' }}>
    <CardTitle style={{ color: '#fff', height: '300px', background: 'url(http://i.imgur.com/d8R5Y85.gif) center / cover' }}>One sec, loading data! :3</CardTitle>
    <CardText>
      <strong>*chomp chomp chomp*</strong>
    </CardText>
    <ProgressBar style={{ width: '100%' }} indeterminate />
  </Cell>
);
