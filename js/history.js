import eventPublisher from "./publisher";

function test(framescontroller){
   
        let frames=[];
        //framesは各レイヤを入れる。
        let a=0;
        let currentframeID=4;//framescontroller.currentFrameId;
        //console.log(currentframeID);
        for(let i=currentframeID;0<=i;i--){
          console.log("tess");
            frames[i]=[];
            a++;
            frames[i].push(a);//sin();
        }
        let elem=document.getElementById("tesxx");
        elem.addEventListener("click",function(e){
            a++;//aは1ずつ増える。
           console.log("clikced "+a); 
           framescontroller.setCurrentFrame(a)
        },false);
    
    eventPublisher.subscribe("drawState",function(data){

       // console.log(frames)
        
        let currentFrame = framescontroller.getCurrentFrame();
        // console.log("currentframe"+currentFrame)
        
        console.log(data);
        console.log(frames)
        if(data=="drawing"){
            
            console.log("書いている。書き始めた")
            
        }else if(data=="idling"){
            //current frameIDは0から始まる
            // frames[3].push(33)
             console.log("書き終わった。frameを保存する。")
            // console.log(frames[3][1])
            //console.log("a "+framescontroller.currentFrameId)
            frames[framescontroller.currentFrameId].push(4);
        }
        
    });
}

export default test;