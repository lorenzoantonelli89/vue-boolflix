function initVue() {
    new Vue({
        el: '#app',
        data: {
            'searchBar': '',
            'films': [],
            'tvSeries': [],
        },
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
                    })
                    .catch(error => {
                        console.err(error)
                    })
                    this.searchBar = '';
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
                const vote = Math.ceil(val / 2);
                return vote;
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