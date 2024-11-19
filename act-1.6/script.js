import * as THREE from 'three' 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerwidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('.webgl')});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const animate = () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;


    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

animate();

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

camera.aspect = width / height;
camera.updateProjectionMatrix();

renderer.setSize(width, height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

});

window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement;
    const canvas = renderer.domElement;

    if(!fullscreenElement){
        if(canvas.requestFullscreen){
            canvas.requestFullscreen();
        } else if (canvas.webkitFullscreenElement){
            canvas.webkitRequestFullscreen();
        }
    } else{
        if(document.exitFullscreen){
            document.exitFullscreen();
        } else if(document.webkitFullscreenElement){
            document.webkitExitFullscreen();
    }
}
});
