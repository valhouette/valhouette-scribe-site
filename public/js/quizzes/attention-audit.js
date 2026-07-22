  (function () {
    var questions = [
      {
        prompt: "When you sit down to do one task, what actually happens?",
        options: [
          "You do that task, start to finish, without noticing time pass",
          "You do it, but with occasional check-ins elsewhere",
          "You do it in fragments, switching back and forth constantly",
          "You're rarely doing just one thing - everything is simultaneous",
        ],
      },
      {
        prompt: "How many tabs, apps, or windows are open right now?",
        options: [
          "One or two - only what I need",
          "A handful, mostly relevant",
          "More than I could name from memory",
          "I've stopped counting; it's a permanent condition",
        ],
      },
      {
        prompt: "When a notification appears while you're focused, you:",
        options: [
          "Barely register it until you're done",
          "Notice it, finish your thought, then check it",
          "Feel pulled immediately, most of the time",
          "Have already switched before you've registered deciding to",
        ],
      },
      {
        prompt: "At the end of a working day, your mind feels:",
        options: [
          "Clear, like it moved through things in order",
          "A little scattered, but settled",
          "Full of unfinished threads you can't quite name",
          "Like static - too many open loops to locate any single one",
        ],
      },
      {
        prompt: "When you finish reading something, you can usually:",
        options: [
          "Explain it clearly, in your own words, right after",
          "Give the gist, with a little reconstruction",
          "Recall fragments more than the shape of the whole",
          "Barely say what it was about at all",
        ],
      },
      {
        prompt: "Your instinct when a task gets slightly boring or hard is to:",
        options: [
          "Stay with it until it resolves",
          "Push through, with occasional resistance",
          "Look for a smaller, easier task to switch to",
          "Open something else almost automatically",
        ],
      },
      {
        prompt:
          "How often do you start a task, forget you started it, and find it half-finished later?",
        options: [
          "Rarely, if ever",
          "Occasionally, under real pressure",
          "Often enough that I expect it",
          "Constantly - it's closer to my default mode",
        ],
      },
      {
        prompt:
          "When you try to hold a single thought for more than a minute, it:",
        options: [
          "Stays intact, developing as you think it through",
          "Mostly stays, with minor drift",
          "Gets interrupted by unrelated thoughts arriving uninvited",
          "Dissolves almost immediately into something else",
        ],
      },
      {
        prompt:
          "If you had to describe your attention as a physical space, it would be:",
        options: [
          "A quiet room with one thing in it",
          "A room with a few things, tidy enough",
          "A room with several things going at once, some volume",
          "A room with every screen on, all channels playing at once",
        ],
      },
      {
        prompt: "When several things compete for your attention at once, you:",
        options: [
          "Consciously choose one and let the rest wait",
          "Handle them in quick succession, mostly in order",
          "Feel scattered across all of them at once",
          "Freeze, or default to whichever is loudest",
        ],
      },
      {
        prompt:
          "If you saw an honest report of your screen time, you'd expect it to:",
        options: [
          "Roughly match what you'd guess",
          "Be a bit higher than you'd guess",
          "Be uncomfortably higher than you'd guess",
          "Be a number you'd rather not know",
        ],
      },
      {
        prompt: "Reading something long-form without checking your phone:",
        options: [
          "Happens easily, regularly",
          "Happens, with occasional pulls away",
          "Is difficult; you drift often",
          "Rarely happens uninterrupted at all",
        ],
      },
      {
        prompt:
          "The last time you had a genuinely uninterrupted hour of focus was:",
        options: [
          "Recently - it's fairly normal for you",
          "Within the last week or two",
          "Hard to place; it's been a while",
          "You're not sure you remember what that feels like",
        ],
      },
    ];
    var tiers = [
      {
        min: 13,
        max: 22,
        name: "Single-Threaded",
        paragraph:
          "Your attention still moves the way attention is meant to - toward one thing, for as long as that thing needs. This is increasingly rare, and worth protecting deliberately. Notice what conditions make this possible for you, and guard them.",
      },
      {
        min: 23,
        max: 32,
        name: "Mostly Intact, Occasionally Split",
        paragraph:
          "You can still hold a single thread, but the pull toward fragmentation is there at the edges. Your baseline hasn't shifted yet. The work now is prevention - noticing the moments attention starts to split, and choosing not to follow it.",
      },
      {
        min: 33,
        max: 42,
        name: "Habitually Fragmented",
        paragraph:
          "Switching has become your default mode, even when it isn't required by the task. This isn't a character flaw - it's a trained response to an environment built to interrupt you. The work is rebuilding tolerance for single-tasking in small, deliberate doses.",
      },
      {
        min: 43,
        max: 52,
        name: "Fragmented Beyond Recall",
        paragraph:
          "Your attention rarely settles anywhere long enough to complete a full thought uninterrupted. This is a trained state, not a fixed one - but reversing it will take sustained, unglamorous practice: single tasks, done slowly, without permission to switch.",
      },
    ];

    var current = 0;
    var total = 0;
    var selectedScore = null;
    var questionText = document.getElementById("question-text");
    var optionsList = document.getElementById("options");
    var nextBtn = document.getElementById("next-btn");
    var progressFill = document.getElementById("progress");
    var progressLabel = document.getElementById("progress-label");
    var questionBlock = document.getElementById("question-block");
    var resultBlock = document.getElementById("result-block");
    var resultName = document.getElementById("result-name");
    var resultPara = document.getElementById("result-para");

    function renderQuestion() {
      var q = questions[current];
      questionText.textContent = q.prompt;
      optionsList.innerHTML = "";
      selectedScore = null;
      nextBtn.hidden = true;
      progressFill.style.width = (current / questions.length) * 100 + "%";
      progressLabel.textContent =
        "Question " + (current + 1) + " of " + questions.length;
      q.options.forEach(function (opt, i) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "option";
        button.setAttribute("data-score", String(i + 1));
        button.textContent = opt;
        button.addEventListener("click", function () {
          onSelect(Number(button.getAttribute("data-score")));
        });
        optionsList.appendChild(button);
      });
    }

    function onSelect(score) {
      selectedScore = score;
      Array.prototype.forEach.call(
        optionsList.querySelectorAll(".option"),
        function (button) {
          button.classList.toggle(
            "selected",
            Number(button.getAttribute("data-score")) === score,
          );
        },
      );
      nextBtn.hidden = false;
    }

    function onNext() {
      if (selectedScore === null) return;
      total += selectedScore;
      current += 1;
      if (current < questions.length) {
        renderQuestion();
      } else {
        renderResult();
      }
    }

    function renderResult() {
      progressFill.style.width = "100%";
      progressLabel.textContent = "Complete";
      questionBlock.classList.add("hidden");
      resultBlock.classList.remove("hidden");
      var tier = tiers.find(function (t) {
        return total >= t.min && total <= t.max;
      });
      if (tier) {
        resultName.textContent = tier.name;
        resultPara.textContent = tier.paragraph;
      }
    }

    nextBtn.addEventListener("click", onNext);
    renderQuestion();
  })();
