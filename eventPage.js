var menuItem = {
    "id": "spendMoney",
    "title": "Spend Money",
    "contexts": ["selection"]
};

// If price of any item is 36,158 then its not considering , and hence not able to add it into money spent.

function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function(clickOnSelection){   
    if (clickOnSelection.menuItemId == "spendMoney" && clickOnSelection.selectionText){    
        if (isInt(clickOnSelection.selectionText)){          
            chrome.storage.sync.get(['total','limit'], function(budget){
                var newTotal = 0;
                if (budget.total){
                    newTotal += parseInt(budget.total);
                }

                newTotal += parseInt(clickOnSelection.selectionText);
                chrome.storage.sync.set({'total': newTotal}, function(){               
                if (newTotal >= budget.limit){
                    var popup_notif = {
                        type: "basic",
                        iconUrl: "16pixel.png",
                        title: "Limit reached!",
                        message: "Dude, expenditure limit exceeded."
                    };
                    chrome.notifications.create('limitNotif', popup_notif);

                    }
                });
            });
        }
    }
});

chrome.storage.onChanged.addListener(function(changes, storageName){
// Badge text is the small sized text that appers on extension. 
chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()}); 
});
