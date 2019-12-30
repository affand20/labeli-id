import React, { Component } from 'react'
import Navbar from "../Navbar";
import './Labeling.css'

class Labeling extends Component {

    constructor(props) {
        super(props)

        this.state = {
            soal : 'Kenapa perlu ada sistem zonasi? Ini jelas-jelas merugikan!',
            count : 0,
            label : ''
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = (e) => {
        this.setState({
            label : e.target.innerHTML.toLowerCase()
        })        
    }

    render() {

        const {soal, count, label} = this.state

        return (
            <React.Fragment>                
                <div className="container">
                    <Navbar />                
                    <div className="columns">
                        <div className="column col-9 soal-layout">                            
                            <div className="card">                                
                                <div className="card-body">
                                    <h2>{soal}</h2>
                                    <br />
                                    <br />
                                    <div className="container">
                                        <div className="columns column-choice">
                                            <div onClick={this.handleClick} className='column text-center col-3 c-hand choice' id={label=='positif' ? 'p-selected' : 'choice-positif'}>
                                                Positif
                                            </div>
                                            <div onClick={this.handleClick} className='column text-center col-3 c-hand choice' id={label=='negatif' ? 'n-selected' : 'choice-negatif'}>
                                                Negatif
                                            </div>
                                            <div onClick={this.handleClick} className='column text-center col-3 c-hand choice' id={label=='netral' ? 'nt-selected' : 'choice-netral'}>
                                                Netral
                                            </div>
                                        </div>
                                        {
                                            label.length > 0 ?
                                            <div>
                                                <br />
                                                <br />
                                                <button className="p-centered btn btn-primary btn-lg column col-3 btn-submit">Labeli</button>                                            
                                            </div>                                            
                                            :
                                            ''
                                        }
                                    </div>
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

export default Labeling