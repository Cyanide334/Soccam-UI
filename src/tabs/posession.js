import React, { useState, useEffect } from 'react';
import Heatmap from './heatmap';
import PieChart from '../assets/pieChart';
import BarChart from '../assets/barChart';
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBIcon,
} from 'mdb-react-ui-kit';

const posessionData = {
    team1: {
        name: 'Team 1',
        color: 'blue',
        total: 30,
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
            ]
        }
    },
    team2: {
        name: 'Team 2',
        color: 'red',
        total: 70,
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
            ]
        }
    },
};

export default function Posession({matchId, setTab}) {

    const pieData = {
        labels: [posessionData.team1.name, posessionData.team2.name],
        datasets: [
          {
            label: 'Posession Percentage',
            data: [posessionData.team1.total, posessionData.team2.total],
          },
        ],
    };
    const barLabels = ['Total', 'Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'];
    const barData = {
        labels: barLabels,
        datasets: [
            {
                label: posessionData.team1.name,
                data: [
                    posessionData.team1.total,
                    posessionData.team1.quarter1,
                    posessionData.team1.quarter2,
                    posessionData.team1.quarter3,
                    posessionData.team1.quarter4
                ],
            },
            {
                label: posessionData.team2.name,
                data: [
                    posessionData.team2.total,
                    posessionData.team2.quarter1,
                    posessionData.team2.quarter2,
                    posessionData.team2.quarter3,
                    posessionData.team2.quarter4
                ],
            },
        ],
    };

    return (
        <>
        {!matchId &&
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
        {matchId &&
            <>
            <MDBRow className="h-100 mt-5">
                <MDBCol xxl="6">
                    <Heatmap posessionData={posessionData.team1} heatmapId={`posession-${posessionData.team1.color}`}/>
                </MDBCol>
                <MDBCol xxl="6">
                    <Heatmap posessionData={posessionData.team2} heatmapId={`posession-${posessionData.team2.color}`}/>
                </MDBCol>
            </MDBRow>
            <MDBCard  center className="mt-5">
                <MDBCardBody>
                    <MDBCardTitle className='text-center'>Posession Percentage</MDBCardTitle>
                        <MDBRow center>
                            <MDBCol md="6">
                                <PieChart data={pieData}/>
                            </MDBCol>
                            <MDBCol md="6">
                                <BarChart data={barData}/>
                            </MDBCol>
                        </MDBRow>
                </MDBCardBody>
            </MDBCard>
            </>
        }
        </>
    );
}