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

