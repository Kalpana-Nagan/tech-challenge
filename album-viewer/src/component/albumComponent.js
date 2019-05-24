import React, {Component} from 'react';
import Photo from './photoComponent';

export default class Album extends Component{
    constructor(props){
        super(props);
        this.state = {
            albums:[],
            selectedId:-1,
            noOfSlides: 3,
            currentIndex: 0,
            photos:[],
            selectedPhotos:[]
        };
        this.updateDimensions = this.updateDimensions.bind(this);
        this.showNext = this.showNext.bind(this);
        this.showPrev = this.showPrev.bind(this);
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/albums/')
        .then(response=>response.json())
        .then(data=>{
            this.setState({albums:data}); } );
        window.addEventListener("resize", this.updateDimensions);

        fetch('https://jsonplaceholder.typicode.com/photos/')
        .then(response=>response.json())
        .then(data=>{
            this.setState({photos:data}); } );
        this.updateDimensions();
    }

    handleClick(event){
        if (event) {
        let albumId = parseInt(event.target.value);

        let selectedPhotos = this.state.photos.filter(function(photo){
            return photo.albumId === albumId;
        });
        console.log(selectedPhotos);
        this.setState({
            selectedId:albumId, 
            selectedPhotos:selectedPhotos,
            currentIndex: 0
        });
        }
    }

    updateDimensions() {
        if (window.innerWidth < 768) {
          this.setState({ noOfSlides: 1 });
        } else if (window.innerWidth < 990) {
          this.setState({ noOfSlides: 2 });
        } else {
          this.setState({ noOfSlides: 3 });
        }
      }

    showPrev() {
        let index = this.state.currentIndex - 1;
        if (index < 0) index = this.state.selectedPhotos.length - 1;
        this.setState({ currentIndex: index });
    }

    showNext() {
        let index = this.state.currentIndex + 1;
        if (index >= this.state.selectedPhotos.length) index = 0;
        this.setState({ currentIndex: index });
    }

    render(){
        if (this.props.user) {
            let userId= parseInt(this.props.user);
            let selectedAlbums = 
            this.state.albums.filter(function(album){
                return (album.userId===userId) });
                
        return (
            <div>
            <select className="form-control" onChange={this.handleClick.bind(this)}>
            <option disabled selected>Please select</option>
                { selectedAlbums.map((album,index)=>{
                    return <option key={index} value={album.id}>{album.title}</option>}) }
            </select>
            { this.state.selectedPhotos.length>0?
            <div className="row photo">
            <div className="circle">
                <a className="prev" onClick={this.showPrev}>
                {" "}
                &#10094;
                </a>
            </div>
            {this.state.selectedPhotos.map((photo, index) => {
                if (
                index >= this.state.currentIndex &&
                index < this.state.currentIndex + this.state.noOfSlides
                )
                return <Photo key={index} data={photo} />;
            })}
            <div className="circle">
                <a className="next" onClick={this.showNext}>
                &#10095;
                </a>
            </div>
            </div>
            :""}
            </div>

            );
        }
        return "";
    }
}