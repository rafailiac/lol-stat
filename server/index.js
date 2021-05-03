// server/index.js
const twisted = require("twisted");
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
const RIOT_API_KEY = process.env.RIOT_API_KEY;
const riotAPI = new twisted.LolApi(RIOT_API_KEY);

app.get("/summonerleague", async (req, res) => {
  const summonerId = req.query.summId;
  let r = await riotAPI.League.bySummoner(
    summonerId,
    twisted.Constants.Regions.EU_WEST
  );
  res.json(r.response);
});

app.get("/champmastery", async (req, res) => {
  const summonerId = req.query.summId;
  let r = await riotAPI.Champion.masteryBySummoner(
    summonerId,
    twisted.Constants.Regions.EU_WEST
  );
  res.json(r.response);
});

app.get("/matches", async (req, res) => {
  const accountId = req.query.accountId;
  let r = await riotAPI.Match.list(
    accountId,
    twisted.Constants.Regions.EU_WEST
  );
  res.json(r.response);
});

app.get("/summoner", async (req, res) => {
  const name = req.query.name;
  let r = await riotAPI.Summoner.getByName(
    name,
    twisted.Constants.Regions.EU_WEST
  );
  res.json(r.response);
});

// returns an object containing data about the challenger league on EUW
app.get("/ladder", async (req, res) => {
  let r = await riotAPI.League.getChallengerLeaguesByQueue(
    twisted.Constants.Queues.RANKED_SOLO_5x5,
    twisted.Constants.Regions.EU_WEST
  );
  res.json(r.response);
});

// returns an object containing data about champions, where they keys are champions names
app.get("/champions", async (req, res) => {
  let r = await riotAPI.DataDragon.getChampion();
  res.json(r.data);
});

// returns an object containing an array with the IDs of the free champions this week
app.get("/freeChampionsRotation", async (req, res) => {
  let r = await riotAPI.Champion.rotation(twisted.Constants.Regions.EU_WEST);
  res.json({ freeChampions: r.response.freeChampionIds });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
