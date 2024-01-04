function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function test_new_api(URI) {

    return new Promise((resolve, reject) => {
        fetch(URI)
            .then(response => response.json())

            // Call the function with the JSON data
            .then(jsonData => {
                if (jsonData.version) {
                    resolve();
                } else {
                    reject();
                }
            })
            .catch(error => {
                console.error('Error fetching JSON:', error);
                reject("Error fetching JSON");
            });

        return true
    })
}

$("#custom_api_form_button").click(function () {
    var custom_api_url = encodeURI($("#custom_api_form_input").val());

    if(custom_api_url == "") {
        setCookie("custom_api_url", "", 365);
        location.reload();
    }

    if (!(custom_api_url.endsWith(".json"))) {
        custom_api_url = custom_api_url + ".json";
    }

    test_new_api(custom_api_url).then(() => {
        setCookie("custom_api_url", custom_api_url, 365);
        location.reload();
    }, (error) => {
        console.log(error);

        $("#custom_api_form_invalid").show();
        $("#custom_api_form_input").addClass("border-danger");
        // TODO set error message
    });

});

$("#custom_api_form_reset").click(function () {
    setCookie("custom_api_url", "", 365);
    location.reload();
});


$("#custom_api_form_input").on('input', function () {
    // Resets error on edit input 
    $("#custom_api_form_invalid").hide();
    $("#custom_api_form_input").removeClass("border-danger");
});