$(document).on("ready",function(){
    // $.get("/burgers",(data)=>{
    //     console.log(data);
    // });
const getBurgers = ()  =>{
    $("#burgerEat").empty();
    $("#burgerEaten").empty();
    $.get("/api/burgers", (data) => {
        console.log("BURGER DATA", data)
        addBurgers(data);
    });
}    
getBurgers();
const addBurgers = (burgers) => {
    console.log("ARRAY FROM addBurgers", burgers);
    burgers.forEach(burger =>{
        if(burger.devoured) {
            let newLi = $("<li>").text(burger.burger_name);
            $("#burgerEaten").append(newLi);
        }
        else {
            let newLi = $("<li>").text(burger.burger_name);
            let newButton = $("<button>")
            newButton.addClass("btn btn-danger devour");
            newButton.attr("data-id", burger.id);
            newButton.text("Devour!")
            newLi.append(newButton);
            $("#burgerEat").append(newLi);
        }
    });
}
$("#add-burger").on("click",(e)=>{
    e.preventDefault();
    const burgerName = $("#burger_name").val().trim();
    console.log("BURGER NAME",burgerName);
    const burgerObj ={
        burger_name: burgerName
    };
    $.post("/api/burgers", burgerObj,(data)=>{
      
        console.log(data);
        $("#burger_name").val("");
        getBurgers();
    });
   
});

$("#delete_eaten").on("click", (e) => {
    $.ajax({
        method: "DELETE",
        url: "/api/burgers"
    }).then((data) => {
        console.log(data)
        getBurgers();
    });
});

$(document).on("click", ".devour", function(e) {
    console.log($(this))
    const burger = {
        id: $(this).attr("data-id"),
        // devour: $(this).attr("data-eaten"),
        };
    console.log("ID", burger);
    $.ajax("/api/burgers", {
        type: "PUT",
        data: burger
    }).then((data) =>{
        console.log(data);
        getBurgers();
    });
   
});
});