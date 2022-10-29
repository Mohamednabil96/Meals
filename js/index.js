let arr = [];
let displayedData = document.getElementById("displayedData");
let headerDesc = document.getElementById("headerDesc")

// N A V B A R   T O G G L E    S T A R T  //
$(document).ready(function () {
let trigger = $('.hamburger'),
    overlay = $('.overlay'),
    isClosed = false;
  
trigger.click(function () {
hamburger_cross();    
AOS.init();
});
  
function hamburger_cross() { 
if (isClosed == true) {          
overlay.hide();
trigger.removeClass('is-open');
trigger.addClass('is-closed');
isClosed = false;
$(".bar").css("left","0")
} else {   
AOS.init();
overlay.show();
trigger.removeClass('is-closed');
trigger.addClass('is-open');
isClosed = true;
$(".bar").css("left", "220px")
}
}
    
$('[data-toggle="offcanvas"]').click(function () {
     $('#wrapper').toggleClass('toggled');
});  

});
// N A V B A R   T O G G L E   E N D //

//////////////////////////////////////////////////////////////////////////////////

//  H O M E   F U N C T I O N S     S T A R T  //
meal("").then(() => {
    $(".loading-screen").fadeOut(1000, () => {
        $("body").css("overflow", "visible")
    })
})

function displayMeals(arr) {
let cartona = ""
let description = ""
description += `
<h1 class="row text-center justify-content-center mt-3 ms-5 me-1 header-title">
YUMMY
</h1>
`
for (let i = 0; i < arr.length; i++) {
cartona += `
      <div class="col-md-6 col-lg-3 my-3 px-4 meal-box">
          <div onclick="getMeal('${arr[i].idMeal}')" class="rounded position-relative">
              <div class="card border-0">
                  <img src='${arr[i].strMealThumb}' class="w-100 rounded" />
                  <div class="meal-layer d-flex align-items-center">
                      <div class="meal-desc p-2">
                          <h2>${arr[i].strMeal}</h2>
                      </div>
                  </div>
              </div>
          </div>
      </div>`
}
displayedData.innerHTML = cartona
headerDesc.innerHTML = description
} // ALL 21 MEALS DISPLAYED

function displayMeal(meal) {
let mealRecipes = ""
for (let i = 1; i <= 20; i++) {
if (meal[`strIngredient${i}`]) {
    mealRecipes += 
    `<li class="col-md-2 g-btn mx-1 my-3 py-1 rounded text-center">
    ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}
    </li>`
      }
}

let tags = meal.strTags?.split(",") 
let tagsStr = "" 
for (let i = 0; i < tags.length; i++) { 
  tagsStr +=
  `<li class="my-3 mx-1 p-2 rounded meal-tags r-btn">
  ${tags[i]}
  </li>` 
} 

let cartona = `
  <div class="col-md-4 meal-box text-white">
        <img class="w-100 my-3 rounded" src="${meal.strMealThumb}">
        <h1>${meal.strMeal}</h1>
  </div>
  <div class="col-md-8 meal-box text-white text-start my-3">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <p><b class="fw-bolder">Area :</b> ${meal.strArea}</p>
        <p><b class="fw-bolder">Category :</b> ${meal.strCategory}</p>
        <h3>Recipes :</h3>

        <div class="d-flex">
        <ul class="row" id="mealRecipes">
        </ul>
        </div>

        <h3 class="my-2 mx-1 p-1">Tags :</h3>
        <ul class="d-flex" id="tags">
        </ul>
    
        <a class="btn btn-success text-white ms-4" target="_blank" href="${meal.strSource}">Source</a>
        <a class="btn btn-danger text-white" target="_blank" href="${meal.strYoutube}">Youtube</a>
    </div>
    `
displayedData.innerHTML = cartona
document.getElementById("mealRecipes").innerHTML = mealRecipes
document.getElementById("tags").innerHTML = tagsStr

}// For Individual Meal

async function getMeal(mealID) {
  let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  meal = await meal.json()
  displayMeal(meal.meals[0])
}// For Individual Meal

async function meal(e) {
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e}`)
  meals = await meals.json()
  displayMeals(meals.meals)
  return meals
}
// H O M E    F U N C T I O N S    E N D  //

// C A T E G O R I E S   F U N C T I O N S   S T A RT
function displayCategories() {
let cartona = `
<h2 class="row text-center text-light justify-content-center mb-5 search-header-text">
CHOOSE A CATEGORY!
</h2>`
for (var i = 0; i < arr.length; i++) cartona += `

<div class="col-md-6 col-lg-3 my-3 category-box ">
    <div class="rounded position-relative">
        <div onclick="filterByCategory('${arr[i].strCategory}')" class="card bg-black border-0">
            <img src='${arr[i].strCategoryThumb}' class="w-100 rounded" />
            <div class="category-layer d-flex align-items-center ">
                <div class="info p-2">
                    <h2>${arr[i].strCategory}</h2>
                    <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
            </div>
        </div>
    </div>
</div>`
displayedData.innerHTML = cartona
}

async function getCategories() {
x = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
x = await x.json()
return x;
}

async function filterByCategory(category) {
let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
meals = await meals.json()
displayMeals(meals.meals)
return meals;
}

// CATEGORIES FUNCTIONS END

// AREA FUNCTIONS START
function displayArea() {
let cartona = `
<h2 class="row text-center text-light justify-content-center mb-5 search-header-text">
CHOOSE AN AREA!
</h2>`
for (var i = 0; i < arr.length; i++) cartona += `
<div class="col-md-6 col-lg-3 mx-2 mb-5 py-4 rounded area-box">
    <div class="rounded position-relative">
        <div onclick=(filterByArea('${arr[i].strArea}')) class="post ">
              <i class="fa-solid fa-city fa-3x text-danger"></i>
              <h2 class="text-white">${arr[i].strArea}</h2>
          </div>
      </div>
  </div>`
  displayedData.innerHTML = cartona
}

async function getArea() {
  x = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  x = await x.json()
  return x;
  
}

async function filterByArea(area) {
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  meals = await meals.json()
  displayMeals(meals.meals.slice(0, 20))
  return meals;
}
// AREA FUNCTIONS END

// INGREDIENTES FUNCTIONS START

function displayIngredients() {
let cartona =  `
<h2 class="row text-center text-light justify-content-center mb-5 search-header-text">
CHOOSE A MEAL INGREDIENT!
</h2>`
for (var i = 0; i < arr.length; i++) cartona += `
  <div class="col-md-6 col-lg-3 my-3 ingredients-box">
      <div onclick="filterByIngredients('${arr[i].strIngredient}')" class="rounded position-relative">
          <div class="card bg-black">
              <i class="fa-solid fa-bowl-food fa-3x text-success"></i>
              <h2 class="text-white">${arr[i].strIngredient}</h2>
              <p class="text-white">${arr[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
          </div>
      </div>
  </div>`
displayedData.innerHTML = cartona
}
async function getIngredients() {
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  meals = await meals.json()
  displayMeals(meals.meals)
  return meals
}
async function filterByIngredients(ingredients) {
  let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
  meals = await meals.json()
  displayMeals(meals.meals)
  return meals;
}
// INGREDIENTES FUNCTIONS END

$(".nav-item a").click(async (e) => {
let listBy = e.target.getAttribute("href")
let classedWith = e.target.getAttribute("class")
document.getElementById("searchBars").innerHTML = ""
displayedData.innerHTML = ""

// S T A R T    S E A R C H    P A G E    
if (classedWith == "search") {
$(".loading-screen").fadeIn(200)
displayedData.innerHTML = ""

document.getElementById("searchBars").innerHTML = `
<h2 class="row text-center text-white justify-content-center pt-5 ms-5 me-1 search-header-text">
ENTER A SEARCH TERM TO SEARCH FOR A MEAL!
</h2>
    <div class="row justify-content-center align-items-center pt-3">
	<div class="col-md-6"><input id="searchInput" class="bg-dark border-0 form-control mb-sm-2 mb-md-0 mt-3 text-white" placeholder="Search By Name">
	</div>
	<div class="col-md-6">
	<input class="bg-dark border-0 form-control mt-3 text-white" type="text" maxlength="1" id="letter" placeholder="Search By First Letter">
	</div>
	</div>`

$("#searchInput").keyup((e) => {
    search(e.target.value)
})
$("#letter").keyup((e) => {
    getByLetter(e.target.value)
})
$('#letter').on("input", function () {
    if (this.value.length > 1)
    this.value = this.value.slice(0, 1);
});
 
$(".loading-screen").fadeOut(500) 
}
// SEARCH BY NAME
async function search(q) {
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`)
    meals = await meals.json()
    displayMeals(meals.meals)
    return meals
}

// SEARCH BY ONE LETTER
async function getByLetter(letter) {
    if (letter) {
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    meals = await meals.json()
    
    if (meals.meals) {
    displayMeals(meals.meals)
    }
    }
}
//E N D    S E A R C H    P A G E

 // S T A R T    C A T E G O R I E S    P A G E    
if (classedWith == "categories") {
    $(".loading-screen").fadeIn(100)
    x = await getCategories()
    arr = x.categories.splice(0, 20);
    displayCategories()
    $(".loading-screen").fadeOut(500)
}
 //E N D    C A T E G O R I E S    P A G E

// S T A R T    A R E A    P A G E    

if (classedWith == "area") {
$(".loading-screen").fadeIn(100)
  x = await getArea()
  arr = x.meals.splice(0, 20);
  displayArea()
$(".loading-screen").fadeOut(500)
}
 //E N D    A R E A   P A G E
 
// S T A R T    INGREDIENTS    P A G E    

if (classedWith == "ingredients") {
  $(".loading-screen").fadeIn(100)
  x = await getIngredients()
  arr = x.meals.splice(0, 20);
  displayIngredients()
  $(".loading-screen").fadeOut(500)
}
//E N D    INGREDIENTS   P A G E

// S T A R T    C O N T A C T    P A G E    

else if (listBy == "#contact") {
$(".loading-screen").fadeIn(100)

displayedData.innerHTML = `

        <section id="contact" class="container w-75 mx-auto ">
		<div class="p-2">
        
        <h2 class="row text-center text-light justify-content-center mb-5 mt-2 search-header-text">
        IF YOU WANT TO GET IN TOUCH WITH US, FILL OUT THE CONTACT FORM BELOW.
        </h2>
        			<div class="row">
				<div class="col-md-6 mb-3">
					<div class="form-group ">
						<input class="form-control bg-dark border-0 text-white " onkeyup="validation()" id="name"
							placeholder="Enter Your Name">
						<div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
							Special Characters and Numbers not allowed
						</div>
					</div>
				</div>
				<div class="col-md-6 mb-3">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control bg-dark border-0 text-white" id="email" placeholder="Enter E-mail">
						<div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
							Enter valid email. *Ex: xxx@yyy.zzz
						</div>
					</div>
				</div>
				<div class="col-md-6 mb-3">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control bg-dark border-0 text-white" id="phone" placeholder="Enter phone">
						<div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
							Enter valid Phone Number
						</div>
					</div>
				</div>
				<div class="col-md-6 mb-3">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control bg-dark border-0 text-white" id="age" placeholder="Enter Age">
						<div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
							Enter valid Age
						</div>
					</div>
				</div>
				<div class="col-md-6 mb-3">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control bg-dark border-0 text-white" type="password" id="password"
							placeholder="Enter Password">
						<div class="alert mt-1 alert-danger  d-none" id="passwordalert" role="alert">
							Enter valid password *Minimum eight characters, at least one letter and one number:*
						</div>
					</div>
				</div>
				<div class="col-md-6 mb-3">
					<div class="form-group">
						<input onkeyup="validation()" class="form-control bg-dark border-0 text-white" type="password" id="rePassword"
							placeholder="Enter Repassword">
						<div class="alert mt-1 alert-danger  d-none" id="repasswordalert" role="alert">
							Enter valid Repassword
						</div>
					</div>
				</div>
			</div>
			<button type="submit" disabled id="submitBtn" class="btn mt-2">Submit</button>
		</div>

	</section>`
userName = document.getElementById("name"),
userEmail = document.getElementById("email"),
userPhone = document.getElementById("phone"),
userAge = document.getElementById("age"),
userPassword = document.getElementById("password"),
userRePassword = document.getElementById("rePassword"),
userNameAlert = document.getElementById("namealert"),
userEmailAlert = document.getElementById("emailalert"),
userPhoneAlert = document.getElementById("phonealert"),
userAgeAlert = document.getElementById("agealert"),
userpasswordAlert = document.getElementById("passwordalert"),
userRepasswordAlert = document.getElementById("repasswordalert");

userName.addEventListener("focus", () => {
    nameToached = true
})
userEmail.addEventListener("focus", () => {
    emailToached = true
})
userPhone.addEventListener("focus", () => {
    phoneToached = true
})
userAge.addEventListener("focus", () => {
    ageToached = true
})
userPassword.addEventListener("focus", () => {
    passwordToached = true
})
userRePassword.addEventListener("focus", () => {
    repasswordToached = true
})
$(".loading-screen").fadeOut(500) 
}
})

let nameToached = false,
    emailToached = false,
    phoneToached = false,
    ageToached = false,
    passwordToached = false,
    repasswordToached = false;

function validation() {
if (nameToached) {
    if (userNameValid()) {
        userName.classList.remove("is-invalid")
        userName.classList.add("is-valid")
        userNameAlert.classList.replace("d-block", "d-none")
        userNameAlert.classList.replace("d-block", "d-none")
    } else {
        userName.classList.replace("is-valid", "is-invalid")
        userNameAlert.classList.replace("d-none", "d-block")
    }
}

if (emailToached) {
    if (userEmailValid()) {
        userEmail.classList.remove("is-invalid")
        userEmail.classList.add("is-valid")
        userEmailAlert.classList.replace("d-block", "d-none")
        userEmailAlert.classList.replace("d-block", "d-none")
    } else {
        userEmail.classList.replace("is-valid", "is-invalid")
        userEmailAlert.classList.replace("d-none", "d-block")
    }
}

if (phoneToached) {
    if (userPhoneValid()) {
        userPhone.classList.remove("is-invalid")
        userPhone.classList.add("is-valid")
        userPhoneAlert.classList.replace("d-block", "d-none")
        userPhoneAlert.classList.replace("d-block", "d-none")
} else {
        userPhone.classList.replace("is-valid", "is-invalid")
         userPhoneAlert.classList.replace("d-none", "d-block")
  }
}

if (ageToached) {
    if (userAgeValid()) {
        userAge.classList.remove("is-invalid")
        userAge.classList.add("is-valid")
        userAgeAlert.classList.replace("d-block", "d-none")
        userAgeAlert.classList.replace("d-block", "d-none")
    } else {
        userAge.classList.replace("is-valid", "is-invalid")
        userAgeAlert.classList.replace("d-none", "d-block")
    }
}

if (passwordToached) {
    if (userPasswordValid()) {
        userPassword.classList.remove("is-invalid")
        userPassword.classList.add("is-valid")
        userpasswordAlert.classList.replace("d-block", "d-none")
        userpasswordAlert.classList.replace("d-block", "d-none")
    } else {
        userPassword.classList.replace("is-valid", "is-invalid")
        userpasswordAlert.classList.replace("d-none", "d-block")
    }
}

if (repasswordToached) {
    if (userRePasswordValid()) {
        userRePassword.classList.remove("is-invalid")
        userRePassword.classList.add("is-valid")
        userRepasswordAlert.classList.replace("d-block", "d-none")
        userRepasswordAlert.classList.replace("d-block", "d-none")
    } else {
        userRePassword.classList.replace("is-valid", "is-invalid")
        userRepasswordAlert.classList.replace("d-none", "d-block")
    }
}

if(userNameValid() && userEmailValid() && userPhoneValid() && userAgeValid() && userPasswordValid() && userRePasswordValid()){
    document.getElementById("submitBtn").removeAttribute("disabled")
}else{
    document.getElementById("submitBtn").setAttribute("disabled","true")
}

}

function userNameValid() {
    return /^[a-zA-Z ]+$/.test(userName.value)
}

function userEmailValid() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail.value)
}

function userPhoneValid() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(userPhone.value)
}

function userAgeValid() {
    return /^[1-9][0-9]?$|^100$/.test(userAge.value)
}

function userPasswordValid() {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(userPassword.value)
}

function userRePasswordValid() {
    return userPassword.value == userRePassword.value
}
 //E N D    C O N T A C T   P A G E
