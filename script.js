
document.addEventListener("DOMContentLoaded", function () {
  // Sample students
  let students = [
    { name: "Alice", marks: 85, attendance: 90 },
    { name: "Bob", marks: 72, attendance: 80 },
    { name: "Charlie", marks: 95, attendance: 95 }
  ];

  // Elements
  const studentTable = document.getElementById("studentTable");
  const studentTable2 = document.getElementById("studentTable2");
  const totalStudents = document.getElementById("totalStudents");
  const avgMarks = document.getElementById("avgMarks");
  const avgAttendance = document.getElementById("avgAttendance");
  const editForm = document.getElementById("editForm");
  const nameInput = document.getElementById("name");
  const marksInput = document.getElementById("marks");
  const attendanceInput = document.getElementById("attendance");

  // Charts
  const marksCtx = document.getElementById("marksChart").getContext("2d");
  const attendanceCtx = document.getElementById("attendanceChart").getContext("2d");

  let marksChart = new Chart(marksCtx, {
    type: "bar",
    data: {
      labels: students.map(s => s.name),
      datasets: [{
        label: "Marks",
        data: students.map(s => s.marks),
        backgroundColor: "#2980b9"
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, max: 100 } }
    }
  });

  let attendanceChart = new Chart(attendanceCtx, {
    type: "line",
    data: {
      labels: students.map(s => s.name),
      datasets: [{
        label: "Attendance (%)",
        data: students.map(s => s.attendance),
        borderColor: "#e67e22",
        backgroundColor: "rgba(230, 126, 34, 0.2)",
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, max: 100 } }
    }
  });

  // Sidebar navigation
  document.querySelectorAll(".sidebar li").forEach(li => {
    li.addEventListener("click", () => {
      document.querySelectorAll(".sidebar li").forEach(i => i.classList.remove("active"));
      li.classList.add("active");
      const tab = li.dataset.tab;
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active-tab"));
      document.getElementById(tab).classList.add("active-tab");
    });
  });

  // Render tables & stats
  function renderTables() {
    studentTable.innerHTML = "";
    studentTable2.innerHTML = "";

    students.forEach(student => {
      const row = `<tr>
        <td>${student.name}</td>
        <td>${student.marks}</td>
        <td>${student.attendance}</td>
      </tr>`;
      studentTable.innerHTML += row;
      studentTable2.innerHTML += row;
    });

    totalStudents.textContent = students.length;
    avgMarks.textContent = (students.reduce((a,b) => a + b.marks, 0)/students.length).toFixed(1);
    avgAttendance.textContent = (students.reduce((a,b) => a + b.attendance, 0)/students.length).toFixed(1) + "%";
  }

  // Update charts dynamically
  function updateCharts() {
    const labels = students.map(s => s.name);
    const marksData = students.map(s => s.marks);
    const attendanceData = students.map(s => s.attendance);

    marksChart.data.labels = labels;
    marksChart.data.datasets[0].data = marksData;
    marksChart.update();

    attendanceChart.data.labels = labels;
    attendanceChart.data.datasets[0].data = attendanceData;
    attendanceChart.update();
  }

  // Form submit
  editForm.addEventListener("submit", e => {
    e.preventDefault();

    const name = nameInput.value.trim();
    const marks = parseInt(marksInput.value);
    const attendance = parseInt(attendanceInput.value);

    if (!name || isNaN(marks) || isNaN(attendance)) return;

    const existing = students.find(s => s.name.toLowerCase() === name.toLowerCase());
    if (existing) {
      existing.marks = marks;
      existing.attendance = attendance;
    } else {
      students.push({ name, marks, attendance });
    }

    renderTables();
    updateCharts();
    editForm.reset();
  });

  // Initial render
  renderTables();
  updateCharts();
});
