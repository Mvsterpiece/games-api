const app = Vue.createApp({
    data() {
        return {
            editingGame: null,
            editedGame: { name: null, price: null },
            games: [],
            newGameName: '',
            newGamePrice: 0,
        };
    },
    async created() {
        this.fetchGames();
    },
    methods: {
        editGame: function (game) {
            this.editingGame = game;
            this.editedGame = { ...game }; 
        },
        cancelEdit: function () {
            this.editingGame = null;
            this.editedGame = { name: null, price: null };
        },
        confirmEdit: async function () {
            const response = await fetch(`http://localhost:8080/games/${this.editingGame.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.editedGame.name,
                    price: parseFloat(this.editedGame.price),
                }),
            });

            if (response.status === 200) {
                this.fetchGames();
                this.cancelEdit();
            } else {
                console.error('Failed to update game.');
            }
        },
        getGame: async function (id) {
            this.gameInModal = await (await fetch(`http://localhost:8080/games/${id}`)).json();
            let gameInfoModal = new bootstrap.Modal(document.getElementById('gameInfomodal'), {});
            gameInfoModal.show();
        },
        deleteGame: async function (id) {
            const response = await fetch(`http://localhost:8080/games/${id}`, {
                method: 'DELETE',
            });

            if (response.status === 204) {
                this.games = this.games.filter(game => game.id !== id);
            } else {
                console.error('Failed to delete game.');
            }
        },
        addGame: async function () {
            const response = await fetch('http://localhost:8080/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.newGameName,
                    price: parseFloat(this.newGamePrice),
                }),
            });

            if (response.status === 201) {
                this.fetchGames();
                this.newGameName = '';
                this.newGamePrice = 0;
            } else {
                console.error('Failed to add game.');
            }
        },
        fetchGames: async function () {
            this.games = await (await fetch('http://localhost:8080/games')).json();
        },
    },
}).mount('#app');
