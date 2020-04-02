class Episodes {
    constructor(parent, title, aired, video_url) {
        this.title = title;
        this.aired = aired;
        this.video_url = video_url;
        this.parent = parent

    }
    render() {
        let tpl = `
        <li>${this.title} 
        <a 
        target="_blank"
        href="${this.video_url}">link</a>
        OnAir: ${this.aired}
        </li>
        `;
        document.getElementById(this.parent).innerHTML += tpl;
    }

}