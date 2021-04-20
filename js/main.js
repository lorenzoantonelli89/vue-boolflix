function initVue() {
    new Vue({
        el: '#app',
        data: {
            'searchBar': '',
            'films': [],
            'tvSeries': [],
            'actorArray': [],
            'actorName': [],
            'genresArray': [],
            'genresName': [],
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
            this.famousMovie();
        },
        methods: {
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
                if (this.searchBar) {
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
                }else{
                    this.famousMovie();
                }
                
            },
            castVisible: function (idMovie) {
                axios
                    .get('https://api.themoviedb.org/3/movie/' + idMovie , {
                        params: {
                            'api_key': '1d2078d15fa15a94192ff189b968ed1f',
                            'append_to_response': 'credits'
                        }
                    })
                    .then(data => {
                        this.actorArray = data.data.credits.cast;
                        for (let i = 0; i < 5; i++) {
                            if (!this.actorArray.includes(this.actorArray[i].name)) {
                                this.actorName.push(this.actorArray[i].name)
                            }
                        }

                        this.genresArray = data.data.genres;
                        console.log(this.genresArray);
                        for (let i = 0; i < this.genresArray.length; i++) {
                            if (!this.genresArray.includes(this.genresArray[i].name)) {
                                this.genresName.push(this.genresArray[i].name)
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    this.displayAct = !this.displayAct;
                    this.actorName.splice(0, 5);
                    this.genresName.splice(0, 5);
            },
            cleanUp: function () {
                this.actorName.splice(0, 5);
                this.genresName.splice(0, 5);
                this.displayAct = false;
            },
            backHome: function () {
                this.searchBar = '';
                this.famousMovie();
            },
            flag: function (language) {
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
                this.profile = !this.profile
            }
           
        },
        
    });
}

function init() {
    initVue();
}

document.addEventListener('DOMContentLoaded', init);