let scene;
let camera;
let renderer;
let width = window.innerWidth;
let height = window.innerHeight;
let	controls;
let stposition ={x : 0, y : 0, z : 0};
let tarposition = {x : 10, y : 10, z : 10};
let mvtime = 1000;
// let tenjidaiArray = [];
let sakuhinArray = [];
				
sceneGenerate();
objLoad();
makePerspectiveCamera();//perspective camera生成
makeAmbientLight();
makeRenderer();
setOrbitControls();
changeTargetOfOrbit(0,0,0);
// makeAxis();
animate();

// textureLoad();

//Scene生成
function sceneGenerate(){
  scene = new THREE.Scene();//scene生成
}

//PerspectiveCamera生成
function makePerspectiveCamera(){
  camera = new THREE.PerspectiveCamera(45,width / height, 1, 1000);
  camera.position.set(10,10,10);
  scene.add(camera);
  camera.lookAt(0,0,0);
  console.log("カメラセット");
  console.log(camera);
}

//AmbientLight生成
function makeAmbientLight(){
  let Light = new THREE.AmbientLight( 0xffffff, 1 );
  console.log("全方向ライトセット");
  console.log(Light);
  scene.add(Light);
}

//展示台、スポットライトの生成
function makeTenjidai(sakuhin){
  // for(let i=0;i<sakuhinArray.length;i++){
    let col = 0x292c2d,roughness = 0.2,metalness = 0.0;
    let material = makeMeshStandardMaterial(col,roughness,metalness,);
    
    let object = makeClynder(material);
    object.name = "Tenjidai";
    object.position.set(sakuhin.position.x,sakuhin.position.y-5,sakuhin.position.z);
    // scene.add(object);
    // tenjidaiArray.push(object);
    console.log("展示台 add to scene");
    console.log(object);

    // スポットライト光源を作成
    // new THREE.SpotLight(色, 光の強さ, 距離, 角度, ボケ具合, 減衰率)
    let light = new THREE.SpotLight(0xffffff, 50, 15, THREE.Math.degToRad(20), 0.1, 1);
    light.position.set( sakuhin.position.x,sakuhin.position.y+10,sakuhin.position.z );
    light.target = sakuhin;
    scene.add(light);
    console.log("SpotLight add to scene");
    console.log(light);
    var spotLightHelper = new THREE.SpotLightHelper( light );
    scene.add( spotLightHelper);

  // }
};

// 座標軸を表示
function makeAxis(){
  let axes = new THREE.AxisHelper(100);
  scene.add(axes);
} 


//マテリアル生成
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
  let geometry = new THREE.CylinderGeometry( 5, 5, 5, 32 );
  cylinder = new THREE.Mesh(geometry, mat);
  console.log("set CylinderGeometry");
  return cylinder;
};

//展示するオブジェクトを読み込む
function objLoad(){
  console.log("function objLoad start");
  //materialLoad→マテリアルの定義
  //objLoad→オブジェクトにマテリアルを設定する。
  let objloader = new THREE.OBJLoader;
  let objURL = "models/shelf_top.obj";
  objloader.load(objURL,function(object){
    console.log("obj 読み込み成功");
    object.name = objURL.substring(objURL.indexOf("/")+1,objURL.indexOf("."));
    object.position.set(0,0,0);
    object.scale.set(1,1,1);
    // object.position.unproject(camera);
    console.log(object);
    textureLoad(object);
    
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
//展示するオブジェクトのマップを読み込む
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
    sakuhinArray.push(obj);
    console.log("Add obj to scene ");
    console.log(obj);
    makeTenjidai(obj); 
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

//レンダラー生成
function makeRenderer(){
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(width,height);
  renderer.setPixelRatio(window.devivePixelRatio);
  document.getElementById('stage').appendChild(renderer.domElement);
}


function render(){
  // camera.lookAt( scene.position );
  width = window.innerWidth;
  height = window.innerHeight;
  camera.aspect = 1;	
  renderer.setSize(width,height);
  renderer.render( scene, camera );
  
}

//カメラコントロールをOrbitControlsへ変更
function setOrbitControls(){
  controls = new THREE.OrbitControls(camera);
  controls.autoRotate = false;
}
//カメラのスライドアニメーション実行
$('#autoBtn').on('click ',function(){
  let tmpArray = sakuhinArray;
  cameraSlideAnimation(tmpArray,0,3000);
});
//カメラの向きを変更する
function changeTargetOfOrbit(tarX,tarY,tarZ){
  controls.target.x = tarX;
  controls.target.y = tarY;
  controls.target.z = tarZ;
}
//カメラを展示台の前に移動するアニメーション。
function cameraSlideAnimation(targetArray,i,animTime){
  cameraPositionSet(targetArray[i].position.x,targetArray[i].position.y+5,targetArray[i].position.z+10);
  changeTargetOfOrbit(targetArray[i].position.x,targetArray[i].position.y,targetArray[i].position.z);
  console.log("ZoomUp START:camera position is "+camera.position.x+","+camera.position.y+","+camera.position.z);
  let cameraStartPos = { x : camera.position.x, y: camera.position.y, z: camera.position.z };
  let cameraTagPos = { x : camera.position.x, y: camera.position.y, z: camera.position.z };

  let	cameraDelayTime = 0;
  let	cameraTween = new TWEEN.Tween( cameraStartPos ).to(cameraTagPos, animTime);
  
  cameraTween.easing(TWEEN.Easing.Quadratic.InOut).delay(cameraDelayTime).start();
   cameraTween.onUpdate(function(){
   camera.position.x = cameraStartPos.x;
   camera.position.y = cameraStartPos.y;
   camera.position.z = cameraStartPos.z;
  });
   cameraTween.onComplete(function(){
      console.log("ZoomUp End");
      console.log("camera position is "+camera.position.x+","+camera.position.y+","+camera.position.z);
      i++;
      if(i==targetArray.length){
        cameraPositionSet(50,10,50);
        changeTargetOfOrbit(0,0,0);
        return;
      }

      cameraSlideAnimation(targetArray,i,animTime)
   });
}
//カメラポジションを引数で指定した場所へセットする
function cameraPositionSet(x,y,z){
  camera.position.x = x;
  camera.position.y = y;
  camera.position.z = z;
}
//レンダリング実行
function animate(){
  requestAnimationFrame( animate );
  controls.update();
  TWEEN.update();
  render();
}