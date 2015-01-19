// module.exports = function(route,item,req,res){
//     // function sendApi(route,item,req,res){
//         if(monitor.hasOwnProperty(route)){                      // check if the object have any sub object name route, (cpu, memory, network ...) and reject it if not
//             if(monitor[route].hasOwnProperty(item)){            // check if the method have any sub object name route like all, cached, active... and  reject it if not
//                 monitor[route][item](function(data){ 
//                     res.send(JSON.stringify(data))
//                 });
//             }else{
//                 res.send(JSON.stringify({'error':"INVALID properties"}));
//             }
//         }else{
//             res.send(JSON.stringify({'error':"INVALID type"}));
//         }
//     // }
// }