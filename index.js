var countryEntry = document.getElementById("country-entry")	
var submit = document.getElementById("submit")

submit.addEventListener('click', function(){
	ajaxCall()
})

function ajaxCall(){
	$.ajax({url: "http://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json",
		type: "GET",
	    dataType: 'json',
		success: function(res){
				console.log(res)
			}
	})
}


