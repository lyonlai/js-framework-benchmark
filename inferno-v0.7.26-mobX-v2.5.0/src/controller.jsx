'use strict';

import Inferno from 'inferno'
import Component from 'inferno-component'
import {observer} from 'mobx-inferno';
import {Row} from './row';


var startTime;
var lastMeasure;
var startMeasure = function(name) {
    performance.mark('mark_start_'+name);
    startTime = performance.now();
    lastMeasure = name;
}
var stopMeasure = function() {
    var last = lastMeasure;
    if (lastMeasure) {
        window.setTimeout(function () {
            lastMeasure = null;
            var stop = performance.now();
            var duration = 0;
            performance.mark('mark_end_' + last);
            window.performance.measure('measure_' + last, 'mark_start_' + last, 'mark_end_' + last);
            var items = performance.getEntriesByType('measure');
            for (var i = 0; i < items.length; ++i) {
                var req = items[i];
                duration = req.duration;
                console.log(req.name + ' took ' + req.duration + 'ms');
            }
            performance.clearMeasures();
        }, 0);
    }
}

@observer
export class Controller extends Component{
    constructor(props) {
        super(props);
        this.select = this.select.bind(this);
        this.delete = this.delete.bind(this);
        this.add = this.add.bind(this);
        this.run = this.run.bind(this);
        this.update = this.update.bind(this);
        this.runLots = this.runLots.bind(this);
        this.clear = this.clear.bind(this);
        this.swapRows = this.swapRows.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.start = 0;
    }
    printDuration() {
        stopMeasure();
    }
    componentDidUpdate() {
        this.printDuration();
    }
    componentDidMount() {
        this.printDuration();
    }
    run() {
        startMeasure("run");
        this.props.store.run();
    }
    add() {
        startMeasure("add");
        this.props.store.add();
    }
    update() {
        startMeasure("updater");
        this.props.store.update();
        stopMeasure();
    }
    select(id) {
        startMeasure("select");
        this.props.store.select(id);
    }
    delete(id) {
        startMeasure("delete");
        this.props.store.delete(id);
    }
    runLots() {
        startMeasure("runLots");
        this.props.store.runLots();
    }
    clear() {
        startMeasure("clear");
        this.props.store.clear();
    }
    swapRows() {
        startMeasure("swapRows");
        this.props.store.swapRows();
    }
    render () {
        var rows = this.props.store.data.map((d,i) => {
            var className = d.id === this.props.store.selected ? 'danger':'';
            return <Row key={d.id} data={d} onClick={this.select} onDelete={this.delete} styleClass={className}></Row>
        });
        return (<div className="container">
            <div className="jumbotron">
                <div className="row">
                    <div className="col-md-6">
                        <h1>Inferno v0.7.26 with MobX v2.5.0</h1>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="run" onClick={this.run}>Create 1,000 rows</button>
                            </div>
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="runlots" onClick={this.runLots}>Create 10,000 rows</button>
                            </div>
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="add" onClick={this.add}>Append 1,000 rows</button>
                            </div>
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="update" onClick={this.update}>Update every 10th row</button>
                            </div>
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="clear" onClick={this.clear}>Clear</button>
                            </div>
                            <div className="col-sm-6 smallpad">
                                <button type="button" className="btn btn-primary btn-block" id="swaprows" onClick={this.swapRows}>Swap Rows</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table className="table table-hover table-striped test-data">
                <tbody>{rows}</tbody>
            </table>
            <span className="preloadicon glyphicon glyphicon-remove" aria-hidden="true"></span>
        </div>);
 }
}
