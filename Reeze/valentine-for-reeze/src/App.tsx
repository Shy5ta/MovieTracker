import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

// Added 'loading' to the stages
type AppStage = 'envelope' | 'intro' | 'loading' | 'asking' | 'accepted' | 'note';

const App: React.FC = () => {
  const [appStage, setAppStage] = useState<AppStage>('envelope');
  const [noClickCount, setNoClickCount] = useState<number>(0);
  const [noButtonStage, setNoButtonStage] = useState<number>(0);
  const [hateClickCount, setHateClickCount] = useState<number>(0);
  const [yesHovered, setYesHovered] = useState(false);
  const [noHovered, setNoHovered] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(0);

  const targetName = "Reeze Moodaley"; 
  const routeDistance = 898; 
  const errorSoundUrl = "https://www.myinstants.com/media/sounds/windows-error-sound-effect.mp3";

  const loadingMessages = [
    "$ git init",
    "Fetching remote dependencies...",
    "Resolving emotional conflicts...",
    "Building courage...",
    "Compiling feelings...",
    "Running test suite...",
    "All tests passed ✓"
  ];

  useEffect(() => {
    document.title = "💌 For Reeze";
  }, []);

  useEffect(() => {
    if (appStage === 'loading') {
      const interval = setInterval(() => {
        setLoadingMessage(prev => (prev + 1) % loadingMessages.length);
      }, 750);
      return () => clearInterval(interval);
    }
  }, [appStage]);

  const playErrorSound = () => {
    const audio = new Audio(errorSoundUrl);
    audio.volume = 0.5; 
    audio.play().catch(error => console.log("Audio play failed:", error));
  };

  const handleOpenEnvelope = () => setAppStage('intro');

  const handleEnvelopeDoubleClick = () => {
    confetti({ particleCount: 50, spread: 60 });
  };

  const handleNextStage = () => {
    setAppStage('loading');
    setTimeout(() => {
      setAppStage('asking');
    }, 5000); // 5-second loading time
  };

  const handleViewNote = () => setAppStage('note');

  const handleNoClick = () => {
    setNoClickCount((prevCount) => prevCount + 1);
    if (noButtonStage !== 2) playErrorSound();

    if (noButtonStage === 2) {
      setNoButtonStage(0);
      setHateClickCount(0); 
    } else {
      setNoButtonStage((prevStage) => (prevStage + 1) % 3);
    }
  };

  const handleYesClick = () => {
    if (noButtonStage === 2) {
      playErrorSound();
      setNoClickCount((prevCount) => prevCount + 1);
      setHateClickCount((prev) => prev + 1); 
      return; 
    }
    setAppStage('accepted');
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // --- STYLES ---

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#0d1117', 
    backgroundImage: `
      linear-gradient(rgba(48, 54, 61, 0.2) 1px, transparent 1px),
      linear-gradient(90deg, rgba(48, 54, 61, 0.2) 1px, transparent 1px)
    `,
    backgroundSize: '30px 30px',
    color: '#c9d1d9',
    fontFamily: '"JetBrains Mono", monospace',
    textAlign: 'center',
    padding: '20px',
    overflow: 'hidden'
  };

  // CSS for the Spinner
  const spinnerStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(88, 166, 255, 0.1)',
    borderLeftColor: '#58a6ff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px'
  };

  const getYesButtonStyle = (): React.CSSProperties => {
    const baseStyle = {
      padding: '14px 28px',
      backgroundColor: '#238636',
      color: 'white',
      border: '1px solid rgba(240, 246, 252, 0.1)',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 'bold' as const,
      minWidth: '130px',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      ...(yesHovered && noButtonStage !== 2 && { 
        backgroundColor: '#2ea043', 
        boxShadow: '0 0 10px rgba(46, 160, 67, 0.5)' 
      })
    };
    if (noButtonStage === 2) {
      const scaleValue = Math.max(0.1, Math.pow(0.7, hateClickCount));
      return { ...baseStyle, transform: `scale(${scaleValue})` };
    }
    return baseStyle;
  };

  const getNoButtonStyle = (): React.CSSProperties => {
    const baseStyle = {
      padding: '14px 28px',
      backgroundColor: '#da3633',
      color: 'white',
      border: '1px solid rgba(240, 246, 252, 0.1)',
      borderRadius: '6px',
      cursor: 'pointer',
      fontWeight: 'bold' as const,
      minWidth: '130px',
      fontSize: '1rem',
      transition: 'all 0.2s ease',
      ...(noHovered && noButtonStage !== 2 && { 
        backgroundColor: '#f85149', 
        boxShadow: '0 0 10px rgba(248, 81, 73, 0.5)' 
      })
    };
    if (noButtonStage === 2) {
      const scaleValue = Math.min(5, Math.pow(1.3, hateClickCount));
      return { ...baseStyle, transform: `scale(${scaleValue})` };
    }
    return baseStyle;
  };

  // --- STAGES ---

  if (appStage === 'envelope') {
    return (
      <div style={containerStyle}>
        <h2 style={{ marginBottom: '40px', color: '#8b949e' }}>You have mail</h2>
        <div 
          onClick={handleOpenEnvelope}
          onDoubleClick={handleEnvelopeDoubleClick}
          style={{ cursor: 'pointer', position: 'relative', marginTop: '50px' }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, borderLeft: '150px solid transparent', borderRight: '150px solid transparent', borderTop: '110px solid #f5f5dc', zIndex: 2 }}></div>
          <div style={{ width: '300px', height: '200px', backgroundColor: '#e6e0c6', borderRadius: '0 0 10px 10px', boxShadow: '0 10px 30px rgba(0,0,0,0.8)' }}></div>
          <div style={{ position: 'absolute', top: '70px', left: '50%', transform: 'translateX(-50%)', fontSize: '50px', color: '#da3633', zIndex: 3 }}>❤️</div>
        </div>
      </div>
    );
  }

  if (appStage === 'intro') {
    return (
      <div style={containerStyle}>
        <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>I have a question for you ;)</h1>
        <img 
          src="/intro.gif" 
          alt="Intro" 
          style={{ 
            width: '100%',
            maxWidth: '300px', 
            borderRadius: '12px', 
            marginBottom: '30px', 
            border: '1px solid #30363d' 
          }} 
        />
        <button onClick={handleNextStage} style={{...getYesButtonStyle(), backgroundColor: '#1f6feb'}}>Continue</button>
      </div>
    );
  }

  // --- LOADING STAGE ---
  if (appStage === 'loading') {
    return (
      <div style={containerStyle}>
        <style>
          {`@keyframes spin { to { transform: rotate(360deg); } }`}
        </style>
        <div style={spinnerStyle}></div>
        <code style={{ color: '#8b949e', minHeight: '40px', display: 'block' }}>
          {loadingMessages[loadingMessage]}
        </code>
      </div>
    );
  }

  if (appStage === 'accepted') {
    return (
      <div style={containerStyle}>
        <h1 style={{ fontSize: '2rem', color: '#58a6ff' }}>PR #01: Successfully merged into my heart ❤️</h1>
        <img 
          src="/success.gif" 
          alt="Success" 
          style={{ 
            width: '100%',
            maxWidth: '250px', 
            borderRadius: '12px', 
            margin: '20px 0', 
            border: '1px solid #30363d' 
          }} 
        />
        <p>Persistent link established across {routeDistance}km.</p>
        {noClickCount > 0 && (
          <div style={{ marginTop: '20px', padding: '10px', border: '1px dashed #f85149', borderRadius: '8px' }}>
            <p style={{ color: '#f85149', fontSize: '0.8rem' }}>// Compilation errors: {noClickCount}</p>
          </div>
        )}
        <button onClick={handleViewNote} style={{ marginTop: '30px', padding: '12px 24px', backgroundColor: 'transparent', border: '1px solid #30363d', color: '#58a6ff', borderRadius: '6px', cursor: 'pointer' }}>View Note from Developer</button>
      </div>
    );
  }

  if (appStage === 'note') {
    return (
      <div style={containerStyle}>
        <img 
          src="/good.jpg" 
          alt="My Good Place" 
          style={{ 
            width: '100%', 
            maxWidth: '500px', 
            borderRadius: '12px', 
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)', 
            border: '1px solid #30363d',
            marginBottom: '20px'
          }} 
        />
        <button 
          onClick={() => setAppStage('accepted')} 
          style={{
            padding: '12px 24px',
            backgroundColor: 'transparent',
            border: '1px solid #30363d',
            color: '#58a6ff',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#1f6feb';
            e.currentTarget.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#58a6ff';
          }}
        >
          ← Back
        </button>
      </div>
    );
  }

  // --- ASKING STAGE ---
  return (
    <div style={containerStyle}>
      <div style={{ position: 'absolute', top: '20px', right: '20px', textAlign: 'right', fontSize: '0.7rem', color: '#8b949e' }}>
        <code>NODE_DIST: {routeDistance}km <br /> SSL: SECURE_AFFECTION</code>
      </div>
      <h1 style={{ fontSize: '1.6rem', margin: '20px 0', lineHeight: '1.4' }}>
        {noButtonStage === 0 && <code style={{ color: '#58a6ff' }}>$ gh pr create --title "Will you be my Valentine?" --body "{targetName}"</code>}
        {noButtonStage === 1 && <span style={{ color: '#ff7b72' }}>Please?</span>}
        {noButtonStage === 2 && <span style={{ color: '#f85149' }}>Do you hate me?</span>}
      </h1>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
        <button 
          onClick={handleYesClick}
          onMouseEnter={() => setYesHovered(true)}
          onMouseLeave={() => setYesHovered(false)}
          style={getYesButtonStyle()}
        >
          {noButtonStage === 0 ? "Open PR" : "Yes"}
        </button>
        <button 
          onClick={handleNoClick}
          onMouseEnter={() => setNoHovered(true)}
          onMouseLeave={() => setNoHovered(false)}
          style={getNoButtonStyle()}
        >
          {noButtonStage === 0 ? "Close PR" : "No"}
        </button>
      </div>
      <div style={{ marginTop: '40px', width: '100%', maxWidth: '500px', backgroundColor: '#161b22', border: '1px solid #30363d', padding: '20px', borderRadius: '8px', textAlign: 'left' }}>
        <code style={{ fontSize: '0.75rem', color: '#79c0ff' }}>
          $ status --check-affection <br />
          {noButtonStage === 0 && <span style={{ color: '#8b949e' }}>Awaiting peer review from {targetName}...</span>}
          {noButtonStage === 1 && <span style={{ color: '#d29922' }}>WARNING: Peer review is taking too long.</span>}
          {noButtonStage === 2 && <span style={{ color: '#f85149' }}>CRITICAL: Logic trap active. {hateClickCount > 0 && `Attempts: ${hateClickCount}`}</span>}
        </code>
      </div>
    </div>
  );
};

export default App;