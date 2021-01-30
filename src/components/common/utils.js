/**
 * Created by sudhamshbachu on 1/13/21.
 */

export var formatCurrency = function(num) {
    return isNaN(num) ? num : num.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

export var formatNumber = function(num, fraction) {
    return isNaN(num) ? num : num.toLocaleString(undefined, {
        maximumFractionDigits: fraction ? fraction : 0
    });
}
const ttl = 60*60*1000;
export var localStore = function(key,data){
    setWithExpiry(key,data,ttl)
}

export var isUserLoggedIn = function(){
    return getWithExpiry("userDisplayName");
}

 var updateTtl = function(key,data){
    setWithExpiry(key,data,ttl)
}


export function setWithExpiry(key,data ,ttlInMillSec) {
    const now = new Date()

    const item = {
        value: data,
        expiry: now.getTime() + ttlInMillSec,
    }
    localStorage.setItem(key, JSON.stringify(item))
}

export function removeKey(key){
    localStorage.removeItem(key)
}

export function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key)

    // if the item doesn't exist, return null
    if (!itemStr) {
        return null
    }

    const item = JSON.parse(itemStr)
    const now = new Date()

    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(key)
        return null
    }

    //Update ttl
    updateTtl(key, item.value)

    return item.value
}



