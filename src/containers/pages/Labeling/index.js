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
            loadSoal: false,
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
            updateData.label_1 = label
            updateData.pelabel_1 = userId
        } else if (updateData.label_2 == null && updateData.pelabel_2 == null) {            
            updateData.label_2 = label
            updateData.pelabel_2 = userId
        } else if (updateData.label_3 == null && updateData.pelabel_3 == null) {            
            updateData.label_3 = label
            updateData.pelabel_3 = userId
        } else if (updateData.label_4 == null && updateData.pelabel_4 == null) {            
            updateData.label_4 = label
            updateData.pelabel_4 = userId
        }
        

        axios({
            method:'post',
            url:'https://labeli.himsiunair.com/labeli/update',
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
        this.setState({
            label: null
        })
        this.getData()
    }

    getData = () => {
        this.setState({
            loadSoal: true
        })
        axios({
            method: 'get',
            url: 'https://labeli.himsiunair.com/labeli/dataset',
            params: {
                userId: this.props.auth.uid   // dummy userId, later will get from firebase auth
            }
        }).then((res) => {
            console.log(res.data.value[0])
            this.setState({
                data: res.data.value[0],
                loadSoal: false
            })            
        })
    }

    componentDidMount() {
        // console.log(this.props.auth.uid)
        this.getData()
        axios({
            method: 'get',
            url: 'https://labeli.himsiunair.com/kontribusi',
            params: {
                userId: this.props.auth.uid
            }
        }).then((res) => {
            console.log(res.data.value[0])
            this.setState({
                count: res.data.value[0].kontribusi
            })
        })
    }

    // componentDidUpdate() {
        
    // }

    render() {

        const {data, count, label, loading, loadSoal} = this.state
        const { auth } = this.props

        if (!auth.uid) {
            return <Redirect to="/login"></Redirect>
        }

        return (
            <React.Fragment>                
                <div className="container">
                    <Navbar />                
                    <div className="columns">
                        <div className="column col-xl-8 col-sm-12 soal-layout">                            
                            <div className="card">
                                <div className="card-body">
                                    {
                                        data?
                                        <React.Fragment>
                                            {
                                                loadSoal ?
                                                <div className="loading loading-lg"></div>
                                                :
                                                <h3 className="soal-text">{data.text}</h3>
                                            }                                            
                                            <div className="text-right">
                                                <a onClick={this.handleSkipSoal} style={{cursor: 'pointer'}}>Lewati soal</a>
                                            </div>                                    
                                            <br />                                            
                                            <div className="container">
                                                <div className="columns column-choice">
                                                    <div onClick={this.handleClick} className='column text-center col-xl-3 col-sm-12 c-hand choice' id={label==1 ? 'p-selected' : 'choice-positif'}>
                                                        Positif
                                                    </div>
                                                    <div onClick={this.handleClick} className='column text-center col-xl-3 col-sm-12 c-hand choice' id={label==2 ? 'n-selected' : 'choice-negatif'}>
                                                        Negatif
                                                    </div>
                                                    <div onClick={this.handleClick} className='column text-center col-xl-3 col-sm-12 c-hand choice' id={label==3 ? 'nt-selected' : 'choice-netral'}>
                                                        Netral
                                                    </div>
                                                </div>
                                                {
                                                    label != null?
                                                    <div>
                                                        <br />
                                                        <br />
                                                        <button className="p-centered btn btn-primary btn-lg column col-xl-3 col-sm-12 btn-submit" onClick={this.handleSubmit}>Labeli</button>                                            
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
                        <div className="column col-xl-4 col-sm-12 counter-layout">
                            <div className="card text-center card-counter">
                                <div className="card-body h1">
                                    {count}
                                </div>
                                <div className="card-footer">
                                    <div className="card-title">Data dilabeli</div>
                                </div>
                            </div>
                            <br />
                            <div className="card card-counter">
                                <div className="card-header">
                                    <h5>Petunjuk</h5>
                                </div>
                                <div className="card-body">
                                    Pilih label <span className="text-success"><b>Positif</b></span> jika soal mengandung pendapat positif,
                                    setuju, atau dukungan. <span className="text-error"><b>Negatif</b></span> jika mengandung pendapat 
                                    negatif, tidak setuju, atau penolakan. Dan <span className="text-dark"><b>Netral</b></span> jika tidak
                                    sesuai dengan kriteria negatif atau positif, objek bahasan tidak sesuai, atau hanya sekedar info.
                                    {/* <ol>
                                        <li>
                                            Pilih label <span className="text-success">Positif</span> apabila soal mengandung
                                            pendapat positif, pernyataan setuju, atau dukungan.
                                        </li>
                                        <li>
                                            Pilih label <span className="text-error">Negatif</span> apabila soal mengandung
                                            pendapat negatif, pernyataan tidak setuju, protes, atau penolakan.
                                        </li>
                                        <li>
                                            Pilih label <span className="text-dark">Netral</span> apabila soal tidak mengandung kriteria
                                            label negatif maupun positif diatas, diluar konteks objek pembahasan, promosi, atau info.
                                        </li>
                                    </ol>                                     */}
                                </div>
                                {/* <div className="card-footer">
                                    <div className="card-title">Data dilabeli</div>
                                </div> */}
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