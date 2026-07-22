  (function () {
    var questions = [
      {
        prompt: "An hour completely alone, no phone, no task, feels:",
        options: [
          "Easy - restorative, even",
          "Fine, though you'd want something eventually",
          "Long. You'd start looking for a reason to end it early",
          "Close to unbearable within the first ten minutes",
        ],
      },
      {
        prompt:
          "When you're home alone with nothing planned, your first move is to:",
        options: [
          "Let the time be open, unstructured",
          "Do something quiet - read, sit, potter",
          "Reach for your phone within a few minutes",
          "Already have something queued up before you sit down",
        ],
      },
      {
        prompt: "A long walk with no music, no podcast, no calls sounds:",
        options: [
          "Appealing, even necessary sometimes",
          "Fine, if the mood is right",
          "A bit much - you'd want at least music",
          "Almost impossible to imagine choosing on purpose",
        ],
      },
      {
        prompt: "Waiting somewhere with no phone feels:",
        options: [
          "Neutral. You think, or people-watch, or just wait",
          "Mildly restless but manageable",
          "Actively uncomfortable, like something's missing",
          "You'd almost rather leave than sit with it",
        ],
      },
      {
        prompt:
          "When a social plan cancels and you have a free evening, you feel:",
        options: [
          "Quietly relieved - free time to just be",
          "Neutral, you'll find something to do",
          "A little lost, unsure what to do with it",
          "Anxious, and probably fill it with input immediately",
        ],
      },
      {
        prompt:
          "Your longest recent stretch of genuinely unstructured, alone time was:",
        options: [
          "Recently, and it was fine",
          "A few weeks ago, and it was a bit strange at first",
          "Hard to remember",
          "You actively avoid letting this happen",
        ],
      },
      {
        prompt:
          "If you had to eat a meal alone with no phone or screen, you would:",
        options: [
          "Do it without a second thought",
          "Do it, but notice the pull to check something",
          "Struggle to make it through without reaching for the phone",
          "Avoid the situation altogether if possible",
        ],
      },
      {
        prompt: "Silence in a room with another person feels:",
        options: [
          "Comfortable - it doesn't need filling",
          "Fine for a while before it gets slightly tense",
          "Something you feel pressure to break quickly",
          "Something you actively can't tolerate",
        ],
      },
      {
        prompt:
          "If someone offered you a full day alone, no devices, your honest reaction would be:",
        options: [
          "Genuine enthusiasm",
          "Interested, with a little apprehension",
          "Dread, mixed with curiosity",
          "A firm no",
        ],
      },
      {
        prompt: "A weekend entirely alone, no plans at all, sounds:",
        options: [
          "Genuinely appealing",
          "Fine, if it doesn't stretch too long",
          "Something you'd need to brace for",
          "Something you'd actively arrange to avoid",
        ],
      },
      {
        prompt: "When thoughts arise unprompted in silence, you:",
        options: [
          "Let them move through without needing to act on them",
          "Notice them, mostly let them pass",
          "Feel restless and want to interrupt them",
          "Reach for input almost immediately to drown them out",
        ],
      },
      {
        prompt: "Background noise running while you do other things is:",
        options: [
          "Occasional, by choice",
          "Common, but not constant",
          "Nearly always on, out of habit",
          "Non-negotiable; true silence feels wrong",
        ],
      },
      {
        prompt:
          "If you were told you'd be offline for 48 hours starting now, your honest first reaction would be:",
        options: [
          "Mild curiosity, maybe even relief",
          "A shrug - inconvenient but fine",
          "Real discomfort at the thought",
          "Something close to panic",
        ],
      },
    ];
    var tiers = [
      {
        min: 13,
        max: 22,
        name: "At Ease Alone",
        paragraph:
          "Solitude doesn't threaten you - it's a state you can enter and stay in without needing to escape it. This is a genuine resource. Keep making room for it deliberately, especially as the demands on your attention increase elsewhere.",
      },
      {
        min: 23,
        max: 32,
        name: "Tolerant, With Effort",
        paragraph:
          "You can be alone, but it takes a small amount of conscious effort to stay there rather than reach for something. That's normal - but worth noticing when the reaching happens automatically rather than by choice.",
      },
      {
        min: 33,
        max: 42,
        name: "Solitude-Averse",
        paragraph:
          "Being alone with no input has started to register as something to get through rather than something to be in. This is trainable in the other direction, but it will feel uncomfortable before it feels natural again.",
      },
      {
        min: 43,
        max: 52,
        name: "Solitude-Intolerant",
        paragraph:
          "Unfilled time alone reads to your system as an emergency. This is a learned response to constant availability of input, not a fixed trait. Rebuilding tolerance starts small - minutes, not hours - and builds from there.",
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
