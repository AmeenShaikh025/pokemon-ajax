
$(document).ready(function() {

        // poke ajax
        var getName='';
        var columnList;
        var cardList;

        $.ajax({
            type: 'GET',
            beforeSend: function(){
                $('.loader').css("display", "block");
                $('.pokemon-list .home').css('display','none');
              },
            url: 'https://pokeapi.co/api/v2/pokemon/',
            contentType: false,
            cache: false,
            processData: false,
            'dataType': "json",
            success: function (data) {
                // console.log(data);
                
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
                    //console.log(desc.types[i].type.name);

                    var card = `
                    <div class="col-lg-3 col-md-4 mb-3 pokemon-column">
                        <div class="card pokemon-card">
                            <div class="view overlay">
                                <img class="card-img-top pokemon-img" style="width:96px;height:96px;margin: 0 auto;" src="${desc.sprites.front_default}" alt="${pokeName}">
                                <a>
                                    <div class="mask pokemon-mask rgba-white-slight text-secondary pl-2 pt-2 font-weight-bold"> #${desc.id}</div>
                                </a>
                            </div>
                        <div class="card-body">
                            <h4 class="card-title pokemon-name text-center text-capitalize text-danger">${pokeName}</h4>                               
                            <div class="row">
                                <div class="col-12">
                                <p class="text-center deep-purple-text mb-1" style="font-size: 12px;"> <strong>Weight:</strong> ${(desc.weight)/10} kg</p>
                                </div>
                                <div class="col-12">
                                <p class="text-center mb-1" style="font-size: 12px;color: #78c850;"> <strong>Height:</strong> ${(desc.height)/10} m</p>
                                <p class="pokemon-type d-none">${desc.types[i].type.name}</p>
                                </div>
                            </div>
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
                    
                },
                complete: function(){
                    setTimeout(function() {
                        $('.loader').css("display", "none");
                        $('.pokemon-list .home').css('display','block');
                    }, 500);   
                }
            })  
        }

        //search functionality
        $('#search-pokemon').keyup(function() {
            var poke_name,poke_names,name_values;
            var search = $('#search-pokemon').val().toUpperCase();

            columnList = $(".pokemon-column");
            cardList = $(".pokemon-card");
            poke_name = $('.pokemon-name');
            for (i = 0; i <= cardList.length; i++) {
                poke_names = poke_name[i];
                name_values = poke_names.textContent || poke_names.innerText;
                if (name_values.toUpperCase().indexOf(search) > -1) {
                    columnList[i].style.display = "";
                } else {
                    columnList[i].style.display = "none";
                }
            }
        });

        //select types
        $('#pokemon-types').on('change', function() {
            var pokemon_type,poke_types,poke_value;
            var selected_type = this.value;

            columnList = $(".pokemon-column");
            cardList = $(".pokemon-card");
            pokemon_type = $(".pokemon-type");
            for (i = 0; i <= cardList.length; i++) {
                poke_types = pokemon_type[i];
                poke_value = poke_types.textContent || poke_types.innerText;
                if (poke_value.toLowerCase().indexOf(selected_type) > -1) {
                    columnList[i].style.display = "";
                } else if(selected_type == 'all') {
                    columnList[i].style.display = "block";
                    $('.pokemon-list').css('height','100%');
                }
                else {
                    columnList[i].style.display = "none";
                    $('.pokemon-list').css('height','100vh');
                }
            }
        });



        //Pokemon details

        $('.pokemon-mask').click(function() {
            // alert(this.parent().siblings('.pokemon-img').src);
            alert('hi');
        });
        $('.pokemon-img').click(function() {
            // alert(this.parent().siblings('.pokemon-img').src);
            alert('hi');
        });
});
    
