import React from 'react'
import styled from 'react-emotion';

const CharacterCount = styled.h4`
  margin-top: 32px;
  color: dimgray;
  font-weight: normal;
`

const CharacterContainer = styled.div`
  margin-bottom: 48px;
`

const CharacterTitle = styled.h4`
  color: tomato;
  margin-bottom: 4px;
`

const CharacterLabel = styled.span`
  font-weight: bold;
  margin-right: 8px;
`

const renderCharacter = (node) => {
  const {id, name, height, mass} = node.node;
  console.log(node);
  return (
    <CharacterContainer key={id}>
      <CharacterTitle>{name}</CharacterTitle>
      <div>
        <CharacterLabel>Height</CharacterLabel>
        <span>{height}</span>
      </div>
      <div>
        <CharacterLabel>Mass</CharacterLabel>
        <span>{mass}</span>
      </div>
    </CharacterContainer>
  )
}

export default ({ data }) => {

  return (
    <div>
      <CharacterCount>Found {data.allRandomUser.totalCount} Characters!</CharacterCount>
      <div>
        {data.allRandomUser.edges.map((node) => renderCharacter(node))}
      </div>
    </div>
  )
}

export const query = graphql`
  query IndexQuery {
    allRandomUser {
      totalCount
      edges {
        node {
          id
          name
          height
          mass
        }
      }
    }
  }
`;
