import React, { Component } from 'react'
import Navbar from "../Navbar";
import './Labeling.css'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Labeling extends Component {

    constructor(props) {
        super(props)

        this.state = {
            // soal : 'Kenapa perlu ada sistem zonasi? Ini jelas-jelas merugikan!',
            count : 0,
            label : null,
            loading : false,
            data : {},
            userId : '213'  // dummy, later will be fetch from firebase auth
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getData = this.getData.bind(this)
        this.handleSkipSoal = this.handleSkipSoal.bind(this)
    }

    handleClick = (e) => {
        const choice = e.target.innerHTML.toLowerCase()
        let label = ''
        if (choice == 'positif') {
            label = 1
        } else if (choice == 'negatif') {
            label = 2
        } else if (choice == 'netral') {
            label = 3
        }

        this.setState({
            label : label
        })        
    }

    handleSubmit = () => {
        this.setState({
            loading: true
        });

        const updateData = this.state.data
        const userId = this.props.auth.uid
        const label = this.state.label

        if (updateData.label_1 == null && updateData.pelabel_1 == null) {
            console.log('masuk label1');
            updateData.label_1 = label
            updateData.pelabel_1 = userId
        } else if (updateData.label_2 == null && updateData.pelabel_2 == null) {
            console.log('masuk label2');
            updateData.label_2 = label
            updateData.pelabel_2 = userId
        } else if (updateData.label_3 == null && updateData.pelabel_3 == null) {
            console.log('masuk label3');
            updateData.label_3 = label
            updateData.pelabel_3 = userId
        } else if (updateData.label_4 == null && updateData.pelabel_4 == null) {
            console.log('masuk label4');
            updateData.label_4 = label
            updateData.pelabel_4 = userId
        }

        console.log(updateData)

        axios({
            method:'post',
            url:'http://localhost:8000/labeli/update',
            data: {
                data: updateData
            }
        }).then((res) => {
            this.setState({
                loading: false,
                label: null,
                count: this.state.count + 1
            })
            this.getData()
        })
    }
    
    handleSkipSoal = (e) => {
        e.preventDefault()
        this.getData()
    }

    getData = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/labeli/dataset',
            data: {
                userId: this.props.auth.uid   // dummy userId, later will get from firebase auth
            }
        }).then((res) => {
            console.log(res.data.value[0])
            this.setState({
                data: res.data.value[0]
            })            
        })
    }

    componentDidMount() {
        this.getData()
    }

    render() {

        const {data, count, label, loading} = this.state
        const { auth } = this.props

        if (!auth.uid) {
            return <Redirect to="/login"></Redirect>
        }

        return (
            <React.Fragment>                
                <div className="container">
                    <Navbar />                
                    <div className="columns">
                        <div className="column col-9 soal-layout">                            
                            <div className="card">
                                <div className="card-body">
                                    {
                                        data?
                                        <React.Fragment>
                                            <h3>{data.text}</h3>
                                            <div className="text-right">
                                                <a onClick={this.handleSkipSoal} style={{cursor: 'pointer'}}>Lewati soal</a>
                                            </div>                                    
                                            <br />                                            
                                            <div className="container">
                                                <div className="columns column-choice">
                                                    <div onClick={this.handleClick} className='column text-center col-3 c-hand choice' id={label==1 ? 'p-selected' : 'choice-positif'}>
                                                        Positif
                                                    </div>
                                                    <div onClick={this.handleClick} className='column text-center col-3 c-hand choice' id={label==2 ? 'n-selected' : 'choice-negatif'}>
                                                        Negatif
                                                    </div>
                                                    <div onClick={this.handleClick} className='column text-center col-3 c-hand choice' id={label==3 ? 'nt-selected' : 'choice-netral'}>
                                                        Netral
                                                    </div>
                                                </div>
                                                {
                                                    label != null?
                                                    <div>
                                                        <br />
                                                        <br />
                                                        <button className="p-centered btn btn-primary btn-lg column col-3 btn-submit" onClick={this.handleSubmit}>Labeli</button>                                            
                                                    </div>                                            
                                                    :
                                                    ''
                                                }
                                                {
                                                    loading ?
                                                    <div className="loading loading-lg"></div>
                                                    :
                                                    ''
                                                }
                                            </div>
                                        </React.Fragment>
                                        :
                                        <React.Fragment>
                                            <h2>Soal buatmu tidak tersedia atau mungkin sudah habis, coba lagi nanti</h2>
                                            <div>
                                                <br />
                                                <br />
                                                <Link to="/"><button className="btn btn-lg column col-3">Kembali</button></Link>
                                            </div>
                                        </React.Fragment>
                                    }
                                </div>                                
                            </div>
                        </div>
                        <div className="column col-3 counter-layout">
                        <div className="card text-center card-counter">
                            <div className="card-body h1">
                                {count}
                            </div>
                            <div className="card-footer">
                                <div className="card-title">Data dilabeli</div>
                            </div>
                        </div>
                            {/* <h2>Ini tempat counter</h2> */}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

export default connect(mapStateToProps)(Labeling)