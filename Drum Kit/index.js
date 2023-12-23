
var noOfButtons = document.querySelectorAll(".drum").length;

for(i = 0; i < noOfButtons; i++)
{
    document.querySelectorAll(".drum")[i].addEventListener("click", OnClick );
};
   function OnClick() {
    var buttonclick = this.innerHTML;

    onkeypressed(buttonclick);

   
   };

   document.addEventListener("keypress", function (event) {
    onkeypressed(event.key);
    
   });
   

   function onkeypressed(key){

    switch (key) {
        case "w":
           
            var audiow = new Audio("sounds/tom-1.mp3");
            audiow.play();
            break;
       case "a":
            var audioa = new Audio("sounds/tom-2.mp3");
            audioa.play();
            break;
        case "s":
            var audios = new Audio("sounds/tom-3.mp3");
            audios.play();
            break;
        case "d":
            var audiod = new Audio("sounds/tom-4.mp3");
            audiod.play();
            break;
        case "j":
            var audioj = new Audio("sounds/crash.mp3");
            audioj.play();
            break;
        case "k":
            var audiok = new Audio("sounds/snare.mp3");
            audiok.play();
            break;
        case "l":
            var audiol = new Audio("sounds/kick-bass.mp3");
            audiol.play();
            break;       
        default:
            break;
    }
    
   }
