$(document).ready(function () {
  /* ============ Utils ============ */
  function clamp100(v) {
    v = Number.isFinite(v) ? v : 0;
    return Math.max(0, Math.min(100, v | 0));
  }

  /* ============ Player HUD ============ */
  function updatePlayerHUD(data) {
    $('#health-container').show();
    $('#health').css('--fill', (data.health ?? 0) + '%');

    if ((data.armor ?? 0) > 0) {
      $('#armor-container').fadeIn('slow');
      $('#armor').css('--fill', data.armor + '%');
    } else {
      $('#armor-container').fadeOut('slow');
    }

    $('#hunger-container').show();
    $('#hunger').css('--fill', (data.hunger ?? 0) + '%');

    $('#thirst-container').show();
    $('#thirst').css('--fill', (data.thirst ?? 0) + '%');

    if ((data.stamina ?? 100) < 100) {
      $('#stamina-container').fadeIn('slow');
      $('#stamina').css('--fill', data.stamina + '%');
    } else {
      $('#stamina-container').fadeOut('slow');
    }

    const stressVal = clamp100(Math.floor(data.stress ?? 0));
    if (stressVal > 1) {
      $('#stress-container').fadeIn('slow');
      $('#stress').css('--fill', stressVal + '%');
      const speed = (1.4 - (stressVal / 100) * 0.8).toFixed(2) + 's';
      $('#stress-container').addClass('moving').css('--stress-speed', speed);
    } else {
      $('#stress-container').fadeOut('slow');
      $('#stress-container').removeClass('moving').css('--stress-speed', '1.2s');
    }

    if (data.talking) $('#talk-indicator').fadeIn('fast');
    else $('#talk-indicator').fadeOut('fast');

    const pct = clamp100(Math.floor(data.stamina ?? 0));
    $('#player-bottom-fill').css('width', pct + '%');
  }

  /* ============ Throttle Estimado (fallback) ============ */
  let lastSpeed = null, lastTime = null, throttleEMA = 0;
  function getThrottlePercent(data, speedNow) {
    const keys = ['throttle', 'accel', 'accelerator', 'gas', 'pedal', 'throttlePercent', 'throttle_pct'];
    for (const k of keys) {
      if (data && data[k] != null) {
        let v = +data[k]; if (!isFinite(v)) v = 0;
        if (v <= 1) v *= 100; return clamp100(Math.round(v));
      }
    }
    if (data && data.rpm != null) {
      let rpm = +data.rpm; if (!isFinite(rpm)) rpm = 0;
      if (rpm <= 1) rpm *= 100; return clamp100(Math.round(rpm));
    }
    if (data && data.accelAxis != null) {
      let ax = +data.accelAxis; if (!isFinite(ax)) ax = 0;
      if (ax < 0) ax = 0; if (ax <= 1) ax *= 100; return clamp100(Math.round(ax));
    }

    const now = Date.now();
    if (lastSpeed === null || lastTime === null) {
      lastSpeed = speedNow || 0; lastTime = now; throttleEMA = 0; return 0;
    }
    const dt = (now - lastTime) / 1000;
    const dv = Math.max(0, (speedNow - lastSpeed));
    const accelNorm = (dt > 0) ? (dv / dt) / 10 : 0; // heurística
    const rawPct = clamp100(Math.round(accelNorm * 100));
    const alpha = 0.15;
    throttleEMA = Math.round((1 - alpha) * throttleEMA + alpha * rawPct);
    lastSpeed = speedNow; lastTime = now;
    return clamp100(throttleEMA);
  }

  /* ============ Vehicle HUD ============ */
  function updateVehicleHUD(data) {
    const spd = Math.max(0, Math.floor(+data.speed || 0));
    const s = String(spd).padStart(3, '0');
    const zeroCount = Math.max(0, 3 - String(spd).length);
    const zeroes = s.substring(0, zeroCount);
    const value = s.substring(zeroCount);
    $('#speed').html(`<span class="speed-zeroes">${zeroes}</span><span class="speed-value">${value}</span>`);

    const unit = data.unit || (data.useMPH ? 'MPH' : 'KMH') || 'KMH';
    $('#speed-type').text(unit);

    const fuelPct = clamp100(Math.floor(+data.fuel || 0));
    $('#fuel-percent').text(fuelPct + '%');
    const $fuelInd = $('#fuel-indicator');
    if (fuelPct <= 15) $fuelInd.addClass('low'); else $fuelInd.removeClass('low');

    const throttlePct = getThrottlePercent(data, spd);
    $('#throttle-bar').css('--throttle', throttlePct + '%');
    $('#throttle-fill').css('width', throttlePct + '%');
    // efecto glow segun umbral
    const $tf = $('#throttle-fill');
    $tf.removeClass('warn crit');
    if (throttlePct >= 85) $tf.addClass('crit');
    else if (throttlePct >= 70) $tf.addClass('warn');

    // Marchas 1–6
    const g = Math.max(0, Math.min(6, parseInt(data.gear || 0, 10)));
    $('#gear-strip .gear-seg').each(function () {
      const seg = parseInt($(this).attr('data-g'), 10);
      $(this).toggleClass('active', g > 0 && seg === g);
    });

    // Nombre de la calle (si llega)
    const street = (data.street1 ?? data.street ?? data.road ?? data.roadName ?? '').toString().trim();
    $('#street-name').text(street || '');
  }

  /* ============ NUI messaging ============ */
  window.addEventListener('message', function (event) {
    const data = event.data;
    switch (data.action) {
      case 'showPlayerHUD': $('body').fadeIn('slow'); break;
      case 'hidePlayerHUD': $('body').fadeOut('slow'); $('body').removeClass('veh-active'); break;
      case 'updatePlayerHUD': updatePlayerHUD(data); break;
      case 'showVehicleHUD':
        $('#vehicle-hud-container').fadeIn('slow');
        $('body').addClass('veh-active');
        break;
      case 'hideVehicleHUD':
        $('#vehicle-hud-container').fadeOut('slow');
        $('body').removeClass('veh-active');
        break;
      case 'updateVehicleHUD': updateVehicleHUD(data); break;
    }
  });
});
