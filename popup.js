$(function(){
     
    
    // To retrive the older spendings.
    chrome.storage.sync.get(['total','limit'],function(budget){
        $('#total').text(budget.total);
        $('#lim').text(budget.limit);
    });

    $('#spend').click(function(){
        // Using chrome storage API.
        chrome.storage.sync.get(['total', 'limit'],function(budget){
            var newTotal = 0;
            if (budget.total){
                newTotal += parseInt(budget.total);
            }

            var amount = $('#amt').val();
            if (amount){
                newTotal += parseInt(amount);
            }


            // When expenditure limit is exceeded.
            chrome.storage.sync.set({'total': newTotal}, function(){               
                if (amount && newTotal >= budget.limit){
                    var popup_notif = {
                        type: "basic",
                        iconUrl: "16pixel.png",
                        title: "Limit reached!",
                        message: "Dude, expenditure limit exceeded."
                };
                chrome.notifications.create('limitNotif', popup_notif);

            }
            });
            $('#total').text(newTotal); // Update total expenditure.
            $('#amt').val('');  // Clear input box.

           

        });
    });
});