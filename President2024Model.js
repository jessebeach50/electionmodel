//Array for 2024 State Data
const statesArray = [];
var pollingAverage = 0;

//DATA
const csvUrl = 'https://raw.githubusercontent.com/jessebeach50/electionmodel/main/ElectionModelData.csv';

// Use Papa Parse to fetch and parse the CSV file; runs when file loads
Papa.parse(csvUrl, {
    download: true,
    header: true, // Set to false if the CSV doesn't have headers
    dynamicTyping: true, // Convert types automatically
    skipEmptyLines: true, // Skip empty lines
    complete: function(results) {
        processStates(results.data, '2024');
        setColorBasedOnChance();
    },
    error: function(error) {
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
        for(var i = 0; i < statesArray.length; i++) {
            if (statesArray[i].State == stateName) {
                hoveredState = statesArray[i];
                found = true;
                console.log(statesArray[i]);
                break;
            }
        }
      
        //document.getElementById("details-box").innerHTML = stateName + "\n" + stateAbbr + "\n2020 Result: " + hoveredState.Election2020Results;
        document.getElementById("details-box").innerHTML = hoveredState.InfoBoxString;
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
        complete: function(results) {
            processStates(results.data, '2024');
            setColorBasedOnChance();
        },
        error: function(error) {
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
        complete: function(results) {
            processStates(results.data, '2020');
            setColorBasedOnChance();
        },
        error: function(error) {
            console.error("Error parsing CSV:", error);
        }
    });
}
function handleClickResults2020(){
    console.log("Here");
    statesArray.length = 0;
    // Use Papa Parse to fetch and parse the CSV file
    Papa.parse(csvUrl, {
        download: true,
        header: true, // Set to false if the CSV doesn't have headers
        dynamicTyping: true, // Convert types automatically
        skipEmptyLines: true, // Skip empty lines
        complete: function(results) {
            processStates(results.data, '2020');
            setColorsBasedOnResults('2020');
        },
        error: function(error) {
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
        complete: function(results) {
            processStates(results.data, '2016');
            setColorBasedOnChance();
        },
        error: function(error) {
            console.error("Error parsing CSV:", error);
        }
    });
}
function handleClickResults2016(){
    console.log("Here");
    statesArray.length = 0;
    // Use Papa Parse to fetch and parse the CSV file
    Papa.parse(csvUrl, {
        download: true,
        header: true, // Set to false if the CSV doesn't have headers
        dynamicTyping: true, // Convert types automatically
        skipEmptyLines: true, // Skip empty lines
        complete: function(results) {
            processStates(results.data, '2016');
            setColorsBasedOnResults('2016');
        },
        error: function(error) {
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
        complete: function(results) {
            processStates(results.data, '2012');
            setColorBasedOnChance();
        },
        error: function(error) {
            console.error("Error parsing CSV:", error);
        }
    });
}

function handleClickResults2012(){
    console.log("Here");
    statesArray.length = 0;
    // Use Papa Parse to fetch and parse the CSV file
    Papa.parse(csvUrl, {
        download: true,
        header: true, // Set to false if the CSV doesn't have headers
        dynamicTyping: true, // Convert types automatically
        skipEmptyLines: true, // Skip empty lines
        complete: function(results) {
            processStates(results.data, '2012');
            setColorsBasedOnResults('2012');
        },
        error: function(error) {
            console.error("Error parsing CSV:", error);
        }
    });
    
}


//Set the colors to results
function setColorsBasedOnResults(year){
    for(var i = 0; i < statesArray.length; i++) {
        if(year == '2020'){
            var stater = statesArray[i].Election2020Results;
        }
        if(year == '2016'){
            var stater = statesArray[i].Election2016Results;
        }
        if(year == '2012'){
            var stater = statesArray[i].Election2012Results;
        }
        var stateAbbr = statesArray[i].StateAbbreviation;
        svgState = document.getElementById(stateAbbr);
        if (stater > 25){
            try{svgState.style.fill='#040275';}catch{}
        }
        else if(stater > 20){
            try{svgState.style.fill='#0300c4';}catch{}
        } 
        else if(stater > 15){
            try{svgState.style.fill='#2b28f7';}catch{}
        }    
        else if(stater > 10){
            try{svgState.style.fill='#605df5';}catch{}
        } 
        else if(stater > 5){
            try{svgState.style.fill='#8a88fc';}catch{}
        } 
        else if(stater > 1){
            try{svgState.style.fill='#c6c5fa';}catch{}
        } 
        else if(stater > 0){
            try{svgState.style.fill='#e4e4f5';}catch{}
        }
        else if(stater > -1){
            try{svgState.style.fill='#fce8ea';}catch{}
        }
        else if(stater > -5){
            try{svgState.style.fill='#f0afb4';}catch{}
        }  
        else if(stater > -10){
            try{svgState.style.fill='#db7f87';}catch{}
        }  
        else if(stater > -15){
            try{svgState.style.fill='#cf515b';}catch{}
        }  
        else if(stater > -20){
            try{svgState.style.fill='#eb2334';}catch{}
        }  
        else if(stater > -25){
            try{svgState.style.fill='#de0417';}catch{}
        }         
        else{
            try{svgState.style.fill='#a80210';}catch{}
        }                 
        
    }
}





//Process states and model----
function processStates(states, year){   
    //cycle through every state and parse the data as needed
    states.forEach(s => {
        var stateName = s.State

        if(stateName == 'National' && year == '2024'){
            pollingAverage = s.Polls;
            
        }
        else if(stateName == 'National' && year == '2020'){
            pollingAverage = 8.4;
        }
        else if(stateName == 'National' && year == '2016'){
            pollingAverage = 3.9;
        }
        else if(stateName == 'National' && year == '2012'){
            pollingAverage = .7;
        }

        if(year == '2024'){
            var pollingErrorInMonth = 3;
        }
        else{
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
        
        if (year == '2024'){
            //Get average state shift to see what the projected neutral environment will be in 2024
            var shift1 = neutral2020 - neutral2016
            var shift2 = neutral2016 - neutral2012
        
            var neutralProjectedOnShift = neutral2020 + ((shift1 + shift2) / 2);

            //Compare national polls and state polls to see what the polls think the neutral environment of the state will be in 2024
            var neutralProjectedOnPolls = s.Polls - pollingAverage;

            //Average the above
            var neutralProjected = (neutralProjectedOnPolls + neutralProjectedOnShift) / 2
        }

        if (year == '2020'){
            //Get average state shift to see what the projected neutral environment will be in 2024
            var shift1 = neutral2016 - neutral2012
            var shift2 = neutral2012 - neutral2008
        
            var neutralProjectedOnShift = neutral2016 + ((shift1 + shift2) / 2);

            //Compare national polls and state polls to see what the polls think the neutral environment of the state will be in 2024
            var neutralProjectedOnPolls = s.Polls2020 - pollingAverage;

            //Average the above
            var neutralProjected = (neutralProjectedOnPolls + neutralProjectedOnShift) / 2
        }
        if (year == '2016'){
            //Get average state shift to see what the projected neutral environment will be in 2024
            var shift1 = neutral2012 - neutral2008
            var shift2 = neutral2008 - neutral2004
        
            var neutralProjectedOnShift = neutral2012 + ((shift1 + shift2) / 2);

            //Compare national polls and state polls to see what the polls think the neutral environment of the state will be in 2024
            var neutralProjectedOnPolls = s.Polls2016 - pollingAverage;

            //Average the above
            var neutralProjected = (neutralProjectedOnPolls + neutralProjectedOnShift) / 2
        }
        if (year == '2012'){
            //Get average state shift to see what the projected neutral environment will be in 2024
            var shift1 = neutral2008 - neutral2004
            var shift2 = neutral2004 - neutral2000
        
            var neutralProjectedOnShift = neutral2008 + ((shift1 + shift2) / 2);

            //Compare national polls and state polls to see what the polls think the neutral environment of the state will be in 2024
            var neutralProjectedOnPolls = s.Polls2012 - pollingAverage;

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
        
        if(polls2012 == null && year == '2012'){

        }else{
        while(maxR < (maxD + .1)){
            var maxDNat = maxDPopularVote;
            var maxRNat = maxRPopularVote;
            while(maxRNat < (maxDNat + .1)){
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
        
        while(maxR < (maxD + .1)){
            var maxDNat = maxDPopularVote;
            var maxRNat = maxRPopularVote;
            while(maxRNat < (maxDNat + .1)){
                var outcome = maxR + maxRNat;
                outcomesArray.push(outcome);
                outcomesArray.push(outcome);
                maxRNat = maxRNat + .5;
            }
            maxR = maxR + .5;
        } 

        //Basic Model using the last election 
        if (year == "2024"){         
            var maxD = e2020Results + 4;
            var maxR = e2020Results - 4;
        
            while(maxR < (maxD + .1)){
                var maxDNat = 3;
                var maxRNat = -3;
                while(maxRNat < (maxDNat + .1)){
                    var outcome = maxR + maxRNat;
                    outcomesArray.push(outcome);
                    maxRNat = maxRNat + .5;
                }
                maxR = maxR + .5;
            } 
        }
        if (year == "2020"){         
            var maxD = e2016Results + 4;
            var maxR = e2016Results - 4;
        
            while(maxR < (maxD + .1)){
                var maxDNat = 3;
                var maxRNat = -3;
                while(maxRNat < (maxDNat + .1)){
                    var outcome = maxR + maxRNat;
                    outcomesArray.push(outcome);
                    maxRNat = maxRNat + .5;
                }
                maxR = maxR + .5;
            } 
        }
        if (year == "2016"){         
            var maxD = e2012Results + 4;
            var maxR = e2012Results - 4;
        
            while(maxR < (maxD + .1)){
                var maxDNat = 3;
                var maxRNat = -3;
                while(maxRNat < (maxDNat + .1)){
                    var outcome = maxR + maxRNat;
                    outcomesArray.push(outcome);
                    maxRNat = maxRNat + .5;
                }
                maxR = maxR + .5;
            } 
        }
        if (year == "2012"){         
            var maxD = e2008Results + 4;
            var maxR = e2008Results - 4;
        
            while(maxR < (maxD + .1)){
                var maxDNat = 3;
                var maxRNat = -3;
                while(maxRNat < (maxDNat + .1)){
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
        
        while(maxR < (maxD + .1)){
            var maxDNat = maxDPopularVote + 4;
            var maxRNat = maxRPopularVote - 4;
            while(maxRNat < (maxDNat + .1)){
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
        while (i < outcomesArray.length){
            var result = outcomesArray[i];
            if (result > 0){
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
        if (year == '2024'){
            infoBoxString = s.State + "\nElection 2020 Results: " + e2020Results + "\nProjected2024Result: " + median + "\nDemocrat Win %: " + percentDWin + "\n2024 Polling Average: " + s.Polls;
        }
        if (year == '2020'){
            infoBoxString = s.State + "\nActual 2020 Results: " + e2020Results + "\nProjected2020Result: " + median + "\nDemocrat Win %: " + percentDWin + "\n2020 Polling Average: " + s.Polls2020;
        }
        if (year == '2016'){
            infoBoxString = s.State + "\nActual 2016 Results: " + e2016Results + "\nProjected2016Result: " + median + "\nDemocrat Win %: " + percentDWin + "\n2016 Polling Average: " + s.Polls2016;
        }
        if (year == '2012'){
            infoBoxString = s.State + "\nActual 2012 Results: " + e2012Results + "\nProjected2012Result: " + median + "\nDemocrat Win %: " + percentDWin + "\n2012 Polling Average: " + s.Polls2012;
        }
        //This is the state data obbject that is put into the array-------------------------------------------------------
        let stateData ={
            State: stateName,
            StateAbbreviation: s.Abbr,
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
function setColorBasedOnChance(){
    for(var i = 0; i < statesArray.length; i++) {
        var statePercent = statesArray[i].ChanceOfDWin;
        var stateAbbr = statesArray[i].StateAbbreviation;
        svgState = document.getElementById(stateAbbr);

        if (statePercent > .99){
            try{svgState.style.fill='#040275';}catch{}
        }
        else if(statePercent > .95){
            try{svgState.style.fill='#0300c4';}catch{}
        } 
        else if(statePercent > .9){
            try{svgState.style.fill='#2b28f7';}catch{}
        }    
        else if(statePercent > .8){
            try{svgState.style.fill='#605df5';}catch{}
        } 
        else if(statePercent > .7){
            try{svgState.style.fill='#8a88fc';}catch{}
        } 
        else if(statePercent > .6){
            try{svgState.style.fill='#c6c5fa';}catch{}
        } 
        else if(statePercent > .5){
            try{svgState.style.fill='#e4e4f5';}catch{}
        }
        else if(statePercent > .4){
            try{svgState.style.fill='#fce8ea';}catch{}
        }
        else if(statePercent > .3){
            try{svgState.style.fill='#f0afb4';}catch{}
        }  
        else if(statePercent > .2){
            try{svgState.style.fill='#db7f87';}catch{}
        }  
        else if(statePercent > .1){
            try{svgState.style.fill='#cf515b';}catch{}
        }  
        else if(statePercent > .05){
            try{svgState.style.fill='#eb2334';}catch{}
        }  
        else if(statePercent > .01){
            try{svgState.style.fill='#de0417';}catch{}
        }         
        else{
            try{svgState.style.fill='#a80210';}catch{}
        }                 
        
    }
}

