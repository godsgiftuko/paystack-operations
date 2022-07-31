const cardActions = () => {
	const form = $(".card-details");
	const qty = $(".product__details-basket-quantity").val();
	const amount = $(".product__details-basket-price").attr('product-price');
	const cardHolder = $(".card-details__holder-input");
	const cardNumbers = $(".card-details__number-input");
	const cardExpiration = $(".card-details__expiration-date-input");
	const cardCW = $(".card-details__security-code-input");
	const submitBtn = $(".card-details__submit");


	const pasteCardNumber = () => {
		cardNumbers.bind("paste", function(e){
		    // access the clipboard using the api
		    var pastedData = e.originalEvent.clipboardData.getData('text');


		    while(pastedData.length) {

		    }
		    // console.log(pastedData, $(this));
		});
	}
	// pasteCardNumber()

	cardNumbers.on({
		'keyup keydown': function({ keyCode, key }) {
	    	const detailNums = $(".card-details__number-input"); 
		    const counter = cardNumbers.toArray().map(input => $(input).val().length).reduce((prev, curr) => prev + curr);
		    const value = $(this).val();
		    const maxLength = 4;

	    	if (value.length === maxLength) {
		    	$(this).closest('div').next().find(':input').first().focus();
		    } else if (value.length > maxLength) {
		    	$(this).val(key);
		    }

		    if ((keyCode === 46 || keyCode === 8) && !value.length) { 
		    	$(this).closest('div').prev().find(':input').first().focus();
		    }	

		    if (counter === (maxLength * maxLength)) {
		    	cardHolder.focus();
		    }

		},
		'focus': function() {
			$(this).val('');
		}
	});

	cardHolder.on('keyup', function({ keyCode }) {
		const value = $(this).val();
		if ((keyCode === 46 || keyCode === 8) && !value.length) { 
	    	$(this).closest('div').prev().find(':input').first().focus();
	    	const lastChild = cardNumbers[cardNumbers.length-1];
	    	$(lastChild).focus();
	    }
	});

	cardExpiration.on({
		'keyup': function({ key }) {
			const value = $(this).val();
			const maxLength = $(this).attr('maxlength');
			const isValidExpirationCode = /[0-9]{2} \/ [0-9]{2}/.test(value);

			if (parseInt(key, 10)) {

				if (/[A-Z]{2} \/ [A-Z]{2}/.test(value)) {
					$(this).val(value.replace(value, key));
				}

				if (value.length === 2) {
					$(this).val(value+' / ');
				}

				if (isValidExpirationCode && value.length >= maxLength) {
					cardCW.focus();
				}
			}
		},
		'focus': function() {
			$(this).val('');
		}
	});

	cardCW.on({
		'keyup': function({ key }) {
			const value = $(this).val();
			const maxLength = $(this).attr('maxlength');

			if (parseInt(key, 10)) {

				if (value.length >= maxLength) {
					submitBtn.focus();
				}
			}
		},
		'focus': function() {
			$(this).val('');
		}
	});

	form.submit(function(e) {
		e.preventDefault();

		const dataAsJSON = JSON.stringify({
			cardNumbers: $(cardNumbers).toArray().map(input => $(input).val()).toString(),
			cardHolder: $(cardHolder).val(),
			cardExpiration: $(cardExpiration).val(),
			cardCW: $(cardCW).val(),
			amount: amount * qty
		});

		$.post({
			url: '/checkout',
			contentType: 'application/json',
			data: dataAsJSON,
			beforeSend() {
				// Validate card details
			},
			success(res) {

				if (res?.redirect) {
					location.href = res.redirect; 
				}
			},
			failed(res) {
				console.log(res)
			},
		});
	});
}

cardActions();