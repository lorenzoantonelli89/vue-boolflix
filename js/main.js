function initVue() {
    new Vue({
        el: '#app',
        data: {
            'searchBar': '',
            'films': [],
        },
        // mounted() {
        //     axios
        //         .get('https://api.themoviedb.org/3/search/movie', {
        //             params: {
        //                 'api_key': '1d2078d15fa15a94192ff189b968ed1f',
        //                 'query': this.searchBar
        //             }
        //         })
        //         .then(data => {
        //             console.log(data.data.results);
        //             // this.arr.push(data.data.results)
        //         });
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
                        console.log(data.data.results);
                        this.films = data.data.results;
                        console.log(this.films);
                    });
            },
            flag: function (language) {
                if (language == 'en') {
                    return '<img src="img/flag-en.png" alt="bandiera-inglese">';
                }else if (language == 'it'){
                    return '<img src="img/flag-it.png" alt="bandiera-inglese">';
                }else{
                   return '<h3>other</h3>';
                }
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