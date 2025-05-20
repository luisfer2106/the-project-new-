import React from 'react';
import videoFile from './72488-543388303.mp4'; // Importamos el video
import './VideoFondo.css';

const VideoFondo = () => {
  return (
    <div className="video-container">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="video-fondo"
      >
        <source src={videoFile} type="video/mp4" />
        Tu navegador no soporta el elemento video.
      </video>
      <div className="contenido-sobre-video">
       
      </div>
    </div>
  );
};

export default VideoFondo;
