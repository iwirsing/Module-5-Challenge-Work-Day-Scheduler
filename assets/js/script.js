//capture the DOM elements
//var for input text
var Text9 =document.getElementById("text9");

//var for button
var saveButtonEl=$('.saveBtn');
var delButtonEl=$('.delBtn');
var buttonIdentity;

//storage array
var toDoObjectStorage=[];



//time on the title
var today = moment();
$("#currentDay").text(today.format("dddd, MMMM Do, YYYY"));
console.log(today);


//color code the timeblocks according to the current time
//capture the hour
var currentHour=Number(today.format("HH"));
console.log(currentHour);

for (var i=9;i<18;i++){
    //create table id and use it as a selector
    var tableId="#"+i.toString();
    console.log(tableId);
    if (currentHour===i){ $(tableId).addClass('present');}
    else if (currentHour>i){$(tableId).addClass('past');}
    else if (currentHour<i) {$(tableId).addClass('future');}
}

//enter data into timeblock


//wait for save event to save data into timeblock
saveButtonEl.on('click',function (event){
    console.log("got clicked the save");

    //capture the button that was clicked
    console.log(event.target);
    console.log(event.target.id);
    console.log($(event.target).attr('data-button'));
    
    var buttonIdentityString = $(event.target).attr('data-button');
    console.log(buttonIdentityString);
    buttonIdentityNumber=Number($(event.target).attr('data-button'));
    console.log(buttonIdentityNumber);
  
    // capture the input of that timeblock
    //build the id for input
    var inputIdBuild="#text"+buttonIdentityString;
    console.log(inputIdBuild);
    //capture text inside
    var textInside=$(inputIdBuild).val();
    console.log(textInside);
    //save to local storage
    localStorage.setItem(inputIdBuild,JSON.stringify(textInside));
    // display what is stored
    displayToDo();


});
//display the stored data
function displayToDo(){
    for (let i=9;i<18;i++){
        //buildID string
        var IdString="#text"+i;
        //capture stored string
        var toDoText=JSON.parse(localStorage.getItem(IdString));
        console.log(toDoText);

        //check if there is any data
        if (toDoText!= undefined){
            $(IdString).val(toDoText);
        }
    }
    
}

displayToDo()

//create button to delete local storage
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
