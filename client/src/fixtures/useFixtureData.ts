import { useState, useEffect } from "react";
import { getTeamsForPlayers, getTeamsAsMap } from "../data";
const matchesEndpoint = `/api/competitions/EC/matches`;

export enum FixtureStatus {
    TO_PLAY,
    PLAYING,
    FINISHED
}

export enum TeamType {
  HOME,
  AWAY
}

export type TeamPlayer = {
    teamId: number;
    teamName: string;
    crestUrl: string;
    playerName: string;
}

export type Result = {
  winner: TeamType;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export type Fixture = {
    matchDateAndTime: Date;
    homeTeam: TeamPlayer;
    awayTeam: TeamPlayer;
    status: FixtureStatus;
    result?: Result;
}

export type FixturesType = Record<string, Fixture[]>;

const getTeamPlayerFromMatch= ({id}: any) : TeamPlayer => {
  const playersMap = getTeamsForPlayers();
  const teamsMap = getTeamsAsMap();
  const playerName = playersMap.get(id) ?? '';
  const {name, crestUrl} = teamsMap.get(id) ?? {name: '', crestUrl: ''}

  return {
    teamId: id,
    teamName: name,
    crestUrl,
    playerName
  }
}

const getStatusFromMatch = (match: any) => {
  if(match.status === 'SCHEDULED') {
    return FixtureStatus.TO_PLAY
  }
  if(match.status === 'FINISHED') {
    return FixtureStatus.FINISHED
  }
  return FixtureStatus.PLAYING;
}

const getScoreFromMatch = (match: any) : undefined | Result  => {
  if(getStatusFromMatch(match) !== FixtureStatus.FINISHED) {
    return undefined;
  }
  return {
    winner: match.score.winner,
    homeTeamGoals: match.score.fullTime.homeTeam,
    awayTeamGoals: match.score.fullTime.awayTeam,
  }
}

const mapFixtureFromMatch = (match: any): {matchData: Fixture, stage: string} => {
   const {stage} = match;

   const matchData = {
    matchDateAndTime: new Date(Date.parse(match.utcDate)),
    homeTeam: getTeamPlayerFromMatch(match.homeTeam),
    awayTeam: getTeamPlayerFromMatch(match.awayTeam),
    status: getStatusFromMatch(match),
    result: getScoreFromMatch(match),
   }

   return {
     stage,
     matchData
   }
}

const convertDataToFixture = (data: any) => {
    const groupStages = data.matches.filter((x:any) => x.stage !== 'GROUP_STAGE');
    const fixtures: FixturesType = {};
    for(const matches of groupStages) {
      const {stage, matchData} = mapFixtureFromMatch(matches);
      fixtures[stage] ? fixtures[stage].push(matchData) : fixtures[stage] = [matchData];
    }
    return fixtures;
}

export const useFixtureData = () => {
    const [fixtureData, setFixtureData] = useState<FixturesType>({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorMessage, setErrorMessage] =
      useState<string | undefined>(undefined);
  
    useEffect(() => {
      fetch(matchesEndpoint)
        .then((res) => res.json())
        .then(
          (result) => {
            console.log(result);
            setIsLoaded(true);
            setFixtureData(convertDataToFixture(result));
          },
          (error) => {
            setIsLoaded(true);
            setErrorMessage(error);
          }
        );
    }, []);
  
    return { fixtureData, isLoaded, errorMessage };
  };
  