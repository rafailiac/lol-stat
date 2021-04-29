// server/index.js
const twisted = require("twisted");
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();
const RIOT_API_KEY = process.env.RIOT_API_KEY;
const riotAPI = new twisted.LolApi(RIOT_API_KEY);

async function summonerByName() {
  const api = new twisted.LolApi(RIOT_API_KEY);
  let res = await api.Summoner.getByName(
    "secSPLITond",
    twisted.Constants.Regions.EU_WEST
  );
  console.log(res);
  return res;
}

async function freeChampionsRotation() {
  const api = new twisted.LolApi(RIOT_API_KEY);
  let res = await api.Champion.rotation(twisted.Constants.Regions.EU_WEST);
  return res;
}

async function retrieveChampionById(id) {
  const api = new twisted.LolApi(RIOT_API_KEY);
  let res = await api.DataDragon.getChampion(id);
  //console.log("Champ by ID: ", res);
  return res;
}

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
