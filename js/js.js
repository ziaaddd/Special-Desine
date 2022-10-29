// global variable
let backgroundOption = true;
//variable to contorol; background interval
let backgroundInterval;
///////////////////////////
//work in setting box
// work in fa gear icon
document.querySelector(".settings .icon").onclick = function(){
    document.querySelector(".settings").classList.toggle("open")
    document.querySelector(".fa-gear").classList.toggle("fa-spin")
}

// switch colors 
let colorsLi = document.querySelectorAll(".settings .colors-list li");

colorsLi.forEach(li => {
    li.addEventListener("click", (e) => {
        //set color in root;
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color)

        //set color in local storage
        window.localStorage.setItem("color-option", e.target.dataset.color);

        // remove class active from all element 
        colorsLi.forEach(li => {
            li.classList.remove("active")
        })
        // add active class 
        e.target.classList.add("active")
    });
});
if(localStorage.getItem("color-option") !== null){
    document.documentElement.style.setProperty('--main-color', localStorage.getItem("color-option"));

    // remove class active from color list item 
    //colorsLi
    document.querySelectorAll(".settings .colors-list li").forEach(li => {
        li.classList.remove("active")

         // add active class  on element with data-color ==local storage item
        if(li.dataset.color == localStorage.getItem("color-option")){
            li.classList.add("active")
        }
    })

}

// switch random background 
let randomBg = document.querySelectorAll(".random-background span");

randomBg.forEach(span => {
    span.addEventListener("click", (e) => {
        
        // remove class active from all span 
        document.querySelectorAll(".random-background span").forEach(span => {
            span.classList.remove("active")
        })
        // add active class 
        e.target.classList.add("active");

        if(e.target.dataset.background === "yes"){
            backgroundOption = true;
            randomaize()
            localStorage.setItem("bg-option", true)
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("bg-option", false)
        }
    });
});

// check if there ia local Storage background item 
let backgroundLocalItem = localStorage.getItem("bg-option");

// check i random background local storage is not ipmty 
if (backgroundLocalItem !== null) {

    if(backgroundLocalItem == 'true'){

        backgroundOption = true;
    }else {

        backgroundOption = false;
    }

    // remove active class from all span 
    document.querySelectorAll(".random-background span").forEach(span => {
        span.classList.remove("active")
    })
    // add active class 
    if( backgroundLocalItem === 'true'){
        document.querySelector(".random-background .yes").classList.add("active");
    }else {
        document.querySelector(".random-background .no").classList.add("active")
    }
}
// end
// work in toggle button
let headerLinks = document.querySelector(".landing .links");
let toggleBtn = document.querySelector(".landing .toggle");

toggleBtn.onclick = function (e) {
    e.stopPropagation()
    headerLinks.classList.toggle("open")
    this.classList.toggle("meneau-active")
}
headerLinks.onclick = function (e) {
    e.stopPropagation()
}
document.addEventListener("click", (e) => {
    if(e.target !== toggleBtn && e.target !== headerLinks){
        headerLinks.classList.toggle("open");
        toggleBtn.classList.toggle("meneau-active");
    };
})
// finsh work in toggle work 
// show and hide bullits box 
let bullisOption = document.querySelectorAll(".bullits-option span");

bullisOption.forEach(span => {
    span.addEventListener("click", (e) => {
        
        // remove class active from all span 
        document.querySelectorAll(".bullits-option span").forEach(span => {
            span.classList.remove("active")
        })
        // add active class 
        e.target.classList.add("active");

        if(e.target.dataset.view === "no"){
            document.querySelector(".nav-bullits").classList.add("remove");
            localStorage.setItem("bullits-op", "hiden");
        } else {
            document.querySelector(".nav-bullits").classList.remove("remove");
            localStorage.setItem("bullits-op", "show");
        }
    });
});
// check if there ia local Storage bullits-op
let  bullisOptionLocal = localStorage.getItem("bullits-op");

if(bullisOptionLocal !== null){

    if(bullisOptionLocal == "hiden"){
        document.querySelector(".nav-bullits").classList.add("remove");
    }else{
        document.querySelector(".nav-bullits").classList.remove("remove");
    }

    // remove active class from all span 
    document.querySelectorAll(".bullits-option span").forEach(span => {
        span.classList.remove("active")
    })
    
    // add class active\
    if( bullisOptionLocal === 'show'){
        document.querySelector(".bullits-option .yes").classList.add("active");
    }else {
        document.querySelector(".bullits-option .no").classList.add("active")
    }
}

// end // show and hide bullits box 

// rest localstorage botton 
document.querySelector(".rest").onclick = function(){
    
    // localStorage.clear()
    localStorage.removeItem("color-option");
    localStorage.removeItem("bg-option");
    localStorage.removeItem("bullits-op");

    window.location.reload()
}
 
// worn in nav bullits
let bullits = document.querySelectorAll(".nav-bullits .bullit");
handelScroll(bullits)

// end nav bullitss 
// work in landing section 
let landingSection = document.querySelector(".landing");
let imagesArray = ["landing01.jpg", "landing02.jpg", "landing03.jpg", "landing04.jpg", "landing05.jpg"];

function randomaize(){
    if(backgroundOption == true){
        backgroundInterval = setInterval(() => {
            let randomNum = Math.floor(Math.random() * imagesArray.length);
            landingSection.style.backgroundImage = 'url("images/' + imagesArray[randomNum] +'")'
        }, 10000);
    }
}
randomaize();

let navBarSection = document.querySelectorAll(".landing .links .link");
handelScroll(navBarSection);
// function to handel scrollind section 
function handelScroll(elements){

    elements.forEach(ele => {

        ele.addEventListener("click", (e) => {

            e.preventDefault();


            document.querySelector(e.target.dataset.scrolling).scrollIntoView({
                behavior : "smooth"
            })
    
        })
    })
}
/////////
// work in skills 
let OurSkills = document.querySelector(".skills");


window.onscroll = function(){
    let skillsOffsetTop = OurSkills.offsetTop;
    let skillsHeight = OurSkills.offsetHeight;
    let windowHeight = this.innerHeight;
    let ourScroll = this.pageYOffset;

    if (ourScroll > (skillsOffsetTop + skillsHeight - windowHeight)){
        let OurSkillsSpan = document.querySelectorAll(".skills .skill-box .skill-progress span");

        OurSkillsSpan.forEach(e => {
        e.style.width =  e.dataset.progress
        });
        
    }

};

// worrk in galleryy ssection
let galleyimages = document.querySelectorAll(".gallery img");


galleyimages.forEach(img => {

    img.addEventListener('click', (e) => {
        let overlay = document.createElement("div");
        overlay.className = 'popup-overlay';
        document.body.appendChild(overlay);

        let popupBox = document.createElement("div");
        popupBox.className = 'popup-box';

        if(img.alt !== null){
            let popupHeading = document.createElement("h3");
            let headingText = document.createTextNode(img.alt);
            popupHeading.appendChild(headingText);
            popupBox.appendChild(popupHeading)
        }

        // create close botton /
        let closeSpan = document.createElement("span");
        closeSpan.className = 'close-botton'
        let closeSpanText = document.createTextNode("X");
        closeSpan.appendChild(closeSpanText);
        popupBox.appendChild(closeSpan)


        let popupImage = document.createElement("img");
        popupImage.src = e.target.src;
        //or
        // popupImage.src = img.src;
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);

        // close bottem 

        document.addEventListener('click', function(e){

            if(e.target.className == 'close-botton'){

                e.target.parentElement.remove();
                overlay.classList.remove("popup-overlay")
            }
        });

    });
});



//////////////////////////////////////

var myButton = document.getElementById('pass-toggle'),
    myInput = document.getElementById('pass-id');


myButton.onclick = function (e) {
  e.preventDefault();


  if (this.textContent == 'Show Password') {
    this.textContent = 'Hide Password';
    myInput.setAttribute('type', 'text');


  } else {
    this.textContent = 'Show Password';
    myInput.setAttribute('type', 'password');
  }
};