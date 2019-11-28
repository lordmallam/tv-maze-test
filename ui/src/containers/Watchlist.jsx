import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getWatchlist, removeShow, selectShow } from '../redux/shows'
import Header from '../components/header'
import styled from 'styled-components'
import WishListCard from '../components/watchlistCard'


class WatchList extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getWatchlist()
    }

    onWishListClick = (w) => {
        this.props.selectShow(null)
        this.props.history.push(`/${w.show_id}`)
    }

    removeWc (e, wc) {
        this.props.removeShow(wc)
        e.stopPropagation()
    }

    render() {
        return (
            <div className='App' style={styles.background}>
                <Header history={this.props.history} watchlistCount={this.props.watchlist.length}/>
                <div className='container'>
                    <h4 style={{ color: '#fff', textAlign: 'left', margin: '40px 20px'}}>Watchlist</h4>
                    <div>
                    {
                        this.props.watchlist.map(wc => (
                            <WishListCard key={wc.id} wc={wc} remove={this.removeWc.bind(this)} onWishListClick={this.onWishListClick}/>
                        ))
                    }
                    </div>
                    <div style={styles.clear}></div>
                </div>
            </div>
        )
    }
}

const styles = {
    background: {
        backgroundColor: '#424242',
        paddingBottom: '100px',
        minHeight: '800px'
    },
    clear: {
        clear: 'both'
    }
}

const mapStateToProps = ({ shows }) => ({
    watchlist: shows.watchList
})

export default connect(mapStateToProps, { getWatchlist, removeShow, selectShow })(WatchList)
