import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getShows, selectShow, addShow, removeShow } from '../redux/shows'
import Card from '../components/card'
import Pagination from '../components/pagination'
import Header from '../components/header'


class Search extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentPage: 1,
            pageSize: 15,
            pages: []
        }
    }

    componentDidMount() {
        this.props.selectShow(null)
        if (this.props.match && this.props.match.params && this.props.match.params.q)
            this.props.getShows(this.props.match.params.q)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.shows !== this.props.shows) {
            let temp = []
            const tempPages = []
            for (let i = 0; i < this.props.shows.length; i++) {
                temp.push(this.props.shows[i])
                if ((i+1)%this.state.shows === 0 || i === this.props.shows.length - 1) {
                    tempPages.push(temp)
                    temp = []
                }
            }
            this.setState({pages: tempPages, currentPage: 1})
        }
    }

    onChangePage(page) {
        this.setState({
            currentPage: page
        })
    }

    onShowClicked = show => {
        this.props.history.push(`/${show.id}`)
    }

    toggleWatchlist (e, inWatchlist, s) {
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
        e.stopPropagation()
    }

    render() {
        const shows = this.state.pages[this.state.currentPage-1] || []
        return (
        <div className='App' style={styles.background}>
            <Header history={this.props.history} watchlistCount={this.props.watchlist.length}/>
            {
                shows.length > 0 &&
                <div className='container'>
                    {
                        shows.map(show => (
                            <Card show={show.show} key={show.show.id} onShowClick={this.onShowClicked.bind(this)} toggleWatchlist={this.toggleWatchlist.bind(this)}
                                inWatchlist={this.props.watchlist.find(el => el.show_id == show.show.id) !== undefined}
                            />
                        ))
                    }
                    <div style={styles.clear}></div>
                    <Pagination pages={this.state.pages.length} onChangePage={this.onChangePage.bind(this)} currentPage={this.state.currentPage}/>
                </div>
            }
        </div>
        )
    }
}

const styles = {
    background: {
        backgroundColor: '#424242'
    },
    clear: {
        clear: 'both'
    }
}

const mapStateToProps = ({ shows }) => ({
    shows: shows.showList,
    watchlist: shows.watchList
})

export default connect(mapStateToProps, { getShows, selectShow, addShow, removeShow })(Search)