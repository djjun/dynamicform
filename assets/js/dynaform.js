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

			if(settings.modal){
				
				$('<div class="df-window" id="df-modal"></div>').appendTo('body');
				$('<div id="df-mascara"></div>').appendTo('body');

				$('<h3>' + settings.title + '</h3>').appendTo('#df-modal');
				$('<form id="dyna-form"></form>').appendTo('#df-modal');

				//change modal size on window resize	
				$( window ).resize(function() {
					var alturaTela = $(window).height();
			        var larguraTela = $(window).width();

			        $('#df-mascara').css({'width':larguraTela,'height':alturaTela});

			        var left = ($(window).width() /2) - ( $('#df-modal').width() / 2 );
			        var top = ($(window).height() / 2) - ( $('#df-modal').height() / 2 );
			        $('#df-modal').css({'top':top,'left':left});
				});

				//open modal
    			$(this).click( function(e){
			        e.preventDefault();			 			        
			 
			        var alturaTela = $(window).height();
			        var larguraTela = $(window).width();
			     	
			     	//mask size 		        
			        $('#df-mascara').css({'width':larguraTela,'height':alturaTela});			        
			        $('#df-mascara').fadeTo("slow",0.8);
			 
			 		//modal size
			        var left = ($(window).width() /2) - ( $('#df-modal').width() / 2 );
			        var top = ($(window).height() / 2) - ( $('#df-modal').height() / 2 );
			     
			        $('#df-modal').css({'top':top,'left':left});
			        $('#df-modal').show();   
			    });
			 
			    $("#df-mascara").click( function(){
			        $(this).hide();
			        $(".df-window").hide();
			    });			
			    		    
		        function getFormData($form){
		            var unindexed_array = $form.serializeArray();
		            var indexed_array = {};

		            $.map(unindexed_array, function(n, i){
		                indexed_array[n['name']] = n['value'];
		            });

		            return indexed_array;
		        }	

		        df_salvar = function (){
			    	var $form = $("#dyna-form");    
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
		                dataType: "json",
		                success: function(data){
		                	console.log(data);
		                },
		                error: function(errMsg) {
		                    console.log(errMsg);
		                }
		            });
			    };		    

			    df_fechar = function(){
			    	$("#df-mascara").hide();
			        $("#df-modal").hide();
			    };

			}else{

				$('<h3>' + settings.title + '</h3>').appendTo(this);
				$('<form id="dyna-form"></form>').appendTo(this);					

			}
        	
        	
			$('<div class="form-group df-nome"></div>').appendTo('form#dyna-form');
			$('<div class="form-group df-email"></div>').appendTo('form#dyna-form');

			$('<label>Nome *</label>').appendTo('form#dyna-form div.df-nome');
			$('<input type="text" class="form-control" id="df-input-nome" name="nome" placeholder="Digite o nome" required>').appendTo('form#dyna-form div.df-nome');
			
			$('<label>Email *</label>').appendTo('form#dyna-form div.df-email');
			$('<input type="email" class="form-control" id="df-input-email" name="email" placeholder="Digite o email" required>').appendTo('form#dyna-form div.df-email');
			
			$.each(settings.fields, function( field, values ) {
				$('<div class="form-group df-' + field + '"></div>').appendTo('form#dyna-form');
				$('<label>' + field + '</label>').appendTo('form#dyna-form div.df-' + field);
				$('<select class="form-control" id="df-select-' + field + '" name="' + field + '"></select').appendTo('form#dyna-form div.df-' + field);
				
				$.each(values, function( indexOption, labelOption){
					$('<option value="' + indexOption + '">' + labelOption + '</option>').appendTo('select#df-select-' + field);
				});
			});

			$('<div class="df-modal-footer"><a id="df-btn-salvar" onclick="df_salvar()" class="btn btn-success">Salvar</a></div>').appendTo('form#dyna-form');

			if(settings.modal){
				$('<a id="df-btn-fechar" onclick="df_fechar()" class="btn btn-default">Fechar</a>').appendTo('.df-modal-footer');				
			}

    	});
    }; 
})( jQuery );