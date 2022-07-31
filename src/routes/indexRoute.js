module.exports = function  ({ router, paystackService }) {
	
	router.get('/', function(req, res, next) {
	  res.render('index', { title: 'Express' });
	});

	router.get('/checkout', function(req, res, next) {
	  res.render('checkout',{
	  	title: 'Checkout'
	  });
	});

	router.post('/checkout', async function(req, res){
		try {
			const { message, data } = await paystackService({ data: req.body });
			res.send({
				message: 'Processing payment',
				redirect: data.authorization_url
			});
		} catch(error) {
			res.send(error);
		}
	});

	return router;
}