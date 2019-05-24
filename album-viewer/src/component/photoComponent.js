import React, {Component} from 'react';

export default class Photo extends Component {
    constructor(props){
        super(props);
        
    }


    render() {
        return <div className="card">
            <div className="card-body">
            <h6 className="card-title">{this.props.data.title}</h6>
            <div className="row card-content">
                <img src = {this.props.data.thumbnailUrl} />
            </div>
            </div>
        </div>
    }
}