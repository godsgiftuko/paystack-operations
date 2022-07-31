const paystack = require("paystack")(process.env.PAYSTACK_SK);

module.exports = function({ data }) {
	return new Promise((resolve, reject) => {
		const {
			email,
			amount,
			cardNumbers,
			cardHolder,
			cardExpiration,
			cardCW,
			birthday
		} = data;

		paystack.transaction.initialize({
			amount,
			email: "godsgiftuko@gmail.com",
			currency: "NGN"
		}, function(error, body) {
		  if (error) return reject(error);
		  resolve(body);
		});
	});
}