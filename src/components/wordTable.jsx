import React from 'react';
import { DataTable, TableHeader } from 'react-mdl';

export const WordTable = ({ rows }) => (
  <DataTable style={{ tableLayout: 'fixed', width: '100%', margin: 'auto' }} shadow={0} rows={rows}>
    <TableHeader
      name="word"
    >
      Word
    </TableHeader>
    <TableHeader
      numeric
      name="count"
    >
      Count
    </TableHeader>
    <TableHeader
      numeric
      name="percentage"
      cellFormatter={(percentage) => `\%${percentage.toFixed(2)}`}
    >
      Frequency
    </TableHeader>
  </DataTable>
);

WordTable.propTypes = {
  rows: React.PropTypes.array,
};
