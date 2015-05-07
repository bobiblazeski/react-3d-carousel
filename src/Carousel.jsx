/** @jsx React.DOM */
'use strict';
var React = require('react');

var Util = require('./util');
var Layout = require('./layout');
var Images = require('../example/src/images');
var Depot = require('./depot');
var creator = Util.carousel;// Util.classic;
var Carousel = React.createClass({
    getInitialState: function () {
        return {
            sides: this.props.sides,
            figures: Layout[this.props.layout].figures(this.props.width, this.props.sides, 0),
            rotationY: 0
        };
    },
    componentWillMount: function () {
        this.depot = Depot(this.getInitialState(), this.props, function (state) {
            this.setState(state);
        }.bind(this));
        this.onMove = function onMove(angle) {
            this.depot.onRotate(angle);
        }.bind(this);
    },
    componentWillReceiveProps: function (nextProps) {
        this.depot.onNextProps(nextProps);
    },
    render: function () {
        var angle = (2 * Math.PI) / this.state.figures.length;
        var cStyle = Util.carouselStyle(Layout[this.props.layout].distance(this.props.width,
            this.state.figures.length));
        var figures = this.state.figures.map(function (d, i) {
            return (<figure key={i} style={Util.figureStyle(d)}>
                <img src={Images[i]} alt={i} height={"100%"} width={"100%"}></img>
            </figure>);
        });
        return (
            <section className='container'>
                <div id='carousel' style={cStyle}>
                    {figures}
                </div>
                <div className='prev' onClick={Util.partial(this.onMove, angle)}></div>
                <div className='next' onClick={Util.partial(this.onMove,-angle)}></div>
            </section>
        );
    }
});
module.exports = Carousel;