import React from "react";

const posibleCombination = {
    0: [1, 2, 3],
    1: [1, 5, 6],
    2: [7, 8, 6],
    3: [3, 5, 7],
    4: [2, 5, 8],
    5: [1, 5, 9]
}
export default class RenderBox extends React.Component{
    constructor(){
        super();
        this.state = {
            arr: [1, 2, 3, 4, 5, 6 ,7, 8, 9],
            playere1: {enteredValue:[], chance: true },
            playere2: {enteredValue:[], chance: false },
            palyerWin: ''
        }
    }
    _handleChance = (number) => {
        let {playere1, playere2} = this.state;
        if(playere1.chance){
            playere1.enteredValue.push(number)
            playere1.chance = false;
            playere2.chance = true;
            this.setState({
                playere1,
                playere2,
                palyerWin:  this._checkWinOrNot(playere1.enteredValue.sort(), "X") ?  "player X Win"  : ""
                
            })
        }else if(playere2.chance){
            playere2.enteredValue.push(number)
            playere2.chance = false;
            playere1.chance = true;
            this.setState({
                playere1,
                playere2,
                palyerWin:  this._checkWinOrNot(playere2.enteredValue.sort(), "O") ?  "player O Win"  : ""
            })
        }
      
    }
    _checkWinOrNot = (enteredValue, player) => {
        let isWin = true;
        const allKeys = Object.keys(posibleCombination);
        for( let i = 0 ; i < allKeys.length ; i ++){
            const temp = posibleCombination[i];
            let isValid = false
            for(let j = 0 ; j < temp.length ; j++){
                if(enteredValue.includes(temp[j])){
                    if(j === temp.length - 1) {
                        isValid = true;
                        isWin = true
                    };
                    continue;
                } else{

                    isWin = false
                    break;
                }
            }
            if(isValid) break;
        }

        return isWin
    }
    _handleTerm = (unit) => {
        const { playere1, playere2 } = this.state;
        if(playere1.enteredValue.includes(unit)){
            return "X";
        } else  if(playere2.enteredValue.includes(unit)){
            return "O"
        }
        return null;
    }
    _renderBox = () => {
        const { arr } = this.state;
        return arr && arr.map((unit) => {
            return (
            <div className={"box"} onClick={() => this._handleChance(unit)}>   
                <div>{this._handleTerm(unit)}</div>
            </div>
            )
        })
    }
    render(){
        const { playere1, playere2 } = this.state
        return(
            <div>
                <div>{this.state.playere1.chance ? "Player X Chance": "Player O Chance" }</div>
                <div className={"mainBox"} style={{pointerEvents: this.state.palyerWin ? "none" : "auto"}}>
                    {this._renderBox()}
                </div>
                <div>{this.state.palyerWin}</div>
                {
                    playere1.enteredValue.length + playere2.enteredValue.length === 9 && !this.state.palyerWin ? <div>No Result</div> : null
                }
            </div>
        )
    }
}