import * as THREE from "https://esm.sh/three"
import { OrbitControls } from "https://esm.sh/three/examples/jsm/controls/OrbitControls.js";

const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 0x8F00FF})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

window.addEventListener('resize', () =>{
  
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height

    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

})

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

// Animation Loop
const animate = () => {
    // Update controls
    controls.update();

    // Render the scene
    renderer.render(scene, camera);

    // Request next frame
    requestAnimationFrame(animate);
};

animate();
