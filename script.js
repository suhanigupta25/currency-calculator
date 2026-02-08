const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns=document.querySelectorAll(".dropdown select");
 const btn=document.querySelector("button");
 const fromCurrency=document.getElementById("from-currency");
 const toCurrency=document.getElementById("to-currency");
 const amount=document.getElementById("amount");
 const msg=document.getElementById("msg");

for(let select of dropdowns){
    for(currcode in countryList){
        let newOption=document.createElement("option");       
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.id=="from-currency" && currcode=="USD"){
            newOption.selected=true;
        }
        else if(select.id=="to-currency" && currcode=="INR"){
                newOption.selected=true;
            }
        select.append(newOption);
    }
    select.addEventListener("change",(e)=>{
        updateFlag(e.target);
    });
}
const updateFlag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
};
//problem region
const updateExchangeRate = async () => {
  let amount = document.getElementById("amount");
  let amtVal = amount.value;
  const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}`;
};

btn.addEventListener("click",async (e) => {
    e.preventDefault();
    await updateExchangeRate();
});