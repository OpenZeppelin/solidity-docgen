import React from 'react';

import { FunctionDocs } from './FunctionDocs';
import { FunctionIdentifier } from './FunctionIdentifier';

export function ContractDocs(props) {
  const { name, devdoc, functions, events } = props;

  const functionDocs = functions.map(fn => (
    <FunctionDocs key={ fn.identifier } {...fn} contractName={ name } />
  ));

  const functionIndex = functions.length > 0 && <>
    <span className="contract-index-title">Functions</span>
    <ul>
      {
        functions.map(fn => (
          <li key={ fn.identifier }>
            <a href={ '#' + name + '.' + fn.identifier }>
              <FunctionIdentifier { ...fn } />
            </a>
          </li>
        ))
      }
    </ul>
  </>;

  const eventDocs = events.map(fn => (
    <FunctionDocs key={ fn.identifier } {...fn} contractName={ name } />
  ));

  const eventIndex = events.length > 0 && <>
    <span className="contract-index-title">Events</span>
    <ul>
      { 
        events.map(fn => (
          <li key={ fn.identifier }>
            <a href={ '#' + name + '.' + fn.identifier }>
              <FunctionIdentifier { ...fn } />
            </a>
          </li>
        ))
      }
    </ul>
  </>;

  return (
    <>
    { '\n\n' }
    ### `{ name }`
    { '\n\n' }
    { devdoc }
    { '\n\n' }
    <div className="contract-index">
      { functionIndex }
      { eventIndex }
    </div>
    { '\n\n' }
    { functionDocs }
    { '\n\n' }
    { eventDocs }
    { '\n\n' }
    </>
  );
}
