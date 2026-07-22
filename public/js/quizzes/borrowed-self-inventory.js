  (function () {
    var questions = [
      {
        prompt: "When you like something, you usually know why because:",
        options: [
          "You can trace it to your own experience or history",
          "You can mostly explain it, with a little uncertainty",
          "It's hard to say - it just seems like what's good",
          "You liked it before you noticed everyone else did too",
        ],
      },
      {
        prompt: "Your current ambitions feel:",
        options: [
          "Specific to you, built over years",
          "Yours, shaped a little by people you admire",
          "Hard to separate from what looks impressive to others",
          "Suspiciously similar to what performs well online",
        ],
      },
      {
        prompt: "When you picture your ideal life, the images come from:",
        options: [
          "Your own memory and imagination",
          "A mix of your own life and things you've seen",
          "Mostly things you've seen - interiors, routines, aesthetics",
          "A specific feed or account, if you're honest",
        ],
      },
      {
        prompt:
          "If you changed your opinion on something recently, it was because:",
        options: [
          "New experience or evidence changed your mind",
          "A conversation with someone you trust",
          "Something you read or watched shifted your framing",
          "You're not sure - it just changed, somewhere in the scroll",
        ],
      },
      {
        prompt: "Your sense of what's good taste in your field of interest is:",
        options: [
          "Built from direct exposure over a long time",
          "Mostly your own, with some borrowed reference points",
          "Largely inherited from people whose taste you follow",
          "Whatever is currently being praised in your feed",
        ],
      },
      {
        prompt:
          "When you make a big decision, the voice you're listening to is:",
        options: [
          "Clearly your own",
          "Yours, checked against a few trusted people",
          "A composite of advice you've absorbed from content",
          "Hard to locate - more like an average of opinions you've seen",
        ],
      },
      {
        prompt: "The way you talk about your own feelings uses:",
        options: [
          "Plain language that's always been yours",
          "Mostly your own words, some borrowed terms",
          "A fair amount of language from therapy content or online discourse",
          "Phrases you recognise from captions more than conversation",
        ],
      },
      {
        prompt:
          "If your favourite accounts disappeared tomorrow, your preferences would:",
        options: [
          "Barely change - they weren't the source",
          "Shift slightly in emphasis",
          "Feel unmoored for a while",
          "Change more than you'd like to admit",
        ],
      },
      {
        prompt: "When you achieve something, the first feeling is about:",
        options: [
          "How it feels internally, privately",
          "The internal feeling, then who to tell",
          "How it will look described to others",
          "How it will look, before it's even finished",
        ],
      },
      {
        prompt:
          "The last time you were genuinely proud of something, the pride was mostly about:",
        options: [
          "What it meant to you, privately",
          "What it meant to you, with a little thought to others",
          "How it would be received once shared",
          "How it would look before you'd even shared it",
        ],
      },
      {
        prompt: "Your style or appearance choices come mostly from:",
        options: [
          "What you've always gravitated toward",
          "A mix of your own instinct and outside reference",
          "Trends you've absorbed without fully choosing them",
          "Whatever is currently circulating in your feed",
        ],
      },
      {
        prompt: "When you disagree with a popular opinion, you:",
        options: [
          "Say so, without much hesitation",
          "Say so, but brace for pushback",
          "Often keep it to yourself",
          "Quietly wonder if you're the one who's wrong, by default",
        ],
      },
      {
        prompt:
          "If you had to describe your personality without referencing anything external, you would:",
        options: [
          "Do it easily, in plain terms",
          "Manage it, with a little effort",
          "Struggle to find language that isn't borrowed",
          "Find it genuinely difficult to locate anything that feels fully yours",
        ],
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
      var label = total + " / 52";
      var para;
      if (total <= 22) {
        para =
          "Mostly self-sourced. Your preferences and ambitions trace back to your own life more than to what you have absorbed.";
      } else if (total <= 32) {
        para =
          "A reasonable mix. Some of what you want and like has clearly been shaped by exposure - worth noticing which parts.";
      } else if (total <= 42) {
        para =
          "Substantially borrowed. A good portion of your taste and ambition may be tracing back to consumption rather than experience.";
      } else {
        para =
          "Heavily borrowed. Much of what feels like yours may be closer to absorbed material - worth sitting with which desires are actually load-bearing.";
      }
      resultName.textContent = label;
      resultPara.textContent = para;
    }

    nextBtn.addEventListener("click", onNext);
    renderQuestion();
  })();
