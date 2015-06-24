'use strict';
var React = require('react');

var Util = require('./util');
var Layout = require('./layout');
var Depot = require('./depot');

var Carousel = React.createClass({
    getInitialState: function () {
        return {
            images: this.props.images,
            figures: Layout[this.props.layout].figures(this.props.width, this.props.images, 0),
            rotationY: 0
        };
    },
    componentWillMount: function () {
        this.depot = Depot(this.getInitialState(), this.props, this.setState.bind(this));
        this.onRotate = this.depot.onRotate.bind(this);
    },
    componentWillReceiveProps: function (nextProps) {
        this.depot.onNextProps(nextProps);
    },
    render: function () {
        var angle = (2 * Math.PI) / this.state.figures.length;
        var translateZ = -Layout[this.props.layout].distance(this.props.width,
            this.state.figures.length);
        var figures = this.state.figures.map(function (d, i) {
            return (<figure key={i} style={Util.figureStyle(d)}>
                <img src={d.image} alt={i} height={"100%"} width={"100%"}></img>
            </figure>);
        });
        return (
            <section className='react-3d-carousel'>
                <div className='carousel'
                     style={{transform: "translateZ("+translateZ+"px)"}}>
                    {figures}
                </div>
                <div className='prev' onClick={Util.partial(this.onRotate,+angle)}></div>
                <div className='next' onClick={Util.partial(this.onRotate,-angle)}></div>
            </section>
        );
    }
});
module.exports = Carousel;