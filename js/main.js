window.addEventListener("DOMContentLoaded", function () {

    document.getElementById("find-me").addEventListener("click", geoFindMe);
    document.getElementById("shareBtn").addEventListener("click", share);


    function geoFindMe() {

        const status = document.querySelector('#status');
        const mapLink = document.querySelector('#map-link');
        const iframe = document.querySelector('#iframe');

        mapLink.href = '';
        mapLink.textContent = '';


        if (!navigator.geolocation) {
            status.textContent = 'Geolocation is not supported by your browser';
        } else {
            status.textContent = 'מאתר את מיקומך...';
            navigator.geolocation.getCurrentPosition(success, error);
        }

        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            status.textContent = '';
            mapLink.href = `https://maps.google.com/?q=${latitude},${longitude}`;
            mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;

            iframe.src = `https://maps.google.com/?output=embed&q=${latitude},${longitude}`;
            iframe.classList.remove("d-none");

        }

        function error() {
            status.textContent = 'לא ניתן לאתר את מיקומך';
        }

    }

    document.querySelector('#find-me').addEventListener('click', geoFindMe);


    function share() {

        if (navigator.canShare) {
            navigator.share({
                title: 'LocationMap',
                text: 'זה המיקום שלי',
                url: 'https://maps.google.com/?q=${latitude},${longitude}'

            })
                .then(() => console.log('Share was successful.'))
                .catch((error) => console.log('Sharing failed', error));
        }
        else {
            console.log(`Your system doesn't support sharing files.`);
        }
    }

})
