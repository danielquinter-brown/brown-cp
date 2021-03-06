import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoadingScreen from "./screens/LoadingScreen";
import LandingScreen from "./screens/LandingScreen";
import CustomLoginScreen from "./screens/CustomLoginScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import CustomSignUpScreen from "./screens/CustomSignUpScreen";
import VerificationScreen from "./screens/VerificationScreen";
import CreateProfileScreen1 from "./screens/CreateProfileScreen1";
import CreateProfileScreen2 from "./screens/CreateProfileScreen2";
import DashboardScreen from "./screens/DashboardScreen";
import TabNavigator from "./screens/BottomTabNavigator";
import DrawerNavigator from "./screens/DrawerNavigator";
import SearchScreen from "./screens/SearchScreenFromDashboard";
import EditProfileScreen from "./screens/EditProfileScreen";
import MyProfileScreenDashboard from "./screens/MyProfileScreenDashboard";
import UserProfileCard from "./components/UserProfileCard";
import UserProfileScreenNetwork from "./screens/UserProfileScreenNetwork";
import FindUsersConcentrationScreen from "./screens/FindUsersConcentrationScreen";
import NetworkScreen from "./screens/NetworkScreen";

// import helps solve a weird decoding bug
import { decode, encode } from "base-64";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

// initializes our firebase (can be called on using firebase)
// confidential information - apiKey and appId
import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDIS2EvIGVPsNV3f5b61pBrL6Vce7-In68",
  authDomain: "brown-cp.firebaseapp.com",
  databaseURL: "https://brown-cp.firebaseio.com",
  projectId: "brown-cp",
  storageBucket: "brown-cp.appspot.com",
  messagingSenderId: "522825335797",
  appId: "1:522825335797:web:52d33920d5e2efa15d16bc",
  measurementId: "G-R9CV6FQFHX",
};

firebase.initializeApp(firebaseConfig);

const AppSwitchNavigator = createSwitchNavigator(
  {
    LoadingScreen: LoadingScreen,
    LandingScreen: LandingScreen,
    CustomLoginScreen: CustomLoginScreen,
    ForgotPasswordScreen: ForgotPasswordScreen,
    CustomSignUpScreen: CustomSignUpScreen,
    VerificationScreen: VerificationScreen,
    CreateProfileScreen1: CreateProfileScreen1,
    CreateProfileScreen2: CreateProfileScreen2,
    DashboardScreen: DashboardScreen,
    TabNavigator: TabNavigator,
    DrawerNavigator: DrawerNavigator,
    SearchScreen: SearchScreen,
    EditProfileScreen: EditProfileScreen,
    MyProfileScreenDashboard: MyProfileScreenDashboard,
    UserProfileCard: UserProfileCard,
    UserProfileScreenNetwork: UserProfileScreenNetwork,
    FindUsersConcentrationScreen: FindUsersConcentrationScreen,
    NetworkScreen: NetworkScreen,
  },
  {
    initialRouteName: "LoadingScreen",
  }
);

const AppNavigator = createAppContainer(AppSwitchNavigator);

export default function App() {
  return <AppNavigator></AppNavigator>;
}
