SHOW DATABASES;
CREATE DATABASE FIFA;
USE FIFA;

CREATE TABLE Players
(
    PlayerId                int,
    Name                    varchar(25),
    Age                     int,
    Photo                   varchar(64),
    Nationality             varchar(20),
    Flag                    varchar(64),
    OverallRating           int,
    Potential               int,
    Club                    varchar(25),
    ClubLogo                varchar(64),
    Value                   varchar(8),
    Wage                    varchar(8),
    InternationalReputation int,
    Skill                   int,
    JerseyNumber            int,
    ContractValidUntil      varchar(9),
    Height                  varchar(8),
    Weight                  varchar(8),
    NPassing                int,
    NBallControl            int,
    NAdjustedAgility        int,
    NStamina                int,
    NStrength               int,
    NPositioning            int,
    GKPenalties             int,
    GKDiving                int,
    GKHandling              int,
    GKKicking               int,
    GKPositioning           int,
    GKReflexes              int,
    BestPosition            varchar(3),
    BestOverallRating       int,
    ReleaseClause           varchar(8),
    PRIMARY KEY (PlayerId)
);

DESCRIBE Players;

SELECT * FROM Players order by PlayerId;

CREATE TABLE Matches
(
    MatchId        int,
    Division       varchar(3),
    Date           varchar(10),
    Time           varchar(5),
    HomeTeam       varchar(25),
    AwayTeam       varchar(25),
    FullTimeGoalsH int,
    FullTimeGoalsA int,
    HalfTimeGoalsH int,
    HalfTimeGoalsA int,
    ShotsH         int,
    ShotsA         int,
    ShotsOnTargetH int,
    ShotsOnTargetA int,
    FoulsH         int,
    FoulsA         int,
    CornersH       int,
    CornersA       int,
    YellowCardsH   int,
    YellowCardsA   int,
    RedCardsH      int,
    RedCardsA      int,
    PRIMARY KEY (MatchId)
);

SELECT *
FROM Matches;

## TASK 4
WITH indexedTable AS (
SELECT @ROWNO := @ROWNO +1 AS ROWNO, T.*
    FROM (
        SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals
        FROM Matches
        WHERE Division = '${league}'
        ORDER BY HomeTeam, AwayTeam) T,
        (SELECT @ROWNO := 0) T3
ORDER BY ROWNO)
SELECT MatchId, Date, Time, Home, Away, HomeGoals, AwayGoals FROM indexedTable
WHERE ROWNO >= ('${req.query.page}' - 1) * '${req.query.pagesize}' + 1 AND ROWNO <= '${req.query.page}' * '${req.query.pagesize}';

## TASK 5
SELECT PlayerId, Name, Nationality, BestOverallRating AS Rating, Potential, Club, Value
FROM Players
ORDER BY Name;

WITH indexedTable AS (
SELECT @ROWNO := @ROWNO +1 AS ROWNO, T.*
    FROM (
        SELECT PlayerId, Name, Nationality, BestOverallRating AS Rating, Potential, Club, Value
        FROM Players
        ORDER BY Name) T,
        (SELECT @ROWNO := 0) T3
ORDER BY ROWNO
)
SELECT PlayerId, Name, Nationality, Rating, Potential, Club, Value FROM indexedTable
WHERE ROWNO >= 11 AND ROWNO <= 20;

# TASK 6
SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals,
       FullTimeGoalsA AS AwayGoals, HalfTimeGoalsH AS HTHomeGoals, HalfTimeGoalsA AS HTAwayGoals,
       ShotsH AS ShotsHome, ShotsA AS ShotsAway, ShotsOnTargetH AS ShotsOnTargetHome,
       ShotsOnTargetA AS ShotsOnTargetAway, FoulsH AS FoulsHome, FoulsA AS FoulsAway,
       CornersH AS CornersHome, CornersA AS CornersAway, YellowCardsH AS YCHome,
       YellowCardsA AS YCAway, RedCardsH AS RCHome, RedCardsA AS RCAway
FROM Matches
WHERE MatchId = -1;

# Task 7

SELECT PlayerId, Name, Age, Photo, Nationality, Flag, OverallRating AS Rating, Potential, Club,
       Clublogo, Value, Wage, InternationalReputation, Skill, JerseyNumber, ContractValidUntil,
       Height, Weight, BestPosition, BestOverallRating, ReleaseClause,
       GKPenalties, GKDiving, GKHandling, GKKicking, GKPositioning, GKReflexes
FROM Players
WHERE PlayerId = 2 AND BestPosition = 'GK';

SELECT PlayerId, Name, Age, Photo, Nationality, Flag, OverallRating AS Rating, Potential, Club,
       Clublogo, Value, Wage, InternationalReputation, Skill, JerseyNumber, ContractValidUntil,
       Height, Weight, BestPosition, BestOverallRating, ReleaseClause,
       NPassing, NBallControl, NAdjustedAgility, NStamina, NStrength, NPositioning
FROM Players
WHERE PlayerId = 2 AND BestPosition != 'GK';

# Task 8
        WITH indexedTable AS (
            SELECT @ROWNO := @ROWNO +1 AS ROWNO, T.*
            FROM (SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals
                FROM Matches
                WHERE HomeTeam LIKE '${req.query.Home}%' AND AwayTeam LIKE '${req.query.Away}%'
                ORDER BY HomeTeam, AwayTeam) T, (SELECT @ROWNO := 0) T3
            ORDER BY ROWNO)
        SELECT MatchId, Date, Time, Home, Away, HomeGoals, AwayGoals FROM indexedTable
        WHERE ROWNO >= ${page1} AND ROWNO <= ${page2};


        SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals
        FROM Matches
        WHERE HomeTeam LIKE '${req.query.Home}%' AND AwayTeam LIKE '${req.query.Away}%'
        ORDER BY HomeTeam, AwayTeam

# Task 9
SELECT * FROM Players order by PlayerId;

        WITH indexedTable AS (
            SELECT @ROWNO := @ROWNO +1 AS ROWNO, T.*                                                                                      
            FROM (                                                                                                                    
                SELECT PlayerId, Name, Nationality, BestOverallRating AS Rating, Potential, Club, Value                               
                FROM Players                                                                                                          
                WHERE Name LIKE '%${req.query.Name}%' AND Nationality LIKE '%${req.query.Nationality}%' AND Club LIKE '%${req.query.Club}%'
                    AND BestOverallRating >= ${RatingLow} AND BestOverallRating <= ${RatingHigh}                  
                    AND Potential >= ${PotentialLow} AND Potential <= ${PotentialHigh}                            
                ORDER BY Name) T, (SELECT @ROWNO := 0) T3                                                                             
            ORDER BY ROWNO                                                                                                                
        )                                                                                                                             
        SELECT PlayerId, Name, Nationality, Rating, Potential, Club, Value FROM indexedTable                                          

        SELECT PlayerId, Name, Nationality, BestOverallRating AS Rating, Potential, Club, Value                               
        FROM Players
        WHERE Name LIKE '%${req.query.Name}%' AND Nationality LIKE '%${req.query.Nationality}%' AND Club LIKE '%${req.query.Club}%'
            AND BestOverallRating >= ${RatingLow} AND BestOverallRating <= ${RatingHigh}
            AND Potential >= ${PotentialLow} AND Potential <= ${PotentialHigh}
            ORDER BY Name









