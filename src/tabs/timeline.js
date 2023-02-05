import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    MDBCard,
    MDBCardBody,
    MDBCardText,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBIcon,
    MDBBadge,
} from "mdb-react-ui-kit";


export default function Timeline({matchId, setTab, setVideoTime}) {
  // get timeline data from server
  const [timelineData, setTimelineData] = useState(null);
  useEffect(() => {
    console.log("getting timeline data for match: " + matchId);
    if (matchId) {
      axios.get(`/api/match/${matchId}/timeline`)
        .then(res => {
          setTimelineData(res.data);
        })
        .catch(err => {
          console.log(err);
        });
      // for now set to dummy data
      const sampleTimelineData = [
        {
          teamId: 1,
          teamName: "Team 1",
          timestamp: "00:00:30",
          event: "Shot",
          description: "Team 1 took a shot",
        },
        {
          teamId: 2,
          teamName: "Team 2",
          timestamp: "00:00:40",
          event: "Shot",
          description: "Team 2 took a shot",
        },
        {
          teamId: 1,
          teamName: "Team 1",
          timestamp: "00:00:50",
          event: "Shot",
          description: "Team 1 took a shot",
        },
        {
          teamId: 2,
          teamName: "Team 2",
          timestamp: "00:01:00",
          event: "Shot",
          description: "Team 2 took a shot",
        },
        {
          teamId: 1,
          teamName: "Team 1",
          timestamp: "00:01:10",
          event: "Shot",
          description: "Team 1 took a shot",
        },
        {
          teamId: 2,
          teamName: "Team 2",
          timestamp: "00:01:20",
          event: "Shot",
          description: "Team 2 took a shot",
        },
      ];
      setTimelineData(sampleTimelineData);
    }
  }, [matchId]);

  return (
    <div className="">
      {!timelineData &&
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
      {/* Event timeline for match events such as shots, passes, goals  etc*/}
      {timelineData &&
        <section className="rounded-5  grey-background">
          <div className="container py-5">
            <div className="main-timeline">
              {timelineData.map((event, index) => (
                <div className={event.teamId===1 ? "timeline left" : "timeline right"}>
                  <MDBCard>
                    <MDBCardBody className="p-4 rounded" style={{backgroundColor: event.teamId === 1 ? '#9ad0f5' : '#ffb1c1'}}>
                      <MDBRow>
                        <MDBCol size="6" className="text-start">
                          <h3>{event.event}</h3>
                        </MDBCol>
                        <MDBCol size="6" className="text-end">
                          <MDBBtn
                            size='sm'
                            outline
                            onClick={() => setVideoTime(event.timestamp)}
                            color={event.teamId === 1 ? 'primary' : 'danger'}
                          >
                            <MDBIcon icon="clock" size="1x" className="px-2"/>
                            <p className="d-none d-sm-inline">{event.timestamp}</p>
                          </MDBBtn>
                        </MDBCol>
                      </MDBRow>
                      <p class="mb-0">{event.description}</p>
                    </MDBCardBody>
                  </MDBCard>
                </div>
              ))}
            </div>
          </div>
        </section>
      }
    </div>
  );
}
