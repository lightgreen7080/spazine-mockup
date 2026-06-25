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
const facilityPick = document.querySelector("#facilityPick");
const bathPick = document.querySelector("#bathPick");
const methodPick = document.querySelector("#methodPick");
const ageInput = document.querySelector("#ageInput");
const genderInput = document.querySelector("#genderInput");
const vibeInput = document.querySelector("#vibeInput");
const characterImage = document.querySelector("#characterImage");
const characterName = document.querySelector("#characterName");
const characterLine = document.querySelector("#characterLine");
const exampleChips = document.querySelectorAll(".example-chip");

const characters = {
  guide: {
    name: "湯乃しずく",
    image: "assets/characters/guide.jpg",
    tone: "やさしく寄り添う温浴コンシェルジュ",
    opener: "大丈夫です。今日の疲れ、ちゃんと湯に預けられます。"
  },
  coach: {
    name: "サウナ隊長アツシ",
    image: "assets/characters/coach.jpg",
    tone: "元気に背中を押すサウナコーチ",
    opener: "任せてください。今日のモヤモヤ、汗と一緒に提出しましょう。"
  },
  master: {
    name: "湯守のおやっさん",
    image: "assets/characters/master.jpg",
    tone: "面白く言い切る町の湯守",
    opener: "ふむ、これは湯案件ですな。肩まで浸かればだいたい話は早い。"
  },
  neutral: {
    name: "湯守ナビ",
    image: "assets/characters/neutral.jpg",
    tone: "ほどよい距離感のウェルネス案内役",
    opener: "では、今の状態を軽く読みます。無理に整えず、湯で調律しましょう。"
  }
};

const moodRules = [
  {
    mood: "sauna",
    words: ["サウナ", "整", "汗", "熱", "水風呂", "外気浴", "リセット", "モヤモヤ"],
    fortune: "本日のあなたは、心の中に小さな会議室があり、全員が同時にしゃべっています。汗で議事録を流しましょう。",
    facility: "蒸ノ杜サウナ",
    bath: "高温サウナからの水風呂、最後に外気浴",
    method: "8分サウナ、30秒水風呂、外気浴で『もう知らん』を3セット"
  },
  {
    mood: "family",
    words: ["家族", "子ども", "子供", "親子", "みんな", "食事", "ゆっくり", "機嫌"],
    fortune: "本日のあなたは、全員の機嫌を守る現場監督です。湯上がりの食事処まで含めて勝ち筋を作りましょう。",
    facility: "湯けむり小路",
    bath: "広めの内湯と、子どもが飽きにくい変わり湯",
    method: "先に軽く入浴、食事で休戦、最後にもう一度湯。帰り道の平和まで設計"
  },
  {
    mood: "near",
    words: ["近", "さっと", "仕事帰り", "帰り", "短時間", "駅", "今すぐ", "手軽", "通知"],
    fortune: "本日のあなたは、スマホより先に自分を充電すべき状態です。遠征は不要、近場で現実を一回ミュートしましょう。",
    facility: "駅前湯処 あかり",
    bath: "熱すぎない主浴槽と、仕上げのぬる湯",
    method: "洗う、浸かる、ぼーっとする。滞在45分で『今日はここまで』を宣言"
  },
  {
    mood: "trip",
    words: ["遠出", "景色", "休日", "旅", "ドライブ", "自然", "山", "のんびり", "再起動"],
    fortune: "本日のあなたは、日常のタブを開きすぎています。景色のいい湯で、心のブラウザを再起動しましょう。",
    facility: "里山温泉 風待ち",
    bath: "景色が見える露天風呂",
    method: "到着したら急がず一服。露天で空を見る時間を長めに取り、帰りに甘いもの"
  },
  {
    mood: "solo",
    words: ["ひとり", "一人", "静か", "疲れ", "落ち着", "休み", "癒", "ぼーっと", "頭"],
    fortune: "本日のあなたは、脳内に未読メールが住み着いています。静かな湯で、通知音のしない自分に戻りましょう。",
    facility: "森ノ湯テラス",
    bath: "露天風呂と休憩スペース",
    method: "最初の10分は何もしない。考えごとは湯気に預け、上がったら水分補給して勝利"
  }
];

const defaultPrescription = {
  fortune: "まずは今の悩みや気分を入れてください。スパ人が、あなたの状態を勝手に深読みして湯の処方を出します。",
  facility: "入力待ち",
  bath: "入力待ち",
  method: "入力待ち"
};

function chooseCharacter(mood = "reset") {
  const age = ageInput.value;
  const gender = genderInput.value;
  const vibe = vibeInput.value;

  if (vibe === "calm") return characters.guide;
  if (vibe === "funny") return characters.master;
  if (vibe === "coach") return characters.coach;
  if (vibe === "stylish") return characters.neutral;
  if (mood === "sauna" || mood === "near") return characters.coach;
  if (age === "50s" || mood === "family") return characters.master;
  if (gender === "female" && (age === "20s" || age === "30s")) return characters.guide;
  if (gender === "male" && age === "20s") return characters.coach;
  return characters.neutral;
}

function renderCharacter(character, prescription) {
  characterImage.src = character.image;
  characterImage.alt = `${character.name}のキャラクター画像`;
  characterName.textContent = `${character.name} / ${character.tone}`;
  if (prescription.facility === "入力待ち") {
    characterLine.textContent = character.opener;
    return;
  }
  characterLine.textContent = `「${prescription.facility}」がよさそうです。お風呂は${prescription.bath}。入り方は、${prescription.method}。`;
}

function renderFacilities(mood = "reset", prescription = defaultPrescription) {
  const filtered = facilities.filter((facility) => facility.moods.includes(mood)).slice(0, 3);
  const character = chooseCharacter(mood);
  statusText.textContent = `${filtered.length}件を処方中`;
  fortuneText.textContent = prescription.fortune;
  facilityPick.textContent = prescription.facility;
  bathPick.textContent = prescription.bath;
  methodPick.textContent = prescription.method;
  renderCharacter(character, prescription);
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
      ...defaultPrescription
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
      fortune: "本日のあなたは、まだ悩みの名前が決まっていないタイプです。こういう日は直感が一番えらいので、気になった湯を試しましょう。",
      facility: "森ノ湯テラス、または最初に目が合った施設",
      bath: "露天風呂か、いちばん空いているお風呂",
      method: "難しく考えず、まず肩まで浸かる。答えは湯上がりの顔色が知っています"
    };
  }

  return scored[0];
}

function castFortune() {
  const reading = readMood(moodInput.value);
  renderFacilities(reading.mood, reading);
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

[ageInput, genderInput, vibeInput].forEach((input) => {
  input.addEventListener("change", castFortune);
});

renderFacilities();
