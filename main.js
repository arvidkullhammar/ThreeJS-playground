import './style.css'


import * as THREE from 'three'
import { TorusGeometry } from 'three'
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.124/examples/jsm/controls/OrbitControls.js'

const scene = new  THREE.Scene()
const clock = new THREE.Clock();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 1000)


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth,window.innerHeight)
camera.position.setZ(30)

renderer.render(scene,camera)
const reactGroup = new THREE.Group();

const torusGeometry = new THREE.TorusGeometry(6,0.2,16,100)
const torusMaterial = new THREE.MeshStandardMaterial( {color: 0x61dbfb})

const torusOne = new THREE.Mesh(torusGeometry,torusMaterial)
torusOne.rotateX(93)



const torusTwo = new THREE.Mesh(torusGeometry,torusMaterial)
torusTwo.rotateX(90)
torusTwo.rotateY(18)


const torusThree = new THREE.Mesh(torusGeometry,torusMaterial)
torusThree.rotateX(90)
torusThree.rotateY(-18)


reactGroup.add(torusOne,torusTwo,torusThree)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight,ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50)
/* scene.add(lightHelper,gridHelper) */

const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const starGeometry = new THREE.SphereGeometry(0.2,24,24)
  const starMaterial = new THREE.MeshStandardMaterial({color: 0xf3f3f3})
  const star = new THREE.Mesh(starGeometry,starMaterial)


  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100))

  star.position.set(x,y,z)
  scene.add(star)
}

const spaceTexture = new THREE.TextureLoader().load('v627-aew-41-technologybackground.jpg')
scene.background = spaceTexture

const ballGeometry = new THREE.SphereGeometry(0.8,24,24)
  const ballMaterial = new THREE.MeshStandardMaterial({color: 0x61dbfb})
  const ball = new THREE.Mesh(ballGeometry,ballMaterial)
  ball.position.y += -0.25

reactGroup.add(ball)


scene.add(reactGroup)


Array(100).fill().forEach(addStar)

function animate () {
  requestAnimationFrame(animate)

  const time = clock.getElapsedTime();
  reactGroup.position.y = Math.cos( time ) * 2;
reactGroup.lookAt(camera.position)

  controls.update()
  renderer.render(scene,camera)
}

animate()