import React, { Component } from "react";
import MouseParticles from "react-mouse-particles";
import "./App.css";
import Signin from "./components/Signin/Signin";
import Register from "./components/navigation/navigation/Register/Register";
import Navigation from "./components/navigation/navigation/Navigation";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Logo from "./components/logo/Logo";
import ImageLinkForm from "./components/imagelinkForm/imageLinkForm";
import Rank from "./components/Rank/Rank";
import Particles from "./components/Particles/particles";

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,

  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  /* componentDidMount() {
    fetch("http://localhost:3000/")
      .then((response) => response.json())
      .then((data) => console.log(data));
  } */

  calculateFaceLocation = (data) => {
    const boxes = data.outputs[0].data.regions.map(
      (region) => region.region_info.bounding_box
    );
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(boxes);
    const newBox = boxes.map((face) => {
      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - face.right_col * width,
        bottomRow: height - face.bottom_row * height,
      };
    });

    this.setState({ boxes: newBox });
    console.log(newBox);
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    if (!this.state.input) {
      return console.log("Please add a pic");
    }
    fetch(" https://serene-dusk-50716.herokuapp.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch(" https://serene-dusk-50716.herokuapp.com/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.calculateFaceLocation(response);
      });
  };

  onRouteChange = (route) => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App">
        <Particles />
        <MouseParticles
          g={1}
          num={20}
          color="random"
          cull="stats,image-wrapper"
          level={6}
        />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
            />
            {<FaceRecognition boxes={boxes} imageUrl={imageUrl} />}
          </div>
        ) : route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
        )
      </div>
    );
  }
}

export default App;
