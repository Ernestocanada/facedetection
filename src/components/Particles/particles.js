import React, { Component } from "react";
import Particles from "react-particles-js";

class ParticlesBackground extends Component {
  render() {
    return (
      <div className="particles absolute z-0">
        <Particles
          params={{
            particles: {
              number: {
                value: 100,
                density: { enable: true },
              },

              size: {
                value: 2.5,
              },
            },
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onhover: {
                  enable: true,
                  mode: "repulse",
                  detect_on: "window",
                },
                retina_detect: true,
              },
            },
          }}
        />
      </div>
    );
  }
}

export default ParticlesBackground;
