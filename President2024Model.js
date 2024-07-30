//Array with state data 
const statesArray = [];

//This is a basic function to take the data csv and put it into values I can actually use

/*
document.getElementById('President 2024 Data').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        
        Papa.parse(file, {
            header: true, // Treat the first row as headers
            dynamicTyping: true, // Convert types automatically
            skipEmptyLines: true, // Skip empty lines
            complete: function(results) {
                process2024States(results.data);
                setColorBasedOnChance();
                //setColorsBasedOnResults(); 
            },

            error: function(error) {
                console.error('Error parsing CSV:', error);
            }
        });
    }
});
*/

const csvUrl = 'https://raw.githubusercontent.com/jessebeach50/electionmodel/main/ElectionModelData.csv';

// Use Papa Parse to fetch and parse the CSV file
Papa.parse(csvUrl, {
    download: true,
    header: true, // Set to false if the CSV doesn't have headers
    dynamicTyping: true, // Convert types automatically
    skipEmptyLines: true, // Skip empty lines
    complete: function(results) {
        process2024States(results.data);
        setColorBasedOnChance();
    },
    error: function(error) {
        console.error("Error parsing CSV:", error);
    }
});



//Tool tip when hovering
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
            break;
            }
        }
      
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



//Run the model on the csv imported by the 2024 data identifer
function process2024States(states){
    var pollingAverage = -.47;
    var pollingErrorInMonth = 3;
    var standardPollingError = 3;

    var maxDPopularVote = pollingAverage + pollingErrorInMonth + standardPollingError;
    var maxRPopularVote = pollingAverage - pollingErrorInMonth - standardPollingError;

    //cycle through every state and parse the data as needed
    states.forEach(s => {

        var stateName = s.State

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

        //Get average state shift to see what the projected neutral environment will be in 2024
        var neutral2024ProjectedOnShift = neutral2020 + (((neutral2020 - neutral2016) + (neutral2016 - neutral2012)) / 2);

        //Compare national polls and state polls to see what the polls think the neutral environment of the state will be in 2024
        var neutral2024ProjectedOnPolls = s.Polls - pollingAverage;

        //Average the above
        var neutral2024Projected = (neutral2024ProjectedOnPolls + neutral2024ProjectedOnShift) / 2

        
        //---------------------------------------Election Model Portion-------------------------------------------------------------
        var outcomesArray = [];

        //Basic Model using the polling average, account for state poll inaccuracyy by +- 4
        //We'll need to account for polling error in states and nationally to get result so we do a nested for loop
        var maxD = neutral2024ProjectedOnPolls + pollingErrorInMonth + 4;
        var maxR = neutral2024ProjectedOnPolls - pollingErrorInMonth - 4;
        
        while(maxR < (maxD + .1)){
            var maxDNat = maxDPopularVote;
            var maxRNat = maxRPopularVote;
            while(maxRNat < (maxDNat + .1)){
                var outcome = maxR + maxRNat;
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

        outcomesArray.sort((a, b) => {
            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            }
            return 0;
          }); 

        i = 0;
        if(stateName == 'National'){
            console.log(stateName);
            while (i < outcomesArray.length){
                console.log(outcomesArray[i]);       
                i = i + 1;
            }
        }

        var percentDWin = numDWins / outcomesArray.length;
        var medianN = ~~(outcomesArray.length / 2);
        console.log(medianN);
        var median = outcomesArray[medianN];      

        //String that will show when state is hovered over
        infoBoxString = s.State + "\nElection 2020 Results: " + e2020Results + "\nProjected2024Result: " + median + "\nDemocrat Win %: " + percentDWin;

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

            Election2024NeutralProjectedShift: neutral2024ProjectedOnShift,
            Election2024NeutralProjectedPolls: neutral2024ProjectedOnPolls,
            Election2024NeutralProjected: neutral2024Projected, 

            ChanceOfDWin: percentDWin,
            MedianOutcome: median,

            InfoBoxString: infoBoxString
        };

        statesArray.push(stateData);

        //const output = document.getElementById('output');
        //output.textContent = JSON.stringify(statesArray, null, 2); // Format JSON for readability
    });
}

//Set the colors to the 2020 result
function setColorsBasedOnResults(){
    for(var i = 0; i < statesArray.length; i++) {
        var state2020 = statesArray[i].Election2020Results;
        var stateAbbr = statesArray[i].StateAbbreviation;
        svgState = document.getElementById(stateAbbr);
        if (state2020 > 25){
            try{svgState.style.fill='#040275';}catch{}
        }
        else if(state2020 > 20){
            try{svgState.style.fill='#0300c4';}catch{}
        } 
        else if(state2020 > 15){
            try{svgState.style.fill='#2b28f7';}catch{}
        }    
        else if(state2020 > 10){
            try{svgState.style.fill='#605df5';}catch{}
        } 
        else if(state2020 > 5){
            try{svgState.style.fill='#8a88fc';}catch{}
        } 
        else if(state2020 > 1){
            try{svgState.style.fill='#c6c5fa';}catch{}
        } 
        else if(state2020 > 0){
            try{svgState.style.fill='#e4e4f5';}catch{}
        }
        else if(state2020 > -1){
            try{svgState.style.fill='#fce8ea';}catch{}
        }
        else if(state2020 > -5){
            try{svgState.style.fill='#f0afb4';}catch{}
        }  
        else if(state2020 > -10){
            try{svgState.style.fill='#db7f87';}catch{}
        }  
        else if(state2020 > -15){
            try{svgState.style.fill='#cf515b';}catch{}
        }  
        else if(state2020 > -20){
            try{svgState.style.fill='#eb2334';}catch{}
        }  
        else if(state2020 > -25){
            try{svgState.style.fill='#de0417';}catch{}
        }         
        else{
            try{svgState.style.fill='#a80210';}catch{}
        }                 
        
    }
}

//Set the colors based on 2024 result
function setColorBasedOnChance(){
    for(var i = 0; i < statesArray.length; i++) {
        var state2024Percent = statesArray[i].ChanceOfDWin;
        var stateAbbr = statesArray[i].StateAbbreviation;
        svgState = document.getElementById(stateAbbr);

        if (state2024Percent > .99){
            try{svgState.style.fill='#040275';}catch{}
        }
        else if(state2024Percent > .95){
            try{svgState.style.fill='#0300c4';}catch{}
        } 
        else if(state2024Percent > .9){
            try{svgState.style.fill='#2b28f7';}catch{}
        }    
        else if(state2024Percent > .8){
            try{svgState.style.fill='#605df5';}catch{}
        } 
        else if(state2024Percent > .7){
            try{svgState.style.fill='#8a88fc';}catch{}
        } 
        else if(state2024Percent > .6){
            try{svgState.style.fill='#c6c5fa';}catch{}
        } 
        else if(state2024Percent > .5){
            try{svgState.style.fill='#e4e4f5';}catch{}
        }
        else if(state2024Percent > .4){
            try{svgState.style.fill='#fce8ea';}catch{}
        }
        else if(state2024Percent > .3){
            try{svgState.style.fill='#f0afb4';}catch{}
        }  
        else if(state2024Percent > .2){
            try{svgState.style.fill='#db7f87';}catch{}
        }  
        else if(state2024Percent > .1){
            try{svgState.style.fill='#cf515b';}catch{}
        }  
        else if(state2024Percent > .05){
            try{svgState.style.fill='#eb2334';}catch{}
        }  
        else if(state2024Percent > .01){
            try{svgState.style.fill='#de0417';}catch{}
        }         
        else{
            try{svgState.style.fill='#a80210';}catch{}
        }                 
        
    }
}