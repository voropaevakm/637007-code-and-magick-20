'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var GAP = 50;
var FONT_GAP = 15;
var TEXT_HEIGHT = 15;
var BAR_WIDTH = 40;
var MAX_BAR_HEIGHT = 150;
var NAME_WE = 'Вы';
var COLOR_WE = 'rgba(255, 0, 0, 1)';
var barHeight = CLOUD_HEIGHT - 2 * FONT_GAP + TEXT_HEIGHT;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var renderText = function (ctx, x, y, font, color) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 2 * FONT_GAP + CLOUD_X, FONT_GAP + CLOUD_Y);
  ctx.fillText('Список результатов:', 2 * FONT_GAP + CLOUD_X, 2 * FONT_GAP + CLOUD_Y);
};

var getColor = function (player) {
  if (player === NAME_WE) {
    var barColor = COLOR_WE;
  } else {
    barColor = 'hsl(240, ' + Math.floor(Math.random() * 100) + '%, 50%)';
    }
  return barColor;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  renderText(ctx, CLOUD_X, CLOUD_Y, '16px PT Mono', '#000');

  ctx.fillStyle = '#000';

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var gisHeight = (barHeight * times[i] / (maxTime));

    if (gisHeight > MAX_BAR_HEIGHT) {
      gisHeight = MAX_BAR_HEIGHT;
    }

    ctx.fillText(Math.floor(times[i]), CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, barHeight - gisHeight - GAP);
    ctx.fillText(players[i], CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, barHeight);
    ctx.fillStyle = getColor(players[i]);
    ctx.fillRect(CLOUD_X + GAP + (GAP + BAR_WIDTH) * i, barHeight - FONT_GAP, BAR_WIDTH, -gisHeight);
    ctx.fillStyle = '#000';
  }
};
