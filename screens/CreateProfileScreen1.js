import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";

import firebase from "firebase";
import "firebase/firestore";

import UserPermissions from "./../utilities/UserPermissions.js";
import * as ImagePicker from "expo-image-picker";

class CreateProfileScreen1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      profilePicture: "./../assets/dp-placeholder.jpg",
      userID: this.props.navigation.state.params.userID,
    };
  }

  pullNamesFromDatabase = () => {
    firebase
      .firestore()
      .collection("user-information")
      .doc(this.state.userID)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({ firstName: doc.data().first_name });
          this.setState({ lastName: doc.data().last_name });
        } else {
          console.log("no data accquired");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  componentDidMount() {
    this.pullNamesFromDatabase();
  }

  writeToDatabase = () => {
    firebase
      .firestore()
      .collection("user-information")
      .doc(this.state.userID)
      .update({
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        profile_picture_url: this.state.profilePicture,
        time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone
      });
  };

  handlePickProfilePicture = async () => {
    UserPermissions.getCameraPermission();

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ profilePicture: result.uri });
      this.writeToStorage();
    }
  };

  writeToStorage = async () => {
    const fetchResponse = await fetch(this.state.profilePicture);
    const toBlob = await fetchResponse.blob();
    firebase
      .storage()
      .ref()
      .child("images/" + this.state.userID)
      .put(toBlob)
      .then(() => {
        console.log("Successful")
      })
      .catch((error) => {
        console.log("Error")
      })
  }

  navigateToNextScreen = () => {
    if (this.state.firstName !== "" && this.state.lastName !== "") {
      this.props.navigation.navigate("CreateProfileScreen2", {
        userID: this.state.userID,
      });
    } else {
      alert("Please Fill All Fields");
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        contentContainerStyle={styles.container}
        behavior="position"
      >
        {/* /*–––––––––––––––––––––––––TITLE–––––––––––––––––––––––––*/}
        <Text style={styles.title}>Create Profile</Text>
        {/* /*–––––––––––––––––––––––––PROFILE PICTURE–––––––––––––––––––––––––*/}
        <View style={styles.profilePictureContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.profilePicturePlaceholder}
            onPress={this.handlePickProfilePicture}
          >
            {this.state.profilePicture === "./../assets/dp-placeholder.jpg" ?
              <Image
                source={require("./../assets/dp-placeholder.jpg")}
                style={styles.profilePicture}
              ></Image> :
              <Image
                source={{ uri: this.state.profilePicture }}
                style={styles.profilePicture}
              ></Image>}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.changeProfilePictureContainer}
            onPress={this.handlePickProfilePicture}
          >
            <Text style={styles.changeProfilePictureText}>
              Change Profile Picture
            </Text>
          </TouchableOpacity>
        </View>
        {/* /*–––––––––––––––––––––––––FORM 1 - FIRST NAME–––––––––––––––––––––––––*/}
        <View style={styles.form1}>
          <Text style={styles.inputTitle}>First Name</Text>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            onChangeText={(text) => this.setState({ firstName: text })}
            value={this.state.firstName}
          ></TextInput>
        </View>
        {/* /*–––––––––––––––––––––––––FORM 2 - LAST NAME–––––––––––––––––––––––––*/}
        <View style={styles.form2}>
          <Text style={styles.inputTitle}>Last Name</Text>
          <TextInput
            style={styles.input}
            autoCorrect={false}
            onChangeText={(text) => this.setState({ lastName: text })}
            value={this.state.lastName}
          ></TextInput>
        </View>
        {/* /*–––––––––––––––––––––––––NEXT BUTTON–––––––––––––––––––––––––*/}
        <CreateProfileButton
          title="Next"
          onPress={() => {
            this.writeToDatabase();
            this.navigateToNextScreen();
          }}
        ></CreateProfileButton>
      </KeyboardAvoidingView>
    );
  }
}

const CreateProfileButton = ({ onPress, title }) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.createProfileButtonContainer}
    activeOpacity={0.8}
  >
    <Text style={styles.createProfileButtonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E53935",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#fafafa",
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 40,
    position: "absolute",
    top: "8%",
  },
  form1: {
    flex: 1,
    position: "absolute",
    top: "42%",
    width: 0.8 * Dimensions.get("window").width,
  },
  form2: {
    position: "absolute",
    top: "52%",
    width: 0.8 * Dimensions.get("window").width,
  },
  inputTitle: {
    color: "#fafafa",
    fontSize: 12,
    textTransform: "uppercase",
    fontWeight: "500",
  },
  input: {
    borderBottomColor: "#fafafa",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 13,
    color: "#fafafa",
  },
  createProfileButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fafafa",
    borderRadius: 15,
    paddingVertical: 17,
    paddingHorizontal: 12,
    width: "80%",
    position: "absolute",
    bottom: 40,
  },
  createProfileButtonText: {
    fontSize: 18,
    color: "#E53935",
    fontWeight: "bold",
    alignSelf: "center",
  },
  profilePictureContainer: {
    position: "absolute",
    top: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePicturePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#fafafa",
    justifyContent: "center",
    alignItems: "center",
  },
  changeProfilePictureContainer: {
    position: "absolute",
    top: "110%",
    width: 150,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  changeProfilePictureText: {
    color: "#fafafa",
    fontSize: 12,
    fontWeight: "500",
  },
});

export default CreateProfileScreen1;
