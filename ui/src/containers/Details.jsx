import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { getShow, addShow, getWatchlist, removeShow } from '../redux/shows'
import Header from '../components/header'
import Cast from '../components/cast'


class Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeTab: 'episodes',
            inWatchlist: false
        }
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id)
            this.props.getShow(this.props.match.params.id)
        if (!this.props.watchlist.length) {
            this.props.getWatchlist()
        }
    }

    componentDidUpdate(prevProps) {
        const setlist = () => {
            const r = this.props.watchlist.find(el => el.show_id == this.props.show.id) !== undefined
            this.setState({
                inWatchlist: r
            })
        }
        if (prevProps.watchlist !== this.props.watchlist){
            if (this.props.show) {
                setlist()
            }
        }
        if (this.props.show !== prevProps.show) {
            setlist()
        }
    }

    toggleWatchlist(inWatchlist, s) {
        if (inWatchlist) {
            const wShow = this.props.watchlist.find(el => el.show_id == s.id)
            this.props.removeShow(wShow)
        } else {
            const m = {
                show_id: s.id,
                name: s.name,
                description: s.summary.substring(0, 500),
                image: s.image && s.image.medium,
                network: s.network && s.network.name,
                schedule: `${(s.schedule && s.schedule.days.length > 0 && s.schedule.days[0]) || 'Unavailable'} - ${(s.schedule && s.schedule.time) || 'Unavailable'}`
            }
            this.props.addShow(m)
        }
    }

    render() {
        const s = this.props.show
        return (
            s &&
            <div className='App' style={styles.background}>
                <Header history={this.props.history} watchlistCount={this.props.watchlist.length}/>
                <div className='container'>
                    <div className='row' style={{ marginTop: '50px', textAlign: 'left', color: '#fff', fontFamily: 'Open Sans' }}>
                        <div className='col-md-3' style={{backgroundImage: `url(${(s.image && s.image.original) || ''})`, backgroundColor: '#000', height: '400px', backgroundSize: 'cover'}}>
                            <Rate>{(s.rating && s.rating.average) || '-'}</Rate>
                            <Heart><i className='fas fa-heart' style={{cursor: 'pointer', color: `${this.state.inWatchlist ? 'rgb(255,0,0)' : '#fff'}`}} title='Add to Watchlist'
                            onClick={this.toggleWatchlist.bind(this, this.state.inWatchlist, s)}></i></Heart>
                        </div>
                        <div className='col-md-9'>
                            <h3>{s.name}</h3>
                            {
                                s.genres.map(genre => (
                                    <Genre key={`genre-${genre}`}>{genre}</Genre>
                                ))
                            }
                            <div className='row'>
                                <div className='col-md-8'>
                                    <div dangerouslySetInnerHTML={{ __html: s.summary }}/>
                                    <MenuItem
                                    onClick={() => this.setState({ activeTab: 'episodes'})}
                                    style={this.state.activeTab === 'episodes' ? { backgroundColor: '#202020'} : { backgroundColor: '#000'}}
                                    >Episodes</MenuItem>
                                    <MenuItem
                                    onClick={() => this.setState({ activeTab: 'cast'})}
                                    style={this.state.activeTab === 'cast' ? { backgroundColor: '#202020'} : { backgroundColor: '#000'}}
                                    >Cast</MenuItem>
                                    {
                                        this.state.activeTab === 'cast' ? <TabDiv>
                                            {
                                            s._embedded.cast.map(c => (
                                                <Cast actor={c} key={`${c.person.id}-${c.character.id}`}/>
                                            ))
                                            }
                                            <div style={{ clear: 'both'}}></div>
                                        </TabDiv> : <TabDiv>

                                        </TabDiv>
                                    }
                                </div>
                                <div className='col-md-4'>
                                    <InfoBox>
                                        <h5>TV Show Details</h5>
                                        <Label>Status:</Label>
                                        <span>{s.status}</span>
                                        <Label>Schedule:</Label>
                                        <span>{(s.schedule && s.schedule.days.length > 0 && s.schedule.days[0]) || 'Unavailable'} : {(s.schedule && s.schedule.time) || 'Unavailable'}</span>
                                        <Label>Type:</Label>
                                        <span>{s.type}</span>
                                        <Label>Premiered:</Label>
                                        <span>{s.premiered}</span>
                                        <Label>Network:</Label>
                                        <span>{`(${(s.network && s.network.country.code) || 'Unavailable'}) ${(s.network && s.network.name) || ''}`}</span>
                                    </InfoBox>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const Genre = styled.span`
    margin: 0 5px 20px;
    font-size: 0.9em;
    padding: 2px 10px;
    background-color: rgba(255,0,0, 0.8);
    display: inline-block;
    border-radius: 5px;
`

const Label = styled.span`
    font-weight: 700;
    display: block;
    font-size: 0.8em;
    margin-top: 10px;
`

const InfoBox = styled.div`
    padding: 15px;
    background-color: #4f4f4f;
`

const Rate = styled.div`
    position: absolute;
    left: 10px;
    top: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: rgba(255, 0,0 ,0.8);
    font-size: 1.2em;
    color: white;
    font-weight: bold;
    padding-top: 10px;
    text-align: center;
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

const TabDiv = styled.div`
    background-color: #202020;
    padding: 15px;
`

const MenuItem = styled.span`
    color: #fff;
    font-family: Open Sans;
    font-weight: ligth;
    padding: 10px 15px;
    cursor: pointer;
    display: inline-block;
    background-color: #000;
    &:hover {
        background-color: rgba(255, 0, 0, 1)
    }
`

const styles = {
    background: {
        backgroundColor: '#424242',
        paddingBottom: '100px'
    },
    clear: {
        clear: 'both'
    }
}

const mapStateToProps = ({ shows }) => ({
    show: shows.selectedShow,
    watchlist: shows.watchList
})

export default connect(mapStateToProps, {getShow, addShow, getWatchlist, removeShow})(Details)