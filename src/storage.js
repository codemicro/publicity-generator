const save = (id, data) => {
    window.localStorage.setItem(id, JSON.stringify(data))
}

const load = (id) => {
    let x = window.localStorage.getItem(id)
    if (x === null) {
        return {"location": "undefined"}
    }
    return JSON.parse(x)
}

const del = (id) => {
    window.localStorage.removeItem(id)
}

const list = () => {
    let res = []
    for (let i = 0; i < localStorage.length; ++i ) {
        const key = localStorage.key(i)
        res.push({
            id: key,
            data: JSON.parse(localStorage.getItem(key)),
        })
    }
    return res
}

export default {
    "save": save,
    "load": load,
    "delete": del,
    "listAll": list,
}