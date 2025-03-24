let cardsAll = [
    {value: "6", letter: "C", img: "6C"}, {value: "7", letter: "C", img: "7C"}, {value: "8", letter: "C", img: "8C"}, {value: "9", letter: "C", img: "9C"}, {value: "10", letter: "C", img: "10C"}, 
    {value: "11", letter: "C", img: "11C"}, {value: "12", letter: "C", img: "12C"}, {value: "13", letter: "C", img: "13C"}, {value: "14", letter: "C", img: "14C"},

    {value: "6", letter: "T", img: "6T"}, {value: "7", letter: "T", img: "7T"}, {value: "8", letter: "T", img: "8T"}, {value: "9", letter: "T", img: "9T"}, {value: "10", letter: "T", img: "10T"}, 
    {value: "11", letter: "T", img: "11T"}, {value: "12", letter: "T", img: "12T"}, {value: "13", letter: "T", img: "13T"}, {value: "14", letter: "T", img: "14T"},

    {value: "6", letter: "H", img: "6H"}, {value: "7", letter: "H", img: "7H"}, {value: "8", letter: "H", img: "8H"}, {value: "9", letter: "H", img: "9H"}, {value: "10", letter: "H", img: "10H"}, 
    {value: "11", letter: "H", img: "11H"}, {value: "12", letter: "H", img: "12H"}, {value: "13", letter: "H", img: "13H"}, {value: "14", letter: "H", img: "14H"},

    {value: "6", letter: "P", img: "6P"}, {value: "7", letter: "P", img: "7P"}, {value: "8", letter: "P", img: "8P"}, {value: "9", letter: "P", img: "9P"}, {value: "10", letter: "P", img: "10P"}, 
    {value: "11", letter: "P", img: "11P"}, {value: "12", letter: "P", img: "12P"}, {value: "13", letter: "P", img: "13P"}, {value: "14", letter: "P", img: "14P"}
];

function shuffle(array){
    for(let i=array.length-1;i>0; i--){
        const random = Math.floor(Math.random()* (i+1)); /*потому что карта выбывает, 1 для захвата всего);*/
        [array[i], array[random]] = [array[random], array[i]];
    }
}



const root = document.documentElement;


// Buttons
const start=document.getElementById(`start`);
const takeAll=document.getElementById(`takeAll`);
const discardBtn = document.getElementById(`discard`);
const options = document.getElementById(`options`);
const optionsGame = document.getElementById(`optionsGame`);
const selectSong = document.querySelectorAll(`.music`);
const menu = document.getElementById(`backToMenu`);
const credits = document.getElementById(`credits`);
const exit = document.querySelector(`#optionsExit`);
const exitSelect = document.querySelector(`#exitSelect`);
const exitMenu = document.querySelectorAll(`.exitMenu`);
const exitSelectCardMenu=document.getElementById(`exitSelectCardMenu`);
const exitCredits = document.getElementById(`exitCredits`);
const radioButtons = document.querySelectorAll(`.radio-button`);
const selectSkins = document.getElementById(`selectSkins`);
// Displays
const container = document.getElementsByClassName(`container`)[0];
const mainMenu = document.getElementById(`menu`);
const optionsMenu = document.getElementById(`optionsMenu`);
const selectMenu = document.getElementById(`selectMenu`);
const backToMenu = document.getElementsByClassName(`card`)[0];
const selectCardMenu = document.getElementById(`selectCardMenu`);
const creditsDisplay = document.getElementById(`creditsDisplay`);

let infoText=document.getElementsByClassName(`infoText`);
let handDisplay = document.getElementsByClassName(`hand`)[0];
let mainDisplay = document.getElementsByClassName(`main`)[0];

let infoContainer = document.getElementsByClassName(`info`)[0];
let eventInfo = document.getElementById(`eventInfo`)


const names = [
    {name:`Джона`,form:`Джона`,gender:`победил`},
    {name:`Эмили`,form:`Эмили`,gender:`победила`},
    {name:`Боб`,form:`Боба`,gender:`победил`},
    {name:`Макс`,form:`Макса`,gender:`победил`},
    {name:`Элла`,form:`Эллы`,gender:`победила`},
    {name:`Лили`,form:`Лили`,gender:`победила`},
    {name:`Джейк`,form:`Джейка`,gender:`победил`},
    {name:`Софи`,form:`Софи`,gender:`победила`},
    {name:`Джек`,form:`Джека`,gender:`победил`},
    {name:`Эйва`,form:`Эйвы`,gender:`победила`},

]
let opponent = Math.floor(Math.random()*names.length)
infoText[0].textContent=names[opponent].form;

const phrases = [`Было легко`,`Слабовато`,`Давай ещё!`,`Блестяще!`,`Поразительный ход!`,`Глупый ход`,`Ты поплатишься за это!`,`Играешь на победу?`,`Закажем крылешек?`,`Доволен?`] 

let playerHand=[];
let botHand=[];

let trumpLetter=``;

let isPlayerTurn=false;
let isPLayerAttack=false;
let isGameOver=false;
// Все карты на столе - enemyCards, карты в руке - playerCards
let enemyCards=document.getElementsByClassName(`enemyCards`);
let playerCards=document.getElementsByClassName(`playerCards`);

// Карта, которую выкладывает игрок
let newCardOnMain = document.getElementsByClassName(`newCardOnMain`);


let currentID;
let currentIdBot;
let mainCardsID;
let takeAllcardObj;


let nextCard=null; // выбор карты для бота

// классы движения карт в main
let bottom = document.getElementsByClassName(`bottom-image`);
let topImg = document.getElementsByClassName(`top-image`);

//для движения из колоды в руку
let cardsToGive = document.getElementsByClassName(`cardsToGive`); 
let cardsToGiveBot = document.getElementsByClassName(`cardsToGiveBot`); 


// as written
let isBotHandEmpty = false;

let minCardsHand=6;
let timeToWaste;
// if(window.loca)
if(localStorage.length==0){
    localStorage.setItem(`musicVolume`,2);
    localStorage.setItem(`soundsVolume`,2);
    localStorage.setItem(`currentMusic`,`song_4`);
    localStorage.setItem(`cardsSkin`,`Elegant`);
}

// cards skins
const CardsSelection = document.querySelectorAll(`.CardsSelection`);
cardsSkin=localStorage.getItem(`cardsSkin`);
document.getElementById(cardsSkin).style.outline=`6px solid #e48400`;
document.getElementById(`backSelect`).src=`Assets/Images/Cards/Cards_36_${cardsSkin}/back.png`;



//Music

let musicVolume = Number(localStorage.getItem(`musicVolume`));
let soundsVolume = Number(localStorage.getItem(`soundsVolume`));
let currentMusic = localStorage.getItem(`currentMusic`);

let RadioInputs =document.getElementsByClassName(`songs`); 
for(let i=0; i<RadioInputs.length;i++){
    if(RadioInputs[i].value==currentMusic){
        RadioInputs[i].checked=true;
        break;
    }
}

taking_card = new Audio("Assets/Sounds/1.wav");
taking_card.volume=soundsVolume/10;

const input = document.querySelector("#musicVolume");
input.value=musicVolume;

const inputSound = document.getElementById(`soundsVolume`);
inputSound.value=soundsVolume;
inputSound.addEventListener(`input`,()=>{
    localStorage.setItem(`soundsVolume`,inputSound.value);
    soundsVolume = Number(localStorage.getItem(`soundsVolume`));
    taking_card.volume=soundsVolume/10;
})




// ИНТЕЛЕКТ БОТА
let equalCount=[];
// считаем количество карт каждой масти
function getCardsAmount(){
    objC={letter: `C`, count:0};
    objH={letter: `H`, count:0};
    objP={letter: `P`, count:0};
    objT={letter: `T`, count:0};
    botHand.forEach(e =>{
        switch(e.letter){
            case `C`:
                objC.count++;
                break;
            case `H`:
                objH.count++;
                break;
            case `P`:
                objP.count++;
                break;
            case `T`:
                objT.count++;
                break;
        }
    })

    a=[objC,objH,objP,objT];
    equalCount=[];
    largestAmount={count:0};
    // ищем самое большое значение количества
    for(let i=0;i<4;i++){
        if(a[i].count>largestAmount.count && a[i].letter!=trumpLetter){
            largestAmount=a[i];
        }

        if(a[i].letter==trumpLetter){
            trumpCount=a[i];
        }
    }
    // сюда заноситься Буква самого большого значения количества ИЛИ Буквы одинаковых значений количества ИЛИ ничего(тогда в дальнейшем работают с другим массивом) 
    for(let i=0;i<4;i++){
        if(a[i].count==largestAmount.count && a[i].letter!=trumpLetter && a[i].count!=0){
            equalCount.push(a[i]);
        }
    }
    console.log(equalCount);
    return trumpCount.count
} 
// получаем наименьшую карту с определенной мастью
function smallCard(letter){
    if(letter==undefined)return
    valuesArray=[];

    botHand.forEach(element=>{
        if(element.letter==letter){
            valuesArray.push(element.value);
        }
    })
    smallest=valuesArray.reduce(getMin);
    return smallest
}
// смотрим значения разных мастей и выбираем минимальное из всех
function getMinObj(){
    if(equalCount!=``){
        a=[];
        for(let i=0; i<equalCount.length;i++){
            a.push({value:smallCard(equalCount[i].letter).toString(), letter:equalCount[i].letter})
        }
        getMinValue(a);
    }
    else{
        // если equalCount пустой, значит рука заполнена козырями, соответственно выбираеим мин из них 
        getMinValue(botHand);
    } 

    function getMinValue(array){
        leastValue={value:15};
        for(let i=0;i<array.length;i++){
            if(Number(array[i].value)<Number(leastValue.value)){
                leastValue=array[i];
            }
        }
    } 
    return  leastValue
}


// Buttons 
start.addEventListener(`click`,()=>{
    Music();
    container.style.display=`grid`;
    mainMenu.style.display=`none`;

    document.getElementById(`back`).src=`Assets/Images/Cards/Cards_36_${cardsSkin}/back.png`;
    document.getElementById(`deck`).src=`Assets/Images/Cards/Cards_36_${cardsSkin}/deck.svg`;


    shuffle(cardsAll);
    for(let i=0; i<minCardsHand; i++){
        cardObj=cardsAll.shift();
        obj = { value: cardObj.value, letter: cardObj.letter, img: cardObj.img }
        playerHand.push(obj);
        infoContainer.innerHTML+=`<img src="Assets/Images/Cards/Cards_36_${cardsSkin}/${obj.img}.png"; id=${JSON.stringify(obj)}; width="8%" class="cardsToGive" style="border-radius: 20px; position: absolute; top: 25%; left:91.4%;">`;
        
        setTimeout(()=>{
            handDisplay.innerHTML+=`<img src="Assets/Images/Cards/Cards_36_${cardsSkin}/${playerHand[i].img}.png"; class="cardImg playerCards" onclick="selectCard()" id=${JSON.stringify(playerHand[i])}>`;
        },299*i)
        animation(cardsToGive,300,i,`1`)
        
        cardObj=cardsAll.shift();
        obj = { value: cardObj.value, letter: cardObj.letter, img: cardObj.img }
        botHand.push(obj);
        infoContainer.innerHTML+=`<img src="Assets/Images/Cards/Cards_36_${cardsSkin}/back.png"; width="8%" class="cardsToGiveBot" style="border-radius: 20px; position: absolute; top: 25%; left:91.4%;">`;
        animation(cardsToGiveBot,350,i,`2`);
    }


    setTimeout(()=>{
        // TRUMP CARD
        document.getElementById(`back`).src=`Assets/Images/Cards/Cards_36_${cardsSkin}/${cardsAll[cardsAll.length-1].img}.png`;
        
        trumpLetter=cardsAll[cardsAll.length-1].letter;

        updateInfo();
        
        console.log(`НАЧАЛО`,[...botHand]);
        defineTurn();
        

        getCardsAmount();
        nextCard=botHand.findIndex(e=> e.value==getMinObj().value && e.letter==getMinObj().letter);
        botTurn(0);
    },300*7)
})



discardBtn.addEventListener(`click`,()=>{
    if(enemyCards.length==0 || isOdd(enemyCards.length) || isGameOver) return;
    isPlayerTurn=false; 

    // выполняется discard, затем defineNextCard и newTurn, затем BotTurn, работает и спасибо  
    discard().then(botTurn(300*enemyCards.length+300)); 
    newTurn();
    defineNextCard();
})


takeAll.addEventListener(`click`,()=>{
    if(isPlayerTurn ||isGameOver)return;
    takeAllCards(playerHand);
    setTimeout(()=>{
        defineNextCard();
        botTurn(0);
    },300*timeToWaste+350)
})

function defineNextCard(){
    getCardsAmount();
    for(let i=0;i<botHand.length;i++){
        if(cardsAll.length>14){
            if(botHand.some(e=> e.value==botHand[i].value && e.value<=10 && e.letter!=botHand[i].letter)){ // ищет пару которая меньше 11
                combo=botHand[i];
                break
            }
            else{
                combo={value:15,letter:`N`}
            }
        }
        else if(cardsAll.length>8){
            if(botHand.some(e=> e.value==botHand[i].value && e.value<=12 && e.letter!=botHand[i].letter)){ // ищет пару которая меньше 13
                combo=botHand[i];
                break
            }
            else{
                combo={value:15,letter:`N`}
            }
        }
        else{
            if(botHand.some(e=> e.value==botHand[i].value && e.letter!=botHand[i].letter)){ // ищет любую пару
                combo=botHand[i];
                break
            }
            else{
                combo={value:15,letter:`N`}
            }
        }
    }

    if(combo.value<11 && combo.letter!=trumpLetter){
        nextCard=botHand.findIndex(e=> e.value==combo.value && e.letter==combo.letter);     
        console.log(`Бот собирается сыграть комбо с дубликатом`)   
    }
    else if(combo.value!=15 && cardsAll.length<=8){  // бот ищет карту со значением равным значению комбо и смотрит, чтобы это была не козырная, дальше он подкинет уже козырную    
        nextCard=botHand.findIndex(e=> e.value==combo.value && e.letter!=trumpLetter);
        console.log(`Бот собирается сыграть комбо с дубликатом и козырем`)   
    }
    else{
        nextCard=botHand.findIndex(e=> e.value==getMinObj().value && e.letter==getMinObj().letter);
        console.log(`Бот играет самую меньшую карту`)
    }
    console.log(`ЭТО РУКА БОТА КОГДА ОН ПРИНИМАЛ РЕШЕНИЕ`,[...botHand])
}


let musicClicked=false;
selectSong[0].addEventListener(`click`,()=>{
    if(!musicClicked){
        selectMenu.style.display=`inline-block`;
        musicClicked=true;
    }
    else{
        selectMenu.style.display=`none`;
        musicClicked=false;
    }
})
selectSong[1].addEventListener(`click`,()=>{
    selectMenu.style.display=`inline-block`;
    mainMenu.style.display=`none`;
    Music();

})
selectSkins.addEventListener(`click`,()=>{
    mainMenu.style.display=`none`;
    selectCardMenu.style.display=`grid`;
})

options.addEventListener(`click`,()=>{
    mainMenu.style.display=`none`;
    optionsMenu.style.display=`flex`;
    Music();
})

credits.addEventListener(`click`,()=>{
    creditsDisplay.style.display=`block`;
})
exitCredits.addEventListener(`click`,()=>{
    creditsDisplay.style.display=``;
})
exit.addEventListener(`click`,()=>{
    optionsMenu.style.display=`none`;
    if(container.style.display==`none`){
        mainMenu.style.display=`flex`;
    }
})
exitSelect.addEventListener(`click`,()=>{
    selectMenu.style.display=`none`;
    if(container.style.display==`none`){
        mainMenu.style.display=`flex`;
    }
})
exitMenu.forEach((e)=>{
    e.addEventListener(`click`,()=>{
        backToMenu.style.display=`none`;
    })
})
exitSelectCardMenu.addEventListener(`click`,()=>{
    selectCardMenu.style.display=`none`;
    mainMenu.style.display=`flex`;

})
let clicked = false;
optionsGame.addEventListener(`click`,()=>{
    if(!clicked){
        optionsMenu.style.display=`flex`;
        clicked=true;
    }
    else{
        optionsMenu.style.display=`none`;
        clicked = false;
    }
})
CardsSelection.forEach((e)=>{
    e.addEventListener(`click`,(event)=>{
        if(event.target.id==`backSelect`)return
        document.getElementById(cardsSkin).style.outline=``;
        cardsSkin=event.target.id;
        localStorage.setItem(`cardsSkin`,cardsSkin);
        event.target.style.outline=`6px solid #e48400`;
        document.getElementById(`backSelect`).src=`Assets/Images/Cards/Cards_36_${cardsSkin}/back.png`
    })
})
menu.addEventListener(`click`,()=>{
    reset();
})

// check for smallest trump card and set turn
function defineTurn(){

    function smallTrumpCard(hand){
        valuesArray=[];
        trump=15;
        hand.forEach(element=>{
            if(element.letter==cardsAll[cardsAll.length-1].letter){
                valuesArray.push(element.value);
            }
        })
        if(valuesArray[0]!=undefined){
            trump=valuesArray.reduce(getMin);
        }
        return trump
    }

    if(smallTrumpCard(playerHand)<=smallTrumpCard(botHand)){
        console.log(`Твой ход`)
        eventInfo.textContent=`Твой ход`;
        isPlayerTurn= true;
    }

}

// Ход бота
function botTurn(time){

    console.log(`время, которое требуется боту, чтобы выложить карту`,time)
    setTimeout(()=>{

    if(isPlayerTurn || isGameOver)return
    if(botHand.length==0)return isBotHandEmpty=true;
    eventInfo.textContent=`Отбивайся`;
    console.log(`Карта, которую бот сыграл`,botHand[nextCard]);
    console.log(`рука Бота`,botHand);
    document.querySelector(`.info`).innerHTML+=`<img src="Assets/Images/Cards/Cards_36_${cardsSkin}/${botHand[nextCard].img}.png" class="cardsToGiveBot" width="7%"; border-radius:20px; style="position: absolute; top:-2%; left:50%">`;
    animationFromBotToMain(true);

    },time)
}



// Выбор карты в руке
function selectCard(){
    [...document.getElementsByClassName(`playerCards`)].forEach(element=>{
        // element.style.width=`10%`;
        element.style.outline=``

    })
    // event.target.style.width='11%';
    event.target.style.outline=`10px solid rgb(0, 0, 0)`

    currentID=JSON.parse(event.target.id);
}


// Выбранная карта из руки кладется на выбранную карту на столе
function playerMove(){
    if(event.target.classList[1]==`bottom-image` || isGameOver || currentID==undefined)return
    event.target.classList;
    currentIdBot=JSON.parse(event.target.id)

    isPLayerAttack=false;
    console.log(`ID выбранной карты`,currentID);
    console.log(`ID выбранной карты на столе`,currentIdBot);

    if((currentID.letter==trumpLetter && currentIdBot.letter!=trumpLetter) || (Number(currentID.value)>Number(currentIdBot.value) && currentID.letter==currentIdBot.letter)){

    
        const selectNum = playerHand.findIndex(e => e.value == currentID.value && e.letter == currentID.letter);
        if(selectNum==-1){
            console.log(`Выберите карту`);
            eventInfo.textContent=`Выберите карту`;
            return
        }
        event.target.classList.add(`bottom-image`);
        taking_card.play();
        mainDisplay.innerHTML+=`<img src="Assets/Images/Cards/Cards_36_${cardsSkin}/${playerHand[selectNum].img}.png" class=" top-image enemyCards" id=${JSON.stringify(playerHand[selectNum])}>`;

        
        handDisplay.removeChild(playerCards[selectNum]);
        playerHand.splice(selectNum,1);

        updateInfo();
        isPlayerTurn=false;

        for(let i=0;i<enemyCards.length;i++){
            mainCardsID=JSON.parse(enemyCards[i].id);

            if(cardsAll.length>8){
                nextCard=botHand.findIndex(e => e.value == mainCardsID.value && e.letter!=trumpLetter);
                if(nextCard!=-1){
                    console.log(`Бот не будет подкидывает козырь`);
                    break
                }
            }
            else{
                if(cardsAll.length>3){
                    nextCard=botHand.findIndex(e => e.value == mainCardsID.value && e.value!=14);
                }
                else{
                    nextCard=botHand.findIndex(e => e.value == mainCardsID.value);
                }
                if(nextCard!=-1){
                    console.log(`Бот будет подкидывать даже козырь`);
                    break
                }   
            }
        }

        if(nextCard==-1){
            console.log(`Сброс`); 
            console.log(`Ход Игрока`); 
            eventInfo.textContent="Бито, ходи";
            discard();
            newTurn();
            setTimeout(()=>{isPlayerTurn=true},1000);
            return
        }


        botTurn(0);
        
        // для сдвига всех карт в main налево
        for(let i=0; i<bottom.length;i++){
            previousNum=Number(topImg[i].style.left.charAt(0)+topImg[i].style.left.charAt(1));
            if(previousNum==``){
                previousNum=0;
            }

            if(isBotHandEmpty){
                topImg[i].style.left=`${previousNum+=7.5}%`;
                bottom[i].style.left=`${previousNum-2}%`;
            }
            else{
                enemyCards[enemyCards-1]
                topImg[i].style.left=`${previousNum+=15}%`;
                bottom[i].style.left=`${previousNum-2}%`;
            }     
        }

    }
    else{
        eventInfo.textContent=`Эта карта не подходит!`;
    }
}

function playerTurn(){
    if(!isPlayerTurn || currentID==undefined || isGameOver) return;
    canIplayThisCard=false;

    if(enemyCards.length==0){
        canIplayThisCard=true;
    }
    else{
        for(let i=0;i<enemyCards.length;i++){
            mainCardsID=JSON.parse(enemyCards[i].id)

            if(currentID.value==mainCardsID.value){
                canIplayThisCard=true;
                break;
            }
        }
    }
    if(!canIplayThisCard){
        eventInfo.textContent=`Нельзя подкинуть эту карту`;
    }  
    
    const selectNum = playerHand.findIndex(e => e.value == currentID.value && e.letter == currentID.letter);
    if(selectNum==-1 || !canIplayThisCard)return;
    console.log(`Карта, которую Игрок сыграл`,playerHand[selectNum]);
    console.log(`рука Игрока`,playerHand);

    mainDisplay.innerHTML+=`<img src="Assets/Images/Cards/Cards_36_${cardsSkin}/${playerHand[selectNum].img}.png" class=" top-image enemyCards newCardOnMain" id=${JSON.stringify(playerHand[selectNum])}>`;
    handDisplay.removeChild(playerCards[selectNum]);
    playerHand.splice(selectNum,1);

    updateInfo();
    isPlayerTurn=false;
    setTimeout(()=>{
        botMove();
        updateInfo();
        for(let i=0; i<bottom.length;i++){
            previousNum=Number(topImg[i].style.left.charAt(0)+topImg[i].style.left.charAt(1));
            if(previousNum==``){
                previousNum=0;
            }
    
            if(i==bottom.length-1){
                topImg[i].style.left=`${previousNum+=7.5}%`;
                bottom[i].style.left=`${previousNum-2}%`;
                break;
            }
            topImg[i].style.left=`${previousNum+=15}%`;
            bottom[i].style.left=`${previousNum-2}%`;    
        }
    },50)

}

// карта бота кладется на карту игрока 
function botMove(){
    if(isGameOver)return;
    isPLayerAttack=true;
    mainCardsID=JSON.parse(newCardOnMain[0].id);

 
    nextCard=-1; // обновляем значение
    if(cardsAll.length>16){
        outerLoop:
        for(let i=0;i<botHand.length;i++){
            for(let q=1;q<7;q++){
                if(botHand[i].letter == mainCardsID.letter && (Number(botHand[i].value)-Number(mainCardsID.value))==q && botHand[i].value!=14){
                    nextCard=i;
                    break outerLoop;
                }
            }
        }

        if(nextCard==-1 && mainCardsID.letter!=trumpLetter && cardsAll.length<21){
            console.log(`Бот ищет козырь`);
            nextCard=botHand.findIndex(e => e.letter == trumpLetter && Number(e.value)-Number(mainCardsID.value)<=2 && e.value<11);
        } 
    }
    else{ // иначе, то бот ищет карту такой же масти с минимальной разницей, без ограничений разницы  
        outerLoop:
        for(let i=0;i<botHand.length;i++){
            for(let q=1;q<9;q++){
                if(botHand[i].letter == mainCardsID.letter && (Number(botHand[i].value)-Number(mainCardsID.value))==q){
                    nextCard=i;
                    break outerLoop;
                }
            }
        }

        // если такая не найдена - ищется козырь,
        if(nextCard==-1 && mainCardsID.letter!=trumpLetter){
            console.log(`Бот ищет козырь`);
            trumpArr=[];
            for(let i=0;i<botHand.length;i++){
                if(botHand[i].letter==trumpLetter){
                    trumpArr.push(botHand[i].value);
                }
            }
            if(trumpArr!=``){
                value = trumpArr.reduce(getMin);
                nextCard=botHand.findIndex(e => e.letter == trumpLetter && e.value == value);
            }
        } 
    }
    
    currentIdBot=botHand[nextCard];
    console.log(`Карта, которой бот побил`,currentIdBot);


    // если никакая карта не найден ИЛИ при условии, что карт в колоде больше 18 И карта на столе больше 11(то есть, в колоде 22 карты, игрок играет даму, бот берет даму, даже если может отбить)
    if(nextCard==-1 || (Number(mainCardsID.value)>11 && cardsAll.length>18)){
        console.log(`Бот берет`);
        console.log(`Ход игрока`);
        eventInfo.textContent=`Я беру,ходи`;
        takeAllCards(botHand);
        isPlayerTurn=true;
        return
    }

    if(mainCardsID.letter==trumpLetter && cardsAll.length>20 && enemyCards.length==1){
        eventInfo.textContent=`Спасибо за козырь, я возьму`;
        takeAllCards(botHand);
        isPlayerTurn=true;
        return
    }

    // если карта на столе козырь больше 6 И в руке бота меньше 3 козырей И карт на столе больше 3 , то бот берет 
    if(mainCardsID.value>6 && mainCardsID.letter==trumpLetter && getCardsAmount()<=2 && enemyCards.length>=3 && enemyCards.length<=5 && cardsAll.length>18){
        eventInfo.textContent=`Хорошая карта, я возьму`;
        takeAllCards(botHand);
        isPlayerTurn=true;
        return
    }

    eventInfo.textContent=phrases[Math.floor(Math.random()*phrases.length)];
    
    isPlayerTurn=true;
    document.querySelector(`.info`).innerHTML+=`<img src="Assets/Images/Cards/Cards_36_${cardsSkin}/${botHand[nextCard].img}.png" class="cardsToGiveBot" width="7%"; border-radius:20px; style="position: absolute; top:-2%; left:50%">`;
    animationFromBotToMain(false);
    newCardOnMain[0].classList.add(`bottom-image`);
    newCardOnMain[0].classList.remove(`top-image`); 
    newCardOnMain[0].classList.remove(`newCardOnMain`);

    taking_card.play();
    mainDisplay.innerHTML+=`<img src="Assets/Images/Cards/Cards_36_${cardsSkin}/${botHand[nextCard].img}.png" class="top-image enemyCards" id=${JSON.stringify(botHand[nextCard])}>`;

}

function discard(){
    if(isOdd(enemyCards.length) || isGameOver) return;
    return new Promise(()=>{

    if(enemyCards[enemyCards.length-1]!=undefined){
        [...enemyCards].forEach(element=>{
            element.classList.remove(`bottom-image`);
            element.classList.add(`top-image`);       
        })
    }
    for(let i=0; i<enemyCards.length;i++){
        setTimeout(()=>{
            if(enemyCards[0]!=undefined){
                function addSlide(){
                    return new Promise(()=>{
                            enemyCards[0].classList.add(`slide`);
                            enemyCards[0].style.top=`38%`;
                            enemyCards[0].style.left=`-12%`;
                        })
                }
                function rotate(){
                    return new Promise(()=>{
                        setTimeout(()=>{
                            enemyCards[0].classList.add(`rotate`);
                            taking_card.play()
                        },100)
                    })
                }
                function deleteImg(){
                        setTimeout(()=>{
                            mainDisplay.removeChild(enemyCards[0])
                        },200)
                }
                
                addSlide().then(rotate().then(deleteImg()));
            }
        },300*i)
    }
    console.log(`Все карты удалены с поля`)
    })

}


function newTurn(){
    if(cardsAll.length==0){
        updateInfo()
        return
    }
    a=minCardsHand-playerHand.length; // количество карт, которое нужно взять, если значение отрицательное - карты не берутся 
    b=minCardsHand-botHand.length;
    if(isPLayerAttack){
        console.log(`Сначала взял игрок, потом бот`);
        loopAdd(playerHand,a);
        loopAdd(botHand,b);
    }
    else{
        console.log(`Сначала взял бот, потом игрок`)
        loopAdd(botHand,b);
        loopAdd(playerHand,a); 
    }

    updateInfo();

    function loopAdd(hand,n){
        for(let i=0; i<n; i++){
            if(cardsAll.length==0) break;  
            cardObj=cardsAll.shift();
            // hand.push(cardObj);
            obj = { value: cardObj.value, letter: cardObj.letter, img: cardObj.img }
            hand.push(obj);
            taking_card.play()
            
            if(hand==playerHand){
                handDisplay.innerHTML+=`<img src=Assets/Images/Cards/Cards_36_${cardsSkin}/${hand[hand.length-1].img}.png class="cardImg playerCards" onclick="selectCard()" id=${JSON.stringify(hand[hand.length-1])}>`;
                infoContainer.innerHTML+=`<img src="Assets/Images/Cards/Cards_36_${cardsSkin}/back.png"; width="8%" class="cardsToGive" style="border-radius: 20px; position: absolute; top: 25%; left:91.4%;">`;
                animation(cardsToGive,300,i,`1`)
            }
            
            if(hand==botHand){
                infoContainer.innerHTML+=`<img src="Assets/Images/Cards/Cards_36_${cardsSkin}/back.png"; width="8%" class="cardsToGiveBot" style="border-radius: 20px; position: absolute; top: 25%; left:91.4%;">`;
                animation(cardsToGiveBot,350,i,`1`)
            }
        }
    }

}


function takeAllCards(hand){
    a=timeToWaste=enemyCards.length;
    for(let i=0; i<a; i++){
        takeAllcardObj=JSON.parse(enemyCards[0].id)

        obj = { value: takeAllcardObj.value, letter: takeAllcardObj.letter, img: takeAllcardObj.img }
        hand.push(obj);

        if(hand==playerHand){
            infoContainer.innerHTML+=`<img src="Assets/Images/Cards/Cards_36_${cardsSkin}/${obj.img}.png"; width="8%" class="cardsToGive" style="border-radius: 20px; position: absolute; top: 17%; left:4    0%;">`;
            handDisplay.innerHTML+=`<img src=Assets/Images/Cards/Cards_36_${cardsSkin}/${obj.img}.png class="cardImg playerCards" onclick="selectCard()" id=${JSON.stringify(obj)}>`;
            
            animation(cardsToGive,300,i,`2`);
        }
        else{
            infoContainer.innerHTML+=`<img src="Assets/Images/Cards/Cards_36_${cardsSkin}/${obj.img}.png"; width="8%" class="cardsToGiveBot" style="border-radius: 20px; position: absolute; top: 17%; left:40%;">`;

            animation(cardsToGiveBot,350,i,`2`)
        }
        enemyCards[0].remove();
    }
    setTimeout(()=>{
        newTurn()
    },350*a)

}


// мелкие вспомогатеьлные функции





function updateInfo(){
    if(isGameOver)return;
    if(botHand.length==1){ // нет условий для 20+ тк это крайне маловероятная ситуация
        infoText[1].textContent=`${botHand.length} карта`;
    }
    else if(botHand.length<5 && botHand.length!=0){
        infoText[1].textContent=`${botHand.length} карты`;
    }
    else{
        infoText[1].textContent=`${botHand.length} карт`;
    }
    infoText[2].textContent=cardsAll.length;
    if(cardsAll.length<=18 && cardsAll.length!=0 ){
        document.getElementById(`deck`).src=`Assets/Images/Cards/Cards_36_${cardsSkin}/deck_half.svg`;
        
    }
    if(cardsAll.length==0 && document.getElementById(`deck`)!=null){
        document.getElementById(`deck`).remove();
        if(cardsSkin==`Old`){
            document.getElementById(`back`).src=`Assets/Images/Cards/Cards_36_${cardsSkin}/${trumpLetter}.png`;
        }
        else{
            document.getElementById(`back`).src=`Assets/Images/Cards/Cards_36_${cardsSkin}/${trumpLetter}.svg`;
        }
    }
    
    if(cardsAll.length==0 && botHand.length==0){
        finalDisplay(`${names[opponent].name} ${names[opponent].gender}!`);
    }
    else if(cardsAll.length==0 && playerHand.length==0){
        finalDisplay(`Вы победили!`);
    }
    console.log(`Информация обновлена`,botHand.length,cardsAll.length,playerHand.length);

    function finalDisplay(text){
        isGameOver=true;
        container.style.display=`none`;
        document.getElementById(`final`).style.display=`block`;
        document.getElementById(`result`).textContent=text;
        setTimeout(()=>{
            location.reload();
        },5000)
    }
}




function isOdd(num){
    if(num%2==1){
        return true
    }
    else{
        return false
    }
}

function getMin(x,y){
    return Math.min(x,y); 
}

function animation(classHand,time,i,cond){
    setTimeout(()=>{
        function addSlide(){
            return new Promise(()=>{
                cond==`1`? classHand[0].classList.add(`slideReverse`) : classHand[0].classList.add(`slide`);

                if(classHand==cardsToGive){
                    classHand[0].style.top=`45%`;
                    classHand[0].style.left=`45%`;
                }
                else if(classHand==cardsToGiveBot){
                    classHand[0].style.top=`0%`;
                    classHand[0].style.left=`60%`;
                }
            })
        }
        function rotate(){
            return new Promise(()=>{
                setTimeout(()=>{
                    taking_card.play();
                    classHand[0].classList.add(`rotate`);
                },100)
            })
        }
        function deleteImg(){
                setTimeout(()=>{
                    classHand[0].remove()
                },200)
        }
        addSlide().then(rotate().then(deleteImg()));
    },i*time)
}

function animationFromBotToMain(cond){
    function addSlide(){
        return new Promise(()=>{
            setTimeout(()=>{
                cardsToGiveBot[0].classList.add(`slide`);
                cardsToGiveBot[0].style.top=`20%`;
                cardsToGiveBot[0].style.left=`20%`;
                taking_card.play()
            },1)
            })
    }
    function rotate(){
        return new Promise(()=>{
            setTimeout(()=>{
                cardsToGiveBot[0].classList.add(`rotate`);
                taking_card.play()
            },100)
        })
    }
    function deleteImg(){
        return new Promise(()=>{
            setTimeout(()=>{
                if(cond){
                    mainDisplay.innerHTML+=`<img src="Assets/Images/Cards/Cards_36_${cardsSkin}/${botHand[nextCard].img}.png" class="enemyCards" id=${JSON.stringify(botHand[nextCard])} onclick="playerMove()">`;
                }
                botHand.splice(nextCard,1);
                updateInfo();
                cardsToGiveBot[0].remove()
            },10)
        })
    }
    addSlide().then(deleteImg());
}


function reset(){
    backToMenu.style.display=`flex`;
    document.getElementsByClassName(`primary`)[0].addEventListener(`click`,()=>{
        setTimeout(()=>{
            location.reload();
        },500)
    })
}
// Эта часть была написана общими усилиями дипсика, стак оверфлоу и смекалки 

function Music(){
    const audioContext = new (AudioContext);
    let gainNode = audioContext.createGain()
    gainNode.gain.value = musicVolume/10 
    gainNode.connect(audioContext.destination)
    
    let source = audioContext.createBufferSource();
    let buf;
    let stopped=false;
    function playLoop() {
      fetch(`Assets/Sounds/Music/${currentMusic}.wav`)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
          source.buffer = buf =audioBuffer;
          source.loop = true; 
          source.connect(gainNode);
          source.start(0); 
        })
        .catch(error => console.error('Error loading audio:', error));

        radioButtons.forEach((e)=>{
            e.addEventListener(`click`,(event)=>{
                if(event.target.value!=undefined){
                currentMusic=event.target.value;
                localStorage.setItem(`currentMusic`,currentMusic);
                source.stop(0);
                    
                fetch(`Assets/Sounds/Music/${currentMusic}.wav`)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
                .then(audioBuffer => {
                  source = audioContext.createBufferSource();
                  source.buffer = buf =audioBuffer;
                  source.loop = true; 
                  source.connect(gainNode);
                  source.start(0); 
                })
                .catch(error => console.error('Error loading audio:', error));
                }
            })
        })

        input.addEventListener("input", (event) => {
            musicVolume=event.target.value;
            localStorage.setItem(`musicVolume`,musicVolume)
            if(musicVolume==0){
                source.stop(0);
                stopped=true;
                return
            }
            gainNode.gain.value = musicVolume/10 

            source.connect(gainNode);
            if(stopped){
                
                source = audioContext.createBufferSource();
                source.connect(gainNode);
                
                source.buffer = buf;
                source.loop = true;
                source.start(0);
                stopped=false;
            }

          });
        exit.addEventListener(`click`,()=>{
            if(container.style.display!=`grid`){
                source.stop();
            }
        })
        exitSelect.addEventListener(`click`,()=>{
            if(container.style.display==`none`){
                source.stop();
            }
        })
    }

    playLoop();
}