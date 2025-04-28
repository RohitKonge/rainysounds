import React, { useEffect, useRef } from 'react';

const AudioPlayer = ({ isPlaying, volume, currentMood }) => {
  const audioRef = useRef(null);
  const gainNodeRef = useRef(null);
  const audioContextRef = useRef(null);

  const moodToAudioMap = {
    gentle: '/music1.mp3',
    thunder: '/music2.mp3',
    forest: '/music3.mp3',
    night: '/music4.mp3'
  };

  useEffect(() => {
    // Initialize audio context
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.connect(audioContextRef.current.destination);
    }

    // Load audio file
    const audio = new Audio(moodToAudioMap[currentMood]);
    audio.loop = true;
    audioRef.current = audio;

    const source = audioContextRef.current.createMediaElementSource(audio);
    source.connect(gainNodeRef.current);

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentMood]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioContextRef.current.resume();
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioContextRef.current.currentTime);
    }
  }, [volume]);

  return null; // This is a non-visual component
};

export default AudioPlayer;