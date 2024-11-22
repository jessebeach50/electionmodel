//Array for 2024 State Data
const statesArray = [];
var pollingAverage = 0;
setBackgroundColor();

//DATA
const csvUrl = 'https://raw.githubusercontent.com/jessebeach50/electionmodel/main/ModelData/ElectionModelData.csv';

// Use Papa Parse to fetch and parse the CSV file; runs when file loads
Papa.parse(csvUrl, {
    download: true,
    header: true, // Set to false if the CSV doesn't have headers
    dynamicTyping: true, // Convert types automatically
    skipEmptyLines: true, // Skip empty lines
    complete: function (results) {
        processStates(results.data, '2024');
        populateDropDown();
        setColorBasedOnChance();
        getPercentDWin()
    },
    error: function (error) {
        console.error("Error parsing CSV:", error);
    }
});


// Hover box displays info about state when hovered over
var tooltipSpan = document.getElementById('details-box');

document.addEventListener('mouseover', function (e) {
    if (e.target.tagName == 'path') {

        var stateName = e.target.dataset.name;
        var stateAbbr = e.target.dataset.id;

        var hoveredState = null;
        var found = false;
        for (var i = 0; i < statesArray.length; i++) {
            if (statesArray[i].State == stateName) {
                hoveredState = statesArray[i];
                found = true;
                //console.log(statesArray[i]);
                break;
            }
        }

        //document.getElementById("details-box").innerHTML = stateName + "\n" + stateAbbr + "\n2020 Result: " + hoveredState.Election2020Results;
        document.getElementById("details-box").innerHTML = hoveredState.InfoBoxString 
        //+ "-" + hoveredState.Abbr;
        document.getElementById("details-box").style.opacity = "100%";
    }
    else {
        document.getElementById("details-box").style.opacity = "0%";
    }
});
window.onmousemove = function (e) {
    var x = e.clientX,
        y = e.clientY;
    tooltipSpan.style.top = (y + 20) + 'px';
    tooltipSpan.style.left = (x) + 'px';
};



// Adding an event listener to the buttons
document.addEventListener('DOMContentLoaded', (event) => {
    const button2024 = document.getElementById('2024 Model');
    button2024.addEventListener('click', handleClick2024);

    const button2020 = document.getElementById('2020 Model');
    button2020.addEventListener('click', handleClick2020Model);

    const button2016 = document.getElementById('2016 Model');
    button2016.addEventListener('click', handleClick2016Model);

    const button2012 = document.getElementById('2012 Model');
    button2012.addEventListener('click', handleClick2012Model);

    const button2020r = document.getElementById('2020 Actual Results');
    button2020r.addEventListener('click', handleClickResults2020);

    const button2016r = document.getElementById('2016 Actual Results');
    button2016r.addEventListener('click', handleClickResults2016);

    const button2012r = document.getElementById('2012 Actual Results');
    button2012r.addEventListener('click', handleClickResults2012);

    const enterButton = document.getElementById('enterButton');
    enterButton.addEventListener('click', handleClickEnterButton);

    const callButtonD = document.getElementById('callButtonD');
    callButtonD.addEventListener('click', handleClickCallButtonD);

    const callButtonR = document.getElementById('callButtonR');
    callButtonR.addEventListener('click', handleClickCallButtonR);
});


//2024 Model Click--------------------------------------------------------------------------------------------------------------------------
// This function will be executed when the 2024 Model button is clicked
function handleClick2024() {
    statesArray.length = 0;
    // Use Papa Parse to fetch and parse the CSV file
    Papa.parse(csvUrl, {
        download: true,
        header: true, // Set to false if the CSV doesn't have headers
        dynamicTyping: true, // Convert types automatically
        skipEmptyLines: true, // Skip empty lines
        complete: function (results) {
            processStates(results.data, '2024');
            setColorBasedOnChance();
            setBackgroundColor(pollingAverage)
            getPercentDWin()
        },
        error: function (error) {
            console.error("Error parsing CSV:", error);
        }
    });
}

//2020 Model Click--------------------------------------------------------------------------------------------------------------------------
// This function will be executed when the 2024 Model button is clicked
function handleClick2020Model() {
    statesArray.length = 0;
    // Use Papa Parse to fetch and parse the CSV file
    Papa.parse(csvUrl, {
        download: true,
        header: true, // Set to false if the CSV doesn't have headers
        dynamicTyping: true, // Convert types automatically
        skipEmptyLines: true, // Skip empty lines
        complete: function (results) {
            processStates(results.data, '2020');
            setColorBasedOnChance();
            setBackgroundColor(pollingAverage)
            getPercentDWin()
        },
        error: function (error) {
            console.error("Error parsing CSV:", error);
        }
    });
}
function handleClickResults2020() {
    //console.log("Here");
    statesArray.length = 0;
    document.documentElement.style.cssText = "--maincolor: rgb(49, 50, 125)";
    // Use Papa Parse to fetch and parse the CSV file
    Papa.parse(csvUrl, {
        download: true,
        header: true, // Set to false if the CSV doesn't have headers
        dynamicTyping: true, // Convert types automatically
        skipEmptyLines: true, // Skip empty lines
        complete: function (results) {
            processStates(results.data, '2020');
            setColorsBasedOnResults('2020');
        },
        error: function (error) {
            console.error("Error parsing CSV:", error);
        }
    });

}
//2016 Model Click--------------------------------------------------------------------------------------------------------------------------
// This function will be executed when the 2024 Model button is clicked
function handleClick2016Model() {
    statesArray.length = 0;
    // Use Papa Parse to fetch and parse the CSV file
    Papa.parse(csvUrl, {
        download: true,
        header: true, // Set to false if the CSV doesn't have headers
        dynamicTyping: true, // Convert types automatically
        skipEmptyLines: true, // Skip empty lines
        complete: function (results) {
            processStates(results.data, '2016');
            setColorBasedOnChance();
            setBackgroundColor(pollingAverage);
            getPercentDWin()
        },
        error: function (error) {
            console.error("Error parsing CSV:", error);
        }
    });
}
function handleClickResults2016() {

    statesArray.length = 0;
    document.documentElement.style.cssText = "--maincolor: rgb(125, 51, 49)";
    // Use Papa Parse to fetch and parse the CSV file
    Papa.parse(csvUrl, {
        download: true,
        header: true, // Set to false if the CSV doesn't have headers
        dynamicTyping: true, // Convert types automatically
        skipEmptyLines: true, // Skip empty lines
        complete: function (results) {
            processStates(results.data, '2016');
            setColorsBasedOnResults('2016');
        },
        error: function (error) {
            console.error("Error parsing CSV:", error);
        }
    });

}

//2012 Model Click--------------------------------------------------------------------------------------------------------------------------
// This function will be executed when the 2024 Model button is clicked
function handleClick2012Model() {
    statesArray.length = 0;
    // Use Papa Parse to fetch and parse the CSV file
    Papa.parse(csvUrl, {
        download: true,
        header: true, // Set to false if the CSV doesn't have headers
        dynamicTyping: true, // Convert types automatically
        skipEmptyLines: true, // Skip empty lines
        complete: function (results) {
            processStates(results.data, '2012');
            setColorBasedOnChance();
            setBackgroundColor();
            getPercentDWin();
        },
        error: function (error) {
            console.error("Error parsing CSV:", error);
        }
    });
}

function handleClickResults2012() {

    statesArray.length = 0;
    document.documentElement.style.cssText = "--maincolor: rgb(49, 50, 125)";
    // Use Papa Parse to fetch and parse the CSV file
    Papa.parse(csvUrl, {
        download: true,
        header: true, // Set to false if the CSV doesn't have headers
        dynamicTyping: true, // Convert types automatically
        skipEmptyLines: true, // Skip empty lines
        complete: function (results) {
            processStates(results.data, '2012');
            setColorsBasedOnResults('2012');
        },
        error: function (error) {
            console.error("Error parsing CSV:", error);
        }
    });

}


//Set the colors to results
function setColorsBasedOnResults(year) {


    // Clear Segments so they can be reloaded
    const segments = document.querySelectorAll('.color-segment');

    segments.forEach(segment => {
        // Get width and color from data attributes
        const width = segment.getAttribute('data-width');
        const color = segment.getAttribute('data-color');

        // Apply width and color to the segment
        segment.style.width = `${0}%`;
        segment.style.backgroundColor = color;
    });

    var width1 = 0;
    var width2 = 0;
    var width3 = 0;
    var width4 = 0;
    var width5 = 0;
    var width6 = 0;
    var width7 = 0;
    var width8 = 0;
    var width9 = 0;
    var width10 = 0;
    var width11 = 0;
    var width12 = 0;
    var width13 = 0;
    var width14 = 0;
    var width15 = 0;
    var width16 = 0;

    var DVotes = 0;
    var RVotes = 0;


    for (var i = 0; i < statesArray.length; i++) {
        if (year == '2020') {
            DVotes = '306'
            RVotes = '232'
            var stater = statesArray[i].Election2020Results;
        }
        if (year == '2016') {
            DVotes = '232'
            RVotes = '306'
            var stater = statesArray[i].Election2016Results;
        }
        if (year == '2012') {
            DVotes = '332'
            RVotes = '206'
            var stater = statesArray[i].Election2012Results;
        }
        var stateAbbr = statesArray[i].StateAbbreviation;
        svgState = document.getElementById(stateAbbr);
        var stateEV = statesArray[i].ElectoralVotes
        var percent = (stateEV / 538) * 100

        if (stater > 25) {
            try { svgState.style.fill = 'rgb(19, 25, 109)'; } catch { }
            width2 = width2 + percent;
        }
        else if (stater > 20) {
            try { svgState.style.fill = 'rgb(24, 31, 121)'; } catch { }
            width3 = width3 + percent;
        }
        else if (stater > 15) {
            try { svgState.style.fill = 'rgb(41, 48, 141)'; } catch { }
            width4 = width4 + percent;
        }
        else if (stater > 10) {
            try { svgState.style.fill = 'rgb(63, 71, 167)'; } catch { }
            width5 = width5 + percent;
        }
        else if (stater > 5) {
            try { svgState.style.fill = 'rgb(95, 102, 197)'; } catch { }
            width6 = width6 + percent;
        }
        else if (stater > 1) {
            try { svgState.style.fill = 'rgb(129, 135, 216)'; } catch { }
            width7 = width7 + percent;
        }
        else if (stater > 0) {
            try { svgState.style.fill = 'rgb(173, 178, 242)'; } catch { }
            width8 = width8 + percent;
        }
        else if (stater > -1) {
            try { svgState.style.fill = 'rgb(242, 173, 173)'; } catch { }
            width9 = width9 + percent;
        }
        else if (stater > -5) {
            try { svgState.style.fill = 'rgb(215, 128, 128)'; } catch { }
            width10 = width10 + percent;
        }
        else if (stater > -10) {
            try { svgState.style.fill = 'rgb(195, 93, 93)'; } catch { }
            width11 = width11 + percent;
        }
        else if (stater > -15) {
            try { svgState.style.fill = 'rgb(163, 59, 59)'; } catch { }
            width12 = width12 + percent;
        }
        else if (stater > -20) {
            try { svgState.style.fill = 'rgb(137, 37, 37)'; } catch { }
            width13 = width13 + percent;
        }
        else if (stater > -25) {
            try { svgState.style.fill = 'rgb(121, 24, 24)'; } catch { }
            width14 = width14 + percent;
        }
        else {
            try { svgState.style.fill = 'rgb(105, 15, 15)'; } catch { }
            width15 = width15 + percent;
        }

    }
    segments[0].style.width = `${width1}%`;
    segments[1].style.width = `${width2}%`;
    segments[2].style.width = `${width3}%`;
    segments[3].style.width = `${width4}%`;
    segments[4].style.width = `${width5}%`;
    segments[5].style.width = `${width6}%`;
    segments[6].style.width = `${width7}%`;
    segments[7].style.width = `${width8}%`;
    segments[8].style.width = `${width9}%`;
    segments[9].style.width = `${width10}%`;
    segments[10].style.width = `${width11}%`;
    segments[11].style.width = `${width12}%`;
    segments[12].style.width = `${width13}%`;
    segments[13].style.width = `${width14}%`;
    segments[14].style.width = `${width15}%`;
    segments[15].style.width = `${width16}%`;

    var element = document.querySelector('.RepBarcount');
    element.textContent = RVotes

    var element2 = document.querySelector('.DemBarcount');
    element2.textContent = DVotes
}

//Process states and model----
function processStates(states, year) {
    //cycle through every state and parse the data as needed
    states.forEach(s => {
        var stateName = s.State

        if (stateName == 'National' && year == '2024') {
            pollingAverage = s.Polls;

        }
        else if (stateName == 'National' && year == '2020') {
            pollingAverage = 8.4;
        }
        else if (stateName == 'National' && year == '2016') {
            pollingAverage = 3.9;
        }
        else if (stateName == 'National' && year == '2012') {
            pollingAverage = .7;
        }

        if (year == '2024') {
            var pollingErrorInMonth = 0;
        }
        else {
            var pollingErrorInMonth = 0;
        }

        var standardPollingError = 3;

        var maxDPopularVote = pollingAverage + pollingErrorInMonth + standardPollingError;
        var maxRPopularVote = pollingAverage - pollingErrorInMonth - standardPollingError;

        //get all state results by year
        var e2000Results = Number(s.zeroresults);
        var e2004Results = Number(s.fourresults);
        var e2008Results = Number(s.eightresults);
        var e2012Results = Number(s.twelveresults);
        var e2016Results = Number(s.sixteenresults);
        var e2020Results = Number(s.twentyresults);

        //adjust states for popular vote to get what they would be in a neutral year
        var neutral2000 = e2000Results - 0.5;
        var neutral2004 = e2004Results + 2.4;
        var neutral2008 = e2008Results - 7.2;
        var neutral2012 = e2012Results - 3.9;
        var neutral2016 = e2016Results - 2.1;
        var neutral2020 = e2020Results - 4.5;

        var polls = null;

        if (year == '2024') {
            //Get average state shift to see what the projected neutral environment will be in 2024
            var shift1 = neutral2020 - neutral2016
            var shift2 = neutral2016 - neutral2012

            var neutralProjectedOnShift = neutral2020 + ((shift1 + shift2) / 2);

            //Compare national polls and state polls to see what the polls think the neutral environment of the state will be in 2024
            polls = s.Polls;
            var neutralProjectedOnPolls = polls - pollingAverage;

            //Average the above
            //console.log(polls);
            if (polls != null) {
                var neutralProjected = (neutralProjectedOnPolls + neutralProjectedOnShift) / 2
            }
            else {
                var neutralProjected = neutralProjectedOnShift;
            }
        }

        if (year == '2020') {
            //Get average state shift to see what the projected neutral environment will be in 2024
            var shift1 = neutral2016 - neutral2012
            var shift2 = neutral2012 - neutral2008

            var neutralProjectedOnShift = neutral2016 + ((shift1 + shift2) / 2);

            //Compare national polls and state polls to see what the polls think the neutral environment of the state will be in 2024
            polls = s.Polls2020;
            var neutralProjectedOnPolls = polls - pollingAverage;

            //Average the above
            var neutralProjected = (neutralProjectedOnPolls + neutralProjectedOnShift) / 2
        }
        if (year == '2016') {
            //Get average state shift to see what the projected neutral environment will be in 2024
            var shift1 = neutral2012 - neutral2008
            var shift2 = neutral2008 - neutral2004

            var neutralProjectedOnShift = neutral2012 + ((shift1 + shift2) / 2);

            //Compare national polls and state polls to see what the polls think the neutral environment of the state will be in 2024
            polls = s.Polls2016
            var neutralProjectedOnPolls = polls - pollingAverage;

            //Average the above
            var neutralProjected = (neutralProjectedOnPolls + neutralProjectedOnShift) / 2
        }
        if (year == '2012') {
            //Get average state shift to see what the projected neutral environment will be in 2024
            var shift1 = neutral2008 - neutral2004
            var shift2 = neutral2004 - neutral2000

            var neutralProjectedOnShift = neutral2008 + ((shift1 + shift2) / 2);

            //Compare national polls and state polls to see what the polls think the neutral environment of the state will be in 2024
            var polls = s.Polls2012;
            var neutralProjectedOnPolls = polls - pollingAverage;

            //Average the above
            var neutralProjected = (neutralProjectedOnPolls + neutralProjectedOnShift) / 2
            var polls2012 = s.Polls2012;
        }
        //---------------------------------------Election Model Portion-------------------------------------------------------------
        var outcomesArray = [];

        //Basic Model using the polling average, account for state poll inaccuracyy by +- 4
        //We'll need to account for polling error in states and nationally to get result so we do a nested for loop
        var maxD = neutralProjectedOnPolls + pollingErrorInMonth + 6;
        var maxR = neutralProjectedOnPolls - pollingErrorInMonth - 6;

        if (polls == null) {

        } else {
            while (maxR < (maxD + .1)) {
                var maxDNat = maxDPopularVote;
                var maxRNat = maxRPopularVote;
                while (maxRNat < (maxDNat + .1)) {
                    var outcome = maxR + maxRNat;
                    outcomesArray.push(outcome);
                    outcomesArray.push(outcome);
                    maxRNat = maxRNat + .5;
                }
                maxR = maxR + .5;
            }
        }
        //Basic Model using the expected shift
        var maxD = neutralProjectedOnShift + 6;
        var maxR = neutralProjectedOnShift - 6;

        while (maxR < (maxD + .1)) {
            var maxDNat = maxDPopularVote;
            var maxRNat = maxRPopularVote;
            while (maxRNat < (maxDNat + .1)) {
                var outcome = maxR + maxRNat;
                outcomesArray.push(outcome);
                outcomesArray.push(outcome);
                maxRNat = maxRNat + .5;
            }
            maxR = maxR + .5;
        }

        //Basic Model using the last election 
        if (year == "2024") {
            var maxD = e2020Results + 4;
            var maxR = e2020Results - 4;

            while (maxR < (maxD + .1)) {
                var maxDNat = 3;
                var maxRNat = -3;
                while (maxRNat < (maxDNat + .1)) {
                    var outcome = maxR + maxRNat;
                    outcomesArray.push(outcome);
                    maxRNat = maxRNat + .5;
                }
                maxR = maxR + .5;
            }
        }
        if (year == "2020") {
            var maxD = e2016Results + 4;
            var maxR = e2016Results - 4;

            while (maxR < (maxD + .1)) {
                var maxDNat = 3;
                var maxRNat = -3;
                while (maxRNat < (maxDNat + .1)) {
                    var outcome = maxR + maxRNat;
                    outcomesArray.push(outcome);
                    maxRNat = maxRNat + .5;
                }
                maxR = maxR + .5;
            }
        }
        if (year == "2016") {
            var maxD = e2012Results + 4;
            var maxR = e2012Results - 4;

            while (maxR < (maxD + .1)) {
                var maxDNat = 3;
                var maxRNat = -3;
                while (maxRNat < (maxDNat + .1)) {
                    var outcome = maxR + maxRNat;
                    outcomesArray.push(outcome);
                    maxRNat = maxRNat + .5;
                }
                maxR = maxR + .5;
            }
        }
        if (year == "2012") {
            var maxD = e2008Results + 4;
            var maxR = e2008Results - 4;

            while (maxR < (maxD + .1)) {
                var maxDNat = 3;
                var maxRNat = -3;
                while (maxRNat < (maxDNat + .1)) {
                    var outcome = maxR + maxRNat;
                    outcomesArray.push(outcome);
                    maxRNat = maxRNat + .5;
                }
                maxR = maxR + .5;
            }
        }
        //Basic Model using the expected shift
        var maxD = neutralProjected + 12;
        var maxR = neutralProjected - 12;

        while (maxR < (maxD + .1)) {
            var maxDNat = maxDPopularVote + 4;
            var maxRNat = maxRPopularVote - 4;
            while (maxRNat < (maxDNat + .1)) {
                var outcome = maxR + maxRNat;
                outcomesArray.push(outcome);
                outcomesArray.push(outcome);
                maxRNat = maxRNat + .5;
            }
            maxR = maxR + .5;
        }

        //sort array and count number of times Dem wins to get a percentage and median outcome
        var numDWins = 0;

        var i = 0;
        while (i < outcomesArray.length) {
            var result = outcomesArray[i];
            if (result > 0) {
                numDWins = numDWins + 1;
            }
            i = i + 1;
        }

        //sort array
        outcomesArray.sort((a, b) => {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        });

        //Get Percent chance and median outcome
        var percentDWin = numDWins / outcomesArray.length;
        var medianN = ~~(outcomesArray.length / 2);
        var median = outcomesArray[medianN];

        //String that will show when state is hovered over
        if (year == '2024') {
            infoBoxString = s.State + "\nElection 2020 Results: " + e2020Results + "\nProj. 2024 Result: " + median + "\nDemocrat Win %: " + percentDWin * 100 + "\n2024 Polling Average: " + s.Polls;
        }
        if (year == '2020') {
            infoBoxString = s.State + "\nActual 2020 Results: " + e2020Results + "\nProj. 2020 Result: " + median + "\nDemocrat Win %: " + percentDWin * 100 + "\n2020 Polling Average: " + s.Polls2020;
        }
        if (year == '2016') {
            infoBoxString = s.State + "\nActual 2016 Results: " + e2016Results + "\nProj. 2016 Result: " + median + "\nDemocrat Win %: " + percentDWin * 100 + "\n2016 Polling Average: " + s.Polls2016;
        }
        if (year == '2012') {
            infoBoxString = s.State + "\nActual 2012 Results: " + e2012Results + "\nProj. 2012 Result: " + median + "\nDemocrat Win %: " + percentDWin * 100 + "\n2012 Polling Average: " + s.Polls2012;
        }
        //This is the state data obbject that is put into the array-------------------------------------------------------
        let stateData = {
            State: stateName,
            StateAbbreviation: s.Abbr,
            ElectoralVotes: s.EV,
            Polls: s.polls,

            Election2000Results: e2000Results,
            Election2004Results: e2004Results,
            Election2008Results: e2008Results,
            Election2012Results: e2012Results,
            Election2016Results: e2016Results,
            Election2020Results: e2020Results,

            Election2000ResultsNeutral: neutral2000,
            Election2004ResultsNeutral: neutral2004,
            Election2008ResultsNeutral: neutral2008,
            Election2012ResultsNeutral: neutral2012,
            Election2016ResultsNeutral: neutral2016,
            Election2020ResultsNeutral: neutral2020,

            ElectionNeutralProjectedShift: neutralProjectedOnShift,
            ElectionNeutralProjectedPolls: neutralProjectedOnPolls,
            ElectionNeutralProjected: neutralProjected,

            ChanceOfDWin: percentDWin,
            MedianOutcome: median,

            InfoBoxString: infoBoxString
        };
        statesArray.push(stateData);
    });
}

//Set the colors based on 2024 result
function setColorBasedOnChance() {

    // Clear Segments so they can be reloaded
    const segments = document.querySelectorAll('.color-segment');

    segments.forEach(segment => {
        // Get width and color from data attributes
        const width = segment.getAttribute('data-width');
        const color = segment.getAttribute('data-color');

        // Apply width and color to the segment
        segment.style.width = `${0}%`;
        segment.style.backgroundColor = color;
    });

    var width1 = 0;
    var width2 = 0;
    var width3 = 0;
    var width4 = 0;
    var width5 = 0;
    var width6 = 0;
    var width7 = 0;
    var width8 = 0;
    var width9 = 0;
    var width10 = 0;
    var width11 = 0;
    var width12 = 0;
    var width13 = 0;
    var width14 = 0;
    var width15 = 0;
    var width16 = 0;

    var DVotes = 0;
    var RVotes = 0;

    for (var i = 0; i < statesArray.length; i++) {
        var statePercent = statesArray[i].ChanceOfDWin;
        var stateAbbr = statesArray[i].StateAbbreviation;
        var stateEV = statesArray[i].ElectoralVotes

        var percent = (stateEV / 538) * 100

        svgState = document.getElementById(stateAbbr);

        if (statePercent > '.50') {
            DVotes = DVotes + stateEV
        } else {
            RVotes = RVotes + stateEV
        }


        if (statePercent == 1000) {
            try { svgState.style.fill = 'rgb(0, 12, 65)'; } catch { };
            width1 = width1 + percent;
        }
        else if (statePercent == -1000) {
            try { svgState.style.fill = 'rgb(65, 12, 0)'; } catch { }
            width16 = width16 + percent;
        }
        else if (statePercent > .99) {
            try { svgState.style.fill = 'rgb(19, 25, 109)'; } catch { }
            width2 = width2 + percent;
        }
        else if (statePercent > .95) {
            try { svgState.style.fill = 'rgb(24, 31, 121)'; } catch { }
            width3 = width3 + percent;
        }
        else if (statePercent > .9) {
            try { svgState.style.fill = 'rgb(41, 48, 141)'; } catch { }
            width4 = width4 + percent;
        }
        else if (statePercent > .8) {
            try { svgState.style.fill = 'rgb(63, 71, 167)'; } catch { }
            width5 = width5 + percent;
        }
        else if (statePercent > .7) {
            try { svgState.style.fill = 'rgb(95, 102, 197)'; } catch { }
            width6 = width6 + percent;
        }
        else if (statePercent > .6) {
            try { svgState.style.fill = 'rgb(129, 135, 216)'; } catch { }
            width7 = width7 + percent;
        }
        else if (statePercent > .5) {
            try { svgState.style.fill = 'rgb(173, 178, 242)'; } catch { }
            width8 = width8 + percent;
        }
        else if (statePercent > .4) {
            try { svgState.style.fill = 'rgb(242, 173, 173)'; } catch { }
            width9 = width9 + percent;
        }
        else if (statePercent > .3) {
            try { svgState.style.fill = 'rgb(215, 128, 128)'; } catch { }
            width10 = width10 + percent;
        }
        else if (statePercent > .2) {
            try { svgState.style.fill = 'rgb(195, 93, 93)'; } catch { }
            width11 = width11 + percent;
        }
        else if (statePercent > .1) {
            try { svgState.style.fill = 'rgb(163, 59, 59)'; } catch { }
            width12 = width12 + percent;
        }
        else if (statePercent > .05) {
            try { svgState.style.fill = 'rgb(137, 37, 37)'; } catch { }
            width13 = width13 + percent;
        }
        else if (statePercent > .01) {
            try { svgState.style.fill = 'rgb(121, 24, 24)'; } catch { }
            width14 = width14 + percent;
        }
        else {
            try { svgState.style.fill = 'rgb(105, 15, 15)'; } catch { }
            width15 = width15 + percent;
        }

    }

    segments[0].style.width = `${width1}%`;
    segments[1].style.width = `${width2}%`;
    segments[2].style.width = `${width3}%`;
    segments[3].style.width = `${width4}%`;
    segments[4].style.width = `${width5}%`;
    segments[5].style.width = `${width6}%`;
    segments[6].style.width = `${width7}%`;
    segments[7].style.width = `${width8}%`;
    segments[8].style.width = `${width9}%`;
    segments[9].style.width = `${width10}%`;
    segments[10].style.width = `${width11}%`;
    segments[11].style.width = `${width12}%`;
    segments[12].style.width = `${width13}%`;
    segments[13].style.width = `${width14}%`;
    segments[14].style.width = `${width15}%`;
    segments[15].style.width = `${width16}%`;

    var element = document.querySelector('.RepBarcount');
    element.textContent = RVotes

    var element2 = document.querySelector('.DemBarcount');
    element2.textContent = DVotes
}

//Set the colors based on 2024 result
function setBackgroundColor() {
    if (pollingAverage > 15) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(50, 50, 150)"; } catch { }
    }
    else if (pollingAverage > 10) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(49, 50, 125)"; } catch { }
    }
    else if (pollingAverage > 8) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(62, 50, 117)"; } catch { }
    }
    else if (pollingAverage > 6) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(73, 50, 110)"; } catch { }
    }
    else if (pollingAverage > 4) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(82, 50, 102)"; } catch { }
    }
    else if (pollingAverage > 2) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(90, 50, 94)"; } catch { }
    }
    else if (pollingAverage >= 0) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(97, 50, 87)"; } catch { }
    }
    else if (pollingAverage > -2) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(103, 50, 79)"; } catch { }
    }
    else if (pollingAverage > -4) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(109, 51, 72)"; } catch { }
    }
    else if (pollingAverage > -6) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(115, 51, 64)"; } catch { }
    }
    else if (pollingAverage > -8) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(120, 51, 57)"; } catch { }
    }
    else if (pollingAverage > -10) {
        try { document.documentElement.style.cssText = "--maincolor: rgb(125, 51, 49)"; } catch { }
    }
    else {
        try { document.documentElement.style.cssText = "--maincolor: rgb(150, 50, 50)"; } catch { }
    }

}
//Drop Down Menu

// Get the select element
const dropdown = document.getElementById('stateDropDown');
const numberInput = document.getElementById('numberInput');

numberInput.addEventListener('change', changeInputTypeNumber);

function populateDropDown() {
    // Array of options
    const optionsArray = [];
    statesArray.forEach(element => {
        //console.log("I am here")
        optionsArray.push(element.StateAbbreviation);
    });



    // Populate the drop-down menu
    optionsArray.forEach(option => {
        // Create a new option element
        const optionElement = document.createElement('option');
        optionElement.textContent = option; // Set the text of the option
        optionElement.value = option; // Set the value of the option

        // Append the option element to the select element
        dropdown.appendChild(optionElement);
    });


}

function handleClickEnterButton() {

    if (inputType == "slider") {
        numberInput.value = slider.value;
    }
    if (inputType == "number") {
        slider.value = numberInput.value;
    }

    var percent = numberInput.value || 'None';
    var selectedState = dropdown.value;
    // Get references to the input field and display area

    console.log("I am here" + percent + " " + selectedState);


    for (var i = 0; i < statesArray.length; i++) {
        if (statesArray[i].StateAbbreviation == selectedState) {
            changeState = statesArray[i];
            found = true;
            console.log(statesArray[i]);
            break;
        }
    }

    if (percent <= 100 && percent >= 0) {
        console.log(statesArray[i].ChanceOfDWin)
        statesArray[i].ChanceOfDWin = percent / 100
        statesArray[i].InfoBoxString = statesArray[i].State + "\nElection 2020 Results: " + statesArray[i].Election2020Results + "\nProj. 2024 Result: " + statesArray[i].MedianOutcome + "\nDemocrat Win %: " + (statesArray[i].ChanceOfDWin * 100) + "\n2024 Polling Average: " + statesArray[i].Polls;
        console.log("====" + statesArray[i].ChanceOfDWin)
    }

    setColorBasedOnChance()
    getPercentDWin();
}

function handleClickCallButtonD() {
    const numberInput = document.getElementById('numberInput');
    var percent = numberInput.value || 'None';
    var selectedState = dropdown.value;
    // Get references to the input field and display area

    //console.log("I am here" + percent + " " + selectedState);


    for (var i = 0; i < statesArray.length; i++) {
        if (statesArray[i].StateAbbreviation == selectedState) {
            changeState = statesArray[i];
            found = true;
            console.log(statesArray[i]);
            break;
        }

    }
    console.log(statesArray[i].ChanceOfDWin)
    statesArray[i].ChanceOfDWin = 1000
    statesArray[i].InfoBoxString = statesArray[i].State + "\nElection 2020 Results: " + statesArray[i].Election2020Results + "\nProj. 2024 Result: " + statesArray[i].MedianOutcome + "\nDemocrat Win %: " + statesArray[i].ChanceOfDWin * 100 + "\n2024 Polling Average: " + statesArray[i].Polls;
    console.log(statesArray[i].ChanceOfDWin)

    setColorBasedOnChance()
    getPercentDWin();
}
function handleClickCallButtonR() {
    const numberInput = document.getElementById('numberInput');
    var percent = numberInput.value || 'None';
    var selectedState = dropdown.value;
    // Get references to the input field and display area

    //console.log("I am here" + percent + " " + selectedState);


    for (var i = 0; i < statesArray.length; i++) {
        if (statesArray[i].StateAbbreviation == selectedState) {
            changeState = statesArray[i];
            found = true;
            console.log(statesArray[i]);
            break;
        }

    }

    statesArray[i].ChanceOfDWin = -1000
    statesArray[i].InfoBoxString = statesArray[i].State + "\nElection 2020 Results: " + statesArray[i].Election2020Results + "\nProjected 2024 Result: " + statesArray[i].MedianOutcome + "\nDemocrat Win %: " + statesArray[i].ChanceOfDWin * 100 + "\n2024 Polling Average: " + statesArray[i].Polls;


    setColorBasedOnChance()
    getPercentDWin();
}
function getPercentDWin() {
    var DEV = 0;
    var DWins = 0;
    var count = 0;

    var DemVotesArray = [];

    while (count < 1000) {
        DEV = 0;
        for (var i = 0; i < statesArray.length; i++) {
            currentState = statesArray[i];

            var roll = Math.floor(Math.random() * (100 - 0 + 1)) + 0;

            if (roll < (currentState.ChanceOfDWin * 100)) {
                DEV = DEV + currentState.ElectoralVotes;
            }

        }

        if (DEV >= 270) {
            DWins++;
        }
        DemVotesArray.push(DEV);
        count++;
    }

    count = 0;
    sum = 0;
    while (count < DemVotesArray.length) {
        sum = sum + DemVotesArray[count];
        count++;
    }

    var average = sum / DemVotesArray.length
    //console.log(statesArray.length)
    console.log("Democrats win " + DWins + "/1000 Times \nAverage of " + average + "Elecotral Votes")

    let numberElement = document.getElementById('chanceOfDWinState')
    numberElement.innerText = (DWins / 1000) * 100;

    let EVElement = document.getElementById('projectedEVsD')
    EVElement.innerText = average


}

//Set Drop Down Menu to clicked state

document.addEventListener('DOMContentLoaded', function () {
    // Get all paths in the SVG
    const paths = document.querySelectorAll('svg path');
    const stateDropDown = document.getElementById('stateDropDown');

    paths.forEach(path => {
        path.addEventListener('click', function () {
            // Set the dropdown value to the clicked path's ID
            console.log(this.id)
            stateDropDown.value = this.id;
        });
    });
});


const slider = document.getElementById('sliderInput');
var inputType = "number"

// Event listener to run a function when slider is released
slider.addEventListener('change', handleClickEnterButton);
slider.addEventListener('input', changeInputTypeSlider);

function changeInputTypeSlider() {
    inputType = "slider"
}

function changeInputTypeNumber() {
    inputType = "number"
}
