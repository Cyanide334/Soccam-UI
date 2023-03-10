import React, {useEffect, useState} from "react";
import axios from "axios";
import BarChart from "../assets/barChart";
import PieChart from "../assets/pieChart";
import AreaChart from "../assets/areaChart";
import Heatmap from "./heatmap";

import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBIcon,
} from "mdb-react-ui-kit";

export default function Comparison({matchesForComparison, setTab}){
    // here we show the comparative performance of the team across multiple matches

    // get comparison data from server
    const [comparisonData, setComparisonData] = useState(null);

    // we also need to store chart data
    const [posessionAreaData, setPosessionAreaData] = useState(null);
    const [eventAreaData, setEventAreaData] = useState(null);

    useEffect(() => {
        console.log("getting comparison data for matches: " + matchesForComparison);
        if (matchesForComparison) {
            // matches for comparison is an array of match ids, which we will provide to the server
            // in the query params by using the axios params option
            axios.get("/api/match/comparison", {params: {matches: matchesForComparison}})
                .then(res => {
                    setComparisonData(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
            // for now set to dummy data
            const comparisonData2 = {
                posession: [
                    {
                        matchId: 1,
                        teamId: 1,
                        teamName: "Team 1",
                        color: "blue",
                        percentage: 30,
                        quarter1: 10,
                        quarter2: 10,
                        quarter3: 10,
                        quarter4: 10,
                        posessionData: {
                            max: 100,
                            data: [
                                {
                                    x: 0,
                                    y: 0,
                                    value: 0,
                                },
                                {
                                    x: 10,
                                    y: 1,
                                    value: 0,
                                },
                            ],
                        },
                    },
                    {
                        matchId: 2,
                        teamId: 2,
                        teamName: "Team 2",
                        color: "red",
                        percentage: 70,
                        quarter1: 90,
                        quarter2: 90,
                        quarter3: 90,
                        quarter4: 90,
                        posessionData: {
                            max: 100,
                            data: [
                                {
                                    x: 0,
                                    y: 0,
                                    value: 0,
                                },
                                {
                                    x: 10,
                                    y: 1,
                                    value: 0,
                                },
                            ],
                        },
                    },
                ],
                // each event will have a separate dataset, consisting of the chosen matches
                events: [
                    {
                        eventName: "Goals",
                        eventData: [
                            {
                                matchId: 1,
                                teamId: 1,
                                teamName: "Team 1",
                                total: 3,
                                quarter1: 1,
                                quarter2: 1,
                                quarter3: 1,
                                quarter4: 0,
                            },
                            {
                                matchId: 2,
                                teamId: 2,
                                teamName: "Team 2",
                                total: 1,
                                quarter1: 0,
                                quarter2: 0,
                                quarter3: 1,
                                quarter4: 0,
                            },
                        ],
                    },
                    {
                        eventName: "Shots",
                        eventData: [
                            {
                                matchId: 1,
                                teamId: 1,
                                teamName: "Team 1",
                                total: 10,
                                quarter1: 3,
                                quarter2: 3,
                                quarter3: 3,
                                quarter4: 1,
                            },
                            {
                                matchId: 2,
                                teamId: 2,
                                teamName: "Team 2",
                                total: 5,
                                quarter1: 1,
                                quarter2: 1,
                                quarter3: 2,
                                quarter4: 1,
                            },
                        ],
                    },
                    {
                        eventName: "Passes",
                        eventData: [
                            {
                                matchId: 1,
                                teamId: 1,
                                teamName: "Team 1",
                                total: 100,
                                quarter1: 20,
                                quarter2: 40,
                                quarter3: 5,
                                quarter4: 35,
                            },
                            {
                                matchId: 2,
                                teamId: 2,
                                teamName: "Team 2",
                                total: 100,
                                quarter1: 20,
                                quarter2: 40,
                                quarter3: 5,
                                quarter4: 35,
                            },
                        ],
                    },
                    {
                        eventName: "Tackles",
                        eventData: [
                            {
                                matchId: 1,
                                teamId: 1,
                                teamName: "Team 1",
                                total: 100,
                                quarter1: 20,
                                quarter2: 40,
                                quarter3: 5,
                                quarter4: 35,
                            },
                            {
                                matchId: 2,
                                teamId: 2,
                                teamName: "Team 2",
                                total: 100,
                                quarter1: 20,
                                quarter2: 40,
                                quarter3: 5,
                                quarter4: 35,
                            },
                        ],
                    },
                ],
            };
            setComparisonData(comparisonData2);
        }
    }, [matchesForComparison]);

    useEffect(() => {
        if (comparisonData) {
            // we need to convert the comparison data into a format that can be used by the charts
            // first we need to create the data for the posession chart
            const posessionAreaData2 = {
                labels: ['Total', 'Q1', 'Q2', 'Q3', 'Q4'],
                datasets: comparisonData.posession.map((data) => {
                    return {
                        fill: true,
                        label: data.teamName,
                        data: [data.percentage, data.quarter1, data.quarter2, data.quarter3, data.quarter4],
                    };
                }),     
            };
            setPosessionAreaData(posessionAreaData2);
            // now we need to create the data for the event charts
            const eventAreaData2 = comparisonData.events.map((event) => {
                return {
                    eventName: event.eventName,
                    labels: ['Total', 'Q1', 'Q2', 'Q3', 'Q4'],
                    datasets: event.eventData.map((data) => {
                        return {
                            fill: true,
                            label: "Match " + data.matchId,
                            data: [data.total, data.quarter1, data.quarter2, data.quarter3, data.quarter4],
                        };
                    }),
                };
            });
            setEventAreaData(eventAreaData2);
        }
    }, [comparisonData]);

    return (
        <>
        {!comparisonData || !posessionAreaData || !eventAreaData ? 
            <MDBCard>
              <MDBCardBody>
                <MDBCardText className="text-center">
                  <MDBRow className="py-4">
                    <MDBCol sm="12" >
                      <MDBIcon icon="eye-slash" size="3x" className="text-muted pb-2" />
                      <h4 className="text-muted">No Matches selected</h4>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow center>
                    <MDBCol lg="8" xl='6'>
                      <MDBBtn onClick={() => setTab("matches")} className="w-75">
                        Choose matches & teams for comparison
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
        :
        
            <>
                <MDBCard>
                    <MDBCardBody>
                        <MDBCardTitle>Posession</MDBCardTitle>
                        <MDBCardText>
                            <MDBRow>
                                {comparisonData.posession.map((data) => {
                                    return (
                                        <MDBCol lg="6">
                                            <MDBCard>
                                                <MDBCardBody>
                                                    <MDBCardTitle>
                                                        Match {data.matchId} - {data.percentage}%
                                                    </MDBCardTitle>
                                                    <MDBCardText>
                                                        <Heatmap posessionData={data} heatmapId={`comparison-${data.color}`} />
                                                    </MDBCardText>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                    );
                                })}
                            </MDBRow>
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
                <MDBCard className="mt-2">
                    <MDBCardBody>
                        <MDBCardTitle>Event Comparison</MDBCardTitle>
                        <MDBCardText>
                            <MDBRow>          
                                {eventAreaData.map((data) => {
                                    return (
                                        <MDBCol lg="6">
                                            <MDBCard className="mb-2">
                                                <MDBCardBody>
                                                    <MDBCardTitle>{data.eventName}</MDBCardTitle>
                                                    <MDBCardText>
                                                        <AreaChart data={data} />
                                                    </MDBCardText>
                                                </MDBCardBody>
                                            </MDBCard>
                                        </MDBCol>
                                    );
                                })}
                            </MDBRow>
                        </MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            </>
        }
        </>
    )
};
