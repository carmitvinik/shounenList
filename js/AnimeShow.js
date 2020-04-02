class AnimeShow {
    constructor(parent, image_url, title, synopsis, episodes, mal_id = 1) {
        this.parent = parent;
        this.image_url = image_url;
        this.name = title;
        this.desc = synopsis;
        this.episodes = episodes;
        this.mal_id = mal_id;
    }

    render() {
        let tpl = `
        <div class="col-lg-4 text-center p-3 myitem">
        <div class="h4">${this.name}</div>
        <img class="rounded w-75"
            src="${this.image_url}"
            alt="Anime Image">
        <p>
            <p title="Click for Details" class="showEp" onclick="showEpisodes();updateAnimeInfo('${this.name}','${this.image_url}',${this.mal_id})">
                Episodes: ${this.episodes}
            </p>
            <p>synopsis</p>
            <p class="overflow-auto desc rounded">${this.desc}</p>
        </p>
        </div>`;

        document.getElementById(this.parent).innerHTML += tpl;
    }

}
