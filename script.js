const facilities = [
  {
    name: "森ノ湯テラス",
    area: "愛知県名古屋市",
    type: "日帰り温泉",
    copy: "緑に囲まれた露天風呂と広い休憩スペース。静かに過ごしたい日に選びやすい一軒です。",
    tags: ["露天風呂", "サウナ", "ひとり時間", "駐車場あり"],
    moods: ["solo", "sauna", "near", "reset"]
  },
  {
    name: "湯けむり小路",
    area: "愛知県長久手市",
    type: "スーパー銭湯",
    copy: "食事処とキッズスペースを備えた、家族のお出かけに向いた温浴施設です。",
    tags: ["家族向け", "食事処", "駐車場あり", "子連れOK"],
    moods: ["family", "near", "reset"]
  },
  {
    name: "蒸ノ杜サウナ",
    area: "岐阜県多治見市",
    type: "サウナ",
    copy: "高温サウナと外気浴スペースが魅力。短時間でも気分を切り替えたい日に。",
    tags: ["サウナ", "外気浴", "仕事帰り", "深夜営業"],
    moods: ["sauna", "solo", "reset"]
  },
  {
    name: "里山温泉 風待ち",
    area: "三重県菰野町",
    type: "温泉",
    copy: "少し足を伸ばして訪れたい、山あいの静かな温泉。休日の小旅行に合います。",
    tags: ["遠出", "源泉かけ流し", "露天風呂", "景色"],
    moods: ["trip", "solo", "reset"]
  },
  {
    name: "駅前湯処 あかり",
    area: "愛知県豊田市",
    type: "銭湯",
    copy: "駅から近く、帰宅前にさっと立ち寄れる街なかの湯処です。",
    tags: ["駅近", "近場", "仕事帰り", "短時間"],
    moods: ["near", "reset"]
  }
];

const results = document.querySelector("#results");
const statusText = document.querySelector("#finderStatus");
const moodInput = document.querySelector("#moodInput");
const oracleButton = document.querySelector("#oracleButton");
const fortuneText = document.querySelector("#fortuneText");
const exampleChips = document.querySelectorAll(".example-chip");

const moodRules = [
  {
    mood: "sauna",
    words: ["サウナ", "整", "汗", "熱", "水風呂", "外気浴", "リセット"],
    fortune: "今日は体の奥にこもった熱を出す日。サウナと外気浴で、頭の中まで軽くなる一湯が合いそうです。"
  },
  {
    mood: "family",
    words: ["家族", "子ども", "子供", "親子", "みんな", "食事", "ゆっくり"],
    fortune: "今日は誰かと過ごす時間が運気を整える日。食事や休憩も含めて、長めに滞在できる一湯が合いそうです。"
  },
  {
    mood: "near",
    words: ["近", "さっと", "仕事帰り", "帰り", "短時間", "駅", "今すぐ", "手軽"],
    fortune: "今日は遠くまで頑張らない日。近場でさっと湯に入って、帰り道の足取りを軽くする一湯が合いそうです。"
  },
  {
    mood: "trip",
    words: ["遠出", "景色", "休日", "旅", "ドライブ", "自然", "山", "のんびり"],
    fortune: "今日は少しだけ日常の外へ出る日。景色や道中まで楽しめる、記憶に残る一湯が合いそうです。"
  },
  {
    mood: "solo",
    words: ["ひとり", "一人", "静か", "疲れ", "落ち着", "休み", "癒", "ぼーっと"],
    fortune: "今日は静けさが味方になる日。ひとりで余白を取り戻せる、落ち着いた一湯が合いそうです。"
  }
];

function renderFacilities(mood = "reset", fortune = "まずは今の気分を入れてください。言葉の温度に合わせて、スパ人が一湯を選びます。") {
  const filtered = facilities.filter((facility) => facility.moods.includes(mood)).slice(0, 3);
  statusText.textContent = `${filtered.length}件をおすすめ中`;
  fortuneText.textContent = fortune;
  results.innerHTML = filtered
    .map((facility) => {
      const tags = facility.tags.map((tag) => `<span>${tag}</span>`).join("");
      return `
        <article class="facility-card">
          <div>
            <h3>${facility.name}</h3>
            <p>${facility.area} / ${facility.type}</p>
            <p>${facility.copy}</p>
            <div class="meta-line">${tags}</div>
          </div>
          <div class="card-actions">
            <button type="button" aria-label="${facility.name}をいきたい湯に登録">♡ 登録</button>
            <a href="#detail-title">詳細</a>
          </div>
        </article>
      `;
    })
    .join("");
}

function readMood(text) {
  const normalized = text.trim();
  if (!normalized) {
    return {
      mood: "reset",
      fortune: "まずは今の気分を入れてください。言葉の温度に合わせて、スパ人が一湯を選びます。"
    };
  }

  const scored = moodRules.map((rule) => ({
    ...rule,
    score: rule.words.reduce((total, word) => total + (normalized.includes(word) ? 1 : 0), 0)
  }));
  scored.sort((a, b) => b.score - a.score);

  if (scored[0].score === 0) {
    return {
      mood: "reset",
      fortune: "今日はまだ気分が輪郭を探している日。まずは選びやすい三つの一湯から、直感に近い場所を眺めてみてください。"
    };
  }

  return scored[0];
}

function castFortune() {
  const reading = readMood(moodInput.value);
  renderFacilities(reading.mood, reading.fortune);
}

window.castFortune = castFortune;
oracleButton.addEventListener("click", castFortune);

moodInput.addEventListener("input", () => {
  if (moodInput.value.trim().length >= 4) {
    castFortune();
  }
});

moodInput.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    castFortune();
  }
});

exampleChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    moodInput.value = chip.dataset.example;
    castFortune();
  });
});

renderFacilities();
