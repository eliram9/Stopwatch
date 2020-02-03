// Future features ->
// to display lap time (after the user clicked) on the side clock
// then side clock - main clock =  real time lap!

$(function() {
    // Main Variables
    var mode = 0;
    var timeCounter = 0;
    var lapCounter = 0;
    var action; // variable for setInterval
    var lapNumber = 0;
    
    // minutes, seconds, milliseconds for timeCounter and lapCounter
    var timeMinutes, timeSeconds, timeMilliseconds,
        lapMinutes, lapSeconds, lapMilliseconds;

    // On app load show start and lap buttons only.
    hideshowButtons("#startButton", "#lapButton");

    // Click on the start button
    $("#startButton").click(function() {
        mode = 1;
        hideshowButtons("#stopButton", "#lapButton");
        startAction();
    });

    // Click on the stop buttons
    $("#stopButton").click(function() {
        clearInterval(action);
        hideshowButtons("#resumeButton", "#resetButton");
    });

    // Click on resume button
    $("#resumeButton").click(function() {
        hideshowButtons("#stopButton", "#lapButton");
        startAction();
    });

    // Click on reset button
    $("#resetButton").click(function() {
        location.reload();
    });

    // Click on lap button
    $("#lapButton").click(function() {
        if (mode == 1) {
            clearInterval(action);
            addLap();
            startAction();
        }
    });

    // Main functions
    function hideshowButtons(x,y) {
        $(".control").hide(); 
        $(x).show(); 
        $(y).show();
    };

    function startAction() {
        action = setInterval(function() {
            timeCounter++;
            // when the time counter reaches to 10 minutes, reset.
            if (timeCounter == 100 * 60 * 10) {
                timeCounter = 0;
            }
            lapCounter++;
            if (lapCounter == 100 * 60 * 10) {
                lapCounter = 0;
            }
            updateTime();
        }, 10);
    };

    function updateTime() {
        // calculation of every time variable and update it in the HTML
        // 1min => 60 X 100 miliseconds = (6000 milliseconds)
        timeMinutes = Math.floor(timeCounter / 6000);
        timeSeconds = Math.floor((timeCounter%6000)/100);
        timeMilliseconds = Math.floor((timeCounter%6000)%100);
        $("#timeMinutes").text(format(timeMinutes));
        $("#timeSeconds").text(format(timeSeconds));
        $("#timeMilliseconds").text(format(timeMilliseconds));

        lapMinutes = Math.floor(timeCounter / 6000);
        lapSeconds = Math.floor((timeCounter%6000)/100);
        lapMilliseconds = Math.floor((timeCounter%6000)%100);
        $("#lapMinutes").text(format(lapMinutes));
        $("#lapSeconds").text(format(lapSeconds));
        $("#lapMilliseconds").text(lapMilliseconds);
    };

    // Format numbers, to keep of two numbers "XX" structor
    function format(number) {
        if(number < 10) {
            return '0' + number;
        }else {
            return number;
        }
    };

    // Print the lap detalis inside the lap box
    function addLap () {
        lapNumber++;
        // create a div (with js) and add it to "lap" section (HTML)
        var myLaps = '<div class="LapTimeDisplay">' +
                        '<div class="LapTimeTitle">' +
                            'Lap ' + lapNumber + 
                        '</div>' +
                        '<div class="LapTime">' + 
                            '<span>' + format(timeMinutes) + '</span>' + ':' +
                            '<span>' + format(timeSeconds) + '</span>' + ':' + 
                            '<span>' + format(timeMilliseconds) + '</span>' +
                        '</div>'  
                    '</div>';
        // Replace the newst lap on top
        $(myLaps).prependTo("#laps");
    };

});    