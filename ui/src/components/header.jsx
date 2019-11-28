import React from 'react'
import styled from 'styled-components'


const Header = props => {
    let q = React.createRef()
    const onSearch = (e, history) => {
        if (q.current.value) {
            history.push(`/search/${q.current.value}`)
        } else {
            e.preventDefault()
        }
    }
    return (
        <HeaderDiv>
            <div className='container' style={{textAlign: 'left'}}>
                <MenuItem onClick={() => props.history.push('/')}>Home</MenuItem>
                <MenuItem onClick={() => props.history.push('/watchlist')}>
                    My Watchlist
                    {
                        props.watchlistCount !== 0 && <WatchlistCount>{props.watchlistCount}</WatchlistCount>
                    }
                </MenuItem>
                <form onSubmit={e => onSearch(e, props.history)} style={{ display: 'inline'}}>
                    <SearchButton type='submit'><i className='fas fa-search'></i></SearchButton>
                    <Search placeholder='Search...' ref={q}/>
                </form>
            </div>
        </HeaderDiv>
    )
}

const HeaderDiv = styled.div`
    background-color: #000;
    height: auto;
    display: block;
`

const MenuItem = styled.span`
    color: #fff;
    font-family: Open Sans;
    font-weight: ligth;
    padding: 10px 15px;
    cursor: pointer;
    display: inline-block;
    &:hover {
        background-color: rgba(255, 0, 0, 1)
    }
`

const WatchlistCount = styled.span`
    background-color: rgb(255, 0, 0);
    color: #fff;
    border-radius: 10px;
    padding: 5px 10px;
    font-size: 0.6em
    margin-left: 5px;
`

const Search = styled.input`
    border: 1px solid #000;
    padding: 7px 16px;
    font-size: 0.8em;
    width: 30%;
    margin-left: 15px;
    margin-top: 5px;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    float: right;
    &:focus{
        outline: none;
    }
`

const SearchButton = styled.button`
    background-color: rgb(255, 0, 0);
    padding: 5px 16px;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    color: #fff;
    border: none;
    margin-top: 5px;
    float: right;
    &:focus{
        outline: none;
    }
`

export default Header