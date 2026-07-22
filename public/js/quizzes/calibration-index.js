(function () {
    var questions = [
      {
        prompt: "When you wake up, the first thing you reach for is:",
        options: [
          "Nothing - you lie still for a while",
          "A book or something physical",
          "Your phone, after a few minutes",
          "Your phone, before you've fully woken up",
        ],
      },
      {
        prompt:
          "A quiet evening with no plans, no screens, and no one around feels:",
        options: [
          "Restorative - something you'd choose",
          "Fine, if it happens",
          "Slightly uncomfortable - you'd reach for something eventually",
          "Like something to escape from",
        ],
      },
      {
        prompt: "When you try to read something long-form, your attention:",
        options: [
          "Holds for the full piece without much effort",
          "Holds mostly, with occasional drifting",
          "Fragments regularly - you reread paragraphs often",
          "Rarely makes it through without opening something else",
        ],
      },
      {
        prompt: "How often do you check your phone without a specific reason?",
        options: [
          "Rarely - usually with intent",
          "A few times a day, out of habit",
          "Frequently - it's become automatic",
          "Constantly - it's closer to a reflex than a choice",
        ],
      },
      {
        prompt: "When you sit somewhere quiet and do nothing, the feeling is:",
        options: [
          "Comfortable - almost immediately",
          "Fine after a minute or two",
          "Restless - there's a pull toward doing something",
          "Actively uncomfortable - you rarely let it go on long",
        ],
      },
      {
        prompt:
          "Your focus during a single task (writing, reading, working) is:",
        options: [
          "Sustained - you finish things before switching",
          "Mostly sustained, with occasional interruptions",
          "Frequently interrupted, often by yourself",
          "Rarely sustained - you're usually running several things",
        ],
      },
      {
        prompt: "After a long session on your phone or social media, you feel:",
        options: [
          "The same as before - it doesn't affect you much",
          "Slightly flat, but it passes quickly",
          "Noticeably flat or restless",
          "Drained - and still reaching for more anyway",
        ],
      },
      {
        prompt:
          "The last time you spent several hours away from all screens, it felt:",
        options: [
          "Natural - you didn't think about it",
          "Fine, though you noticed the absence",
          "Difficult - you were aware of it the whole time",
          "Like something you actively avoid",
        ],
      },
      {
        prompt: "When a conversation gets complex or slow, you:",
        options: [
          "Stay with it - the pace doesn't bother you",
          "Stay with it, though you notice some impatience",
          "Find yourself mentally reaching for something else",
          "Regularly check your phone or look for an exit",
        ],
      },
      {
        prompt:
          "The speed at which you consume content - articles, videos, posts - has:",
        options: [
          "Stayed roughly the same over the past few years",
          "Increased a little",
          "Increased noticeably",
          "Accelerated to the point where slower content feels unwatchable",
        ],
      },
      {
        prompt: "When you have a problem to think through, your first move is:",
        options: [
          "To sit with it - let your own mind work on it",
          "To think about it first, then search if needed",
          "To search immediately",
          "To ask an AI or look for the answer before you've really tried",
        ],
      },
      {
        prompt: "Your experience of boredom:",
        options: [
          "Is occasional and tolerable",
          "Comes more often than it used to, but you can sit with it",
          "Arrives quickly and feels urgent to resolve",
          "Is something you've almost entirely engineered out of your life",
        ],
      },
      {
        prompt:
          "If someone asked you to describe your current inner life - your actual thoughts, not your opinions on things - you would:",
        options: [
          "Find it easy - you have a clear sense of it",
          "Manage it, with some effort",
          "Struggle - it's harder to access than it used to be",
          "Not know where to start - it feels distant or obscured",
        ],
      },
    ];
    var tiers = [
      {
        min: 13,
        max: 22,
        name: "Recalibrated",
        paragraph:
          "Your baseline is closer to its original frequency than most. The network hasn't significantly altered your relationship with stillness, attention, or your own signal. This is worth protecting - not through rigidity, but through continued awareness of what preserves it.",
      },
      {
        min: 23,
        max: 32,
        name: "Drifting",
        paragraph:
          "Your baseline has shifted, but not so far that the original signal is hard to locate. You can still access stillness and sustained attention - they just require more deliberate effort than they once did. The drift is reversible at this stage without significant disruption.",
      },
      {
        min: 33,
        max: 42,
        name: "Saturated",
        paragraph:
          "Your nervous system is running significantly above its natural frequency. Ordinary unmediated experience - silence, slow conversation, a task without switching - now registers as flat or uncomfortable. Recalibration is possible but will feel counterintuitive before it feels natural.",
      },
      {
        min: 43,
        max: 52,
        name: "Deep Saturation",
        paragraph:
          "Your baseline has shifted far enough that the original signal is genuinely difficult to locate. The quiet doesn't feel like relief - it feels like deprivation. This is the most common result, and it is not permanent. But recalibration at this level requires sustained, deliberate input reduction - not a weekend offline, but a gradual, consistent lowering of the stimulus floor.",
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
