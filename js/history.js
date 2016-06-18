import eventPublisher from "./publisher";

function test(framescontroller){
    
    
    eventPublisher.subscribe("drawState",function(data){
        let frames=[];
        //framesは各レイヤを入れる。
        
        let currentFrame = framescontroller.getCurrentFrame();
        console.log(currentFrame)
        console.log(data);
        if(data=="drawing"){
            
            console.log("書いている。書き始めた")
            
        }else if(data=="idling"){
            
            console.log("書き終わった。frameを保存する。")
        }
        
    });
}

export default test;