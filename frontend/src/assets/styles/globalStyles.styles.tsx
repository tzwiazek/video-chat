import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {
    scroll-behavior:smooth;
  }

  body {
    font-family:'Open Sans', sans-serif;
    margin:0;
    padding:0;
  }

  :root{ 
    --mainBackgroundColor:#1c1e2e;
    --mainTextColor:#dadce2;
    --mainTextActiveColor:#dadce2;
    --mainLineColor:#282a39;

    --backgroundIconColor:#232736;
    --borderIconColor:#303241;

    --settingsTextColor:#5f616e;
    --settingsLineColor:#303442;

    --activeVideoCamera:#0e79f9;
    --activeMeetingButton:#df3d3d;

    --errorColor:#e85a71;
  }

  video::-webkit-media-controls {
    display:none!important;
  }

  :focus {
    -webkit-tap-highlight-color:transparent;
  }

  .hidden {
    display:none!important;
  }

  .hide-chat {
    width:0%!important;
  }
`;