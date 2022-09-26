import './style.css'
import javascriptLogo from './javascript.svg'

import * as THREE from 'three'
import { TorusGeometry } from 'three'
/* import {OrbitControls} from 'three/examples/jsm/controls/orbitControls' */

const scene = new  THREE.Scene()

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight, 0.1, 1000)


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth,window.innerHeight)
camera.position.setZ(30)

renderer.render(scene,camera)

const torusGeometry = new THREE.TorusGeometry(6,1.5,16,100)
const torusMaterial = new THREE.MeshStandardMaterial( {color: 0x61dbfb})

const torus = new THREE.Mesh(torusGeometry,torusMaterial)

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight,ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200,50)
/* scene.add(lightHelper,gridHelper) */

/* const controls = new OrbitControls(camera, renderer.domElement) */

function addStar() {
  const starGeometry = new THREE.SphereGeometry(0.25,24,24)
  const starMaterial = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(starGeometry,starMaterial)


  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100))

  star.position.set(x,y,z)
  scene.add(star)
}

const spaceTexture = new THREE.TextureLoader().load('images/v627-aew-41-technologybackground.jpg')
scene.background = spaceTexture

const jspicture = new THREE.TextureLoader().load('images/reactlogo.png')

const jspic = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: jspicture})
)

scene.add(jspic)


Array(100).fill().forEach(addStar)

function animate () {
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  jspic.rotation.x += 0.01
  jspic.rotation.y += 0.005
  jspic.rotation.z += 0.01

/*   controls.update() */
  renderer.render(scene,camera)
}

animate()