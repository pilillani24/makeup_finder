var brands = [];
var product_types = [];
var brand;
var product_type;

$('#addProduct').on('click',function(){
	event.preventDefault();
	brand = $('#brand-input').val().trim();
	brands.push(brand);

 	product = $('#product-input').val().trim();
	product_types.push(product);

	displayMakeUpfo();
});

function displayMakeUpfo() {
	var queryURL = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=" + brand + "&product_type=" + product;

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		var results = response
		for (var i = 0; i < results.length; i++) {
			var productDiv = $("<div id='results' class='col-md-4'>");
			var productName = results[i].name;
			var pName = $("<div id='product-name'>").text(productName);
			var price = results[i].price;
			var p = $("<p>").text("Price:" + price);
			var productImage = $("<img>");
			var staticSrc = results[i].image_link;
			var webLink = results[i].product_link;

			productImage.attr("src",staticSrc); 
			productImage.addClass("product");
			productImage.attr("href",webLink);

			productDiv.append(pName);
			productDiv.append(productImage);
			productDiv.append(p);
			
			$("#products").prepend(productDiv);
			$("#results").wrap($('<a>',{
   				href: webLink
			}));
			$(document).ready(function(){
		    	$(".product").click(function(){
		        	$(this).attr("href");
		    	});
			});
		}
	})
}