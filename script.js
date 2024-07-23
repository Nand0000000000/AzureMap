let map;

function initializeMap() {
    map = new atlas.Map('myMap', {
        center: [0, 0], // Centro inicial do mapa
        zoom: 2,
        language: 'en-US',
        authOptions: {
            authType: 'subscriptionKey',
            subscriptionKey: process.env.API_KEY // Substitua pela sua chave do Azure Maps
        }
    });

    map.events.add('ready', function () {
        console.log("Mapa pronto!");
        // Após o mapa estar pronto, obtém as coordenadas do servidor e adiciona o marcador
        fetch('http://localhost:3000/get-coordinates')
            .then(response => response.json())
            .then(data => {
                if (data.latitude && data.longitude) {
                    addMarker(data.latitude, data.longitude);
                }
            })
            .catch(error => console.error('Erro ao obter coordenadas:', error));
    });
}

function addMarker(latitude, longitude) {
    const position = [longitude, latitude];
    const marker = new atlas.HtmlMarker({
        position: position,
        text: '📍',
        color: 'DodgerBlue'
    });
    map.markers.add(marker);
    map.setCamera({
        center: position,
        zoom: 10
    });
}

document.addEventListener('DOMContentLoaded', initializeMap);
