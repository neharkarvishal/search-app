import React, {Component} from 'react';
import CONST from './Constants'
import './App.css';

var reset = {
    boxSizing: 'initial',
    width: '93.8%',
    height: '90px'
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtArea: CONST.placeHolderTextBlock
        };
    }

    handleChange = (event) => {
        this.setState({txtArea: event.target.value});
    }

    handleSubmit = (event) => {

        document.getElementById("txt").value = "";
        var searchWords = document.getElementById("textbox").value.split(/\.|,|\s|-|_/);

        var wordMap = new Map();
        for (var i = 0; i < searchWords.length; i++) {
            wordMap.set(i, searchWords[i]);
        }

        var token = "\t";
        for (var value of wordMap.values()) {
            token = token.concat("|", value)
        }

        var regEx1 = new RegExp(token, "g");  // text separated by
        var regEx2 = new RegExp("N.+", "g");    // character that is not a line break
        var txtContent = document.querySelector('textarea').value.split(/\.|\cI|\n|\v|\i|\r|\0/g);

        for (var j = 0; j < txtContent.length; j++) {

            if (txtContent[j].search(regEx1) >= 0) {
                if (document.getElementById("txt").value.match(regEx2)) {
                    document.getElementById("txt").value = "";
                }
            //var l = document.getElementById("txt").value;
            document.getElementById("txt").value = document.getElementById("txt").value
                                                    .concat(" Word found on line ", (j + 1).toString(), ".\n");

            }
            if ( regEx1[1] || (document.getElementById("txt").value === "" && txtContent[j].search(regEx1) === -1)) {
                document.getElementById("txt").value = "Not found\n";
            }
        }
        console.log(regEx1);        //TODO:remove after finished debugging
        console.log(regEx1);        //TODO:remove after finished debugging
        event.preventDefault();
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <h2>Text Search</h2>
                <label>
                    <textarea value={this.state.txtArea} onChange={this.handleChange}/>
                    <div dangerouslySetInnerHTML={{__html: CONST.searchHelp}} />
                    <br />
                    <input id="textbox" type="text" onChange={this.handleChangeKey}/>
                    <br /><br /><textarea style={reset} id="txt"/>
                    <br />
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

export default App;
