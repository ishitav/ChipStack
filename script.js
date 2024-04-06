let currentGameId = '';
let totalMoney = 0;
let players = []; 
let pastGames = []; 

function showDashboard() {
    document.getElementById('userOnboarding').style.display = 'none';
    document.getElementById('mainDashboard').style.display = 'block';
    document.getElementById('gameArea').style.display = 'none';
    document.getElementById('postGame').style.display = 'none';
    document.getElementById('gameHistory').style.display = 'none';
    resetGame();
}

function createGame() {
    const buyInAmount = document.getElementById('buyInAmount').value || 0;
    currentGameId = Math.random().toString(36).substr(2, 5);
    setupGameArea();
    addPlayer("Host", buyInAmount); 
}

function joinGame() {
    const gameId = document.getElementById('gameId').value;
    const joinBuyInAmount = document.getElementById('joinBuyInAmount').value || 0;
    if (gameId && joinBuyInAmount) {
        currentGameId = gameId;
        setupGameArea();
        addPlayer(`Player${players.length + 1}`, joinBuyInAmount); 
    } else {
        alert('Please enter a valid Game ID and Buy-In Amount.');
    }
}

function setupGameArea() {
    document.getElementById('currentGameId').textContent = currentGameId;
    document.getElementById('mainDashboard').style.display = 'none';
    document.getElementById('gameArea').style.display = 'block';
}

function addPlayer(name, buyInAmount) {
    players.push({ name, buyInAmount });
    updateTotalMoney(buyInAmount);
    updatePlayersList();
}

function updatePlayersList() {
    const playersList = document.getElementById('players');
    playersList.innerHTML = ''; 
    players.forEach(player => {
        const li = document.createElement('li');
        li.textContent = `${player.name} - $${player.buyInAmount}`;
        playersList.appendChild(li);
    });
}

function buyIn() {
    const additionalBuyIn = document.getElementById('buyInAmount').value || 0;
    updateTotalMoney(additionalBuyIn);
    alert(`Added Buy-In of $${additionalBuyIn} to Game: ${currentGameId}`);
}

function addRebuy() {
    const rebuyAmount = document.getElementById('buyInAmount').value || 0;
    updateTotalMoney(rebuyAmount);
    alert(`Added Re-Buy of $${rebuyAmount}`);
}

function updateTotalMoney(amount) {
    totalMoney += Number(amount);
    document.getElementById('totalMoney').textContent = `$${totalMoney}`;
}

function endGame() {
    pastGames.push({ gameId: currentGameId, totalMoney, players: [...players] }); 
    document.getElementById('gameArea').style.display = 'none';
    document.getElementById('postGame').style.display = 'block';
    document.getElementById('gameSummary').textContent = `Game ${currentGameId} ended. Total money: $${totalMoney}.`;
    resetGame();
}

function viewPastGames() {
    document.getElementById('mainDashboard').style.display = 'none';
    document.getElementById('gameHistory').style.display = 'block';
    const pastGamesList = document.getElementById('pastGamesList');
    pastGamesList.innerHTML = ''; 
    pastGames.forEach((game, index) => {
        const li = document.createElement('li');
        li.textContent = `Game ${index + 1}: ID ${game.gameId} - Total Money: $${game.totalMoney}`;
        pastGamesList.appendChild(li);
    });
}

function resetGame() {
    players = [];
    totalMoney = 0;
    document.getElementById('players').innerHTML = '';
    document.getElementById('totalMoney').textContent = '$0';
}
