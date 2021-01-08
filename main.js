console.log("main.js READ!!");

//Camera

//Light
//Scene追加

//ライトセッティング
function setLight(){
  
}
//展示台作成
function makeMeshStandardMaterial(color,roughness,metalness,map){
    let mat = new THREE.MeshStandardMaterial( {
         color: color,
         roughness:roughness,
         metalness:metalness,
         map:map
    });
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
    return cylinder;
}
