
var persons = document.getElementById('range'); //Range
var rooms =  document.getElementsByName('pack'); //radio
var all = document.getElementById('all'); // checkbox
var extra = document.getElementsByName('extra'); //checkboxes
var cardtype = document.querySelectorAll('.opt');

var d = new Date();
var string = d.getFullYear()+'-'+ (d.getMonth()+1)+'-'+ d.getDate();
document.getElementById("arr").value = string;
var string = d.getFullYear()+'-'+ (d.getMonth()+1)+'-'+ (d.getDate()+3);
document.getElementById("leave").value = string;

var video = document.getElementById('vid');
var vidId = 0;

function changeSource(){
    if(vidId == 0){
        vidId = 1;
        this.src = './hotel.mp4';
        this.load();
        this.play();
        
    }else if(vidId == 1){
        this.src = './sushi.mp4';
        this.load();
        this.play();
        vidId = 2;
    }else if(vidId == 2){
        this.src = './swim.mp4';
        this.load();
        this.play();
        vidId = 0;
    }
}


var priceMess = `<p>`;
function groupSize(){
    console.log(this.value);
    document.getElementById('peeps').innerHTML = this.value;
    booking.persons = this.value;
    priceCalc();
}
function roomType(){
    console.log(0);
    if(this.id == "gold") booking.room = "gold";
        else if(this.id == "silver")booking.room = "silver";
    else booking.room = "bronze";
    priceCalc();
}
function allInclusive(){
    if(all.checked){
        
        extra.forEach(ex => {
            ex.checked = true
            ex.disabled = true;
            booking.all = true;
            booking.extra.forEach( ex =>  ex = 0)
        });
    }else{
        extra.forEach(ex =>{
            ex.checked = false;
            ex.disabled = false;
            booking.all = false;

        });
    }
}
function extras(){
    var x = 0;
    console.log(this.id);
    if(this.checked){
        x = 1;
    }
    switch(this.id){
        case "bal":
            booking.extra[0] = x;
        break;
        case "room":
            booking.extra[1] = x;
        break;
        case "car":
            booking.extra[2] = x;
            console.log("test");
        break;
        case "break":
            booking.extra[3] = x;
            console.log("test");
        break;
        case "lunch":
            booking.extra[4] = x;
        break;
        case "dinner":
            booking.extra[5] = x;
        break;
    }
}
function cardImg(){
    console.log(this.value);
    if(this.value == "Choose") document.getElementById('icon').src = "./img/information.png"
    if(this.value == "MasterCard"){
        document.getElementById('icon').src = "./img/mc.png"
    }
    if(this.value == "Visa"){
        document.getElementById('icon').src = "./img/visa.png"
    }
    if(this.value == "American Express"){
        document.getElementById('icon').src = "./img/ae.png"
    }

}

var booking = {
    persons: 1,
    room: "silver",
    all: false,
    extra: [0,0,0,0,0,0],
    days: 3,
    price: 300,

};
function priceCalc(){
    priceMess = ``;
    switch (booking.room){
        case "gold": //2 person room full luxuary
        booking.price = 250 * booking.persons*booking.days;
        console.log(booking.price);
        priceMess += `Room for two top class Sound isolated and fantastic styling ${booking.persons} guests price is 250 £ per person per day  | ${250*booking.persons*booking.days} £, `;
        break;
        case "silver": //
        booking.price = 100 * booking.persons*booking.days;
        priceMess += `Room for four middle class  comfy and neat ${booking.persons} guests Price is 100 £ per person per day | ${100*booking.persons*booking.days} £, `;
        break;
        case "bronze":
        booking.price = 40 * booking.persons*booking.days;
        priceMess += `Room for 8 Subpar class  Small and bland ${booking.persons} guests Price is 40 £ per person per day | ${40*booking.persons*booking.days} £,  `;
    }
    var ex = 0;
    if(booking.all == false){
        for(var x = 0; x < booking.extra.length; x++){
            if(booking.extra[x] == 1){
                
            switch(x){
                case 0: //balcony
                ex = 100;
                priceMess += `With Balcony + 100 £, `;
                break;
                case 1: //Roomservice
                ex = 25 * booking.days;
                priceMess += `With Roomservice + 25 £ per day | ${25*booking.days} £, `;
                break;
                case 2: //Car
                ex = 40 * booking.days;
                priceMess += `With Car during stay + 40 £ per day | ${40*booking.days} £, `;
                break;
                case 3: //Breakfast
                ex = 10 * booking.days;
                priceMess += `With braekfast during stay + 10 £ per day | ${10*booking.days} £, `;
                break;
                case 4: //Lunch
                ex = 10 * booking.days;
                priceMess += `With lunch during stay + 10 £ per day | ${10*booking.days} £, `;
                break;
                case 5: //Dinner
                ex = 20 * booking.days;
                priceMess += `With dinner during stay + 10 £ per day | ${10*booking.days} £. `;
                break;
                default:
                ex = 0;
            }
            booking.price += ex;
        }
    }

}else{
    booking.price += 80*booking.days;
    priceMess += `With all inclusive for 80 £ per day | ${80*booking.days} £. `;
}

var el = document.createElement('p');
el.setAttribute('id','book1');
var node = document.createTextNode(priceMess);
console.log(node);
el.appendChild(node);
var parent = document.querySelector('.tot');
if(document.getElementById('book1')){
    parent.removeChild(document.getElementById('book1'));
}
document.querySelector('.tot').appendChild(el);
}

persons.addEventListener('change',groupSize);
rooms.forEach(room => room.addEventListener('click',roomType));
all.addEventListener('click',allInclusive);
extra.forEach(ex => ex.addEventListener('click',extras));
cardtype.forEach( card => card.addEventListener('click',cardImg));

video.addEventListener('ended',changeSource);

priceCalc();
