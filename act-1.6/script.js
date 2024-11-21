import * as THREE from "https://esm.sh/three"
import { OrbitControls } from "https://esm.sh/three/examples/jsm/controls/OrbitControls.js"

import gsap from "https://esm.sh/gsap"
import * as dat from 'https://esm.sh/lil-gui' 
import { FontLoader } from "https://esm.sh/three/examples/jsm/loaders/FontLoader.js";
import {TextGeometry} from 'https://esm.sh/three/examples/jsm/geometries/TextGeometry.js'

//debug
const gui = new dat.GUI()

//scene
const scene = new THREE.Scene()

//camera
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height, 0.2, 100)
camera.position.z = 5
scene.add(camera)

//renderer
const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

//orbit controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

//parameters for gui
const parameters = {
 color: 0x8F00FF,
  spin: () => {
    gsap.to(boxMesh.rotation, {duration: 1, y: boxMesh.rotation.y + Math.PI * 2})
  }
}

//box geometry
const boxGeometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x8F00FF, wireframe: true})
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial)
boxMesh.position.x = -4
scene.add(boxMesh)

//gui controls
gui.add(boxMesh.position, 'y')
gui.add(boxMesh.position, 'y', -3, 3, 0.01)
gui.add(boxMesh, 'visible')
gui.add(boxMaterial, 'wireframe')
gui.addColor(parameters, "color").onChange(() => {
  boxMaterial.color.set(parameters.color)
})
gui.add(parameters, 'spin').name('Spin Box')

//texture for box
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager)

const colorTexture = textureLoader.load('/lava-texture.jpg')

//buffer geometry empty (random triangles)
const buffergeometry = new THREE.BufferGeometry()
 //create 50 triangles (450 values)
const count = 50
const positionsArray = new Float32Array(count * 3 * 3)
for (let i = 0; i< count * 3 * 3; i++){
  positionsArray[i] = (Math.random() - 0.5) * 4
}
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
buffergeometry.setAttribute("position", positionsAttribute)
 
const bufferMaterial = new THREE.MeshBasicMaterial({color: 0x8F00FF, wireframe: true})
const bufferMesh = new THREE.Mesh(buffergeometry, bufferMaterial)
scene.add(bufferMesh)


window.addEventListener('resize', () =>{
  //update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    //update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

  //update renderer
    renderer.setSize(sizes.width, sizes.height)     
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

//meshes
const newmaterial = new THREE.MeshNormalMaterial()

const sphere = new THREE.Mesh(
new THREE.SphereGeometry(0.5, 16, 16),
newmaterial)
sphere.position.y = 0
sphere.position.x = -1.5

const plane = new THREE.Mesh(
new THREE.PlaneGeometry(1, 1),
newmaterial)
plane.position.x = 4

const torus = new THREE.Mesh(
new THREE.TorusGeometry(0.3, 0.2, 16, 32),
newmaterial)
torus.position.y = 0
torus.position.x = 1.5

scene.add(sphere, plane, torus)


newmaterial.color = new THREE.Color(0xc34bad)
newmaterial.flatshading = true


window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if (!fullscreenElement){
        if(canvas.requestFullscreen){
            canvas.requestFullscreen()
        }else if (canvas.webkitRequestFullscreen){
            canvas.webkitRequestFullscreen()
        }
    }else {
        if(document.exitFullscreen){
            document.exitFullscreen()
        }else if(document.webkitExitFullscreen){
            document.webkitExitFullscreen()
        }
    }
})

//add donut objects)
  for(let i = 0; i < 100; i++){
      const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
  const donutMaterial = new THREE.MeshBasicMaterial({
   color: 0x57ffd5
  })
  const donut = new THREE.Mesh(donutGeometry, donutMaterial)
  
  donut.position.x = (Math.random() - 0.5) * 10
  donut.position.y = (Math.random() - 0.5) * 10
  donut.position.z = (Math.random() - 0.5) * 10
  
  donut.rotation.x = Math.random() * Math.PI
  donut.rotation.y = Math.random() * Math.PI
  
  const scale = Math.random()
  donut.scale.set(scale, scale, scale)
 
  scene.add(donut)
  }

// Animation Loop
const animate = () => {
    //update controls
    controls.update()

    //render scene
    renderer.render(scene, camera)

    //request next frame
    requestAnimationFrame(animate)
}

animate()

//make the sphere, donut, and plane spin
const clock = new THREE.Clock()
const tick = () =>{
  const elapsedTime = clock.getElapsedTime()
  
  sphere.rotation.y = 0.1 * elapsedTime
  plane.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime
  
  sphere.rotation.x = 0.15 * elapsedTime
  plane.rotation.x = 0.15 * elapsedTime
  torus.rotation.x = 0.15 * elapsedTime
  
  controls.update()
  
  renderer.render(scene, camera)
  
  requestAnimationFrame(tick)
  
}
tick()
