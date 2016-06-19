import eventPublisher from "./publisher";

function test(framescontroller){
   
    let currentFrame = framescontroller.getCurrentFrame();
    let frames=[];
    //framesは各frameのarrayを入れる。e.g. frame[1]には2つめのframeidのidlingごとgetImageDataしたarray
    let currentframeID=framescontroller.currentFrameId;
    for(let i=currentframeID;0<=i;i--){
        console.log("tess");
        frames[i]=[];
        frames[i].push(framescontroller.canvasModel.getImageData());
    }

    eventPublisher.subscribe("drawState",(state)=>{
       if(state=="idling"){
            frames[framescontroller.currentFrameId].push(framescontroller.canvasModel.getImageData());
        }
    });
    eventPublisher.subscribe("currentFrameId", (frameid)=>{
        if(typeof frames[frameid] ==="undefined"){
            frames[frameid]=[];
        }
    });
}

export default test;