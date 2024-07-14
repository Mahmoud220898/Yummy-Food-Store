"use strict";
// ------------------------ Start Global
const aside = $("aside");
// ------------------------ End Global

// when start
(() => {
  $("#date").html(`
   ${new Date().getFullYear()}
   `);
  getSearch(
    "m",
    "https://www.themealdb.com/api/json/v1/1/search.php?s=",
    "content"
  );
})();

$(function () {
  $(".loading").fadeOut(1300, function () {
    $(this).addClass("d-none");
  });
});
// end start

// ------------------------ Start Events
//Menu
$("#menuIcon").on("click", showMenu);

// Check Select Link
$(".aside-links a").on("click", function (e) {
  selectArea(e.target.innerHTML);
  $(".aside-links a").removeClass("active");
  $(this).addClass("active");
});

// ------------------------ End Events

// ------------------------ Start Functions
// Show Menu
function showMenu() {
  if (aside.css("left") == "-240px") {
    $("#menuIcon").removeClass("fa-bars").addClass("fa-close");

    $("aside").animate({
      left: 0,
    });

    $(".aside-links li").animate(
      {
        paddingTop: 25,
      },
      1000
    );
  } else {
    $("#menuIcon").removeClass("fa-close").addClass("fa-bars");
    $("aside").animate({
      left: -240,
    });

    $(".aside-links li").animate(
      {
        paddingTop: 500,
      },
      1000
    );
  }
}

// Select Area By Link Navside --- ( and (Validation in) last else )
function selectArea(btn) {
  if (btn == "Search") {
    $("#content").html(`
      
      <!-- --- Start Inputs -- -->
      <div class="row gy-3 ">
        <div class="col-lg-6 ">
          <input
            type="search"
            class="form-control text-start rounded-2"
            placeholder="Search By Name"
            id="searchName"
          />
        </div>

        <div class="col-lg-6">
          <input
            type="search"
            class="form-control text-start rounded-2"
            placeholder="Search By First Letter"
            id="searchTitle"
          />
        </div>
      </div>
      <!-- --- End Inputs -- -->

      <!-- --- Start Content -- -->
      <div class="content-area pt-5 mt-5 " id="contentArea">
    
      </div>
      `);

    // Search Event by Name
    $("#searchName").on("input", function () {
      console.log(this.value);
      getSearch(
        this.value,
        "https://www.themealdb.com/api/json/v1/1/search.php?s=",
        "contentArea"
      );
    });

    // Search Event by Title
    $("#searchTitle").on("input", function () {
      this.value = this.value.length > 0 ? this.value.slice(0, 1) : "";

      getSearch(
        this.value.length > 0 ? this.value : "m",
        "https://www.themealdb.com/api/json/v1/1/search.php?f=",
        "contentArea"
      );
    });
  } else if (btn == "Categories") {
    getCategory();
  } else if (btn == "Area") {
    area();
  } else if (btn == "Ingredients") {
    ingredit();
  } else {
    $("#content").html(`
   <h1 class="text-center py-5 text-white"></h1>

   <form autocomplete="off">
   
<div class="row py-5 gy-4 justify-content-center align-items-center">

<div class="col-lg-5 position-relative">
<input
type="text"
class="form-control text-start rounded-2 bg-white text-dark"
placeholder="Enter Your Name"/>

<p class="alert alert-danger d-none  position-absolute top-100 start-50 translate-middle-x w-75  z-top d-none">
Special Characters and Numbers not allowed
</p>
</div>

<div class="col-lg-5 position-relative">
<input
type="email"
class="form-control text-start rounded-2 bg-white text-dark"
placeholder="Enter Your Email"/>

<p class="alert alert-danger d-none  position-absolute top-100 start-50 translate-middle-x w-75  z-top d-none">
Email not valid *example@yyy.zzz

</p>

</div>


<div class="col-lg-5 position-relative">
  <input
  type="tel"
  class="form-control text-start rounded-2 bg-white text-dark"
  placeholder="Enter Your Phone"/>

  <p class="alert alert-danger d-none  position-absolute top-100 start-50 translate-middle-x w-75  z-top d-none">
  Enter valid Phone Number
</p>
  </div>



  <div class="col-lg-5 position-relative">
    <input
    type="number"
    class="form-control text-start rounded-2 bg-white text-dark"
    placeholder="Enter Your Age"/>

    <p class="alert alert-danger d-none  position-absolute top-100 start-50 translate-middle-x w-75  z-top d-none">
    Enter valid Age

  </p>

    </div>



    <div class="col-lg-5 position-relative">
      <input
      type="password"
      class="form-control text-start rounded-2 bg-white text-dark"
      placeholder="Enter Your Passward"/>

      <p class="alert alert-danger d-none  position-absolute top-100 start-50 translate-middle-x w-75  z-top d-none">
      Enter valid password *Minimum eight characters, at least one letter and one number:*

  
    </p>
      </div>



      <div class="col-lg-5 position-relative">
        <input
        type="password"
        class="form-control text-start rounded-2 bg-white text-dark"
        placeholder="Repassward"/>

        <p class="alert alert-danger d-none  position-absolute top-100 start-50 translate-middle-x w-75  z-top d-none">
        Enter valid Repassword
  
    
      </p>
        </div>


<div class="d-flex justify-content-center">
<button type="submit" class=" btn btn-outline-danger mx-auto my-2 " disabled>Submit</button>
</div>
</div>
   </form>


   
   `);

    // ------------------- Start Validation
    $("form").on("submit", function (e) {
      e.preventDefault(); // Stop Refresh  -- Stop Behavior Subject
      this.reset();

      $("input").removeClass("is-valid succes");
      $("button").attr("disabled", true);
    });

    const valids = {
      name: /^[a-zA-Z ]+$/,
      email:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      phone: /^01[0125][0-9]{8}$/,
      age: /^([1-9]|[1-9][0-9]|100)$/,
      password: /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,

      repasword: function () {
        const pasword = $("input").eq(4);
        const repasword = $("input").eq(5);
        if (pasword.val() == repasword.val()) {
          repasword.addClass("is-valid succes"); // add
          repasword.removeClass("is-invalid error"); // remove
          repasword.next().addClass("d-none");
          return true;
        } else {
          repasword.addClass("is-invalid error"); // add
          repasword.removeClass("is-valid succes"); // remove
          repasword.next().removeClass("d-none");
          return false;
        }
      },
      validTest: function (style, inpuNum) {
        const inputs = $("input").eq(inpuNum);
        console.log(inpuNum);
        console.log(inputs);
        const checkType = style.test(inputs.val());
        if (checkType) {
          inputs.addClass("is-valid succes"); // add
          inputs.removeClass("is-invalid error"); // remove
          inputs.next().addClass("d-none");

          return true;
        } else {
          inputs.addClass("is-invalid error"); // add
          inputs.removeClass("is-valid succes"); // remove
          inputs.next().removeClass("d-none");
          return false;
        }
      },
    };

    $("form").on("input", function () {
      if (
        valids.validTest(valids.name, 0) &&
        valids.validTest(valids.email, 1) &&
        valids.validTest(valids.phone, 2) &&
        valids.validTest(valids.age, 3) &&
        valids.validTest(valids.password, 4) &&
        valids.repasword()
      ) {
        $("button").removeAttr("disabled");
      } else {
        $("button").attr("disabled", true);
      }
    });
  }

  showMenu();
}

// Get Api By Name and By Title
async function getSearch(meal, url, section) {
  $(".loading").removeClass("d-none");
  const ApiResult = await fetch(`${url}${meal}`);

  const listData = (await ApiResult.json()).meals;

  setTimeout(() => {
    $(".loading").addClass("d-none");
  }, 300);
  displayMeals(listData, section);
}

// api filter Category
async function filterCategory(letter, char) {
  $(".loading").removeClass("d-none");
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?${char}=${letter}`
  );
  let result = (await data.json()).meals;
  $(".loading").addClass("d-none");
  displayMeals(result, "content");
}

// api filter area
async function area() {
  $(".loading").removeClass("d-none");
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list
      `
  );
  let result = (await data.json()).meals.slice(0, 20);
  setTimeout(() => {
    $(".loading").addClass("d-none");
  }, 500);

  // console.log(listData);
  let cartona = ``;
  for (let i = 0; i < result.length; i++) {
    cartona += `
  
     
  
      <div class="col">
    <div class="item cp gy-1" onclick="filterCategory('${result[i].strArea}','a')">
        <div class="image position-relative text-center">
    <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
    
    <div >
    <p class="text-white fw-semibold fs-5 ">${result[i].strArea}</p>
    
            </div>
        </div>
    </div>
    </div>
      `;
  }

  $("#content").html(`
  <div
  class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 text-center mt-5"
  
 >
 ${cartona}
 </div> 
 
  `);
}

// api filter ingredit
async function ingredit() {
  $(".loading").removeClass("d-none");
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list
       `
  );
  let result = (await data.json()).meals.slice(0, 20);
  setTimeout(() => {
    $(".loading").addClass("d-none");
  }, 500);
  let cartona = ``;
  for (let i = 0; i < result.length; i++) {
    cartona += `
   
      
   
       <div class="col">
     <div class="item h-100 cp rounded gy-1" onclick="filterCategory('${
       result[i].strIngredient
     }','i')">
         <div class="image position-relative text-center">
     <i class="fa-solid fa-drumstick-bite fa-4x"></i>
     
     <div >
     <h3>${result[i].strIngredient}</h3>
     <p class="text-white small">${result[i].strDescription
       .split(" ", 10)
       .join(" ")}</p>
     
             </div>
         </div>
     </div>
     </div>
       `;
  }

  $("#content").html(`
   <div
   class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 text-center mt-5">
  ${cartona}
  </div> 
  
   `);
}

//Display Category  or Area or Ingredients
async function getCategory() {
  $(".loading").removeClass("d-none");
  let apiData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  let result = (await apiData.json()).categories;
  setTimeout(() => {
    $(".loading").addClass("d-none");
  }, 500);
  // console.log(listData);
  let cartona = ``;
  for (let i = 0; i < result.length; i++) {
    cartona += `

  
   <div class="col">
 <div class="item cp text-dark rounded-2" onclick="filterCategory('${
   result[i].strCategory
 }','c')">
     <div class="image position-relative">
<div class="ratio ratio-4x3"> <img loading="lazy" class="w-100 " src="${
      result[i].strCategoryThumb
    }"></div>
 
 <div class="layer position-absolute end-0 bottom-0 start-0  bg-white opacity-75  py-2 px-2 ">



 <h3 class="align-self-center">${result[i].strCategory}</h3>



 <p class=" small ">${result[i].strCategoryDescription
   .split(" ", 15)
   .join(" ")}</p>
 
         </div>
     </div>
 </div>
 </div>
   `;
  }

  $("#content").html(`
 <div
 class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 text-center mt-5"
 
>
${cartona}
</div> 

 `);
}

// Display Data
function displayMeals(dataAray, section = "content") {
  // console.log(listData);
  let cartona = ``;
  for (let i = 0; i < dataAray.length; i++) {
    cartona += `

   

    <div class="col">
  <div class="item cp " onclick="getDetails(${dataAray[i].idMeal},'${section}')">
      <div class="image position-relative">
      <div class=" ratio ratio-1x1 "> <img loading="lazy" class="w-100 rounded-3" src="${dataAray[i].strMealThumb}"></div>
 
  
  <div class="layer position-absolute end-0 bottom-0 start-0  bg-white opacity-75  py-2 px-2 rounded-3">
  <p class="text-dark fw-semibold fs-5 ">${dataAray[i].strMeal}</p>
  
          </div>
      </div>
  </div>
  </div>
    `;
  }

  $(`#${section}`).html(`
  <div
  class="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 text-center"
  
>
${cartona}
</div> 
 
  `);
}

// Display Data By Id Get Details
async function getDetails(id, section) {
  $(".loading").removeClass("d-none");
  console.log(id, section);
  const apiDetails = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const resultDetails = (await apiDetails.json()).meals[0];
  setTimeout(() => {
    $(".loading").addClass("d-none");
  }, 500);

  // Content Area Details
  $(`#${section}`).html(`
   <div class="row g-4">
   <div class="col-md-4">
     <div class="image ratio ratio-1x1">
       <img loading="lazy"
         class="w-100 rounded-3 position-absolute"
         src="${resultDetails.strMealThumb}"
         alt=""
       />
       <h1 class="fs-2 fw-bold pt-2 top-100 lead">
         ${resultDetails.strMeal}
       </h1>
     </div>
   </div>
   <div class="col-md-8">
     <h3 class="lh">Instructions</h3>
     <p class="pt-3">
      ${resultDetails.strInstructions}
     </p>
     <h4>Area : <span class="">${resultDetails.strArea}</span></h4>
     <h4>Category : <span class="">${resultDetails.strCategory}</span></h4>
     <h4 class="recipes-title">Recipes :</h4>

     <ul class="d-flex flex-wrap mt-4 gap-3" id="recipes">
      
     </ul>
     <h4  class="tags-title">Tags :</h4>

     <ul class="d-flex flex-wrap mt-4 gap-3" id="tags">
      
     </ul>


   <div class="hstack mt-4 gap-2">
     <a href="${resultDetails.strSource}" target="_blank" class="btn btn-success">Source</a>
     <a href="${resultDetails.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
     
   </div>

   </div>
 </div>
   `);

  // Content Area Details Recipes
  let recipes = ``;

  for (let i = 1; i <= 20; i++) {
    if (resultDetails[`strIngredient${i}`]) {
      recipes += `
      
      <li class="badge bg-info bg-opacity-100 text-dark fw-light p-2  fs-6">
      ${resultDetails[`strMeasure${i}`]}${resultDetails[`strIngredient${i}`]}
    </li>
      
      `;
    }
  }

  if (!recipes) {
    $(".recipes-title").addClass("d-none");
  }

  // Content Area Details Tags
  let tagsArray = resultDetails.strTags?.split(","); //['ahmed','medo','ali']
  if (!tagsArray) {
    $(".tags-title").addClass("d-none");
  }
  let tags = ``;
  for (let i = 0; i < tagsArray?.length; i++) {
    tags += `
      
      <li class="badge bg-danger bg-opacity-50 p-2 fw-light fs-6">
      ${tagsArray[i]}
    </li>
      `;
  }

  // Content Area Details Add Tags and recips
  $("#recipes").html(recipes);
  $("#tags").html(tags);
}

// ------------------------ End functions
