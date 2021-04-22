function initVue() {
    new Vue({
        el: '#app',
        data: {
            'searchBar': '',
            'apiKey': '1d2078d15fa15a94192ff189b968ed1f',
            'films': [],
            'tvSeries': [],
            'actorName': [],
            'genresId': [],
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
            ],
            'activeUser': null,
            'dropDown': false,
            'contentSearch': false,
            'arrGenresMovie': [],
            'arrGenresSerieTv': [],
        },
        mounted() {
            // monto la funzione che mi riporta i film popolari e i generi
            this.famousMovie();
            axios
                .get('https://api.themoviedb.org/3/genre/movie/list', {
                    params: {
                        'api_key': this.apiKey,
                    }
                })
                .then(data => {
                    this.arrGenresMovie = data.data.genres;
                })
                .catch(error => {
                    console.log(error)
                })
            axios
                .get('https://api.themoviedb.org/3/genre/tv/list', {
                    params: {
                        'api_key': this.apiKey,
                    }
                })
                .then(data => {
                    this.arrGenresSerieTv = data.data.genres;
                })
                .catch(error => {
                    console.log(error)
                })
        },
        methods: {
            // funzione per prendere i film popolari con l'api sia film che serie tv
            famousMovie: function () {
                axios.get('https://api.themoviedb.org/3/movie/popular', {
                    params: {
                        'api_key': this.apiKey,
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
                        'api_key': this.apiKey,
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
            clickSearchBar: function () {
                // funzione che trova i film e le serie tv in base al nome scritto nella searchbar
                // condizione per far apparire questi film solo quando si scrive nella search bar
                if (!this.searchBar == '') {
                    axios
                        .get('https://api.themoviedb.org/3/search/movie', {
                            params: {
                                'api_key': this.apiKey,
                                'query': this.searchBar
                            }
                        })
                        .then(data => {
                            this.films = data.data.results;
                        })
                    axios
                        .get('https://api.themoviedb.org/3/search/tv', {
                            params: {
                                'api_key': this.apiKey,
                                'query': this.searchBar
                            }
                        })
                        .then(data => {
                            this.tvSeries = data.data.results;
                        })
                        .catch(error => {
                            console.log(error)
                        })
                } else {//altrimenti mi riporta i titoli più popolari
                    this.famousMovie();
                }

            },
            castVisible: function (idMovie) {
                // funzione per prendere cast e generi
                axios
                    .get('https://api.themoviedb.org/3/movie/' + idMovie, {
                        params: {
                            'api_key': this.apiKey,
                            'append_to_response': 'credits'
                        }
                    })
                    .then(data => {
                        this.actorName = data.data.credits.cast.splice(0, 5);//inserisco nell'array direttamente 5 elementi da api
                        this.genresName = data.data.genres;//inserisco nell'array direttamente 5 elementi da api
                    })
                axios
                    .get('https://api.themoviedb.org/3/tv/' + idMovie, {
                        params: {
                            'api_key': this.apiKey,
                            'append_to_response': 'credits'
                        }
                    })
                    .then(data => {
                        this.actorName = data.data.credits.cast.splice(0, 5);//inserisco nell'array direttamente 5 elementi da api
                        this.genresName = data.data.genres;//inserisco nell'array direttamente 5 elementi da api
                    })
                    .catch(error => {
                        console.log(error)
                    })
                this.displayAct = !this.displayAct; // nascondo e faccio apparire la chevron
                this.actorName.splice(0, 5); //ripulisco array attori al click
                this.genresName = []; // ripulisco array generi al click
            },
            cleanUp: function () {
                this.actorName.splice(0, 5); // ripulisco array uscendo da elemento li
                this.genresName = []; // ripulisco array uscendo da elemento li
                this.displayAct = false; //nascondo la chevron quando esco dal li
            },
            backHome: function () {
                // cliccando sulla cross ritorno la schermata principale e pulisco la search
                this.searchBar = '';
                this.contentSearch = false;
                this.famousMovie();
            },
            vote: function (val) {
                return Math.ceil(val / 2);
            },
            userOn: function (user) {
                // quando clicchi su user si entra nella schermata principale
                this.profile = !this.profile
                this.activeUser = user;
            },
            showSearchbar: function () {
                // rende visibile e invisibile la searchbar
                this.contentSearch = !this.contentSearch;
            },
            showDropdown: function () {
                // rende visibile e invisibile il dropdown con i vari user
                this.dropDown = !this.dropDown;
            },
            changeUser: function (user) {
                // prendo user attivo
                this.activeUser = user;
            },
        },
        computed: {
            filteredFilm: function () {
                // filtro i film per genere
                return this.films.filter(elem => {
                    return this.selectGenre ? elem.genre_ids.includes(parseInt(this.selectGenre)) : elem;
                });
           
            },
            filteredSerieTv: function () {
                // filtro le serie tv per genere
                return this.tvSeries.filter(elem => {
                    return this.selectGenre ? elem.genre_ids.includes(parseInt(this.selectGenre)) : elem;
                });
            },
            createAllGenres: function () {
                //  funzione con cui mi creo array generi totali
                const genres = [...this.arrGenresMovie];
                for(let i = 0; i < this.arrGenresSerieTv.length; i++){
                    let elem = this.arrGenresSerieTv[i];
                    // nella condizione diciamo che se non trova elementi con lo stesso id li pusha dentro array genres cosi non avrò doppioni di generi
                    // tra film e serie tv
                   if (!genres.find(item => item.id === elem.id) ) {
                       genres.push(elem);
                   }
                }
                return genres;
            },
            filteredGenre: function () {
                // funzione per filtrare array generi con i vari generi presenti in pagina
                const genresTot = [...this.films, ...this.tvSeries];

                // flatmap serve a mappare e crea a differenza del solo map un array schiacciato in un solo array anziche un array con dentro altri array
                const genresItemID = genresTot.flatMap(item => {
                    return item.genre_ids;
                });
                // filtro array di generi totali usando filter e li confronto con ogni singolo elemento id dell'array precedentemente mappato
                const genresActive = this.createAllGenres.filter(elem => {
                    return genresItemID.includes(elem.id);
                });

                // versione col mio ciclo annidato funziona ma è meno chiaro
                // for (let i = 0; i < genresTot.length; i++) {
                //     let elemI = genresTot[i];
                //     for (let x = 0; x < this.createAllGenres.length; x++) {
                //         let elemX = this.createAllGenres[x];
                //         if (parseInt(elemI.genre_ids) === parseInt(elemX.id) && !genresActive.includes(elemX)) {
                //             genresActive.push(elemX);
                           
                //         }
                //     }
                // }

                return genresActive;
            }
        },

    });
}

function init() {
    initVue();
}

document.addEventListener('DOMContentLoaded', init);