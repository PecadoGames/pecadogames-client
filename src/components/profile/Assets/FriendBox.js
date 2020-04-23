import React from 'react';
import { render } from 'react-dom';
import { Element, Events} from 'react-scroll'
import {withRouter} from "react-router-dom";
import {api} from "../../../helpers/api";
import { PixelButton, Row, RowContainer } from "./profileAssets";

class FriendBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            friendData: []
        }
    }

    async componentDidMount() {

        Events.scrollEvent.register('begin', function () {
            console.log("begin", arguments);
        });

        Events.scrollEvent.register('end', function () {
            console.log("end", arguments);
        });
        const response = await api.get(`/users/${localStorage.getItem("id")}/friends`)
        this.setState({['users']: response.data})
        this.getStatusFromFriends()
    }

    async getStatusFromFriends(){
        const fullFriendList = [];
        for(let user in this.state.users){
        
            const friends = await api.get(`users/${this.state.users[user].id}`)
            
            const friend = friends.data
           
            if(friend.logged_in === true){
                fullFriendList.unshift(friend)
            }
            else{
                fullFriendList.push(friend)
            }

        }
        this.setState({friendData : fullFriendList});
    }


    componentWillUnmount() {
        Events.scrollEvent.remove('begin');
        Events.scrollEvent.remove('end');
    }

    render() {
        return (
            <div>
                <Element name="FriendBox" className="element" id="containerElement" style={{
                    margin: 'auto',
                    width: '85%',
                    height: '250px',
                    overflow: 'auto',
                }}>
                    {!this.state.users.length ? 
                    (<Row>
                        <RowContainer>
                            You're lonely, find some friends
                        </RowContainer>
                    </Row>
                    ) : (
                    <Row>
                            <RowContainer
                                textDecoration="underline"
                            >
                                Username
                            </RowContainer>
                            <RowContainer
                                textDecoration="underline"
                            >
                                Status
                            </RowContainer>
                            <RowContainer/>
                        </Row>
                        )}
                    {this.state.friendData.map(users => {return(
                    <Element 
                            key = {users.id} 
                            name={users.user}
                    >
                        <Row>
                            <RowContainer> 
                            {users.username}
                            </RowContainer>
                            <RowContainer
                                color={users.logged_in ? ("green") : ("red")}>
                                {users.logged_in ? ("ONLINE") : ("OFFLINE")}
                            </RowContainer>
                            <RowContainer>
                                <PixelButton 
                                    marginTop="null"
                                    onClick={()=>this.props.history.push(`/game/users/${users.id}`)}>View Profile
                                </PixelButton>
                            </RowContainer>
                        </Row>
                    </Element>);
                    })}
                </Element>
            </div>
        );
    }
};

render(<FriendBox />, document.getElementById('root'));

export default withRouter(FriendBox)

