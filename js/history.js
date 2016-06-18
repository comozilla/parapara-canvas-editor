import eventPublisher from "./publisher";

function test(framescontroller){
   
        let currentFrame = framescontroller.getCurrentFrame();
        let frames=[];
        //framesは各frameのarrayを入れる。e.g. frame[1]には2つめのframeidのidlingごとgetImageDataしたarray
        let currentframeID=framescontroller.currentFrameId;
        //console.log(currentframeID);
        for(let i=currentframeID;0<=i;i--){
          console.log("tess");
            frames[i]=[];
            a++;
            frames[i].push(framescontroller.canvasModel.getImageData());
        }
        let elem=document.getElementById("tesxx");
        elem.addEventListener("click",function(e){
            a++;//aは1ずつ増える。
           console.log("clikced "+a); 
           framescontroller.setCurrentFrame(a)
        },false);
    
    eventPublisher.subscribe("drawState",function(data){
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
            frames[framescontroller.currentFrameId].push(framescontroller.canvasModel.getImageData());
        }
        
    });
    eventPublisher.subscribe("currentFrameId", (frameid)=>{
        console.log("frameid=  "+frameid)
        console.log("frameid2=  "+frames[frameid])
        if(typeof frames[frameid] ==="undefined"){
            frames[frameid]=[];
        }
    });
}

export default test;