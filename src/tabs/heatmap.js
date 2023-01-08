import React, { useState, useEffect } from 'react';
import feild from '../img/feild.jpg';
import h337 from 'heatmap.js';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage
} from 'mdb-react-ui-kit';

export default function Heatmap({posessionData, heatmapId}) {
    useEffect(() => {
        document.querySelector(`.${heatmapId} > canvas`)?.remove();
        var heatmapInstance = h337.create({
          // only container is required, the rest will be defaults
            container: document.querySelector(`.${heatmapId}`),
            radius: 40,
            maxOpacity: .6,
            minOpacity: 0,
            blur: .75
        });
        // now generate some random data
        var points = [];
        var max = 0;
        var width = 1000;
        var height = 1000;
        var len = 1000;
    
        while (len--) {
            var val = Math.floor(Math.random()*100);
            max = Math.max(max, val);
            var point = {
            x: Math.floor(Math.random()*width),
            y: Math.floor(Math.random()*height),
            value: val
            };
            points.push(point);
        }
        // heatmap data format
        var data = {
        max: max,
        data: points
        };
        // if you have a set of datapoints always use setData instead of addData
        // for data initialization
        heatmapInstance.repaint();
        heatmapInstance.setData(data);
    })
    
    
    return (
        <MDBCard >
            <MDBCardBody>
            <MDBCardTitle className='text-center '>{posessionData.name && posessionData.name}</MDBCardTitle>
            <div className={`${heatmapId}`} style={{
                backgroundImage: `url(${feild})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: 1,
                paddingTop: `${(346/569 * 100)}%`,
            }}>
            </div>
            </MDBCardBody>
        </MDBCard>
    );
}