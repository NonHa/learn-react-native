/**
 * Day 11
 * OpenGL
 * Example from https://github.com/ProjectSeptemberInc/gl-react-native/blob/master/example/src/Simple/index.js
 */
'use strict';

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  StatusBar,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
} from 'react-native';
import Util from './utils';
import GL, { Shaders, Node, GLSL } from 'gl-react';
import { Surface } from 'gl-react-native';
import Slider from '@react-native-community/slider';
const shaders = Shaders.create({
  helloBlue: {
    frag: GLSL`
    precision highp float;
    varying vec2 uv;
    uniform float blue;
    void main() {
      gl_FragColor = vec4(uv.x, uv.y, blue, 1.0);
    }`,
  },
  helloGL: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform float value;
      void main () {
        gl_FragColor = vec4(uv.x, uv.y, value, 1.0);
      }
    `,
  },
  saturation: {
    frag: GLSL`
      precision highp float;
      varying vec2 uv;
      uniform sampler2D image;
      uniform float factor;
      void main () {
        vec4 c = texture2D(image, uv);
        const vec3 W = vec3(0.2125, 0.7154, 0.0721);
        gl_FragColor = vec4(mix(vec3(dot(c.rgb, W)), c.rgb, factor), c.a);
      }
    `,
  },
  pieProgress: {
    frag: GLSL`
      precision mediump float;
      varying vec2 uv;
      uniform vec4 colorInside, colorOutside;
      uniform float radius;
      uniform float progress;
      uniform vec2 dim;
      const vec2 center = vec2(0.5);
      const float PI = acos(-1.0);
      void main () {
        vec2 norm = dim / min(dim.x, dim.y);
        vec2 p = uv * norm - (norm-1.0)/2.0;
        vec2 delta = p - center;
        float inside =
          step(length(delta), radius) *
          step((PI + atan(delta.y, - 1.0 * delta.x)) / (2.0 * PI), progress);
        gl_FragColor = mix(
          colorOutside,
          colorInside,
          inside
        );
      }
    `,
  },
});

// const HelloGL = GL.createComponent(
//   ({ value }) => <GL.Node shader={shaders.helloGL} uniforms={{ value }} />,
//   { displayName: 'HelloGL' },
// );

// const Saturation = GL.createComponent(
//   ({ factor, image, ...rest }) => (
//     <GL.Node {...rest} shader={shaders.saturation} uniforms={{ factor, image }} />
//   ),
//   { displayName: 'Saturation' },
// );

// const PieProgress = GL.createComponent(
//   ({ width, height, progress, colorInside, colorOutside, radius }) => (
//     <GL.Node
//       shader={shaders.pieProgress}
//       uniforms={{
//         dim: [width, height],
//         progress,
//         colorInside,
//         colorOutside,
//         radius,
//       }}
//     />
//   ),
//   {
//     displayName: 'PieProgress',
//     defaultProps: {
//       colorInside: [0, 0, 0, 0],
//       colorOutside: [0, 0, 0, 0.8],
//       radius: 0.4,
//     },
//   },
// );
class HelloBlue extends React.Component {
  render() {
    const { blue } = this.props;
    return <Node shader={shaders.helloBlue} uniforms={{ blue }} />;
  }
}
export default class extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      saturationFactor: 1,
      progress: 0,
    };
  }

  componentDidMount() {
    StatusBar.setBarStyle('dark-content');
  }

  render() {
    let { value, saturationFactor, progress } = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>Gradients:</Text>
        </View>
        <Slider
          maximumValue={1}
          value={0}
          onValueChange={(value) => this.setState({ value: value })}
        />
        <Surface style={styles.surface}>
          {/* <HelloGL value={value} /> */}
          <Node shader={shaders.helloGL} />
        </Surface>
        <View style={styles.titleContainer}>
          <Text style={styles.text}>Satuation:</Text>
        </View>
        <Slider
          maximumValue={5}
          value={1}
          onValueChange={(value) => this.setState({ saturationFactor: value })}
        />

        <View style={styles.titleContainer}>
          <Text style={styles.text}>Progress Pie:</Text>
        </View>
        <Slider
          maximumValue={1}
          value={0}
          onValueChange={(value) => this.setState({ progress: value })}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  surface: {
    height: 200,
    width: 40,
  },
  container: {
    marginTop: 63,
    backgroundColor: '#ffffff',
  },
  titleContainer: {
    alignItems: 'center',
    borderTopWidth: Util.pixel,
    borderTopColor: '#aaa',
    borderBottomWidth: Util.pixel,
    borderBottomColor: '#aaa',
    paddingTop: 5,
    paddingBottom: 5,
  },
  text: {
    fontSize: 16,
  },
});
