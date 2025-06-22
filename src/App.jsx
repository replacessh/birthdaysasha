import { useEffect, useRef, useState } from 'react';
import './index.css';
import photo1 from './assets/photos/photo1.jpg';
import photo2 from './assets/photos/photo2.jpg';
import photo3 from './assets/photos/photo3.jpg';
import photo4 from './assets/photos/photo4.jpg';
import photo5 from './assets/photos/photo5.jpg';
import photo6 from './assets/photos/photo6.jpg';
import photo7 from './assets/photos/photo7.jpg';
import photo8 from './assets/photos/photo8.jpg';
import photo9 from './assets/photos/photo9.jpg';
import photo10 from './assets/photos/photo10.jpg';

function ConfettiCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const confettiColors = [
      '#f7d51d', '#ff6f61', '#6ec6ff', '#81c784', '#f06292', '#ba68c8', '#ffd54f', '#4dd0e1'
    ];
    const confetti = Array.from({ length: 180 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H - H,
      r: Math.random() * 6 + 4,
      d: Math.random() * 80 + 20,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      tilt: Math.random() * 10 - 10,
      tiltAngleIncremental: Math.random() * 0.07 + 0.05,
      tiltAngle: 0
    }));

    function draw() {
      ctx.clearRect(0, 0, W, H);
      confetti.forEach(c => {
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 3, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 5);
        ctx.stroke();
      });
      update();
    }

    function update() {
      confetti.forEach(c => {
        c.y += Math.cos(c.d) + 2 + c.r / 2;
        c.x += Math.sin(0.5) * 2;
        c.tiltAngle += c.tiltAngleIncremental;
        c.tilt = Math.sin(c.tiltAngle) * 15;
        if (c.y > H) {
          c.x = Math.random() * W;
          c.y = -10;
        }
      });
    }

    let animationFrameId;
    function animate() {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 1}} />;
}

function ArtCandle() {
  return (
    <svg className="candle-svg" viewBox="0 0 64 120" width="64" height="120">
      <defs>
        <radialGradient id="flame" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#fffbe9" />
          <stop offset="60%" stopColor="#ffe066" />
          <stop offset="100%" stopColor="#ff6f61" />
        </radialGradient>
        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#ffe0e9" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="30" rx="10" ry="18" fill="url(#flame)" className="candle-flame" />
      <rect x="24" y="40" width="16" height="60" rx="8" fill="url(#body)" />
      <rect x="30" y="38" width="4" height="8" rx="2" fill="#bfa76f" />
    </svg>
  );
}

function NeonFrame({ children }) {
  return (
    <div className="neon-frame">
      <ArtCandle />
      {children}
      <ArtCandle />
    </div>
  );
}

function Balloons() {
  // Массив цветов для шариков
  const colors = ['#ff6f61', '#ffd54f', '#ba68c8', '#6ec6ff', '#81c784', '#f06292'];
  // Генерируем 12 шариков с разными параметрами
  const balloons = Array.from({ length: 12 }, (_, i) => ({
    left: Math.random() * 90 + '%',
    delay: Math.random() * 6,
    color: colors[i % colors.length],
    size: Math.random() * 32 + 48,
    duration: Math.random() * 8 + 10
  }));
  return (
    <div className="balloons">
      {balloons.map((b, i) => (
        <div
          key={i}
          className="balloon"
          style={{
            left: b.left,
            animationDelay: `${b.delay}s`,
            background: b.color,
            width: b.size + 'px',
            height: b.size * 1.3 + 'px',
            animationDuration: `${b.duration}s`
          }}
        />
      ))}
    </div>
  );
}

function SpinningPhoto({ src, alt }) {
  return (
    <div className="spinning-photo-wrap">
      <img src={src} alt={alt} className="spinning-photo" />
    </div>
  );
}

function AnimatedText({ text, className }) {
  // Анимированное появление текста по буквам
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 400);
  }, []);
  return (
    <span className={className + ' animated-text'}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          style={{
            opacity: show ? 1 : 0,
            transform: show ? 'translateY(0)' : 'translateY(40px)',
            transition: `all 0.5s cubic-bezier(.23,1.01,.32,1) ${i * 0.04}s`
          }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
}

function PhotoFrame({ src, alt }) {
  return (
    <div style={{margin: '24px 0', boxShadow: '0 4px 24px #ffd54f55', borderRadius: '18px', overflow: 'hidden', background: '#fff', width: 120, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <img src={src} alt={alt} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
    </div>
  );
}

function SidePhotos() {
  const leftPhotos = [photo1, photo2, photo3, photo4, photo5];
  const rightPhotos = [photo6, photo7, photo8, photo9, photo10];
  return (
    <>
      <div className="side-photos left">
        {leftPhotos.map((src, i) => <PhotoFrame key={i} src={src} alt={`Фото ${i+1}`} />)}
      </div>
      <div className="side-photos right">
        {rightPhotos.map((src, i) => <PhotoFrame key={i} src={src} alt={`Фото ${i+6}`} />)}
      </div>
    </>
  );
}

function App() {
  return (
    <div className="birthday-root">
      <SidePhotos />
      <ConfettiCanvas />
      <Balloons />
      <div className="art-bg"></div>
      <div className="birthday-content wow-glow">
        <SpinningPhoto src={photo1} alt="Главное фото" />
        <NeonFrame>
          <AnimatedText text="С Днём Рождения, Саша!" className="birthday-title neon-text" />
        </NeonFrame>
        <p className="birthday-subtitle">
          <AnimatedText text="Пусть этот день будет наполнен радостью, улыбками и волшебством!" />
        </p>
        <div className="birthday-card glass">
          <AnimatedText text="Желаю тебе море вдохновения, крепкого здоровья, ярких эмоций и исполнения самых заветных желаний!" />
          <br />
          <AnimatedText text="Пусть каждый момент будет особенным, а рядом всегда будут любимые люди и настоящие друзья." />
        </div>
        <div className="birthday-footer">
          <AnimatedText text="С любовью и теплом" />
        </div>
      </div>
    </div>
  );
}

export default App;
