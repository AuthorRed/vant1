import QS from 'qs'
import http from '../utils/request'
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }
    } else if (isEdge) {
        return 'edge';//edge
    } else if (isIE11) {
        return 11; //IE11  
    } else {
        return -1;//不是ie浏览器
    }
}

export function getRequest(url, data = {}) {
    return new Promise((resolve, reject) => {
        if (IEVersion() != -1) {
            data.time = new Date().getTime()
        }

        http
            .get(url, {
                params: data
            })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    });
}


//封装post请求
export function postRequest(url, data = {}) {
    return new Promise((resolve, reject) => {
        http
            .post(url, QS.stringify(data), { headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' } })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    });

}
//封装post请求
export function postJson(url, data = {}) {
    return new Promise((resolve, reject) => {
        http
            .post(url, data, { headers: { 'Content-Type': 'application/json;charset=utf-8' } })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    });

}
//封装post请求
export function postFile(url, data = {}) {
    return new Promise((resolve, reject) => {
        http
            .post(url, data, { headers: { 'Content-Type': 'multipart/form-data;charset=utf-8' } })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err);
            });
    });

}



export function exportExcel(url, data = {}) {

    return new Promise((resolve, reject) => {
        http.get(url, {
            params: data,
            responseType: 'blob',
        })
            .then(response => {

                resolve(response);
            })
            .catch(err => {
                reject(err)
            })
    })
}
export function downloadTemplate(url, data = {}) {
    return new Promise((resolve, reject) => {
        http.get(url, {
            params: data,
            responseType: 'blob',
        })
            .then(response => {
                resolve(response);
            })
            .catch(err => {
                reject(err)
            })
    })
}