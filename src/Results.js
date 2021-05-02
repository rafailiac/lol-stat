import React from "react";
import "./index.css";
import ChampionInfo from "./ChampionInfo";
import SummonerInfo from "./SummonerInfo";

class QueryResult extends React.Component {
  /**
   * Presents the results of an executed query, this might me SummonerInfo or ChampionInfo
   */
  render() {
    let content;
    if (this.props.type === "summoner") {
      content = (
        <SummonerInfo champions={this.props.champions} name={this.props.data} />
      );
    } else {
      content = (
        <ChampionInfo
          champions={this.props.champions}
          champion={this.props.data}
          openChampionInfo={this.props.openChampionInfo}
        />
      );
    }
    return <div>{content}</div>;
  }
}

export default QueryResult;
