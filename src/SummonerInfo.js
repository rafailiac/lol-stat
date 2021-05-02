import React from "react";
import "./index.css";

class SummonerInfo extends React.Component {
  /**
   * Presents information about a summoner
   */
  render() {
    return (
      <div className="SummonerInfo">
        <div className="Sidenav">
          <h1>Summoner: {this.props.name}</h1>
        </div>
        <div className="MainContent">
          <h1>Match History</h1>
        </div>
      </div>
    );
  }
}
export default SummonerInfo;
