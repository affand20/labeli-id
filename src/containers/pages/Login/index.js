import React, { Component } from "react";
import './Login.css'
import {Link} from 'react-router-dom'

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email : '',
            password : '',
            btnType : 'disabled'
        }

        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        
    }

    handleTextChange = (elem) => {
        // console.log(elem.target.id, elem.target.value);         
        
        this.setState({
            [elem.target.id] : elem.target.value,            
        })                
    }

    handleSubmit = () => {
        
    }

    render() {
        const {email, password} = this.state
        const enable = email.length > 0 && password.length > 0

        return (
            <div className="container">
                <br />
                <br />                
                <div className='columns'>
                    <div className="column col-md-4"></div>
                    <div className="column col-md-4 col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="card-title h5">Masuk</div>
                                
                            </div>                                                        
                            <div className="card-body">
                                {/* {this.props.page=="register" ? <Input label='Nama Lengkap' id='nama'/> : ""}                     */}
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
                                {/* {this.props.page=="register" ? <Input label='Konfirmasi Password' id='konfirm-password'/> : ""}                     */}
                                <button disabled={!enable} onClick={this.handleSubmit} className={`btn btn-primary ${this.state.btnType==='loading' ? 'loading' : ''}`}>Selanjutnya</button>
                            </div>
                            <br />
                            <div className="divider text-center" data-content="atau"></div>
                            <br />
                            <div className="card-footer">
                                <a href="#" className="google-button text-center">
                                    <img alt="Google-icons" src="https://img.icons8.com/color/48/000000/google-logo.png"/>
                                    <span>Masuk dengan Google</span>
                                </a>
                                <p className="belum-punya-akun">Belum punya akun? <Link to="/register">Daftar disni</Link></p>
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

export default Login;