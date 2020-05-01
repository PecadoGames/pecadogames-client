import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";
import Picture from "./GameInfos/Picture";

import EndGameState from "./States/EndGameState";
import EnterGuessState from "./States/EnterGuessState";
import EnterCluesState from "./States/EnterCluesState";
import PickWordState from "./States/PickWordState";
import TransitionState from "./States/TransitionState";
import VoteOnClueState from "./States/VoteOnClueState";



const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 800px;
  width: 1200px;
  align-items: flex-start; 
  color: white;
  margin: auto;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 800px;
  width: 800px; `;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 800px;
  width: 400px
 `
const TopRightContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: left;
  height: 100px;
  width: 800px;
  
 `
const BottomRightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 700px;
  width: 800px
 `
const InsideContainer = styled.div`
  position: absolute
  height: 700px;
  width: 800px
 `

const MainMenuButton = styled.button`
    margin-bottom:20px;   
    margin-right:100px;
    width:200px;
    height:45px;
    font-size: 28px
    text-shadow: 1px 1px 0px #4f4f4f;
    background-color:transparent;
    display: inline-block
    color: black;
    padding-top:0px;
    padding-bottom: 5px;
    border:4px solid;
    &:hover {
        background: #d9d9d9;
    }
    border-color: ${props => props.borderColor|| "black"};
`;




class GameTest extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            game: null,
            players: [],
            gameState: null,
            interval: null,
            currentGuesserId: 1,
            lobbyName: '',
            clues: [],
            stateName: 'EndGameState'
        };
    }



    handleInputChange(key, value) {
        this.setState({ [key]: value });
    }

    stateChange(){
        if(this.state.stateName === 'EndGameState'){
            return <EndGameState/>
        }
        if(this.state.stateName === 'EnterCluesState'){
            return <EnterCluesState/>
        }
        if(this.state.stateName === 'EnterGuessState'){
            return <EnterGuessState clues={this.state.clues}/>
        }
        if(this.state.stateName === 'PickWordState'){
            return <PickWordState currentGuesserId={parseInt(localStorage.getItem('id'))}/>
        }
        if(this.state.stateName === 'TransitionState'){
            return <TransitionState/>
        }
        if(this.state.stateName === 'VoteOnClueState'){
            return <VoteOnClueState/>
        }
    }



    componentDidMount() {
    }




    render(){
        return(
            <FormContainer>
                <RightContainer>
                    <TopRightContainer>
                        <MainMenuButton borderColor="#0bb845"
                                        onClick={() => {this.handleInputChange('stateName', 'EndGameState')}}>End</MainMenuButton>
                        <MainMenuButton borderColor="#0bb845"
                                        onClick={() => {this.handleInputChange('stateName', 'EnterCluesState')}}>Clue</MainMenuButton>
                        <MainMenuButton borderColor="#0bb845"
                                        onClick={() => {this.handleInputChange('stateName', 'EnterGuessState')}}>Guess</MainMenuButton>
                        <MainMenuButton borderColor="#0bb845"
                                        onClick={() => {this.handleInputChange('stateName', 'PickWordState')}}>PickWord</MainMenuButton>
                        <MainMenuButton borderColor="#0bb845"
                                        onClick={() => {this.handleInputChange('stateName', 'TransitionState')}}>Transition</MainMenuButton>
                        <MainMenuButton borderColor="#0bb845"
                                        onClick={() => {this.handleInputChange('stateName', 'VoteOnClueState')}}>VoteOnClue</MainMenuButton>
                    </TopRightContainer>
                    <BottomRightContainer>
                        <Picture/>
                        <InsideContainer>
                            {this.stateChange()}
                        </InsideContainer>
                    </BottomRightContainer>
                </RightContainer>
            </FormContainer>
        )
    }
}
export default withRouter(GameTest);