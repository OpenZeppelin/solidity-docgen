import React from 'react'
import ReactDOMServer from 'react-dom/server'
import ASTWalker from '../ast/ast-walker'
import { parseNatspec } from '../util/parse-natspec'

const NODE_TYPE_EVENT_DEFINITION = 'EventDefinition'
const NODE_TYPE_MODIFIER_DEFINITION = 'ModifierDefinition'
const NODE_TYPE_FUNCTION_DEFINITION = 'FunctionDefinition'

const FUNCTION_NAME_FALLBACK = 'fallback'

/**
 *
 */
export default function ContractDoc(props) {
  const { contractDefinition } = props
  const itemDefinitions = getItemDefinitions(contractDefinition)
  return (
    <div className="contract-doc">
      <Contract {...props}/>
      <Index itemDefinitions={itemDefinitions} {...props}/>
      <Reference itemDefinitions={itemDefinitions} {...props}/>
    </div>
  )
}

/**
 *
 */
function Contract(props) {
  const { contractDefinition } = props
  const documentation = contractDefinition.documentation
  const natspecTags = parseNatspec(documentation)
  return (
    <div className="contract">
      <Header contractDefinition={contractDefinition} {...props}/>
      <BaseContracts contractDefinition={contractDefinition} {...props}/>
      <ContractDescription documentation={documentation}/>
      <ContractSource contractDefinition={contractDefinition} {...props}/>
      <ContractAuthor natspecTags={natspecTags}/>
    </div>
  )
}

/**
 *
 */
function Header(props) {
  const { contractDefinition } = props
  const { contractKind, name } = contractDefinition
  return (
    <h2 className="contract-header">
      <span className="contract-kind">{contractKind}</span>&nbsp;
      {name}
    </h2>
  )
}

/**
 *
 */
function BaseContracts(props) {
  const { contractDefinition, idToHyperlink } = props
  const { baseContracts } = contractDefinition
  if (baseContracts.length === 0) {
    return null
  }
  const elements = []
  baseContracts.forEach((baseContract, index) => {
    const { name, referencedDeclaration } = baseContract.baseName
    elements.push(
      <a key={elements.length} href={idToHyperlink[referencedDeclaration]}>{name}</a>
    )
    if (index < baseContracts.length - 1) {
      elements.push(<span key={elements.length}>,&nbsp;</span>)
    }
  })
  return (
    <p className="base-contracts">
      <span>is</span>&nbsp;
      {elements}
    </p>
  )
}

/**
 *
 */
function ContractSource(props) {
  const { absolutePath } = props
  const source = absolutePath.split('/').slice(2).join('/')
  const href = `https://github.com/OpenZeppelin/zeppelin-solidity/blob/v1.6.0/contracts/${source}`
  return (
    <div className="source">
      Source:&nbsp;<a href={href} target="_blank">{source}</a>
    </div>
  )
}

/**
 * 
 */
function ContractAuthor(props) {
  const { natspecTags } = props
  if (!('author' in natspecTags)) {
    return null
  }
  return (
    <div className="author">
      Author:&nbsp;{natspecTags['author']}
    </div>
  )
}

/**
 * 
 */
function ContractDescription(props) {
  const { documentation } = props
  const description = buildDescriptionFromDocumentation(documentation)
  if (description === '') {
    return null
  }
  return (
    <p className="description">
      {description}
    </p>
  )
}

/**
 *
 */
function Index(props) {
  const { itemDefinitions, idToHyperlink } = props
  if (itemDefinitions.length === 0) {
    return null
  }
  const sortedItemDefinitions = itemDefinitions.sort(compareItemDefinitionsByName)
  return (
    <div className="index">
      <h2>Index</h2>
      <ul>
        {sortedItemDefinitions.map(itemDefinition => {
          const itemName = getItemName(itemDefinition)
          return (
            <li key={itemName}>
              <a href={idToHyperlink[itemDefinition.id]}>{itemName}</a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/**
 *
 */
function Reference(props) {
  const { itemDefinitions } = props
  if (itemDefinitions.length === 0) {
    return null
  }
  const eventDefinitions = itemDefinitions.filter(itemDefinition => {
    return itemDefinition.nodeType === NODE_TYPE_EVENT_DEFINITION
  })
  const modifierDefinitions = itemDefinitions.filter(itemDefinition => {
    return itemDefinition.nodeType === NODE_TYPE_MODIFIER_DEFINITION
  })
  const functionDefinitions = itemDefinitions.filter(itemDefinition => {
    return itemDefinition.nodeType === NODE_TYPE_FUNCTION_DEFINITION
  })
  return (
    <div className="reference">
      <h2>Reference</h2>
      {<Events eventDefinitions={eventDefinitions} {...props}/>}
      {<Modifiers modifierDefinitions={modifierDefinitions} {...props}/>}
      {<Functions functionDefinitions={functionDefinitions} {...props}/>}
    </div>
  )
}

/**
 *
 */
function Events(props) {
  const { eventDefinitions } = props
  if (eventDefinitions.length === 0) {
    return null
  }
  return (
    <div className="events">
      <h3>Events</h3>
      <ul>
        {eventDefinitions.map(eventDefinition => {
          return (
            <li key={eventDefinition.name}>
              <Event eventDefinition={eventDefinition} {...props}/>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/**
 *
 */
function Event(props) {
  const { eventDefinition } = props
  const eventName = eventDefinition.name
  return (
    <div className="item event">
      <span id={eventName} className="anchor-marker"></span>
      <h4 className="name">{eventName}</h4>
      <div className="body">
        <EventSignature eventDefinition={eventDefinition} {...props} />
        <hr />
        <ItemDescription itemDefinition={eventDefinition} {...props} />
        <EventDetails eventDefinition={eventDefinition} {...props} />
      </div>
    </div>
  )
}

/**
 * 
 */
function EventSignature(props) {
  const { eventDefinition } = props
  const eventName = eventDefinition.name
  return (
    <code className="signature">
      event&nbsp;
      <strong>{eventName}</strong>
      <SignatureParams itemDefinition={eventDefinition} {...props} />
    </code>
  )
}

/**
 *
 */
function buildDescriptionFromDocumentation(documentation) {
  const natspecTags = parseNatspec(documentation)
  const descriptionParts = []
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
 *
 */
function EventDetails(props) {
  const { eventDefinition } = props
  const natspecTags = parseNatspec(eventDefinition.documentation)
  const parameters = eventDefinition.parameters.parameters
  if (parameters.length === 0) {
    return null
  }
  return (
    <dl>
      <dt><span className="label-parameters">Parameters:</span></dt>
      <dd>{parameters.map(parameter => {
        let parameterDescription = ''
        if (`param:${parameter.name}` in natspecTags) {
          parameterDescription = ` - ${natspecTags[`param:${parameter.name}`]}`
        }
        else {
          parameterDescription = ` - ${getParameterTypeName(parameter)}`
        }
        return <div key={parameter.name}><code>{parameter.name}</code>{parameterDescription}</div>
      })}</dd>
    </dl>
  )
}

/**
 *
 */
function Modifiers(props) {
  const { modifierDefinitions } = props
  if (modifierDefinitions.length === 0) {
    return null
  }
  return (
    <div className="modifiers">
      <h3>Events</h3>
      <ul>
        {modifierDefinitions.map(modifierDefinition => {
          return (
            <li key={modifierDefinition.name}>
              <Modifier key={getItemName(modifierDefinition)} modifierDefinition={modifierDefinition} {...props}/>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/**
 *
 */
function Modifier(props) {
  const { modifierDefinition } = props
  return (
    <div className="item modifier">
      <span id={getItemName(modifierDefinition)} className="anchor-marker"></span>
      <h4 className="name">{getItemName(modifierDefinition)}</h4>
      <div className="body">
        <ModifierSignature modifierDefinition={modifierDefinition} {...props} />
        <hr />
        <ItemDescription itemDefinition={modifierDefinition} {...props} />
        <ModifierDetails modifierDefinition={modifierDefinition} {...props} />
      </div>
    </div>
  )
}

/**
 * 
 */
function ModifierSignature(props) {
  const { modifierDefinition } = props
  const modifierName = modifierDefinition.name
  return (
    <code className="signature">
      modifier&nbsp;
      <strong>{modifierName}</strong>
      <SignatureParams itemDefinition={modifierDefinition} {...props} />
    </code>
  )
}

/**
 *
 */
function ModifierDetails(props) {
  const { modifierDefinition } = props
  const parameters = modifierDefinition.parameters.parameters
  const natspecTags = parseNatspec(modifierDefinition.documentation)
  if (parameters.length === 0) {
    return null
  }
  return (
    <dl>
      <dt><span className="label-parameters">Parameters:</span></dt>
      <dd>{parameters.map(parameter => {
        let parameterDescription = ''
        if (`param:${parameter.name}` in natspecTags) {
          parameterDescription = ` - ${natspecTags[`param:${parameter.name}`]}`
        }
        else {
          parameterDescription = ` - ${getParameterTypeName(parameter)}`
        }
        return (
          <div key={parameter.name}>
            <code>{parameter.name}</code>{parameterDescription}
          </div>
        )
      })}</dd>
    </dl>
  )
}

/**
 *
 */
function Functions(props) {
  const { functionDefinitions } = props
  if (functionDefinitions.length === 0) {
    return null
  }
  return (
    <div className="functions">
      <h3>Functions</h3>
      <ul>
        {functionDefinitions.map(functionDefinition => {
          return (
            <li key={getItemName(functionDefinition)}>
              <Function functionDefinition={functionDefinition} {...props}/>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/**
 *
 */
function Function(props) {
  const { functionDefinition } = props
  return (
    <div className="item function">
      <span id={getItemName(functionDefinition)} className="anchor-marker"></span>
      <h4 className="name">{getItemName(functionDefinition)}</h4>
      <div className="body">
        <FunctionSignature functionDefinition={functionDefinition} {...props} />
        <hr />
        <ItemDescription itemDefinition={functionDefinition} {...props} />
        <FunctionDetails functionDefinition={functionDefinition} {...props} />
      </div>
    </div>
  )
}

/**
 * 
 */
function FunctionSignature(props) {
  const { functionDefinition } = props
  const functionName = functionDefinition.name
  const isAbstract = !functionDefinition.implemented
  const visibility = functionDefinition.visibility
  const stateMutability = functionDefinition.stateMutability
  return (
    <code className="signature">
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
 *
 */
function FunctionDetails(props) {
  const { functionDefinition, idToHyperlink } = props
  const natspecTags = parseNatspec(functionDefinition.documentation)
  const modifiers = functionDefinition.modifiers
  const parameters = functionDefinition.parameters.parameters
  const elements = []
  if (modifiers.length > 0) {
    elements.push(
      <dt key={elements.length}>
        <span className="label-modifiers">Modifiers:</span>
      </dt>
    )
    const modifierLinks = []
    modifiers.forEach(modifier => {
      const { name, referencedDeclaration } = modifier.modifierName
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
        <span className="label-parameters">Parameters:</span>
      </dt>
    )
    elements.push(
      <dd key={elements.length}>
        {parameters.map(parameter => {
          let parameterDescription = ''
          if (`param:${parameter.name}` in natspecTags) {
            parameterDescription = ` - ${natspecTags[`param:${parameter.name}`]}`
          }
          else {
            parameterDescription = ` - ${getParameterTypeName(parameter)}`
          }
          return <div key={parameter.name}><code>{parameter.name}</code>{parameterDescription}</div>
        })}
      </dd>
    )
  }
  if ('return' in natspecTags) {
    elements.push(<dt key={elements.length}><span className="label-return">Returns:</span></dt>)
    elements.push(<dd key={elements.length}>{natspecTags['return']}</dd>)
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
 *
 */
function ItemDescription(props) {
  const { itemDefinition } = props
  const description = buildDescriptionFromDocumentation(itemDefinition.documentation)
  if (description === '') {
    return null
  }
  return (
    <div className="description">
      <p>{description}</p>
    </div>
  )
}

/**
 *
 */
function SignatureParams(props) {
  const { itemDefinition } = props
  const parameters = itemDefinition.parameters.parameters
  return (
    <span>
      ({parameters.map(parameter => {
        return `${getParameterTypeName(parameter)} ${parameter.name}`
      }).join(', ')})&nbsp;
    </span>
  )
}

/**
 *
 */
function SignatureReturnParams(props) {
  const { itemDefinition } = props
  const returnParameters = itemDefinition.returnParameters.parameters
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
 *
 */
function getItemDefinitions(contractDefinition) {
  let state = { itemDefinitions: [] }
  const astWalker = new ASTWalker()
  astWalker.setStartFunction(NODE_TYPE_EVENT_DEFINITION, itemStartFunction)
  astWalker.setStartFunction(NODE_TYPE_MODIFIER_DEFINITION, itemStartFunction)
  astWalker.setStartFunction(NODE_TYPE_FUNCTION_DEFINITION, functionStartFunction)
  state = astWalker.walk(contractDefinition, state)
  return state.itemDefinitions

  function itemStartFunction(node, state) {
    return {
      ...state,
      itemDefinitions: state.itemDefinitions.concat([node])
    }
  }

  function functionStartFunction(node, state) {
    if (node.visibility === 'private') {
      return state
    }
    return itemStartFunction(node, state)
  }
}

/**
 *
 */
function compareItemDefinitionsByName(itemDefinition1, itemDefinition2) {
  const itemName1 = getItemName(itemDefinition1)
  const itemName2 = getItemName(itemDefinition2)
  return itemName1 < itemName2 ? -1 : itemName2 < itemName1 ? 1 : 0
}

/**
 *
 */
function getItemName(itemDefinition) {
  if (itemDefinition.nodeType === NODE_TYPE_FUNCTION_DEFINITION &&
      itemDefinition.name === '') {
    return FUNCTION_NAME_FALLBACK
  }
  return itemDefinition.name
}

/**
 *
 */
function getItemParameters(itemDefinition) {
  const parameters = itemDefinition.parameters.parameters
  return parameters.map(parameter => `${getParameterTypeName(parameter)} ${parameter.name}`)
}

/**
 *
 */
function getParameterTypeName(parameter) {
  const typeName = parameter.typeName
  let type = []
  if (parameter.constant) {
    type.push('constant')
  }
  if (typeName.nodeType === 'ArrayTypeName') {
    type.push(`${typeName.baseType.name}[]`)
  }
  else {
    type.push(typeName.name)
  }
  return type.join(' ')
}
