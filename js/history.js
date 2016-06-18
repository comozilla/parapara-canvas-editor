import eventPublisher from "./publisher";

function test(canvas){
    eventPublisher.subscribe("drawState",function(data){
        console.log(data);
    });
}

export default test;