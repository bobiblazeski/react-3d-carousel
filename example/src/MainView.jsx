var Carousel = require('react-3d-carousel');
var Ease = require('ease-functions');
var images = require('./images');

var MainView = React.createClass({
    getInitialState: function () {
        return {
            images: images.slice(0, 6),
            width: 400,
            layout: 'prism',
            ease: 'linear',
            duration: 400
        };
    },
    componentWillMount: function () {
        this.onSides = function (event) {
            this.setState( {images: images.slice(0, event.target.value) });
        }.bind(this);
        this.onLayout = function (event) {
            this.setState({layout: event.target.value});
        }.bind(this);
        this.onDuration = function (event) {
            this.setState({duration: parseInt(event.target.value) });
        }.bind(this);
        this.onEase = function (event) {
            this.setState({ease:  event.target.value});
        }.bind(this);
    },
    render: function () {
        var easeList = Object.keys(Ease).map(function (d) {
            return (<option key={d} value={d}>{d}</option>)
        });
        return (
            <div>
                <Carousel width={this.state.width}
                          images={this.state.images}
                          ease={this.state.ease}
                          duration={this.state.duration}
                          layout={this.state.layout}/>
                <table>
                    <tr>
                        <td>
                            <label htmlFor="panel-count">Panels</label>
                        </td>
                        <td>
                            <input type="range" id="panel-count"
                                   value={this.state.images.length} min="3" max="20"
                                   onChange={this.onSides}/>
                        </td>
                        <td><span>{this.state.sides}</span></td>
                    </tr>
                    <tr>
                        <td>
                            Layout
                        </td>
                        <td>
                            <select onChange={this.onLayout} value={this.state.layout}>
                                <option value="prism">prism</option>
                                <option value="classic">classic</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label htmlFor="duration">Duration</label>
                        </td>
                        <td>
                            <input type="range" id="duration"
                                   value={this.state.duration} min="0" step="250" max="1500"
                                   onChange={this.onDuration}/>
                        </td>
                        <td>
                            <span>{this.state.duration}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Ease
                        </td>
                        <td>
                            <select onChange={this.onEase} value={this.state.ease}>
                                {easeList}
                            </select>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
});

module.exports = MainView;        