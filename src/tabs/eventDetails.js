import React, { useState, useRef } from 'react';
import BarChart from '../assets/barChart';
import {
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBIcon,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText, 
} from 'mdb-react-ui-kit';

export default function EventDetails({matchId, eventName, setVideoTime}) {
    const eventData = {
        event: 'Shots',
        team1: {
            name: 'Team 1',
            color: 'blue',
            total: 12,
            quarter1: 3,
            quarter2: 3,
            quarter3: 3,
            quarter4: 3,
        },
        team2: {
            name: 'Team 2',
            color: 'red',
            total: 8,
            quarter1: 2,
            quarter2: 2,
            quarter3: 2,
            quarter4: 2,
        },
        timestamps: [
            {
                timestamp: "00:00:10",
                teamId: 1,
            },
            {
                timestamp: "00:00:20",
                teamId: 2,
            },
            {
                timestamp: "00:00:30",
                teamId: 1,
            },
            {
                timestamp: "00:00:40",
                teamId: 2,
            },
            {
                timestamp: "00:00:50",
                teamId: 1,
            },
            {
                timestamp: "00:01:00",
                teamId: 2,
            },
            {
                timestamp: "00:01:10",
                teamId: 1,
            },
            {
                timestamp: "00:01:20",
                teamId: 2,
            },
            {
                timestamp: "00:01:30",
                teamId: 1,
            },
            {
                timestamp: "00:01:40",
                teamId: 2,
            },
            {
                timestamp: "00:01:50",
                teamId: 1,
            },
            {
                timestamp: "00:02:00",
                teamId: 2,
            }
        ]    
    };
    const labels = ['Total', 'Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'];
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: eventData.team1.name,
                data: [
                    eventData.team1.total,
                    eventData.team1.quarter1,
                    eventData.team1.quarter2,
                    eventData.team1.quarter3,
                    eventData.team1.quarter4
                ],
            },
            {
                label: eventData.team2.name,
                data: [
                    eventData.team2.total,
                    eventData.team2.quarter1,
                    eventData.team2.quarter2,
                    eventData.team2.quarter3,
                    eventData.team2.quarter4
                ],
            },
        ],
    };

    const [eventModal, setEventModal] = useState(false);
    const toggleShow = () => setEventModal(!eventModal);

    return (
        <>
            <MDBBtn color='primary' outline onClick={toggleShow}>
                View Details
            </MDBBtn>
            <MDBModal tabIndex='-1' show={eventModal} setShow={setEventModal} >
                <MDBModalDialog  size="lg" style={{backgroundColor: '#F8F8FF'}}>
                    <MDBModalContent className='justify-content-center text-center'>
                        <MDBModalHeader>
                            <MDBModalTitle>{eventData.event}</MDBModalTitle>
                            <MDBBtn
                                className='btn-close'
                                color='none'
                                onClick={toggleShow}
                            ></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <BarChart data={chartData} />
                            <div class="main-timeline" >
                                {eventData.timestamps?.map((event, index) => (
                                    <div class={event.teamId===1 ? "timeline left" : "timeline right"}>
                                        <MDBCard>
                                            <MDBCardBody className="p-1 rounded-start rounded-top" style={{backgroundColor: event.teamId === 1 ? '#9ad0f5' : '#ffb1c1'}}>
                                                <MDBRow>
                                                    <MDBCol size="6" className="text-start">
                                                    <h6>
                                                        {eventData.event.substring(0,eventData.event.length-1)}
                                                    </h6>
                                                    </MDBCol>
                                                    <MDBCol size="6" className="text-end">
                                                    <MDBBtn
                                                        size='sm'
                                                        outline
                                                        onClick={() => setVideoTime(event.timestamp)}
                                                        color={event.teamId === 1 ? 'primary' : 'danger'}
                                                    >
                                                        <MDBIcon icon="clock" size="1x" className="px-2"/>
                                                        {event.timestamp}
                                                    </MDBBtn>
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCardBody>
                                        </MDBCard>
                                    </div>
                                ))}
                            </div>
                        </MDBModalBody>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}