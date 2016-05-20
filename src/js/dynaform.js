(function( $ ){
    $.fn.dynaform = function() {

    	//default values
    	var defaults = {
          'token' 	: '',
          'secret' 	: '',
          'fields' 	: '',
          'modal' 	: false,
          'title'   : 'Formulário',
          'saveurl' : ''
        };
 
        var settings = $.extend( {}, defaults, options );

		return this.each (function() {

			var df_id = $(this).attr('id');

			if(settings.modal){				
				
				$('<div class="df-window" id="' + df_id + '-modal"></div>').appendTo('body');
				$('<div id="' + df_id + '-mascara" class="df-mascara"></div>').appendTo('body');

				$('<h3>' + settings.title + '</h3>').appendTo('#' + df_id + '-modal');
				$('<form id="' + df_id + '-form"></form>').appendTo('#' + df_id + '-modal');

				//change modal size on window resize	
				$( window ).resize(function() {
					var alturaTela = $(window).height();
			        var larguraTela = $(window).width();

			        $('#' + df_id + '-mascara').css({'width':larguraTela,'height':alturaTela});

			        var left = ($(window).width() /2) - ( $('#' + df_id + '-modal').width() / 2 );
			        var top = ($(window).height() / 2) - ( $('#' + df_id + '-modal').height() / 2 );
			        $('#' + df_id + '-modal').css({'top':top,'left':left});
				});

				//open modal
    			$(this).click( function(e){
			        e.preventDefault();			 			        
			 
			        var alturaTela = $(window).height();
			        var larguraTela = $(window).width();
			     	
			     	//mask size 		        
			        $('#' + df_id + '-mascara').css({'width':larguraTela,'height':alturaTela});			        
			        $('#' + df_id + '-mascara').fadeTo("slow",0.8);
			 
			 		//modal size
			        var left = ($(window).width() /2) - ( $('#' + df_id + '-modal').width() / 2 );
			        var top = ($(window).height() / 2) - ( $('#' + df_id + '-modal').height() / 2 );
			     
			        $('#' + df_id + '-modal').css({'top':top,'left':left});
			        $('#' + df_id + '-modal').show();   
			    });
			 
			 	//click on mask
			    $('#'+df_id+'-mascara').click( function(){
			        $(this).hide();
			        $('#'+df_id+'-modal').hide();
			    });

			    //close modal
			    df_fechar = function(){
			    	$('#'+df_id+'-mascara').hide();
			        $('#'+df_id+'-modal').hide();
			    };

			}else{

				$('<h3>'+settings.title+'</h3>').appendTo(this);
				$('<form id="'+df_id+'-form"></form>').appendTo(this);

			}

			//save
			df_salvar = function (){

				var error = false;

				//validations
				if($('#'+df_id+'-input-nome').val() == undefined || $('#'+df_id+'-input-nome').val().trim() == ""){
					var idError = $('#'+df_id+'-input-nome').attr('name');

					if(!$('p#'+df_id+'-'+idError+'-error').length){						
						$('#'+df_id+'-input-nome').after('<p id="'+df_id+'-'+idError+'-error" class="df-field-error">Obrigatório</p>');
						setTimeout(function() { $('p.df-field-error').remove(); }, 5000);
					}
					error = true;	
				}

				//validations
				if($('#'+df_id+'-input-email').val() == undefined || $('#'+df_id+'-input-email').val().trim() == ""){
					var idError = $('#'+df_id+'-input-email').attr('name');

					if(!$('p#'+df_id+'-'+idError+'-error').length){						
						$('#'+df_id+'-input-email').after('<p id="'+df_id+'-'+idError+'-error" class="df-field-error">Obrigatório</p>');
						setTimeout(function() { $('p.df-field-error').remove(); }, 5000);
					}
					error = true;	
				}
				
				if(error){
					return false;
				}

		    	var $form = $('#'+df_id+'-form');    
	            var data = getFormData($form);
	            
	            var obj = new Object();

	            obj.token = settings.token;
	            obj.secret = settings.secret;
	            obj.lead = data;

	            var contato = JSON.stringify(obj);		            

	            $.ajax({
	                type: "POST",   
	                url: settings.saveurl,    
	                data: contato,       
	                contentType: "application/json",         
	                dataType: "json",
	                success: function(data){
	                	//console.log(data);
	                },
	                error: function(errMsg) {
	                    //console.log(errMsg);
	                }
	            });
		    };	  

		   //  $('#'+df_id+'-input-nome').blur(function(){
		   //  	if($(this).val() != undefined && $(this).val().trim() != ""){
     //                var idError = $(this).attr('name');
					// $('p#'+df_id+'-'+idError+'-error').remove();
		   //  	}	    		
		   //  });

		   //  $('#'+df_id+'-input-email').blur(function(){
		   //  	if($(this).val() != undefined && $(this).val().trim() != ""){
     //                var idError = $(this).attr('name');
					// $('p#'+df_id+'-'+idError+'-error').remove();
		   //  	}	    		
		   //  });

		    function getFormData($form){
	            var unindexed_array = $form.serializeArray();
	            var indexed_array = {};

	            $.map(unindexed_array, function(n, i){
	                indexed_array[n['name']] = n['value'];
	            });

	            return indexed_array;
	        };

	        /* ADD FORM FIELDS */
        	
        	//add div groups
			$('<div class="form-group '+df_id+'-nome"></div>').appendTo('form#'+df_id+'-form');
			$('<div class="form-group '+df_id+'-email"></div>').appendTo('form#'+df_id+'-form');

			//add label field name
			$('<label>Nome *</label>').appendTo('form#'+df_id+'-form div.'+df_id+'-nome');
			$('<input type="text" class="form-control" id="'+df_id+'-input-nome" name="nome" placeholder="Digite o nome" required>').appendTo('form#'+df_id+'-form div.'+df_id+'-nome');
			
			//add label field email
			$('<label>Email *</label>').appendTo('form#'+df_id+'-form div.'+df_id+'-email');
			$('<input type="email" class="form-control" id="'+df_id+'-input-email" name="email" placeholder="Digite o email" required>').appendTo('form#'+df_id+'-form div.'+df_id+'-email');
			
			//add select fields dynamics
			$.each(settings.fields, function( field, values ) {
				
				$('<div class="form-group '+df_id+'-'+field+'"></div>').appendTo('form#'+df_id+'-form');
				$('<label>'+field+'</label>').appendTo('form#'+df_id+'-form div.'+df_id+'-'+field);
				$('<select class="form-control" id="'+df_id+'-select-'+field+'" name="'+field+'"></select>').appendTo('form#' + df_id + '-form div.' + df_id + '-' + field);
				
				$.each(values, function( indexOption, labelOption){
					$('<option value="'+indexOption+'">'+labelOption+'</option>').appendTo('select#'+df_id+'-select-'+field);
				});
			});

			/* ADD FORM BUTTONS */

			$('<div class="'+df_id+'-footer"><a id="'+df_id+'-btn-salvar" onclick="df_salvar()" class="btn btn-success">Salvar</a></div>').appendTo('form#'+df_id+'-form');

			if(settings.modal){
				$('<a id="'+df_id+'-btn-fechar" onclick="df_fechar()" class="btn btn-default df-btn-fechar>Fechar</a>').appendTo('.'+df_id+'-footer');
			}

    	});
    }; 
})( jQuery );