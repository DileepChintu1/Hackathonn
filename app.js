document.getElementById('studentForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const studentData = {
        studentName: document.getElementById('studentName').value,
        attendance: document.getElementById('attendance').value,
        exams: document.getElementById('exams').value,
        assignments: document.getElementById('assignments').value,
        health: document.getElementById('health').value,
        financial: document.getElementById('financial').value,
    };

    await fetch('http://localhost:5000/addStudent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
    });

    // Fetch updated students' data
    fetchData();
});

async function fetchData() {
    const response = await fetch('http://localhost:5000/students');
    const data = await response.json();

    // Process the data for the graph
    const labels = data.map(student => student.name);
    const attendance = data.map(student => student.attendance);
    const exams = data.map(student => student.exams);
    const assignments = data.map(student => student.assignments);

    // Call function to render the chart
    renderChart(labels, attendance, exams, assignments);
}

function renderChart(labels, attendance, exams, assignments) {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Attendance (%)',
                    data: attendance,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Exams (%)',
                    data: exams,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Assignments (%)',
                    data: assignments,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Call the fetchData function on page load
fetchData();
