// Define variables
const tableBody = document.getElementById('table-body');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const sortAZButton = document.getElementById('sort-az');
const sortZAButton = document.getElementById('sort-za');
const sortMarksButton = document.getElementById('sort-marks');
const sortPassingButton = document.getElementById('sort-passing');
const sortClassButton = document.getElementById('sort-class');
const sortGenderButton = document.getElementById('sort-gender');
let studentsData = [];
let currentSortOrder = 'asc';

// Function to fetch JSON data
async function fetchStudentsData() {
    try {
        const response = await fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json');
        studentsData = await response.json();
        populateTable(studentsData);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to populate the table with data
function populateTable(data) {
    // Clear existing rows
    tableBody.innerHTML = '';

    data.forEach((student) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td><img src="${student.image}" alt="${student.first_name} ${student.last_name}" width="40" height="40"> ${student.first_name} ${student.last_name}</td>
            <td>${student.gender}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
            <td>${student.passing ? 'Passing' : 'Failed'}</td>
            <td>${student.email}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to filter table data based on search input
function filterTableData() {
    const searchText = searchInput.value.toLowerCase();
    const filteredData = studentsData.filter((student) => {
        const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
        return fullName.includes(searchText) || student.email.toLowerCase().includes(searchText);
    });
    populateTable(filteredData);
}

// Function to sort the data by a given key and order
function sortData(key, order) {
    const sortedData = [...studentsData];

    sortedData.sort((a, b) => {
        const valueA = a[key];
        const valueB = b[key];

        if (valueA === valueB) {
            return 0;
        }

        if (order === 'asc') {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueA < valueB ? 1 : -1;
        }
    });

    populateTable(sortedData);
}

// Event listeners
searchButton.addEventListener('click', filterTableData);
searchInput.addEventListener('input', filterTableData);

// Event listeners for sorting buttons
sortAZButton.addEventListener('click', () => {
    sortData('first_name', currentSortOrder);
    currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
});

sortZAButton.addEventListener('click', () => {
    sortData('first_name', currentSortOrder);
    currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
});

sortMarksButton.addEventListener('click', () => {
    sortData('marks', currentSortOrder);
    currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
});

sortPassingButton.addEventListener('click', () => {
    sortData('passing', currentSortOrder);
    currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
});

sortClassButton.addEventListener('click', () => {
    sortData('class', currentSortOrder);
    currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
});

sortGenderButton.addEventListener('click', () => {
    sortData('gender', currentSortOrder);
    currentSortOrder = currentSortOrder === 'asc' ? 'desc' : 'asc';
});

// Initial fetch and populate
fetchStudentsData();
