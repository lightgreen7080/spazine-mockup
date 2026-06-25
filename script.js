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
const choices = document.querySelectorAll(".choice");

function renderFacilities(mood = "reset") {
  const filtered = facilities.filter((facility) => facility.moods.includes(mood)).slice(0, 3);
  statusText.textContent = `${filtered.length}件をおすすめ中`;
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

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    choices.forEach((item) => item.classList.remove("is-active"));
    choice.classList.add("is-active");
    renderFacilities(choice.dataset.mood);
  });
});

renderFacilities();
