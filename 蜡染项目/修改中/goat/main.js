import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Background
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar
const jeffTexture = new THREE.TextureLoader().load('Stuff3.png');
const jeff = new THREE.Mesh(new THREE.BoxGeometry(6, 6, 0.05), new THREE.MeshBasicMaterial({ map: jeffTexture }));


scene.add(jeff);

// Moon
const moonTexture = new THREE.TextureLoader().load('Stuff3.png');
const normalTexture = new THREE.TextureLoader().load('Stuff3.png');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);
// scene.add(moon);
moon.position.z = 15;
moon.position.setX(-10);
jeff.position.z = -5;
jeff.position.x = 2;

// loadobj 

new OBJLoader().load('moon.obj', function(object) {
  object.traverse(function(child) {
    if (child instanceof THREE.Mesh) {
      child.material.map = new THREE.TextureLoader().load('stuff.png'); 
      child.material.normalMap = new THREE.TextureLoader().load('stuff.png'); 
    }
  });
  
  object.scale.set(0.1, 0.1, 0.1); // 调整模型大小
  object.position.set(-10, 0, 15); // 设置模型位置
  scene.add(object);
});


// Particle Stars
const particleCount = 2000;
const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
const colors = new Float32Array(particleCount * 3);

// 设置粒子位置
for (let i = 0; i < particleCount; i++) {
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  positions.set([x, y, z], i * 3);
}

function generateCosmicColor(index, particleCount) {
  // 通过索引产生平滑的颜色变化，模拟宇宙中从紫色到蓝色再到白色的渐变
  const t = index / particleCount;
  
  // 当索引较小时，粒子偏向紫色
  if (t < 0.33) {
    return new THREE.Color(1 - t * 3, t * 3, 1); // 从紫色(1, 0, 1)渐变到蓝色
  }
  // 中间部分，粒子偏向淡蓝色
  else if (t < 0.66) {
    return new THREE.Color(0, t * 3 - 1, 1); // 从蓝色(0, 1, 1)渐变，保持亮度同时向白色过渡
  }
  // 索引较大时，粒子更接近白色，模拟远处星星的色彩
  else {
    // 让颜色逐渐变亮，模拟星星的白色光芒
    const brightnessFactor = 1 + (t - 0.66) * 3; // 从全亮度到更亮
    return new THREE.Color(brightnessFactor, brightnessFactor, brightnessFactor);
  }
}

for (let i = 0; i < particleCount; i++) {
  const color = generateCosmicColor(i, particleCount);
  colors.set(color.toArray(), i * 3);
}

// 将生成的位置和颜色数组应用到geometry
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));


const material = new THREE.PointsMaterial({ size: 0.1, vertexColors: true });
const points = new THREE.Points(geometry, material);
scene.add(points); // 将点云添加到场景中

// Scroll Animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  moon.rotation.x += 0.005;

  renderer.render(scene, camera);
}

animate();