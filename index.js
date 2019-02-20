

const countryList = document.getElementById("country-list")
var currentOption = "";
// function that selects country from the dropdown menu
countryList.addEventListener('change', function(){
	ajaxCallCountries().then(function(data){
		ajaxCallGDP()
	})
})
	
// ajax call that gets the info about the selected country
function ajaxCallCountries(){
		currentOption = countryList.options[countryList.selectedIndex].innerHTML
	return new Promise((resolve, reject) => {
		$.ajax({url: "https://restcountries.eu/rest/v2/name/" + currentOption + "?fullText=true",
		type: "GET",
	    dataType: 'json',
			success: function(res){
				resolve(createFields(res[0]))
			}
		})
	})
}


// function that creates and populates the fields of name, area, population capital and flag
function createFields(country){
	// console.log(country)
	let container = document.createElement('div')
		container.style.width = '100%'
		container.style.margin = "20px auto";
		container.style.border = '2px solid orange'
		container.style.display = "grid"
		container.style.gridTemplateColumns = '1fr 1fr'
		container.setAttribute("id", "container")
		document.body.appendChild(container)
		let boxLeft = document.createElement("div")
		boxLeft.setAttribute("id", "boxLeft")
		// boxLeft.style.background = 'green'
		boxLeft.style.display = "grid"
		boxLeft.style.gridTemplateColumns = '1fr 1fr 1fr 1fr'
		boxLeft.style.border = '1px solid yellow'
		container.appendChild(boxLeft)
		let countryName = document.createElement("div")
		countryName.innerHTML = "Name: " +  country.name
		boxLeft.appendChild(countryName)
		let countryArea = document.createElement("div")
		countryArea.innerHTML ="Area: " + numberWithCommas(country.area) + "km2"
		boxLeft.appendChild(countryArea)
		let countryPopulation = document.createElement("div")
		countryPopulation.innerHTML = "Population: " +  numberWithCommas(country.population)
		boxLeft.appendChild(countryPopulation)
		let countryCapital = document.createElement("div")
		countryCapital.innerHTML = "Capital: " +  country.capital
		boxLeft.appendChild(countryCapital)

		let countryFlag = document.createElement('div')
		countryFlag.style.gridColumnStart = "2"
		countryFlag.style.gridColumnEnd = "4"
		countryFlag.style.height = "100px"
		countryFlag.style.backgroundImage = "url(" +  country.flag + ")"
		countryFlag.style.backgroundSize = "100% 100%"
		countryFlag.style.border = "1px solid"
		boxLeft.appendChild(countryFlag)
}

// second ajax call function that brings the info about GDP 
function ajaxCallGDP(){
		$.ajax({url: "https://raw.githubusercontent.com/OggiDanailov/gdp-data/master/data.json",
		type: "GET",
	    dataType: 'json',
			success: function(res){
				getGDP(res)
			}
		})
}
	
function getGDP(data){
	boxLeft = document.getElementById("boxLeft")
	let countryGDP = document.createElement("div")
	countryGDP.style.gridColumnStart = '1'
	countryGDP.style.gridColumnEnd = "3"
	countryGDP.style.gridRowStart = "3"
	countryGDP.style.gridRowEnd = "4"
	for(let i = 0;i<data.length;i++){
		if(currentOption == data[i]["Country Name"]){
			console.log(data[i]["2018"])
			if(data[i]["2018"] == ""){
				countryGDP.innerHTML = "GDP for 2017: " +  numberWithCommas(data[i]["2017"])
				boxLeft.appendChild(countryGDP)	
			}else {
				countryGDP.innerHTML = "GDP for 2018: " +  numberWithCommas(data[i]["2018"])
				boxLeft.appendChild(countryGDP)	
			}
		} 
	}
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}




