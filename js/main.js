
$(document).ready(function() {

// poke ajax
var getName='';

$.ajax({
    type: 'GET',
    url: 'https://pokeapi.co/api/v2/pokemon/',
    contentType: false,
    cache: false,
    processData: false,
    'dataType': "json",
    success: function (data) {
        // console.log(data);
        // console.log(data.results[0].name);
        // console.log(data.results[0].url);
        
        poke =   data.results[0].url;
        
        for(var i=0; i < data.results.length+1; i++) {

            getName=data.results[i].name;

            //make another ajax
            getDetails(i+1,getName);
            
        }

        
    }
});

function getDetails(pokelist,pokeName) {
    $.ajax({
        type: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon/'+pokelist+'/',
        contentType: false,
        cache: false,
        processData: false,
        'dataType': "json",
        success: function (desc) {
            // console.log(desc);
            // console.log(desc.sprites.front_default);
            //console.log(desc.types[0].type.name);
            //console.log(desc.weight);


            var card = `
            <div class="col-lg-3 col-md-4 mb-3 pokemon-column">
                <div class="card pokemon-card">
                    <div class="view overlay">
                        <img class="card-img-top" style="width:96px;height:96px;margin: 0 auto;" src="${desc.sprites.front_default}" alt="${pokeName}">
                        <a>
                            <div class="mask rgba-white-slight text-secondary pl-2 font-weight-bold"> #${desc.id}</div>
                        </a>
                    </div>
                <div class="card-body">
                    <h4 class="card-title pokemon-name text-center text-capitalize text-danger">${pokeName}</h4>                               
                    <p class="text-center deep-purple-text">Weight: ${desc.weight} Pound</p>
                </div>
            </div>`;


            //display types
            // for( var t=0; t<=desc.types.length; t++ ) {
            //     var types = `<div class="btn-group btn-group-sm types-btn" role="group" aria-label="types">
            //         <button type="button" class="btn btn-unique btn-sm">${desc.types[i].type.name}</button>
              //      </div>
            //     `;
            //    }

            $('.pokemon-cards').append(card);
            //$('.types-btn').append(types);
            
        }
    })  
}

//search functionality
$('#search-pokemon').keyup(function() {
    var search = $('#search-pokemon').val().toUpperCase();

    var columnList = $(".pokemon-column");
    var cardList = $(".pokemon-card");
    var poke_name = $('.pokemon-name');
    for (i = 0; i <= cardList.length; i++) {
        a = poke_name[i];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(search) > -1) {
            columnList[i].style.display = "";
        } else {
            columnList[i].style.display = "none";
        }
    }
});



});
    