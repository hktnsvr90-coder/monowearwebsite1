import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uProgress;
uniform vec2 uResolution;
uniform float uTime;
uniform sampler2D uImage1;
uniform sampler2D uImage2;
uniform float uTransitionComplete;

varying vec2 vUv;

vec3 mod289v3(vec3 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec2 mod289v2(vec2 x) {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec3 permute(vec3 x) {
  return mod289v3(((x*34.0)+1.0)*x);
}

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod289v3(Pi);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = Pf.xy * Pf.xy * Pf.xy * (Pf.xy * (Pf.xy * 6.0 - 15.0) + 10.0);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}

float getBrightness(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}

void main() {
  vec2 uv = vUv;
  uv.x *= uResolution.x / uResolution.y;
  float time = uTime * 0.05;
  float n1 = cnoise(uv * 1.5 + vec2(time, time * 0.5)) + cnoise(uv * 3.0 - vec2(time * 0.8, time * 1.2) + 50.0) * 0.5 + cnoise(uv * 6.0 + vec2(time * 1.1, time * 0.3) + 100.0) * 0.25;
  float finalNoise = n1 / (1.0 + 0.5 + 0.25);
  finalNoise = (finalNoise + 1.0) * 0.5;
  float progressCurve = pow(uProgress, 0.8);
  vec4 img1Color = texture2D(uImage1, vUv);
  vec4 img2Color = texture2D(uImage2, vUv);
  float chromScale = 0.12;
  float chromIntensity = 1.0 - uTransitionComplete;
  float rShift = (finalNoise * 2.0 - 1.0) * chromScale * chromIntensity;
  vec4 rColor = texture2D(uImage2, vUv + vec2(rShift, 0.0));
  vec4 bColor = texture2D(uImage2, vUv - vec2(rShift * 0.8, 0.0));
  vec4 chromImg2 = vec4(rColor.r, img2Color.g, bColor.b, img2Color.a);
  float transitionPos = progressCurve * (3.0 + finalNoise);
  float centerDist = abs(uv.x - (uResolution.x / uResolution.y) * 0.5);
  float xNoise = cnoise(vec2(uv.y * 8.0, time * 2.0) + 200.0) * 0.15;
  xNoise += cnoise(vec2(uv.y * 20.0, time * 5.0) + 300.0) * 0.08;
  centerDist += xNoise;
  float revealWidth = 1.2;
  float revealEdge = transitionPos - centerDist;
  float revealFactor = smoothstep(0.0, revealWidth, revealEdge);
  revealFactor = clamp(revealFactor, 0.0, 1.0);
  float depthSample = texture2D(uImage2, vUv).r;
  if (uTransitionComplete > 0.01) {
    float depthValue = depthSample * 2.0 - 1.0;
    float focalPlane = 0.0;
    float coc = abs(depthValue - focalPlane);
    float dofAmount = uTransitionComplete * 0.15;
    float dofOffset = coc * dofAmount;
    vec4 dofSample1 = texture2D(uImage2, vUv + vec2(dofOffset, 0.0));
    vec4 dofSample2 = texture2D(uImage2, vUv - vec2(dofOffset, 0.0));
    vec4 dofSample3 = texture2D(uImage2, vUv + vec2(0.0, dofOffset));
    vec4 dofSample4 = texture2D(uImage2, vUv - vec2(0.0, dofOffset));
    vec4 dofSample5 = texture2D(uImage2, vUv + vec2(dofOffset * 0.5, dofOffset * 0.5));
    vec4 dofAvg = (img2Color + dofSample1 + dofSample2 + dofSample3 + dofSample4 + dofSample5) / 6.0;
    img2Color = mix(dofAvg, img2Color, 0.5);
  }
  float borderWidth = 0.05;
  float borderMask = smoothstep(0.0, borderWidth, revealEdge) * smoothstep(0.0, borderWidth, revealWidth - revealEdge);
  borderMask = clamp(borderMask, 0.0, 1.0);
  borderMask *= chromIntensity;
  vec4 baseColor = mix(img1Color, chromImg2, revealFactor);
  vec4 borderColor = vec4(1.0, 1.0, 1.0, 1.0);
  vec4 finalColor = mix(baseColor, borderColor, borderMask * 0.4);
  finalColor.rgb *= 1.0;
  gl_FragColor = finalColor;
}
`;

export default function Hero() {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const canvasContainer = canvasContainerRef.current;
    if (!canvasContainer) return;

    const canvasEl = document.createElement('canvas');
    canvasEl.style.position = 'fixed';
    canvasEl.style.top = '0';
    canvasEl.style.left = '0';
    canvasEl.style.width = '100%';
    canvasEl.style.height = '100%';
    canvasEl.style.zIndex = '0';
    canvasContainer.appendChild(canvasEl);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: false, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const scene = new THREE.Scene();

    const textureLoader = new THREE.TextureLoader();
    const uniforms = {
      uProgress: { value: 0.0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uTime: { value: 0.0 },
      uImage1: { value: textureLoader.load('/img-1.jpg') },
      uImage2: { value: textureLoader.load('/img-2.jpg') },
      uTransitionComplete: { value: 0.0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
  animationFrameId = requestAnimationFrame(animate);
  material.uniforms.uProgress.value = progressRef.current;
        0.7,
        1.0
      );
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      material.uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      window.removeEventListener('resize', handleResize);
      if (canvasContainer.contains(canvasEl)) {
        canvasContainer.removeChild(canvasEl);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.getElementById('hero-scroll-container');
      if (!scrollContainer) return;
      const rect = scrollContainer.getBoundingClientRect();
      const scrollY = -rect.top;
      const maxScroll = scrollContainer.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(scrollY / maxScroll, 1.0));
      progressRef.current = progress;

      if (heroTextRef.current) {
        const textOpacity = Math.max(0, 1 - ((progress - 0.65) / 0.2));
        heroTextRef.current.style.opacity = String(textOpacity);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div ref={canvasContainerRef} />
      <div id="hero-scroll-container" style={{ height: '300vh', position: 'relative' }}>
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            zIndex: 1,
            display: 'flex',
            alignItems: 'flex-end',
            padding: '0 clamp(24px, 5vw, 64px)',
            paddingBottom: '12vh',
          }}
        >
          <div ref={heroTextRef} style={{ width: '55%', maxWidth: '700px' }}>
            <h1
              className="font-serif"
              style={{
                fontWeight: 700,
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                letterSpacing: '-0.02em',
                lineHeight: 0.95,
                color: '#1A1A1A',
                textShadow: '0 2px 30px rgba(245,243,238,0.9)',
                margin: 0,
              }}
            >
              Tarzını Yarat
            </h1>
            <p
              className="font-sans"
              style={{
                fontWeight: 400,
                fontSize: '1.1rem',
                lineHeight: 1.7,
                letterSpacing: '0.01em',
                color: '#6B6B6B',
                marginTop: '24px',
                maxWidth: '440px',
              }}
            >
              Kişiye özel tişört, baskılı kupa ve albümlük fotoğraf baskısı.
              Tasarla, biz basalım.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
