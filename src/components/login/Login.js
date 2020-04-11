import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import User from '../shared/models/User';
import { withRouter } from 'react-router-dom';
import { Button } from '../../views/design/Button';
import {InputField} from "../../views/design/InputField";
import {Title} from "../../views/Header"
import {UserWrapper} from "../../views/design/UserWrapper";
import Sound from 'react-sound';
import open_creaky_door from '../login/assets/open_creaky_door.mp3'





const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 800px;
  width: 800px;
  border-radius: 20px;
  align-items: flex-start;  
  padding-left: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  
`;

const Label = styled.label`
  color: black;
  font-weight: 900;
  font-size: 40px;
  font-family: 'Open Sans' 
`;


class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      passwordVisibility: false,
      showError: false,
      picture: "backgroundLogin",
      playStatus: Sound.status.STOPPED,
      logIn: false,
      register: true
    };
  }


  _handleKeyDown = (e) => {
      if (e.key === 'Enter'){
          this.logging();
          this.handleDoor();
          this.login();
      }
  }

  toggleError = () => {
    this.setState((prevState, props) => {return{showError: !prevState.showError}
    })
  };

  toggleErrorFalse = () => {
    this.setState((prevState, props) => {return{showError: false}
    })
  };

  toggleSound(){
    this.handleInputChange('playStatus', Sound.status.PLAYING)
  }

  unToggleSound(){
      this.handleInputChange('playStatus', Sound.status.STOPPED)
  }


  async login() {
    try {
        this.toggleErrorFalse();
        await new Promise(resolve => setTimeout(resolve, 1500));

        const requestBody = JSON.stringify({
            username: this.state.username,
            password: this.state.password
        });
        const url = await api.put('/login', requestBody);

        // Get the returned user and update a new object.
        const response = await api.get(url.headers.location);

        const user = new User(response.data);

        if (user.token != null){
            localStorage.setItem('token', user.token);
            localStorage.setItem('id', user.id);
            this.props.history.push(`/game`);
        }

        if(url.status === 204){
            this.toggleError();
        }
     }catch (error) {
         alert(`Something went wrong during the login: \n${handleError(error)}`);
        }

  }

  async handleDoor(){
      this.toggleSound();
      this.backgroundChangeToGif();
      this.handleInputChange('musicStatus', Sound.status.STOPPED)
      setTimeout(() => {this.backgroundChangeToPng()}, 2100 );
      setTimeout(() => {this.unToggleSound()}, 2500);
  }

  handleInputChange(key, value) {
    // Example: if the key is username, this statement is the equivalent to the following one:
    // this.setState({'username': value});
    this.setState({ [key]: value });
  }

  backgroundChangeToGif(){
      this.handleInputChange('picture', "backgroundLoginGif2");
  }

  backgroundChangeToPng(){
      this.handleInputChange('picture', "backgroundLogin");

  }

  logging(){
      this.handleInputChange('logIn', true)
  }

  componentDidMount() {
      this.props.changeMusicToDim()
      this.props.startNoise();
  }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
      if(this.state.logIn !== nextState.logIn || this.state.playStatus !== nextState.playStatus ){
          return true;}
      return false;
  }



    render() {
    return (
        <FormContainer className={this.state.picture}
        >
          <Container>
              <Sound url={open_creaky_door}
                     playStatus={this.state.playStatus}
                     playFromPosition={100}
                     volume={20}
              />
            {this.state.showError && <Label className="error-message">User is already logged in!</Label>}
          </Container>
          <Title>Just One Club</Title>
              <UserWrapper>
                <InputField
                    placeholder="Enter username"
                    width="30%"
                    username={this.state.username}
                    onChange={e =>{
                      this.handleInputChange('username', e.target.value)
                    }}
                    onKeyDown={this._handleKeyDown}
                />
                <Button
                    width="1.6rem"
                    background="black"
                    boxShadow="null"
                    height="1rem"
                    disabled="true"
                />
              </UserWrapper>
              <UserWrapper>
                <InputField
                    placeholder="Enter password"
                    width="30%"
                    type = 'password'
                    onChange={e => {
                      this.handleInputChange('password', e.target.value);

                    }}
                    onKeyDown={this._handleKeyDown}
                />

              </UserWrapper>
              <ButtonContainer>
                <Button
                    hover = "none"
                    marginLeft ="330px"
                    height = "220px"
                    width="100px"
                    marginTop="null"
                    background= "none"
                    opacity= "0"
                    boxShadow = "null"
                    onClick={() => {
                        this.logging();
                        this.handleDoor();
                        this.login();
                    }}
                >
                </Button>
              </ButtonContainer>
              <ButtonContainer>
                <Button
                    marginTop = "10px"
                    marginLeft = "600px"
                    color = "red"
                    text= "left"
                    width="200px"
                    background= "null"
                    className= "buttonImage"
                    height= "365px"
                    onClick={() => {
                      this.props.history.push(`/register`);
                    }}
                >
                </Button>
              </ButtonContainer>
        </FormContainer>

    )
  }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Login);
