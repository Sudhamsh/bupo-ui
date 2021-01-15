/**
 * Created by sudhamshbachu on 1/13/21.
 */

var formatCurrency = function(num) {
    return isNaN(num) ? num : num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

exports.formatCurrency = formatCurrency;
