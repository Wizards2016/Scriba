import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
  TouchableHighlight,
  KeyboardAvoidingView,
  TabBarIOS,
  Navigator,
  Image,
  Keyboard,
  Picker
} from 'react-native';
import PostInfo from './PostInfo';
import Header from './Header';
import MapView from 'react-native-maps';
import Button from 'react-native-button';
import Prompt from 'react-native-prompt';
import Input from './Input';
import UsernameCreate from './UsernameCreate';
import API from '../util/APIService';
import Happy from '../media/map-happy.png';
import Funny from '../media/map-funny.png';
import Warning from '../media/map-warning.png';
import Nice from '../media/map-nice.png';
import Sad from '../media/map-sad.png';
import Secret from '../media/map-secret.png';
import General from '../media/map-general.png';
import Write from '../media/edit.png';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    justifyContent: 'center',
    width: 200,
    overflow: 'hidden'
  },
  titleText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400'
  },
  options: {
    backgroundColor: '#007aff',
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: 20,
    paddingBottom: 0,
    margin: 0,
    height: 70
  },
  buttonsLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: 60,
    paddingLeft: 20,
    paddingTop: 5,
    height: 20
  },
  buttonsRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: 60,
    height: 20,
    paddingRight: 20,
    paddingTop: 5
  },
  map: {
    flex: 1
  },
  callout: {
    flex: 1
  },
  button: {
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 50,
    width: 45,
    height: 45,
    top: 495,
    right: 7.5,
    backgroundColor: '#4b89ed'
  },
  write: {
    width: 45,
    height: 45
  },
  textCenter: {
    top: 12.5,
    textAlign: 'center',
    color: 'white',
    fontSize: 18
  },
  subcategoryInputFocused: {
    padding: 5,
    borderRadius: 10,
    borderColor: '#4b89ed',
    borderWidth: 1.5,
    left: 15,
    width: 345.25,
    height: 35
  },
  subcategoryInput: {
    padding: 5,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    left: 15,
    width: 345.25,
    height: 35
  },
  textRequired: {
    height: 20,
    color: "red",
    left: 15,
    marginBottom: 2.5
  },
  textInputRequired: {
    padding: 5,
    borderRadius: 10,
    borderColor: 'red',
    borderWidth: 1.5,
    left: 15,
    width: 345.25,
    fontSize: 18,
    height: 65
  },
  textInputFocused: {
    padding: 5,
    borderRadius: 10,
    borderColor: '#4b89ed',
    borderWidth: 1.5,
    left: 15,
    width: 345.25,
    fontSize: 18,
    height: 65,
    marginBottom: 22.5
  },
  textInput: {
    padding: 5,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    left: 15,
    width: 345.25,
    fontSize: 18,
    height: 65,
    marginBottom: 22.5
  },
  text: {
    textAlign: 'center',
    color: '#4b89ed',
    fontSize: 18,
    top: 30,
    marginBottom: 35
  },
  category: {
    textAlign: 'center',
    color: '#4b89ed',
    fontSize: 18,
    marginBottom: 5
  },
  picker: {
    borderRadius: 10,
    left: 15,
    width: 345.25,
    borderWidth: 1,
    marginBottom: 22.5
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    width: 100,
    top: 6
  },
  submit: {
    alignItems: 'center',
    top: 40,
    left: 15,
    backgroundColor: 'green',
    borderRadius: 10,
    height: 35,
    width: 345.25
  },
  cancel: {
    alignItems: 'center',
    top: 57.5,
    left: 15,
    backgroundColor: 'red',
    borderRadius: 10,
    height: 35,
    width: 345.25
  }
});

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      category: null,
      behavior: null,
      text: null,
      subcategory: null,
      textStyle: styles.textInput,
      subcategoryStyle: styles.subcategoryInput,
      prevTextRequired: false,
      textRequired: false
    };
    this.updateBehavior = this.updateBehavior.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.toggleMapPostInfo = this.toggleMapPostInfo.bind(this);
    this.updateText = this.updateText.bind(this);
    this.updateSubcategory = this.updateSubcategory.bind(this);
    this.postText = this.postText.bind(this);
  }

  watchID: ?number = null;

  componentWIllMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this._keyboardDidShowListener.remove();
    this._keyboardDidHideListener.remove();
  }

  componentDidMount(){
    this.getCurrentPosition();
    this.watchID = navigator.geolocation.watchPosition((position) => {
      this.updateLocation(position);
    });
  }

  toggleMapPostInfo(message) {
    //setstate with the passed in message and id n stuff
      //
    this.setState((prevState) => {
      return {
        modalVisible: !prevState.modalVisible,
        message: message
      };
    }, () => this.props.getMessages());
  }

  getCurrentPosition(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.updateLocation(position);
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  updateCategory(category) {
    this.setState({
      category: category
    });
  }

  updateLocation(position){
    const latitude = position.latitude;
    const longitude = position.longitude;
    this.props.updateLocation({
      latitude: latitude,
      longitude: longitude
    });
  }

  renderPostInfo() {
    if (this.state.modalVisible) {
      return (
        <PostInfo
          message={this.state.message}
          userVote={this.state.message.userVote}
          username={this.props.username}
          userAuth={this.props.userAuth}
          login={this.props.login}
          toggleMapPostInfo={this.toggleMapPostInfo}
          refreshMessages={this.props.getMessages}
          modalVisible={this.state.modalVisible}
        />
      );
    }
  }

  updateBehavior(behavior) {
    this.setState((prevState) => {
      if (prevState.behavior !== behavior) {
        return { behavior: behavior };
      }
    });
  }

  updateText(text) {
    this.setState({
      text: text
    });
  }

  updateSubcategory(subcategory) {
    this.setState({
      subcategory: subcategory
    });
  }

  updatePostPage() {
    this.setState({
      category: null,
      text: null,
      subcategory: null
    });
  }

  updateTextStyle(textStyle) {
    this.setState({
      textStyle: textStyle
    });
  }

  updateSubcategoryStyle(subcategoryStyle) {
    this.setState({
      subcategoryStyle: subcategoryStyle
    });
  }

  updateTextRequired(textRequired, prevTextRequired) {
    if ((textRequired != null && prevTextRequired != null) &&
        (textRequired !== this.state.textRequired &&
         prevTextRequired !== this.state.prevTextRequired)) {
      this.setState({
        textRequired: textRequired,
        prevTextRequired: prevTextRequired
      });
    } else if (textRequired != null && textRequired !== this.state.textRequired) {
      this.setState({
        textRequired: textRequired
      });
    } else if (prevTextRequired != null && prevTextRequired !== this.state.prevTextRequired) {
      this.setState({
        prevTextRequired: prevTextRequired
      });
    }
  }

  postText(list) {
    const data = {
      userAuth: this.props.userAuth,
      displayName: this.props.username,
      text: this.state.text,
      subCategory: this.state.subcategory,
      latitude: this.props.location.latitude,
      longitude: this.props.location.longitude
    };
    if (this.state.category !== 'General') {
      data.category = this.state.category;
    }
    if (data.userAuth && data.displayName) {
      // Post the message to the database
      if (data.text) {
        API.post.message(data)
        .then(() => {
          this.updateTextStyle(styles.textInput);
          this.updateTextRequired(false, false);
          this.updatePostPage();
          this.props.getMessages(() => {list.pop()});
        })
        .catch((err) => {
          console.log('POST request err: ', err);
          throw err;
        });
      } else if (this.state.textStyle !== styles.textRequired) {
        this.updateTextStyle(styles.textInputRequired);
        this.updateTextRequired(true, true);
      }
    } else {
      this.props.login();
    }
  }

  render() {
    let Item = Picker.Item;
    return (
      <Navigator
        initialRoute={{ index: 0 }}
        renderScene={(route, list) => {
          return ( route.index === 0 ?
            <View style={styles.container}>
              <Header
                title={'Nearby'}
              />
              <View behavior="padding" style={styles.container} automaticallyAdjustContentInsets={false}>
                {this.renderPostInfo()}
                <MapView id="map-view"
                  style={styles.map}
                  onRegionChangeComplete={this.updateLocation}
                  followsUserLocation={true}
                  showsUserLocation={true}
                  loadingEnabled={true}
                >
                  {this.props.data.map((message, i)=> {
                    var category = General;
                    if(message.category === 'Happy'){
                      category = Happy;
                    } else if(message.category === 'Funny'){
                      category = Funny;
                    } else if(message.category === 'Nice'){
                      category = Nice;
                    } else if(message.category === 'Sad'){
                      category = Sad;
                    } else if(message.category === 'Warning'){
                      category = Warning;
                    } else if(message.category === 'Secret'){
                      category = Secret;
                    }
                    return (<MapView.Marker
                      image={category}
                      key={"markerID"+i}
                      coordinate={{
                        latitude: message.latitude,
                        longitude: message.longitude
                      }}
                    >
                      <MapView.Callout width={150} height={40}>
                        <TouchableHighlight
                          style={styles.callout}
                          underlayColor="transparent"
                          onPress={() => this.toggleMapPostInfo(message)}
                        >
                          <View>
                            <Text>{message.text}</Text>
                          </View>
                        </TouchableHighlight>
                      </MapView.Callout>
                      </MapView.Marker>
                    )}
                  )}
                </MapView>
                <TouchableHighlight style={styles.button} onPress={() => {
                  list.push({ index: 1 });
                }} >
                  <Image
                    style={styles.write}
                    source={Write}
                    onLoad={() => {
                      this.props.updateList(list);
                      list = this.props.list;
                    }}
                  />
                </TouchableHighlight>
              </View>
            </View> :
            <KeyboardAvoidingView
              behavior={this.state.behavior}
              style={styles.container}
              automaticallyAdjustContentInsets={false}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  Keyboard.dismiss();
                }}
              >
                <StatusBar
                  style="zIndex: 0"
                  barStyle="dark-content"
                />
                <Text style={styles.text} >Message</Text>
                <Input
                  style={this.state.textStyle}
                  multiline={true}
                  updateValue={this.updateText}
                  value={this.state.text}
                  focus={() => {
                    this.updateBehavior('padding');
                    this.updateSubcategoryStyle(styles.textInputFocused);
                  }}
                  placeholder={'Type here (required)'}
                />
                { this.state.textRequired ? <Text style={styles.textRequired} >Required input field*</Text> : null }
                <Text style={styles.category}>Category</Text>
                <Picker
                  style={styles.picker}
                  selectedValue={this.state.category}
                  onValueChange={(category) => {
                    this.updateCategory(category);
                  }}
                >
                  <Item color="blue" label="General (default)" value="General" />
                  <Item color="blue" label="Funny" value="Funny" />
                  <Item color="blue" label="Happy" value="Happy" />
                  <Item color="blue" label="Nice" value="Nice" />
                  <Item color="blue" label="Sad" value="Sad" />
                  <Item color="blue" label="Secret" value="Secret" />
                  <Item color="blue" label="Warning" value="Warning" />
                </Picker>
                <Text style={styles.category} >Subcategory</Text>
                <Input
                  multiline={false}
                  focus={() => {
                    this.updateBehavior('position');
                    this.updateSubcategoryStyle(styles.subcategoryInputFocused);
                  }}
                  updateValue={this.updateSubcategory}
                  value={this.state.subcategory}
                  style={styles.subcategoryInput}
                  placeholder={'Type here (optional)'}
                />
                <Button containerStyle={styles.submit} style={styles.buttonText} onPress={() => {
                  this.postText(list);
                }} >
                  Submit
                </Button>
                <Button containerStyle={styles.cancel} style={styles.buttonText} onPress={() => {
                  list.pop();
                }} >
                  Cancel
                </Button>
              </TouchableOpacity>
              <UsernameCreate
                userAuth={this.props.userAuth}
                verifyUsername={this.props.verifyUsername}
                promptUN={this.props.promptUN}
                updateUser={this.props.updateUser}
                updatePromptUN={this.props.updatePromptUN}
              />
            </KeyboardAvoidingView>
          );
        }}
        configureScene={() => ({
          ...Navigator.SceneConfigs.FloatFromBottom,
          gestures: {}
        })}
      />
    );
  }
}
