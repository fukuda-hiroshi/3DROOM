let scene;
let camera;
let renderer;
let width = window.innerWidth;
let height = window.innerHeight;
let	controls;
let stposition ={x : 0, y : 0, z : 0};
let tarposition = {x : 10, y : 10, z : 10};
let mvtime = 1000;  
				
init();
makeTenjidai();
animate();
// objLoad();
// textureLoad();

function init(){
  scene = new THREE.Scene();//scene生成
  makePerspectiveCamera();//perspective camera生成
  AmbientLight();// 全方向ライト生成
  let axes = new THREE.AxisHelper(100);// 座標軸を表示
  scene.add(axes);
  makeRenderer();//レンダラー生成
  setOrbitControls();//カメラコントロールをOrbitControlsへセット
}

function makePerspectiveCamera(){
  camera = new THREE.PerspectiveCamera(45,width / height, 1, 1000);
  camera.position.set(50,10,50);
  scene.add(camera);
  camera.lookAt(scene.position);
  console.log("カメラセット");
  console.log(camera);
}

function AmbientLight(){
  let Light = new THREE.AmbientLight( 0xffffff, 1 );
  console.log("全方向ライトセット");
  console.log(Light);
  scene.add(Light);
}

function makeTenjidai(){
  let col = 0x292c2d,roughness = 0.2,metalness = 0.0;
  let material = makeMeshStandardMaterial(col,roughness,metalness,);
  
  let object = makeClynder(material);
  scene.add(object);
  console.log("展示台 add to scene");
};


//マテリアル作成
function makeMeshStandardMaterial(color,roughness,metalness,map){
  //展示台生成
  console.log("make MeshStandardMaterial start");
  let mat = new THREE.MeshStandardMaterial( {
    color: color,
    roughness:roughness,
    metalness:metalness,
    map:map
  });
  console.log("MeshStandardMaterial maked");
  return mat;
};

//円柱生成
//サンプル-----------------
// const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
// const material = new THREE.MeshBasicMaterial( {color: 0xFF0000} );
// const cylinder = new THREE.Mesh( geometry, material );
//サンプル-----------------
function makeClynder(mat){
  let geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
  cylinder = new THREE.Mesh(geometry, mat);
  cylinder.position.set(0,0,0);
  console.log("set CylinderGeometry");
  return cylinder;
};


function objLoad(){
  console.log("function objLoad start");
  //materialLoad→マテリアルの定義
  //objLoad→オブジェクトにマテリアルを設定する。
  let objloader = new THREE.OBJLoader;
  let objURL = "models/shelf_top.obj";
  obj = objloader.load(objURL,function(object){
    console.log("obj 読み込み成功");
    object.name = objURL.substring(objURL.indexOf("/")+1,objURL.indexOf("."));
    console.log(object);
    textureLoad(object);
    // scene.add(object);
    
  },function(xhr){
    console.log(xhr);
    if ( xhr.lengthComputable ) {
      let percentComplete = xhr.loaded / xhr.total * 100;
      console.log( 'model ' + Math.round( percentComplete, 2 ) + '% downloaded' );
    }
  },function(err){
    console.log("読み込みエラー");
  }
  );
}

function textureLoad(obj){
  console.log("function textureLoad start");
  let textureloader = new THREE.TextureLoader;
  textureloader.load("textures/shelf_top.jpg",function(texture){
    console.log("texture load成功");
    console.log(texture);
    
    // マテリアルにテクスチャーを設定
    let material = new THREE.MeshStandardMaterial({
      map: texture
    });
    obj.children[0].material = material;
    console.log("Set texture to obj");
    
    scene.add(obj);
    console.log("Add obj to scene ");
    console.log(obj);
    
  },function(xhr){
    console.timeEnd( 'textureLoader' );
    console.log("xhr");
    console.log(xhr);
    if ( xhr.lengthComputable ) {
      let percentComplete = xhr.loaded / xhr.total * 100;
      console.log( 'texture ' + Math.round( percentComplete, 2 ) + '% downloaded' );
      
    }               
  },function(err){
    console.log("読み込みエラー");
  }
  );
}

function makeRenderer(){
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(width,height);
  renderer.setPixelRatio(window.devivePixelRatio);
  document.getElementById('stage').appendChild(renderer.domElement);
}

function animate(){
  requestAnimationFrame( animate );
  render();
}

function render(){
  // camera.lookAt( scene.position );
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = 1;	
  renderer.setSize(width,height);
  renderer.render( scene, camera );
}

function setOrbitControls(){
  controls = new THREE.OrbitControls(camera,renderer.domElement);
  controls.autoRotate = true;
}