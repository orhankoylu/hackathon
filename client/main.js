document.getElementById("generateBtn").addEventListener("click", async () => {
  const input = document.getElementById("userInput").value.trim();
  const resultBox = document.getElementById("resultBox");

  if (!input) {
    resultBox.textContent = "Please enter your interests or goals first!";
    return;
  }

  resultBox.textContent = "Thinking... ✨"; 

  try {
    const response = await fetch("http://localhost:5000/api/suggest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ interests: input })
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
      suggestion: suggestion,
      timestamp: serverTimestamp()
    });

    console.log("Saved to Firestore!");
  } catch (error) {
    console.error("Error:", error);
    resultBox.textContent = "Something went wrong. Please try again.";
  }
});
