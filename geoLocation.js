document.addEventListener('DOMContentLoaded', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLatitude = position.coords.latitude;
            const userLongitude = position.coords.longitude;
            
            fetch('http://localhost:3000/receive-coordinates', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ latitude: userLatitude, longitude: userLongitude })
            })
            .then(response => response.json())
            .then(data => {
                console.log('Coordenadas recebidas pelo servidor:', data);
            })
            .catch(error => console.error('Erro ao enviar coordenadas:', error));
        }, error => {
            console.error('Erro ao acessar a geolocalização: ', error);
        });
    } else {
        console.error('Geolocalização não é suportada por este navegador.');
    }
});
