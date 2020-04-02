const hideById = (id) => document.getElementById(id).classList.add("d-none");
const showById = (id) => document.getElementById(id).classList.remove("d-none");

const updateEpisode = (id) => { }
const urlquery = "https://api.jikan.moe/v3/search/anime?genre=27";
var _animeList = [];
var _lastPage = 39;
var _currentEpPage = 1;
var _lastEpisodePage;
var _epList = [];

/* 50 per page //there is bug in genre that is not gives the correct last page which supposed to be 39
   lastPage = _animeList.last_page;
          but there was a bug that i mensioned here: 
          https://github.com/jikan-me/jikan/issues/273

          so i asigned _lastPage Manually
*/

const applyPages = () => {
    console.log("applyPages");
    let el = document.getElementById("animePage");
    el.innerHTML = "";
    el.addEventListener("change", () => getData("" + el.value))
    for (let i = 1; i <= _lastPage; i++) {
        let _option_el = document.createElement("option");
        _option_el.value = i;
        _option_el.innerText = i;
        el.append(_option_el);
    }
}

var _currentPage = 1;

window.onload = () => {
    getData();
    applyPages();

}

const getData = async (pagenum = 1) => {

    try {
        /*        
        for (let i = 1; i <= _lastPage; i++) {
            setTimeout(async () => {
                let animeList = await fetch(`${urlquery}&page=${i}`);
                animeList = await animeList.json();
                animeList = await animeList.results;
                _animeList = await _animeList.concat([...animeList]);
                console.log("download Database please wait" + i);
                console.log(_animeList);
            }, 2000 * i);
        }*/
        let animeList = await fetch(`${urlquery}&page=${pagenum}`);
        animeList = await animeList.json();
        animeList = await animeList.results;
        console.log(animeList);
        _animeList = animeList;
        renderAll();
    }
    catch (e) {
        console.log(e);
    }
}

const renderAll = () => {
    let parentID = "anime_container";
    document.getElementById(parentID).innerHTML = "";
    document.getElementById(parentID).scrollTop = 0;
    for (let i in _animeList) {
        let { mal_id, image_url, title, synopsis, episodes } = _animeList[i];
        let anime_obj = new AnimeShow(parentID, image_url, title, synopsis, episodes, mal_id);
        anime_obj.render();
    }
}

const showEpisodes = () => {
    showById("id_episodes");




}

const updateAnimeInfo = async (n, pic, mid, page = 1) => {
    let el_title = document.querySelector("#id_episodes h2");
    let el_img = document.querySelector("#id_episodes img");
    let el_episodes = document.getElementById("id_episodes");
    el_title.innerText = n;
    el_img.src = pic;

    let url = "https://api.jikan.moe/v3/anime/" + mid + "/episodes/" + page;

    let ep_arr = await fetch(url);
    ep_arr = await ep_arr.json();
    _lastEpisodePage = ep_arr.episodes_last_page;
    updatePageAmt("episodePage", _lastEpisodePage);

    ep_arr = ep_arr.episodes;
    _epList = [...ep_arr];
    renderAllEpisodes();
    console.log(ep_arr);




}

updatePageAmt = (id, amt) => {
    el = document.getElementById(id);
    el.innerHTML = "";
    for (i = 1; i <= amt; i++) {
        let _option_el = document.createElement("option");
        _option_el.value = i;
        _option_el.innerText = i;
        el.append(_option_el);
    }
}

updatelistEpisode = async (page, mid) => {
    let url = "https://api.jikan.moe/v3/anime/" + mid + "/episodes/" + page;
    let ep_arr = await fetch(url);
    ep_arr = await ep_arr.json();
    ep_arr = await ep_arr.episodes;

    _epList = ep_arr;



}

const renderAllEpisodes = () => {
    let parentID = "id_list_episodes";
    document.getElementById(parentID).innerHTML = "";
    document.getElementById(parentID).scrollTop = 0;
    for (let i in _epList) {
        let { title, aired, video_url } = _epList[i];
        let episode = new Episodes(parentID, title, aired, video_url);
        episode.render();
    }
}