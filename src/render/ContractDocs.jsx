import React from 'react';

import { FunctionDocs } from './FunctionDocs';
import { FunctionIdentifier } from './FunctionIdentifier';

export function ContractDocs(props) {
  const { name, devdoc, functions, events, docsPage } = props;

  const functionDocs = functions.map(fn => (
    <FunctionDocs key={ fn.identifier } {...fn} contractName={ name } />
  ));

  const functionIndex = functions.length > 0 && <>
    <span className="contract-index-title">Functions</span>
    <ul>
      {
        functions.map(fn => {
          const location = fn.inherited ? `/${fn.definedIn.docsPage}` : '';
          const definedIn = fn.inherited ? fn.definedIn.name : name;

          return (
            <li
              key={ fn.identifier }
              className={ fn.inherited && 'inherited' }
            >
              <a href={ location + '#' + definedIn + '.' + fn.identifier }>
                <FunctionIdentifier { ...fn } />
              </a>
            </li>
          );
        })
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
          <li
            key={ fn.identifier }
            className={ name !== fn.definedIn ? 'inherited' : undefined }
          >
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
