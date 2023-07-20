const API_URL = "https://www.cbr-xml-daily.ru/daily_json.js" //API с валютами
const Curr_Selector = document.getElementById("Curr_Selector") //Форма для выбора валют
const resultTitle = document.getElementById("resultTitle")
const resultValue = document.getElementById("resultValue")
const resultPrevValue = document.getElementById("resultPrevValue")

async function fetchCurrency(){ //Функция парсинга валют
    try {
    data = await fetch(API_URL)
    data = await data.json()

    Curr_Selector.innerHTML = "" //Очищаем от предыдущих значений

    const selectedOption = document.createElement("option")
    selectedOption.text = "Выберете валюту"
    Curr_Selector.appendChild(selectedOption)
    for (const currency in data.Valute){
        const {ID,Name} = data.Valute[currency]
        const option = document.createElement("option")


        option.text = ID + " - " +  Name
        option.value = data.Valute[currency].CharCode
        Curr_Selector.appendChild(option)
    }
} catch (error) {
    console.log("Произошла ошибка:", error);
  }
}

Curr_Selector.addEventListener("change", function() { //Обработчик выбора валюты
    const selectedCurrency = data.Valute[Curr_Selector.value]

    date = new Date(data.Date)
    prevDate = new Date(data.PreviousDate)
    if(selectedCurrency){
        const {ID,Name, CharCode,  Previous,Value} = selectedCurrency
        resultTitle.innerHTML = ID + " - " + Name + " (" + CharCode + ") "
        resultValue.innerHTML = date.getDate() + "/"+ date.getMonth() + "/" + date.getFullYear() + ", " + date.getHours() + ":"+ date.getMinutes() + ":" + date.getSeconds() + " - "+ Value;
        resultPrevValue.innerHTML = prevDate.getDate() + "/"+ prevDate.getMonth() + "/" + prevDate.getFullYear() + ", " + prevDate.getHours() + ":"+ prevDate.getMinutes() + ":" + prevDate.getSeconds() + " - "+ Value; + " - " + Previous
    }
    
  });
fetchCurrency() //Запуск функции парсинга валют