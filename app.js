/*jshint esversion: 6 */

const keyword = document.querySelector('#keyword');
const button = document.querySelector('#button');
const display = document.querySelector('.main_display');
const search_display = document.querySelector('.search_display');
const side_menu = document.querySelector('.side_menu');


// General function that will be used to request data
function onRequestData(url, listener){
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', listener);
    oReq.open('GET',url);
    oReq.setRequestHeader("Api-Key",API_KEY);
    oReq.send();
}

function register(search){
  const element = document.createElement("button");
  element.innerHTML = search;
  side_menu.appendChild(element);
  element.addEventListener("click",function(){
    search_display.innerHTML = "";
    onRequestData(`https://api.gettyimages.com/v3/search/images?phrase=${search}`, getImages);
  });
}

button.addEventListener("click",function(){
  search_display.innerHTML = "";
  onRequestData(`https://api.gettyimages.com/v3/search/images?phrase=${keyword.value}`, getImages);
  register(`${keyword.value}`);
});

function getImages() {
  const requestData = JSON.parse(this.responseText);
  const length = requestData.images.length;

  for (let i = 0; i < length; i++){
    const image = document.createElement("img");
    image.className = "image";
    image.setAttribute("src",requestData.images[i].display_sizes[0].uri);

    search_display.appendChild(image);
  }

}
