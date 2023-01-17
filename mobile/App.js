import * as React from "react";
import { WebView } from "react-native-webview";

export default class App extends React.Component {
  render() {

    const url = " ";
    return (
      <WebView 
      source={{ uri: url }} 
      style={[{ marginTop: 20 },{backgroundColor: 'black'}]}
      />
    );
  }
}