import React from 'react'
import styled from 'styled-components'

const Card = props => {
    const show = props.show || {}
    const img = (show.image && show.image.medium) || ''
    const inWatchlist = props.inWatchlist || false
    return (
        <CardDiv onClick={() => props.onShowClick(show)}>
            <Rate>{(show.rating && show.rating.average) || '-'}</Rate>
            <Heart><i className='fas fa-heart' style={{cursor: 'pointer', color: `${inWatchlist ? 'rgb(255,0,0)' : '#fff'}`}} title='Add to Watchlist'
                            onClick={e => props.toggleWatchlist(e, inWatchlist, show)}></i></Heart>
            <div style={{ backgroundImage: `url(${img})`, height: '170px'}} />
            <LowerDiv>
                <div><span>{show.name}</span></div>
                <div>
                    {show.genres.map(genre => (
                        <Genre key={`${genre}-${show.id}`}>{genre}</Genre>
                    ))}
                </div>
            </LowerDiv>
        </CardDiv>
    )
}

const CardDiv = styled.div`
    width: calc(20% - 20px);
    height: 250px;
    margin: 10px;
    background-color: black;
    float: left;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    &:hover{
        background-color: rgba(255, 0, 0, 1);
    }
`

const LowerDiv = styled.div`
    height: 90px;
    margin-top: -10px;
    background-color: rgba(0,0,0, 0.5);
    padding: 20px 10px 10px;
    color: #fff;
    font-family: Open Sans;
    font-weigth: ligth;
`
const Genre = styled.span`
    margin-right: 5px;
    font-size: 0.6em;
`

const Heart = styled.div`
    position: absolute;
    right: 10px;
    top: 5px;
    width: 30px;
    height: 50px;
    font-size: 1.5em;
    color: white;
`

const Rate = styled.div`
    position: absolute;
    left: 10px;
    top: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgba(255, 0,0 ,0.8);
    font-size: 0.7em;
    color: white;
    font-weight: bold;
    padding-top: 6px;
`

export default Card