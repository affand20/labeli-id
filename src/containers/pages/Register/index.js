import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { register } from '../../../store/actions/authActions'

class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nama : '',
            email : '',
            password : '',
            confirm_password : '',
            btnType : 'disabled',            
        }

        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }

    handleTextChange = (elem) => {            
        this.setState({
            [elem.target.id] : elem.target.value,            
        })                
    }

    handleSubmit = () => {
        this.props.signUp(this.state)
    }

    render() {
        const {nama, email, password, confirm_password} = this.state
        const enable = nama.length > 0 && email.length > 0 && password.length > 0 && confirm_password.length > 0 && password===confirm_password
        const unmatchPassword = password!==confirm_password
        const {isLoading, auth, authError} = this.props

        if (auth.uid) {
            return <Redirect to="/"></Redirect>
        }

        return (
            <div className="container">
                <br />
                <br />                
                <div className='columns'>
                    <div className="column col-md-4"></div>
                    <div className="column col-md-4 col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title h5">Daftar</div>
                                
                            </div>                                                        
                            <div className="card-body">                                
                                <div className="form-group">
                                    <label className="form-label" htmlFor="nama-lengkap">Nama Lengkap</label>
                                    <input className="form-input" onChange={this.handleTextChange} type="text" id="nama" placeholder="" />
                                    {/* <p className="form-input-hint">{this.state.hint}</p> */}
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <input className="form-input" onChange={this.handleTextChange} type="text" id="email" placeholder="" />
                                    {/* <p className="form-input-hint">{this.state.hint}</p> */}
                                </div>
                                <div className="form-group">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input className="form-input" onChange={this.handleTextChange} type="password" id="password" placeholder="" />
                                    {/* <p className="form-input-hint">{this.state.hint}</p> */}
                                </div>
                                <div className={`form-group ${unmatchPassword ? 'has-error' : ''}`}>
                                    <label className="form-label" htmlFor="konfirmasi-password">Konfirmasi Password</label>
                                    <input className="form-input" onChange={this.handleTextChange} type="password" id="confirm_password" placeholder="" />
                                    { unmatchPassword ? <p className="form-input-hint">Password tidak cocok!</p> : '' }                                    
                                </div>
                                <br />
                                <button disabled={!enable} onClick={this.handleSubmit} className={`btn btn-primary ${this.state.btnType==='loading' ? 'loading' : ''}`}>Daftar</button>
                                {
                                    authError?
                                    <small className="text-error">{authError}</small>
                                    :
                                    null
                                }
                            </div>
                            {/* <br />
                            <div className="divider text-center" data-content="atau"></div>
                            <br /> */}
                            <div className="card-footer">
                                {/* <a href="#" className="google-button text-center">
                                    <img alt="Google-icons" src="https://img.icons8.com/color/48/000000/google-logo.png"/>
                                    <span>Daftar dengan Google</span>
                                </a> */}
                                <p className="belum-punya-akun">Sudah punya akun? <a href="/login">Masuk disni</a></p>
                                {
                                    isLoading ?
                                    <div className="loading loading-lg"></div>
                                    :
                                    null
                                }    
                            </div>
                        </div>
                    </div>
                    <div className="column col-md-4"></div>
                </div>
                <br />
                <br />
            </div>            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        isLoading: state.auth.isLoading,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(register(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);