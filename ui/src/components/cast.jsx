import React from 'react'
import styled from 'styled-components'

const Cast = ({ actor }) => {
    return(
        <CastContainer>
            <CastCard style={{ backgroundImage: `url(${actor.person.image.medium})`}} />
            <Character>
                <span style={{ fontSize: '0.8em', display: 'inline-block'}}>{actor.person.name}</span>
                <span style={{color: 'red', margin: '0 5px', display: 'inline-block'}}>as</span>
                <span style={{ fontWeight: 'bold', fontSize: '0.8em', display: 'inline-block', fontFamily: 'Open Sans'}}>{actor.character.name}</span>
            </Character>
        </CastContainer>
    )
}

const CastCard = styled.div`
    height: 150px;
    background-size: cover;
`

const Character = styled.div`
    height: auto;
    padding: 5px 10px;
`

const CastContainer = styled.div`
    width: calc(33.3% - 10px);
    min-height: 250px;
    margin: 5px;
    background-color: black;
    float: left;
    cursor: pointer;
    position: relative;
`

export default Cast