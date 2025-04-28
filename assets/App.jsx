import React, { useState, useEffect } from 'react';
import AudioPlayer from './AudioPlayer';

const App = () => {
  const [volume, setVolume] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMood, setCurrentMood] = useState('gentle');
  const [isLoading, setIsLoading] = useState(false);

  const moods = [
    { id: 'gentle', name: 'Gentle Rain', icon: '🌧️' },
    { id: 'thunder', name: 'Thunder Storm', icon: '⛈️' },
    { id: 'forest', name: 'Forest Rain', icon: '🌳' },
    { id: 'night', name: 'Night Rain', icon: '🌙' }
  ];

  const handleMoodChange = (moodId) => {
    setIsLoading(true);
    setCurrentMood(moodId);
    // Stop current playback when changing moods
    setIsPlaying(false);
    // Add a small delay to simulate loading and prevent audio overlap
    setTimeout(() => {
      setIsLoading(false);
      setIsPlaying(true);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Floating Navigation */}
      <nav className="fixed top-6 right-6 glass-morphism p-4 space-x-6">
        <a href="/blog" className="text-white/90 hover:text-white transition-all">Blog</a>
        <a href="#about" className="text-white/90 hover:text-white transition-all">About</a>
      </nav>

      {/* Main Content */}
      <main className="w-full max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 serif tracking-tight">
            Rainy Sounds
          </h1>
          <p className="text-xl text-white/90">
            Immerse yourself in the peaceful ambiance of rain
          </p>
        </div>

        {/* Player Card */}
        <div className="glass-morphism p-8 mb-12">
          {/* Mood Selection */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {moods.map(mood => (
              <button
                key={mood.id}
                onClick={() => handleMoodChange(mood.id)}
                className={`p-4 rounded-lg transition-all ${
                  currentMood === mood.id
                    ? 'bg-white/20 shadow-lg scale-105'
                    : 'bg-white/10 hover:bg-white/15 hover:scale-102'
                } ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
                disabled={isLoading}
              >
                <span className="text-2xl mb-2 block">{mood.icon}</span>
                <span className="font-medium">{mood.name}</span>
              </button>
            ))}
          </div>

          {/* Player Controls */}
          <div className="flex flex-col items-center space-y-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 
                         flex items-center justify-center transition-all hover:scale-105
                         ${isLoading ? 'opacity-50 cursor-wait' : ''}`}
              disabled={isLoading}
            >
              <span className="text-2xl">
                {isLoading ? '⌛' : isPlaying ? '⏸️' : '▶️'}
              </span>
            </button>

            {/* Volume Control */}
            <div className="w-full max-w-md space-y-2">
              <div className="flex justify-between text-sm text-white/70">
                <span>Volume</span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: '🎯', title: 'Focus Better', text: 'Enhance your concentration with ambient rain' },
            { icon: '😌', title: 'Reduce Stress', text: 'Let the calming sounds wash away your tension' },
            { icon: '💤', title: 'Sleep Well', text: 'Fall asleep faster with soothing rain sounds' }
          ].map((feature, i) => (
            <div key={i} className="glass-morphism p-6 text-center hover-glow transition-all">
              <span className="text-3xl mb-4 block">{feature.icon}</span>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/80">{feature.text}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Audio Player Component */}
      <AudioPlayer
        isPlaying={isPlaying}
        volume={volume}
        currentMood={currentMood}
      />

      {/* Footer */}
      <footer className="w-full max-w-4xl text-center text-white/60 py-6">
        <p>© 2025 RainySounds.live • Made with 💙 for better focus</p>
      </footer>
    </div>
  );
};

export default App;