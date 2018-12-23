

export const onRouteUpdate = (cb: Function) => {
    window.addEventListener('message', (res) => {
        if(res.data) {
        cb(res.data.route)
        }
    })
}


