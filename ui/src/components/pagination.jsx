import React from 'react'
import styled from 'styled-components'

const Pageination = props => {
    const links = []
    for (let i = 1; i <= props.pages; i++) {
        links.push(
            <PageLink onClick={() => props.onChangePage(i)} key={`page-${i}`} style={props.currentPage === i ? { backgroundColor: 'rgba(255, 0,0,1)'} : {}}>{i}</PageLink>
        )
    }
    return (

        <Paginate>
            {links}
        </Paginate>
    )
}

const PageLink = styled.span`
    width: 30px;
    height: 30px;
    background-color: #151515;
    padding: 5px;
    color: #fff;
    margin-right: 5px;
    margin-top: 5px;
    cursor: pointer;
    display: inline-block;
    &:hover {
        background-color: rgba(170, 0,0,0.5);
    }
`

const Paginate = styled.div`
    padding: 20px 10px 100px 10px;
`

export default Pageination