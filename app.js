const dropdowns = document.querySelectorAll("select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

const countryList = {
  USD: "US",
  INR: "IN",
  EUR: "EU",
  GBP: "GB",
  CAD: "CA",
  AUD: "AU",
  JPY: "JP",
  CNY: "CN",
  NZD: "NZ",
  SGD: "SG"
};

for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.text = currCode;
    select.appendChild(option);
  }
}

fromCurr.value = "USD";
toCurr.value = "INR";
updateFlag(fromCurr);
updateFlag(toCurr);

dropdowns.forEach((select) => {
  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
});

function updateFlag(element) {
  let countryCode = countryList[element.value];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

btn.addEventListener("click", async (e) => {
  e.preventDefault();
  let amount = document.querySelector(".amount input").value;
  if (!amount || amount <= 0) amount = 1;

  
  const apiKey = "633c70de1b00d753938c53af";
  const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurr.value}/${toCurr.value}/${amount}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.result === "error") {
      msg.innerText = "API Error: " + data["error-type"];
    } else {
      const rate = data.conversion_result.toFixed(2);
      msg.innerText = `${amount} ${fromCurr.value} = ${rate} ${toCurr.value}`;
    }
  } catch (error) {
    msg.innerText = "Failed to fetch exchange rate.";
  }
});
