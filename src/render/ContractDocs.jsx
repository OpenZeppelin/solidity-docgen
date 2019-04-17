import React from 'react';

import path from 'path';

import { FunctionDocs } from './FunctionDocs';
import { FunctionIdentifier } from './FunctionIdentifier';

export function ContractDocs(props) {
  const { name, devdoc, functions, events, docsPage } = props;

  const relativeURL = (url) => path.relative(path.dirname(docsPage), url) || '.';

  const functionDocs = functions.filter(fn => !fn.inherited).map(fn => (
    <FunctionDocs key={ fn.signature } {...fn} contractName={ name } />
  ));

  const functionIndex = functions.length > 0 && <>
    <span className="contract-index-title">Functions</span>
    <ul>
      {
        functions.map(fn => {
          const location = fn.inherited ? relativeURL(fn.definedIn.docsPage) : '';
          const definedIn = fn.inherited ? fn.definedIn.name : name;

          return (
            <li
              key={ fn.signature }
              className={ fn.inherited && 'inherited' }
            >
              <a href={ location + '#' + definedIn + '.' + fn.signature }>
                <FunctionIdentifier { ...fn } />
              </a>
            </li>
          );
        })
      }
    </ul>
  </>;

  const eventDocs = events.filter(fn => !fn.inherited).map(fn => (
    <FunctionDocs key={ fn.signature } {...fn} contractName={ name } />
  ));

  const eventIndex = events.length > 0 && <>
    <span className="contract-index-title">Events</span>
    <ul>
      { 
        events.map(fn => (
          <li
            key={ fn.signature }
            className={ name !== fn.definedIn ? 'inherited' : undefined }
          >
            <a href={ '#' + name + '.' + fn.signature }>
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
