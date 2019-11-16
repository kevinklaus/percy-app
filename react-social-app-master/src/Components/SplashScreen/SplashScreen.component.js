import React, { Component } from 'react';
import './splashscreen.css';
import Zoom from '@material-ui/core/Zoom';
import { ChatCard } from '../Common/ChatCard.component';

/**
 * SplashScreen of the app
 * @namespace
 * @name SplashScreen
 */
function LoadingMessage() {
  return (
    <div className="splash-screen fixed-background">
      <div className="loading-dot">.</div>
      <ChatCard
        content="Hey! Give me a second to get ready..."
        variant="percy"
      />
    </div>
  );
}
/**
 * Function that shows splash screen
 * @memberof SplashScreen
 * @param WrappedComponent - component which gets wrapped and gets extended with splashscreen loading message
 */
function withSplashScreen(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      };
    }

    async componentDidMount() {
      try {
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 2900);
      } catch (err) {
        console.log(err);
        this.setState({
          loading: false,
        });
      }
    }
    
    /**
     * The state of the user session gets checked and shows the "loading message".
     * If the state is loaded, it show the desired route.
     */
    render() {
      if (this.state.loading) return LoadingMessage();

      return (
        <Zoom in={true} style={{ transitionDelay: '500ms' }}>
          <WrappedComponent {...this.props} />
        </Zoom>
      );
    }
  };
}

export default withSplashScreen;
