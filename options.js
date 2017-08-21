$(function(){

    chrome.storage.sync.get('limit',function(budget){
        $('#lim').val(budget.limit);
    });

    $('#save').click(function(){
        var limit = $('#lim').val();
        if (limit){
            chrome.storage.sync.set({'limit': limit}, function(){
                close();
            });
        }
    });

    $('#reset').click(function(){
        chrome.storage.sync.set({'total': 0}, function(){
          
            var popup_notif = {
                type: "basic",
                iconUrl: "16pixel.png",
                title: "Resetting Total",
                message: "Total has been reset to 0."
            };
           
            chrome.notifications.create('resetNotif', popup_notif);
           
        });
    });
});