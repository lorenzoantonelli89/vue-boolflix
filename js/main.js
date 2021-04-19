function initVue() {
    new Vue({
        el: '#app',
        data: {
            'searchBar': '',
            'films': [],
            'tvSeries': [],
        },
        // mounted() {
        //     import axios from 'axios';
        //     const films = 'https://api.themoviedb.org/3/search/movie?api_key=1d2078d15fa15a94192ff189b968ed1f&query=suburra';
        //     const tvSeries = 'https://api.themoviedb.org/3/search/tv?api_key=1d2078d15fa15a94192ff189b968ed1f&language=it_IT&query=suburra';
        //     const requestFilm = axios.get(films);
        //     const requestTvSeries = axios.get(tvSeries);
        //     axios.all([requestFilm, requestTvSeries]).then(data => {
        //         this.films = data.data.results;
        //     })
        //         .catch(error => {
        //             console.err(error)
        //         })
        // },
        methods: {
            clickSearchBar: function() {
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
                        console.log(this.tvSeries);
                    })
                    .catch(error => {
                        console.err(error)
                    })
            },
            flag: function (language) {
                if (language == 'en') {
                    return '<img src="img/flag-en.png" alt="bandiera-inglese">';
                }else if (language == 'it'){
                    return '<img src="img/flag-it.png" alt="bandiera-inglese">';
                }else{
                   return '<h3>' + language +'</h3>';
                }
            },
            vote: function (val) {
                const vote = (val * 5) / 10;
                console.log(vote);

                return '<h3>' + vote + '</h3>';
            }

        },
        // computed: {
           
        // }
    });
}

function init() {
    initVue();
}

document.addEventListener('DOMContentLoaded', init);