import React, { Component } from 'react';
import { Container, Content, Button,Text, Icon,View, } from 'native-base';
import {StyleSheet,Image,ImageBackground,ToastAndroid }  from 'react-native';
import fbsdk, {LoginManager,LoginButton,AccessToken,GraphRequest,GraphRequestManager} from 'react-native-fbsdk';
import { GoogleSignin,GoogleSigninButton,statusCodes} from 'react-native-google-signin'
import { TouchableOpacity } from 'react-native-gesture-handler';


var soundplayer = require('react-native-sound');
var song =null;
//import {row} from 'react-native-easy-grid';
export default class Login extends Component {
  
  constructor(props){
    super(props)
    
    this.state ={
     pause:false,
    };
    this.state = {
      name : '',
      pic : '',
      email:''
    }
  }
  componentDidMount() 
  {
   
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '<FROM DEVELOPER CONSOLE>', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      hostedDomain: '', // specifies a hosted domain restriction
      loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      accountName: '', // [Android] specifies an account name on the device that should be used
     // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }
  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo)
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {

        this.navigation.navigate('Main')
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  componentWillMount(){
    song = new soundplayer('recording.M4A',soundplayer.MAIN_BUNDLE,(error)=>{
     if(error)
     ToastAndroid.show('erorr when init soundplayer:(((',ToastAndroid.SHORT);
    }
    );

      // Create a graph request asking for user information with a callback to handle the response.
    const infoRequest = new GraphRequest(
      '/me?fields=name,email,picture',
      null,
      this._responseInfoCallback
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
    
  }
  onpressButtonPlay(){
    
    if(song != null){
      song.play((success) => {
        if(!success)
         ToastAndroid.show('Error when play soundplayer:(((',ToastAndroid.SHORT);
      } )
    }
  }
  //Create response callback.
_responseInfoCallback = (error, result) => {
  if (error) {
    alert('Error fetching data: ' + error.toString());
  } else {
    console.log(result);
    this.setState({name: result.name,email:result.email ,pic:result.picture.data.url});
  }
}
 
async componentDidMount() {
  try{
    const currentUser = await GoogleSignin.getCurrentUser();
    console.log("currentUser", currentUser)
  } catch(err){
    console.log("error",err)
  }

}

    
  render() {
    return (
       <ImageBackground style={Styles.backgroundImage}
              source={require('../../assests/img/logo.jpg')}>

       <View>
        <Image source={require('../../assests/img/logo.png')}  
            style={Styles.logo}>
         </Image>
         </View>
         <View>
         <Icon type="FontAwesome5" name="assistive-listening-systems" 
          style={Styles.Icon}
          onPress={this.onpressButtonPlay.bind(this)}
          />
          <LoginButton  style={{ width: 192, height: 48,marginLeft:40,marginTop:30}}   
            onLoginFinished={
            (error, result) => {
            if (error) {
              alert("login has error: " + result.error);
            } else if (result.isCancelled) {
              alert("login is cancelled.");
            } else {
              AccessToken.getCurrentAccessToken().then(
                (data) => {
                  // console.log(result,data)
                  // this.props.navigation.navigate('Main')
                }
              )
            }
          }
        }
      />
    </View>
      <GoogleSigninButton
             style={{ width: 192, height: 48,marginLeft:40,marginTop:30}}
             size={GoogleSigninButton.Size.Wide}
             color={GoogleSigninButton.Color.Dark}
              onPress={this.signIn}
              disabled={this.state.isSigninInProgress} />
          
     </ImageBackground>
    );
  }
}
const Styles=StyleSheet.create({
  backgroundImage:{
    flex:1,
  width:'100%',
  height:'100%',
  },
  Icon:{
    marginLeft:280,
    marginTop:130,
    color:'white',
  },
    Button1:{
      height:100,
      flex: 1,
      width:165,
      borderColor: "#555555",
      borderWidth:1,
      borderRadius:10,
      marginTop:-10,
      marginLeft:100,
      justifyContent: "center",
    },
    Button2:{
      height:50,
      flex: 1,
      borderColor: "#555555",
      borderWidth: 0,
      borderRadius:1,
      marginBottom: 110,
      marginLeft:100,
      justifyContent: "center"
    },
    logo:{
      width:300,
      height:200,
      alignContent: 'center',
      marginLeft: 50,
    }
});