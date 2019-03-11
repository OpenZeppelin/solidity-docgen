import React from 'react';

import { FunctionDocs } from './FunctionDocs';

export function ContractDocs(props) {
  const { name, devdoc, functions, events } = props;

  const functionDocs = functions.map(fn => (
    <FunctionDocs key={ fn.identifier } {...fn} contractName={ name } />
  ));

  const functionIndex = functions.map(fn => (
    <li key={ fn.identifier }>
      <a href={ '#' + name + '.' + fn.identifier }>
        { fn.identifier }
      </a>
    </li>
  ));

  const eventDocs = events.map(fn => (
    <FunctionDocs key={ fn.identifier } {...fn} contractName={ name } />
  ));

  const eventIndex = events.map(fn => (
    <li key={ fn.identifier }>
      <a href={ '#' + name + '.' + fn.identifier }>
        { fn.identifier }
      </a>
    </li>
  ));

  return (
    <>
    <h2>{ name }</h2>
    { '\n\n' }
    { devdoc }
    { '\n\n' }
    <h3>Functions</h3>
    <ul>
      { functionIndex }
    </ul>
    { '\n\n' }
    <h3>Events</h3>
    <ul>
      { eventIndex }
    </ul>
    { '\n\n' }
    { functionDocs }
    { '\n\n' }
    { eventDocs }
    { '\n\n' }
    </>
  );
}
