import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventDetails from './eventDetails';
import {
    MDBRow,
    MDBCol,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBBtn,
    MDBIcon,
} from 'mdb-react-ui-kit';

// shows a summary for event statistics such as number of shots, goals, passes, crosses etc.

export default function EventsSummary({matchId, setTab, setVideoTime}) {
    // get stat summary data from server
    const [statSummaryData, setStatSummaryData] = useState(null);
    useEffect(() => {
        console.log("getting stat summary data for match: " + matchId)
        if (matchId) {
            axios.get(`/api/match/${matchId}/statSummary`)
                .then(res => {
                    setStatSummaryData(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
            console.log("getting DUMMY stat summary data for match: " + matchId)
            // for now set to dummy data
            const statSummaryData2 = {
                team1: {
                    name: 'Team 1',
                    shots: 10,
                    goals: 3,
                    passes: 100,
                    crosses: 10,
                    fouls: 10,
                    offsides: 10,
                    corners: 10,
                    yellowCards: 10,
                    redCards: 10,
                    possession: 10,
                },
                team2: {
                    name: 'Team 2',
                    shots: 10,
                    goals: 3,
                    passes: 100,
                    crosses: 10,
                    fouls: 10,
                    offsides: 10,
                    corners: 10,
                    yellowCards: 10,
                    redCards: 10,
                    possession: 10,
                },
            };
            setStatSummaryData(statSummaryData2);
        }
    }, [matchId]);
    
    return (
        <>
        {!statSummaryData &&
            <MDBCard>
              <MDBCardBody>
                <MDBCardText className="text-center">
                  <MDBRow className="py-4">
                    <MDBCol sm="12" >
                      <MDBIcon icon="video-slash shar" size="3x" className="text-muted" />
                      <h4 className="text-muted">No video selected</h4>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow center>
                    <MDBCol md="6" lg="4">
                      <MDBBtn onClick={() => setTab("matches")} className="w-75 mb-2">
                        Choose a video
                      </MDBBtn>
                    </MDBCol>
                    <MDBCol md="6" lg="4">
                      <MDBBtn onClick={() => setTab("uploadMatch")} className="w-75">
                        Upload a video
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
        }
        {statSummaryData &&
            <MDBRow center className="h-100">
                <MDBCol lg="9">
                    <MDBTable hover align='middle' striped responsive className='text-center text-nowrap'>
                        <MDBTableHead>
                            <tr>
                                <th>{statSummaryData.team1.name}</th>
                                <th>Event</th>
                                <th>{statSummaryData.team2.name}</th>
                                <th></th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            <tr>
                                <td>{statSummaryData.team1.shots}</td>
                                <td>Shots</td>
                                <td>{statSummaryData.team2.shots}</td>
                                <td>
                                    <EventDetails setVideoTime={setVideoTime} matchId={matchId} eventName="shot"/>
                                </td>
                            </tr>
                            <tr>
                                <td>{statSummaryData.team1.goals}</td>
                                <td>Goals</td>
                                <td>{statSummaryData.team2.goals}</td>
                                <td>
                                    <EventDetails setVideoTime={setVideoTime} matchId={matchId} eventName="goal"/>
                                </td>
                            </tr>
                            <tr>
                                <td>{statSummaryData.team1.passes}</td>
                                <td>Passes</td>
                                <td>{statSummaryData.team2.passes}</td>
                                <td>
                                    <EventDetails setVideoTime={setVideoTime} matchId={matchId} eventName="pass"/>
                                </td>
                            </tr>
                            <tr>
                                <td>{statSummaryData.team1.crosses}</td>
                                <td>Crosses</td>
                                <td>{statSummaryData.team2.crosses}</td>
                                <td>
                                    <EventDetails setVideoTime={setVideoTime} matchId={matchId} eventName="cross"/>
                                </td>
                            </tr>
                            <tr>
                                <td>{statSummaryData.team1.fouls}</td>
                                <td>Fouls</td>
                                <td>{statSummaryData.team2.fouls}</td>
                                <td>
                                    <EventDetails setVideoTime={setVideoTime} matchId={matchId} eventName="foul"/>
                                </td>
                            </tr>
                            <tr>
                                <td>{statSummaryData.team1.offsides}</td>
                                <td>Offsides</td>
                                <td>{statSummaryData.team2.offsides}</td>
                                <td>
                                    <EventDetails setVideoTime={setVideoTime} matchId={matchId} eventName="offside"/>
                                </td>
                            </tr>
                            <tr>
                                <td>{statSummaryData.team1.corners}</td>
                                <td>Corners</td>
                                <td>{statSummaryData.team2.corners}</td>
                                <td>
                                    <EventDetails setVideoTime={setVideoTime} matchId={matchId} eventName="corner"/>
                                </td>
                            </tr>
                            <tr>
                                <td>{statSummaryData.team1.yellowCards}</td>
                                <td>Yellow Cards</td>
                                <td>{statSummaryData.team2.yellowCards}</td>
                                <td>
                                    <EventDetails setVideoTime={setVideoTime} matchId={matchId} eventName="yellowCard"/>
                                </td>
                            </tr>
                            <tr>
                                <td>{statSummaryData.team1.redCards}</td>
                                <td>Red Cards</td>
                                <td>{statSummaryData.team2.redCards}</td>
                                <td>
                                    <EventDetails setVideoTime={setVideoTime} matchId={matchId} eventName="redCard"/>
                                </td>
                            </tr>
                            <tr>
                                <td>{statSummaryData.team1.possession}</td>
                                <td>Possession</td>
                                <td>{statSummaryData.team2.possession}</td>
                                <td>
                                    <EventDetails setVideoTime={setVideoTime} matchId={matchId} eventName="posession"/>
                                </td>
                            </tr>
                        </MDBTableBody>
                    </MDBTable>
                </MDBCol>
            </MDBRow>
        }
        </>
    );
}