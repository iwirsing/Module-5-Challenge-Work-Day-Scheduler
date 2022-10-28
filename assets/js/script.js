//initialize variables and capture DOM elements
var delButtonEl=$('.delBtn');
var saveButtonEl=$('.saveBtn');

//storage array
var toDoObjectStorage=[];

//time on the title
var today = moment();
$("#currentDay").text(today.format("dddd, MMMM Do, YYYY"));

//FUNCTION 1: Running Time
//changing time on the title
function updateTime(){
    var timeNow = moment();
    $("#currentTime").text("at "+ timeNow.format("hh:mm:ss A "));
}
updateTime();
window.setInterval(updateTime, 1000); //time changes every second


//FUNCTION 2: Color Code 
//color code the time blocks according to the current time
function colorCode(){
    //capture the hour
    var currentHour=Number(today.format("HH"));
    for (var i=9;i<18;i++){
        //create table id string and use it as a selector
        var tableId="#"+i.toString();
        
        //color coding conditions
        if (currentHour===i){ $(tableId).addClass('present');}
        else if (currentHour>i){$(tableId).addClass('past');}
        else if (currentHour<i) {$(tableId).addClass('future');}
        }
}
colorCode();
//checks color code every minute
window.setInterval(colorCode(),60000); 


//FUNCTION 3: Save
//user enters data into time block
//wait for save event to save data into time block
saveButtonEl.on('click',function (event){

    //capture the identity of the button that was clicked
    var buttonIdentityString = $(event.target).attr('data-button');

    //build the id for input
    var inputIdBuild="#text"+buttonIdentityString;
  
    // capture the input text of that time block
    var textInside=$(inputIdBuild).val();
  
    //save to local storage
    localStorage.setItem(inputIdBuild,JSON.stringify(textInside));

    // display what is stored
    displayToDo();
    
    //change the  Save to Saved for 1.5 seconds then revert back
    var $this = $(this);
    $this.text('Saved').css({'color':'#FFC300'});
    setTimeout(() => {
        $this.html('&#10004; Save').css({'color':'white'});
    }, 1500);
});

//FUNCTION 4: Display
//display the stored data
function displayToDo(){
    for (let i=9;i<18;i++){

        //buildID string to go through the stored data as a key
        var IdString="#text"+i;

        //capture stored string
        var toDoText=JSON.parse(localStorage.getItem(IdString));

        //check if there is any data, if there is, display the data
        if (toDoText!= undefined){
            $(IdString).val(toDoText);
        }
    }
}
displayToDo()

//FUNCTION 5: Delete
//delete local storage
delButtonEl.on('click', function (event){

    var buttonIdentityString = $(event.target).attr('data-button');
    console.log(buttonIdentityString);

    //build the ID
    var inputIdBuild="#text"+buttonIdentityString;
    console.log(inputIdBuild);

    //remove from Local Storage
    localStorage.removeItem(inputIdBuild);

    //remove from screen
    $(inputIdBuild).val("");

     // display what is stored
     displayToDo();

})
