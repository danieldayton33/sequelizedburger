$(document).on("ready",function(){
//get burgers from database, call addBurgers   
const getBurgers = ()  =>{
    $("#burgerEat").empty();
    $("#burgerEaten").empty();
    $.get("/api/burgers", (data) => {
        console.log("BURGER DATA", data)
        addBurgers(data);
    });
}    
getBurgers();

//add the burgers from the database to the DOM lists
const addBurgers = (burgers) => {
    console.log("ARRAY FROM addBurgers", burgers);
    burgers.forEach(burger =>{
       //if statement to check status of burger (eaten or not)
        if(burger.devoured) {
            let newLi = $("<li>").text(burger.burger_name);
            $("#burgerEaten").append(newLi);
        }
        else {
            let newLi = $("<li>").text(burger.burger_name);
        //add button to be able to change the status of the burger, attach id to button as data-id
            let newButton = $("<button>")
            newButton.addClass("btn btn-danger devour");
            newButton.attr("data-id", burger.id);
            newButton.text("Devour!")
            newLi.append(newButton);
            $("#burgerEat").append(newLi);
        }
    });
}
//form submit for posting new burger entry
$("#add-burger").on("click",(e)=>{
    e.preventDefault();
    const burgerName = $("#burger_name").val().trim();
    console.log("BURGER NAME",burgerName);
    const burgerObj ={
        burger_name: burgerName
    };
    ///post request for adding burger to database
    $.post("/api/burgers", burgerObj,(data)=>{
      
        console.log(data);
        $("#burger_name").val("");
        getBurgers();
    });
   
});
//on-click event for removing all eaten burgers
$("#delete_eaten").on("click", (e) => {
    $.ajax({
        method: "DELETE",
        url: "/api/burgers"
    }).then((data) => {
        console.log(data)
        getBurgers();
    });
});

//on-click event for changing the status of the burger
$(document).on("click", ".devour", function(e) {
    console.log($(this))
    const burger = {
        id: $(this).attr("data-id"),
        };
    console.log("ID", burger);
    //put request to change the burger status using id in body
    $.ajax("/api/burgers", {
        type: "PUT",
        data: burger
    }).then((data) =>{
        console.log(data);
        getBurgers();
    });
   
});
});