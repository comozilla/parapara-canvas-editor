import eventPublisher from "./publisher";

function test(){
    eventPublisher.subscribe("drawState",function(data){
        console.log(data);
    });
}

export default test;