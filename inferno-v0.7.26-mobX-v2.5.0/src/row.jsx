import Inferno from 'inferno';
import InfernoDOM from 'inferno-dom';
import Component from 'inferno-component';
import {observer} from 'mobx-inferno';

@observer
export class Row extends Component {
    constructor(props) {
        super(props);
        this.click = this.click.bind(this);
        this.del = this.del.bind(this);
    }
    click() {
        this.props.onClick(this.props.data.id);
    }
    del() {
        this.props.onDelete(this.props.data.id);
    }

    render() {
        let {styleClass, onClick, onDelete, data} = this.props;
        return (<tr className={styleClass}>
            <td className="col-md-1">{data.id}</td>
            <td className="col-md-4">
                <a onClick={this.click}>{data.label}</a>
            </td>
            <td className="col-md-1"><a onClick={this.del}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></a></td>
            <td className="col-md-6"></td>
        </tr>);
    }
}
