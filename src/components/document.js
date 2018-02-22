/**
 * @license
 * MIT Licensed.
 * Copyright (c) 2018 OpenZeppelin.
 * See LICENSE file in project's root directory.
 */

import AstNodeType from '../ast/ast-node-type'
import AstWalker from '../ast/ast-walker'
import get from '../util/safe-get'
import parseNatspec from '../util/parse-natspec'
import React from 'react'

/**
 * Render the content of a Docusaurus document for a specific contract.
 */
export default function Document (props) {
  const { contractDefinition } = props
  const itemDefinitions = getItemDefinitions(contractDefinition)
  return (
    <div className='contract-doc'>
      <Contract {...props} />
      <Index itemDefinitions={itemDefinitions} {...props} />
      <Reference itemDefinitions={itemDefinitions} {...props} />
    </div>
  )
}

/**
 * Render contract name and general description.
 */
function Contract (props) {
  const { contractDefinition } = props
  const documentation = get(contractDefinition, 'contract', 'documentation')
  const natspecTags = parseNatspec(documentation)
  return (
    <div className='contract'>
      <Header contractDefinition={contractDefinition} {...props} />
      <BaseContracts contractDefinition={contractDefinition} {...props} />
      <ContractDescription documentation={documentation} />
      <ContractSource contractDefinition={contractDefinition} {...props} />
      <ContractAuthor natspecTags={natspecTags} />
    </div>
  )
}

/**
 * Render contract kind and name.
 */
function Header (props) {
  const { contractDefinition } = props
  const contractKind = get(contractDefinition, 'contract', 'contractKind')
  const name = get(contractDefinition, 'contract', 'name')
  return (
    <h2 className='contract-header'>
      <span className='contract-kind'>{contractKind}</span>&nbsp;
      {name}
    </h2>
  )
}

/**
 * Render base contracts.
 */
function BaseContracts (props) {
  const { contractDefinition, idToHyperlink } = props
  const baseContracts = get(contractDefinition, 'contract', 'baseContracts')
  if (baseContracts.length === 0) {
    return null
  }
  const elements = []
  baseContracts.forEach((baseContract, index) => {
    const { name, referencedDeclaration } = baseContract.baseName
    elements.push(
      <a key={elements.length} href={idToHyperlink[referencedDeclaration]}>
        {name}
      </a>
    )
    if (index < baseContracts.length - 1) {
      elements.push(<span key={elements.length}>,&nbsp;</span>)
    }
  })
  return (
    <p className='base-contracts'>
      <span>is</span>&nbsp;
      {elements}
    </p>
  )
}

/**
 * Render link to contract's source.
 */
function ContractSource (props) {
  const { contractsPath, absolutePath, version, repoBaseUrl } = props
  const relativePath = absolutePath.slice(contractsPath.length + 1)
  const href = `${repoBaseUrl}/blob/v${version}/contracts/${relativePath}`
  return (
    <div className='source'>
      Source:&nbsp;<a href={href} target='_blank'>{relativePath}</a>
    </div>
  )
}

/**
 *  Render contract's author.
 */
function ContractAuthor (props) {
  const { natspecTags } = props
  if (!('author' in natspecTags)) {
    return null
  }
  return (
    <div className='author'>
      Author:&nbsp;{natspecTags['author']}
    </div>
  )
}

/**
 *  Render the contract's description.
 */
function ContractDescription (props) {
  const { documentation } = props
  const description = buildDescriptionFromDocumentation(documentation)
  if (description === '') {
    return null
  }
  return (
    <p className='description'>
      {description}
    </p>
  )
}

/**
 * Render an index containing all contract items (events, modifiers, functions).
 */
function Index (props) {
  const { itemDefinitions, idToHyperlink } = props
  if (itemDefinitions.length === 0) {
    return null
  }
  const sortedItemDefinitions = itemDefinitions.sort(compareItemDefinitionsByName)
  return (
    <div className='index'>
      <h2>Index</h2>
      <ul>
        {sortedItemDefinitions.map(itemDefinition => {
          const itemName = getItemName(itemDefinition)
          return (
            <li key={itemName}>
              <a href={idToHyperlink[get(itemDefinition, 'item', 'id')]}>{itemName}</a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/**
 * Render all contract items' content (events, modifiers, functions).
 */
function Reference (props) {
  const { itemDefinitions } = props
  if (itemDefinitions.length === 0) {
    return null
  }
  const eventDefinitions = itemDefinitions.filter(itemDefinition => {
    return get(itemDefinition, 'item', 'nodeType') === AstNodeType.EVENT_DEFINITION
  })
  const modifierDefinitions = itemDefinitions.filter(itemDefinition => {
    return get(itemDefinition, 'item', 'nodeType') === AstNodeType.MODIFIER_DEFINITION
  })
  const functionDefinitions = itemDefinitions.filter(itemDefinition => {
    return get(itemDefinition, 'item', 'nodeType') === AstNodeType.FUNCTION_DEFINITION
  })
  return (
    <div className='reference'>
      <h2>Reference</h2>
      {<Events eventDefinitions={eventDefinitions} {...props} />}
      {<Modifiers modifierDefinitions={modifierDefinitions} {...props} />}
      {<Functions functionDefinitions={functionDefinitions} {...props} />}
    </div>
  )
}

/**
 * Render all contract events.
 */
function Events (props) {
  const { eventDefinitions } = props
  if (eventDefinitions.length === 0) {
    return null
  }
  return (
    <div className='events'>
      <h3>Events</h3>
      <ul>
        {eventDefinitions.map(eventDefinition => {
          return (
            <li key={getItemName(eventDefinition)}>
              <Event eventDefinition={eventDefinition} {...props} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/**
 * Render a specific event.
 */
function Event (props) {
  const { eventDefinition } = props
  const eventName = getItemName(eventDefinition)
  return (
    <div className='item event'>
      <span id={eventName} className='anchor-marker' />
      <h4 className='name'>{eventName}</h4>
      <div className='body'>
        <EventSignature eventDefinition={eventDefinition} {...props} />
        <hr />
        <ItemDescription itemDefinition={eventDefinition} {...props} />
        <EventDetails eventDefinition={eventDefinition} {...props} />
      </div>
    </div>
  )
}

/**
 *  Render an event's signature.
 */
function EventSignature (props) {
  const { eventDefinition } = props
  return (
    <code className='signature'>
      event&nbsp;
      <strong>{getItemName(eventDefinition)}</strong>
      <SignatureParams itemDefinition={eventDefinition} {...props} />
    </code>
  )
}

/**
 * Render details for a specific event.
 */
function EventDetails (props) {
  const { eventDefinition } = props
  const natspecTags = parseNatspec(get(eventDefinition, 'event', 'documentation'))
  const parameters = get(eventDefinition, 'event', 'parameters.parameters')
  if (parameters.length === 0) {
    return null
  }
  return (
    <dl>
      <dt><span className='label-parameters'>Parameters:</span></dt>
      <dd>{parameters.map(parameter => {
        const parameterName = get(parameter, 'parameter', 'name')
        let parameterDescription = ''
        if (`param:${parameterName}` in natspecTags) {
          parameterDescription = ` - ${natspecTags[`param:${parameterName}`]}`
        } else {
          parameterDescription = ` - ${getParameterTypeName(parameter)}`
        }
        return (
          <div key={parameterName}>
            <code>{parameterName}</code>{parameterDescription}
          </div>
        )
      })}</dd>
    </dl>
  )
}

/**
 * Render all contract modifiers.
 */
function Modifiers (props) {
  const { modifierDefinitions } = props
  if (modifierDefinitions.length === 0) {
    return null
  }
  return (
    <div className='modifiers'>
      <h3>Modifiers</h3>
      <ul>
        {modifierDefinitions.map(modifierDefinition => {
          return (
            <li key={getItemName(modifierDefinition)}>
              <Modifier key={getItemName(modifierDefinition)}
                modifierDefinition={modifierDefinition}
                {...props}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/**
 * Render Modifier.
 */
function Modifier (props) {
  const { modifierDefinition } = props
  return (
    <div className='item modifier'>
      <span id={getItemName(modifierDefinition)} className='anchor-marker' />
      <h4 className='name'>{getItemName(modifierDefinition)}</h4>
      <div className='body'>
        <ModifierSignature modifierDefinition={modifierDefinition} {...props} />
        <hr />
        <ItemDescription itemDefinition={modifierDefinition} {...props} />
        <ModifierDetails modifierDefinition={modifierDefinition} {...props} />
      </div>
    </div>
  )
}

/**
 *  Render a modifier's signature.
 */
function ModifierSignature (props) {
  const { modifierDefinition } = props
  const modifierName = getItemName(modifierDefinition)
  return (
    <code className='signature'>
      modifier&nbsp;
      <strong>{modifierName}</strong>
      <SignatureParams itemDefinition={modifierDefinition} {...props} />
    </code>
  )
}

/**
 * Render details for a specific modifier.
 */
function ModifierDetails (props) {
  const { modifierDefinition } = props
  const parameters = get(modifierDefinition, 'modifier', 'parameters.parameters')
  const natspecTags = parseNatspec(get(modifierDefinition, 'modifier', 'documentation'))
  if (parameters.length === 0) {
    return null
  }
  return (
    <dl>
      <dt><span className='label-parameters'>Parameters:</span></dt>
      <dd>{parameters.map(parameter => {
        const parameterName = get(parameter, 'parameter', 'name')
        let parameterDescription = ''
        if (`param:${parameterName}` in natspecTags) {
          parameterDescription = ` - ${natspecTags[`param:${parameterName}`]}`
        } else {
          parameterDescription = ` - ${getParameterTypeName(parameter)}`
        }
        return (
          <div key={parameterName}>
            <code>{parameterName}</code>{parameterDescription}
          </div>
        )
      })}</dd>
    </dl>
  )
}

/**
 * Render all contract functions.
 */
function Functions (props) {
  const { functionDefinitions } = props
  if (functionDefinitions.length === 0) {
    return null
  }
  return (
    <div className='functions'>
      <h3>Functions</h3>
      <ul>
        {functionDefinitions.map(functionDefinition => {
          return (
            <li key={getItemName(functionDefinition)}>
              <Function functionDefinition={functionDefinition} {...props} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/**
 * Render a specific function.
 */
function Function (props) {
  const { functionDefinition } = props
  return (
    <div className='item function'>
      <span id={getItemName(functionDefinition)} className='anchor-marker' />
      <h4 className='name'>{getItemName(functionDefinition)}</h4>
      <div className='body'>
        <FunctionSignature functionDefinition={functionDefinition} {...props} />
        <hr />
        <ItemDescription itemDefinition={functionDefinition} {...props} />
        <FunctionDetails functionDefinition={functionDefinition} {...props} />
      </div>
    </div>
  )
}

/**
 *  Render a function's signature.
 */
function FunctionSignature (props) {
  const { functionDefinition } = props
  const functionName = get(functionDefinition, 'function', 'name')
  const isAbstract = !get(functionDefinition, 'function', 'implemented')
  const visibility = get(functionDefinition, 'function', 'visibility')
  const stateMutability = functionDefinition.stateMutability
  return (
    <code className='signature'>
      {isAbstract ? <span>abstract&nbsp;</span> : null }
      function&nbsp;
      <strong>{functionName}</strong>
      <SignatureParams itemDefinition={functionDefinition} {...props} />
      <span>{visibility}&nbsp;</span>
      {stateMutability !== 'nonpayable' ? <span>{stateMutability}&nbsp;</span> : null }
      <SignatureReturnParams itemDefinition={functionDefinition} {...props} />
    </code>
  )
}

/**
 * Render details for a specific function.
 */
function FunctionDetails (props) {
  const { functionDefinition, idToHyperlink } = props
  const natspecTags = parseNatspec(get(functionDefinition, 'function', 'documentation'))
  const modifiers = get(functionDefinition, 'function', 'modifiers')
  const parameters = get(functionDefinition, 'function', 'parameters.parameters')
  const returnParameters = get(functionDefinition, 'function', 'returnParameters.parameters')
  const elements = []
  if (modifiers.length > 0) {
    elements.push(
      <dt key={elements.length}>
        <span className='label-modifiers'>Modifiers:</span>
      </dt>
    )
    const modifierLinks = []
    modifiers.forEach(modifier => {
      const name = get(modifier, 'modifier', 'modifierName.name')
      const referencedDeclaration = get(modifier, 'modifier', 'modifierName.referencedDeclaration')
      // Hack to work around the fact that solc does not distinguish
      // between super constructor calls and modifiers.
      if (name.length > 0 && name[0] === name[0].toLowerCase()) {
        modifierLinks.push(
          <a key={name} href={idToHyperlink[referencedDeclaration]}>
            {name}&nbsp;
          </a>
        )
      }
    })
    elements.push(<dd key={elements.length}>{modifierLinks}</dd>)
  }
  if (parameters.length > 0) {
    elements.push(
      <dt key={elements.length}>
        <span className='label-parameters'>Parameters:</span>
      </dt>
    )
    elements.push(
      <dd key={elements.length}>
        {parameters.map(parameter => {
          const parameterName = get(parameter, 'parameter', 'name')
          let parameterDescription = ''
          if (`param:${parameterName}` in natspecTags) {
            parameterDescription = ` - ${natspecTags[`param:${parameterName}`]}`
          } else {
            parameterDescription = ` - ${getParameterTypeName(parameter)}`
          }
          return (
            <div key={parameterName}>
              <code>{parameterName}</code>{parameterDescription}
            </div>
          )
        })}
      </dd>
    )
  }
  if ('return' in natspecTags) {
    elements.push(
      <dt key={elements.length}>
        <span className='label-return'>Returns:</span>
      </dt>
    )
    elements.push(
      <dd key={elements.length}>
        {natspecTags['return']}
      </dd>
    )
  } else if (returnParameters.length > 0) {
    elements.push(
      <dt key={elements.length}>
        <span className='label-return'>Returns:</span>
      </dt>
    )
    returnParameters.forEach(returnParameter => {
      elements.push(
        <dd key={elements.length}>
          {getParameterTypeName(returnParameter)}
        </dd>
      )
    })
  }
  if (elements.length === 0) {
    return null
  }
  return (
    <dl>
      {elements}
    </dl>
  )
}

/**
 * Render an item's description (events, modifiers, functions).
 */
function ItemDescription (props) {
  const { itemDefinition } = props
  const description = buildDescriptionFromDocumentation(get(itemDefinition, 'item', 'documentation'))
  if (description === '') {
    return null
  }
  return (
    <div className='description'>
      <p>{description}</p>
    </div>
  )
}

/**
 * Render an item's description from its documentation.
 */
function buildDescriptionFromDocumentation (documentation) {
  const natspecTags = parseNatspec(documentation)
  const descriptionParts = []
  if (natspecTags.extra) {
    descriptionParts.push(natspecTags.extra)
  }
  if ('dev' in natspecTags) {
    descriptionParts.push(natspecTags['dev'])
  }
  if ('notice' in natspecTags) {
    descriptionParts.push(natspecTags['notice'])
  }
  let description = descriptionParts.join(', ')
  if (description.length > 0 && description[0] !== description[0].toUpperCase()) {
    description = [description[0].toUpperCase(), description.slice(1)].join('')
  }
  if (description.length > 0 && description[description.length - 1] !== '.') {
    description = [description, '.'].join('')
  }
  return description
}

/**
 * Render a signature's parameters.
 */
function SignatureParams (props) {
  const { itemDefinition } = props
  const parameters = get(itemDefinition, 'item', 'parameters.parameters')
  return (
    <span>
      ({parameters.map(parameter => {
        const parameterName = get(parameter, 'parameter', 'name')
        return `${getParameterTypeName(parameter)} ${parameterName}`
      }).join(', ')})&nbsp;
    </span>
  )
}

/**
 * Render a signature's return parameters.
 */
function SignatureReturnParams (props) {
  const { itemDefinition } = props
  const returnParameters = get(itemDefinition, 'item', 'returnParameters.parameters')
  if (returnParameters.length === 0) {
    return null
  }
  return (
    <span>
      returns&nbsp;
      ({returnParameters.map(parameter => {
        return `${getParameterTypeName(parameter)}`
      }).join(', ')})&nbsp;
    </span>
  )
}

/**
 * Retrieve all items from the given contract (events, modifiers, functions).
 */
function getItemDefinitions (contractDefinition) {
  let state = { itemDefinitions: [] }
  const astWalker = new AstWalker()
  astWalker.setStartFunction(AstNodeType.EVENT_DEFINITION, itemStartFunction)
  astWalker.setStartFunction(AstNodeType.MODIFIER_DEFINITION, itemStartFunction)
  astWalker.setStartFunction(AstNodeType.FUNCTION_DEFINITION, functionStartFunction)
  state = astWalker.walk(contractDefinition, state)
  return state.itemDefinitions

  function itemStartFunction (node, state) {
    return {
      ...state,
      itemDefinitions: state.itemDefinitions.concat([node])
    }
  }

  function functionStartFunction (node, state) {
    const visibility = get(node, 'AST node', 'visibility')
    if (visibility === 'private') {
      return state
    }
    return itemStartFunction(node, state)
  }
}

/**
 * Compare two items by name.
 */
function compareItemDefinitionsByName (itemDefinition1, itemDefinition2) {
  const itemName1 = getItemName(itemDefinition1)
  const itemName2 = getItemName(itemDefinition2)
  return itemName1 < itemName2 ? -1 : itemName2 < itemName1 ? 1 : 0
}

/**
 * Display name for fallback function.
 */
const FUNCTION_NAME_FALLBACK = 'fallback'

/**
 * Get an item's name.
 */
function getItemName (itemDefinition) {
  const nodeType = get(itemDefinition, 'item', 'nodeType')
  const name = get(itemDefinition, 'item', 'name')
  if (nodeType === AstNodeType.FUNCTION_DEFINITION && name === '') {
    return FUNCTION_NAME_FALLBACK
  }
  return name
}

/**
 * Get a parameter's type name.
 */
function getParameterTypeName (parameter) {
  const typeName = get(parameter, 'parameter', 'typeName')
  let type = []
  if (get(parameter, 'parameter', 'constant')) {
    type.push('constant')
  }
  const nodeType = get(typeName, 'typeName', 'nodeType')
  if (nodeType === AstNodeType.ARRAY_TYPE_NAME) {
    type.push(`${get(typeName, 'typeName', 'baseType.name')}[]`)
  } else if (nodeType === AstNodeType.FUNCTION_TYPE_NAME) {
    type.push(get(typeName, 'typeName', 'typeDescriptions.typeString'))
  } else {
    type.push(get(typeName, 'typeName', 'name'))
  }
  return type.join(' ')
}
