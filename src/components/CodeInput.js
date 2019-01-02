import React from 'react';
import Cell from '../model/Cell.js';


class CodeInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            codeText: props.codeText || props.cell.code,
            label: props.cell.label
        };
        this.textAreaRef = React.createRef();

        this.handleChangeCode = this.handleChangeCode.bind(this);
        this.handleChangeLabel = this.handleChangeLabel.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    style = {
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ddd",
        //border: "1px solid",
        width: "200px",
        padding: "0px",
        boxShadow: "5px 10px 30px 1px"
    };

    submit = (e) => {this.props.handleSubmit(e, this.state.codeText, this.state.label)};

    //most mar cellankent jelenik meg, ezert ennek itt nincs jelentosege (asszem)
    componentDidUpdate(prevProps){
        console.log("codeinput updated!");
        if (prevProps.cell !== this.props.cell){
            this.textAreaRef.current.focus();
        }
    }

    componentDidMount(){
        this.textAreaRef.current.focus();
    }

    handleKeyPress(event){
        if (event.key === "Enter"){
            event.preventDefault();
            this.submit(event);
        }
    }

    handleChangeCode(event) {
        this.setState({codeText: event.target.value});
    }

    handleChangeLabel(event) {
        this.setState({label: event.target.value});
    }


    render() {
        Object.assign(this.style,{left: this.props.left, top: this.props.top});
        return (
            <div className="codeInput" style={this.style}>
            <span className="codeInputTitle">Input for cell #{this.props.cell.id} (pos: {this.props.cell.col}, {this.props.cell.row})</span>
                <div>label</div>
                <input className="codeInputLabel" value={this.state.label} onChange={this.handleChangeLabel}/>
                <div>code</div>
                <textarea ref={this.textAreaRef} id="codeInputTextArea" cols={this.props.cols} rows={this.props.rows}
                            value={this.state.codeText} onChange={this.handleChangeCode} onKeyPress={this.handleKeyPress}/>
                <button onClick={this.submit}>Input</button>
            </div>
        );
    }
}

CodeInput.defaultProps = {
    cell: new Cell(),
    cols: 50,
    rows: 2
};

export default CodeInput;