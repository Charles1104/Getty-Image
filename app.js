/*jshint esversion: 6 */

const keyword = document.querySelector('#keyword');
const button = document.querySelector('#button');
const display = document.querySelector('.search_display');


// General function that will be used to request data
function onRequestData(url, listener){
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', listener);
    oReq.open('GET',url);
    oReq.setRequestHeader("Api-Key",API_KEY);
    oReq.send();
}

button.addEventListener("click",function(){
  display.innerHTML = "";
  onRequestData(`https://api.gettyimages.com/v3/search/images?phrase=${keyword.value}`, getImage);
});

function getImage() {
  const requestData = JSON.parse(this.responseText);
  console.log(requestData.images[0].display_sizes[0].uri);
  const keyword_header = document.createElement("h2");
  keyword_header.innerHTML = `${keyword.value}`;
  display.appendChild(keyword_header);

  const image = document.createElement("img");
  image.className = "image";
  image.setAttribute("src",requestData.images[0].display_sizes[0].uri);

  display.appendChild(image);

}
