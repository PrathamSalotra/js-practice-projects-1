const addbtn = document.querySelector("#addBtn");
const formlay = document.querySelector("#overlay");
const form = document.querySelector("#noteForm");
const imageinput = document.querySelector("#imageInput");
const nameinput = document.querySelector("#nameInput");
const towninput = document.querySelector("#townInput");
const purposeinput = document.querySelector("#purposeInput");
const priorityinput = document.querySelectorAll('input[name="priority"]');
const createbtn = document.querySelector("#createBtn");
const closebtn = document.querySelector("#closeBtn");
const moveupbtn = document.querySelector("#moveUpBtn");
const movedownbtn = document.querySelector("#moveDownBtn");
const cardcontainer = document.querySelector("#cardsContainer");

function saveinlocal(obj){
    if(localStorage.getItem("tasks") === null){
        let oldtask  = [];
        oldtask.push(obj);
        localStorage.setItem("tasks",JSON.stringify(oldtask));
    }else{
        let oldtask = localStorage.getItem("tasks");
        oldtask = JSON.parse(oldtask);
        oldtask.push(obj);
        localStorage.setItem("tasks",JSON.stringify(oldtask));
    }
}

function showCard(){
    let task = JSON.parse(localStorage.getItem("tasks"));
    task.forEach(createCard);
}

function createCard(task) {

    const card = document.createElement("div");
    card.classList.add("card");

    const img = document.createElement("img");
    img.src = task.image;
    img.alt = "Profile";

    const cardcontent = document.createElement("div");
    cardcontent.classList.add("card-content");

    const h2 = document.createElement("h2");
    h2.textContent = task.name;

    const details = document.createElement("div");
    details.classList.add("details");

    const towndiv = document.createElement("div");

    const towntitle = document.createElement("span");
    towntitle.classList.add("title");
    towntitle.textContent = "Home Town";

    const town = document.createElement("p");
    town.textContent = task.town;

    towndiv.appendChild(towntitle);
    towndiv.appendChild(town);

    const prioritydiv = document.createElement("div");

    const prioritytitle = document.createElement("span");
    prioritytitle.classList.add("title");
    prioritytitle.textContent = "Category";

    const priority = document.createElement("p");
    priority.textContent = task.priority;

    prioritydiv.appendChild(prioritytitle);
    prioritydiv.appendChild(priority);

    details.appendChild(towndiv);
    details.appendChild(prioritydiv);

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");

    const callbtn = document.createElement("button");
    callbtn.classList.add("callBtn");

    const icon = document.createElement("i");
    icon.classList.add("ri-phone-fill");

    callbtn.appendChild(icon);
    callbtn.append(" Call");

    const messagebtn = document.createElement("button");
    messagebtn.classList.add("messageBtn");
    messagebtn.textContent = "Message";

    buttons.appendChild(callbtn);
    buttons.appendChild(messagebtn);

    cardcontent.appendChild(h2);
    cardcontent.appendChild(details);
    cardcontent.appendChild(buttons);

    card.appendChild(img);
    card.appendChild(cardcontent);

    cardcontainer.appendChild(card);
}

function validatedata(evt) {
    evt.preventDefault();

    let select="";
    priorityinput.forEach(function(radio){
        if(radio.checked){
            select = radio.value;
        }
    });

    if (imageinput.value.trim() === "") {
        alert("Image URL is required.");
        imageinput.focus();
        return;
    }
    if (nameinput.value.trim() === "") {
        alert("Full Name is required.");
        nameinput.focus();
        return;
    }
    if (towninput.value.trim() === "") {
        alert("Home Town is required.");
        towninput.focus();
        return;
    }
    if (purposeinput.value.trim() === "") {
        alert("Purpose is required.");
        purposeinput.focus();
        return;
    }
    if (!document.querySelector('input[name="priority"]:checked')) {
        alert("Please select a category.");
        return;
    }
    const urlregex = /^https?:\/\/.+/i;
    const nameregex = /^[A-Za-z\s]{3,}$/;
    const townregex = /^[A-Za-z\s]{2,}$/;

    const urlans = urlregex.test(imageinput.value.trim());
    const nameans = nameregex.test(nameinput.value.trim());
    const townans = townregex.test(towninput.value.trim());

    if (!urlans) {
        alert("Please enter a valid image URL.");
        imageinput.focus();
        return;
    }

    if (!nameans) {
        alert("Name should contain only letters and be at least 3 characters.");
        nameinput.focus();
        return;
    }

    if (!townans) {
        alert("Home Town should contain only letters.");
        towninput.focus();
        return;
    }

    if (purposeinput.value.trim().length < 5) {
        alert("Purpose must contain at least 5 characters.");
        purposeinput.focus();
        return;
    }

    const data = {
        image: imageinput.value.trim(),
        name: nameinput.value.trim(),
        town: towninput.value.trim(),
        purpose: purposeinput.value.trim(),
        priority: select
    }

    saveinlocal(data);
    form.reset();
    formlay.style.display = "none";
    
}

addbtn.addEventListener("click", ()=>{
    formlay.style.display = "initial";
});

closebtn.addEventListener("click",()=>{
    formlay.style.display = "none";
});

form.addEventListener("submit",validatedata);

showCard();

moveupbtn.addEventListener("click",function(){
    let lastchild = cardcontainer.lastElementChild;
    if(lastchild){
        cardcontainer.insertBefore(lastchild,cardcontainer.firstElementChild);
    }
})
movedownbtn.addEventListener("click",function(){
    let firstchild = cardcontainer.firstElementChild;
    if(firstchild){
        cardcontainer.appendChild(firstchild);
    }
})