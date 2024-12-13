    var result = [];
    var flgStop = false;
  
    function IsNumeric(n) {
        return !isNaN(n);
    }
    $("#checkBingo").attr("hidden", true);
    $(function() {
        $("#getit").click(function() {
            // hidden start button
            $("#getit").attr("hidden",true);
            $("#clear").attr("hidden",true);
            $("#highnumber").attr("disabled",true);

            var numLow = 1;
            var numHigh = $("#highnumber").val();
            var numberLeft = numHigh;
            var voiceLang = $("#lang").val();

            var numRand = randomNum(numLow, numHigh, result);

            while (inArray(numRand, result)) {
                if (result.length == numHigh) {
                    $("#randomnumber").text("Out of numbers");
                    exit;
                }
                numRand = randomNum(numLow, numHigh);
            }

            if (
                IsNumeric(numLow) &&
                IsNumeric(numHigh) &&
                parseFloat(numLow) <= parseFloat(numHigh) &&
                numLow != "" &&
                numHigh != ""
            ) {
                result.push(numRand);

                selectLang(voiceLang, numRand);
               
                numberLeft = numberLeft - result.length;

                $("#numberLeft").text("Number left: " + numberLeft);
                $("#numberhas").text("Number called: " + result.length);
                $("#randomnumber").text(numRand);
                $("#result").text(result);
            }

            countDown();
            return false;
        });

        function selectLang(lang, number) {
            var msg = new SpeechSynthesisUtterance(number);
            //msg.lang = 'en-US'
            msg.lang = lang;
            msg.rate = 1;
            window.speechSynthesis.speak(msg);
        }

        $("#lang").change(function() {
            var selectedValue = $(this).val();
            var randNum =  $("#randomnumber").text();
            selectLang(selectedValue, randNum);
        });

        $("input[type=text]").each(function() {
            $(this).data("first-click", true);
        });

        $("input[type=text]").focus(function() {
            if ($(this).data("first-click")) {
                $(this).val("");
                $(this).data("first-click", false);
                $(this).css("color", "black");
            }
        });
    });

    function inArray(needle, haystack) {
        var count = haystack.length;
        for (var i = 0; i < count; i++) {
            if (haystack[i] == needle) {
                return true;
            }
        }
        return false;
    }

    function randomNum(numLow, numHigh) {
        var adjustedHigh = parseFloat(numHigh) - parseFloat(numLow) + 1;
        var numRand = Math.floor(Math.random() * adjustedHigh) + parseFloat(numLow);

        return numRand;
    }

    function countDown() {
        if (this.flgStop == false) {
            var timeleft = $("#timeleft").val();
            var downloadTimer = setInterval(function() {
                if (timeleft <= 0 && this.flgStop == false) {
                    clearInterval(downloadTimer);
                    $("#getit").click();
                } else if (this.flgStop == true) {
                    $("#countdown").text("Bingo??? Please check the numbers below the page!");
                    $("#countdown").css("color", "blue");
                } else {
                    $("#countdown").text(timeleft + " seconds remaining");
                }
                timeleft -= 1;
            }, 1000);
        } else {
            $("#countdown").text("Bingo??? Please check the numbers below the page!");
            $("#countdown").css("color", "blue");
        }
    }

    function stopCountDown() {
        this.flgStop = true;
        $("#clear").removeAttr('hidden');
        $("#checkBingo").removeAttr("hidden");
    }

    function clearScreen() {
        location.reload();
    }
   
    $(".findNumber").blur(function() {
        var number = $(this).val();  
        if(inArray(number, result))
        {
            $(this).css("background-color", "green");
        }
        else
        {
            $(this).css("background-color", "red");
        }
        confirmWin();       
    });

    $("#number5").click(function(){
        if($("#checkNumber5").is(":hidden")){
            $("#checkNumber5").removeAttr('hidden');
            $("#number5").text("Remove check number 5");
        }else{
            $("#checkNumber5").attr('hidden',true);
            $("#checkNumber5").css("background-color", "transparent");
            $("#number5").text("Check Number 5? Click here");
        }      
    });

    function confirmWin(){
        let check = 0;
        let tempNumber = 0;
        $(".findNumber").each(function(index, e) {
            if( e.style.backgroundColor  === "green"){
                check++;
            }
        });
        if((check == 4 && $("#checkNumber5").is(":hidden")) || (check == 5 && !$("#checkNumber5").is(":hidden"))) {
            $("#textCheckNumber").text("MATCH!!! Congratulations to the winner")
            $("#textCheckNumber").css("color", "green");
        }else{
            $("#textCheckNumber").text("NOT MATCH!!! Sorry...")
            $("#textCheckNumber").css("color", "red");
        }
    }
