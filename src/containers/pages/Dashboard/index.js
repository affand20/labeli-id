import React, { Component } from 'react'
import './Dashboard.css'
import Logo from './../../../assets/img/logo/logo.svg'
import {Link} from 'react-router-dom'
import { uploadDataset } from '../../../store/actions/datasetAction'
import { connect } from 'react-redux'
import axios from 'axios'


class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username : 'Affandy Fahrizain',            
            file : null,            
        }

        this.handleUpload = this.handleUpload.bind(this)
    }

    handleFileChange = (e) => {        
        this.setState({
            file : e.target.files[0]
        })        
    }

    handleUpload = (e) => {
        this.setState({
            isUpload : true,
            status : 'uploading'
        })
        this.props.uploadDataset(this.state.file)
    }

    resetState = () => {
        this.setState({
            file: null
        })        
    }

    // componentDidMount = () => {
    //     console.log('triggered')
    //     axios({
    //         method: 'get',
    //         url: 'http://localhost:8000/labeli/dilabeli',
    //         data: {
    //             ownerId: '123',
    //             datasetId: 'Wfyo72LAUFnDm04TGEKI'
    //         }
    //     }).then((res) => {
    //         console.log(res.data.value[0].total)
    //     })
    // }

    render() {

        const { username, file } = this.state
        const { isUploadProps, statusProps } = this.props
        console.log('state', this.state)

        return (
            <div className="container">                
                <div className="hero">
                    <div className="hero-body columns">
                        <div className="column col-9">
                            <h1>Selamat datang di <span className="text-bold mr-2 brand">labeli</span></h1>
                            <p>This is a hero example</p>
                        </div>
                        <div className="column col-3 text-right">    
                            <figure className="avatar avatar-lg" data-initial="AF" style={{ backgroundColor: '#5755d9' }}></figure>                    
                            <div className="dropdown dropdown-right">                            
                                <a className="btn text-dark btn-link dropdown-toggle" tabIndex="0">                                
                                    {username} <i className="icon icon-caret"></i>
                                </a>                                
                                <ul className="menu text-left">
                                    <li className="menu-item"><Link to="/logout">Keluar</Link></li>                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>                                
                
                <div className="columns">                    
                    <div className="col-10 col-mx-auto columns column">
                        <div className="column col-4">                            
                            <a href="/labeli" className="card dashboard-card text-dark">                                
                                <div className="card-image">
                                    <img src={Logo} className="img-responsive" />
                                </div>
                                <div className="card-header">
                                    <div className="card-title dashboard-card-title h5">Mulai Melabeli</div>                                    
                                </div>
                            </a>                            
                        </div>
                        <div className="column col-4">                            
                            <a className="card dashboard-card text-dark" onClick={this.resetState} href="#modal-upload-dataset">
                                <div className="card-image">
                                    <img src={Logo} className="img-responsive" />
                                </div>
                                <div className="card-header">
                                    <div className="card-title dashboard-card-title h5">Upload Dataset Baru</div>
                                </div>
                            </a>
                            <div className="modal" id="modal-upload-dataset">
                                <a href="#close" className="modal-overlay" aria-label="Close"></a>
                                <div className="modal-container">
                                    <div className="modal-header">
                                        <a href="#close" className="btn btn-clear float-right" aria-label="Close"></a>
                                        <div className="modal-title h5">Upload Dataset</div>
                                        <small className="">Pastikan file csv kamu mempunyai row 'text'</small>
                                    </div>
                                    <div className="modal-body">
                                        <div className="content">
                                            <input className="form-input" onChange={this.handleFileChange} id="input-dataset" type="file" accept=".csv" />
                                        </div>
                                    </div>
                                    <div className="modal-footer text-center">
                                        {
                                            isUploadProps ?
                                            <React.Fragment>
                                                <progress className="progress" max="100"></progress>
                                                <br />
                                                <small className="text-primary">Mengupload...</small>
                                            </React.Fragment>
                                            :
                                            statusProps == 'success'?
                                                <small className="text-success">Datasetmu berhasil diupload</small>
                                                // <button className="btn disabled btn-primary">Datasetmu berhasil diupload</button>
                                            :
                                            statusProps == 'failed' ?
                                            <React.Fragment>
                                                <small className="text-error">Datasetmu gagal diupload</small>
                                                <button className="btn btn-primary" onClick={this.handleUpload} >Coba Lagi</button>
                                            </React.Fragment>
                                            :
                                            file === null ?
                                                <button className="btn disabled btn-primary">Upload</button>
                                            :
                                                <button className="btn btn-primary" onClick={this.handleUpload} >Upload</button>
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column col-4">                            
                            <a className="card dashboard-card text-dark" href="/datasetku">
                                <div className="card-image">
                                    <img src={Logo} className="img-responsive" />
                                </div>
                                <div className="card-header">
                                    <div className="card-title dashboard-card-title h5">Dataset Saya</div>
                                </div>
                            </a>                            
                        </div>
                    </div>                    
                </div>
                <br />
                <br />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {        
        uploadDataset: (dataset) => dispatch(uploadDataset(dataset)),
    }
}

const mapStateToProps = (state) => {
    console.log('mapStateToProps', state)
    return {
        statusProps: state.dataset.status,
        isUploadProps: state.dataset.isUpload
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)