var shifter_layout_scania_12 = {
    '-2' : 'RH',
    '-1' : 'RL',
    '0' : 'N',
    '1' : '1L',
    '2' : '1H',
    '3' : '2L',
    '4' : '2H',
    '5' : '3L',
    '6' : '3H',
    '7' : '4L',
    '8' : '4H',
    '9' : '5L',
    '10' : '5H',
    '11' : '6L',
    '12' : '6H'
}

var shifter_layout_scania_14 = {
    '-2' : 'RH',
    '-1' : 'RL',
    '0' : 'N',
    '1' : 'C1',
    '2' : 'C2',
    '3' : '1L',
    '4' : '1H',
    '5' : '2L',
    '6' : '2H',
    '7' : '3L',
    '8' : '3H',
    '9' : '4L',
    '10' : '4H',
    '11' : '5L',
    '12' : '5H',
    '13' : '6L',
    '14' : '6H'
}

var shifter_layout_volvo_12 = {
    '-2' : 'RH',
    '-1' : 'RL',
    '0' : 'N',
    '1' : '1L',
    '2' : '1H',
    '3' : '2L',
    '4' : '2H',
    '5' : '3L',
    '6' : '3H',
    '7' : '4L',
    '8' : '4H',
    '9' : '5L',
    '10' : '5H',
    '11' : '6L',
    '12' : '6H'
}

var shifter_layout_volvo_14 = {
    '-4' : 'R4',
    '-3' : 'R3',
    '-2' : 'R2',
    '-1' : 'R1',
    '0' : 'N',
    '1' : 'C1',
    '2' : 'C2',
    '3' : '1L',
    '4' : '1H',
    '5' : '2L',
    '6' : '2H',
    '7' : '3L',
    '8' : '3H',
    '9' : '4L',
    '10' : '4H',
    '11' : '5L',
    '12' : '5H',
    '13' : '6L',
    '14' : '6H'
}

var shifter_layout_zf12 = {
    '-1' : 'R',
    '0' : 'N',
    '1' : '1L',
    '2' : '1H',
    '3' : '2L',
    '4' : '2H',
    '5' : '3L',
    '6' : '3H',
    '7' : '4L',
    '8' : '4H',
    '9' : '5L',
    '10' : '5H',
    '11' : '6L',
    '12' : '6H'
}

var shifter_layout_zf16 = {
    '-1' : 'R',
    '0' : 'N',
    '1' : '1L',
    '2' : '1H',
    '3' : '2L',
    '4' : '2H',
    '5' : '3L',
    '6' : '3H',
    '7' : '4L',
    '8' : '4H',
    '9' : '5L',
    '10' : '5H',
    '11' : '6L',
    '12' : '6H',
    '13' : '7L',
    '14' : '7H',
    '15' : '8L',
    '16' : '8H'
}

const shifter_layout = 'auto'; // use 'auto' for automatic transmission
// const shifter_layout = shifter_layout_zf12; // use this sort of assignment for manual layouts

Funbit.Ets.Telemetry.Dashboard.prototype.initialize = function (skinConfig, utils) {
    //
    // skinConfig - a copy of the skin configuration from config.json
    // utils - an object containing several utility functions (see skin tutorial for more information)
    //

    // this function is called before everything else, 
    // so you may perform any DOM or resource initializations / image preloading here

    utils.preloadImages([
        'images/bg-off.png', 'images/bg-on.png',
        'images/blinker-left-off.png', 'images/blinker-left-on.png',
        'images/blinker-right-off.png', 'images/blinker-right-on.png',
        'images/cruise-off.png', 'images/cruise-on.png',
        'images/highbeam-off.png', 'images/highbeam-on.png',
        'images/lowbeam-off.png', 'images/lowbeam-on.png',
        'images/parklights-off.png', 'images/parklights-on.png',
        'images/trailer-off.png', 'images/trailer-on.png'
    ]);

    // return to menu by a click
    $(document).add('body').on('click', function () {
        window.history.back();
    });
}

Funbit.Ets.Telemetry.Dashboard.prototype.numberWithCommas = function(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

Funbit.Ets.Telemetry.Dashboard.prototype.formatGear = function (data) {
    var gear = data.truck.displayedGear; // use displayed gear
    
    if (shifter_layout != 'auto') 
        return shifter_layout[gear];
    else 
        return data.truck.gear > 0
        ? 'D' + data.truck.gear
        : (data.truck.gear < 0 ? 'R' + Math.abs(data.truck.gear) : 'N');

}

Funbit.Ets.Telemetry.Dashboard.prototype.etaString = function (date) {

    if (this.isIso8601(date)) {
        var d = new Date(date);
        var dys = d.getUTCDate() - 1;
        var hrs = d.getUTCHours();
        var mnt = d.getUTCMinutes();
        var o = dys > 1 ? dys + ' days ' : (dys != 0 ? dys + ' day ' : '');
        if (hrs > 0)
            o += hrs > 1 ? hrs + ' hours ' : hrs + ' hour ';
        if (mnt > 0)
            o += mnt > 1 ? mnt + ' minutes' : mnt + ' minute';
        if (!o)
            o = '< 1 minute'
        return o;
    }
    return date;
};

Funbit.Ets.Telemetry.Dashboard.prototype.filter = function (data, utils) {
    //
    // data - telemetry data JSON object
    // utils - an object containing several utility functions (see skin tutorial for more information)
    //

    // This filter is used to change telemetry data 
    // before it is displayed on the dashboard.
    // You may convert km/h to mph, kilograms to tons, etc.

    data.hasJob = data.trailer.attached;
    // round truck speed
    data.truck.speedRounded = Math.abs(data.truck.speed > 0
        ? Math.floor(data.truck.speed)
        : Math.round(data.truck.speed));
    data.truck.cruiseControlSpeedRounded = data.truck.cruiseControlOn
        ? Math.floor(data.truck.cruiseControlSpeed)
        : 0;
    // convert kg to t
    data.trailer.mass = data.hasJob ? (Math.round(data.trailer.mass / 1000.0) + 't') : '';
    // format odometer data as: 00000.0
    data.truck.odometer = utils.formatFloat(data.truck.odometer, 1);
    // convert gear to readable format

    data.truck.gear = this.formatGear(data);

    // convert rpm to rpm * 100
    data.truck.engineRpm = data.truck.engineRpm / 100;
    // calculate wear
    var wearSumPercent = data.truck.wearEngine * 100 +
        data.truck.wearTransmission * 100 +
        data.truck.wearCabin * 100 +
        data.truck.wearChassis * 100 +
        data.truck.wearWheels * 100;
    wearSumPercent = Math.min(wearSumPercent, 100);
    data.truck.wearSum = Math.round(wearSumPercent) + '%';
    data.trailer.wear = Math.round(data.trailer.wear * 100) + '%';
    // return changed data to the core for rendering

    data.truck.retarderOn = data.truck.retarderBrake ? data.truck.retarderBrake > 0 : false
    
    data.navigation.estimatedDistance = (data.navigation.estimatedDistance / 1000.0).toFixed(1);
    data.navigation.estimatedTime = this.etaString(data.navigation.estimatedTime);
    data.job.income = this.numberWithCommas(data.job.income);

    var nextRestMillis = new Date(data.game.nextRestStopTime).getTime();
    if (nextRestMillis - 90 * 60000 > 0) {
        data.game.nextRestStopTime = new Date(nextRestMillis - 90 * 60000).toISOString().split('.')[0]+"Z";
    }
    data.game.nextRestStopTime = this.timeDifferenceToReadableString(data.game.nextRestStopTime);
    data.navigation.speedLimitSet = data.navigation.speedLimit > 0;
    data.truck.overspeed = data.navigation.speedLimit > 0 && Math.abs(data.truck.speedRounded) > data.navigation.speedLimit;

    return data;
};

Funbit.Ets.Telemetry.Dashboard.prototype.render = function (data, utils) {
    //
    // data - same data object as in the filter function
    // utils - an object containing several utility functions (see skin tutorial for more information)
    //

    // we don't have anything custom to render in this skin,
    // but you may use jQuery here to update DOM or CSS

}

