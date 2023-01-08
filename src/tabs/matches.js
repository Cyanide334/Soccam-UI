import React, { useState } from 'react';
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBBtn,
    MDBRadio,
    MDBIcon,
    MDBProgress,
    MDBProgressBar,
    MDBBadge,
} from 'mdb-react-ui-kit';

export default function Matches({setMatchForStats, setMatchesForComparison, setTab}){
    const data=[
        {
            matchId: 1,
            date: '2021-01-01',
            team1Name: 'Team 1',
            team2Name: 'Team 2',
            team1Goals: 3,
            team2Goals: 3,
            processedPercentage: 100,
        },
        {
            matchId: 2,
            date: '2021-01-02',
            team1Name: 'Team 3',
            team2Name: 'Team 4',
            team1Goals: 2,
            team2Goals: 1,
            processedPercentage: 100,
        },
        {
            matchId: 3,
            date: '2021-01-03',
            team1Name: 'Team 5',
            team2Name: 'Team 6',
            team1Goals: 1,
            team2Goals: 2,
            processedPercentage: 100,
        },
        {
            matchId: 4,
            date: '2021-01-04',
            team1Name: 'Team 7',
            team2Name: 'Team 8',
            team1Goals: 1,
            team2Goals: 0,
            processedPercentage: 100,
        },
        {
            matchId: 5,
            date: '2021-01-05',
            team1Name: 'Team 9',
            team2Name: 'Team 10',
            team1Goals: 0,
            team2Goals: 1,
            processedPercentage: 75,
        },
    ];
    
    // list of match-team pairs selected by user for comparison
    // e.g. [{matchId: 1, teamId: 1}, {matchId: 2, teamId: 2}]
    const [selectedMatches, setSelectedMatches] = useState([]);

    const handleMatchSelect = (matchId, teamId) => {
        // if match-team pair is already selected, remove it from state list
        if (selectedMatches.some((match) => match.matchId === matchId && match.teamId === teamId)) {
            setSelectedMatches(selectedMatches.filter((match) => match.matchId !== matchId && match.teamId !== teamId));
        }
        // if match-team pair is not selected, but another match-team pair is selected for the same match, remove it from state list and add the new pair
        // but we need to do this in a single call to setSelectedMatches
        else if (selectedMatches.some((match) => match.matchId === matchId)) {
            setSelectedMatches(selectedMatches.map((match) => {
                if (match.matchId === matchId) {
                    return {matchId, teamId};
                }
                return match;
            }));
        }
        // if match-team pair is not selected, and no other match-team pair is selected for the same match, add it to state list
        else {
            setSelectedMatches([...selectedMatches, {matchId, teamId}]);
        }
    }

    return (
        <MDBCard>
            <MDBCardBody>
                {/* Add a refresh button, with just the icon  */}
                <MDBRow>
                    <MDBCol sm='12'>
                        <MDBBtn floating color='primary' className='float-end'>
                            <MDBIcon fas icon='sync' />
                        </MDBBtn>
                    </MDBCol>
                </MDBRow>
                <MDBRow  className='justify-content-center text-center'>
                    <MDBCol sm='12'>
                        <MDBTable hover responsive className='text-nowrap' >
                            <MDBTableHead color="blue-grey lighten-4">
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Team 1</th>
                                <th>Team 2</th>
                                <th>Score</th>
                                <th>Analysis</th>
                                <th>View Statistics</th>
                                <th>Compare Team Matches</th>
                            </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {data.map((match) => (
                                    <tr key={match.matchId}>
                                        <td>{match.matchId}</td>
                                        <td>{match.date}</td>
                                        <td>{match.team1Name}</td>
                                        <td>{match.team2Name}</td>
                                        <td>{match.team1Goals} : {match.team2Goals}</td>
                                        <td>
                                            <MDBProgress>
                                                <MDBProgressBar width={match.processedPercentage} valuemin={0} valuemax={100} />
                                            </MDBProgress>
                                            <MDBBadge color={match.processedPercentage === 100 ? 'primary':'warning'} pill className=''>
                                                {match.processedPercentage}%
                                            </MDBBadge>
                                        </td>
                                        <td>
                                            <MDBBtn
                                                color='primary'
                                                onClick={() => {
                                                    setMatchForStats(match);
                                                    setTab("eventStats");
                                                }}
                                                disabled={match.processedPercentage < 100}
                                            >
                                                Statistics
                                            </MDBBtn>
                                        </td>
                                        <td>
                                            <MDBRadio
                                                id={`${match.matchId}-team1-comparison`}
                                                name={match.matchId}
                                                inline
                                                label={match.team1Name}
                                                onChange={() => handleMatchSelect(match.matchId, 1)}
                                                disabled={match.processedPercentage < 100}
                                            />
                                            <MDBRadio
                                                id={`${match.matchId}-team2-comparison`}
                                                name={match.matchId}
                                                inline
                                                label={match.team2Name}
                                                onChange={() => handleMatchSelect(match.matchId, 2)}
                                                disabled={match.processedPercentage < 100}
                                            />
                                            {/* Allow deselecting of both radio buttons using a cross icon*/}
                                            <MDBBtn
                                                outline size='sm'
                                                floating tag='a'
                                                onClick={() => {
                                                    //deselect both radio buttons
                                                    document.getElementById(`${match.matchId}-team1-comparison`).checked = false;
                                                    document.getElementById(`${match.matchId}-team2-comparison`).checked = false;
                                                    //remove match-team pair from state list
                                                    setSelectedMatches(selectedMatches.filter((m) => m.matchId !== match.matchId));
                                                }}
                                                disabled={match.processedPercentage < 100}
                                            >
                                            <MDBIcon fas icon='times' /></MDBBtn>
                                        </td>
                                    </tr>
                                ))}
                            </MDBTableBody>
                        </MDBTable>
                    </MDBCol>
                </MDBRow>
                {selectedMatches.length > 1 && (
                    <MDBRow className='justify-content-end text-end'>
                        <MDBCol sm='12'>
                            <MDBBtn color='primary' onClick={() => {
                                setMatchesForComparison(selectedMatches);
                                setTab("comparison");
                            }}>
                                Compare
                            </MDBBtn>
                        </MDBCol>
                    </MDBRow>
                )}
            </MDBCardBody>
        </MDBCard>
    )
}