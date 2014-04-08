//tipPct is float, local to the program
//tipPercent is float, global
//tipPercentage is string, global
//tipPercentSetting is string, local to program
//billAmount is value of text field from index.html with same name

//start the jQuery function...
(function($) {
    
    //default tipPercent value
    var tipPercent = 15.0 ;
    
    //Listen for when app calling this file is loaded, run the function being defined....
    $( document ).on("ready", function() {
        //..on click of calctip button, run calctip function, it's a listener
        $('#calcTip').on('click', calcTip) ;
        //..On click of save settings button, run save settings function, it's a listener
        $('#saveSettings').on('click', saveSettings);
        
        //create a variable to retrieve the tip percent from local storage and store it in var
        var tipPercentSetting = localStorage.getItem('tipPercentSetting') ;
        
        //If tipPercentSetting is defined...
        if(tipPercentSetting) {
            tipPercent = parseFloat(tipPercentSetting);
        }
    
        //Make tipPercentage value equal the decimal value of tipPercent
        $('#tipPercentage').val(tipPercent) ;
    });

    $(document).on("deviceready", function(){
        StatusBar.overlaysWebView(false);
        StatusBar.backgroundcolor("gray");
    });

    //When save settings button is clicked, load saveSettings var, which is the value of
    //the following anonymous function
    var saveSettings = function() {
        try {
            //make tipPct the val of parseFloat with val of tipPercentage
            var tipPct = parseFloat($('#tipPercentage').val());
            //set tipPercentage in local storage to val of tipPct
            localStorage.setItem('tipPercentage', tipPct) ;
            //set value of tipPercent to tipPct.
            tipPercent = tipPct ;
            //back button functionality, take user to previous page
            window.history.back() ;        
        }
        catch (ex) {
            alert('Tip percentage must be a decimal');
        }
    };

    //when calcTip button is clicked, load calcTip var, which is equal to return
    //value of the following anonymous function
    var calcTip = function() {
        
        //create billAmt var, which is equal to the number value of the string from billAmount field from index.html
        var billAmt = Number($('#billAmount').val()) ;
        //calculate tip, assign to tipAmt variable
        var tipAmt = billAmt * tipPercent/100;
        //create totalAmt, which is equal to bill + tip
        var totalAmt = billAmt + tipAmt ;
    
        //display values on screen
        $('#tipAmount').text('$' + tipAmt.toFixed(2));
        $('#totalAmount').text('$' + totalAmt.toFixed(2));
    };
    
    $(document).on("ready", function(){
        $('#calcTip').on('click', calcTip);
        $('#saveSettings').on('click', saveSettings);
    });
//tell js that this was a jQuery function
})(jQuery);