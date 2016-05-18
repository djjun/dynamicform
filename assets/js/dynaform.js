(function( $ ){
    $.fn.dynaform = function() {

    	var defaults = {
          'token' 	: '',
          'secret' 	: '',
          'fields' 	: '',
          'modal' 	: false
        };
 
        var settings = $.extend( {}, defaults, options );

		return this.each (function() {
        				
			$('<form id="dyna-form"></form>').appendTo(this);
			$('<div class="form-group df-nome"></div>').appendTo('form#dyna-form');
			$('<div class="form-group df-email"></div>').appendTo('form#dyna-form');

			$('<label>Nome</label>').appendTo('form#dyna-form div.df-nome');
			$('<input type="text" class="form-control" id="df-input-nome" name="nome" placeholder="Digite o nome">').appendTo('form#dyna-form div.df-nome');
			
			$('<label>Email</label>').appendTo('form#dyna-form div.df-email');
			$('<input type="email" class="form-control" id="df-input-email" name="email" placeholder="Digite o email">').appendTo('form#dyna-form div.df-email');
			
			$.each(settings.fields, function( field, values ) {
				$('<div class="form-group df-' + field + '"></div>').appendTo('form#dyna-form');
				$('<label>' + field + '</label>').appendTo('form#dyna-form div.df-' + field);
				$('<select class="form-control" id="df-select-' + field + '" name="' + field + '"></select').appendTo('form#dyna-form div.df-' + field);
				$.each(values, function( indexOption, labelOption){
					$('<option value="' + indexOption + '">' + labelOption + '</option>').appendTo('select#df-select-' + field);
				});
			});

    	});
    }; 
})( jQuery );