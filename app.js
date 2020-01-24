const api = 'AIzaSyC98I8iv6hoNomR4JLqTmnWq0PiWVMLnRI';
const output = document.querySelector('.output');
const searchTerm = document.querySelector('input');
 
searchTerm.setAttribute('value', 'test');
 
const btnPrev = document.createElement('button');
btnPrev.setAttribute('disabled',true);
btnPrev.textContent = 'Prev';
document.body.appendChild(btnPrev);
const btnNext = document.createElement('button');
btnNext.setAttribute('disabled',true);
btnNext.textContent = 'Next';
document.body.appendChild(btnNext);
const btns = document.querySelectorAll('button');
btns.forEach(function(btn){
    btn.addEventListener('click', ySearch);
})
 
function ySearch(e) {
    let search = searchTerm.value;
    console.log(e.target.token);
    search = encodeURIComponent(search);
    let url = 'https://www.googleapis.com/youtube/v3/search/?part=snippet&key=' + api + '&q=' + search + '&maxResults=4';
    if(e.target.token) {
        url += '&pageToken='+e.target.token;
    }
    //output.textContent = url;
    fetch(url).then(function (rep) {
        return rep.json()
    }).then(function (data) {
        if(data.prevPageToken){
            btnPrev.token = data.prevPageToken;
            btnPrev.disabled = false;
        }else{
            btnPrev.token = false;
            btnPrev.disabled = true;
        }
        if(data.nextPageToken){
            btnNext.token = data.nextPageToken;
            btnNext.disabled = false;
        }else{
            btnNext.token = false;
            btnNext.disabled = true;
        }
        return data.items.map(function (x) {
            return {
                title: x.snippet.title
                , des: x.snippet.description
                , img: x.snippet.thumbnails.default.url
                , id: x.id.videoId
                , x: x
            }
        })
    }).then(function (arr) {
        show(arr);
    }).catch(function (error) {
        console.log(error);
    })
}
 
function show(data) {
    console.log(data);
    console.log(data.length);
    output.innerHTML = '';
    data.forEach(function (video) {
        console.log(video);
        let div = document.createElement('div');
        div.classList.add('box');
        let temp = document.createTextNode(video.des);
        let span = document.createElement('span');
        span.innerHTML = '<a href="http://www.youtube.com/watch?v=' + video.id + '" target="_blank">' + video.title + '</a>';
        div.appendChild(span);
        div.appendChild(temp);
        output.appendChild(div);
    })
}