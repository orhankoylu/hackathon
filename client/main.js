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
      resultBox.textContent = data.suggestion || "No suggestion returned.";
    } catch (error) {
      console.error("Error:", error);
      resultBox.textContent = "Something went wrong. Please try again.";
    }
  });