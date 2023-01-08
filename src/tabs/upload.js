import React, {useRef, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBContainer,
    MDBIcon,
    MDBRipple,
    
} from 'mdb-react-ui-kit';

export default function UploadMatch({setMatchVideo, setTab}) {
    
    const inputRef = useRef();
    const [source, setSource] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setSource(url);
        setMatchVideo(url);
        setTab("matches");
    };

    const handleChoose = (event) => {
        inputRef.current.click();
    };

    return (
        <MDBCard>
            <MDBCardBody>
                <MDBCardText>
                    <MDBContainer className='text-center'>
                        <MDBRipple
                            className='bg-image hover-overlay shadow-1-strong rounded w-100'
                            rippleTag='div'
                            rippleColor='light'
                        >
                            <div onClick={handleChoose} className='hover dropzone border border-secondary  rounded-3 p-5 h4' style={{backgroundColor: '#fafafa'}}>
                                <input
                                    ref={inputRef}
                                    className="d-none"
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".mov,.mp4"
                                />
                                <a className="text-muted px-2">Upload video</a>
                                <MDBIcon icon='upload' size='1x' className='text-secondary' />
                            </div>
                        </MDBRipple>
                    </MDBContainer>
                </MDBCardText>
            </MDBCardBody>
        </MDBCard>    
    );
}