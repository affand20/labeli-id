import React, { Component } from 'react'
import Navbar from '../Navbar'
import './Datasetku.css'
import List from '../List'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class Datasetku extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            items : [],            
        }
    }

    render() {        
        const { datasets, auth } = this.props        

        if (!auth.uid) {
            return <Redirect to="/login"></Redirect>
        }

        return (
            <React.Fragment>
                <div className="container">
                    <Navbar />
                    <div className="columns">
                        <div className="column col-12 dataset-layout">
                            <div className="card">                                
                                <div className="card-body">
                                    <h2 className="header-text">Dataset Tersedia</h2>
                                    <br />
                                    {
                                        datasets ?
                                        <List items={datasets} />
                                        :
                                        <div className="loading loading-lg"></div>
                                    }
                                    
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        datasets: state.firestore.ordered.datasets,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'datasets' }
    ])
)(Datasetku)