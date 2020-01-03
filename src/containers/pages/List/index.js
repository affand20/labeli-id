import React, {Component} from 'react';
import './List.css'
import axios from 'axios'
import download from 'downloadjs'

class List extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ownerId:  '123',
            count: []
        }

        this.handleDownload = this.handleDownload.bind(this)
    }

    componentDidMount = () => {        
        const data = this.props.items
        console.log(data)

        data.forEach((item) => {
            axios({
                method: 'get',
                url: 'http://localhost:8000/labeli/dilabeli',
                data: {
                    ownerId: this.state.ownerId,
                    datasetId: item.id
                }
            }).then((res) =>{
                this.setState({
                    count: [...this.state.count, res.data.value[0].total]
                })                
            })
        })        
    }

    handleDownload = (e) => {            
        e.preventDefault()
        const id = e.target.id
        axios({
            method: 'get',
            url: 'http://localhost:8000/dataset/download',            
            params: {
                datasetId: id
            },
            responseType: 'blob'
        }).then((res) => {
            download(new Blob([res.data]), `${id}-dilabeli-id.csv`, 'text/csv')            
        })
    }


    render() {

        const { items } = this.props
        const { count } = this.state

        // console.log('render count',count)

        return (
            <React.Fragment>
                {
                    items && items.map((dataset, index) => {
                        return (
                            <div key={dataset.id} className="item-dataset tile tile-centered c-hand">                    
                                <div className="tile-content">
                                    <div className="tile-title">{dataset.file}</div>
                                    <small className="tile-subtitle text-gray">{count[index]} dilabeli · {dataset.nama}</small>
                                </div>
                                <div className="tile-action">
                                    <div className="dropdown dropdown-right">                            
                                        <button className="btn btn-link dropdown-toggle">
                                            <i className="icon icon-more-vert"></i>
                                        </button>
                                        <ul className="menu text-left">
                                            <li className="menu-item"><a href="#" onClick={this.handleDownload} id={dataset.id}>Download</a></li>                                            
                                        </ul>
                                    </div>                        
                                </div>
                            </div>
                        )
                    })
                }
                
            </React.Fragment>
        )
    }
}


export default List;