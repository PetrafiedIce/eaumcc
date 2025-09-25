const form = document.getElementById("riddle-form") as HTMLFormElement;
const answerInput = document.getElementById("answer") as HTMLInputElement;
const feedback = document.getElementById("feedback") as HTMLParagraphElement;
const reveal = document.getElementById("reveal") as HTMLElement;

function normalize(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, " ");
}

function isCorrect(answer: string): boolean {
  const normalized = normalize(answer);
  const acceptableAnswers = ["echo"]; // small and fair riddle
  return acceptableAnswers.includes(normalized);
}

function showReveal(): void {
  reveal.hidden = false;
  reveal.classList.add("visible");
  document.body.classList.add("solved");
}

function shake(el: HTMLElement): void {
  el.classList.remove("shake");
  // force reflow
  void el.offsetWidth;
  el.classList.add("shake");
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = answerInput.value;
  if (isCorrect(value)) {
    feedback.textContent = "correct.";
    feedback.classList.remove("bad");
    feedback.classList.add("good");
    showReveal();
    answerInput.setAttribute("disabled", "true");
  } else {
    feedback.textContent = "not quite.";
    feedback.classList.remove("good");
    feedback.classList.add("bad");
    shake(answerInput);
  }
});

// subtle UX: pressing Enter focuses the input if not focused
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && document.activeElement !== answerInput) {
    e.preventDefault();
    answerInput.focus();
  }
});

