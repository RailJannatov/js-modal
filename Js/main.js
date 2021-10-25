let userName = document.querySelector(".login .userName input");
let body = document.querySelector("body");
let userPassword = document.querySelector(".login .userPassword input");
let btnLog = document.querySelector(".login .btnLog");
let loginPage = document.querySelector("#login-page");
let iconPlus = document.querySelector(".icon-header i");
let iconHeader = document.querySelector(".icon-header");
let modalForm = document.querySelector(".modal-form");
let iconInsideModal = document.querySelector(".modal-form .modal-item ")
let btnAdd = document.querySelector(".modal-form .btnAdd");
let markaFromInput = document.querySelector("#Marka");
let priceFromInput = document.querySelector("#Price");
let fileReaderFromInput =document.querySelector("#Image");
let categoryFromInput = document.querySelector("#Category");
let uploadIcon = document.querySelector(".modal-item i");
let modalBg =document.querySelector(".modal");
let closeBtn = document.querySelector(".modal-content i");
let displayTable = document.querySelector("#displayTable");
let filterCategory = document.querySelector("#filtered");
let submitBtnFilter = document.querySelector("#submitBtnFilter");
let filterDiv = document.querySelector(".filter");
const cars = [];

let changeableFilteredCategory;

filterCategory.addEventListener("change",function(e){
    changeableFilteredCategory = e.target.value;   
})
submitBtnFilter.onclick = (e) =>{
    e.preventDefault();
    filteredCategory(changeableFilteredCategory);   
}
          
function filteredCategory(deyishen){
  let filteredByCategory =   cars.filter(car => 
    car.category == deyishen );
  console.log(filteredByCategory);
   if(filteredByCategory!==undefined){
       return  alert("Istediyiniz category de mashin movcuddur");
   }
   else{
       alert("Bu category de mashin yoxdur");
   }
}


let changeableUserName;
let changeableUserPassword;
let changeableMarka;
let changeablePrice;
let changeableCategory;

userName.addEventListener("change",function(e){
    changeableUserName = e.target.value;
})
userPassword.addEventListener("change",function(e){
    changeableUserPassword=e.target.value;
})
markaFromInput.addEventListener("change",function(e){
    changeableMarka = e.target.value;
 
})
priceFromInput.addEventListener("change",function(e){
    changeablePrice = e.target.value;
 
})
categoryFromInput.addEventListener("change",function(e){
    changeableCategory = e.target.value;
    
})

closeBtn.addEventListener("click",function(e){
        modalBg.style.display = "none";
})

window.addEventListener("click",function(e){
    if(e.target == modalBg){
        modalBg.style.display = "none";
    }
})

btnLog.addEventListener("click",function(e){
   if(changeableUserName.length > 3 && changeableUserPassword !== undefined ) {
        loginPage.style.display = "none";
        body.style.backgroundImage ="none";
        iconHeader.style.display = "block";      
   }
   else{
       alert("Name ve ya Password duzgun deyil ")
   }
});

uploadIcon.onclick = function(e){
    this.previousElementSibling.click();
}
let files;
uploadIcon.previousElementSibling.onchange = function(e){
    const fileReader = new FileReader();
    const imageFiles = Array.from(e.target.files);
    imageFiles.forEach((file) => {
        let img = document.createElement("img");
    fileReader.onloadend = (e) => {
        img.setAttribute("src",e.target.result);
        files = e.target.result;    
    }
    fileReader.readAsDataURL(file);
});
}

iconPlus.addEventListener("click",function(e){
     modalForm.style.display = "block";
      modalBg.style.display = "block";
})

function renderList(){
    let table =document.querySelector("#displayTable tbody");
      table.innerHTML = "";
    cars.forEach((car)=>{
        let row = table.insertRow(0);
        let imageCell = row.insertCell(0);
        let nameCell = row.insertCell(1);
        let iconRemoveCell = row.insertCell(2);
        let iconDetailCell = row.insertCell(3);
        let iconEditCell = row.insertCell(4);
      let imageInTD =    document.createElement("img");
      imageInTD.setAttribute("src",car.carImage);
      imageCell.append(imageInTD);
        nameCell.innerHTML = `${car.name}`;
        iconRemoveCell.innerHTML = `<i class="fas fa-trash-alt"></i>`;
        iconDetailCell.innerHTML = `<i class="fas fa-info-circle"></i>`;
        iconEditCell.innerHTML = `<i class="fas fa-edit"></i>`;
        iconRemoveCell.style.fontSize = "x-large";
        iconDetailCell.style.fontSize = "x-large";
        iconEditCell.style.fontSize = "x-large";
        iconRemoveCell.style.textAlign = "center";
        iconDetailCell.style.textAlign = "center";
        iconEditCell.style.textAlign = "center";
        iconRemoveCell.style.color = "red";
        iconDetailCell.style.color = "green";
        iconEditCell.style.color = "blue";


        iconRemoveCell.onclick = function(e){          
            this.parentElement.remove();
        }
        iconDetailCell.onclick = function(e){
                   modalBg.style.display = "block";
                   modalForm.style.display = "block";

        }
        iconEditCell.onclick = function(e){
                   modalBg.style.display = "block";
                   modalForm.style.display = "block";
        }
        imageCell.onclick = function(e){
        }
           
         
    })

}

btnAdd.addEventListener("click",function(e){
       modalBg.style.display = "none";
       displayTable.style.display ="block";
       filterDiv.style.display = "block";
    const car = {
       name: changeableMarka,
       price:changeablePrice,
       category:changeableCategory,
       carImage:files
    }
    if(car.name !== undefined && car.price !== undefined && car.category !== undefined && car.carImage !== undefined){
            modalForm.style.display ="none";
            cars.push(car);
             renderList();
    }
    else{
        alert("Inputlardan tam doldurulmalidi");
    }
  })