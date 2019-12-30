import React, {Component} from 'react';
import './List.css'

const List = ({ items }) => {
    return (
        <React.Fragment>
            {
                items && items.map(dataset => {
                    return (
                        <div key={dataset.id} className="item-dataset tile tile-centered c-hand">                    
                            <div className="tile-content">
                                <div className="tile-title">{dataset.file}</div>
                                {/* <small className="tile-subtitle text-gray">14MB · Public · 1 Jan, 2017</small> */}
                            </div>
                            <div className="tile-action">
                                <div className="dropdown dropdown-right">                            
                                    <button className="btn btn-link dropdown-toggle">
                                        <i className="icon icon-more-vert"></i>
                                    </button>
                                    <ul className="menu text-left">
                                        <li className="menu-item"><a href="#">Download</a></li>                                    
                                        <li className="menu-item"><a href="#">Hapus</a></li>                                                                    
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


export default List;