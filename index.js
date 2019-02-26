

const countryList = document.getElementById("country-list")
const countryListRight = document.getElementById("country-list-right")
const compare = document.getElementById("compare")
var currentOption = "";
var dataArrayLeft = [];
var dataArrayRight = [];

// function that selects country from the dropdown menu
countryList.addEventListener('change', function(){
	ajaxCallCountries().then(function(data){
		ajaxCallGDP()
	})
})

countryListRight.addEventListener('change', function(){
	ajaxCallCountriesRight().then(function(data){
		ajaxCallGDPRight()
	})
})
	
// ajax call that gets the info about the selected country
function ajaxCallCountries(){
		currentOption = countryList.options[countryList.selectedIndex].innerHTML
		console.log(currentOption)
	return new Promise((resolve, reject) => {
		$.ajax({url: "https://restcountries.eu/rest/v2/name/" + currentOption + "?fullText=true",
		type: "GET",
	    dataType: 'json',
			success: function(res){
				resolve(createFieldsLeft(res[0]))
			}
		})
	})
}

function ajaxCallCountriesRight(){
		currentOption = countryListRight.options[countryListRight.selectedIndex].innerHTML
	return new Promise((resolve, reject) => {
		$.ajax({url: "https://restcountries.eu/rest/v2/name/" + currentOption + "?fullText=true",
		type: "GET",
	    dataType: 'json',
			success: function(res){
				resolve(createFieldsRight(res[0]))
			}
		})
	})
}


// function that creates and populates the fields of name, area, population capital and flag
function createFieldsLeft(country){
	
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
		boxLeft.style.gridGap = '5px'
		boxLeft.style.border = '1px solid yellow'
		container.appendChild(boxLeft)
		let countryName = document.createElement("div")
		countryName.innerHTML = "Name: " +  country.name
		dataArrayLeft.push(country.name)
		boxLeft.appendChild(countryName)
		let countryArea = document.createElement("div")
		countryArea.innerHTML ="Area: " + numberWithCommas(country.area) + "km2"
		boxLeft.appendChild(countryArea)
		let countryPopulation = document.createElement("div")
		countryPopulation.innerHTML = "Population: " +  numberWithCommas(country.population)
		dataArrayLeft.push(country.population)
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

function createFieldsRight(country){
	console.log(country)
	let container = document.createElement('div')
		container.style.width = '100%'
		container.style.margin = "20px auto";
		container.style.border = '2px solid orange'
		container.style.display = "grid"
		container.style.gridTemplateColumns = '1fr 1fr'
		container.setAttribute("id", "container")
		document.body.appendChild(container)
		let boxRight = document.createElement("div")
		boxRight.setAttribute("id", "boxRight")
		// boxLeft.style.background = 'green'
		boxRight.style.display = "grid"
		boxRight.style.gridTemplateColumns = '1fr 1fr 1fr 1fr'
		boxRight.style.gridGap = '5px'
		boxRight.style.border = '1px solid yellow'
		// container = document.getElementById("container")
		container.appendChild(boxRight)
		let countryName = document.createElement("div")
		countryName.innerHTML = "Name: " +  country.name
		dataArrayRight.push(country.name)
		boxRight.appendChild(countryName)
		let countryArea = document.createElement("div")
		countryArea.innerHTML ="Area: " + numberWithCommas(country.area) + "km2"
		boxRight.appendChild(countryArea)
		let countryPopulation = document.createElement("div")
		countryPopulation.innerHTML = "Population: " +  numberWithCommas(country.population)
		dataArrayRight.push(country.population)
		boxRight.appendChild(countryPopulation)
		let countryCapital = document.createElement("div")
		countryCapital.innerHTML = "Capital: " +  country.capital
		boxRight.appendChild(countryCapital)

		let countryFlag = document.createElement('div')
		countryFlag.style.gridColumnStart = "2"
		countryFlag.style.gridColumnEnd = "4"
		countryFlag.style.height = "100px"
		countryFlag.style.backgroundImage = "url(" +  country.flag + ")"
		countryFlag.style.backgroundSize = "100% 100%"
		countryFlag.style.border = "1px solid"
		boxRight.appendChild(countryFlag)
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

function ajaxCallGDPRight(){
		$.ajax({url: "https://raw.githubusercontent.com/OggiDanailov/gdp-data/master/data.json",
		type: "GET",
	    dataType: 'json',
			success: function(res){
				getGDPRight(res)
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
				dataArrayLeft.push(data[i]["2017"])
				boxLeft.appendChild(countryGDP)	
			}else if(data[i]["2018"] == "" && data[i]["2017"] == ""){
				countryGDP.innerHTML = "GDP for 2016: " +  numberWithCommas(data[i]["2016"])
				dataArrayLeft.push(data[i]["2016"])
				boxLeft.appendChild(countryGDP)
			}

			else {
				countryGDP.innerHTML = "GDP for 2018: " +  numberWithCommas(data[i]["2018"])
				dataArrayLeft.push(data[i]["2018"])
				boxLeft.appendChild(countryGDP)	
			}
		} 
	}
}

function getGDPRight(data){
	boxRight = document.getElementById("boxRight")
	let countryGDP = document.createElement("div")
	countryGDP.style.gridColumnStart = '1'
	countryGDP.style.gridColumnEnd = "3"
	countryGDP.style.gridRowStart = "3"
	countryGDP.style.gridRowEnd = "4"
	for(let i = 0;i<data.length;i++){
		if(currentOption == data[i]["Country Name"]){
			// console.log(data[i]["2018"])
			if(data[i]["2018"] == ""){
				countryGDP.innerHTML = "GDP for 2017: " +  numberWithCommas(data[i]["2017"])
				dataArrayRight.push(data[i]["2017"])
				boxRight.appendChild(countryGDP)	
			}else {
				countryGDP.innerHTML = "GDP for 2018: " +  numberWithCommas(data[i]["2018"])
				dataArrayRight.push(data[i]["2018"])
				boxRight.appendChild(countryGDP)	
			}
		} 
	}
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


compare.addEventListener("click", doComparison)

function doComparison(){
	const gdp1 = fixNumbers(dataArrayLeft[2]/dataArrayLeft[1]); 
	const gdp2 = fixNumbers(dataArrayRight[2]/dataArrayRight[1]); 
	console.log("The gdp per person in " +  dataArrayLeft[0] + " is " + gdp1 +"$ per year")
	console.log("The gdp per person in " +  dataArrayRight[0] + " is " + gdp2 +"$ per year")
	if(gdp1 > gdp2){
		console.log("if " + dataArrayRight[0] + " has to catch up with " + dataArrayLeft[0] + ", " + "the total gdp of " + dataArrayRight[0] + " should be lifted to " + compareGDP(gdp1,gdp2,dataArrayRight[2]) + " "  )
	}else {		
		console.log("if " + dataArrayLeft[0] + " has to catch up with " + dataArrayRight[0] + ", " + "the total gdp of " + dataArrayLeft[0] + " should be lifted to " + compareGDP(gdp2,gdp1,dataArrayLeft[2]) + " ;" + " this is " + fixNumbers(comparePercentage(compareGDP(gdp2,gdp1,dataArrayLeft[2]),dataArrayLeft[2])) + "%" + " increase of the gdp"  )
	}
	
}

function fixNumbers(x){
	return parseFloat(x.toFixed(2))
}

function compareGDP(x, y, z){
	return numberWithCommas(fixNumbers((x/y) * z))
}

function comparePercentage(x, y){
	var a = x.toString().replace(/\,/g, " ")
	var b = a.replace(/\s/g, "")
	console.log(b)
	console.log(y)
	return (y/parseFloat(b))*100

}



