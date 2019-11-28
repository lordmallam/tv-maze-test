import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectShow, getShows, getWatchlist, removeShow, addShow } from '../redux/shows'
import Card from '../components/card'
import Pagination from '../components/pagination'
import Header from '../components/header'


class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            pageSize: 15,
            pages: []
        }
    }

    componentDidMount() {
        this.props.getShows()
        this.props.selectShow(null)
        if (!this.props.watchlist.length) {
            this.props.getWatchlist()
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.showList !== this.props.showList) {
            let temp = []
            const tempPages = []
            for (let i = 0; i < this.props.showList.length; i++) {
                temp.push(this.props.showList[i])
                if ((i+1)%this.state.pageSize === 0 || i === this.props.showList.length - 1) {
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
                            <Card show={show} key={show.id} onShowClick={this.onShowClicked.bind(this)} toggleWatchlist={this.toggleWatchlist.bind(this)}
                                inWatchlist={this.props.watchlist.find(el => el.show_id == show.id) !== undefined}
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
    showList: shows.showList,
    watchlist: shows.watchList
})

export default connect(mapStateToProps, { selectShow, getShows, getWatchlist, removeShow, addShow })(Home)