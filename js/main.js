function initVue() {
    new Vue({
        el: '#app',
        data: {
            'searchBar': '',
            'films': [],
            'tvSeries': [],
            'actorName': [],
            'genresName': [],
            'selectGenre': '',
            'profile': false,
            'displayAct': false,
            'users': [
                {
                    img: 'img/goblin.png',
                    userName: 'Jumbotron',
                },
                {
                    img: 'img/among.png',
                    userName: 'Gioele',
                },
                {
                    img: 'img/android.png',
                    userName: 'Martino',
                },
                {
                    img: 'img/cyberpunk.png',
                    userName: 'Alessandro',
                },
                {
                    img: 'img/nuclear.png',
                    userName: 'Together',
                },
            ]
        },
        mounted() {
            // monto la funzione che mi riporta i film popolari
            this.famousMovie();
        },
        methods: {
            // funzione per prendere i film popolari con l'api sia film che serie tv
            famousMovie: function (params) {
                axios.get('https://api.themoviedb.org/3/movie/popular', {
                    params: {
                        'api_key': '1d2078d15fa15a94192ff189b968ed1f',
                        'page': '1'
                    }
                })
                    .then(data => {
                        this.films = data.data.results;
                    })
                    .catch(error => {
                        console.log(error)
                    })
                axios.get('https://api.themoviedb.org/3/tv/popular', {
                    params: {
                        'api_key': '1d2078d15fa15a94192ff189b968ed1f',
                        'page': '1'
                    }
                })
                    .then(data => {
                        this.tvSeries = data.data.results;
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },
            clickSearchBar: function() {
                // funzione che trova i film e le serie tv in base al nome scritto nella searchbar
                // condizione per far apparire questi film solo quando si scrive nella search bar
                if (!this.searchBar == '') {
                    axios
                        .get('https://api.themoviedb.org/3/search/movie', {
                            params: {
                                'api_key': '1d2078d15fa15a94192ff189b968ed1f',
                                'query': this.searchBar
                            }
                        })
                        .then(data => {
                            this.films = data.data.results;
                        })
                    axios
                        .get('https://api.themoviedb.org/3/search/tv', {
                            params: {
                                'api_key': '1d2078d15fa15a94192ff189b968ed1f',
                                'query': this.searchBar
                            }
                        })
                        .then(data => {
                            this.tvSeries = data.data.results;
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }else{//altrimenti mi riporta i titoli più popolari
                    this.famousMovie();
                }
                
            },
            castVisible: function (idMovie) {
                // funzione per prendere cast e generi
                axios
                    .get('https://api.themoviedb.org/3/movie/' + idMovie , {
                        params: {
                            'api_key': '1d2078d15fa15a94192ff189b968ed1f',
                            'append_to_response': 'credits'
                        }
                    })
                    .then(data => {
                        this.actorName = data.data.credits.cast.splice(0, 5);//inserisco nell'array direttamente 5 elementi da api
                        this.genresName = data.data.genres.splice(0, 5);//inserisco nell'array direttamente 5 elementi da api
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    this.displayAct = !this.displayAct; // nascondo e faccio apparire la chevron
                    this.actorName.splice(0, 5); //ripulisco array attori al click
                    this.genresName.splice(0, 5); // ripulisco array generi al click
            },
            cleanUp: function () {
                this.actorName.splice(0, 5); // ripulisco array uscendo da elemento li
                this.genresName.splice(0, 5); // ripulisco array uscendo da elemento li
                this.displayAct = false; //nascondo la chevron quando esco dal li
            },
            backHome: function () {
                // cliccando sulla cross ritorno la schermata principale e pulisco la search
                this.searchBar = '';
                this.famousMovie();
            },
            flag: function (language) {
                // metto img bandierine in base alla lingua 
                if (language == 'en') {
                    return '<strong>Language:</strong>' + '<img src="img/flag-en.png" alt="bandiera-inglese">';
                }else if (language == 'it'){
                    return '<strong>Language:</strong>' + '<img src="img/flag-it.png" alt="bandiera-inglese">';
                }else{
                    return '<strong>Language:</strong>' + '<h3>' + language +'</h3>';
                }
            },
            vote: function (val) {
                return Math.ceil(val / 2);
            },
            userOn: function () {
                // quando clicchi su user si entra nella schermata principale
                this.profile = !this.profile
            }
           
        },
        // computed: {
        //     filteredFilm: function () {
        //         return this.films.filter(elem => {
        //             return elem.genre_ids.includes(this.selectGenre);
        //         });
        //     },

        // },
        
    });
}

function init() {
    initVue();
}

document.addEventListener('DOMContentLoaded', init);