ws = new WebSocket('ws://localhost:8080/api/ws');

function handleWSResponse(data) {
    data = JSON.parse(data);
    // id = data['id']
    // speed = data['speed']
    // currentTrackPiece = data['current_track_piece']
    // mapPosition = data['map_position']
    // map = data['map']
    // isConnected = data['is_connected']
    // currentLane = data['current_lane']
    // roadOffset = data['road_offset']

    list = document.getElementById('data').children
    list['id'].innerText = `ID: ${data['id']}`;
    list['speed'].innerText = `Speed: ${data['speed']}`
    list['currentTrackPiece'].innerText = `Current track-piece: ${data['current_track_piece']['type']}`;
    list['mapPosition'].innerText = `mapPosition: ${data['map_position']}`
    if (list['map'].children['mapList'].children.length <= 1) {
        data['map'].forEach(map => {
            obj = document.createElement('li');
            obj.innerText = map['type_name'];
            list['map'].children['mapList'].appendChild(obj);
        });
    }
    list['currentLane'].innerText = `currentLane: ${data['current_lane']}`
    list['roadOffset'].innerText = `roadOffset: ${data['road_offset']}`

}

// `{
//     "id": 1,
//     "speed": 0,
//     "current_track_piece": null,
//     "map_position": null,
//     "map": [],
//     "is_connected": true,
//     "current_lane": null,
//     "road_offset": null
// }`

id = window.location.href.split('/')[window.location.href.split('/').length-1]
const test = setInterval(() => {
    ws.send(`{"type": "get", "id": ${id}}`)
}, 1000);
ws.addEventListener('close', (event) =>{
    clearInterval(test);
})
ws.addEventListener('message', (event) => {
    handleWSResponse(event.data);
})