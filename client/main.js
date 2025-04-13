document.getElementById("generateBtn").addEventListener("click", async () => {
  const input = document.getElementById("userInput").value.trim();
  const mode = document.getElementById("modeSelect").value;
  const resultBox = document.getElementById("resultBox");

  if (!input) {
    resultBox.textContent = "Please enter your interests or goals first!";
    return;
  }

  resultBox.textContent = "Thinking... ✨";

  let body = {
    interests: input,
    mode: mode
  };

  if (mode === "academic") {
    body.year = document.getElementById("year").value;
    body.major = document.getElementById("major").value;
    body.minor = document.getElementById("minor").value;
    body.credits = document.getElementById("credits").value;
    body.completedCourses = document.getElementById("courses").value.split(",").map(s => s.trim());
    body.financialAid = document.getElementById("aid").value;
  }

  if (mode === "career") {
    body.level = document.getElementById("level").value;
    body.gpa = document.getElementById("gpa").value;
    body.experience = document.getElementById("experience").value;
    body.industry = document.getElementById("industry").value;
  }
  

  try {
    const response = await fetch("http://localhost:5500/api/suggest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    const suggestion = data.suggestion || "No suggestion returned.";
    resultBox.textContent = suggestion;

    // Save to Firestore
    const db = window.db;
    const { collection, addDoc, serverTimestamp } = await import(
      "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js"
    );

    await addDoc(collection(db, "suggestions"), {
      userInput: input,
      mode: mode,
      suggestion: suggestion,
      timestamp: serverTimestamp()
    });

    console.log("Saved to Firestore!");
  } catch (error) {
    console.error("Error:", error);
    resultBox.textContent = "Something went wrong. Please try again.";
  }
});

document.getElementById("modeSelect").addEventListener("change", (e) => {
  const mode = e.target.value;
  document.getElementById("academicFields").style.display = mode === "academic" ? "block" : "none";
  document.getElementById("careerFields").style.display = mode === "career" ? "block" : "none";
});

