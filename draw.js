
function drawHiddenDealerHand(dealer) {
    $("#dealer-hand").empty();
    $("#dealer-hand").append(`<img src="img/${dealer.getCardInHand(0).getImgName()}.png" alt="playing card" id="dealer-card-1" />`);
    $("#dealer-hand").append(`<img src="img/b1pr.png" alt="face down card" id="dealer-card-2" />`);
}

function drawRevealedDealerHand(dealer) {
    $("#dealer-hand").empty();

    for (let i = 0; i < dealer.getHandSize(); i++) {
        card = dealer.getCardInHand(i);
        $("#dealer-hand").append(`<img src="img/${card.getImgName()}.png" alt"${card.getStrValue()}">`);
    }
}

function drawPlayer(player) {
    output = "";
    output += `<div class="col">`;
    output += `    <h3>${player.name}</h3>`;
    output += `    <div id="${player.name}-hand"></div>`;
    output += `</div>`;
    output += `<div class="col" id="${player.name}-controls">`;
    output += `    <button class="btn btn-success" onclick="clickHitPlayer('${player.name}');">Hit</button>`;
    output += `    <button class="btn btn-success" onclick="clickStay('${player.name}');">Stay</button>`;
    output += `    <button class="btn btn-success" onclick="clickSurrender('${player.name}');" id="${player.name}-surrender">Surrender</button>`;
    output += `    <button class="btn btn-success" onclick="clickDouble('${player.name}');" id="${player.name}-double">Double Down</button>`;
    output += `    <button class="btn btn-success split" onclick="clickSplit('${player.name}');" id="${player.name}-split">Split</button>`;
    output += `</div>`;
    output += `<div class="col" id="${player.name}-output" class="output">`;
    output += `</div>`;
    $("#players").append(output);
}

function drawPlayerHand(player) {
    $(`#${player.name}-hand`).empty();

    for (let i = 0; i < player.getHandSize(); i++) {
        card = player.getCardInHand(i)
        $(`#${player.name}-hand`).append(`<img src="img/${card.getImgName()}.png" alt="${card.getStrValue()}">`);
    }
}

function hideRestartBtn() {
    $("#restart").css("visibility", "hidden");
}

function showRestartBtn() {
    $("#restart").css("visibility", "visible");
}

function hidePlayerControls(player) {
    $(`#${player.name}-controls`).css("visibility", "hidden");
}

function showPlayerControls(player) {
    $(`#${player.name}-controls`).css("visibility", "visible");
}

function resetPlayerOutput(player) {
    $(`#${player.name}-output`).empty();
}

function playerOutput(player, msg) {
    $(`#${player.name}-output`).append(`<h3>${msg}</h3>`);
}

function showSplit(player) {
    $(`#${player.name}-split`).css("visibility", "visible");
}

function hideInitialBtns(player) {
    $(`#${player.name}-surrender`).css("visibility", "hidden");
    $(`#${player.name}-double`).css("visibility", "hidden");
}

function showInitialBtns(player) {
    $(`#${player.name}-surrender`).css("visibility", "visible");
    $(`#${player.name}-double`).css("visibility", "visible");
}