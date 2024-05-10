function openModal() {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

function fetchIP() {
    $.get('https://api.ipify.org?format=json', function(data) {
        document.getElementById('ip-address').textContent = 'Your IP: ' + data.ip;
    });
}

fetchIP();
