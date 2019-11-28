import React from 'react'
import styled from 'styled-components'

const WatchListCard = props => {
let desc = props.wc.description.substr(0, 80)
desc = `${desc.substr(0, Math.min(desc.length, desc.lastIndexOf(" ")))} ...`
    return (
        <WatchListItem onClick={() => props.onWishListClick(props.wc)}>
            <div className='row'>
                <div className='col-md-3' style={{backgroundImage: `url(${props.wc.image || ''})`, backgroundColor: '#000', backgroundSize: 'cover'}}>
                </div>
                <div className='col-md-7' style={{backgroundColor: '#171717', padding: '10px'}}>
                    <p>{props.wc.name}</p>
                    <div dangerouslySetInnerHTML={{ __html: desc }} style={{ fontSize: '0.8em'}}/>
                    <div>
                        <Label>Network:</Label>
                        <span>{props.wc.network}</span>
                    </div>
                    <div>
                        <Label>Schedule:</Label>
                        <span>{props.wc.schedule}</span>
                    </div>
                </div>
                <div className='col-md-2' style={{backgroundColor: '#171717'}}>
                <Heart><i className='fas fa-heart' title='Remove from Watchlist'
                    onClick={e => props.remove(e, props.wc)}></i></Heart>
                </div>
            </div>
        </WatchListItem>
    )
}

const WatchListItem = styled.div`
    width: calc(50% - 60px);
    padding: 10px;
    margin: 0 20px;
    color: #fff;
    float: left;
    text-align: left;
    font-family: Open Sans;
`

const Heart = styled.div`
    width: 30px;
    height: 50px;
    font-size: 1.5em;
    color: rgb(255,0,0);
    cursor: pointer;
    margin-top: 20px;
`

const Label = styled.span`
    font-weight: 700;
    display: block;
    font-size: 0.8em;
    margin-top: 10px;
`

export default WatchListCard