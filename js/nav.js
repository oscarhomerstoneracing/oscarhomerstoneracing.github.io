document.addEventListener('DOMContentLoaded',function(){
  var btn=document.querySelector('.menu-toggle');
  var links=document.querySelector('nav.links');
  if(!btn||!links)return;
  btn.addEventListener('click',function(){
    links.classList.toggle('open');
  });
});
