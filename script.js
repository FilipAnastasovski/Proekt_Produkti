const productsURL = 'https://raw.githubusercontent.com/FilipAnastasovski/proekt_produkti/master/listProducts.json';

const products = [];

let countProducts;



$(() => {
    $('#goHome').on('click', showLogo)
    $('#getProducts').on('click', () => {
        showPeople()
        getProductData(productsURL)
    })

    //     $('.btnPref').on('click', () => {
    //         showPeople()
    //         let  type =  $("#getType").val();
    //         let store = $("#getStore").val();
    //         getFilterProductData(productsURL,type,store)
       
        
    // })
})
let getProductData = (url) => {
    products.length ? 
    populateTable(products) :
    fetchData(url)    
}
// let getFilterProductData = (url,type,store) => {
//     products.length ? 
//     filterTable(products,type,store) :
//     fetchData(url)    
// }

const fetchData = url => {
    fetch(url).then(r => r.json())
    .then(r => { 
        products.push(...r)
        return r
    }).catch(e => console.log(e))
}


const showLogo = () => {
    $('#body').html('');
    $('.logo').removeClass('display-none')
    $('#table').addClass('display-none')
    $('#people').addClass('display-none')
    $('#planets').addClass('display-none')
}

const showPeople = () => {
    $('#body').html('');
    $('.logo').addClass('display-none')
    $('#table').removeClass('display-none')
    $('#people').removeClass('display-none')
    $('#planets').addClass('display-none')
    $('#spinner').html('<img class="text-center" src="./assets/spinner3.gif">');
}


let findProduct = (data, keyword) => {
    
}


$(document).ready(function(){
    $(".searchBox").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $(".container tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });


  $(document).ready(function(){
    $(".btnPref").click( function() {
      var type = $("#getType").val().toLowerCase();
     // var store = $("#getStore").val().toLowerCase();
      $(".container tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(type) > -1)
      });
    });
  });




$(".btnSearch").click(function () {

    $(`tr:visible`).css("color", "black");

    let inputName = $("input").val().toLowerCase();

    console.log(inputName);

    if (inputName !== null || inputName !== undefined) {


        $(`tr:visible[id*='${inputName}']`).css("color", "red");
      
        console.log(inputName);

    }

});

$('.btnPref').click(function () {

    $(`td:visible`).css("color", "black");

    let  type =  $("#getType").val();
    let store = $("#getStore").val();

    // console.log(type);

    // if (type !== null && store !== null) {


    //     $(`td:visible[id*='${type}']`).css("color", "red");
        
      
    //     console.log(type);

    // }


});





//     let filterTable = (products,type,store) => {

//     if(type != null && store != null )
//     {
          
//      $(".container").empty();
//      const formatedProducts2 = formatData(products)
    
//      for (let item of formatedProducts2) {
        
//             if( (item.type == type) && ( (item.in_stores.tinex.name == store) &&
//                  (item.in_stores.tinex_discount.name == store) &&
//                  (item.in_stores.vero.name == store) &&
//                  (item.in_stores.ramstor.name == store) )   ) {
            
   
//                     $('.container').append(`
          
//           <tr >  ${item.product_name} </tr >  `);

//  } } } } 






const formatData = products => {
    return products.map(p => {
        // let obj = Object.assign({}, p, { height: p.height + 'cm', mass: p.mass + 'kg' })
        let obj = {
            ...p,
            id: p.id !== 'unknown' ? p.id + 'id' : p.id,
            product_name: p.product_name !== 'unknown' ? p.product_name + 'name' : p.product_name
        }
        // p.height += 'cm'
        // p.mass += 'kg'
        return obj
    })
}


$(`#body`).click(function(){

    console.log(event.target.parentElement.id);

    let id = event.target.parentElement.id;
    getProduct(`${id}`);

    console.log(id);
    
})

function getProduct (url){

        fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            name = response.name;
            $("#personInfo").empty();
           // div da bide prazen , pa posle da se napolni so noviot click
           
            personInfo(response);
    
    

})


function personInfo(data){
    
    $('#personInfo').append(` Boja na koza:${data.skin_color}, Boja na ochi:${data.eye_color}`).css({'background-color':'black','color':'white'});
        console.log(data.skin_color, data.eye_color);
        
    
}


}

let populateTable = (products) => {
   // $('#spinner').html('')
    //$('#body').html('');
    $(".container").empty();
    const formatedProducts = formatData(products)
    let i =1 ;
    for (let item of formatedProducts) {
        
        let nameProduct = item.product_name.toLowerCase();

        $('.container').append(`

        
        <tr id="${nameProduct}">

        <td><input type="checkbox" >Add or remove <br> </td>

        <td>${item.product_name}</td>
        <td>${item.quantity}</td>
        <td class="Image"><img src=${item.slika} ></td>
        <td class="type">${item.type}</td>

       

        <td id="${item.in_stores.tinex.name}">${item.in_stores.tinex.name}</td>
        <td>cena: ${item.in_stores.tinex.cena}</td>
        <td>popust: ${item.in_stores.tinex.popust}</td>

        <td id="${item.in_stores.vero.name}">${item.in_stores.vero.name}</td>
        <td>cena: ${item.in_stores.vero.cena}</td>
        <td>popust:${item.in_stores.vero.popust}</td>

        <td id="${item.in_stores.tinex_discount.name}">${item.in_stores.tinex_discount.name}</td>
        <td>cena:${item.in_stores.tinex_discount.cena}</td>
        <td>popust:${item.in_stores.tinex_discount.popust}</td>

        <td id="${item.in_stores.ramstor.name}">${item.in_stores.ramstor.name}</td>
        <td>cena:${item.in_stores.ramstor.cena}</td>
        <td>popust:${item.in_stores.ramstor.popust}</td>

        
    </tr>
`);
    
    }
    
}

