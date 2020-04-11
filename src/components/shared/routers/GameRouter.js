import React from "react";
import styled from "styled-components";
import { Redirect, Route  } from "react-router-dom";
import Profile from "../../profile/Profile";
import {ProfileGuard} from "../routeProtectors/ProfileGuard";
import Main from "../../main/Main";
import JoinLobby from "../../lobby/JoinLobby";
import {JoinLobbyGuard} from "../routeProtectors/JoinLobbyGuard"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class GameRouter extends React.Component {
  render() {
    /**
     * "this.props.base" is "/game" because as been passed as a prop in the parent of GameRouter, i.e., App.js
     */
    return (
      <Container>
        <Route
          exact
          path={`${this.props.base}/main`}
          render={() => <Main changeMusicToNormal={this.props.changeMusicToNormal} stopNoise={this.props.stopNoise}/>}
        />

          <Route
              exact
              path={`${this.props.base}/users/:id`}
              render={() => (
                  <ProfileGuard>
                    <Profile changeMusicToNormal={this.props.changeMusicToNormal} stopNoise={this.props.stopNoise}/>
                  </ProfileGuard>
              )}
          />
          <Route
              exact
              path={`${this.props.base}/lobbies`}
              render={() => (
                  <JoinLobbyGuard>
                  <JoinLobby changeMusicToNormal={this.props.changeMusicToNormal} stopNoise={this.props.stopNoise}/>
                  </JoinLobbyGuard>
              )}
              />
        <Route
          exact
          path={`${this.props.base}`}
          render={() => <Redirect to={`${this.props.base}/main`} />}
        />
      </Container>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default GameRouter;
