$(function() {
	//For all form validations
	var validate={
		init:function(){
			var $this=this;
			// validation will be done at focus out event
			$('#name, #messageTxt').focusout(function() { 
				$this.checkEmpty($(this));
			});
			$('#email').focusout(function() {
				$this.checkEmail($(this));
			});
			$('#phone').focusout(function() {
				$this.checkPhone($(this));
			});

		},
		//To check email is valid
		isEmail:function(email){
				var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
				return pattern.test(email);
		},
		checkEmpty:function($this){
				if (!$this.val())
					$this.addClass('error');
				else
					$this.removeClass('error');
		},
		checkEmail:function($this){
			if (!$this.val() || !this.isEmail($this.val()))
				$this.addClass('error');
			else
				$this.removeClass('error');
		}
	};
	validate.init();

	//Ajax submit
	var ajax={
		init:function(){
			$this=this;
			$('#cform').submit(function(e){
				e.preventDefault();
				var action = $(this).attr('action');
				$this.ajaxSubmit($(this),action);
			});
		},
		ajaxSubmit:function($this,action){
			if ($('#contact .error').size() > 0){ 
				return false;
			}
			if($('#name').val() == ''){
				$('#name').addClass('error');
				return false;
			}
			else if($('#email').val() == ''){
				$('#email').addClass('error');
			}
			else if($('#message').val() == ''){
				$('#message').addClass('error');
			}
			else if($('#recaptcha_response_field').val() == '') {
				alert('write answer');
			}
			else{
				$('#name,#email,#message').addClass('error');
				$("#cform").unbind('submit').submit(function(e){
				e.preventDefault();
				var action = $(this).attr('action');
				$this.ajaxSubmit($(this),action);
			});


			}


			$('#reset').after('<img src="images/ajax-loader.gif" class="loader" />').attr('disabled','disabled');

			$.post(action, $('#cform').serialize(),
				function(data){
					$('#message').html('Thank You! We will get back to you soon.');
					$('#message').slideDown();
					$('#cform img.loader').fadeOut('slow',function(){$(this).remove()});
					$('#cform #submit').removeAttr('disabled');
				});
		}
	};
	ajax.init();
});