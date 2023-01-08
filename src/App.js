import soccamLogo from './img/soccam.png'
import './App.css';
import React, { useState, useRef } from 'react';
import EventsSummary from './tabs/eventsSummary';
import Posession from './tabs/posession';
import Matches from './tabs/matches';
import UploadMatch from './tabs/upload';
import Timeline from './tabs/timeline';
import Comparison from './tabs/comparison';
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBBtn,
  MDBCardImage,
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';

export default function App() {
  const [activeTab, setActiveTab] = useState('eventStats');
  const handleChangeTab = (value) => {
    if (value === activeTab) {
      return;
    }
    setActiveTab(value);
  };

  const [selectedMatchId, setSelectedMatchId] = useState(null);
  const [selectedMatchComparison, setSelectedMatchComparison] = useState(null);

  const handleSetSelectedMatch = (match) => {
    setSelectedMatchId(match);
  }
  const handleSetSelectedMatchComparison = (match) => {
    setSelectedMatchComparison(match);
  }

  const [uploadedMatchVideo, setUploadedMatchVideo] = useState(null);
  const handleSetUploadedMatchVideo = (video) => {
    setUploadedMatchVideo(video);

  }

  const videoRef = useRef(null);
  //time is given in hh:mm:ss format, convert to seconds
  const seekTo = (time) => {
    // dont do anything if video is not loaded
    if (!videoRef.current) {
      return;
    }
    // or if no match is selected
    if (!uploadedMatchVideo) {
      return;
    }
    const [h, m, s] = time.split(':');
    const seconds = (+h * 60 * 60) + (+m * 60) + (+s);
    videoRef.current.currentTime = seconds;
  }

  return (
    <MDBRow center className="w-100" style={{height: '85%', overflow: 'auto'}}>
      <MDBCol md='9'>
        <MDBCard shadow='5' border='secondary' className='h-100'>
          <MDBCardImage src={soccamLogo} alt='...' fluid className='mx-auto' style={{maxWidth:'300px'}} />
          <MDBCardBody className='grey-background'>
            <MDBCardTitle className='mb-5 text-center'>
              {uploadedMatchVideo && (
                <video
                  className="mb-5"
                  width="620"
                  height=""
                  controls
                  src={uploadedMatchVideo}
                  ref={videoRef}
                />
              )}
              <MDBRow center className='text-center team-header'>
                <MDBCol size='3' md='2' >
                  Team 1
                </MDBCol>
                <MDBCol size='2' md='1'>
                  3
                </MDBCol>
                <MDBCol size='1'>
                  :
                </MDBCol>
                <MDBCol size='2' md='1'>
                  1
                </MDBCol>
                <MDBCol size='3' md='2'>
                  Team 2
                </MDBCol>
              </MDBRow>
            </MDBCardTitle>
            <MDBCardText>
              <MDBTabs justify className='mb-3 pb-3'>
                <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleChangeTab('matches')} active={activeTab === 'matches'}>
                    <MDBIcon fas icon='list' className='me-2' /> Matches
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleChangeTab('eventStats')} active={activeTab === 'eventStats'}>
                    <MDBIcon fas icon='chart-line' className='me-2' /> Event Stats
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleChangeTab('posessionStats')} active={activeTab === 'posessionStats'}>
                    <MDBIcon fas icon='chart-pie' className='me-2' /> Posession Stats
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleChangeTab('uploadMatch')} active={activeTab === 'uploadMatch'}>
                    <MDBIcon fas icon='upload' className='me-2' /> Upload Match
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleChangeTab('timeline')} active={activeTab === 'timeline'}>
                    <MDBIcon fas icon='comments' className='me-2' /> Timeline
                  </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleChangeTab('comparison')} active={activeTab === 'comparison'}>
                    <MDBIcon fas icon='scale-unbalanced' className='me-2' /> Comparison
                  </MDBTabsLink>
                </MDBTabsItem>
              </MDBTabs>

              <MDBTabsContent>
                <MDBTabsPane show={activeTab === 'eventStats'}>
                  <EventsSummary
                    matchId={selectedMatchId}
                    setTab={handleChangeTab}
                    setVideoTime={seekTo}
                  />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === 'posessionStats'}>
                  <Posession
                    matchId={selectedMatchId}
                    setTab={handleChangeTab}
                  />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === 'matches'}>
                  <Matches
                    setTab={handleChangeTab}
                    setMatchForStats={handleSetSelectedMatch}
                    setMatchesForComparison={handleSetSelectedMatchComparison}
                  />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === 'uploadMatch'}>
                  <UploadMatch
                    setTab={handleChangeTab}
                    setMatchVideo={handleSetUploadedMatchVideo}
                  />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === 'timeline'}>
                  <Timeline
                    matchId={selectedMatchId}
                    setTab={handleChangeTab}
                    setVideoTime={seekTo}
                  />
                </MDBTabsPane>
                <MDBTabsPane show={activeTab === 'comparison'}>
                  <Comparison
                    matchesForComparison={selectedMatchComparison}
                    setTab={handleChangeTab}
                    setVideoTime={seekTo}
                  />
                </MDBTabsPane>
              </MDBTabsContent>
            </MDBCardText>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
  );
}


