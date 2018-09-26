document.addEventListener('DOMContentLoaded',function(){
    
    window.addEventListener("message", function(event) {
        var message = JSON.parse(event.data);
        if(message){
            if(message.type == "contactSearch") {
                // document.getElementById("softphone").contentWindow.postMessage(JSON.stringify({
                //     type: 'sendContactSearch',
                //     data: JSON.parse(document.getElementById("contactSearchPayload").value)                    
                // }), "*");

                // document.getElementById("searchText").innerHTML = ": " + message.data.searchString;
                // document.set("searchText", ": " + message.data.searchString);
                // $("#searchText").val(": " + message.data.searchString);
                // $("#test").val("TESTING");
                sendContactSearch();
            }
        }
    });

    function sendContactSearch() {
        console.log('process add Search Context');
        document.getElementById("softphone").contentWindow.postMessage(JSON.stringify({
            type: 'sendContactSearch',
            data: JSON.parse(document.getElementById("contactSearchPayload").value)
        }), "*");
    }

})
