import './style.css'
import * as THREE from 'three'
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader.js'

// Debug

const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


//gltf
const gltfLoader = new GLTFLoader();
gltfLoader.load('windmill.gltf', (gltf0) => {
    scene.add(gltf0.scene)
    gltf0.scene.scale.set(0.05, 0.05, 0.05);
    gltf0.scene.rotation.y = 2.55;
})

const gltfLoaderLeaf = new GLTFLoader();
gltfLoaderLeaf.load('leaf.gltf', (gltf) => {
    scene.add(gltf.scene);
    gltf.scene.scale.set(0.05, 0.05, 0.05);
    gltf.scene.rotation.y = 2.55;
    gltf.scene.position.set(0, 0.65, 0);

    
    const clock = new THREE.Clock()
    
    const tick = () => {

        const elapsedTime = clock.getElapsedTime()

        // Update objects
        gltf.scene.rotation.z = .5 * elapsedTime


        // Render
        
        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
        renderer.render(scene, camera)
    }
    
    tick()
})



// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0xffffff, 1)
pointLight2.position.set(-2, 1, 1)
scene.add(pointLight2)

const pointLight3 = new THREE.PointLight(0xffffff, 0.5)
pointLight3.position.set(2, 1, 1)
scene.add(pointLight3)

// gui.add(pointLight2.position,'x').min(-3).max(3).step(0.01)
// gui.add(pointLight2.position,'y').min(-3).max(3).step(0.01)
// gui.add(pointLight2.position,'z').min(-3).max(3).step(0.01)
// gui.add(pointLight2,'intensity').min(-3).max(3).step(0.01)

// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1)
// scene.add(pointLightHelper)



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(10, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 5.4
camera.position.z = 10
scene.add(camera)
// gui.add(camera.position,'x',0,20);
// gui.add(camera.position,'y',0,20);
// gui.add(camera.position,'z',0,20);
// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true




/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


