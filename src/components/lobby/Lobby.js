import styled from "styled-components";
import React from "react";
import {withRouter} from "react-router-dom";
import {LogoutButton} from "../../views/design/LogoutButton";
import {api, handleError} from "../../helpers/api";
import ChatBox from "../ChatBox/ChatBox";
import {InputField} from "../../views/design/InputField";
import {Button} from "../../views/design/Button";

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
  flex-direction: column;
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

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 400px;
  width: 400px
 `


class Lobby extends React.Component{
    constructor() {
        super();
        this.state = {
            lobby: null
        };
    }

    //needs to be adjusted since you have to logout of the lobby
    async logout() {
        try{
            const requestBody = JSON.stringify({
                id: localStorage.getItem("id"),
                token: localStorage.getItem("token")
            });
            await api.put('/logout', requestBody);
            localStorage.removeItem('token');
            localStorage.removeItem('id');
            this.props.history.push('/login');
        }
        catch(error){
            alert(`Something went wrong during the logout \n${handleError(error)}`)
        }
    }

    //leave the Lobby before start
    async leaveLobby(){
        try{
            this.props.history.push('/game')

        }
        catch(error){

        }
    }

    //request to add Bot
    async addBot(){
        try{


        }
        catch(error){

        }

    }

    //request to add friend
    async invite(){
        try{


    }
    catch(error){

    }}

    //starts the game
    async startGame(){
        try{
            this.props.history.push(window.location.pathname +'/game')

        }
        catch(error){

        }
    }

    componentDidMount() {
        //getLobby
    }


    render(){
        return(
            <FormContainer>

                <LeftContainer>
                    <LogoutButton
                        onClick={()=>this.logout()}>Logout
                    </LogoutButton>
                    <LogoutButton
                        onClick={()=>this.leaveLobby()}>Leave
                    </LogoutButton>
                    <PlayerContainer>
                        <br/>
                        <text>LobbyName</text>
                        <br/>
                        <text>Player1</text>
                        <text>Player2</text>
                        <text>Player3</text>
                        <text>Player4</text>
                        <text>Player5</text>
                        <text>Player6</text>
                        <text>Player7</text>
                    </PlayerContainer>
                    <Button
                        onClick={()=>this.startGame()}>Start Game
                        </Button>
                    <text>Chat</text>
                    <ChatBox></ChatBox>
                    <InputField>
                    </InputField>
                </LeftContainer>

                <RightContainer>
                    <TopRightContainer>
                        <Button onClick={()=>this.invite()}>
                            Invite Friend
                        </Button>
                        <Button onClick={()=>this.addBot()}>
                            Add Bot
                        </Button>
                    </TopRightContainer>
                    <BottomRightContainer className = 'lobbyBackground'>
                    </BottomRightContainer>
                </RightContainer>

            </FormContainer>
        )
    }
}
export default withRouter(Lobby);