import React, { Component } from 'react';
import axios from 'axios';
import { List, ListItem } from 'material-ui/List';
import AutoComplete from 'material-ui/AutoComplete';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';

export default class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: null
    };
  }

  setSearchText(value) {
    this.setState({
      searchText: value
    });
  }

  addFriend() {
    const users = this.props.users;
    let friendId = null;

    users.forEach((user) => {
      if (user.email === this.state.searchText) {
        friendId = user.id;
      }
    });

    axios.post(`/friend/${this.props.currentUser.id}`, {
      userId: this.props.currentUser.id,
      friendId: friendId
    })
      .then((res) => {
        this.props.getFriends();
      })
      .catch(err => console.log('error:', err));
  }

  render() {
    return (
      <div className="friend_component">
        <List>
          <h3>My Friends</h3>
          <div className="friend_add">
            <AutoComplete
              floatingLabelText="Add friend"
              filter={AutoComplete.fuzzyFilter}
              dataSource={this.props.users}
              dataSourceConfig={{value: 'id', text: 'email'}}
              maxSearchResults={5}
              onUpdateInput={this.setSearchText.bind(this)}
              style={{width: '75%'}}
            />
            <RaisedButton label="Add" primary={true} onClick={this.addFriend.bind(this)} style={{width: '25%'}} />
          </div>
          <div className="friend_list">
            {this.props.friends.map((friend, index) => {
              return <ListItem
                leftAvatar={<Avatar src={friend.avatar} />}
                primaryText={`${friend.firstname} ${friend.lastname}`}
                key={index} />;
            })}
          </div>
        </List>
      </div>
    );
  }
}
