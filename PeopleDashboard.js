async function getPeople() {
	try {
		const response = await fetch("https://randomuser.me/api/?results=25&nat=us");
		if (!response.ok) {
			throw new Error(`HTTP Error: ${response.status}`);
        }
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(`Could not get names: ${error}`);
	}
}

async function buildTable() {
	try {
		const data = await getPeople();
		console.log(data);
		// Get the first person to test
		const firstPerson = data.results[0];
		console.log("First person's name:", firstPerson.name.first, firstPerson.name.last);
		console.log("First person's address:", firstPerson.location.street);
		console.log("First person's city:", firstPerson.location.city);

		// Process all people and create data structure
		const people = [];
		for (let i = 0; i < data.results.length; i++) {
			const person = data.results[i];
			people.push({
				fullName: person.name.first + " " + person.name.last,
				lastName: person.name.last,
				address: person.location.street.number + " " + person.location.street.name,
				city: person.location.city,
				state: person.location.state,
				zip: person.location.postcode,
				latitude: person.location.coordinates.latitude,
				longitude: person.location.coordinates.longitude,
				phone: person.phone
			});
		}

		console.log("People (unsorted):", people);

		// Sort by last name (alphabetically)
		people.sort(function(a, b) {
			if (a.lastName < b.lastName) {
				return -1;
			}
			if (a.lastName > b.lastName) {
				return 1;
			}
			return 0;
		});

		console.log("People (sorted by last name):", people);

		// Build HTML table rows using jQuery
		for (let i = 0; i < people.length; i++) {
			const person = people[i];
			
			// Create a table row
			const row = $("<tr></tr>");
			
			// Add the title attribute for phone tooltip on the row
			row.attr("title", person.phone);
			
			// Add table cells with data
			row.append($("<td></td>").text(person.fullName));
			row.append($("<td></td>").text(person.address));
			row.append($("<td></td>").text(person.city));
			row.append($("<td></td>").text(person.state));
			row.append($("<td></td>").text(person.zip));
			row.append($("<td></td>").text(person.latitude));
			row.append($("<td></td>").text(person.longitude));
			
			// Append the row to the table
			$("#people").append(row);
		}
	} catch (e) {
		console.log("Error " + e);
	}
}

buildTable();

// I Think using console.log to show the data at different steps and it showed the array
// of people inside the data.results property. Finding the results property was key to
// accessing the array of people helped me move forward with building the table. 

// The last few days i have gone over the for loop and how to use it to iterate over
// arrays. So using a for loop to go through each person in the results array and push
// the relevant data into a new people array made sense to me. Then sorting the people. 
// I also found that using that beginner loop with i rather than for person of data.results
// made it easier for me to understand. Although both ways work just fine, the cleaner version 
// doesnt necessarily mean its better because it cant access the element by index if needed later. 

// Sorting the people i found a bit tricky because im used to seeing a function called seperately
// and not inline inside the sort method. But after looking at examples i was able to piece it together.