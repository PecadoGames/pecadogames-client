import React from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import { withRouter } from 'react-router-dom';
import {PixelButton} from '../profile/Assets/profileAssets'
import {InputField} from "../../views/design/InputField";
import Sound from "react-sound";
import commercial from "../login/assets/CommercialFunnyMusic.mp3"
import {LogoContainer} from "../login/Login"


const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 890px;
  width: 800px;
  border-radius: 20px;
  align-items: flex-start;  
  padding-left: 20px;
`;


const HandyContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 730px;
  width: 400px;
  border-radius: 20px;
  align-items: flex-start;  
  padding-left: 20px;
  padding-top: 80px;
`;


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 70px;
`;


const LargePhoneTitle = styled.div`
    display: flex;
    margin-left: 90px;
    width: 190px;
    text-align: center;
    font-size: 50px;
    height: auto;
    background: #000000;
    border-bottom: 2px solid #c0c0c0;
    color: #c0c0c0;
`

class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            confirmation: null,
        };
    }

    async register() {
        try {
            const requestBody = JSON.stringify({
                username: this.state.username,
                password: this.state.password
            });

            await api.post('/users', requestBody);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            this.props.history.push(`/login`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }
    _handleKeyDown = (e) => {
        if (e.key === 'Enter'){
            this.register();
        }
    }


    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    componentDidMount() {
        this.props.changeMusicToDim();


    }

    shouldComponentUpdate(nextState) {
        if(this.state.username !== nextState.username || this.state.password !== nextState.password || this.state.confirmation !== nextState.confirmation){
            return false;}
        return true;
    }

    render() {
        return (

            <FormContainer className={'backgroundLogin'}>
                <LogoContainer>
                    <img src={require('./assets/logo_j1.gif')} width="150"/>
                </LogoContainer>
                <HandyContainer className={'handyImage'}>
                    <Sound url={commercial}
                           playStatus={Sound.status.PLAYING}
                           playFromPosition={800}
                           volume={30}
                           loop={true}
                    />
                    <LargePhoneTitle>
                        PecadOS
                        Sign Up
                    </LargePhoneTitle>
                        <InputField
                            placeholder="Enter username"
                            width="220px"
                            marginTop = "70px"
                            marginLeft="70px"
                            marginBottom="30px"
                            height="45px"
                            onChange={e => {
                                this.handleInputChange('username', e.target.value);
                            }}
                            color="#c0c0c0"
                            borderBottom= "2px solid #c0c0c0"
                        />
                        <InputField
                            placeholder="Enter password"
                            width="220px"
                            marginLeft="70px"
                            marginBottom="30px"
                            height="45px"
                            type = {'password'}
                            onChange={e => {
                                this.handleInputChange('password', e.target.value);
                            }}
                            color="#c0c0c0"
                            borderBottom= "2px solid #c0c0c0"
                        />
                        <InputField
                            onKeyDown={this._handleKeyDown}
                            placeholder="Confirm password"
                            width="220px"
                            marginLeft="70px"
                            marginBottom="30px"
                            height="45px"
                            type = {'password'}
                            onChange={e => {
                                this.handleInputChange('confirmation', e.target.value);
                            }}
                            color="#c0c0c0"
                            borderBottom= "2px solid #c0c0c0"
                        />
                        <ButtonContainer>
                            <PixelButton
                                width="220px"
                                onClick={() => {
                                    this.register();
                                }}
                                boxShadow="none"
                                hover="none"
                            >
                                Sign up
                            </PixelButton>
                        </ButtonContainer>
                        <ButtonContainer>
                            <PixelButton
                                width="220px"
                                onClick={() => {
                                    this.props.history.push(`/login`);
                                }}
                                boxShadow="none"
                                hover="none"
                            >
                                Back
                            </PixelButton>
                        </ButtonContainer>
                </HandyContainer>
            </FormContainer>

        );
    }
}

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default withRouter(Register);
